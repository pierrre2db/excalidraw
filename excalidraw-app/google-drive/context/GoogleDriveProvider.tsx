/**
 * Google Drive Provider Context
 * Manages Google Drive authentication and file operations
 * StratAI Whiteboard
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import {
  GoogleDriveContextValue,
  AutoSaveConfig,
  GoogleDriveFile,
  ShareOptions,
  StorageInfo,
  GOOGLE_DRIVE_CONSTANTS,
  generateAutoFileName,
} from '../types';
import { googleDriveAPI } from '../services/googleDriveAPI';
import { useExcalidrawAPI } from '../../ExcalidrawAPIContext';
import { FilePickerModal } from '../components/FilePickerModal';

// Get CLIENT_ID from environment variable
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID || '';

// Google Drive API scope
const GOOGLE_DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

/**
 * Google Drive Context
 */
const GoogleDriveContext = createContext<GoogleDriveContextValue | null>(null);

/**
 * Internal provider component (wrapped by GoogleOAuthProvider)
 */
function GoogleDriveProviderInternal({ children }: { children: ReactNode }) {
  // Get Excalidraw API to access canvas data
  const excalidrawAPI = useExcalidrawAPI();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Auto-save configuration
  const [autoSaveConfig, setAutoSaveConfig] = useState<AutoSaveConfig>({
    enabled: true, // Enabled by default as per spec
    interval: GOOGLE_DRIVE_CONSTANTS.DEFAULT_AUTO_SAVE_INTERVAL,
    lastSaveTime: null,
  });

  // Storage info
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);

  // Current file ID and name (for updates vs new uploads)
  const [currentFileId, setCurrentFileId] = useState<string | null>(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gdrive_current_file_id');
    }
    return null;
  });
  const [currentFileName, setCurrentFileName] = useState<string | null>(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gdrive_current_file_name');
    }
    return null;
  });

  // Excalidraw folder ID in Google Drive
  const [folderId, setFolderId] = useState<string | null>(null);

  // File picker modal state
  const [isFilePickerOpen, setIsFilePickerOpen] = useState(false);

  /**
   * Helper: Update current file and persist to localStorage
   */
  const updateCurrentFile = useCallback((fileId: string | null, fileName: string | null) => {
    setCurrentFileId(fileId);
    setCurrentFileName(fileName);

    if (typeof window !== 'undefined') {
      if (fileId && fileName) {
        localStorage.setItem('gdrive_current_file_id', fileId);
        localStorage.setItem('gdrive_current_file_name', fileName);
      } else {
        localStorage.removeItem('gdrive_current_file_id');
        localStorage.removeItem('gdrive_current_file_name');
      }
    }
  }, []);

  /**
   * Google OAuth login handler
   */
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setAccessToken(tokenResponse.access_token);
        googleDriveAPI.setAccessToken(tokenResponse.access_token);

        // Get user info
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/oauth2/v2/userinfo',
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          },
        );

        const userInfo = await userInfoResponse.json();
        setUserEmail(userInfo.email);
        setIsAuthenticated(true);

        // Get storage info
        await refreshStorageInfo();

        // Find or create Excalidraw folder
        try {
          const folderIdResult = await googleDriveAPI.findOrCreateFolder();
          setFolderId(folderIdResult);
          console.log('Excalidraw folder ID:', folderIdResult);
        } catch (error) {
          console.error('Error finding/creating folder:', error);
        }

        console.log('Google Drive connected:', userInfo.email);
      } catch (error) {
        console.error('Error during Google sign-in:', error);
        setIsAuthenticated(false);
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      setIsAuthenticated(false);
    },
    scope: GOOGLE_DRIVE_SCOPE,
  });

  /**
   * Sign in to Google Drive
   */
  const signIn = useCallback(async () => {
    try {
      googleLogin();
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }, [googleLogin]);

  /**
   * Sign out from Google Drive
   */
  const signOut = useCallback(async () => {
    try {
      setIsAuthenticated(false);
      setUserEmail(null);
      setAccessToken(null);
      setStorageInfo(null);
      updateCurrentFile(null, null);
      setFolderId(null);
      console.log('Signed out from Google Drive');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }, [updateCurrentFile]);

  /**
   * Save current drawing to Google Drive
   * This will be implemented to get the current Excalidraw state
   */
  const saveToGoogleDrive = useCallback(
    async (fileName?: string): Promise<GoogleDriveFile | null> => {
      if (!isAuthenticated) {
        throw new Error('Not authenticated with Google Drive');
      }

      try {
        // Generate filename if not provided (uses user email to extract name)
        const finalFileName = fileName || generateAutoFileName(userEmail || undefined);

        // Get real Excalidraw data from the canvas
        if (!excalidrawAPI) {
          throw new Error('Excalidraw API not ready. Please try again.');
        }

        const elements = excalidrawAPI.getSceneElements();
        const appState = excalidrawAPI.getAppState();
        const files = excalidrawAPI.getFiles();

        const excalidrawData = JSON.stringify({
          type: 'excalidraw',
          version: 2,
          source: 'https://pierrre2db.github.io/excalidraw',
          elements: elements,
          appState: appState,
          files: files,
        });

        // TODO: Generate thumbnail from canvas
        // This will be implemented to capture the canvas as image
        const thumbnail = undefined; // await generateThumbnail();

        let fileData: GoogleDriveFile;

        // Update existing file or create new one
        if (currentFileId) {
          fileData = await googleDriveAPI.updateFile(
            currentFileId,
            excalidrawData,
            thumbnail,
          );
          console.log('File updated:', fileData.name);
        } else {
          fileData = await googleDriveAPI.uploadFile(
            excalidrawData,
            finalFileName,
            thumbnail,
          );
          updateCurrentFile(fileData.id, fileData.name);
          console.log('File created:', fileData.name);
        }

        // Update last save time
        setAutoSaveConfig((prev) => ({
          ...prev,
          lastSaveTime: Date.now(),
        }));

        return fileData;
      } catch (error) {
        console.error('Error saving to Google Drive:', error);
        throw error;
      }
    },
    [isAuthenticated, currentFileId, userEmail, updateCurrentFile, excalidrawAPI],
  );

  /**
   * Save As - Always create a new file with specified name
   */
  const saveAsToGoogleDrive = useCallback(
    async (fileName: string): Promise<GoogleDriveFile | null> => {
      if (!isAuthenticated) {
        throw new Error('Not authenticated with Google Drive');
      }

      try {
        // Get real Excalidraw data from the canvas
        if (!excalidrawAPI) {
          throw new Error('Excalidraw API not ready. Please try again.');
        }

        const elements = excalidrawAPI.getSceneElements();
        const appState = excalidrawAPI.getAppState();
        const files = excalidrawAPI.getFiles();

        const excalidrawData = JSON.stringify({
          type: 'excalidraw',
          version: 2,
          source: 'https://pierrre2db.github.io/excalidraw',
          elements: elements,
          appState: appState,
          files: files,
        });

        // TODO: Generate thumbnail from canvas
        const thumbnail = undefined;

        // Always create a new file (ignore currentFileId)
        const fileData = await googleDriveAPI.uploadFile(
          excalidrawData,
          fileName,
          thumbnail,
        );

        // Update current file to the newly created one
        updateCurrentFile(fileData.id, fileData.name);
        console.log('File created (Save As):', fileData.name);

        // Update last save time
        setAutoSaveConfig((prev) => ({
          ...prev,
          lastSaveTime: Date.now(),
        }));

        return fileData;
      } catch (error) {
        console.error('Error saving as to Google Drive:', error);
        throw error;
      }
    },
    [isAuthenticated, updateCurrentFile, excalidrawAPI],
  );

  /**
   * Create Version - Save as a new timestamped version
   */
  const createVersion = useCallback(
    async (): Promise<GoogleDriveFile | null> => {
      if (!isAuthenticated) {
        throw new Error('Not authenticated with Google Drive');
      }

      try {
        // Generate versioned filename
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timestamp = `${hours}h${minutes}`;

        let versionedFileName: string;
        if (currentFileName) {
          // Remove extension, add timestamp, add extension back
          const nameWithoutExt = currentFileName.replace(/\.excalidraw$/, '');
          versionedFileName = `${nameWithoutExt}_${timestamp}.excalidraw`;
        } else {
          // No current file, generate base name with timestamp
          versionedFileName = `${generateAutoFileName(userEmail || undefined).replace(/\.excalidraw$/, '')}_${timestamp}.excalidraw`;
        }

        // Get real Excalidraw data from the canvas
        if (!excalidrawAPI) {
          throw new Error('Excalidraw API not ready. Please try again.');
        }

        const elements = excalidrawAPI.getSceneElements();
        const appState = excalidrawAPI.getAppState();
        const files = excalidrawAPI.getFiles();

        const excalidrawData = JSON.stringify({
          type: 'excalidraw',
          version: 2,
          source: 'https://pierrre2db.github.io/excalidraw',
          elements: elements,
          appState: appState,
          files: files,
        });

        // TODO: Generate thumbnail from canvas
        const thumbnail = undefined;

        // Always create a new file (version)
        const fileData = await googleDriveAPI.uploadFile(
          excalidrawData,
          versionedFileName,
          thumbnail,
        );

        // Update current file to the newly created version
        updateCurrentFile(fileData.id, fileData.name);
        console.log('Version created:', fileData.name);

        // Update last save time
        setAutoSaveConfig((prev) => ({
          ...prev,
          lastSaveTime: Date.now(),
        }));

        return fileData;
      } catch (error) {
        console.error('Error creating version:', error);
        throw error;
      }
    },
    [isAuthenticated, currentFileName, userEmail, updateCurrentFile, excalidrawAPI],
  );

  /**
   * New File - Reset current file to start fresh
   */
  const newFile = useCallback(() => {
    updateCurrentFile(null, null);
    console.log('New file started');
    // TODO: Clear the Excalidraw canvas (will be connected to Excalidraw's API)
  }, [updateCurrentFile]);

  /**
   * Open file picker and load from Google Drive
   */
  const openFromGoogleDrive = useCallback(async () => {
    if (!isAuthenticated) {
      throw new Error('Not authenticated with Google Drive');
    }

    try {
      // Open the file picker modal
      setIsFilePickerOpen(true);
    } catch (error) {
      console.error('Error opening from Google Drive:', error);
      throw error;
    }
  }, [isAuthenticated]);

  /**
   * Load a file from Google Drive into Excalidraw
   */
  const loadFileFromDrive = useCallback(
    async (fileId: string) => {
      if (!isAuthenticated) {
        throw new Error('Not authenticated with Google Drive');
      }

      if (!excalidrawAPI) {
        throw new Error('Excalidraw API not ready');
      }

      try {
        console.log('Loading file from Google Drive:', fileId);

        // Download file content
        const fileContent = await googleDriveAPI.downloadFile(fileId);

        // Parse the Excalidraw data
        const data = JSON.parse(fileContent);

        // Get file metadata to update current file
        const fileList = await googleDriveAPI.listFiles(50);
        const file = fileList.find((f) => f.id === fileId);

        if (file) {
          updateCurrentFile(file.id, file.name);
          console.log('Loaded file:', file.name);
        }

        // Load the data into Excalidraw
        // Only restore safe appState properties (viewBackgroundColor, gridSize, etc.)
        // Avoid runtime-only properties like collaborators, isLoading, etc.
        const safeAppState: Partial<any> = {};
        if (data.appState) {
          if (data.appState.viewBackgroundColor !== undefined) {
            safeAppState.viewBackgroundColor = data.appState.viewBackgroundColor;
          }
          if (data.appState.gridSize !== undefined) {
            safeAppState.gridSize = data.appState.gridSize;
          }
          if (data.appState.currentChartType !== undefined) {
            safeAppState.currentChartType = data.appState.currentChartType;
          }
        }

        excalidrawAPI.updateScene({
          elements: data.elements || [],
          appState: Object.keys(safeAppState).length > 0 ? (safeAppState as any) : undefined,
        });

        // Load files (images) if present
        if (data.files && Object.keys(data.files).length > 0) {
          excalidrawAPI.addFiles(Object.values(data.files));
        }

        console.log('File loaded successfully into Excalidraw');
      } catch (error) {
        console.error('Error loading file from Google Drive:', error);
        throw error;
      }
    },
    [isAuthenticated, excalidrawAPI, updateCurrentFile],
  );

  /**
   * List files from Google Drive
   */
  const listFiles = useCallback(
    async (pageSize: number = 20): Promise<GoogleDriveFile[]> => {
      if (!isAuthenticated) {
        throw new Error('Not authenticated with Google Drive');
      }

      try {
        return await googleDriveAPI.listFiles(pageSize);
      } catch (error) {
        console.error('Error listing files:', error);
        throw error;
      }
    },
    [isAuthenticated],
  );

  /**
   * Share file and get share link
   */
  const shareFile = useCallback(
    async (fileId: string, options: ShareOptions): Promise<string> => {
      if (!isAuthenticated) {
        throw new Error('Not authenticated with Google Drive');
      }

      try {
        const shareLink = await googleDriveAPI.createShareLink(fileId, options);

        // Copy to clipboard
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareLink);
          console.log('Share link copied to clipboard');
        }

        return shareLink;
      } catch (error) {
        console.error('Error sharing file:', error);
        throw error;
      }
    },
    [isAuthenticated],
  );

  /**
   * Toggle auto-save on/off
   */
  const toggleAutoSave = useCallback(() => {
    setAutoSaveConfig((prev) => ({
      ...prev,
      enabled: !prev.enabled,
    }));
  }, []);

  /**
   * Set auto-save interval
   */
  const setAutoSaveInterval = useCallback((interval: number) => {
    setAutoSaveConfig((prev) => ({
      ...prev,
      interval,
    }));
  }, []);

  /**
   * Refresh storage information
   */
  const refreshStorageInfo = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      const info = await googleDriveAPI.getStorageInfo();
      setStorageInfo(info);
    } catch (error) {
      console.error('Error refreshing storage info:', error);
    }
  }, [isAuthenticated]);

  /**
   * Auto-save effect
   */
  useEffect(() => {
    if (!autoSaveConfig.enabled || !isAuthenticated) {
      return;
    }

    const intervalId = setInterval(async () => {
      try {
        // TODO: Check if there are unsaved changes before auto-saving
        // This will be connected to Excalidraw's change detection
        console.log('Auto-save triggered');
        await saveToGoogleDrive();
      } catch (error) {
        console.error('Auto-save error:', error);
      }
    }, autoSaveConfig.interval);

    return () => clearInterval(intervalId);
  }, [autoSaveConfig, isAuthenticated, saveToGoogleDrive]);

  /**
   * Context value
   */
  const contextValue: GoogleDriveContextValue = {
    isAuthenticated,
    userEmail,
    signIn,
    signOut,
    saveToGoogleDrive,
    saveAsToGoogleDrive,
    createVersion,
    newFile,
    openFromGoogleDrive,
    listFiles,
    shareFile,
    currentFileName,
    currentFileId,
    autoSaveConfig,
    toggleAutoSave,
    setAutoSaveInterval,
    storageInfo,
    refreshStorageInfo,
    folderId,
  };

  return (
    <GoogleDriveContext.Provider value={contextValue}>
      {children}
      {/* File Picker Modal */}
      <FilePickerModal
        isOpen={isFilePickerOpen}
        onClose={() => setIsFilePickerOpen(false)}
        onFileSelect={loadFileFromDrive}
      />
    </GoogleDriveContext.Provider>
  );
}

/**
 * Main provider component with OAuth wrapper
 */
export function GoogleDriveProvider({ children }: { children: ReactNode }) {
  // Check if CLIENT_ID is configured
  if (!GOOGLE_CLIENT_ID) {
    console.warn(
      'Google Drive CLIENT_ID not configured. Please set VITE_GOOGLE_DRIVE_CLIENT_ID in .env file.',
    );
    // Return children without Google Drive functionality
    return <>{children}</>;
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleDriveProviderInternal>{children}</GoogleDriveProviderInternal>
    </GoogleOAuthProvider>
  );
}

/**
 * Hook to use Google Drive context
 */
export function useGoogleDrive(): GoogleDriveContextValue {
  const context = useContext(GoogleDriveContext);

  if (!context) {
    // Return a mock context if Google Drive is not configured
    return {
      isAuthenticated: false,
      userEmail: null,
      signIn: async () => {
        console.warn('Google Drive not configured');
      },
      signOut: async () => {},
      saveToGoogleDrive: async () => null,
      saveAsToGoogleDrive: async () => null,
      createVersion: async () => null,
      newFile: () => {},
      openFromGoogleDrive: async () => {},
      listFiles: async () => [],
      shareFile: async () => '',
      currentFileName: null,
      currentFileId: null,
      autoSaveConfig: {
        enabled: false,
        interval: GOOGLE_DRIVE_CONSTANTS.DEFAULT_AUTO_SAVE_INTERVAL,
        lastSaveTime: null,
      },
      toggleAutoSave: () => {},
      setAutoSaveInterval: () => {},
      storageInfo: null,
      refreshStorageInfo: async () => {},
      folderId: null,
    };
  }

  return context;
}

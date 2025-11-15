/**
 * Google Drive Integration - TypeScript Types
 * StratAI Whiteboard
 */

/**
 * Google Drive authentication state
 */
export interface GoogleDriveAuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
  accessToken: string | null;
}

/**
 * Google Drive file metadata
 */
export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  createdTime: string;
  modifiedTime: string;
  thumbnailLink?: string;
  webViewLink?: string;
  webContentLink?: string;
}

/**
 * Auto-save configuration
 */
export interface AutoSaveConfig {
  enabled: boolean;
  interval: number; // in milliseconds (default: 5 minutes = 300000)
  lastSaveTime: number | null;
}

/**
 * Share options for Google Drive files
 */
export interface ShareOptions {
  type: 'anyone' | 'specific';
  role: 'reader' | 'writer' | 'commenter';
  allowFileDiscovery?: boolean;
}

/**
 * Google Drive context value
 */
export interface GoogleDriveContextValue {
  // Authentication
  isAuthenticated: boolean;
  userEmail: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;

  // File operations
  saveToGoogleDrive: (fileName?: string) => Promise<GoogleDriveFile | null>;
  saveAsToGoogleDrive: (fileName: string) => Promise<GoogleDriveFile | null>;
  createVersion: () => Promise<GoogleDriveFile | null>;
  newFile: () => void;
  openFromGoogleDrive: () => Promise<void>;
  listFiles: (pageSize?: number) => Promise<GoogleDriveFile[]>;
  shareFile: (fileId: string, options: ShareOptions) => Promise<string>;

  // Current file info
  currentFileName: string | null;
  currentFileId: string | null;

  // Auto-save
  autoSaveConfig: AutoSaveConfig;
  toggleAutoSave: () => void;
  setAutoSaveInterval: (interval: number) => void;

  // Storage info
  storageInfo: StorageInfo | null;
  refreshStorageInfo: () => Promise<void>;

  // Folder info
  folderId: string | null;
}

/**
 * Storage information from Google Drive
 */
export interface StorageInfo {
  limit: number;
  usage: number;
  usageInDrive: number;
  usageInDriveTrash: number;
}

/**
 * Google Drive API error
 */
export interface GoogleDriveError {
  code: number;
  message: string;
  status: string;
}

/**
 * Folder structure constants
 */
export const GOOGLE_DRIVE_CONSTANTS = {
  FOLDER_NAME: 'Excalidraw',
  FILE_PREFIX: 'session',
  FILE_EXTENSION: '.excalidraw',
  MIME_TYPE: 'application/json',
  FOLDER_MIME_TYPE: 'application/vnd.google-apps.folder',
  THUMBNAIL_SIZE: '400x300',
  DEFAULT_AUTO_SAVE_INTERVAL: 5 * 60 * 1000, // 5 minutes in ms
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10 MB
} as const;

/**
 * Generate automatic filename based on user name and current date
 * Format: {userName}_{YYYY}_{MM}_{DD}.excalidraw
 * Example: Pierre_2025_11_15.excalidraw
 */
export function generateAutoFileName(userEmail?: string): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  // Extract user name from email (first part before @)
  let userName: string;
  if (userEmail) {
    const emailPrefix = userEmail.split('@')[0];
    // Capitalize first letter and clean up
    userName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1).replace(/[^a-zA-Z0-9]/g, '');
  } else {
    userName = GOOGLE_DRIVE_CONSTANTS.FILE_PREFIX;
  }

  return `${userName}_${year}_${month}_${day}${GOOGLE_DRIVE_CONSTANTS.FILE_EXTENSION}`;
}

/**
 * Format bytes to human-readable string
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();

  const minutes = Math.floor(diffInMs / (1000 * 60));
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString();
}

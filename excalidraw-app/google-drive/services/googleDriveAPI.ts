/**
 * Google Drive API Service
 * Handles all Google Drive API interactions
 * StratAI Whiteboard
 */

import {
  GoogleDriveFile,
  GoogleDriveError,
  ShareOptions,
  StorageInfo,
  GOOGLE_DRIVE_CONSTANTS,
} from '../types';

// Google Drive API v3 base URL
const DRIVE_API_BASE_URL = 'https://www.googleapis.com/drive/v3';
const UPLOAD_API_BASE_URL = 'https://www.googleapis.com/upload/drive/v3';

/**
 * Google Drive API Service Class
 */
export class GoogleDriveAPIService {
  private accessToken: string | null = null;

  constructor(accessToken?: string) {
    if (accessToken) {
      this.accessToken = accessToken;
    }
  }

  /**
   * Set the access token for API calls
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * Get authorization headers
   */
  private getHeaders(): HeadersInit {
    if (!this.accessToken) {
      throw new Error('No access token available. Please sign in first.');
    }

    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Handle API errors
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status} ${response.statusText}`;

      try {
        const errorText = await response.text();
        console.error('Google Drive API Error Response:', errorText);

        // Try to parse as JSON
        const error = JSON.parse(errorText);
        if (error.error) {
          errorMessage = `${error.error.code}: ${error.error.message}`;
        }
      } catch (e) {
        console.error('Failed to parse error response:', e);
      }

      throw new Error(`Google Drive API Error: ${errorMessage}`);
    }

    return response.json();
  }

  /**
   * Find or create the StratAI Whiteboard folder
   */
  async findOrCreateFolder(): Promise<string> {
    try {
      // Search for existing folder
      const searchQuery = `name='${GOOGLE_DRIVE_CONSTANTS.FOLDER_NAME}' and mimeType='${GOOGLE_DRIVE_CONSTANTS.FOLDER_MIME_TYPE}' and trashed=false`;
      const searchUrl = `${DRIVE_API_BASE_URL}/files?q=${encodeURIComponent(searchQuery)}&fields=files(id,name)`;

      const searchResponse = await fetch(searchUrl, {
        headers: this.getHeaders(),
      });

      const searchData = await this.handleResponse<{ files: { id: string }[] }>(
        searchResponse,
      );

      // If folder exists, return its ID
      if (searchData.files && searchData.files.length > 0) {
        return searchData.files[0].id;
      }

      // Create new folder
      const createResponse = await fetch(`${DRIVE_API_BASE_URL}/files`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          name: GOOGLE_DRIVE_CONSTANTS.FOLDER_NAME,
          mimeType: GOOGLE_DRIVE_CONSTANTS.FOLDER_MIME_TYPE,
        }),
      });

      const folderData = await this.handleResponse<{ id: string }>(
        createResponse,
      );

      return folderData.id;
    } catch (error) {
      console.error('Error finding/creating folder:', error);
      throw error;
    }
  }

  /**
   * Upload a file to Google Drive
   * @param content - File content (Excalidraw JSON)
   * @param fileName - File name (auto-generated if not provided)
   * @param thumbnail - Optional thumbnail data URL
   */
  async uploadFile(
    content: string,
    fileName: string,
    thumbnail?: string,
  ): Promise<GoogleDriveFile> {
    try {
      const folderId = await this.findOrCreateFolder();

      // Prepare metadata
      const metadata = {
        name: fileName,
        mimeType: GOOGLE_DRIVE_CONSTANTS.MIME_TYPE,
        parents: [folderId],
      };

      // Prepare multipart request body
      const boundary = '-------314159265358979323846';
      const delimiter = `\r\n--${boundary}\r\n`;
      const closeDelimiter = `\r\n--${boundary}--`;

      let multipartRequestBody =
        delimiter +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        `Content-Type: ${GOOGLE_DRIVE_CONSTANTS.MIME_TYPE}\r\n\r\n` +
        content +
        closeDelimiter;

      // Upload file
      const uploadResponse = await fetch(
        `${UPLOAD_API_BASE_URL}/files?uploadType=multipart&fields=id,name,mimeType,size,createdTime,modifiedTime,thumbnailLink,webViewLink,webContentLink`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': `multipart/related; boundary=${boundary}`,
          },
          body: multipartRequestBody,
        },
      );

      const fileData = await this.handleResponse<GoogleDriveFile>(
        uploadResponse,
      );

      // If thumbnail provided, update file with thumbnail
      if (thumbnail) {
        await this.updateThumbnail(fileData.id, thumbnail);
      }

      return fileData;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  /**
   * Update an existing file
   */
  async updateFile(
    fileId: string,
    content: string,
    thumbnail?: string,
  ): Promise<GoogleDriveFile> {
    try {
      // Update file content
      const updateResponse = await fetch(
        `${UPLOAD_API_BASE_URL}/files/${fileId}?uploadType=media&fields=id,name,mimeType,size,createdTime,modifiedTime,thumbnailLink,webViewLink,webContentLink`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': GOOGLE_DRIVE_CONSTANTS.MIME_TYPE,
          },
          body: content,
        },
      );

      const fileData = await this.handleResponse<GoogleDriveFile>(
        updateResponse,
      );

      // If thumbnail provided, update it
      if (thumbnail) {
        await this.updateThumbnail(fileId, thumbnail);
      }

      return fileData;
    } catch (error) {
      console.error('Error updating file:', error);
      throw error;
    }
  }

  /**
   * Update file thumbnail (custom property)
   */
  private async updateThumbnail(
    fileId: string,
    thumbnailDataUrl: string,
  ): Promise<void> {
    try {
      // Store thumbnail as custom property
      await fetch(`${DRIVE_API_BASE_URL}/files/${fileId}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify({
          properties: {
            thumbnail: thumbnailDataUrl,
          },
        }),
      });
    } catch (error) {
      console.error('Error updating thumbnail:', error);
      // Don't throw - thumbnail is optional
    }
  }

  /**
   * List files in StratAI Whiteboard folder
   */
  async listFiles(pageSize: number = 20): Promise<GoogleDriveFile[]> {
    try {
      const folderId = await this.findOrCreateFolder();

      const query = `'${folderId}' in parents and trashed=false`;
      const url = `${DRIVE_API_BASE_URL}/files?q=${encodeURIComponent(query)}&pageSize=${pageSize}&orderBy=modifiedTime desc&fields=files(id,name,mimeType,size,createdTime,modifiedTime,thumbnailLink,webViewLink,webContentLink,properties)`;

      const response = await fetch(url, {
        headers: this.getHeaders(),
      });

      const data = await this.handleResponse<{ files: GoogleDriveFile[] }>(
        response,
      );

      return data.files || [];
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  /**
   * Download file content
   */
  async downloadFile(fileId: string): Promise<string> {
    try {
      const url = `${DRIVE_API_BASE_URL}/files/${fileId}?alt=media`;

      const response = await fetch(url, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      return response.text();
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }

  /**
   * Delete a file
   */
  async deleteFile(fileId: string): Promise<void> {
    try {
      const response = await fetch(`${DRIVE_API_BASE_URL}/files/${fileId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok && response.status !== 204) {
        throw new Error(`Failed to delete file: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  /**
   * Create a share link for a file
   */
  async createShareLink(
    fileId: string,
    options: ShareOptions,
  ): Promise<string> {
    try {
      // Create permission
      const permission = {
        type: options.type,
        role: options.role,
        ...(options.type === 'anyone' && {
          allowFileDiscovery: options.allowFileDiscovery ?? false,
        }),
      };

      await fetch(`${DRIVE_API_BASE_URL}/files/${fileId}/permissions`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(permission),
      });

      // Get file metadata with webViewLink
      const fileResponse = await fetch(
        `${DRIVE_API_BASE_URL}/files/${fileId}?fields=webViewLink`,
        {
          headers: this.getHeaders(),
        },
      );

      const fileData = await this.handleResponse<{ webViewLink: string }>(
        fileResponse,
      );

      return fileData.webViewLink;
    } catch (error) {
      console.error('Error creating share link:', error);
      throw error;
    }
  }

  /**
   * Get storage information
   */
  async getStorageInfo(): Promise<StorageInfo> {
    try {
      const url = `${DRIVE_API_BASE_URL}/about?fields=storageQuota`;

      const response = await fetch(url, {
        headers: this.getHeaders(),
      });

      const data = await this.handleResponse<{
        storageQuota: {
          limit: string;
          usage: string;
          usageInDrive: string;
          usageInDriveTrash: string;
        };
      }>(response);

      return {
        limit: parseInt(data.storageQuota.limit),
        usage: parseInt(data.storageQuota.usage),
        usageInDrive: parseInt(data.storageQuota.usageInDrive),
        usageInDriveTrash: parseInt(data.storageQuota.usageInDriveTrash),
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      throw error;
    }
  }
}

/**
 * Create a singleton instance
 */
export const googleDriveAPI = new GoogleDriveAPIService();

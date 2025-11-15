/**
 * Google Drive File Picker Modal
 * Modal for selecting files from Google Drive
 * StratAI Whiteboard
 */

import React, { useState, useEffect } from 'react';
import { useGoogleDrive } from '../context/GoogleDriveProvider';
import { GoogleDriveFile, formatBytes, formatRelativeTime } from '../types';

interface FilePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (fileId: string) => void;
}

export function FilePickerModal({
  isOpen,
  onClose,
  onFileSelect,
}: FilePickerModalProps) {
  const { listFiles } = useGoogleDrive();
  const [files, setFiles] = useState<GoogleDriveFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Load files when modal opens
  useEffect(() => {
    if (isOpen) {
      loadFiles();
    }
  }, [isOpen]);

  const loadFiles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fileList = await listFiles(50);
      setFiles(fileList);
    } catch (err) {
      console.error('Error loading files:', err);
      setError('Failed to load files from Google Drive');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileClick = (fileId: string) => {
    onFileSelect(fileId);
    onClose();
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="google-drive-modal-overlay" onClick={onClose}>
      <div
        className="google-drive-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="google-drive-modal-header">
          <h2>Open from Google Drive</h2>
          <button
            type="button"
            className="google-drive-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="google-drive-modal-body">
          {/* Search input */}
          <div className="google-drive-search">
            <input
              type="text"
              placeholder="🔍 Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="google-drive-search-input"
            />
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="google-drive-loading">
              <div className="google-drive-spinner" />
              <p>Loading files from Google Drive...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="google-drive-error">
              <p>❌ {error}</p>
              <button
                type="button"
                onClick={loadFiles}
                className="google-drive-retry-button"
              >
                Retry
              </button>
            </div>
          )}

          {/* File list */}
          {!isLoading && !error && (
            <div className="google-drive-file-list">
              {filteredFiles.length === 0 && (
                <div className="google-drive-empty">
                  <p>
                    {searchQuery
                      ? 'No files match your search'
                      : 'No files found. Create your first drawing!'}
                  </p>
                </div>
              )}

              {filteredFiles.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  className="google-drive-file-item"
                  onClick={() => handleFileClick(file.id)}
                >
                  <div className="google-drive-file-thumbnail">
                    {file.thumbnailLink ? (
                      <img
                        src={file.thumbnailLink}
                        alt={file.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="google-drive-file-thumbnail-placeholder">
                        🖼️
                      </div>
                    )}
                  </div>

                  <div className="google-drive-file-info">
                    <div className="google-drive-file-name" title={file.name}>
                      {file.name}
                    </div>
                    <div className="google-drive-file-meta">
                      <span>
                        {new Date(file.modifiedTime).toLocaleDateString()}
                      </span>
                      <span className="google-drive-file-separator">•</span>
                      <span>{formatBytes(file.size)}</span>
                    </div>
                    <div className="google-drive-file-time">
                      Last modified: {formatRelativeTime(file.modifiedTime)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="google-drive-modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="google-drive-button-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

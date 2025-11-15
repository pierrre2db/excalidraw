/**
 * Google Drive Menu Component
 * Dropdown menu for Google Drive operations
 * StratAI Whiteboard
 */

import React, { useState } from 'react';
import { useGoogleDrive } from '../context/GoogleDriveProvider';
import { formatBytes } from '../types';

export function GoogleDriveMenu() {
  const {
    isAuthenticated,
    userEmail,
    signOut,
    saveToGoogleDrive,
    saveAsToGoogleDrive,
    createVersion,
    newFile,
    openFromGoogleDrive,
    autoSaveConfig,
    toggleAutoSave,
    storageInfo,
    folderId,
    currentFileName,
  } = useGoogleDrive();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Don't show if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveToGoogleDrive();
      // TODO: Show success notification
    } catch (error) {
      console.error('Failed to save:', error);
      // TODO: Show error notification
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAs = async () => {
    try {
      const fileName = prompt('Nom du fichier:', currentFileName || '');
      if (!fileName) return; // User cancelled

      setIsSaving(true);
      await saveAsToGoogleDrive(fileName);
      setIsMenuOpen(false);
      // TODO: Show success notification
    } catch (error) {
      console.error('Failed to save as:', error);
      // TODO: Show error notification
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateVersion = async () => {
    try {
      setIsSaving(true);
      await createVersion();
      setIsMenuOpen(false);
      // TODO: Show success notification
    } catch (error) {
      console.error('Failed to create version:', error);
      // TODO: Show error notification
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewFile = () => {
    if (confirm('Créer un nouveau fichier ? Les modifications non sauvegardées seront perdues.')) {
      newFile();
      setIsMenuOpen(false);
    }
  };

  const handleOpen = async () => {
    try {
      await openFromGoogleDrive();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Failed to open:', error);
      // TODO: Show error notification
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const handleViewInDrive = () => {
    const url = folderId
      ? `https://drive.google.com/drive/folders/${folderId}`
      : 'https://drive.google.com/drive/my-drive';
    window.open(url, '_blank');
  };

  return (
    <div className="google-drive-menu">
      {/* Auto-save indicator */}
      <button
        type="button"
        className="google-drive-autosave-toggle"
        onClick={toggleAutoSave}
        title={`Auto-save is ${autoSaveConfig.enabled ? 'ON' : 'OFF'}. Click to toggle.`}
        aria-label={`Auto-save ${autoSaveConfig.enabled ? 'enabled' : 'disabled'}`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: '4px' }}
        >
          <path
            d="M8 2C5 2 2.5 4.5 2.5 7.5C2.5 9.5 3.5 11 5 12L5 10C4 9.5 3.5 8.5 3.5 7.5C3.5 5.5 5.5 4 8 4C10.5 4 12.5 5.5 12.5 7.5C12.5 8.5 12 9.5 11 10L11 12C12.5 11 13.5 9.5 13.5 7.5C13.5 4.5 11 2 8 2Z"
            fill={autoSaveConfig.enabled ? '#4285F4' : '#666'}
          />
          <path
            d="M7 8L7 14M7 14L5 12M7 14L9 12"
            stroke={autoSaveConfig.enabled ? '#4285F4' : '#666'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Auto-save {autoSaveConfig.enabled ? 'ON' : 'OFF'}
      </button>

      {/* User menu */}
      <div className="google-drive-user-menu">
        <button
          type="button"
          className="google-drive-user-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Google Drive menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: '4px' }}
          >
            <path
              d="M1 8L5 2L11 2L15 8L11 14L5 14L1 8Z"
              fill="#4285F4"
              opacity="0.7"
            />
          </svg>
          Drive: {userEmail} ▾
        </button>

        {isMenuOpen && (
          <div className="google-drive-dropdown">
            <div className="google-drive-dropdown-header">
              <strong>{userEmail}</strong>
            </div>

            <div className="google-drive-dropdown-divider" />

            <button
              type="button"
              className="google-drive-menu-item"
              onClick={handleSave}
              disabled={isSaving}
              title={currentFileName || 'Create new file'}
            >
              <span>💾</span>
              {isSaving ? 'Saving...' : currentFileName ? `Save "${currentFileName}"` : 'Save to Drive'}
              <span className="google-drive-shortcut">Ctrl+S</span>
            </button>

            <button
              type="button"
              className="google-drive-menu-item"
              onClick={handleSaveAs}
              disabled={isSaving}
            >
              <span>📝</span>
              Save As...
            </button>

            <button
              type="button"
              className="google-drive-menu-item"
              onClick={handleCreateVersion}
              disabled={isSaving}
              title="Create a timestamped version"
            >
              <span>🔖</span>
              Create Version
            </button>

            <div className="google-drive-dropdown-divider" />

            <button
              type="button"
              className="google-drive-menu-item"
              onClick={handleNewFile}
            >
              <span>✨</span>
              New File
            </button>

            <button
              type="button"
              className="google-drive-menu-item"
              onClick={handleOpen}
            >
              <span>📁</span>
              Open from Drive
              <span className="google-drive-shortcut">Ctrl+O</span>
            </button>

            <button
              type="button"
              className="google-drive-menu-item"
              onClick={() => {
                /* TODO: Implement share */
              }}
            >
              <span>🔗</span>
              Share from Drive
            </button>

            <div className="google-drive-dropdown-divider" />

            <div className="google-drive-autosave-config">
              <button
                type="button"
                onClick={toggleAutoSave}
                className="google-drive-menu-item"
              >
                <span>{autoSaveConfig.enabled ? '☁️' : '⭕️'}</span>
                Auto-save: {autoSaveConfig.enabled ? 'ON' : 'OFF'}
              </button>
              <div className="google-drive-info-text">
                Save interval: {autoSaveConfig.interval / 60000} min
              </div>
            </div>

            <div className="google-drive-dropdown-divider" />

            {storageInfo && (
              <>
                <div className="google-drive-storage-info">
                  <div className="google-drive-info-text">
                    Storage: {formatBytes(storageInfo.usageInDrive)} /{' '}
                    {formatBytes(storageInfo.limit)}
                  </div>
                  <div className="google-drive-storage-bar">
                    <div
                      className="google-drive-storage-bar-fill"
                      style={{
                        width: `${(storageInfo.usageInDrive / storageInfo.limit) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="google-drive-dropdown-divider" />
              </>
            )}

            <button
              type="button"
              className="google-drive-menu-item"
              onClick={handleViewInDrive}
            >
              <span>🔍</span>
              View in Drive
            </button>

            <div className="google-drive-dropdown-divider" />

            <button
              type="button"
              className="google-drive-menu-item google-drive-menu-item-danger"
              onClick={handleSignOut}
            >
              <span>🚪</span>
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

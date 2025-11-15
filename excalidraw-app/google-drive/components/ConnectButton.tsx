/**
 * Google Drive Connect Button Component
 * Button to initiate Google Drive authentication
 * StratAI Whiteboard
 */

import React from 'react';
import { useGoogleDrive } from '../context/GoogleDriveProvider';

interface ConnectButtonProps {
  className?: string;
}

export function ConnectButton({ className }: ConnectButtonProps) {
  const { signIn, isAuthenticated } = useGoogleDrive();

  // Don't show if already authenticated
  if (isAuthenticated) {
    return null;
  }

  const handleConnect = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error('Failed to connect to Google Drive:', error);
      // TODO: Show error toast/notification
    }
  };

  return (
    <button
      type="button"
      className={`google-drive-connect-button ${className || ''}`}
      onClick={handleConnect}
      aria-label="Connect to Google Drive"
      title="Connect to Google Drive to save and sync your drawings"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginRight: '6px' }}
      >
        <path
          d="M5.33333 1.33333L10.6667 1.33333L14.6667 8L10.6667 14.6667L5.33333 14.6667L1.33333 8L5.33333 1.33333Z"
          fill="#4285F4"
          opacity="0.7"
        />
        <path
          d="M10.6667 1.33333L14.6667 8L10.6667 14.6667"
          stroke="#4285F4"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      Connect Google Drive
    </button>
  );
}

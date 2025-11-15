/**
 * Excalidraw API Context
 * Shares the Excalidraw API reference across the application
 */

import React, { createContext, useContext, ReactNode } from 'react';
import type { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types';

interface ExcalidrawAPIContextValue {
  excalidrawAPI: ExcalidrawImperativeAPI | null;
}

const ExcalidrawAPIContext = createContext<ExcalidrawAPIContextValue | null>(null);

interface ExcalidrawAPIProviderProps {
  excalidrawAPI: ExcalidrawImperativeAPI | null;
  children: ReactNode;
}

/**
 * Provider component that shares the Excalidraw API
 */
export function ExcalidrawAPIProvider({ excalidrawAPI, children }: ExcalidrawAPIProviderProps) {
  return (
    <ExcalidrawAPIContext.Provider value={{ excalidrawAPI }}>
      {children}
    </ExcalidrawAPIContext.Provider>
  );
}

/**
 * Hook to access the Excalidraw API
 * Returns null if API is not yet initialized
 */
export function useExcalidrawAPI(): ExcalidrawImperativeAPI | null {
  const context = useContext(ExcalidrawAPIContext);

  if (!context) {
    console.warn('useExcalidrawAPI must be used within ExcalidrawAPIProvider');
    return null;
  }

  return context.excalidrawAPI;
}

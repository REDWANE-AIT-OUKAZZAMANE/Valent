'use client';

import { createContext, useContext } from 'react';
import { useMusic } from './useMusic';

type MusicContextValue = {
  isPlaying: boolean;
  toggleMusic: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const music = useMusic();

  return <MusicContext.Provider value={music}>{children}</MusicContext.Provider>;
}

export function useMusicContext() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error('useMusicContext must be used within MusicProvider');
  }

  return context;
}

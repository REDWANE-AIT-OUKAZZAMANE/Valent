'use client';

import { useMusicContext } from './MusicContext';

export default function MusicToggle() {
  const { isPlaying, toggleMusic } = useMusicContext();

  return (
    <button
      className="music-toggle global-music-toggle"
      onClick={toggleMusic}
      title={isPlaying ? 'Pause music' : 'Play music'}
      type="button"
    >
      {isPlaying ? '🎵 Music ON' : '🔇 Music OFF'}
    </button>
  );
}

import { useEffect, useRef, useState } from 'react';

export function useMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio('/music/background.mp3');
      audio.loop = true;
      audio.volume = 0.3;
      audioRef.current = audio;

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log('Could not play music:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return { isPlaying, toggleMusic };
}

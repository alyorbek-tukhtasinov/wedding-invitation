import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const MUSIC_URL = '/music.mp3';

interface MusicContextType {
  isPlaying: boolean;
  /** Starts playback. Call synchronously inside a user gesture handler. */
  start: () => void;
  toggle: () => void;
}

const MusicContext = createContext<MusicContextType>({
  isPlaying: false,
  start: () => {},
  toggle: () => {},
});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    audio.loop = true;
  }, []);

  const start = () => {
    const audio = audioRef.current;
    if (!audio || startedRef.current) return;
    startedRef.current = true;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      startedRef.current = true;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, start, toggle }}>
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />
      {children}
    </MusicContext.Provider>
  );
};

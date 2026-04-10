import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';

const MUSIC_URL = 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3';

export const MusicPlayer: React.FC = () => {
  const { t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    audio.loop = true;

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setShowHint(true);
      }
      setAttempted(true);
    };

    const timer = setTimeout(tryPlay, 800);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
      setShowHint(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />

      {/* Music toggle button */}
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '20px',
          zIndex: 100,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.5)',
          background: 'rgba(10,4,8,0.75)',
          backdropFilter: 'blur(12px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '2px',
        }}
      >
        {isPlaying ? (
          <MusicBars />
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 18V5l12-2v13" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="#C9A96E" strokeWidth="1.5"/>
            <circle cx="18" cy="16" r="3" stroke="#C9A96E" strokeWidth="1.5"/>
          </svg>
        )}
      </motion.button>

      {/* Hint toast */}
      <AnimatePresence>
        {showHint && !isPlaying && attempted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={toggle}
            style={{
              position: 'fixed',
              bottom: '84px',
              right: '16px',
              zIndex: 100,
              background: 'rgba(10,4,8,0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(201,169,110,0.3)',
              borderRadius: '12px',
              padding: '10px 14px',
              cursor: 'pointer',
            }}
          >
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px',
              color: '#C9A96E',
              letterSpacing: '0.04em',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              ♪ {t.musicTap}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const MusicBars: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '16px' }}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          style={{
            width: '3px',
            background: '#C9A96E',
            borderRadius: '2px',
          }}
          animate={{
            height: ['4px', '14px', '6px', '12px', '4px'],
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

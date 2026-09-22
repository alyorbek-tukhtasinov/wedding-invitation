import React from 'react';
import { motion } from 'motion/react';
import { useMusic } from './MusicContext';

export const MusicPlayer: React.FC = () => {
  const { isPlaying, toggle } = useMusic();

  return (
    <>
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

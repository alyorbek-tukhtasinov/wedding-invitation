import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from './LanguageContext';

const FLORAL_IMG = 'https://images.unsplash.com/photo-1764010729975-969e3c99e2c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHdlZGRpbmclMjBmbG9yYWwlMjBwaW5rJTIwcm9zZXMlMjBlbGVnYW50fGVufDF8fHx8MTc3NTg0NDc1NXww&ixlib=rb-4.1.0&q=80&w=1080';

export const InvitationSection: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.4 });

  return (
    <section
      ref={ref}
      style={{
        height: '100dvh',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src={FLORAL_IMG}
          alt="Floral background"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'saturate(0.6) brightness(0.3)' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(30,8,15,0.88) 0%, rgba(22,6,12,0.82) 50%, rgba(30,8,15,0.92) 100%)',
        }} />
      </div>

      {/* Decorative corner roses */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '-10px',
          width: '140px',
          height: '140px',
          backgroundImage: `url(${FLORAL_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          maskImage: 'radial-gradient(circle at 0% 0%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 0% 0%, black 20%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          right: '-10px',
          width: '140px',
          height: '140px',
          backgroundImage: `url(${FLORAL_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          maskImage: 'radial-gradient(circle at 100% 100%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 100% 100%, black 20%, transparent 70%)',
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        padding: '32px 36px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '360px',
      }}>
        {/* Top ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}
        >
          <div style={{ width: '32px', height: '1px', background: 'linear-gradient(to right, transparent, #C9A96E)' }} />
          <span style={{ color: '#C9A96E', fontSize: '12px' }}>✦</span>
          <span style={{ color: '#C9A96E', fontSize: '16px' }}>✿</span>
          <span style={{ color: '#C9A96E', fontSize: '12px' }}>✦</span>
          <div style={{ width: '32px', height: '1px', background: 'linear-gradient(to left, transparent, #C9A96E)' }} />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(24px, 7vw, 30px)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#F8F0E3',
            margin: '0 0 24px',
            lineHeight: 1.3,
          }}
        >
          {t.invTitle}
        </motion.h2>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(17px, 5vw, 20px)',
            fontWeight: 300,
            color: 'rgba(245,235,220,0.88)',
            lineHeight: 1.75,
            margin: '0 0 32px',
            letterSpacing: '0.01em',
          }}
        >
          {t.invText}
        </motion.p>

        {/* Closing ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
            marginBottom: '24px',
          }}
        />

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: 'clamp(26px, 8vw, 32px)',
            fontWeight: 600,
            color: '#C9A96E',
            margin: 0,
            textShadow: '0 0 20px rgba(201,169,110,0.4)',
          }}
        >
          {t.invClosing}
        </motion.p>

        {/* Hearts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.75 }}
          style={{ marginTop: '16px', display: 'flex', gap: '8px' }}
        >
          {['♡', '♡', '♡'].map((h, i) => (
            <motion.span
              key={i}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
              style={{ color: '#C9A96E', fontSize: '14px', opacity: 0.7 }}
            >
              {h}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

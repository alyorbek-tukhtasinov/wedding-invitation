import React, { useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from './LanguageContext';

const COUPLE_IMG = 'https://images.unsplash.com/photo-1758810410699-2dc1daec82dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwc2lsaG91ZXR0ZSUyMHN1bnNldCUyMHJvbWFudGljfGVufDF8fHx8MTc3NTg0NDc1Nnww&ixlib=rb-4.1.0&q=80&w=1080';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  startY: number;
}

const PETAL_COLORS = [
  'rgba(220,160,170,0.7)',
  'rgba(240,200,210,0.6)',
  'rgba(255,230,235,0.5)',
  'rgba(200,140,155,0.65)',
  'rgba(245,215,220,0.55)',
];

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const petals: Petal[] = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: (i * 5.8 + Math.sin(i * 1.3) * 8) % 95,
      delay: (i * 0.6) % 9,
      duration: 7 + (i % 4) * 1.5,
      size: 7 + (i % 5) * 2.5,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      startY: -(20 + (i % 3) * 15),
    })),
  []);

  return (
    <section
      ref={sectionRef}
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
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src={COUPLE_IMG}
          alt="Wedding couple"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
        {/* Multi-layer overlay for cinematic depth */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(5,1,3,0.55) 0%, rgba(8,2,5,0.4) 35%, rgba(12,3,7,0.65) 70%, rgba(5,1,3,0.92) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,1,3,0.5) 100%)',
        }} />
      </div>

      {/* Floating Petals */}
      {petals.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: `${p.startY}px`,
            width: `${p.size}px`,
            height: `${p.size * 1.6}px`,
            borderRadius: '50% 20% 50% 20%',
            background: p.color,
            zIndex: 1,
            pointerEvents: 'none',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(p.id) * 40, Math.cos(p.id) * 20, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.8, 0.9, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Decorative top ornament */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        style={{
          position: 'absolute',
          top: '72px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 5,
        }}
      >
        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, #C9A96E)' }} />
        <span style={{ color: '#C9A96E', fontSize: '14px' }}>✦</span>
        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to left, transparent, #C9A96E)' }} />
      </motion.div>

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        textAlign: 'center',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Save the date label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.3em' }}
          animate={{ opacity: 1, letterSpacing: '0.25em' }}
          transition={{ duration: 1.2, delay: 0.3 }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '10px',
            fontWeight: 300,
            color: '#C9A96E',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '28px',
          }}
        >
          ♡ {t.heroDate} ♡
        </motion.p>

        {/* Groom name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(52px, 16vw, 72px)',
            fontWeight: 300,
            color: '#F8F0E3',
            margin: 0,
            lineHeight: 1.1,
            textShadow: '0 2px 30px rgba(201,169,110,0.3)',
          }}
        >
          {t.heroGroom}
        </motion.h1>

        {/* Ampersand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.7, type: 'spring' }}
          style={{ margin: '6px 0' }}
        >
          <span style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: 'clamp(42px, 13vw, 58px)',
            fontWeight: 400,
            color: '#C9A96E',
            display: 'block',
            textShadow: '0 0 30px rgba(201,169,110,0.5)',
          }}>
            &
          </span>
        </motion.div>

        {/* Bride name */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(52px, 16vw, 72px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#F8F0E3',
            margin: 0,
            lineHeight: 1.1,
            textShadow: '0 2px 30px rgba(201,169,110,0.3)',
          }}
        >
          {t.heroBride}
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          style={{
            width: '120px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
            margin: '24px 0 18px',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(16px, 5vw, 20px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(245,240,227,0.85)',
            margin: 0,
            letterSpacing: '0.03em',
          }}
        >
          {t.heroSubtitle}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '9px',
          fontWeight: 300,
          color: 'rgba(201,169,110,0.7)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          {t.scrollHint}
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M6 13l6 6 6-6" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Glowing orb background effects */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '-20%',
        width: '60%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(180,80,100,0.12) 0%, transparent 70%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-20%',
        width: '60%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />
    </section>
  );
};
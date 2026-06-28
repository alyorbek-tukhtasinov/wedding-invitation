import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from './LanguageContext';

const WEDDING_DATE = new Date('2026-07-05T18:00:00');

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

interface CountBlockProps {
  value: number;
  label: string;
  delay: number;
  isInView: boolean;
}

const CountBlock: React.FC<CountBlockProps> = ({ value, label, delay, isInView }) => {
  const display = String(value).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 20 }}
      transition={{ duration: 0.7, delay, type: 'spring', stiffness: 120 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <div style={{
        position: 'relative',
        width: '72px',
        height: '72px',
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(201,169,110,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 25px rgba(201,169,110,0.1), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}>
        {/* Glow effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          background: 'radial-gradient(circle at 50% 0%, rgba(201,169,110,0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <motion.span
          key={display}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '36px',
            fontWeight: 300,
            color: '#F8F0E3',
            lineHeight: 1,
            position: 'relative',
            zIndex: 1,
            textShadow: '0 0 20px rgba(201,169,110,0.4)',
          }}
        >
          {display}
        </motion.span>
      </div>
      <p style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '9px',
        fontWeight: 400,
        color: '#C9A96E',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        margin: 0,
      }}>
        {label}
      </p>
    </motion.div>
  );
};

export const CountdownSection: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

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
      {/* Dark luxury gradient background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, #060210 0%, #0d0418 30%, #0a0308 60%, #0c0212 100%)',
        zIndex: 0,
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, rgba(130,50,80,0.06) 50%, transparent 70%)',
        zIndex: 1,
      }} />

      {/* Ambient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(100,30,60,0.15) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '160px',
          height: '160px',
          background: 'radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Star dots */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{
            duration: 2 + (i % 4),
            repeat: Infinity,
            delay: (i * 0.23) % 3,
          }}
          style={{
            position: 'absolute',
            left: `${(i * 7.3 + 3) % 96}%`,
            top: `${(i * 11.7 + 5) % 92}%`,
            width: i % 5 === 0 ? '2px' : '1px',
            height: i % 5 === 0 ? '2px' : '1px',
            borderRadius: '50%',
            background: '#C9A96E',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
        padding: '0 24px',
      }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '10px',
            fontWeight: 300,
            color: '#C9A96E',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            margin: '0 0 10px',
          }}>
            ⏳
          </p>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(28px, 8vw, 36px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#F8F0E3',
            margin: 0,
          }}>
            {t.countdownTitle}
          </h2>
          <div style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
            margin: '12px auto 0',
          }} />
        </motion.div>

        {/* Countdown blocks */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
        }}>
          <CountBlock value={timeLeft.days} label={t.countdownDays} delay={0.1} isInView={isInView} />
          <CountBlock value={timeLeft.hours} label={t.countdownHours} delay={0.2} isInView={isInView} />
          <CountBlock value={timeLeft.minutes} label={t.countdownMins} delay={0.3} isInView={isInView} />
          <CountBlock value={timeLeft.seconds} label={t.countdownSecs} delay={0.4} isInView={isInView} />
        </div>

        {/* Separator dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#C9A96E',
              }}
            />
          ))}
        </motion.div>

        {/* Wedding date reminder */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '18px',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(201,169,110,0.7)',
            margin: 0,
            textAlign: 'center',
          }}
        >
          05 iyul 2026 · 18:00
        </motion.p>
      </div>
    </section>
  );
};

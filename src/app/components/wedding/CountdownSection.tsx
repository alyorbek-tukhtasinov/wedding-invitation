import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { weddingConfig } from '../../config/weddingConfig';

// Ikki tadbir sanasi (weddingConfig.ts dan)
const QIZ_BAZMI_DATE = new Date(weddingConfig.countdown.event1);
const NIKOH_DATE = new Date(weddingConfig.countdown.event2);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
}

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, finished: false };
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
        gap: '6px',
      }}
    >
      <div style={{
        position: 'relative',
        width: '62px',
        height: '62px',
        borderRadius: '14px',
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
          borderRadius: '14px',
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
            fontSize: '30px',
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
        fontSize: '8px',
        fontWeight: 400,
        color: '#C9A96E',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        margin: 0,
      }}>
        {label}
      </p>
    </motion.div>
  );
};

interface CountdownBlockGroupProps {
  title: string;
  dateLabel: string;
  timeLeft: TimeLeft;
  startedLabel: string;
  baseDelay: number;
  isInView: boolean;
}

const CountdownGroup: React.FC<CountdownBlockGroupProps> = ({
  title, dateLabel, timeLeft, startedLabel, baseDelay, isInView,
}) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay: baseDelay }}
      style={{
        width: '100%',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(201,169,110,0.15)',
        borderRadius: '20px',
        padding: '18px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
      }}
    >
      {/* Event title + date */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '22px',
          fontWeight: 500,
          fontStyle: 'italic',
          color: '#F8F0E3',
          margin: 0,
          lineHeight: 1.1,
        }}>
          {title}
        </p>
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '10px',
          fontWeight: 300,
          color: 'rgba(201,169,110,0.75)',
          letterSpacing: '0.08em',
          margin: '4px 0 0',
        }}>
          {dateLabel}
        </p>
      </div>

      {timeLeft.finished ? (
        <p style={{
          fontFamily: 'Dancing Script, cursive',
          fontSize: '26px',
          fontWeight: 600,
          color: '#C9A96E',
          margin: '4px 0',
          textShadow: '0 0 20px rgba(201,169,110,0.4)',
        }}>
          {startedLabel}
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
        }}>
          <CountBlock value={timeLeft.days} label={t.countdownDays} delay={baseDelay + 0.1} isInView={isInView} />
          <CountBlock value={timeLeft.hours} label={t.countdownHours} delay={baseDelay + 0.15} isInView={isInView} />
          <CountBlock value={timeLeft.minutes} label={t.countdownMins} delay={baseDelay + 0.2} isInView={isInView} />
          <CountBlock value={timeLeft.seconds} label={t.countdownSecs} delay={baseDelay + 0.25} isInView={isInView} />
        </div>
      )}
    </motion.div>
  );
};

export const CountdownSection: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [qizBazmi, setQizBazmi] = useState(() => getTimeLeft(QIZ_BAZMI_DATE));
  const [nikoh, setNikoh] = useState(() => getTimeLeft(NIKOH_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      setQizBazmi(getTimeLeft(QIZ_BAZMI_DATE));
      setNikoh(getTimeLeft(NIKOH_DATE));
    }, 1000);
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
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="/wedding4.jpg"
          alt="Wedding background"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.3)' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(5,1,3,0.55) 0%, rgba(8,2,5,0.4) 35%, rgba(12,3,7,0.65) 70%, rgba(5,1,3,0.92) 100%)',
        }} />
      </div>

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

      {/* Star dots */}
      {[...Array(24)].map((_, i) => (
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
        gap: '20px',
        padding: '0 24px',
        width: '100%',
        maxWidth: '390px',
      }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{
            fontSize: '26px',
            margin: '0 0 6px',
          }}>
            ⏳
          </p>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(26px, 8vw, 34px)',
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
            margin: '10px auto 0',
          }} />
        </motion.div>

        {/* Qiz bazmi countdown */}
        <CountdownGroup
          title={t.event1Name}
          dateLabel={`${t.event1Date} · ${t.event1Time}`}
          timeLeft={qizBazmi}
          startedLabel={t.countdownStarted}
          baseDelay={0.2}
          isInView={isInView}
        />

        {/* Nikoh to'yi countdown */}
        <CountdownGroup
          title={t.event2Name}
          dateLabel={`${t.event2Date} · ${t.event2Time}`}
          timeLeft={nikoh}
          startedLabel={t.countdownStarted}
          baseDelay={0.45}
          isInView={isInView}
        />
      </div>
    </section>
  );
};

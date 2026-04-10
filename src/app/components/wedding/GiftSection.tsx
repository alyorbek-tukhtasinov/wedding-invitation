import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from './LanguageContext';

const CARD_NUMBER = '8600 1234 5678 9012';
const CARD_NUMBER_RAW = '8600123456789012';

export const GiftSection: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [copied, setCopied] = useState(false);

  const copyCard = async () => {
    try {
      await navigator.clipboard.writeText(CARD_NUMBER_RAW);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = CARD_NUMBER_RAW;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
        background: 'linear-gradient(160deg, #080210 0%, #100515 40%, #0d0a02 100%)',
      }}
    >
      {/* Background glow effects */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 70%)',
          }}
        />
        {/* Floating gold particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + i % 3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: `${(i * 8.5 + 5) % 90}%`,
              top: `${(i * 13.3 + 10) % 85}%`,
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: '#C9A96E',
              opacity: 0.2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        width: '100%',
        maxWidth: '380px',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '28px',
      }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '30px', height: '1px', background: 'linear-gradient(to right, transparent, #C9A96E)' }} />
            <span style={{ color: '#C9A96E', fontSize: '18px' }}>💝</span>
            <div style={{ width: '30px', height: '1px', background: 'linear-gradient(to left, transparent, #C9A96E)' }} />
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(28px, 8vw, 36px)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#F8F0E3',
            margin: '0 0 4px',
          }}>
            {t.giftTitle}
          </h2>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '11px',
            fontWeight: 300,
            color: 'rgba(201,169,110,0.7)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            {t.giftSubtitle}
          </p>
        </motion.div>

        {/* Premium Bank Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            width: '100%',
            height: '195px',
            borderRadius: '20px',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          {/* Card Front */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #1a1205 0%, #2d2008 35%, #1e1606 65%, #2a1d05 100%)',
            border: '1px solid rgba(201,169,110,0.35)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.1) inset',
            overflow: 'hidden',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}>
            {/* Card shimmer overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(110deg, transparent 30%, rgba(201,169,110,0.06) 50%, transparent 70%)',
            }} />
            {/* Circular decorative element */}
            <div style={{
              position: 'absolute',
              right: '-30px',
              bottom: '-30px',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              border: '1px solid rgba(201,169,110,0.12)',
            }} />
            <div style={{
              position: 'absolute',
              right: '-10px',
              bottom: '-10px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '1px solid rgba(201,169,110,0.08)',
            }} />

            {/* Chip */}
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              width: '42px',
              height: '32px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #C9A96E 0%, #a07840 50%, #C9A96E 100%)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <div style={{
                width: '100%',
                height: '1px',
                background: 'rgba(0,0,0,0.3)',
                position: 'absolute',
                top: '40%',
              }} />
              <div style={{
                width: '1px',
                height: '70%',
                background: 'rgba(0,0,0,0.2)',
                position: 'absolute',
                left: '50%',
              }} />
            </div>

            {/* Bank logo / name */}
            <div style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
            }}>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#C9A96E',
                letterSpacing: '0.05em',
              }}>
                {t.giftBank}
              </span>
            </div>

            {/* Card number */}
            <div style={{
              position: 'absolute',
              bottom: '56px',
              left: '24px',
              right: '24px',
            }}>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '10px',
                fontWeight: 300,
                color: 'rgba(201,169,110,0.6)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: '0 0 6px',
              }}>
                {t.giftCardLabel}
              </p>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '18px',
                fontWeight: 300,
                color: '#F8F0E3',
                letterSpacing: '0.18em',
                margin: 0,
              }}>
                {CARD_NUMBER}
              </p>
            </div>

            {/* Cardholder */}
            <div style={{
              position: 'absolute',
              bottom: '22px',
              left: '24px',
            }}>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '11px',
                fontWeight: 300,
                color: 'rgba(248,240,227,0.7)',
                letterSpacing: '0.1em',
                margin: 0,
              }}>
                {t.giftHolder}
              </p>
            </div>

            {/* Validity */}
            <div style={{
              position: 'absolute',
              bottom: '22px',
              right: '24px',
            }}>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '11px',
                fontWeight: 300,
                color: 'rgba(248,240,227,0.5)',
                letterSpacing: '0.08em',
                margin: 0,
              }}>
                05/29
              </p>
            </div>
          </div>
        </motion.div>

        {/* Copy button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          onClick={copyCard}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '16px',
            background: copied
              ? 'rgba(80,160,100,0.15)'
              : 'rgba(201,169,110,0.1)',
            border: `1px solid ${copied ? 'rgba(80,160,100,0.4)' : 'rgba(201,169,110,0.3)'}`,
            color: copied ? 'rgba(140,220,160,0.9)' : '#C9A96E',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'all 0.3s',
          }}
        >
          <motion.span
            animate={copied ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {copied ? '✓' : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
            )}
          </motion.span>
          {copied ? t.giftCopied : t.giftCopy}
        </motion.button>

        {/* Thank you note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: '20px',
            fontWeight: 400,
            color: 'rgba(201,169,110,0.6)',
            margin: 0,
            textAlign: 'center',
          }}
        >
          ♡ {t.giftNote} ♡
        </motion.p>
      </div>
    </section>
  );
};
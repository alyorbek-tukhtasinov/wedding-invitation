import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from './LanguageContext';

// Embedded map (using Yandex) centered at longitude,latitude = 70.765808,40.368340
const MAPS_GOOGLE = 'https://yandex.uz/map-widget/v1/?ll=70.765808%2C40.368340&z=16&source=mapframe';
// Link to open the same coordinates in Yandex Maps
const MAPS_GOOGLE_LINK = 'https://yandex.uz/maps/?ll=70.765808%2C40.368340&z=16';
const MAPS_YANDEX_LINK = 'https://yandex.uz/maps/?ll=70.765808%2C40.368340&z=16';

export const MapSection: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

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
          src="/wedding5.jpg"
          alt="Wedding background"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.3)' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(5,1,3,0.55) 0%, rgba(8,2,5,0.4) 35%, rgba(12,3,7,0.65) 70%, rgba(5,1,3,0.92) 100%)',
        }} />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 5,
        width: '100%',
        maxWidth: '390px',
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          <span style={{ fontSize: '22px' }}>📍</span>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(26px, 8vw, 34px)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#F8F0E3',
            margin: '6px 0 0',
          }}>
            {t.mapTitle}
          </h2>
          <div style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
            margin: '10px auto 0',
          }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            width: '100%',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(201,169,110,0.25)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            position: 'relative',
          }}
        >
          <iframe
            src={MAPS_GOOGLE}
            title="Wedding venue map"
            width="100%"
            height="220"
            style={{ display: 'block', border: 'none', filter: 'invert(0.9) hue-rotate(180deg) saturate(0.7)' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '32px',
            background: 'linear-gradient(to top, rgba(10,2,5,0.9) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(201,169,110,0.2)',
            borderRadius: '18px',
            padding: '18px 22px',
          }}
        >
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '20px',
            fontWeight: 500,
            color: '#F8F0E3',
            margin: '0 0 4px',
          }}>
            {t.mapVenue}
          </p>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '12px',
            fontWeight: 300,
            color: 'rgba(245,235,215,0.6)',
            margin: 0,
          }}>
            {t.mapAddress}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: 'flex', gap: '12px', width: '100%' }}
        >
          <a
            href={MAPS_GOOGLE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px',
              background: 'rgba(201,169,110,0.12)',
              border: '1px solid rgba(201,169,110,0.3)',
              borderRadius: '14px',
              textDecoration: 'none',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              color: '#C9A96E',
              letterSpacing: '0.05em',
              transition: 'all 0.2s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#C9A96E" strokeWidth="1.5"/>
              <circle cx="12" cy="9" r="2.5" stroke="#C9A96E" strokeWidth="1.5"/>
            </svg>
            {t.mapOpen}
          </a>
          <a
            href={MAPS_YANDEX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px',
              background: 'rgba(255,50,50,0.08)',
              border: '1px solid rgba(255,100,100,0.2)',
              borderRadius: '14px',
              textDecoration: 'none',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              color: 'rgba(255,160,160,0.85)',
              letterSpacing: '0.05em',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="rgba(255,140,140,0.85)" strokeWidth="1.5"/>
              <circle cx="12" cy="9" r="2.5" stroke="rgba(255,140,140,0.85)" strokeWidth="1.5"/>
            </svg>
            {t.mapOpenYandex}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { weddingConfig, type VenueInfo } from '../../config/weddingConfig';

// Bitta to'yxona rejimi uchun (eski) havolalar
const MAPS_EMBED = weddingConfig.map.embed;
const MAPS_YANDEX_LINK = weddingConfig.map.yandexLink;
const MAPS_GOOGLE_LINK = weddingConfig.map.googleLink;

const PinIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth="1.5" />
  </svg>
);

interface MapButtonsProps {
  googleLink: string;
  yandexLink: string;
  googleLabel: string;
  yandexLabel: string;
}

const MapButtons: React.FC<MapButtonsProps> = ({ googleLink, yandexLink, googleLabel, yandexLabel }) => (
  <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
    <a
      href={googleLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        padding: '13px', background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.3)',
        borderRadius: '14px', textDecoration: 'none', fontFamily: 'Montserrat, sans-serif',
        fontSize: '12px', fontWeight: 400, color: '#C9A96E', letterSpacing: '0.05em',
      }}
    >
      <PinIcon color="#C9A96E" />
      {googleLabel}
    </a>
    <a
      href={yandexLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        padding: '13px', background: 'rgba(255,50,50,0.08)', border: '1px solid rgba(255,100,100,0.2)',
        borderRadius: '14px', textDecoration: 'none', fontFamily: 'Montserrat, sans-serif',
        fontSize: '12px', fontWeight: 400, color: 'rgba(255,160,160,0.85)', letterSpacing: '0.05em',
      }}
    >
      <PinIcon color="rgba(255,140,140,0.85)" />
      {yandexLabel}
    </a>
  </div>
);

const MapFrame: React.FC<{ src: string; height: number }> = ({ src, height }) => (
  <div style={{
    width: '100%', borderRadius: '18px', overflow: 'hidden',
    border: '1px solid rgba(201,169,110,0.25)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
    position: 'relative',
  }}>
    <iframe
      src={src}
      title="Wedding venue map"
      width="100%"
      height={height}
      style={{ display: 'block', border: 'none', filter: 'invert(0.9) hue-rotate(180deg) saturate(0.7)' }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: '28px',
      background: 'linear-gradient(to top, rgba(10,2,5,0.9) 0%, transparent 100%)', pointerEvents: 'none',
    }} />
  </div>
);

const SectionBackground: React.FC = () => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <img
      src="/wedding5.jpg"
      alt="Wedding background"
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.3)' }}
    />
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, rgba(5,1,3,0.55) 0%, rgba(8,2,5,0.4) 35%, rgba(12,3,7,0.65) 70%, rgba(5,1,3,0.92) 100%)',
    }} />
  </div>
);

const SectionTitle: React.FC<{ title: string; isInView: boolean }> = ({ title, isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
    transition={{ duration: 0.8 }}
    style={{ textAlign: 'center' }}
  >
    <span style={{ fontSize: '22px' }}>📍</span>
    <h2 style={{
      fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(26px, 8vw, 34px)',
      fontWeight: 400, fontStyle: 'italic', color: '#F8F0E3', margin: '6px 0 0',
    }}>
      {title}
    </h2>
    <div style={{
      width: '60px', height: '1px',
      background: 'linear-gradient(to right, transparent, #C9A96E, transparent)', margin: '10px auto 0',
    }} />
  </motion.div>
);

export const MapSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  const venues = weddingConfig.venues;
  const multi = !!(venues && venues.length > 0);

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
      <SectionBackground />

      {multi ? (
        // ---- Ko'p to'yxona: hammasi bitta sahifada ----
        <div
          style={{
            position: 'relative', zIndex: 5, width: '100%', maxWidth: '400px',
            padding: '16px 20px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '16px',
            maxHeight: '100dvh', overflowY: 'auto',
            scrollbarWidth: 'none', msOverflowStyle: 'none',
          }}
        >
          <SectionTitle title={t.mapTitle} isInView={isInView} />

          {(venues as VenueInfo[]).map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
              style={{
                width: '100%', display: 'flex', flexDirection: 'column', gap: '10px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,169,110,0.18)',
                borderRadius: '20px', padding: '14px',
              }}
            >
              <p style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 500,
                fontStyle: 'italic', color: '#C9A96E', margin: 0, textAlign: 'center',
              }}>
                {v.label[lang]}
              </p>
              <MapFrame src={v.embed} height={150} />
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif', fontSize: '19px', fontWeight: 500,
                  color: '#F8F0E3', margin: '0 0 2px',
                }}>
                  {v.name[lang]}
                </p>
                <p style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 300,
                  color: 'rgba(245,235,215,0.6)', margin: 0,
                }}>
                  {v.address[lang]}
                </p>
              </div>
              <MapButtons
                googleLink={v.googleLink}
                yandexLink={v.yandexLink}
                googleLabel={t.mapOpen}
                yandexLabel={t.mapOpenYandex}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        // ---- Bitta to'yxona (eski ko'rinish) ----
        <div style={{
          position: 'relative', zIndex: 5, width: '100%', maxWidth: '390px', padding: '0 20px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
        }}>
          <SectionTitle title={t.mapTitle} isInView={isInView} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ width: '100%' }}
          >
            <MapFrame src={MAPS_EMBED} height={220} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              width: '100%', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(201,169,110,0.2)',
              borderRadius: '18px', padding: '18px 22px',
            }}
          >
            <p style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 500,
              color: '#F8F0E3', margin: '0 0 4px',
            }}>
              {t.mapVenue}
            </p>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 300,
              color: 'rgba(245,235,215,0.6)', margin: 0,
            }}>
              {t.mapAddress}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ width: '100%' }}
          >
            <MapButtons
              googleLink={MAPS_GOOGLE_LINK}
              yandexLink={MAPS_YANDEX_LINK}
              googleLabel={t.mapOpen}
              yandexLabel={t.mapOpenYandex}
            />
          </motion.div>
        </div>
      )}
    </section>
  );
};

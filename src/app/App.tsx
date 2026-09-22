import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { LanguageProvider } from './components/wedding/LanguageContext';
import { LanguageSelector } from './components/wedding/LanguageSelector';
import { MusicProvider } from './components/wedding/MusicContext';
import { MusicPlayer } from './components/wedding/MusicPlayer';
import { EnvelopeIntro } from './components/wedding/EnvelopeIntro';
import { HeroSection } from './components/wedding/HeroSection';
import { InvitationSection } from './components/wedding/InvitationSection';
import { DetailsSection } from './components/wedding/DetailsSection';
import { CountdownSection } from './components/wedding/CountdownSection';
import { MapSection } from './components/wedding/MapSection';
import { GiftSection } from './components/wedding/GiftSection';
import { weddingConfig } from './config/weddingConfig';

export default function App() {
  const [hasOpened, setHasOpened] = useState(false);

  // Sovg'a bo'limi weddingConfig.gift.enabled orqali yoqiladi/o'chiriladi.
  const giftEnabled = weddingConfig.gift.enabled;
  // Bo'limlar soni: Hero, Invitation, Details, Countdown, Map (+ Gift)
  const totalSections = giftEnabled ? 6 : 5;

  // Brauzer sahifa nomini config'dan o'rnatamiz.
  useEffect(() => {
    document.title = weddingConfig.siteTitle;
  }, []);

  return (
    <LanguageProvider>
      <MusicProvider>
        <div
          style={{
            // On desktop: center a mobile-proportioned column
            minHeight: '100dvh',
            background: '#050102',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {/* Desktop side panels */}
          <div
            style={{
              display: 'none',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(ellipse at center, #0d0408 0%, #030001 100%)',
              zIndex: -1,
            }}
          />

          {/* Phone container */}
          <div
            id="wedding-scroll"
            style={{
              width: '100%',
              maxWidth: '430px',
              height: '100dvh',
              overflowY: hasOpened ? 'scroll' : 'hidden',
              pointerEvents: hasOpened ? 'auto' : 'none',
              scrollSnapType: 'y mandatory',
              scrollBehavior: 'smooth',
              position: 'relative',
              // Hide scrollbar
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <style>{`
              #wedding-scroll::-webkit-scrollbar { display: none; }
              * { box-sizing: border-box; }
            `}</style>

            <HeroSection />
            <InvitationSection />
            <DetailsSection />
            <CountdownSection />
            <MapSection />
            {giftEnabled && <GiftSection />}
          </div>

          {/* Overlays (fixed, always on top) */}
          <LanguageSelector />
          <MusicPlayer />

          {/* Section progress indicator */}
          <SectionProgress totalSections={totalSections} />

          {/* Envelope intro gate — ochilish (konvert) effekti */}
          <AnimatePresence>
            {!hasOpened && <EnvelopeIntro onOpen={() => setHasOpened(true)} />}
          </AnimatePresence>
        </div>
      </MusicProvider>
    </LanguageProvider>
  );
}

// Tiny dot progress indicator on the left edge
const SectionProgress: React.FC<{ totalSections: number }> = ({ totalSections }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEffect(() => {
    const container = document.getElementById('wedding-scroll');
    if (!container) return;

    const onScroll = () => {
      const scrollTop = container.scrollTop;
      const sectionHeight = container.clientHeight;
      const idx = Math.round(scrollTop / sectionHeight);
      setActiveIndex(Math.min(idx, totalSections - 1));
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [totalSections]);

  return (
    <div
      style={{
        position: 'fixed',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 150,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {Array.from({ length: totalSections }).map((_, i) => (
        <button
          key={i}
          onClick={() => {
            const container = document.getElementById('wedding-scroll');
            if (container) {
              container.scrollTo({ top: i * container.clientHeight, behavior: 'smooth' });
            }
          }}
          style={{
            width: activeIndex === i ? '6px' : '4px',
            height: activeIndex === i ? '20px' : '4px',
            borderRadius: '3px',
            background: activeIndex === i ? '#C9A96E' : 'rgba(201,169,110,0.3)',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: activeIndex === i ? '0 0 8px rgba(201,169,110,0.5)' : 'none',
          }}
        />
      ))}
    </div>
  );
};
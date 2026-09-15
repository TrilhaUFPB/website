'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { useTranslation } from '@/hooks/useTranslation';
import { usePostHogTracking } from '@/hooks/usePostHogTracking';

function FlipWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words, interval]);
  return (
    <span className="flipword">
      {words.map((w, idx) => (
        <span key={idx} className={`flipword-item ${idx === i ? 'on' : ''}`}>
          {w}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const { trackHeroButtonClick } = usePostHogTracking();
  const flips = t<string[]>('hero.flips');
  return (
    <section id="hero" className="section hero-section hero-with-beams">
      <BackgroundBeamsWithCollision className="hero-beams">
        <div className="container hero-container">
          <motion.div
            className="hero-top"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.3, 1] }}
          >
            <h1 className="display hero-headline">
              {t('hero.titleA')}{' '}
              <span className="serif-italic hero-flip" style={{ color: 'var(--mint-deep)' }}>
                <FlipWord words={flips} />
              </span>
            </h1>
            <div className="hero-actions">
              <a href="#sobre" className="btn btn--mint" onClick={trackHeroButtonClick}>
                {t('hero.ctaPrimary')}
                <span className="arrow">→</span>
              </a>
              <a href="#time" className="btn btn--ghost">
                {t('hero.ctaSecondary')}
              </a>
            </div>
          </motion.div>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  );
}

'use client';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <NavBar />
      <main className="shell">
        <section className="section notfound-section">
          <div className="container notfound-container">
            <motion.div
              className="notfound-inner"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.3, 1] }}
            >
              <div className="notfound-code display" aria-hidden="true">
                {t('notFound.code')}
              </div>
              <h1 className="display notfound-headline">
                {t('notFound.titleA')}{' '}
                <span className="serif-italic" style={{ color: 'var(--mint-deep)' }}>
                  {t('notFound.titleFlip')}
                </span>
              </h1>
              <p className="notfound-lede">{t('notFound.lede')}</p>
              <div className="notfound-actions">
                <a href="/" className="btn btn--mint">
                  {t('notFound.ctaPrimary')}
                  <span className="arrow">→</span>
                </a>
                <a href="/materiais" className="btn btn--ghost">
                  {t('notFound.ctaSecondary')}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

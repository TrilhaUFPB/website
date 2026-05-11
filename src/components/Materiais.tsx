'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function Materiais() {
  const { t } = useTranslation();
  const tracks = t<string[]>('materiais.tracks');
  return (
    <section id="materiais" className="section section--ink">
      <div className="container">
        <div className="mat-wrap">
          <div className="mat-left">
            <h2
              className="display"
              style={{
                fontSize: 'clamp(40px, 5.5vw, 80px)',
                margin: '0 0 24px',
                maxWidth: '14ch',
                color: '#F2EAD8',
              }}
            >
              {t('materiais.title')}
            </h2>
            <p style={{ color: '#C2C9DC', maxWidth: '46ch', fontSize: 18, lineHeight: 1.55 }}>
              {t('materiais.lede')}
            </p>
            <a
              href="/materiais"
              className="btn"
              style={{ marginTop: 36, background: 'var(--mint)', color: 'var(--midnight)' }}
            >
              {t('materiais.cta')}
              <span className="arrow">→</span>
            </a>
          </div>
          <div className="mat-right">
            {tracks.map((label, i) => (
              <a key={i} href="/materiais" className="mat-track">
                <span className="mat-track-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="mat-track-name">{label}</span>
                <span className="mat-track-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

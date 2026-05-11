'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();
  const locationLines = t<string[]>('footer.locationLines');
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="display" style={{ fontSize: 56, lineHeight: 0.92, letterSpacing: '-0.02em' }}>
            trilha<span style={{ color: 'var(--mint)' }}>.</span>
          </div>
          <p style={{ maxWidth: '36ch', color: 'var(--ink-soft)', marginTop: 12 }}>{t('footer.tagline')}</p>
        </div>
        <div className="footer-col">
          <div className="kicker">{t('footer.sections')}</div>
          <ul>
            <li><a href="#sobre">{t('nav.sobre')}</a></li>
            <li><a href="#turmas">{t('nav.turmas')}</a></li>
            <li><a href="#projetos">{t('nav.projetos')}</a></li>
            <li><a href="#time">{t('nav.time')}</a></li>
            <li><a href="/materiais">{t('nav.materiais')}</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="kicker">{t('footer.contact')}</div>
          <ul>
            <li>
              <a href="mailto:contato.trilhaufpb@gmail.com">contato.trilhaufpb@gmail.com</a>
            </li>
            <li>
              <a href="https://www.instagram.com/trilhaufpb" target="_blank" rel="noreferrer">
                @trilhaufpb
              </a>
            </li>
            <li>
              <a href="https://github.com/trilhaufpb" target="_blank" rel="noreferrer">
                github.com/trilhaufpb
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="kicker">{t('footer.locationLabel')}</div>
          <ul>
            {locationLines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-foot">
        <span>© 2024–2026 Trilha. {t('footer.rights')}</span>
        <span className="kicker">{t('footer.version')}</span>
      </div>
    </footer>
  );
}

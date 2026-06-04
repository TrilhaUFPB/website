'use client';

import { usePostHogTracking } from '@/hooks/usePostHogTracking';
import { useTranslation } from '@/hooks/useTranslation';

type Paper = { slug: string; tag: string; title: string; desc: string; lang: string; author: string };

export default function PapersPage() {
  const { t } = useTranslation();
  const { trackPaperClick } = usePostHogTracking();
  const papers = t<Paper[]>('papers.items');

  return (
    <section className="section section--top-tight">
      <div className="container">
        <header className="section-head section-head--wide">
          <p className="eyebrow">{t('papers.eyebrow')}</p>
          <h2>{t('papers.title')}</h2>
          <p className="lede">{t('papers.lede')}</p>
        </header>

        <div className="papers-grid">
          {papers.map((p, index) => (
            <a
              key={p.slug}
              href={`/papers/${p.slug}.html`}
              target="_blank"
              rel="noreferrer"
              className="paper-card"
              onClick={() => trackPaperClick(p, index)}
            >
              <div className="paper-card-body">
                <div className="paper-card-top">
                  <span className="kicker tag-dot" style={{ color: 'var(--mint-deep)' }}>
                    {p.tag}
                  </span>
                  <span className="paper-lang">{p.lang}</span>
                </div>
                <h3 className="display paper-card-title">{p.title}</h3>
                <p className="paper-card-desc">{p.desc}</p>
              </div>
              <div className="paper-card-footer">
                <span className="kicker" style={{ color: 'var(--ink-muted)' }}>{t('papers.by')} {p.author}</span>
                <span className="btn btn--ghost" style={{ fontSize: 13, padding: '10px 18px' }}>
                  {t('papers.cta')} <span className="arrow">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

type Aula = {
  number: string;
  title: string;
  description: string;
  embedUrl: string;
  date?: string;
  deadline?: string;
};

export default function AulasPage() {
  const { t } = useTranslation();
  const aulas = t<Aula[]>('aulas.items');

  return (
    <section className="section">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">{t('aulas.eyebrow')}</p>
          <h2>{t('aulas.title')}</h2>
          <p className="lede">{t('aulas.lede')}</p>
        </header>

        <div className="aulas-schedule">
          {aulas.map((aula) => {
            const hasSlide = Boolean(aula.embedUrl);
            return (
              <Link key={aula.number} href={`/aulas/${aula.number}`} className="aula-scard">
                <div className="aula-scard-num">
                  <span>{aula.number}</span>
                </div>

                <div className="aula-scard-body">
                  <h3 className="aula-scard-title">{aula.title}</h3>
                  <p className="aula-scard-desc">{aula.description}</p>
                </div>

                <div className="aula-scard-right">
                  {aula.date ? (
                    <div className="aula-scard-dates">
                      <span className="aula-scard-date">{aula.date}</span>
                      {aula.deadline && (
                        <span className="aula-scard-deadline">
                          {t('aulas.deadlineLabel')}: {aula.deadline}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="aula-scard-soon">{t('aulas.comingSoon')}</span>
                  )}
                  <span className={`aula-scard-status ${hasSlide ? 'aula-scard-status--on' : ''}`}>
                    {hasSlide ? t('aulas.available') : t('aulas.comingSoon')}
                  </span>
                </div>

                <span className="aula-scard-arrow">→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

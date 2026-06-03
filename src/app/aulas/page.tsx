'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

type Aula = {
  number: string;
  category: string;
  title: string;
  description: string;
  embedUrl: string;
  date?: string;
  dateISO?: string;
  deadline?: string;
  taskType?: string;
};

function getDateState(dateISO?: string): 'past' | 'today' | 'upcoming' {
  if (!dateISO) return 'upcoming';
  const today = new Date().toISOString().slice(0, 10);
  if (dateISO < today) return 'past';
  if (dateISO === today) return 'today';
  return 'upcoming';
}

export default function AulasPage() {
  const { t } = useTranslation();
  const aulas = t<Aula[]>('aulas.items');
  const categories = t<Record<string, string>>('aulas.categories');

  const groups: { category: string; items: Aula[] }[] = [];
  for (const aula of aulas) {
    const last = groups[groups.length - 1];
    if (last && last.category === aula.category) {
      last.items.push(aula);
    } else {
      groups.push({ category: aula.category, items: [aula] });
    }
  }

  return (
    <section className="section">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">{t('aulas.eyebrow')}</p>
          <h2>{t('aulas.title')}</h2>
          <p className="lede">{t('aulas.lede')}</p>
        </header>

        <div className="aulas-schedule">
          {groups.map(({ category, items }) => {
            const categoryLabel = categories?.[category] ?? category;
            return (
              <div key={category} className="aulas-group">
                <div className={`aulas-group-header aulas-group-header--${category}`}>
                  <span className="aulas-group-label">{categoryLabel}</span>
                </div>
                {items.map((aula) => {
                  const hasSlide = Boolean(aula.embedUrl);
                  const isMini = aula.taskType === 'miniprojeto';
                  const dateState = getDateState(aula.dateISO);
                  return (
                    <Link
                      key={aula.number}
                      href={`/aulas/${aula.number}`}
                      className={`aula-scard aula-scard--${dateState}`}
                    >
                      <div className="aula-scard-num">
                        <span>{aula.number}</span>
                      </div>

                      <div className="aula-scard-body">
                        <div className="aula-scard-title-row">
                          <h3 className="aula-scard-title">{aula.title}</h3>
                          {dateState === 'today' && (
                            <span className="aula-scard-today-tag">{t('aulas.today')}</span>
                          )}
                          {isMini && <span className="aula-scard-mini-tag">Mini-Projeto</span>}
                        </div>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

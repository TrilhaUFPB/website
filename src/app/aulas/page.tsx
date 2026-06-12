'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
  }).format(new Date());
  if (dateISO < today) return 'past';
  if (dateISO === today) return 'today';
  return 'upcoming';
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function pickDefaultOpenCategory(aulas: Aula[]): string | null {
  if (!aulas.length) return null;
  const todayAula = aulas.find((a) => getDateState(a.dateISO) === 'today');
  if (todayAula) return todayAula.category;
  const upcomingAula = aulas.find((a) => getDateState(a.dateISO) === 'upcoming');
  if (upcomingAula) return upcomingAula.category;
  // all past — open the last category that has any aula
  const lastWithDate = [...aulas].reverse().find((a) => a.dateISO);
  return lastWithDate?.category ?? aulas[0].category;
}

export default function AulasPage() {
  const { t } = useTranslation();
  const aulas = t<Aula[]>('aulas.items');
  const categories = t<Record<string, string>>('aulas.categories');
  const searchPlaceholder = t('aulas.searchPlaceholder');
  const noResultsLabel = t('aulas.noResults');

  const [query, setQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<Set<string>>(() => {
    const initial = pickDefaultOpenCategory(aulas);
    return new Set(initial ? [initial] : []);
  });

  const groups = useMemo(() => {
    const out: { category: string; items: Aula[] }[] = [];
    for (const aula of aulas) {
      const last = out[out.length - 1];
      if (last && last.category === aula.category) {
        last.items.push(aula);
      } else {
        out.push({ category: aula.category, items: [aula] });
      }
    }
    return out;
  }, [aulas]);

  const trimmed = query.trim();
  const isSearching = trimmed.length > 0;
  const needle = normalize(trimmed);

  const filteredGroups = useMemo(() => {
    if (!isSearching) return groups;
    return groups
      .map((g) => ({
        category: g.category,
        items: g.items.filter((a) => {
          const haystack = normalize(`${a.number} ${a.title} ${a.description}`);
          return haystack.includes(needle);
        }),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, isSearching, needle]);

  const totalMatches = useMemo(
    () => filteredGroups.reduce((sum, g) => sum + g.items.length, 0),
    [filteredGroups],
  );

  function toggleCategory(category: string) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  return (
    <section className="section section--top-tight">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">{t('aulas.eyebrow')}</p>
          <h2>{t('aulas.title')}</h2>
          <p className="lede">{t('aulas.lede')}</p>
        </header>

        <div className="aulas-search">
          <span className="aulas-search-icon" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M14 14L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="search"
            className="aulas-search-input"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={searchPlaceholder}
          />
          {isSearching && (
            <button
              type="button"
              className="aulas-search-clear"
              onClick={() => setQuery('')}
              aria-label={t('aulas.clearSearch')}
            >
              ✕
            </button>
          )}
        </div>

        {isSearching && totalMatches === 0 ? (
          <p className="aulas-empty">{noResultsLabel.replace('{q}', trimmed)}</p>
        ) : (
          <div className="aulas-schedule">
            {filteredGroups.map(({ category, items }) => {
              const categoryLabel = categories?.[category] ?? category;
              const isOpen = isSearching || openCategories.has(category);
              const totalInCategory = groups.find((g) => g.category === category)?.items.length ?? items.length;
              const countLabel = isSearching && items.length !== totalInCategory
                ? `${items.length} de ${totalInCategory}`
                : `${items.length} ${items.length === 1 ? t('aulas.lessonSingular') : t('aulas.lessonPlural')}`;
              return (
                <div key={category} className="aulas-group">
                  <button
                    type="button"
                    className={`aulas-group-header aulas-group-header--${category}${isOpen ? ' is-open' : ''}`}
                    onClick={() => toggleCategory(category)}
                    aria-expanded={isOpen}
                    aria-controls={`aulas-group-body-${category}`}
                  >
                    <span className="aulas-group-chevron" aria-hidden="true">
                      <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
                        <path d="M3 1.5L8 6L3 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="aulas-group-label">{categoryLabel}</span>
                    <span className="aulas-group-count">{countLabel}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`aulas-group-body-${category}`}
                        className="aulas-group-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.2, 0.8, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="aulas-group-inner">
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

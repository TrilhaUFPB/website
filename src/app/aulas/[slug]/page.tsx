'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function renderRichText(text: string) {
  return text.split('\n').map((line, lineIdx, lines) => (
    <span key={lineIdx}>
      {line.split(URL_REGEX).map((part, partIdx) => {
        if (!/^https?:\/\//.test(part)) return part;
        const trailing = part.match(/[.,;:!?)\]]+$/)?.[0] ?? '';
        const url = part.slice(0, part.length - trailing.length);
        return (
          <span key={partIdx}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="aula-homework-link"
            >
              {url}
            </a>
            {trailing}
          </span>
        );
      })}
      {lineIdx < lines.length - 1 && <br />}
    </span>
  ));
}

type AulaLink = { label: string; url: string };
type Aula = {
  number: string;
  category: string;
  title: string;
  description: string;
  embedUrl: string;
  canvaUrl: string;
  date?: string;
  deadline?: string;
  taskType?: string;
  homework?: string;
  links?: AulaLink[];
};


export default function AulaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t } = useTranslation();
  const aulas = t<Aula[]>('aulas.items');
  const categories = t<Record<string, string>>('aulas.categories');
  const aula = aulas.find((a) => a.number === slug);

  const [edicao, setEdicao] = useState('2026.1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [taskLink, setTaskLink] = useState('');
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');

  const edicoes = ['2025.2', '2026.1'];

  if (!aula) return null;

  const isMini = aula.taskType === 'miniprojeto';
  const taskTitle = isMini ? t('aulas.miniprojetoTitle') : t('aulas.homeworkTitle');
  const categoryLabel = categories?.[aula.category] ?? '';
  const guidelines = t<{ title: string; items: string[] }>('aulas.guidelines');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!edicao || !name || !email || !taskLink) {
      setFormError(t('aulas.form.errorRequired'));
      return;
    }
    if (!taskLink.startsWith('https://github.com/')) {
      setFormError(t('aulas.form.errorGithub'));
      return;
    }

    setSending(true);
    try {
      await fetch('/api/submit-aula', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          edition: edicao,
          aula: `Aula ${aula.number} — ${aula.title}`,
          name,
          email,
          'link-da-tarefa': taskLink,
          observacoes: notes,
        }),
      });
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
      <div className="aula-page-inner">

        <Link href="/aulas" className="aula-back">
          ← {t('aulas.back')}
        </Link>

        {/* Header */}
        <header className="aula-page-header">
          <div className="aula-page-header-meta">
            <span className="kicker tag-dot" style={{ color: 'var(--mint-deep)' }}>
              {t('aulas.lessonLabel')} {aula.number}
            </span>
            {categoryLabel && (
              <span className={`aula-page-category aula-page-category--${aula.category}`}>
                {categoryLabel}
              </span>
            )}
            {aula.date && (
              <span className="kicker" style={{ color: 'var(--ink-soft)' }}>{aula.date}</span>
            )}
          </div>
          <h1 className="display aula-page-title">{aula.title}</h1>
          <p className="aula-page-subtitle">{aula.description}</p>
        </header>

        {/* Slide — only when embedUrl is set */}
        {aula.embedUrl && (
          <div className="aula-page-embed-outer">
            <div className="aula-page-embed-ratio">
              <iframe
                loading="lazy"
                className="aula-page-embed"
                src={aula.embedUrl}
                title={aula.title}
                allow="fullscreen"
                allowFullScreen
              />
            </div>
            {aula.canvaUrl && (
              <a href={aula.canvaUrl} target="_blank" rel="noopener noreferrer" className="aula-canva-link">
                {aula.title} · Trilha
              </a>
            )}
          </div>
        )}

        {/* Useful links — below slide, no title */}
        {aula.links && aula.links.length > 0 && (
          <ul className={`aula-useful-links${aula.links.length > 5 ? ' aula-useful-links--cols' : ''}`}>
            {aula.links.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Tarefa / Mini-Projeto — only when deadline is set */}
        {aula.deadline && <div className="aula-tarefa">
          <h1 className="aula-tarefa-h1">{taskTitle}</h1>
          {aula.deadline && (
            <p className="aula-page-deadline" style={{ marginBottom: 32 }}>
              {t('aulas.deadlineLabel')}: {aula.deadline}
            </p>
          )}

          {guidelines?.items?.length > 0 && (
            <div className="aula-guidelines">
              <span className="aula-guidelines-title">{guidelines.title}</span>
              <ul className="aula-guidelines-list">
                {guidelines.items.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="aula-tarefa-grid">
            {/* Descrição */}
            <div>
              <h2 className="aula-tarefa-h2">{t('aulas.descricaoTitle')}</h2>
              {aula.homework && (
                <div className="aula-homework-box">
                  <p>{renderRichText(aula.homework)}</p>
                </div>
              )}
            </div>

            {/* Submeter */}
            <div>
              <h2 className="aula-tarefa-h2">{t('aulas.submeterTitle')}</h2>
              {sent ? (
                <div className="aulas-form-success">
                  <p className="display" style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}>
                    {t('aulas.form.successTitle')}
                  </p>
                  <p style={{ color: 'var(--ink-soft)' }}>{t('aulas.form.successBody')}</p>
                </div>
              ) : (
                <form className="aulas-form" onSubmit={handleSubmit} noValidate>
                  <label className="aulas-form-field">
                    <span className="aulas-form-label">{t('aulas.form.edicao')}</span>
                    <select
                      value={edicao}
                      onChange={(e) => setEdicao(e.target.value)}
                      className="aulas-input"
                    >
                      <option value="" disabled>{t('aulas.form.edicaoPlaceholder')}</option>
                      {edicoes.map((ed) => (
                        <option key={ed} value={ed}>{ed}</option>
                      ))}
                    </select>
                  </label>
                  <div className="aulas-form-row">
                    <label className="aulas-form-field">
                      <span className="aulas-form-label">{t('aulas.form.name')}</span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('aulas.form.namePlaceholder')}
                        className="aulas-input"
                      />
                    </label>
                    <label className="aulas-form-field">
                      <span className="aulas-form-label">{t('aulas.form.email')}</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('aulas.form.emailPlaceholder')}
                        className="aulas-input"
                      />
                    </label>
                  </div>
                  <label className="aulas-form-field">
                    <span className="aulas-form-label">{t('aulas.form.taskLink')}</span>
                    <input
                      type="text"
                      value={taskLink}
                      onChange={(e) => setTaskLink(e.target.value)}
                      placeholder={t('aulas.form.taskLinkPlaceholder')}
                      className="aulas-input"
                    />
                  </label>
                  <label className="aulas-form-field">
                    <span className="aulas-form-label">{t('aulas.form.notes')}</span>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t('aulas.form.notesPlaceholder')}
                      className="aulas-input aulas-textarea"
                    />
                  </label>
                  {formError && (
                    <p className="aulas-form-error">{formError}</p>
                  )}
                  <button type="submit" className="btn btn--mint" disabled={sending}>
                    {sending
                      ? t('aulas.form.sending')
                      : <>{t('aulas.form.submitBtn')} <span className="arrow">→</span></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>}

      </div>
      </div>
    </section>
  );
}

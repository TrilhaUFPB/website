'use client';

import { Mail } from 'lucide-react';
import { FaInstagram, FaGithub } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();
  const locationLines = t<string[]>('footer.locationLines');

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="display footer-brand-mark">
            trilha<span className="footer-brand-dot">.</span>
          </div>
          <p className="footer-brand-tagline">{t('footer.tagline')}</p>
        </div>
        <div className="footer-col">
          <div className="kicker">{t('footer.sections')}</div>
          <ul>
            <li><a href="#sobre">{t('nav.sobre')}</a></li>
            <li><a href="#turmas">{t('nav.turmas')}</a></li>
            <li><a href="#projetos">{t('nav.projetos')}</a></li>
            <li><a href="#time">{t('nav.time')}</a></li>
            <li><a href="/materiais">{t('nav.materiais')}</a></li>
            <li><a href="/papers">{t('nav.artigos')}</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="kicker">{t('footer.contact')}</div>
          <ul className="footer-contact">
            <li>
              <a href="mailto:contato.trilhaufpb@gmail.com" aria-label="Email">
                <Mail size={16} strokeWidth={1.75} aria-hidden />
                <span>contato.trilhaufpb@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/trilhaufpb" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram size={16} aria-hidden />
                <span>@trilhaufpb</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/trilhaufpb" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub size={16} aria-hidden />
                <span>trilhaufpb</span>
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
      </div>
    </footer>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { usePostHogTracking } from '@/hooks/usePostHogTracking';
import { useScrolled } from '@/components/home/shared';

export default function NavBar() {
  const { t, locale, changeLanguage } = useTranslation();
  const { trackNavigationClick, trackLanguageSwitch } = usePostHogTracking();
  const scrolled = useScrolled();
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const ids = ['sobre', 'numeros', 'turmas', 'projetos', 'time', 'materiais'];
    const onScroll = () => {
      let cur = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'sobre', label: t('nav.sobre'), url: '#sobre' },
    { id: 'turmas', label: t('nav.turmas'), url: '#turmas' },
    { id: 'projetos', label: t('nav.projetos'), url: '#projetos' },
    { id: 'time', label: t('nav.time'), url: '#time' },
    { id: 'materiais', label: t('nav.materiais'), url: '/materiais' },
  ];

  const toggleLang = () => {
    const next = locale === 'pt' ? 'en' : 'pt';
    changeLanguage(next);
    trackLanguageSwitch(next);
  };

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo" aria-label="Trilha">
          <span className="logo-mark" aria-hidden="true" />
        </a>
        <nav className="nav-links">
          {items.map((it) => (
            <a
              key={it.id}
              href={it.url}
              className={active === it.id ? 'active' : ''}
              onClick={() => trackNavigationClick(it.id)}
            >
              {it.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <button className="lang-toggle" onClick={toggleLang}>
            <span className={locale === 'pt' ? 'on' : ''}>PT</span>
            <span className={locale === 'en' ? 'on' : ''}>EN</span>
          </button>
        </div>
      </div>
    </header>
  );
}

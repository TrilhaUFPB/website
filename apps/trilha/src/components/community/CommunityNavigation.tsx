'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function CommunityNavigation() {
  const [open, setOpen] = useState(false);
  return <nav className={`nav${open ? ' nav-open' : ''}`} aria-label="Navegação principal">
    <Link className="brand" href="/" aria-label="Trilha início">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/community/montanha-oficial.svg" alt="Trilha" />
    </Link>
    <div id="community-menu" className="navlinks" onClick={() => setOpen(false)}>
      <Link href="#iniciativas1">Iniciativas</Link>
      <Link href="#journal-title">História</Link>
      <Link href="#impact-title">Impacto</Link>
      <Link href="#quem-somos">Quem somos</Link>
    </div>
    <Link className="navcta" href="#iniciativas1" onClick={() => setOpen(false)}>Encontre seu caminho</Link>
    <button className="community-menu-toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="community-menu" onClick={() => setOpen(!open)}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
        <path d={open ? 'M6 6l12 12M6 18L18 6' : 'M4 7h16M4 12h16M4 17h16'} />
      </svg>
    </button>
  </nav>;
}

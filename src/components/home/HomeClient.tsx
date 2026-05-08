'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { COPY, TESTIMONIALS, ORG, FAQS, type Lang, type Copy } from './data';

function useScrolled(threshold = 12) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const onScroll = () => setS(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return s;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function Nav({ lang, setLang, copy }: { lang: Lang; setLang: (l: Lang) => void; copy: Copy }) {
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
    { id: 'sobre', label: copy.nav.sobre },
    { id: 'turmas', label: copy.nav.turmas },
    { id: 'projetos', label: copy.nav.projetos },
    { id: 'time', label: copy.nav.time },
    { id: 'materiais', label: copy.nav.materiais },
  ];

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          <span>trilha</span>
          <span className="dot">.</span>
        </a>
        <nav className="nav-links">
          {items.map((it) => (
            <a key={it.id} href={`#${it.id}`} className={active === it.id ? 'active' : ''}>
              {it.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <button className="lang-toggle" onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}>
            <span className={lang === 'pt' ? 'on' : ''}>PT</span>
            <span className={lang === 'en' ? 'on' : ''}>EN</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function SectionHead({ title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <header className="section-head reveal">
      <h2>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}

function PlaceholderImg({ label, ratio = '4 / 3' }: { label: string; ratio?: string }) {
  return (
    <div className="placeholder-img" style={{ aspectRatio: ratio }}>
      {label}
    </div>
  );
}

function FlipWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words, interval]);
  return (
    <span className="flipword">
      {words.map((w, idx) => (
        <span key={idx} className={`flipword-item ${idx === i ? 'on' : ''}`}>
          {w}
        </span>
      ))}
    </span>
  );
}

function Hero({ copy }: { copy: Copy }) {
  return (
    <section id="hero" className="section hero-section hero-with-beams">
      <BackgroundBeamsWithCollision className="hero-beams">
        <div className="container hero-container">
          <motion.div
            className="hero-top"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.3, 1] }}
          >
            <h1 className="display hero-headline">
              {copy.hero.titleA}{' '}
              <span className="serif-italic hero-flip" style={{ color: 'var(--mint-deep)' }}>
                <FlipWord words={copy.hero.flips} />
              </span>
            </h1>
            <div className="hero-actions">
              <a href="#sobre" className="btn btn--mint">
                {copy.hero.ctaPrimary}
                <span className="arrow">→</span>
              </a>
              <a href="#time" className="btn btn--ghost">
                {copy.hero.ctaSecondary}
              </a>
            </div>
          </motion.div>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  );
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (!match || !inView) {
      setDisplay(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const n = Math.round(target * eased);
      setDisplay(`${n}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

const PILLAR_GALLERY: Record<number, string[]> = {
  0: ['/assets/aulas/aulas.jpg', '/assets/aulas/luigi.jpg'],
  1: ['/assets/objetivos/aula.jpg'],
  2: [
    '/assets/palestras/herval.jpg',
    '/assets/palestras/itamar.jpg',
    '/assets/palestras/jp_honorato.jpg',
    '/assets/palestras/lara.jpg',
    '/assets/palestras/terron.png',
  ],
  3: ['/assets/pillars/hackathon.jpg', '/assets/objetivos/festa.jpg'],
};

const TickContext = createContext(0);

function TickProvider({ interval = 3500, children }: { interval?: number; children: React.ReactNode }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), interval);
    return () => clearInterval(id);
  }, [interval]);
  return <TickContext.Provider value={tick}>{children}</TickContext.Provider>;
}

function CyclingImage({ images, alt }: { images: string[]; alt: string }) {
  const tick = useContext(TickContext);
  const i = images.length ? tick % images.length : 0;
  return (
    <div className="pillar-img-stack">
      {images.map((src, idx) => (
        <img key={src} src={src} alt={alt} loading="lazy" className={idx === i ? 'on' : ''} />
      ))}
    </div>
  );
}

function Sobre({ copy }: { copy: Copy }) {
  return (
    <section id="sobre" className="section">
      <div className="container">
        <SectionHead eyebrow={copy.sobre.eyebrow} title={copy.sobre.title} lede={copy.sobre.lede} />
        <div className="pillars-grid reveal">
          {copy.sobre.pillars.map((p, i) => {
            const gallery = PILLAR_GALLERY[i] ?? (p.img ? [p.img] : []);
            return (
              <article key={i} className="pillar">
                {gallery.length > 0 && (
                  <div className="pillar-img">
                    <CyclingImage images={gallery} alt={p.tag} />
                  </div>
                )}
                <div className="pillar-tag eyebrow">{p.tag}</div>
                <h3 className="pillar-title display">{p.title}</h3>
                <p className="pillar-body">{p.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Numbers({ copy }: { copy: Copy }) {
  const reveals = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.4 }
    );
    reveals.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <section id="numeros" className="section section--ink section--ink-numbers">
      <div className="container">
        <SectionHead eyebrow={copy.numbers.eyebrow} title={copy.numbers.title} />
        <div className="stats-grid">
          {copy.numbers.stats.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                reveals.current[i] = el;
              }}
              className="reveal stat"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="stat-k display"><CountUp value={s.k} /></div>
              <div className="stat-l eyebrow">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Turmas({ copy, lang }: { copy: Copy; lang: Lang }) {
  const [active, setActive] = useState(2);
  const items = copy.turmas.items;
  return (
    <section id="turmas" className="section">
      <div className="container">
        <SectionHead eyebrow={copy.turmas.eyebrow} title={copy.turmas.title} lede={copy.turmas.lede} />
        <div className="turmas-row reveal">
          {items.map((t, i) => (
            <a
              key={i}
              href={`/turmas/${t.period}`}
              className={`turma-card ${active === i ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
            >
              <div className="turma-img">
                <img src={t.img} alt={t.title} />
                <div className="turma-overlay">
                  <span className="kicker">{t.period}</span>
                  <span className="kicker">
                    {t.students} {lang === 'pt' ? 'alunos' : 'students'}
                  </span>
                </div>
              </div>
              <div className="turma-meta">
                <div className="display" style={{ fontSize: 32, lineHeight: 1, marginBottom: 8 }}>
                  <span className="serif-italic">{t.period}</span> — {t.title}
                </div>
                <p style={{ margin: 0, color: 'var(--ink-soft)', maxWidth: '46ch' }}>{t.theme}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ copy }: { copy: Copy }) {
  return (
    <section id="projetos" className="section section--paper">
      <div className="container">
        <SectionHead eyebrow={copy.projects.eyebrow} title={copy.projects.title} lede={copy.projects.lede} />
        <div className="projects-grid reveal">
          {copy.projects.items.map((p, i) => {
            const inner = (
              <>
                <div className="project-img">
                  {p.img ? (
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      style={{ width: '100%', aspectRatio: '5 / 4', objectFit: 'cover', background: 'var(--paper)' }}
                    />
                  ) : (
                    <PlaceholderImg label={`hackathon shot · ${p.tag}`} ratio="5 / 4" />
                  )}
                </div>
                <div className="project-meta">
                  <div className="kicker tag-dot" style={{ color: 'var(--mint-deep)' }}>
                    {p.tag}
                  </div>
                  <h3 className="display" style={{ fontSize: 30, margin: '10px 0 8px', lineHeight: 1.05 }}>
                    {p.title}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 15 }}>{p.desc}</p>
                </div>
              </>
            );
            return p.pitch ? (
              <a key={i} href={p.pitch} target="_blank" rel="noreferrer" className="project-card">
                {inner}
              </a>
            ) : (
              <article key={i} className="project-card">
                {inner}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ copy, lang }: { copy: Copy; lang: Lang }) {
  return (
    <section id="depoimentos" className="section">
      <div className="container">
        <SectionHead eyebrow={copy.depo.eyebrow} title={copy.depo.title} lede={copy.depo.lede} />
        <div className="depo-grid reveal">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className={`depo ${i % 3 === 1 ? 'depo--tall' : ''}`}>
              <blockquote>
                <span
                  className="display serif-italic"
                  style={{ fontSize: 36, lineHeight: 1, marginRight: 4 }}
                >
                  “
                </span>
                {lang === 'pt' ? t.quote : t.quote_en}
              </blockquote>
              <figcaption>
                <img
                  src={t.photo}
                  alt={t.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                  }}
                />
                <div>
                  <div style={{ fontWeight: 500 }}>{t.name}</div>
                  <div className="kicker" style={{ marginTop: 2 }}>
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team({ copy }: { copy: Copy }) {
  return (
    <section id="time" className="section">
      <div className="container">
        <SectionHead eyebrow={copy.time.eyebrow} title={copy.time.title} lede={copy.time.lede} />
        <div className="team-grid reveal">
          {ORG.map((p, i) => (
            <a
              key={i}
              href={p.link || '#'}
              target={p.link ? '_blank' : '_self'}
              rel="noreferrer"
              className="team-card"
            >
              <div className="team-photo">
                <img
                  src={p.photo}
                  alt={p.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = '0';
                  }}
                />
                <div className="team-photo-bg"></div>
              </div>
              <div className="team-info">
                <div className="team-name">{p.name}</div>
                <div className="kicker team-role">{p.role}</div>
                <div className="team-course">{p.course}</div>
              </div>
              {p.link && <span className="team-arrow">↗</span>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Materials({ copy }: { copy: Copy }) {
  const tracks = copy.materiais.tracks;
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
              {copy.materiais.title}
            </h2>
            <p style={{ color: '#C2C9DC', maxWidth: '46ch', fontSize: 18, lineHeight: 1.55 }}>
              {copy.materiais.lede}
            </p>
            <a
              href="/materiais"
              className="btn"
              style={{ marginTop: 36, background: 'var(--mint)', color: 'var(--midnight)' }}
            >
              {copy.materiais.cta}
              <span className="arrow">→</span>
            </a>
          </div>
          <div className="mat-right">
            {tracks.map((t, i) => (
              <a key={i} href="/materiais" className="mat-track">
                <span className="mat-track-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="mat-track-name">{t}</span>
                <span className="mat-track-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(0);
  const faqs = FAQS[lang];
  return (
    <section id="faq" className="section">
      <div className="container">
        <SectionHead
          eyebrow={lang === 'pt' ? '08 / Perguntas' : '08 / FAQ'}
          title={lang === 'pt' ? 'Dúvidas?' : 'Questions?'}
        />
        <div className="faq-list reveal">
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`faq-item ${open === i ? 'open' : ''}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <button className="faq-q">
                <span className="display" style={{ fontSize: 24 }}>
                  {f.q}
                </span>
                <span className="faq-mark">{open === i ? '−' : '+'}</span>
              </button>
              <div className="faq-a-wrap">
                <p className="faq-a">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ copy, lang }: { copy: Copy; lang: Lang }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="display" style={{ fontSize: 56, lineHeight: 0.92, letterSpacing: '-0.02em' }}>
            trilha<span style={{ color: 'var(--mint)' }}>.</span>
          </div>
          <p style={{ maxWidth: '36ch', color: 'var(--ink-soft)', marginTop: 12 }}>{copy.footer.tagline}</p>
        </div>
        <div className="footer-col">
          <div className="kicker">{copy.footer.sections}</div>
          <ul>
            <li>
              <a href="#sobre">{copy.nav.sobre}</a>
            </li>
            <li>
              <a href="#turmas">{copy.nav.turmas}</a>
            </li>
            <li>
              <a href="#projetos">{copy.nav.projetos}</a>
            </li>
            <li>
              <a href="#time">{copy.nav.time}</a>
            </li>
            <li>
              <a href="/materiais">{copy.nav.materiais}</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="kicker">{copy.footer.contact}</div>
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
          <div className="kicker">{lang === 'pt' ? 'Localização' : 'Location'}</div>
          <ul>
            <li>UFPB · Centro de Informática</li>
            <li>João Pessoa, Paraíba</li>
            <li>Brasil</li>
          </ul>
        </div>
      </div>
      <div className="container footer-foot">
        <span>© 2024–2026 Trilha. {copy.footer.rights}</span>
        <span className="kicker">v2.0 · Redesign 2026</span>
      </div>
    </footer>
  );
}

export default function HomeClient() {
  const [lang, setLang] = useState<Lang>('pt');
  useReveal();
  const copy = COPY[lang];

  return (
    <TickProvider interval={3500}>
      <Nav lang={lang} setLang={setLang} copy={copy} />
      <main className="shell">
        <Hero copy={copy} />
        <Sobre copy={copy} />
        <Numbers copy={copy} />
        <Turmas copy={copy} lang={lang} />
        <Projects copy={copy} />
        <Testimonials copy={copy} lang={lang} />
        <Team copy={copy} />
        <Materials copy={copy} />
        <FAQSection lang={lang} />
        <Footer copy={copy} lang={lang} />
      </main>
    </TickProvider>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  peopleStudents20241,
  peopleStudents20242,
  peopleStudents20251,
  type Person,
} from '@/data/people';
import { COPY } from '@/components/home/data';

type Period = '2024.1' | '2024.2' | '2025.1';

const TURMAS: Record<Period, { students: Person[]; cover: string }> = {
  '2024.1': { students: peopleStudents20241, cover: '/assets/turmas/trilha2024.jpg' },
  '2024.2': { students: peopleStudents20242, cover: '/assets/turmas/trilha2024-2.jpg' },
  '2025.1': { students: peopleStudents20251, cover: '/assets/turmas/trilha2025.jpg' },
};

export function generateStaticParams() {
  return (Object.keys(TURMAS) as Period[]).map((period) => ({ period }));
}

function photoSrc(p: string) {
  if (!p) return '';
  if (p.startsWith('/') || p.startsWith('http')) return p;
  return `/assets/${p}`;
}

function PersonCard({ p }: { p: Person }) {
  return (
    <a
      href={p.link || '#'}
      target={p.link ? '_blank' : '_self'}
      rel="noreferrer"
      className="team-card"
    >
      <div className="team-photo">
        {p.photo ? <img src={photoSrc(p.photo)} alt={p.name} /> : null}
        <div className="team-photo-bg"></div>
      </div>
      <div className="team-info">
        <div className="team-name">{p.name}</div>
        <div className="kicker team-role">{p.role || ' '}</div>
        <div className="team-course">{p.course}</div>
      </div>
      {p.link && <span className="team-arrow">↗</span>}
    </a>
  );
}

export default async function TurmaPage({ params }: { params: Promise<{ period: string }> }) {
  const { period } = await params;
  const turma = TURMAS[period as Period];
  if (!turma) notFound();

  const meta = COPY.pt.turmas.items.find((t) => t.period === period);

  return (
    <main className="shell">
      <section className="section" style={{ paddingTop: 'clamp(40px, 6vw, 88px)', paddingBottom: 'clamp(56px, 7vw, 110px)' }}>
        <div className="container">
          <div className="reveal in" style={{ marginBottom: 32 }}>
            <Link href="/#turmas" className="kicker" style={{ color: 'var(--ink-soft)' }}>
              ← Voltar
            </Link>
          </div>
          <header className="section-head" style={{ marginBottom: 48 }}>
            <div className="kicker tag-dot" style={{ color: 'var(--mint-deep)', marginBottom: 18 }}>
              Turma {period}
            </div>
            <h2>
              <span className="serif-italic">{period}</span>
              {meta ? ` — ${meta.title}` : ''}
            </h2>
            {meta?.theme && <p className="lede">{meta.theme}</p>}
          </header>

          <div className="team-grid">
            {turma.students.map((p, i) => (
              <PersonCard key={`s-${i}`} p={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

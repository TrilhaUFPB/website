import Link from 'next/link';
import { notFound } from 'next/navigation';
import ptCommon from '@/locales/pt/common.json';
import type { TurmaItem } from '@/components/home/data';
import TurmaStudents from './TurmaStudents';

type Period = '2024.1' | '2024.2' | '2025.1' | '2025.2';

const COVERS: Record<Period, string> = {
  '2024.1': '/assets/turmas/trilha2024.jpg',
  '2024.2': '/assets/turmas/trilha2024-2.jpg',
  '2025.1': '/assets/turmas/trilha2025.jpg',
  '2025.2': '/assets/turmas/trilha2025-2.jpeg',
};

export function generateStaticParams() {
  return (Object.keys(COVERS) as Period[]).map((period) => ({ period }));
}

export default async function TurmaPage({ params }: { params: Promise<{ period: string }> }) {
  const { period } = await params;
  if (!(period in COVERS)) notFound();

  const meta = (ptCommon.turmas.items as TurmaItem[]).find((it) => it.period === period);
  const back = ptCommon.turmaPage.back;
  const cohortLabel = ptCommon.turmaPage.cohortLabel;

  return (
    <main className="shell">
      <section className="section" style={{ paddingTop: 'clamp(40px, 6vw, 88px)', paddingBottom: 'clamp(56px, 7vw, 110px)' }}>
        <div className="container">
          <div className="reveal in" style={{ marginBottom: 32 }}>
            <Link href="/#turmas" className="kicker" style={{ color: 'var(--ink-soft)' }}>
              {back}
            </Link>
          </div>
          <header className="section-head" style={{ marginBottom: 48 }}>
            <div className="kicker tag-dot" style={{ color: 'var(--mint-deep)', marginBottom: 18 }}>
              {cohortLabel} {period}
            </div>
            <h2>
              <span className="serif-italic">{period}</span>
              {meta ? ` — ${meta.title}` : ''}
            </h2>
            {meta?.theme && <p className="lede">{meta.theme}</p>}
          </header>

          <TurmaStudents period={period} />
        </div>
      </section>
    </main>
  );
}

import Link from 'next/link';

export default function TeamViewSwitch({ current }: { current: 'grade' | 'trajetoria' }) {
 const views = [{ key: 'grade', label: 'Grade', href: '/equipe' }, { key: 'trajetoria', label: 'Trajetória', href: '/equipe/trajetoria' }] as const;
 return <nav className="tj-switch" aria-label="Modo de visualização">
  {views.map(v => <Link key={v.key} href={v.href} aria-current={current === v.key ? 'page' : undefined} scroll={false}>{v.label}</Link>)}
 </nav>;
}

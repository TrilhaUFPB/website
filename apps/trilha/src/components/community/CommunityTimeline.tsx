"use client";

import { useEffect, useRef } from "react";
import { ButtonLink, ArrowIcon } from '@trilha/ui';
import { cohorts } from '@trilha/people/cohorts';
import { ufpbUrl } from '@/lib/sites';
/* eslint-disable @next/next/no-img-element */
const milestones = [
 { date:'19 de julho de 2024', title:'A primeira aula.', description:'Em João Pessoa, estudantes se reuniram para compartilhar o que sabiam com quem estava chegando. Uma sala e a vontade de aprender juntos.', image:'/community/aula.jpg', alt:'Estudantes reunidos em uma aula do Trilha', kind:'photo', cohortYear:'2024' },
 { date:'2025 · Momento', title:'Uma conversa abre caminhos.', description:'O Momento passa a fazer parte do Trilha. Estudantes encontram mentores, compartilham dúvidas e descobrem possibilidades dentro e fora do Brasil.', image:'/community/momento-symbol.svg', alt:'Momento', kind:'momento', cohortYear:'2025' },
 { date:'2026 · Trilha UFPB', title:'Mais tempo para aprender juntos.', description:'A turma 2026.1 está em andamento, com uma formação de dois semestres de aulas, mentoria e projetos.', image:'/community/turmas/trilha2026-1.jpeg', alt:'Turma 2026.1 do Trilha UFPB', kind:'photo', cohortYear:'2026' },
 { date:'Hack The Path', title:'Mais gente para construir junto.', description:'A comunidade abre espaço para um novo encontro: um hackathon para formar equipes, experimentar e transformar ideias em projetos.', image:'/community/htp-logo.png', alt:'Hack The Path', kind:'htp' },
 { date:'Setembro de 2026 · Trilha UFPE', title:'O caminho chega a Recife.', description:'Uma nova organização nasce no CIn da UFPE. A primeira turma começa em outubro, conectando novos estudantes à mesma comunidade.', image:'/community/ufpe.png', alt:'Trilha UFPE', kind:'ufpe' },
];
export default function CommunityTimeline() {
 const pathRef = useRef<HTMLOListElement>(null);
 useEffect(() => {
  const path = pathRef.current;
  if (!path) return;
  const syncColors = () => {
   const line = path.getBoundingClientRect();
   path.querySelectorAll<HTMLElement>('.timeline-node, .timeline-cohorts').forEach(element => {
    const rect = element.getBoundingClientRect();
    const center = element.classList.contains('timeline-node') ? rect.height / 2 : 34;
    const progress = Math.max(0, Math.min(1, (rect.top + center - line.top - 24) / Math.max(1, line.height - 24)));
    element.style.setProperty('--timeline-color', `color-mix(in srgb, var(--trilha-mint), var(--trilha-electric) ${progress * 100}%)`);
   });
  };
  const observer = new ResizeObserver(syncColors);
  observer.observe(path);
  path.querySelectorAll('.timeline-step').forEach(step => observer.observe(step));
  syncColors();
  return () => observer.disconnect();
 }, []);
 return <section className="community-timeline" aria-labelledby="journal-title">
  <header><span className="section-label">DE ESTUDANTES PARA ESTUDANTES</span><h2 id="journal-title">Uma história feita<br />de encontros.</h2><p>Cada encontro abre espaço para o próximo.</p></header>
  <ol className="timeline-path" ref={pathRef}>{milestones.map((milestone,index)=><li className="timeline-step" key={milestone.title}>
   <span className="timeline-node" aria-hidden="true">{String(index+1).padStart(2,'0')}</span>
   <div className="timeline-story"><span className="section-label">{milestone.date}</span><h3>{milestone.title}</h3><p>{milestone.description}</p></div>
   <figure className={`timeline-visual timeline-visual--${milestone.kind}`}><img src={milestone.image} alt={milestone.alt} loading="lazy" /></figure>
   {milestone.cohortYear && <ul className="timeline-cohorts" aria-label={`Turmas de ${milestone.cohortYear}`}>
    {cohorts.filter(cohort => cohort.period.startsWith(milestone.cohortYear!)).map(cohort => <li key={cohort.period}>
     <a href={`${ufpbUrl}/turmas/${cohort.period}`}>
      <span className="timeline-cohort-period">{cohort.period}</span>
      <span><strong>{cohort.title.pt}</strong><small>{cohort.students.length} estudantes · UFPB</small></span>
      <ArrowIcon />
     </a>
    </li>)}
   </ul>}
  </li>)}</ol>
  <div className="timeline-arrival"><span className="timeline-end" aria-hidden="true"/><p>Um começo. Muitos caminhos.<br /><strong>Uma comunidade conectada.</strong></p><ButtonLink href="/historia/">Conheça nossa história <ArrowIcon /></ButtonLink></div>
 </section>;
}

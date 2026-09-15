'use client';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { SectionHead } from '@/components/home/shared';
import type { ProjectItem } from '@/components/home/data';
/* eslint-disable @next/next/no-img-element */
export default function Projects() {
  const { t, locale } = useTranslation();
  const items = t<ProjectItem[]>('projects.items');
  return <section id="projetos" className="section campus-project-showcase"><div className="container">
    <SectionHead eyebrow={t('projects.eyebrow')} title={t('projects.title')} lede={t('projects.lede')} />
    <div className="project-showcase-grid">
      {items.map((project, i) => <article className="project-showcase-card" key={project.title}>
        <div className="project-showcase-photo">{project.img && <img src={project.img} alt={project.title} loading="lazy" />}<span>{project.tag}</span></div>
        <div className="project-showcase-copy"><span className="project-number">0{i+1}</span><h3>{project.title}</h3><p>{project.desc}</p>
          {project.pitch && <a href={project.pitch} target="_blank" rel="noreferrer">{locale === 'pt' ? 'Conheça o projeto' : 'Explore the project'}<ArrowUpRight size={18}/></a>}
        </div>
      </article>)}
    </div>
  </div></section>;
}

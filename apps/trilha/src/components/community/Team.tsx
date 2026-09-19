import { alumniIds, founderIds, leaderIds, leaderMembership, organizerIds } from '@trilha/people/directory';
import { ButtonLink, ArrowIcon } from '@trilha/ui';
import PersonCard from './PersonCard';

const leadershipSections = [
 { title: 'Trilha', key: 'trilha' },
 { title: 'Momento', key: 'momento' },
 { title: 'UFPB', key: 'trilha-ufpb' },
 { title: 'UFPE', key: 'trilha-ufpe' },
 { title: 'HTP', key: 'hack-the-path' },
].map(section => ({ ...section, ids: leaderIds.filter(id => {
 const membership = leaderMembership(id);
 return (membership?.role === 'Presidente' ? 'trilha' : membership?.initiative) === section.key;
}) }));

export default function Team() {
 return <div className="trilha-site"><main className="team-directory network-page">
  <ButtonLink href="/"><ArrowIcon direction="left" /> Voltar ao Trilha</ButtonLink>
  <span className="section-label">QUEM SOMOS</span><h1>Uma rede feita de gente.</h1>
  <p>Conheça quem constrói o Trilha, compartilha conhecimento e faz nossas iniciativas acontecerem.</p>
  <section className="directory-group" aria-label="Fundadores"><h2>Fundadores</h2><div className="team-grid people-map">{founderIds.map(id => <PersonCard key={id} personId={id} founder />)}</div></section>
  <section className="directory-group" aria-label="Líderes"><h2>Líderes</h2>
   {leadershipSections.filter(section => section.ids.length).map(section => <section className="leadership-subsection" key={section.key} aria-labelledby={`leaders-${section.key}`}>
    <h3 id={`leaders-${section.key}`}>{section.title}</h3>
    <div className="team-grid people-map">{section.ids.map(id => <PersonCard key={id} personId={id} />)}</div>
   </section>)}
  </section>
  <section className="directory-group" aria-label="Organização"><h2>Organização</h2><div className="team-grid people-map">{organizerIds.map(id => <PersonCard key={id} personId={id} />)}</div></section>
  <section className="directory-group" aria-labelledby="alumni-title"><h2 id="alumni-title">Ex-alunos</h2><p>Todos que passaram pelas turmas do Trilha e seguem fazendo parte dessa história.</p><div className="team-grid people-map">{alumniIds.map(id => <PersonCard key={id} personId={id} alumni />)}</div></section>
  <ButtonLink href="/">Voltar ao Trilha <ArrowIcon /></ButtonLink>
 </main></div>;
}

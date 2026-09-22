/* eslint-disable @next/next/no-img-element */
import { peopleById, leaderMembership, cohortPeriodsFor } from '@trilha/people/directory';
import OrganizationRoles from './OrganizationRoles';
import LeadershipBadge from './LeadershipBadge';
const badgeKeys = { 'trilha-ufpb': 'ufpb', momento: 'momento', 'trilha-ufpe': 'ufpe', 'hack-the-path': 'htp' } as const;
export default function PersonCard({ personId, founder = false, alumni = false }: { personId: string; founder?: boolean; alumni?: boolean }) {
 const person = peopleById[personId];
 const leadership = (founder || alumni) ? undefined : leaderMembership(personId);
 const initiative = leadership?.role === 'Presidente' ? 'trilha' : leadership ? badgeKeys[leadership.initiative as keyof typeof badgeKeys] : undefined;
 return <article className="person" id={`${alumni ? "ex-aluno" : "pessoa"}-${personId}`}>
  {person.photo ? <img src={person.photo.replace('/assets/pessoas/', '/community/pessoas/')} alt={person.name} loading="lazy" width="400" height="480" /> : <div className="person-initials">{person.name.split(' ').map(part=>part[0]).slice(0,2).join('')}</div>}
  <h3 className={initiative ? 'person-name-with-logo' : undefined}><span>{person.link ? <a href={person.link} target="_blank" rel="noopener noreferrer">{person.name}</a> : person.name}</span>{initiative && <LeadershipBadge initiative={initiative} />}</h3>
  {alumni ? <p>{cohortPeriodsFor(personId).length > 1 ? 'Turmas' : 'Turma'} {cohortPeriodsFor(personId).join(' e ')} · UFPB</p> : founder ? <p>Fundador · Trilha</p> : <OrganizationRoles personId={personId} />}
 </article>;
}

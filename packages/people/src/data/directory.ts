import { cohorts } from './cohorts';
import * as profiles from './people';
import type { Person } from './people';
import { organizations, membershipsFor } from '../index.js';

export const peopleById: Record<string, Person> = Object.fromEntries(
 Object.entries(profiles).filter((entry): entry is [string, Person] =>
  !!entry[1] && typeof entry[1] === 'object' && !Array.isArray(entry[1]) && 'name' in entry[1])
);
export const founderIds = profiles.peopleFounders.map(person => Object.keys(peopleById).find(id => peopleById[id] === person)!);
const currentIds = [...new Set(Object.values(organizations).flatMap(org => org.members.map(member => member.personId)))];
const isLeader = (id: string) => membershipsFor(id).some(m => m.role === 'Presidente' || m.role.startsWith('Líder'));
// Group by the initiative they lead, not the first organization they joined.
const leadershipOrder = ['trilha-ufpb', 'momento', 'hack-the-path', 'trilha-ufpe'];
export const leaderIds = currentIds.filter(isLeader).sort((a, b) => {
 const group = (id: string) => leadershipOrder.indexOf(leaderMembership(id)!.initiative);
 return group(a) - group(b);
});
export const organizerIds = currentIds.filter(id => !isLeader(id) && !founderIds.includes(id));
export function leaderMembership(personId: string) {
 return membershipsFor(personId).find(m => m.role === 'Presidente') ?? membershipsFor(personId).find(m => m.role.startsWith('Líder'));
}

// Cohort rosters are the source of truth, including alumni who now organize.
export const alumniIds = [...new Set(cohorts.filter(cohort => cohort.status === 'completed').flatMap(cohort => cohort.students))]
 .map(person => Object.keys(peopleById).find(id => peopleById[id] === person)!)
 .sort((a, b) => peopleById[a].name.localeCompare(peopleById[b].name, "pt-BR"));

export function cohortPeriodsFor(personId: string) {
 return cohorts.filter(cohort => cohort.students.includes(peopleById[personId])).map(cohort => cohort.period);
}

export const currentStudentIds = [...new Set(cohorts.filter(cohort => cohort.status === 'active').flatMap(cohort => cohort.students))]
 .map(person => Object.keys(peopleById).find(id => peopleById[id] === person)!)
 .sort((a,b) => peopleById[a].name.localeCompare(peopleById[b].name, 'pt-BR'));

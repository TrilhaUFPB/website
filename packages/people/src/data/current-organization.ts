import { organizations } from '../index.js';
import * as people from './people';
import type { Person } from './people';

// Resolve the initiative's explicit membership list against existing profiles.
// Student cohorts and previous organization snapshots remain unchanged.
export const peopleOrganization20261: Person[] = organizations.ufpb.members.map(member => {
  const person = people[member.personId as keyof typeof people] as Person | undefined;
  if (!person || !('name' in person)) throw new Error(`Missing UFPB profile: ${member.personId}`);
  return { ...person, org: [...person.org, organizations.ufpb.period], pos: [...person.pos, member.role] };
});
export const peopleOrganizationCurrent = peopleOrganization20261;

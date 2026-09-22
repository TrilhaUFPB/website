import ufpb from './organizations/trilha-ufpb.js';
import momento from './organizations/momento.js';
import ufpe from './organizations/trilha-ufpe.js';
import hackThePath from './organizations/hack-the-path.js';
export const organizations = { ufpb, momento, ufpe, hackThePath };
/** @param {string} personId */
export function membershipsFor(personId) {
  return Object.values(organizations).flatMap(organization =>
    organization.members.filter(member => member.personId === personId)
      .map(member => ({ initiative: organization.id, name: organization.name, role: member.role }))
  );
}

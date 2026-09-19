import { membershipsFor } from '@trilha/people';
export default function OrganizationRoles({ personId }: { personId: string }) {
  return <p>{membershipsFor(personId).map(membership => `${membership.role === 'Membro da Organização' ? 'Organização' : membership.role} · ${membership.name}`).join(' / ')}</p>;
}

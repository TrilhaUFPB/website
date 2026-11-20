import { cohorts, cohortOrganizations } from "@trilha/people/cohorts";
import { peopleById } from "@trilha/people/directory";
import { organizations } from "@trilha/people";
import type { Role, Traveler, Initiative } from "./Trajetoria";

// 2026.1 organization entries are spread copies of the profiles, so match by name, not identity.
const idByName = Object.fromEntries(Object.entries(peopleById).map(([id, p]) => [p.name, id]));
const photoOf = (photo?: string) => (photo ? photo.replace("/assets/pessoas/", "/community/pessoas/") : "");

function orgRole(title: string): Role {
  if (title === "Fundador") return "fundador";
  if (title === "Presidente" || title.startsWith("Líder")) return "lider";
  return "org";
}

export function trajetoriaData() {
  const periods = cohorts.map(c => c.period);
  const steps: Record<string, Record<string, { role: Role; title: string }>> = {};
  for (const cohort of cohorts) {
    for (const student of cohort.students) {
      (steps[idByName[student.name]] ??= {})[cohort.period] = { role: "aluno", title: "Aluno" };
    }
    for (const member of cohortOrganizations[cohort.period as keyof typeof cohortOrganizations]) {
      const title = member.pos[member.org.lastIndexOf(cohort.period)] ?? "Organização";
      // Organizing a semester outranks studying in it.
      (steps[idByName[member.name]] ??= {})[cohort.period] = { role: orgRole(title), title };
    }
  }
  const people: Traveler[] = Object.entries(steps).map(([id, byPeriod]) => ({
    id,
    name: peopleById[id].name,
    photo: photoOf(peopleById[id].photo),
    link: peopleById[id].link,
    steps: periods.filter(period => byPeriod[period]).map(period => ({ period, ...byPeriod[period] })),
  }));
  const initiatives: Initiative[] = Object.values(organizations).map(o => ({
    id: o.id,
    name: o.name,
    members: o.members.map(m => ({ id: m.personId, role: m.role })),
  }));
  // Current students also belong to "today", as their own block next to Trilha UFPB.
  const active = cohorts.find(c => c.status === "active");
  if (active) initiatives.push({
    id: "trilha-ufpb-alunos",
    name: "Trilha UFPB · Alunos",
    students: true,
    members: active.students.map(s => ({ id: idByName[s.name], role: "Aluno" })),
  });
  for (const init of initiatives) for (const m of init.members) {
    const p = peopleById[m.id];
    if (p && !people.some(x => x.id === m.id)) people.push({ id: m.id, name: p.name, photo: photoOf(p.photo), link: p.link, steps: [] });
  }
  return { periods, people, initiatives };
}

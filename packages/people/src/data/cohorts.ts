import { peopleOrganization20241, peopleOrganization20242, peopleOrganization20251, peopleOrganization20252 } from './people';
import { peopleOrganization20261 } from './current-organization';
import { peopleStudents20241, peopleStudents20242, peopleStudents20251, peopleStudents20252, peopleStudents20261 } from './people';
export const cohorts = [
{status: "completed" as const, durationSemesters: 1, "period": "2024.1", "image": "/assets/turmas/trilha2024.jpg", "title": {"pt": "1ª Turma", "en": "1st cohort"}, "description": {"pt": "Onde tudo começou — Python, web, e o primeiro hackathon.", "en": "Where it all started — Python, web, and the first hackathon."}, students: peopleStudents20241},
{status: "completed" as const, durationSemesters: 1, "period": "2024.2", "image": "/assets/turmas/trilha2024-2.jpg", "title": {"pt": "2ª Turma", "en": "2nd cohort"}, "description": {"pt": "Currículo expandido, primeira leva de palestrantes externos.", "en": "Expanded curriculum, first wave of external guest speakers."}, students: peopleStudents20242},
{status: "completed" as const, durationSemesters: 1, "period": "2025.1", "image": "/assets/turmas/trilha2025.jpg", "title": {"pt": "3ª Turma", "en": "3rd cohort"}, "description": {"pt": "Mentoria estruturada e nova frente de dados.", "en": "Structured mentoring and a new data track."}, students: peopleStudents20251},
{status: "completed" as const, durationSemesters: 1, "period": "2025.2", "image": "/assets/turmas/trilha2025-2.jpeg", "title": {"pt": "4ª Turma", "en": "4th cohort"}, "description": {"pt": "Mais turmas, mais projetos, comunidade consolidada.", "en": "More cohorts, more projects, a community taking shape."}, students: peopleStudents20252},
{period:'2026.1', status:'active' as const, durationSemesters:2, image:'/assets/turmas/trilha2026-1.jpeg', title:{pt:'5ª Turma',en:'5th cohort'}, description:{pt:'Em andamento · 2 semestres de aulas, mentoria e projetos.',en:'In progress · 2 semesters of classes, mentoring and projects.'}, students:peopleStudents20261},
];
export const allStudents = [...new Set(cohorts.flatMap(cohort => cohort.students))];
export const completedCohorts = cohorts.filter(cohort => cohort.status === 'completed');

// Historical membership and titles belong to the edition, not the current team.
export const cohortOrganizations = {
  "2024.1": peopleOrganization20241,
  "2024.2": peopleOrganization20242,
  "2025.1": peopleOrganization20251,
  "2025.2": peopleOrganization20252,
  "2026.1": peopleOrganization20261,
};

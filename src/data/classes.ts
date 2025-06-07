import { Person, peopleOrganization20241, peopleStudents20241 } from './people';

export interface ClassInfo {
  id: string;
  titleKey: string;
  descriptionKey: string;
  images: string[];
  organizers: Person[];
  students: Person[];
}

export const classes: ClassInfo[] = [
  {
    id: '2024.1',
    titleKey: 'classPages.2024_1.title',
    descriptionKey: 'classPages.2024_1.description',
    images: ['trilha2024.JPG', 'aulaTrilha.JPG', 'aulas.jpeg', 'palestra.JPG'],
    organizers: peopleOrganization20241,
    students: peopleStudents20241,
  },
];

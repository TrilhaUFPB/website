import { Person } from './people';
import {
  Emyle,
  MiguelQueiroz,
  LuisAranha,
  JoseVitor,
  NicolasKleiton,
  Bea,
  Luigi,
  Kruta,
  Clara,
  Artur,
  Marcus,
  VitorReis,
  DaviGurgel,
  RafaelTorres,
} from './people';

export interface HackathonProject {
  name: string;
  slug: string;
  members: Person[];
  descriptionKey: string;
  images: string[];
}

export interface Hackathon {
  class: string;
  projects: HackathonProject[];
}

export const hackathons: Hackathon[] = [
  {
    class: '2024.1',
    projects: [
      {
        name: 'ClarIAr',
        slug: 'clariar',
        members: [Emyle, MiguelQueiroz, LuisAranha, JoseVitor],
        descriptionKey: 'hackathons.projects.ClarIAr.description',
        images: ['trilha2024.JPG'],
      },
      {
        name: 'PerCurso',
        slug: 'percurso',
        members: [NicolasKleiton, Bea, Luigi],
        descriptionKey: 'hackathons.projects.PerCurso.description',
        images: ['trilha2024.JPG'],
      },
      {
        name: 'TrilhaSonora',
        slug: 'trilhasonora',
        members: [Kruta, Clara, Artur],
        descriptionKey: 'hackathons.projects.TrilhaSonora.description',
        images: ['trilha2024.JPG'],
      },
      {
        name: 'TARG',
        slug: 'targ',
        members: [Marcus, VitorReis, DaviGurgel, RafaelTorres],
        descriptionKey: 'hackathons.projects.TARG.description',
        images: ['trilha2024.JPG'],
      },
    ],
  },
];

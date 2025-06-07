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
  members: Person[];
  descriptionKey: string;
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
        members: [Emyle, MiguelQueiroz, LuisAranha, JoseVitor],
        descriptionKey: 'hackathons.projects.ClarIAr.description',
      },
      {
        name: 'PerCurso',
        members: [NicolasKleiton, Bea, Luigi],
        descriptionKey: 'hackathons.projects.PerCurso.description',
      },
      {
        name: 'TrilhaSonora',
        members: [Kruta, Clara, Artur],
        descriptionKey: 'hackathons.projects.TrilhaSonora.description',
      },
      {
        name: 'TARG',
        members: [Marcus, VitorReis, DaviGurgel, RafaelTorres],
        descriptionKey: 'hackathons.projects.TARG.description',
      },
    ],
  },
];

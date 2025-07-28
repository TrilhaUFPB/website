export interface Person {
    name: string;
    course: string;
    semester: string;
    role: string;
    link: string;
    photo: string;
    class: string | null;
    org: string[];
    pos: string[];
}

import { Luigi, Kruta, Emyle, Clara, Davi, JoseVitor, Marcus, VitorReis, Artur, LuisAranha, MiguelQueiroz, DaviGurgel, RafaelTorres, NicolasKleiton } from './students_2024_1';
import { AnnaLivia, Carol, Bruno, Chaves, Beatriz, Caua, GabrielCarvalho, DanielDuarte, Julia, Jose, Kawane, Lara, Nathan, Pedro, Murilo, Filipe, Sofia, Thiago, Vinicius } from './students_2024_2';

export const Tiago: Person = {
    name: "Tiago Trindade",
    course: "Ciência da Computação",
    semester: "7",
    role: "Software Engineer Maestro | SGI Fellow @ MIT",
    link: "https://www.linkedin.com/in/tiagotrindade03/",
    photo: "pessoas/tiago.jpeg",
    class: null,
    org: ["2024.1", "2024.2"],
    pos: ["Fundador", "Líder de Mídia"],    
};

export const Felipe: Person = {
    name: "Felipe Duarte",
    course: "Ciência da Computação",
    semester: "7",
    role: "Software Engineer Maestro",
    photo: "pessoas/felipe.png",
    link: "https://www.linkedin.com/in/felipeduartea/",
    class: null,
    org: ["2024.1", "2024.2"],
    pos: ["Fundador", "Líder de Pessoas"],
};

export const Puca: Person = {
    name: "Puca Vaz",
    course: "Ciência da Computação",
    semester: "5",
    role: "Software Engineer Isaac | Machine Learning Engineer LAVID",
    link: "https://www.linkedin.com/in/pucavaz/",
    photo: "pessoas/puca.png",
    class: null,
    org: ["2024.2", "2025.1"],
    pos: ["Membro da Organização", "Membro da Organização"],
};

export const Nicholas: Person = {
    name: "Nicholas Rodrigues",
    course: "Ciência da Computação",
    semester: "5",
    role: "Software Engineer 11x | SWE Career Fellow Uber",
    link: "https://www.linkedin.com/in/nicholas-rodrigues-/",
    photo: "pessoas/nicholas.png",
    class: null,
    org: ["2024.1", "2024.2"],
    pos: ["Fundador", "Líder de Aulas"],
};

export const Icaro: Person = {
    name: "Ícaro Mori",
    course: "Ciência da Computação",
    semester: "Null",
    role: "Manager Pessoalize",
    link: "https://www.linkedin.com/in/icaro-mori-983608210/",
    photo: "pessoas/icaro.png",
    class: null,
    org: ["2024.1", "2024.2"],
    pos: ["Fundador", "Membro da Organização"],
};

export const Daniel: Person = {
    name: "Daniel Victor",
    course: "Ciência da Computação",
    semester: "4",
    role: "Software Engineer CUCO",
    link: "https://www.linkedin.com/in/daniel-victorcb/",
    photo: "pessoas/daniel.png",
    class: null,
    org: ["2024.1", "2024.2", "2025.1"],
    pos: ["Membro da Organização", "Membro da Organização", "Presidente de Aulas"],
};

export const Bea: Person = {
    name: "Beatriz Pessôa",
    course: "Ciência da Computação",
    semester: "3",
    role: "Software Engineer Cebraspe",
    photo: "pessoas/2024.1/bea.png",
    link: "https://www.linkedin.com/in/beatriz-pess%C3%B4a/",
    class: "2024.1",
    org: ["2024.2", "2025.1"],
    pos: ["Membro da Organização", "Presidente de Impacto e Mídias"],
};

export const Luiz: Person = {
    name: "Luiz Fernando",
    course: "Ciência de Dados e IA",
    semester: "Formado",
    role: "Machine Learning Engineering Nubank",
    link: "https://www.linkedin.com/in/luiz-fernando632",
    photo: "pessoas/luiz.png",
    class: null,
    org: ["2024.1", "2024.2"],
    pos: ["Fundador", "Membro da Organização"],
};

export const Gabriel: Person = {
    name: "Gabriel Ayres",
    course: "Engenharia da Computação",
    semester: "5",
    role: "Researcher UPenn/USP | Software Engineer Cebraspe",
    link: "https://www.linkedin.com/in/gabrielbayres/",
    photo: "pessoas/gabriel.png",
    class: null,
    org: ["2024.1", "2024.2"],
    pos: ["Fundador", "Membro da Organização"],
};

export const Guilherme: Person = {
    name: "Guilherme Huther",
    course: "Ciência da Computação",
    semester: "9",
    role: "Data Engineer Dharma.AI",
    link: "https://www.linkedin.com/in/guilhermehuther",
    photo: "pessoas/guilherme.png",
    class: null,
    org: ["2024.1", "2024.2"],
    pos: ["Fundador", "Líder de Aulas"],
};

export const Caio: Person = {
    name: "Caio Chacon",
    course: "Ciência de Dados e IA",
    semester: "9",
    role: "Data Scientist Bitka",
    link: "https://www.linkedin.com/in/caiolchacon",
    photo: "pessoas/caio.png",
    class: null,
    org: ["2024.1"],
    pos: ["Membro da Organização"],
};

export const Ceci: Person = {
    name: "Cecilia Bissigo",
    course: "Fonoaudiologia",
    semester: "3",
    role: " ",
    link: "",
    photo: "pessoas/ceci.png",
    class: null,
    org: ["2024.2", "2025.1"],
    pos: ["Membro da Organização", "Membro da Organização"],
};

export const peopleOrganization20241: Person[] = [
    Tiago,
    Felipe,
    Nicholas,
    Guilherme,
    Icaro,
    Davi,
    Gabriel,
    Luiz,
    Daniel,
    Caio,
]
export const peopleStudents20241: Person[] = [
    Kruta,
    Luigi,
    JoseVitor,
    Marcus,
    VitorReis,
    Emyle,
    Clara,
    Bea,
    Artur,
    LuisAranha,
    MiguelQueiroz,
    DaviGurgel,
    RafaelTorres,
    NicolasKleiton,
]

export const peopleStudents20242: Person[] = [
    AnnaLivia,
    Carol,
    Bruno,
    Chaves,
    Beatriz,
    Caua,
    GabrielCarvalho,
    DanielDuarte,
    Julia,
    Jose,
    Kawane,
    Lara,
    Nathan,
    Pedro,
    Murilo,
    Filipe,
    Sofia,
    Thiago,
    Vinicius
]

export const peopleOrganization20242: Person[] = [
    Tiago,
    Felipe,
    Nicholas,
    Guilherme,
    Icaro,
    Davi,
    Gabriel,
    Luiz,
    Daniel,
    Puca,
    Clara,
    Bea,
    Emyle,
    Kruta,
    Luigi,
    Ceci
]

export const peopleOrganization20251: Person[] = [
    Kruta,
    Daniel,
    Bea,
    Davi,
    Puca,
    Clara,
    Emyle,
    Luigi,
    Ceci,
    Beatriz,
    Kawane
]

export const peopleFounders: Person[] = [
    Tiago,
    Felipe,
    Nicholas,
    Guilherme,
    Icaro,
]

export { Luigi, Kruta, Emyle, Clara, Davi, JoseVitor, Marcus, VitorReis, Artur, LuisAranha, MiguelQueiroz, DaviGurgel, RafaelTorres, NicolasKleiton } from './students_2024_1';
export { AnnaLivia, Carol, Bruno, Chaves, Beatriz, Caua, GabrielCarvalho, DanielDuarte, Julia, Jose, Kawane, Lara, Nathan, Pedro, Murilo, Filipe, Sofia, Thiago, Vinicius } from './students_2024_2';


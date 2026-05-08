export type Lang = 'pt' | 'en';

export type Pillar = { tag: string; img: string; title: string; body: string };
export type TurmaItem = { period: string; title: string; students: number; theme: string; img: string };
export type ProjectItem = { tag: string; title: string; desc: string };

export type Copy = {
  nav: { sobre: string; turmas: string; projetos: string; time: string; materiais: string; apply: string };
  hero: { eyebrow: string; titleA: string; titleB: string; flips: string[]; lede: string; ctaPrimary: string; ctaSecondary: string };
  sobre: { eyebrow: string; title: string; lede: string; pillars: Pillar[] };
  numbers: { eyebrow: string; title: string; stats: { k: string; l: string }[] };
  turmas: { eyebrow: string; title: string; lede: string; items: TurmaItem[] };
  projects: { eyebrow: string; title: string; lede: string; items: ProjectItem[] };
  depo: { eyebrow: string; title: string; lede: string };
  time: { eyebrow: string; title: string; lede: string; tabs: { current: string; founders: string }; seeAll: string };
  materiais: { eyebrow: string; title: string; lede: string; tracks: string[]; cta: string };
  footer: { tagline: string; contact: string; sections: string; rights: string };
};

export const COPY: Record<Lang, Copy> = {
  pt: {
    nav: { sobre: 'Sobre', turmas: 'Turmas', projetos: 'Projetos', time: 'Time', materiais: 'Materiais', apply: 'Inscreva-se' },
    hero: {
      eyebrow: 'Trilha — UFPB · CI',
      titleA: 'Um caminho prático para',
      titleB: '',
      flips: ['aprender.', 'crescer.', 'se conectar.', 'começar.'],
      lede: 'O Trilha é um programa gratuito feito por estudantes da UFPB para apoiar quem está chegando ao Centro de Informática. Aulas, mentorias, palestras e um hackathon — tudo em um semestre.',
      ctaPrimary: 'Como funciona',
      ctaSecondary: 'Conheça o time',
    },
    sobre: {
      eyebrow: '01 / Sobre',
      title: 'Mais que um curso. Uma rede para a vida.',
      lede: 'O Trilha começou em 2024 como uma resposta de alunos veteranos a uma pergunta simples: o que faltou pra gente quando chegou na universidade? Hoje somos um programa com aulas, mentoria, palestras e eventos — feito por quem já passou pelo caminho.',
      pillars: [
        { tag: 'Aulas práticas', img: '/assets/pillars/aulas.jpg', title: 'Currículo voltado pro mercado', body: 'Python, web, dados e fundamentos de engenharia — entregues por monitores que já trabalham na área. Tudo aplicado em projeto real ao final do semestre.' },
        { tag: 'Mentoria 1-1', img: '/assets/pillars/mentoria.jpg', title: 'Acompanhamento que não acaba na sala', body: 'Cada aluno tem um mentor sênior que acompanha a evolução da turma. As trocas continuam muito depois do semestre acabar.' },
        { tag: 'Palestras', img: '/assets/pillars/palestras.png', title: 'Convidados de empresas e laboratórios', body: 'Engenheiros, fundadores e pesquisadores trazem o que está acontecendo de verdade no mercado e na pesquisa.' },
        { tag: 'Hackathon', img: '/assets/pillars/hackathon.jpg', title: 'Aplicar tudo no fim do semestre', body: 'A turma fecha com um hackathon temático onde os times constroem do zero — a melhor forma de consolidar o aprendizado.' },
      ],
    },
    numbers: {
      eyebrow: '02 / Números',
      title: 'Três turmas, e a rede só cresce.',
      stats: [
        { k: '49', l: 'alunos formados' },
        { k: '20', l: 'organizadores ativos' },
        { k: '4', l: 'fundadores' },
        { k: '3', l: 'turmas concluídas' },
        { k: '100%', l: 'gratuito, sempre' },
        { k: '5+', l: 'palestrantes convidados' },
      ],
    },
    turmas: {
      eyebrow: '03 / Turmas',
      title: 'Três semestres, três histórias.',
      lede: 'Cada turma marca uma versão do Trilha. Conheça quem passou por aqui e o que cada edição construiu.',
      items: [
        { period: '2024.1', title: 'Primeira Turma', students: 14, theme: 'Onde tudo começou — Python, web, e o primeiro hackathon.', img: '/assets/turmas/trilha2024.jpg' },
        { period: '2024.2', title: 'Segunda Turma', students: 19, theme: 'Currículo expandido, primeira leva de palestrantes externos.', img: '/assets/turmas/trilha2024-2.jpg' },
        { period: '2025.1', title: 'Terceira Turma', students: 16, theme: 'Mentoria estruturada e nova frente de dados.', img: '/assets/turmas/trilha2025.jpg' },
      ],
    },
    projects: {
      eyebrow: '04 / Hackathon',
      title: 'O que sai de um semestre no Trilha.',
      lede: 'Todo semestre fecha com um hackathon temático. As equipes constroem do zero em poucos dias — abaixo, alguns dos projetos. (Em breve com links e detalhes.)',
      items: [
        { tag: '2024.1', title: 'Projeto placeholder #1', desc: 'Tema do hackathon e descrição vão aqui. Substituível depois.' },
        { tag: '2024.2', title: 'Projeto placeholder #2', desc: 'Pequena descrição do projeto, stack e o impacto pra equipe.' },
        { tag: '2025.1', title: 'Projeto placeholder #3', desc: 'O conteúdo real será adicionado depois — esses são lugares reservados.' },
      ],
    },
    depo: { eyebrow: '05 / Depoimentos', title: 'Pelos próprios alunos.', lede: 'Trechos do que ex-alunos escreveram sobre a experiência.' },
    time: {
      eyebrow: '06 / Time',
      title: 'Quem faz o Trilha acontecer.',
      lede: 'Atualmente a organização é formada por monitores ativos, ex-alunos que voltaram para ajudar e os fundadores que continuam por perto.',
      tabs: { current: 'Organização atual', founders: 'Fundadores' },
      seeAll: 'Ver todos →',
    },
    materiais: {
      eyebrow: '07 / Materiais',
      title: 'Conteúdo aberto, sempre.',
      lede: 'Os materiais didáticos do Trilha — Python, frontend, backend, banco de dados, dados — ficam disponíveis livremente para qualquer pessoa que queira aprender.',
      tracks: ['Python básico', 'Frontend', 'Backend', 'Banco de dados', 'Dados'],
      cta: 'Acessar materiais',
    },
    footer: { tagline: 'Capacitando e inspirando estudantes para um futuro brilhante.', contact: 'Contato', sections: 'Seções', rights: 'Todos os direitos reservados.' },
  },
  en: {
    nav: { sobre: 'About', turmas: 'Cohorts', projetos: 'Projects', time: 'Team', materiais: 'Materials', apply: 'Apply' },
    hero: {
      eyebrow: 'Trilha — UFPB · CI',
      titleA: 'A practical path to',
      titleB: '',
      flips: ['learn.', 'grow.', 'connect.', 'start.'],
      lede: 'Trilha is a free program built by UFPB students to support people arriving at the Computing Center. Classes, mentoring, talks, and a hackathon — all in one semester.',
      ctaPrimary: 'How it works',
      ctaSecondary: 'Meet the team',
    },
    sobre: {
      eyebrow: '01 / About',
      title: 'More than a course. A network for life.',
      lede: "Trilha started in 2024 as senior students' answer to a simple question: what was missing for us when we arrived? Today it is a program of classes, mentoring, talks, and events — built by people who walked the path already.",
      pillars: [
        { tag: 'Hands-on classes', img: '/assets/pillars/aulas.jpg', title: 'A curriculum aimed at industry', body: 'Python, web, data, and engineering fundamentals — taught by tutors already working in the field. Applied to a real project at the end of each semester.' },
        { tag: '1-1 mentoring', img: '/assets/pillars/mentoria.jpg', title: "Support that doesn't end with the class", body: 'Every student is paired with a senior mentor. The conversations continue long after the semester ends.' },
        { tag: 'Talks', img: '/assets/pillars/palestras.png', title: 'Guests from industry and research', body: 'Engineers, founders, and researchers bring back what is actually happening in the market and in academia.' },
        { tag: 'Hackathon', img: '/assets/pillars/hackathon.jpg', title: 'Putting it all together at the end', body: 'Each cohort closes with a themed hackathon — teams build from scratch in a few days, the best way to consolidate everything learned.' },
      ],
    },
    numbers: {
      eyebrow: '02 / Numbers',
      title: 'Three cohorts, a growing network.',
      stats: [
        { k: '49', l: 'students graduated' },
        { k: '20', l: 'active organizers' },
        { k: '4', l: 'founders' },
        { k: '3', l: 'cohorts completed' },
        { k: '100%', l: 'free, always' },
        { k: '5+', l: 'invited speakers' },
      ],
    },
    turmas: {
      eyebrow: '03 / Cohorts',
      title: 'Three semesters, three stories.',
      lede: 'Each cohort marks a version of Trilha. Meet the people who came through and what each edition built.',
      items: [
        { period: '2024.1', title: 'First cohort', students: 14, theme: 'Where it all started — Python, web, and the first hackathon.', img: '/assets/turmas/trilha2024.jpg' },
        { period: '2024.2', title: 'Second cohort', students: 19, theme: 'Expanded curriculum, first wave of external guest speakers.', img: '/assets/turmas/trilha2024-2.jpg' },
        { period: '2025.1', title: 'Third cohort', students: 16, theme: 'Structured mentoring and a new data track.', img: '/assets/turmas/trilha2025.jpg' },
      ],
    },
    projects: {
      eyebrow: '04 / Hackathon',
      title: 'What comes out of a Trilha semester.',
      lede: 'Every semester ends with a themed hackathon. Teams build from scratch in a few days — below, some of the projects. (Links and details coming soon.)',
      items: [
        { tag: '2024.1', title: 'Project placeholder #1', desc: 'Hackathon theme and description go here. Replaceable later.' },
        { tag: '2024.2', title: 'Project placeholder #2', desc: 'Short description of the project, stack, and impact.' },
        { tag: '2025.1', title: 'Project placeholder #3', desc: 'Real content will be added later — these are reserved slots.' },
      ],
    },
    depo: { eyebrow: '05 / Testimonials', title: "In the students' own words.", lede: 'Excerpts from what alumni wrote about the experience.' },
    time: {
      eyebrow: '06 / Team',
      title: 'The people making Trilha happen.',
      lede: 'Today the organization is made up of active tutors, former students who came back to help, and founders who stayed close.',
      tabs: { current: 'Current org', founders: 'Founders' },
      seeAll: 'See everyone →',
    },
    materiais: {
      eyebrow: '07 / Materials',
      title: 'Always open, always free.',
      lede: "Trilha's teaching material — Python, frontend, backend, databases, data — stays freely available for anyone who wants to learn.",
      tracks: ['Python basics', 'Frontend', 'Backend', 'Databases', 'Data'],
      cta: 'Open materials',
    },
    footer: { tagline: 'Empowering and inspiring students for a bright future.', contact: 'Contact', sections: 'Sections', rights: 'All rights reserved.' },
  },
};

export type Testimonial = { name: string; quote: string; quote_en: string; role: string; photo: string };
export type Person = { name: string; role: string; photo: string; course: string; link: string };

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Emyle', quote: 'Trilha foi uma experiência incrível. Se não fosse o projeto, dificilmente teria contato com tantos temas importantes da programação no meu primeiro semestre.', quote_en: "Trilha was an incredible experience. If it weren't for the project, I would hardly have met so many important programming topics in my first semester.", role: 'Aluna 2024.1', photo: '/assets/pessoas/2024.1/emyle.png' },
  { name: 'Miguel Queiroz', quote: 'As aulas semanais e o hackathon transformaram minha visão de programação por me fazerem colocar em prática toda a teoria aprendida.', quote_en: 'The weekly classes and the hackathon transformed my view of programming by making me put theory into practice.', role: 'Aluno 2024.1', photo: '/assets/pessoas/2024.1/miguel.png' },
  { name: 'Luigi', quote: 'O Trilha me ajudou a construir uma base sólida e forjar um caminho de aprendizado que cobriu os principais conceitos para entrar num primeiro projeto real.', quote_en: 'Trilha helped me build a solid foundation and forge a learning path that covers the main concepts needed to enter a first real project.', role: 'Aluno 2024.1', photo: '/assets/pessoas/2024.1/luigi.png' },
  { name: 'Bea', quote: 'A experiência prática e o aprendizado em time foram transformadores — mostraram a importância de colaborar e crescer com outras pessoas.', quote_en: 'The practical experience and team learning were transformative, showing the importance of collaborating and growing with other people.', role: 'Aluna 2024.1 · Org 2025.1', photo: '/assets/pessoas/2024.1/bea.png' },
  { name: 'Davi Gurgel', quote: 'Entrei no curso com pouca bagagem em programação e o Trilha me fez chegar num nível que talvez levasse muito mais meses sem mentoria.', quote_en: 'I entered the course with little programming background, and Trilha got me to a level that might have taken several more months without mentoring.', role: 'Aluno 2024.1', photo: '/assets/pessoas/davi.png' },
  { name: 'Clara', quote: 'Mais do que aprender, conhecer pessoas incríveis e ouvir histórias inspiradoras mudou completamente como eu enxergo a área.', quote_en: 'More than learning, meeting incredible people and hearing inspiring stories completely changed how I see the field.', role: 'Aluna 2024.1 · Org atual', photo: '/assets/pessoas/2024.1/clara.png' },
];

export const ORG: Person[] = [
  { name: 'Tiago Trindade', role: 'Fundador · Líder de Mídia', photo: '/assets/pessoas/tiago.jpg', course: 'Ciência da Computação', link: 'https://www.linkedin.com/in/tiagotrindade03/' },
  { name: 'Felipe Duarte', role: 'Fundador · Líder de Pessoas', photo: '/assets/pessoas/felipe.png', course: 'Ciência da Computação', link: 'https://www.linkedin.com/in/felipeduartea/' },
  { name: 'Nicholas Rodrigues', role: 'Fundador · Líder de Aulas', photo: '/assets/pessoas/nicholas.png', course: 'Ciência da Computação', link: 'https://www.linkedin.com/in/nicholas-rodrigues-/' },
  { name: 'Guilherme Huther', role: 'Fundador · Líder de Aulas', photo: '/assets/pessoas/guilherme.png', course: 'Ciência da Computação', link: 'https://www.linkedin.com/in/guilhermehuther' },
  { name: 'Ícaro Mori', role: 'Org', photo: '/assets/pessoas/icaro.png', course: 'Ciência da Computação', link: 'https://www.linkedin.com/in/icaro-mori-983608210/' },
  { name: 'Davi', role: 'Org', photo: '/assets/pessoas/davi.png', course: 'Ciência da Computação', link: '' },
  { name: 'Gabriel Ayres', role: 'Org', photo: '/assets/pessoas/gabriel.png', course: 'Engenharia da Computação', link: 'https://www.linkedin.com/in/gabrielbayres/' },
  { name: 'Luiz Fernando', role: 'Org', photo: '/assets/pessoas/luiz.png', course: 'Ciência de Dados e IA', link: 'https://www.linkedin.com/in/luiz-fernando632' },
  { name: 'Daniel Brandão', role: 'Org · 2024–2025', photo: '/assets/pessoas/daniel.jpg', course: 'Ciência da Computação', link: 'https://www.linkedin.com/in/daniel-victorcb/' },
  { name: 'Puca Vaz', role: 'Org · 2024.2 / 2025.1', photo: '/assets/pessoas/puca.png', course: 'Ciência da Computação', link: 'https://www.linkedin.com/in/pucavaz/' },
  { name: 'Cecília Bíssigo', role: 'Org · 2024.2 / 2025.1', photo: '/assets/pessoas/ceci.png', course: 'Fonoaudiologia', link: '' },
  { name: 'Ana Cecilia Bezerra', role: 'Org · 2025.1', photo: '/assets/pessoas/cecilialog.jpg', course: 'Ciência da Computação', link: 'https://www.linkedin.com/in/ana-cec%C3%ADlia-bezerra-338070242/' },
  { name: 'Beatriz Pessôa', role: 'Org · 2024.2 / 2025.1', photo: '/assets/pessoas/2024.1/bea.png', course: 'Ciência da Computação', link: 'https://www.linkedin.com/in/beatriz-pess%C3%B4a/' },
  { name: 'Clara', role: 'Org · 2025.1', photo: '/assets/pessoas/2024.1/clara.png', course: 'Ciência da Computação', link: '' },
  { name: 'Kruta', role: 'Org · 2025.1', photo: '/assets/pessoas/2024.1/kruta.png', course: 'Ciência da Computação', link: '' },
  { name: 'Emyle', role: 'Org · 2024.2 / 2025.1', photo: '/assets/pessoas/2024.1/emyle.png', course: 'Ciência da Computação', link: '' },
  { name: 'Luigi', role: 'Org · 2025.1', photo: '/assets/pessoas/2024.1/luigi.png', course: 'Ciência da Computação', link: '' },
  { name: 'Miguel Queiroz', role: 'Org · 2025.1', photo: '/assets/pessoas/2024.1/miguel.png', course: 'Ciência da Computação', link: '' },
  { name: 'Marcus', role: 'Org · 2025.1', photo: '/assets/pessoas/2024.1/marcus.jpg', course: 'Ciência da Computação', link: '' },
  { name: 'Caio Chacon', role: 'Org · 2024.1', photo: '/assets/pessoas/caio.png', course: 'Ciência de Dados e IA', link: 'https://www.linkedin.com/in/caiolchacon' },
];

const FOUNDER_NAMES = new Set(['Tiago Trindade', 'Felipe Duarte', 'Nicholas Rodrigues', 'Guilherme Huther']);
export const FOUNDERS: Person[] = ORG.filter((p) => FOUNDER_NAMES.has(p.name));

export const FAQS: Record<Lang, { q: string; a: string }[]> = {
  pt: [
    { q: 'É para todos os cursos?', a: 'Sim — o programa é aberto a estudantes de qualquer curso, não restrito apenas à UFPB.' },
    { q: 'Como me inscrevo?', a: 'As inscrições abrem periodicamente, sempre que uma turma termina, no início de cada semestre letivo.' },
    { q: 'Quantas turmas existem?', a: 'Apenas uma turma por semestre.' },
    { q: 'Preciso saber programar?', a: 'Não. O programa é focado em quem está começando e não exige conhecimento prévio.' },
    { q: 'Onde acontecem as aulas?', a: 'No Centro de Informática (CI) da UFPB.' },
    { q: 'É gratuito?', a: 'Sim — completamente gratuito.' },
  ],
  en: [
    { q: 'Is it for every major?', a: 'Yes — open to students from any major, not restricted to UFPB only.' },
    { q: 'How do I sign up?', a: 'Registrations open periodically, when each cohort ends, at the start of each academic semester.' },
    { q: 'How many cohorts run at once?', a: 'Just one cohort per semester.' },
    { q: 'Do I need to know how to program?', a: 'No. The program targets people starting out and assumes no prior experience.' },
    { q: 'Where are classes held?', a: "At UFPB's Computing Center (CI)." },
    { q: 'Is it free?', a: 'Yes — completely free.' },
  ],
};

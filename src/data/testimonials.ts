import {
  Artur,
  Bea,
  BiancaGuido,
  Clara,
  DaviGurgel,
  Emyle,
  GabrielBringel,
  GabrielPinto,
  GuilhermeRibeiro,
  Kruta,
  LucianaNascimento,
  Luigi,
  LuisAranha,
  MarcoGadelha,
  Marcus,
  MiguelQueiroz,
  MikaelRodrigues,
  NicolasKleiton,
  type Person,
  PierreQueiroz,
  RafaelTorres,
  RhuanOliveira,
  RicardoBorges,
  SergioFreitas,
  SofiaAraujo,
  VitorReis,
  YasminBatista,
} from './people';

export type LocalizedText = { pt: string; en: string };

export type Testimonial = {
  person: Person;
  long: LocalizedText;
  short?: LocalizedText;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    person: Emyle,
    long: {
      pt: "O Trilha foi uma experiência incrível. Se não fosse pelo projeto, dificilmente eu teria tido contato com tantos assuntos importantes de programação logo no meu primeiro período. Ele não só me proporcionou uma base técnica, mas também me ajudou a desenvolver habilidades como trabalho em equipe e gestão de projeto, especialmente durante o hackathon, preparando-me para a vida profissional real",
      en: "Trilha was an incredible experience. If it weren't for the project, I would hardly have come into contact with so many important programming topics in my first semester. It not only provided me with a technical foundation, but also helped me develop skills such as teamwork and project management, especially during the hackathon, preparing me for real professional life.",
    },
  },
  {
    person: MiguelQueiroz,
    long: {
      pt: "O Trilha foi de suma importância para a minha introdução ao curso de ciência da computação que, até então, estava sendo predominantemente teórico. As aulas semanais e o hackathon no fim do período transformaram a minha visão sobre a programação ao me fazer pôr em prática toda a teoria aprendida em sala. Fiquei muito feliz e grato por ter participado, por isso recomendo a todos que estão iniciando no curso!",
      en: "Trilha was of paramount importance for my introduction to the computer science course which, until then, was predominantly theoretical. The weekly classes and the hackathon at the end of the period transformed my view of programming by making me put into practice all the theory learned in class. I was very happy and grateful to have participated, so I recommend it to everyone who is starting the course!",
    },
    short: {
      pt: "As aulas semanais e o hackathon transformaram minha visão de programação por me fazerem colocar em prática toda a teoria aprendida.",
      en: "The weekly classes and the hackathon transformed my view of programming by making me put theory into practice.",
    },
  },
  {
    person: Luigi,
    long: {
      pt: "O Trilha me ajudou a construir uma base sólida e a trilhar um caminho de aprendizado que passa pelos conceitos principais necessários para entrar em um primeiro projeto real. Através dele, desenvolvi habilidades práticas e teóricas que foram fundamentais para minha jornada, me preparando para desafios como aqueles que enfrento atualmente na Moises. Essa experiência não apenas reforçou minha confiança, mas também abriu portas para projetos mais complexos, onde posso aplicar os conhecimentos recebidos e impactar o mundo.",
      en: "Trilha helped me build a solid foundation and forge a learning path that covers the main concepts needed to enter a first real project. Through it, I developed practical and theoretical skills that were fundamental to my journey, preparing me for challenges like those I currently face at Moises. This experience not only reinforced my confidence, but also opened doors to more complex projects, where I can apply the knowledge received and impact the world.",
    },
    short: {
      pt: "O Trilha me ajudou a construir uma base sólida e forjar um caminho de aprendizado que cobriu os principais conceitos para entrar num primeiro projeto real.",
      en: "Trilha helped me build a solid foundation and forge a learning path that covers the main concepts needed to enter a first real project.",
    },
  },
  {
    person: Bea,
    long: {
      pt: "Vivenciar o Trilha foi um marco no início da minha trajetória na Ciência da Computação. O projeto não apenas me apresentou os fundamentos da programação, mas também me deu a confiança para explorar a área com mais segurança. A experiência prática e o aprendizado em equipe foram transformadores, mostrando a importância de colaborar e crescer junto com outras pessoas. O Trilha foi uma parte especial desse começo, e sou muito grata por ter feito parte dessa jornada.",
      en: "Experiencing Trilha was a milestone at the beginning of my journey in Computer Science. The project not only introduced me to the fundamentals of programming, but also gave me the confidence to explore the field with more security. The practical experience and team learning were transformative, showing the importance of collaborating and growing with other people. Trilha was a special part of this beginning, and I am very grateful to have been part of this journey.",
    },
    short: {
      pt: "A experiência prática e o aprendizado em time foram transformadores — mostraram a importância de colaborar e crescer com outras pessoas.",
      en: "The practical experience and team learning were transformative, showing the importance of collaborating and growing with other people.",
    },
  },
  {
    person: DaviGurgel,
    long: {
      pt: "O Trilha foi essencial para o meu início de curso e me proporcionou uma base muito sólida do que vou precisar para uma boa formação como estudante e profissional. A experiência foi indispensável para mim, pois entrei no curso com pouca base de programação e acredito que o Trilha me fez alcançar um nível que eu talvez demoraria vários meses a mais para atingir, sem a mentoria. Além disso, durante esse projeto conheci pessoas incríveis, com quem tenho vontade de manter contato pelo resto da minha vida. Por isso, sou muito grato por ter participado da primeira edição do Trilha.",
      en: "Trilha was essential for my beginning of the course and provided me with a very solid foundation of what I will need for good training as a student and professional. The experience was indispensable for me, as I entered the course with little programming background and I believe that Trilha made me reach a level that I might have taken several more months to reach without mentoring. Additionally, during this project I met incredible people, with whom I want to stay in touch for the rest of my life. That's why I'm very grateful to have participated in the first edition of Trilha.",
    },
  },
  {
    person: Clara,
    long: {
      pt: "A experiência que o Trilha proporcionou foi simplesmente única. O projeto me ajudou a crescer tanto como estudante quanto como pessoa, me ensinando a ser mais focada e a trabalhar melhor em equipe. Mais do que isso, conhecer pessoas incríveis e ouvir histórias inspiradoras mudou totalmente a forma como eu vejo a área. Sou muito grata a todos os envolvidos, porque o Trilha marcou profundamente minha vida, tanto no lado pessoal quanto no acadêmico.",
      en: "The experience that Trilha provided was simply unique. The project helped me grow both as a student and as a person, teaching me to be more focused and to work better in teams. More than that, meeting incredible people and hearing inspiring stories completely changed the way I see the field. I am very grateful to everyone involved, because Trilha has profoundly marked my life, both personally and academically.",
    },
  },
  {
    person: LuisAranha,
    long: {
      pt: "O trilha foi uma experiência que me proporcionou muito aprendizado e conexão com pessoas importantes da área, explicando desde a base do que é programar e o que é uma linguagem de programação, em especial o Python, até como produzir um projeto em grupo com pessoas extremamente competentes que trilharam o caminho comigo. Acredito ter sido de grande importância para mim, visto que iniciei no curso de Ciência da Computação com um conhecimento quase nulo da área, e me proporcionou preencher esse vazio!",
      en: "Trilha was an experience that provided me with a lot of learning and connection with important people in the field, explaining everything from the basics of what programming is and what a programming language is, especially Python, to how to produce a group project with extremely competent people who walked the path with me. I believe it was of great importance to me, since I started the Computer Science course with almost zero knowledge of the area, and it helped me fill this void!",
    },
  },
  {
    person: Marcus,
    long: {
      pt: "Aqui, tive grandes experiências com coisas que sequer pensei que teria. Consegui aprender com pessoas que me inspiram e, do início ao fim, tive uma enorme satisfação em participar dessa trajetória.",
      en: "Here, I had great experiences with things I never thought I would have. I was able to learn from people who inspire me and, from beginning to end, I had enormous satisfaction in participating in this journey.",
    },
    short: {
      pt: "Tive grandes experiências com coisas que sequer pensei que teria — aprendi com pessoas que me inspiram.",
      en: "I had great experiences I never imagined — learning from people who inspire me.",
    },
  },
  {
    person: Kruta,
    long: {
      pt: "O programa Trilha foi um pilar fundamental para a minha formação nesse início de graduação. Nele, tive a oportunidade de conhecer novas pessoas, construir amizades valiosas e adquirir muito conhecimento, tanto na parte técnica quanto no trabalho em equipe e na convivência em grupo.",
      en: "The Trilha program was a fundamental pillar for my education at the beginning of my undergraduate studies. In it, I had the opportunity to meet new people, build valuable friendships and acquire a lot of knowledge, both in the technical part and in teamwork and group interaction.",
    },
  },
  {
    person: NicolasKleiton,
    long: {
      pt: "Participar do trilha foi uma experiência incrível pra mim, especialmente porque eu tinha acabado de entrar na universidade, não conhecia ninguém e, nesse tempo, pude conhecer pessoas incríveis. O trilha foi essencial para colocar em prática o que aprendemos, principalmente durante o hackathon. Sou muito grato ao trilha por tudo. Tenho certeza de que essa experiência não foi importante apenas pra mim, mas também para todos que tiveram a chance de participar.",
      en: "Participating in Trilha was an incredible experience for me, especially because I had just entered university, didn't know anyone, and during that time, I was able to meet amazing people. Trilha was essential for putting what we learned into practice, especially during the hackathon. I am very grateful to Trilha for everything. I am sure that this experience was not only important for me but also for everyone who had the chance to participate.",
    },
  },
  {
    person: Artur,
    long: {
      pt: "O Trilha foi essencial para me ajudar a construir uma base sólida nos conceitos básicos de programação e a seguir um caminho estruturado de aprendizado nas diversas áreas possíveis do ramo, abrangendo os principais conceitos necessários para ingressar em projetos reais. Durante essa jornada, desenvolvi habilidades práticas e teóricas que foram de suma importância para a minha evolução. Ter experiências com profissionais reconhecidos no mercado e com ex-alunos foi, para mim, a parte mais engrandecedora do projeto. Estou extremamente feliz por ter tido essa oportunidade singular!",
      en: "Trilha was essential to help me build a solid foundation in the basic concepts of programming and to follow a structured learning path in the various possible areas of the field, covering the main concepts necessary to enter real projects. During this journey, I developed practical and theoretical skills that were of paramount importance to my evolution. Having experiences with recognized professionals in the market and with former students was, for me, the most enriching part of the project. I am extremely happy to have had this unique opportunity!",
    },
  },
  {
    person: VitorReis,
    long: {
      pt: "O Trilha foi uma experiência incrível pra mim, na qual aprendi muita coisa no ramo da programação, desde o básico até conceitos mais avançados, e tive minha primeira experiência em um trabalho em equipe no hackathon. Além disso, pude conhecer pessoas incríveis, as quais sou extremamente grato por terem feito minhas sextas-feiras mais felizes durante o Trilha.",
      en: "Trilha was an incredible experience for me, in which I learned a lot in the field of programming, from the basics to more advanced concepts, and had my first experience in teamwork during the hackathon. In addition, I was able to meet incredible people, to whom I am extremely grateful for making my Fridays happier during Trilha.",
    },
  },
  {
    person: RafaelTorres,
    long: {
      pt: "O Trilha foi uma experiência transformadora para mim. O projeto não apenas me ajudou a construir uma base sólida, mas também proporcionou contato com assuntos muito importantes, que dificilmente eu conheceria de outra forma. Participar do Trilha no início do curso foi com certeza uma das melhores decisões que tomei, sou muito grato por ter participado.",
      en: "Trilha was a transformative experience for me. The project not only helped me build a solid foundation, but also provided contact with very important subjects that I would hardly have known otherwise. Participating in Trilha at the beginning of the course was certainly one of the best decisions I made, I am very grateful to have participated.",
    },
  },
  {
    person: RhuanOliveira,
    long: {
      pt: "O Trilha foi um impulso muito importante na minha trajetória universitária — e sei que vai impactar minha carreira em computação. Fiz amigos, interagi com pessoas que nunca imaginei conhecer, e isso me fez crescer como aluno e em conhecimento técnico.",
      en: "Trilha was a major boost in my university journey — and I know it will shape my career in computing. I made friends, met people I never imagined I'd meet, and that made me grow both as a student and in technical knowledge.",
    },
  },
  {
    person: SergioFreitas,
    long: {
      pt: "O Trilha foi uma experiência intensa que ampliou minha visão e me mostrou as possibilidades que a área traz. Conheci pessoas incríveis, me aproximei de quem eu já admirava, e saio mais confiante, mais maduro e com muito mais clareza de onde quero chegar. Foi mais do que aprender a programar — foi perceber que faço parte de algo maior, de uma comunidade que se importa de verdade.",
      en: "Trilha was an intense experience that broadened my perspective and showed me what the field can offer. I met incredible people, got closer to those I already admired, and walked out more confident, more mature, and with much greater clarity about where I want to go. It was more than learning to code — it was realizing I'm part of something bigger, a community that genuinely cares.",
    },
  },
  {
    person: LucianaNascimento,
    long: {
      pt: "Entrei no primeiro período com medo de estar muito atrás de todo mundo, e o Trilha mudou isso. Foi um guia que me deu segurança o suficiente para me sentir bem comigo mesma. Amei cada aula — e principalmente os momentos em que o time parava tudo pra ouvir o que a gente estava sentindo. Sou grata por todo o conhecimento, mas principalmente pelos amigos que vou levar pra vida toda.",
      en: "I started my first semester afraid of being far behind everyone else, and Trilha changed that. It became a guide that gave me enough confidence to feel good about myself. I loved every class — and especially the moments when the team stopped everything to listen to how we were feeling. I'm grateful for everything I learned, but most of all for the friends I'll carry with me for life.",
    },
    short: {
      pt: "O Trilha transformou o medo do primeiro período em confiança, conhecimento e amizades pra vida toda.",
      en: "Trilha turned my first-semester fear into confidence, knowledge, and friendships for life.",
    },
  },
  {
    person: GabrielPinto,
    long: {
      pt: "Foi uma experiência única em vários sentidos — um desafio muito maior do que eu esperava, e isso foi uma das melhores coisas que poderiam ter acontecido no meu primeiro semestre. Ser exposto a um projeto desse tamanho como calouro faz com que habilidades se desenvolvam por necessidade, e o conhecimento venha das relações que você constrói no caminho.",
      en: "It was a one-of-a-kind experience — a much bigger challenge than I expected, and that was one of the best things that could have happened in my first semester. Being thrown into a project of this scale as a freshman makes skills develop out of necessity, and the knowledge comes from the relationships you build along the way.",
    },
  },
  {
    person: GabrielBringel,
    long: {
      pt: "Foi uma oportunidade única de desenvolver habilidades importantes pra vida, aprender com grandes exemplos e construir conexões valiosíssimas logo no início da graduação. O Trilha foi, sem dúvidas, a melhor e mais importante primeira etapa do meu desenvolvimento pessoal e acadêmico.",
      en: "It was a unique chance to develop skills important for life, learn from great role models, and build invaluable connections right at the start of college. Trilha was, without a doubt, the best and most important first step in my personal and academic development.",
    },
  },
  {
    person: YasminBatista,
    long: {
      pt: "O Trilha foi uma experiência marcante muito além das aulas — um espaço de acolhimento, inspiração e crescimento que transformava as sextas-feiras em um dos melhores momentos da semana. Conhecer pessoas tão incríveis fez tudo ser ainda mais especial e motivador.",
      en: "Trilha was a defining experience far beyond the classes — a space of welcome, inspiration, and growth that turned Fridays into one of the best parts of the week. Meeting such incredible people made everything even more special and motivating.",
    },
  },
  {
    person: RicardoBorges,
    long: {
      pt: "Um salto em experiência profissional e técnica, e também uma comunidade incrível, cheia de pessoas inspiradoras. O Trilha foi a confirmação de que escolhi o caminho certo.",
      en: "A leap in professional and technical experience, and also an incredible community full of inspiring people. Trilha was the confirmation that I chose the right path.",
    },
  },
  {
    person: GuilhermeRibeiro,
    long: {
      pt: "O Trilha foi um divisor de águas na minha vida acadêmica. As aulas dinâmicas, os assuntos que eu nunca imaginei ver logo no primeiro período e a comunidade foram essenciais — principalmente porque vim de fora e não tinha ninguém tão próximo. Hoje, se eu precisar de qualquer ajuda, sei que posso contar com qualquer pessoa do projeto.",
      en: "Trilha was a turning point in my academic life. The dynamic classes, the topics I never imagined seeing in my first semester, and the community were essential — especially because I'm from out of town and didn't have anyone close. Today, if I need help, I know I can count on anyone from the project.",
    },
  },
  {
    person: BiancaGuido,
    long: {
      pt: "Foi uma das melhores experiências que se pode ter como caloura. As pessoas do time, que também são jovens, já são uma inspiração enorme pra quem chega. Para além do técnico, a turma aprende que ninguém chega ao topo sozinho e que crítica construtiva vale mais do que elogio. Também aprendi a liderar, a falar com mais confiança e a importância de organizar o próprio tempo.",
      en: "It was one of the best experiences a freshman can have. The team — also young — is already a huge inspiration for those just arriving. Beyond the technical side, you learn that no one gets to the top alone and that constructive criticism matters more than praise. I also learned to lead, to speak with more confidence, and the importance of managing my own time.",
    },
  },
  {
    person: PierreQueiroz,
    long: {
      pt: "O Trilha ampliou minha visão do que a programação pode me proporcionar e até onde posso chegar. Estar rodeado de pessoas que já trabalham e correm atrás dos seus objetivos mostra que é possível — e fazer amizade, conversar e rir com gente que tem um objetivo parecido com o seu deixa o processo muito mais leve.",
      en: "Trilha broadened my view of what programming can offer me and how far I can go. Being surrounded by people already working and chasing their goals shows that it's possible — and building friendships with people aiming in the same direction makes the whole journey much lighter.",
    },
  },
  {
    person: MarcoGadelha,
    long: {
      pt: "O Trilha foi uma experiência de muito crescimento, principalmente pela dinâmica de aluno pra aluno. Facilita demais o desenvolvimento de soft skills fundamentais para a vida profissional, e ainda fortaleceu meu próprio conhecimento, abrindo portas e me apresentando conceitos que eu nunca tinha visto.",
      en: "Trilha was an experience of huge growth, especially because of the student-to-student dynamic. It really helps develop soft skills that are fundamental for professional life, and it also strengthened my own knowledge, opening doors to concepts I had never seen before.",
    },
  },
  {
    person: SofiaAraujo,
    long: {
      pt: "O Trilha me mostrou que o aprendizado vai muito além da sala de aula. Me diverti com a movimentação de ideias e implementações até o código dar certo, e conheci pessoas tão admiráveis que me fazem sonhar muito mais alto. Foi um lugar acolhedor que me fez perder o medo de tirar dúvidas — o Trilha deixou o mundo tech mais divertido, familiar e humano.",
      en: "Trilha showed me that learning goes far beyond the classroom. I had so much fun with the back-and-forth of ideas and implementations until the code finally worked, and I met people so admirable they made me dream bigger. It was a welcoming place that took away my fear of asking questions — Trilha made the tech world feel more fun, familiar, and human.",
    },
    short: {
      pt: "O Trilha deixou o mundo tech mais divertido, familiar e humano.",
      en: "Trilha made the tech world feel more fun, familiar, and human.",
    },
  },
  {
    person: MikaelRodrigues,
    long: {
      pt: "O Trilha pra mim foi uma experiência muito gratificante. Aprendi conteúdos que eu nem imaginava ter contato logo no primeiro período, conheci pessoas incríveis sempre dispostas a ajudar e fiz boas amizades — uma família. Mas o que mais mudou foi a minha visão de onde eu poderia chegar: por ser do interior, eu tinha uma visão muito limitada, e o Trilha me fez acreditar que posso alcançar lugares que pareciam impossíveis.",
      en: "Trilha was a deeply rewarding experience. I learned things I never imagined touching in my first semester, met incredible people always ready to help, and made real friendships — a family. But what changed most was my sense of where I could go: I'm from a small town and had a very limited view of what was possible, and Trilha made me believe I can reach places that once felt impossible.",
    },
  },
];

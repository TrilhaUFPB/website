/* eslint-disable @next/next/no-img-element */
import { ArrowRight, ArrowUpRight, Code2, Users, Mic, Flag } from "lucide-react";
import "./ufpe.css";

export const metadata = { title: "Trilha UFPE — um novo começo", robots: { index: false, follow: false } };
const interest = "https://docs.google.com/forms/d/e/1FAIpQLSfSSc7eyBv93kfoZ1BChhYci63QXw8GlPsdupC64r_dEM96fw/viewform";
const experiences = [
  { icon: Code2, name: "Aulas práticas", title: "Aprender construindo.", text: "Python, web, dados e fundamentos de engenharia. Na UFPE, a proposta é aprender colocando a mão no código, com apoio de monitores.", image: "/assets/turmas/trilha2025.jpg", caption: "Uma das turmas do Trilha UFPB · 2025.1" },
  { icon: Mic, name: "Palestras", title: "Conhecer outros caminhos.", text: "Na UFPB, engenheiros, pesquisadores e fundadores compartilham suas trajetórias. É esse tipo de encontro que queremos levar para o CIn.", image: "/assets/gallery-web/assets-palestras-marcos-andre.webp", caption: "Marcos Candeia e André Costa · encontro na UFPB" },
  { icon: Users, name: "Mentoria", title: "Ter com quem contar.", text: "Trocar dúvidas, descobrir possibilidades e receber orientação de quem já passou pelo começo. A mentoria também faz parte da proposta na UFPE.", image: "/assets/turmas/trilha2024.jpg", caption: "A comunidade que começou tudo · UFPB, 2024.1" },
  { icon: Flag, name: "Projetos", title: "Tirar uma ideia do papel.", text: "Na UFPB, o semestre termina com equipes construindo projetos reais. Na UFPE, um hackathon será o momento de juntar o que a turma aprendeu.", image: "/assets/turmas/trilha2025-2.jpeg", caption: "Gente que aprende e constrói junto · UFPB, 2025.2" },
];

export default function UfpeTest() {
  return <div className="ufpe-mock" id="ufpe-inicio">
    <nav className="ufpe-nav" aria-label="Navegação principal">
      <a className="ufpe-brand" href="#ufpe-inicio"><img src="/assets/logo.svg" alt="" />trilha <span>UFPE</span></a>
      <div className="ufpe-nav-links"><a href="#ufpe-programa">O programa</a><a href="#ufpe-origem">Nossa origem</a><a href="#ufpe-turma">Primeira turma</a></div>
      <a className="ufpe-button ufpe-small" href={interest}>Tenho interesse <ArrowUpRight size={17}/></a>
    </nav>
    <main>
      <section className="ufpe-hero">
        <img className="ufpe-sticker ufpe-seal" src="/campus/stickers/selo-path-seekers-azul.png" alt="" />
        <img className="ufpe-sticker ufpe-flag" src="/campus/stickers/bandeira-trilha.png" alt="" />
        <span className="ufpe-eyebrow"><i/> INSCRIÇÕES EM BREVE · TURMA 2026.2</span>
        <h1>Seu começo em tecnologia.<br/><em>Em boa companhia.</em></h1>
        <p>Nossa primeira turma começa em breve no CIn da UFPE, com 15 vagas.<br className="ufpe-desktop"/> Programação, projetos e gente por perto para aprender construindo.</p>
        <div className="ufpe-actions"><a className="ufpe-button" href={interest}>Quero fazer parte <ArrowRight size={19}/></a><a className="ufpe-text-link" href="#ufpe-programa">Conheça o programa <ArrowRight size={17}/></a></div>
        <span className="ufpe-hero-note">Primeira turma · 2026.2 · 15 vagas · Gratuito</span>
        <div className="ufpe-photo-story">
          <figure className="ufpe-photo"><img src="/assets/turmas/trilha2026-1-horizontal.jpeg" alt="Turma 2026.1 do Trilha UFPB reunida no campus" fetchPriority="high"/><figcaption>TRILHA UFPB · TURMA 2026.1 <span>↓</span></figcaption></figure>
          <div className="ufpe-paper-note"><span>De estudantes<br/>para estudantes.</span><p>Aprender fica melhor<br/>em boa companhia.</p><svg viewBox="0 0 130 60" aria-hidden="true"><path d="M120 8 Q75 65 10 30 M10 30 L29 29 M10 30 L20 47"/></svg></div>
        </div>
      </section>
      <section className="ufpe-bridge" id="ufpe-origem"><div><span className="ufpe-eyebrow">DE ESTUDANTES PARA ESTUDANTES</span><h2>Um começo com apoio.<br/>Um caminho em comunidade.</h2></div><div><p>O Trilha nasceu em 2024, na UFPB, de uma pergunta simples: o que teria feito diferença no nosso começo na universidade?</p><p>Na UFPE, essa ideia ganha vida com aulas, projetos e trocas entre estudantes. Um espaço para tirar dúvidas, experimentar e descobrir caminhos com gente do seu lado.</p><a className="ufpe-text-link" href="https://www.trilhaufpb.com">Conheça a história do Trilha <ArrowUpRight size={17}/></a></div></section>
      <section className="ufpe-program" id="ufpe-programa"><div className="ufpe-section-heading"><span className="ufpe-eyebrow">O QUE ESTAMOS TRAZENDO</span><h2>Mais que um curso.<br/><em>Gente do seu lado.</em></h2><p>Conheça a experiência na UFPB e o que inspira<br className="ufpe-desktop"/> o primeiro capítulo do Trilha na UFPE.</p></div>
        <div className="ufpe-experiences">{experiences.map((item, index) => <article key={item.name}><figure><img src={item.image} alt={item.caption} loading="lazy"/><figcaption>{item.caption}</figcaption></figure><div className="ufpe-experience-copy"><span className="ufpe-eyebrow"><item.icon size={17}/> {item.name} <small>0{index+1}</small></span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
      </section>
      <section className="ufpe-cohorts" id="ufpe-turma">
        <span className="ufpe-eyebrow">NOSSAS TURMAS</span>
        <h2>Gente que aprende.<br/><em>Uma comunidade que cresce.</em></h2>
        <div className="ufpe-cohort-row">
          <h3 className="ufpe-row-label">Trilha UFPB <span>Turmas do programa</span></h3>
          <div className="ufpe-cohort-cards ufpe-past-cohorts">{[["2026.1","trilha2026-1-horizontal.jpeg"],["2025.2","trilha2025-2.jpeg"],["2025.1","trilha2025.jpg"],["2024.2","trilha2024-2.jpg"],["2024.1","trilha2024.jpg"]].map(([year,photo]) => <CohortCard key={year} year={year} title="Trilha UFPB" image={`/assets/turmas/${photo}`} href={`https://www.trilhaufpb.com/turmas/${year}`} action="Conheça a turma" label="UFPB" />)}</div>
        </div>
        <div className="ufpe-cohort-row">
          <h3 className="ufpe-row-label">Trilha UFPE <span>Inscrições em breve</span></h3>
          <div className="ufpe-cohort-cards ufpe-first-cohort"><CohortCard year="2026.2" title="Primeira Turma" image="https://trilhaufpe.com/campus/card-generico-bloco-e.png" href={interest} action="Tenho interesse" label="15 vagas" description="Começa em breve no CIn. Formulário de interesse disponível." />
            <a className="ufpe-handnote" href={interest}>
              <svg className="ufpe-handnote-arrow" viewBox="0 0 210 120" fill="none" aria-hidden="true"><path d="M198 17C166 92 95 108 17 58M17 58l10 29M17 58l33-3"/><path d="M191 16c-27 64-91 85-160 49" opacity=".3"/></svg>
              <span className="ufpe-handnote-copy"><span className="ufpe-handnote-title">Faça parte da<br/>primeira turma!</span><span className="ufpe-handnote-subtitle">Todo começo fica melhor com você.</span><span className="ufpe-handnote-link">Deixe seu interesse <ArrowUpRight size={17}/></span></span>
            </a>
          </div>
        </div>
      </section>
      <section className="ufpe-details"><div><span className="ufpe-eyebrow">QUEM ESTÁ CONSTRUINDO</span><h2>Feito por gente<br/>daqui.</h2><p>Eric Barreto, Mateus Ataíde e Antônio Robério: três alunos do CIn construindo esse novo capítulo.</p><div className="ufpe-people">{[["Eric Barreto","ericlbarreto"],["Mateus Ataíde","mateus-ataide"],["Antônio Robério","roberiof"]].map(([name,slug])=><a href={`https://www.linkedin.com/in/${slug}/`} key={slug}>{name}<ArrowUpRight size={17}/></a>)}</div></div><div><span className="ufpe-eyebrow">ANTES DO PRIMEIRO PASSO</span><h2>Ficou alguma dúvida?</h2>{[["Preciso saber programar?","A proposta é apoiar quem está começando. Os materiais abertos já permitem explorar os fundamentos antes da primeira turma."],["É só para estudantes da UFPE?","Não. Segundo a proposta atual do Trilha UFPE, o programa é aberto a estudantes de qualquer curso e não é restrito à UFPE."],["Quando e onde começa?","A primeira turma está prevista para 2026.2, no CIn da UFPE. Acompanhe o site oficial para as datas e os detalhes do processo seletivo."],["Posso começar a estudar agora?","Sim! Os materiais do Trilha são abertos e gratuitos. Você pode explorar Python, dados, backend, banco de dados e frontend."]].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}<a className="ufpe-text-link" href="https://trilhaufpe.com/materiais">Explorar os materiais <ArrowUpRight size={17}/></a></div></section>
    </main>
    <footer className="ufpe-footer"><a className="ufpe-brand" href="#ufpe-inicio"><img src="/assets/logo.svg" alt=""/>trilha <span>UFPE</span></a><p>Um novo lugar.<br/><b>O mesmo jeito de caminhar junto.</b></p><a href="https://www.otrilha.com">Conheça a rede Trilha <ArrowUpRight size={17}/></a><small>Proposta de site · Trilha UFPE</small></footer>
  </div>;
}

function CohortCard({ year, title, image, href, action, label, description }: { year: string; title: string; image: string; href: string; action: string; label: string; description?: string }) {
  return <a className="ufpe-original-card" href={href}>
    <div className="ufpe-original-image"><img src={image} alt={`${title} · ${year}`} loading="lazy"/><span className="ufpe-card-cta">{action}</span><div className="ufpe-card-overlay"><span>{year}</span><span>{label}</span></div></div>
    <h3><i>{year}</i> — {title}</h3>{description && <p>{description}</p>}
  </a>;
}

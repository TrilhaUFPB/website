import { ufpbUrl } from "@/lib/sites";
import CommunityFooter from "./CommunityFooter";
import ArrowIcon from "./ArrowIcon";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
export default function History() {
  return (
    <div className="trilha-site">
      <main className="history-page story-redesign story-journey">
        <nav className="history-nav">
          <Link href="/" aria-label="Trilha início">
            <img
              src="/community/montanha-oficial.svg"
              alt="Trilha"
              width="65"
            />
          </Link>
          <Link className="button" href="/#journal-title">
            <ArrowIcon direction="left" /> Voltar ao Trilha
          </Link>
        </nav>
        <header className="journey-hero">
          <img className="journey-cloud" src="/community/cloud-pixel.png" alt="" />
          <span className="section-label">NOSSA HISTÓRIA</span>
          <h1>
            Toda história começa
            <br />
            com um encontro.
          </h1>
          <p>
            O Trilha nasceu em João Pessoa, de estudantes que queriam ajudar
            outros estudantes a encontrar seu caminho.
          </p>
          <nav className="story-jumps" aria-label="Capítulos da história"><a href="#primeira-aula">01 · O começo</a><a href="#comunidade">02 · A comunidade</a><a href="#hoje">03 · Hoje</a></nav>
        </header>
        <div className="journey-photo"><img src="/community/aula.jpg" alt="A sala onde estudantes começaram a aprender juntos" /><span>João Pessoa · 19.07.2024</span></div>
        <section className="history-chapter" id="primeira-aula">
          <span className="section-label">19 DE JULHO DE 2024</span>
          <h2>A primeira aula.</h2>
          <p>
            Antes de existir um programa, existia uma relação de mentoria.
            Felipe Duarte ajudava dois estudantes, entre eles Luigi Schmitt. Uma
            visita de Luigi e seus colegas ao laboratório TRIL, no Centro de
            Informática da UFPB, aproximou quem estava chegando de quem já tinha
            experiências para compartilhar.
          </p>
          <p>
            Tiago Trindade, Felipe Duarte, Nicholas Rodrigues, Guilherme Huther
            e Ícaro Mori se juntaram para organizar aulas e mentorias. Cerca de
            uma semana depois da ideia, aconteceu a primeira aula.
          </p>

          <p>
            O começo foi simples: uma sala pequena, puffes, cadeiras e
            estudantes reunidos em torno de dúvidas e descobertas. Luigi sugeriu
            o nome Trilha, que carregava um eco do laboratório onde tudo
            começou.
          </p>
        </section>
<section className="cohort-history" id="comunidade"><span className="section-label">SEMESTRE A SEMESTRE</span><h2>As turmas que construíram o Trilha.</h2><p>A primeira experiência virou um programa que se renova a cada semestre. As aulas, as mentorias e os projetos ganharam novas formas com cada grupo.</p><article className="history-cohort"><img src="/community/turmas/trilha2024.jpg" alt="Primeira Turma do Trilha" loading="lazy"/><div><span className="section-label">2024.1</span><h3>Primeira Turma</h3><p>Onde tudo começou — Python, web, e o primeiro hackathon.</p><Link href={`${ufpbUrl}/turmas/2024.1`}>Conheça a turma <ArrowIcon /></Link></div></article><article className="history-cohort"><img src="/community/turmas/trilha2024-2.jpg" alt="Segunda Turma do Trilha" loading="lazy"/><div><span className="section-label">2024.2</span><h3>Segunda Turma</h3><p>Currículo expandido, primeira leva de palestrantes externos.</p><Link href={`${ufpbUrl}/turmas/2024.2`}>Conheça a turma <ArrowIcon /></Link></div></article><article className="history-cohort"><img src="/community/turmas/trilha2025.jpg" alt="Terceira Turma do Trilha" loading="lazy"/><div><span className="section-label">2025.1</span><h3>Terceira Turma</h3><p>Mentoria estruturada e nova frente de dados.</p><Link href={`${ufpbUrl}/turmas/2025.1`}>Conheça a turma <ArrowIcon /></Link></div></article><article className="history-cohort"><img src="/community/turmas/trilha2025-2.jpeg" alt="Quarta Turma do Trilha" loading="lazy"/><div><span className="section-label">2025.2</span><h3>Quarta Turma</h3><p>Mais turmas, mais projetos, comunidade consolidada.</p><Link href={`${ufpbUrl}/turmas/2025.2`}>Conheça a turma <ArrowIcon /></Link></div></article></section>        <section className="history-chapter" id="hoje">
          <span className="section-label">HOJE</span>
          <h2>Um Trilha. Diferentes iniciativas.</h2>
          <p>
            O Trilha UFPB reúne formação prática, projetos e mentoria. O
            Momento, criado de forma independente e incorporado ao Trilha em
            2025, conecta estudantes de computação a profissionais e
            pesquisadores.
          </p>
          <p>
            O Hack The Path amplia os encontros por meio de um hackathon aberto.
            E a Trilha UFPE está chegando, levando essa vontade de construir
            junto a um novo lugar.
          </p>
          <figure>
            <img
              src="/community/turma.jpg"
              alt="Pessoas da comunidade Trilha reunidas"
              loading="lazy"
              width="1280"
              height="960"
            />
            <figcaption>
              Parte da comunidade que faz essa história continuar.
            </figcaption>
          </figure>
          <Link className="button" href="/#iniciativas1">
            Conheça as iniciativas <ArrowIcon direction="up-right" />
          </Link>
        </section>
      </main>
      <div className="design"><CommunityFooter /></div>
    </div>
  );
}

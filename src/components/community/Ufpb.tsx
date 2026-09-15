import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
export default function Ufpb() {
  return (
    <div className="trilha-site">
      <section className="design base neutral-controls hero-bold">
        <nav className="nav">
          <Link className="brand" href="/" aria-label="Trilha início">
            <img src="/community/montanha-oficial.svg" alt="Trilha" />
          </Link>
          <div className="navlinks">
            <Link href="#programa3">Aprender</Link>
            <Link href="#pessoas3">Comunidade</Link>
            <Link href="/materiais" target="_blank" rel="noopener">
              Materiais ↗
            </Link>
          </div>
          <Link className="navcta" href="#programa3">
            Conhecer o programa
          </Link>
        </nav>
        <main>
          <Link className="campus-materials-link" href="/aulas">
            Acompanhe as aulas ↗
          </Link>
          <div className="caderno-hero">
            <div className="eyebrow">
              TRILHA UFPB · DE ESTUDANTES PARA ESTUDANTES
            </div>
            <h1>
              Trilha UFPB.
              <br />
              <em>Com gente do lado.</em>
            </h1>
            <p className="intro">
              Aprenda a construir. Encontre quem te apoia.
              <br />
              Descubra caminhos que você ainda nem imaginou.
            </p>
            <Link className="button" href="#programa3">
              Conheça o programa <span>↓</span>
            </Link>
            <span className="explore-cue">UM NOVO CAMINHO COMEÇA AQUI ↓</span>
          </div>
          <div className="plain-intro">
            <span className="section-label">O TRILHA, EM POUCAS PALAVRAS</span>
            <p>
              Um projeto de extensão da UFPB feito por estudantes para quem está
              começando.{" "}
              <strong>Você não precisa chegar sabendo programar.</strong> Só
              precisa querer aprender.
            </p>
          </div>
          <section className="program" id="programa3">
            <div className="section-label">QUATRO JEITOS DE CRESCER</div>
            <div className="section-heading">
              <h2>
                Menos “por onde começo?”.
                <br />
                Mais “olha o que eu fiz”.
              </h2>
              <p>
                Aberto a qualquer curso e universidade. As aulas acontecem no
                Centro de Informática da UFPB, em João Pessoa.
              </p>
            </div>
            <div className="pillars">
              <article>
                <span>01</span>
                <h3>Aprenda fazendo.</h3>
                <p>Aprenda programação construindo projetos de verdade.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Tenha com quem contar.</h3>
                <p>Mentoria individual com quem já passou por esse começo.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Conheça novos caminhos.</h3>
                <p>
                  Conversas com pessoas que ampliam o que você acha possível.
                </p>
              </article>
              <article>
                <span>04</span>
                <h3>Construa em equipe.</h3>
                <p>
                  Um hackathon para transformar o que você aprendeu em algo seu.
                </p>
              </article>
            </div>
          </section>
          <section className="people" id="pessoas3">
            <img src="/community/turma.jpg" alt="Turma do Trilha reunida" />
            <div>
              <span className="section-label">
                DE ESTUDANTES PARA ESTUDANTES
              </span>
              <h2>
                Gente que chegou para aprender.
                <br />E voltou para ajudar.
              </h2>
              <p>
                A comunidade não termina com a turma. Quem passa pelo Trilha
                leva conexões e pode voltar para construir o próximo começo.
              </p>
              <strong>17 ex-alunos voltaram para a organização.</strong>
            </div>
          </section>
          <section className="materials-callout">
            <div>
              <span className="section-label">JÁ DÁ PARA COMEÇAR</span>
              <h2>O conhecimento é aberto.</h2>
              <p>
                Python, dados, frontend, backend e mais.
                <br />
                Os materiais do Trilha estão disponíveis para todo mundo.
              </p>
            </div>
            <Link
              className="button"
              href="/materiais"
              target="_blank"
              rel="noopener"
            >
              Explorar materiais ↗
            </Link>
          </section>
        </main>
        <footer>
          trilha{" "}
          <span>João Pessoa · Paraíba · De estudantes para estudantes.</span>
        </footer>
      </section>
    </div>
  );
}

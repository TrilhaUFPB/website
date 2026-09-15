import { ufpbUrl } from "@/lib/sites";
import ArrowIcon from "./ArrowIcon";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
export default function History() {
  return (
    <div className="trilha-site">
      <main className="history-page">
        <nav className="history-nav">
          <Link href="/" aria-label="Trilha início">
            <img
              src="/community/montanha-oficial.svg"
              alt="Trilha"
              width="65"
            />
          </Link>
          <Link href="/#journal-title">
            <ArrowIcon direction="left" /> Voltar ao Trilha
          </Link>
        </nav>
        <header>
          <span className="section-label">NOSSA HISTÓRIA</span>
          <h1>
            Um começo compartilhado.
            <br />
            Muitos caminhos pela frente.
          </h1>
          <p>
            O Trilha nasceu em João Pessoa, de estudantes que queriam ajudar
            outros estudantes a encontrar seu caminho.
          </p>
        </header>
        <section className="history-chapter">
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
          <figure>
            <img
              src="/community/aula.jpg"
              alt="Estudantes trabalhando juntos em uma sala do Trilha"
              width="1600"
              height="1200"
            />
            <figcaption>Um registro dos encontros do Trilha UFPB.</figcaption>
          </figure>
          <p>
            O começo foi simples: uma sala pequena, puffes, cadeiras e
            estudantes reunidos em torno de dúvidas e descobertas. Luigi sugeriu
            o nome Trilha, que carregava um eco do laboratório onde tudo
            começou.
          </p>
        </section>
        <section className="history-chapter">
          <span className="section-label">QUEM APRENDE TAMBÉM CONSTRÓI</span>
          <h2>Uma comunidade que se renova.</h2>
          <p>
            Depois da primeira turma, estudantes passaram a voltar para ajudar
            na organização. A experiência de quem aprendia passou a fazer parte
            de como o Trilha recebia as próximas pessoas.
          </p>
          <p>
            O projeto ganhou divulgação, palestras, novas turmas e uma
            organização mais estruturada. Compartilhar conhecimento continuou
            sendo o ponto de partida.
          </p>
        </section>
        <section className="history-chapter">
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
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-identity">
            <Link href="/#inicio" aria-label="Trilha início">
              <img
                src="/community/montanha-oficial.svg"
                alt="Trilha"
                width="90"
                height="65"
              />
            </Link>
            <p>
              De estudantes
              <br />
              para estudantes.
            </p>
          </div>
          <nav aria-label="Navegação do rodapé">
            <span className="section-label">EXPLORE</span>
            <Link href="/#sobre1">Sobre o Trilha</Link>
            <Link href="/#iniciativas1">Nossas iniciativas</Link>
            <Link href="/#impact-title">Nosso impacto</Link>
            <Link href="/#journal-title">Nossa história</Link>
          </nav>
          <nav aria-label="Iniciativas">
            <span className="section-label">INICIATIVAS</span>
            <Link href={ufpbUrl}>Trilha UFPB</Link>
            <Link href="https://momento.sh">
              Momento <ArrowIcon direction="up-right" />
            </Link>
            <Link href="https://hackthepath.com.br">
              Hack The Path <ArrowIcon direction="up-right" />
            </Link>
            <Link href="/ufpe/">Trilha UFPE</Link>
            <Link href={`${ufpbUrl}/materiais`} target="_blank" rel="noopener">
              Materiais abertos <ArrowIcon direction="up-right" />
            </Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>Trilha · Desde 2024</span>
          <span>Um começo. Muitos caminhos.</span>
          <Link href="/#inicio">
            Voltar ao topo <ArrowIcon direction="up" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

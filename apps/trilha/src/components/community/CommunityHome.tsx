import CommunityTimeline from "./CommunityTimeline";
import { ButtonLink } from "@trilha/ui";
import HeroLandscape from "./HeroLandscape";
import CommunityFooter from "./CommunityFooter";
import { ufpbUrl } from "@/lib/sites";
import ArrowIcon from "./ArrowIcon";
import BackgroundStudy from "./BackgroundStudy";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function CommunityHome() {
  return (
    <div className="trilha-site">
      <BackgroundStudy />
      <section
        id="inicio"
        className="design base neutral-controls hero-bold content-1"
      >
        <nav className="nav">
          <Link className="brand" href="/" aria-label="Trilha início">
            <img src="/community/montanha-oficial.svg" alt="Trilha" />
          </Link>
          <div className="navlinks">
            <Link href="#iniciativas1">Iniciativas</Link>
            <Link href="#journal-title">História</Link>
            <Link href="#impact-title">Impacto</Link>
            <Link href="#quem-somos">Quem somos</Link>
          </div>
          <Link className="navcta" href="#iniciativas1">
            Encontre seu caminho
          </Link>
        </nav>
        <main>
          <div className="caderno-hero">
            <HeroLandscape />
            <h1>
              Seu primeiro passo.
              <br />
              <em>Com gente do lado.</em>
            </h1>
            <p className="intro">
              Aprenda a construir. Encontre quem te apoia.
              <br />
              Descubra caminhos que você ainda nem imaginou.
            </p>
            <ButtonLink size="lg" href="#iniciativas1">
              Explore as iniciativas <ArrowIcon direction="down" />
            </ButtonLink>
            <span className="explore-cue">
              UM NOVO CAMINHO COMEÇA AQUI <ArrowIcon direction="down" />
            </span>
          </div>
          <section className="umbrella-intro" id="sobre1">
            <span className="section-label">UM TRILHA. MUITOS CAMINHOS.</span>
            <h2>
              Ninguém precisa descobrir
              <br />
              tudo sozinho.
            </h2>
            <p>
              Somos uma comunidade de estudantes que cria oportunidades para
              aprender, compartilhar experiências e construir em conjunto. Cada
              iniciativa abre uma porta. O que nos une é quem caminha ao lado.
            </p>
          </section>
          <section className="initiatives-wrap" id="iniciativas1">
            <div className="initiative-heading">
              <h2>Encontre seu próximo começo.</h2>
            </div>
            <div className="initiative-layout">
              <Link href={ufpbUrl} className="initiative ufpb">
                <div className="initiative-art campus-art">
                  <div className="campus-lockup">
                    <img
                      src="/community/montanha-oficial.svg"
                      alt="Trilha"
                      className="campus-trilha"
                    />
                  </div>
                  <div className="university-badge ufpb-badge">
                    <img
                      src="/community/ufpb-white.png"
                      alt="Universidade Federal da Paraíba"
                    />
                  </div>
                </div>
                <div className="initiative-copy">
                  <span className="initiative-name">Trilha UFPB</span>
                  <span className="initiative-scope">Estadual</span>
                  <h3>Um começo acompanhado.</h3>
                  <p>
                    Programação na prática, mentoria e projetos em uma
                    comunidade de estudantes.
                  </p>
                </div>
              </Link>
              <Link href="https://momento.sh" className="initiative momento">
                <div className="initiative-art" aria-label="Momento">
                  <img
                    className="momento-wordmark"
                    src="/community/momento-symbol.svg"
                    alt="Momento"
                  />
                </div>
                <div className="initiative-copy">
                  <span className="initiative-name">Momento</span>
                  <span className="initiative-scope">Nacional</span>
                  <h3>Uma conversa abre caminhos.</h3>
                  <p>
                    Estudantes de computação conectados a profissionais e
                    pesquisadores que ajudam a enxergar os próximos passos.
                  </p>
                </div>
              </Link>
              <Link href="https://trilhaufpe.com" className="initiative ufpe">
                <div className="initiative-art campus-art">
                  <div className="campus-lockup">
                    <img
                      src="/community/montanha-oficial.svg"
                      alt="Trilha"
                      className="campus-trilha"
                    />
                  </div>
                  <div className="university-badge ufpe-badge">
                    <img
                      src="/community/ufpe.png"
                      alt="Universidade Federal de Pernambuco"
                    />
                  </div>
                </div>
                <div className="initiative-copy">
                  <span className="initiative-name">Trilha UFPE</span>
                  <span className="initiative-scope">Estadual</span>
                  <h3>Mais um lugar para começar.</h3>
                  <p>
                    Uma comunidade de estudantes para aprender, compartilhar e
                    construir caminhos juntos.
                  </p>
                </div>
              </Link>
              <div className="hackathon-heading">
                <h2>Se prepare para sua próxima aventura.</h2>
              </div>
              <Link
                href="https://hackthepath.com.br"
                className="initiative htp"
              >
                <div className="initiative-art" aria-label="Hack The Path">
                  <img
                    className="htp-art"
                    src="/community/htp-art.svg"
                    alt=""
                  />
                  <img
                    className="htp-art htp-art-hover"
                    src="/community/htp-art.svg"
                    alt=""
                    aria-hidden="true"
                  />
                  <img
                    className="htp-wordmark"
                    src="/community/htp-logo.png"
                    alt="Hack The Path"
                  />
                </div>
                <div className="initiative-copy">
                  <span className="initiative-name">Hack The Path</span>
                  <span className="initiative-scope">
                    Hackathon · Fevereiro de 2027
                  </span>
                  <h3>O próximo grande desafio começa no Nordeste.</h3>
                  <p>
                    Estamos construindo o maior hackathon do Nordeste. Reúna sua
                    equipe, coloque suas habilidades à prova e faça parte dessa
                    primeira edição.
                  </p>
                </div>
              </Link>
            </div>
          </section>
          <CommunityTimeline />
          <section className="impact-section" aria-labelledby="impact-title">
            <div className="impact-copy">
              <span className="section-label">DA PARAÍBA PARA MAIS LONGE</span>
              <h2 id="impact-title">
                Um começo aqui.
                <br />
                Conexões pelo mundo.
              </h2>
              <p>
                O Trilha aproxima quem está começando de quem já descobriu
                outros caminhos. Pelo Momento, essa troca atravessa fronteiras.
              </p>
            </div>
            <div className="globe-stage">
              <canvas
                id="impact-globe"
                aria-label="Globo com conexões da Paraíba a San Francisco, Boston, Minas Gerais, Rio Grande do Norte, Brasília, Pernambuco, Alemanha e Espanha."
              ></canvas>
              <div className="impact-stats">
                <div>
                  <strong>100+</strong>
                  <span>mentorados pelo Momento</span>
                </div>
                <div>
                  <strong>40+</strong>
                  <span>mentores do Momento</span>
                </div>
                <div>
                  <strong>87</strong>
                  <span>alunos do Trilha</span>
                </div>
                <div>
                  <strong>20</strong>
                  <span>organizadores ativos registrados no site</span>
                </div>
              </div>
            </div>
          </section>
          <section className="community-team" id="quem-somos" aria-labelledby="team-title">
            <div className="community-team-copy">
              <span className="section-label">QUEM SOMOS</span>
              <h2 id="team-title">A gente passou por aqui.<br />E escolheu continuar.</h2>
              <p>Somos estudantes e recém-graduados que viveram o Trilha durante a graduação. Encontramos aqui pessoas, oportunidades e caminhos que queremos abrir para quem vem depois.</p>
              <p>Agora, construímos juntos algo maior: novas possibilidades para futuros estudantes e um Brasil cada vez mais presente no mundo da tecnologia.</p>
              <ButtonLink href="/equipe/">Conheça toda a equipe <ArrowIcon direction="up-right" /></ButtonLink>
            </div>
            <figure className="community-team-photo">
              <img src="/community/turma.jpg" alt="Integrantes da comunidade Trilha reunidos" loading="lazy" width="1280" height="960" />
            </figure>
          </section>
        </main>
        <section className="landing-invitation">
          <div className="footer-invitation">
            <span className="section-label">O QUE MOVE A GENTE</span>
            <h2>
              O que você aprende
              <br />
              pode abrir caminho para alguém.
            </h2>
            <p>
              Compartilhar uma descoberta. Ajudar em um projeto. Estar por
              perto.
              <br />É assim que uma comunidade continua crescendo.
            </p>
            <ButtonLink size="lg" href="/#iniciativas1">
              Encontre seu caminho{" "}
            </ButtonLink>
          </div>
        </section>
        <CommunityFooter />
      </section>
    </div>
  );
}

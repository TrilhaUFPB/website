"use client";
import CommunityFooter from "./CommunityFooter";
import { ufpbUrl } from "@/lib/sites";
import ArrowIcon from "./ArrowIcon";
import BackgroundStudy from "./BackgroundStudy";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface GoatSpot {
  x: number;
  y: number;
  mirrored: boolean;
}

const GOAT_SPOTS: Array<Omit<GoatSpot, "mirrored">> = [
  { x: 230, y: 370 },  // Topo da montanha esquerda
  { x: 365, y: 366 },  // Cume da segunda montanha
  { x: 510, y: 343 },  // Topo montanha centro-esquerda
  { x: 695, y: 371 },  // Pico central da montanha
  { x: 825, y: 339 },  // Topo montanha centro-direita
  { x: 900, y: 360 },  // Cume montanha direita
  { x: 1055, y: 406 }, // Pico mais alto da cordilheira
  { x: 1150, y: 376 }, // Cume extremo direito
  { x: 600, y: 280 },  // Crista alta do relevo
  { x: 980, y: 290 },  // Encosta alta do relevo
];

/* eslint-disable @next/next/no-img-element */
export default function CommunityHome() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [goatSpot, setGoatSpot] = useState<GoatSpot | null>(null);
  const [goatCoords, setGoatCoords] = useState<{
    left: number;
    bottom: number;
    width: number;
    height: number;
  } | null>(null);
  const [isJumping, setIsJumping] = useState(false);

  // Sorteia a posicao inicial e orientacao
  useEffect(() => {
    const spot = GOAT_SPOTS[Math.floor(Math.random() * GOAT_SPOTS.length)];
    const mirrored = Math.random() > 0.5;
    setGoatSpot({ ...spot, mirrored });
  }, []);

  // Mantem a cabra perfeitamente ancorada no relevo mesmo com zoom (Ctrl + / Ctrl -) e redimensionamento
  useEffect(() => {
    if (!goatSpot || !heroRef.current) return;

    const updateCoords = () => {
      if (!heroRef.current || !goatSpot) return;
      const rect = heroRef.current.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      if (!W || !H) return;

      const S = Math.max(W / 1536, H / 1024);
      const left = W / 2 + (goatSpot.x - 768) * S;
      const bottom = goatSpot.y * S;
      const width = 43 * S;
      const height = 31 * S;

      setGoatCoords({
        left: Math.round(left),
        bottom: Math.round(bottom),
        width: Math.round(width),
        height: Math.round(height),
      });
    };

    updateCoords();

    const observer = new ResizeObserver(updateCoords);
    observer.observe(heroRef.current);
    window.addEventListener("resize", updateCoords);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateCoords);
    };
  }, [goatSpot]);

  const handleGoatJump = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (isJumping) return;
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 650);
  };

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
          <div className="caderno-hero" ref={heroRef}>
            <div className="hero-landscape-stage" aria-hidden="true">
              <img
                src="/community/landscape/fundo-landscape.png"
                alt=""
                className="hero-layer hero-fundo"
              />

              <div className="hero-clouds-container layer-distante">
                <div className="hero-clouds-track drift-slow">
                  <img
                    src="/community/cloud-pixel-2.png"
                    alt=""
                    className="cloud-tile"
                  />
                  <img
                    src="/community/cloud-pixel-2.png"
                    alt=""
                    className="cloud-tile"
                  />
                </div>
              </div>

              <div className="hero-clouds-container layer-proxima">
                <div className="hero-clouds-track drift-fast">
                  <img
                    src="/community/cloud-pixel.png"
                    alt=""
                    className="cloud-tile"
                  />
                  <img
                    src="/community/cloud-pixel.png"
                    alt=""
                    className="cloud-tile"
                  />
                </div>
              </div>

              <img
                src="/community/landscape/montanhas-fundo-landscape.png"
                alt=""
                className="hero-layer hero-montanhas"
              />

              <img
                src="/community/landscape/grama-landscape.png"
                alt=""
                className="hero-layer hero-grama"
              />
            </div>

            {/* Cabra interativa com clique prioritário e posição nos topos das montanhas */}
            {goatCoords && goatSpot && (
              <div
                className="hero-goat-positioner"
                style={{
                  left: `${goatCoords.left}px`,
                  bottom: `${goatCoords.bottom}px`,
                  width: `${goatCoords.width}px`,
                  height: `${goatCoords.height}px`,
                }}
                onClick={handleGoatJump}
                onPointerDown={handleGoatJump}
                role="button"
                tabIndex={0}
                aria-label="Cabra do Trilha - clique para dar um mortal 360"
                title="Bééé! 🐐 Clique para ela dar um salto mortal 360!"
              >
                <div
                  className={`hero-goat-animator ${isJumping ? "jumping" : ""}`}
                >
                  <img
                    src="/community/landscape/cabra.png"
                    alt=""
                    className={`hero-goat-sprite ${
                      goatSpot.mirrored ? "is-mirrored" : ""
                    }`}
                  />
                </div>
              </div>
            )}

            <div className="caderno-hero-content">
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
              <Link className="button" href="#iniciativas1">
                Explore as iniciativas <ArrowIcon direction="down" />
              </Link>
            </div>
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
              <Link href="/ufpe/" className="initiative ufpe">
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
          <section
            className="community-journal"
            aria-labelledby="journal-title"
          >
            <header>
              <span className="section-label">
                DE ESTUDANTES PARA ESTUDANTES
              </span>
              <h2 id="journal-title">
                Uma história feita
                <br />
                de encontros.
              </h2>
              <p>
                Uma sala, algumas dúvidas e a vontade de ajudar.
                <br />
                Foi assim que o Trilha começou a ganhar forma.
              </p>
            </header>
            <figure className="journal-class">
              <img
                src="/community/aula.jpg"
                width="1600"
                height="1200"
                loading="lazy"
                alt="Estudantes do Trilha aprendendo juntos com notebooks e um quadro"
              />
            </figure>
            <div className="journal-origin">
              <span className="journal-date">19.07.2024</span>
              <h3>
                A primeira aula.
                <br />O começo de muita coisa.
              </h3>
              <p>
                Em João Pessoa, estudantes se reuniram para compartilhar o que
                sabiam com quem estava chegando. O que começou em uma sala
                pequena abriu espaço para novos encontros, mentorias e
                iniciativas.
              </p>
            </div>
            <div className="journal-return">
              <span className="journal-date journal-today">Hoje</span>
              <h3>
                Um começo.
                <br />
                Muitos caminhos.
              </h3>
              <p>
                Da formação no Trilha UFPB às mentorias do Momento, a comunidade
                ganhou novas formas de compartilhar conhecimento. O Hack The
                Path abre espaço para encontros e projetos, e a Trilha UFPE
                prepara um novo começo.
              </p>
              <Link className="button" href="/historia/">
                Saiba mais <ArrowIcon direction="up-right" />
              </Link>
            </div>
            <figure className="journal-people">
              <img
                src="/community/turma.jpg"
                width="1280"
                height="960"
                loading="lazy"
                alt="Integrantes da comunidade Trilha reunidos em um encontro"
              />
            </figure>
          </section>
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
                aria-label="Globo com conexões da Paraíba a San Francisco, Boston, Minas Gerais, Rio Grande do Norte, Brasília, Pernambuco e à futura Trilha UFPE."
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
          <section
            className="team-section"
            id="quem-somos"
            aria-labelledby="team-title"
          >
            <header>
              <div>
                <span className="section-label">QUEM SOMOS</span>
                <h2 id="team-title">Quem caminha com você.</h2>
              </div>
              <p>
                Gente que começou aprendendo junto e hoje abre espaço para quem
                vem depois. Conheça algumas das pessoas à frente das nossas
                iniciativas.
              </p>
            </header>
            <div className="team-grid leadership-grid">
              <article className="person" id="pessoa-Clara">
                <img
                  src="/community/pessoas/2024.1/clara.png"
                  alt="Maria Clara Dantas"
                  loading="lazy"
                  width="400"
                  height="480"
                />
                <h3>Maria Clara Dantas</h3>
                <p>Presidente · Trilha</p>
              </article>
              <article className="person" id="pessoa-NicoleCosta">
                <img
                  src="/community/pessoas/2025.1/nicole.jpg"
                  alt="Nicole Costa e Silva"
                  loading="lazy"
                  width="400"
                  height="480"
                />
                <h3>Nicole Costa e Silva</h3>
                <p>Líder · Momento</p>
              </article>
              <article className="person" id="pessoa-MariaLuisaQuintela">
                <img
                  src="/community/pessoas/2025.1/quintela.jpg"
                  alt="Maria Luisa Moreira Quintela"
                  loading="lazy"
                  width="400"
                  height="480"
                />
                <h3>Malu Quintela</h3>
                <p>Líder · Hack The Path</p>
              </article>
              <article className="person" id="pessoa-Luigi">
                <img
                  src="/community/pessoas/2024.1/luigi.png"
                  alt="Luigi Schmitt"
                  loading="lazy"
                  width="400"
                  height="480"
                />
                <h3>Luigi Schmitt</h3>
                <p>Líder · Hack The Path</p>
              </article>
              <article className="person" id="pessoa-Ralf">
                <img
                  src="/community/pessoas/ralf.jpeg"
                  alt="Ralf Ferreira"
                  loading="lazy"
                  width="800"
                  height="800"
                />
                <h3>
                  <Link
                    href="https://www.linkedin.com/in/ralfferreira/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ralf Ferreira no LinkedIn"
                  >
                    Ralf Ferreira
                  </Link>
                </h3>
                <p>Líder · Hack The Path</p>
              </article>
            </div>
            <Link className="button" href="/equipe/">
              Conheça toda a equipe <ArrowIcon direction="up-right" />
            </Link>
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
            <Link className="button" href="/#iniciativas1">
              Encontre seu caminho{" "}
            </Link>
          </div>
        </section>
        <CommunityFooter />
      </section>
    </div>
  );
}

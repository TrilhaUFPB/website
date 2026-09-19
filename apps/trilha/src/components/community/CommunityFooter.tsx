import Link from "next/link";
import { ufpbUrl } from "@/lib/sites";
/* eslint-disable @next/next/no-img-element */
export default function CommunityFooter() { return (
        <footer id="footer" className="site-footer landscape-footer">

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
              <Link href="/equipe/">Quem somos</Link>
            </nav>
            <nav aria-label="Iniciativas">
              <span className="section-label">INICIATIVAS</span>
              <Link href={ufpbUrl}>Trilha UFPB</Link>
              <Link href="https://momento.sh">Momento</Link>
              <Link href="https://hackthepath.com.br">Hack The Path</Link>
              <Link href="/ufpe/">Trilha UFPE</Link>
              <Link href={`${ufpbUrl}/materiais`} target="_blank" rel="noopener">
                Materiais abertos
              </Link>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>Trilha · Desde 2024</span>
            <span>Um começo. Muitos caminhos.</span>
            <Link href="/#inicio">Voltar ao topo</Link>
          </div>
          <img
            className="footer-landscape-image"
            src="/community/landscape.png"
            alt=""
            loading="lazy"
          />
        </footer>
); }

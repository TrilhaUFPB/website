"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";

export type HeroTime = "day" | "sunset" | "night";

export function timeOfDay(hour: number): HeroTime {
  return hour >= 6 && hour < 16
    ? "day"
    : hour >= 16 && hour < 19
    ? "sunset"
    : "night";
}

// Spots onde a cabra pode nascer:
// - Picos e cumes das montanhas
// - Áreas de terra, vegetação e grama
const GOAT_SPOTS = [
  // --- MONTANHAS ---
  { x: 100, y: 408 },  // Pico extrema esquerda
  { x: 280, y: 373 },  // Cume montanha esquerda
  { x: 420, y: 350 },  // Topo montanha centro-esquerda
  { x: 900, y: 373 },  // Cume montanha direita
  { x: 1060, y: 425 }, // Pico mais alto da cordilheira
  { x: 1220, y: 360 }, // Cume montanha direita
  { x: 1300, y: 372 }, // Pico extremo direito

  // --- TERRA / PLANTA / GRAMA ---
  { x: 160, y: 160 },  // Colina de grama da esquerda
  { x: 260, y: 220 },  // Encosta verde alta esquerda
  { x: 380, y: 140 },  // Perto das pedras/vegetação esquerda
  { x: 490, y: 240 },  // Bosque de pinheiros / grama média
  { x: 640, y: 270 },  // Margem verde próxima à água
  { x: 880, y: 260 },  // Colina verde central-direita
  { x: 1020, y: 210 }, // Encosta com pinheiros da direita
  { x: 1180, y: 170 }, // Grama ao lado das pedras da direita
  { x: 1340, y: 130 }, // Planície verde inferior direita
];

const GOAT_BOTTOM_OFFSET = 9;

export default function HeroLandscape() {
  const scene = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<HeroTime>("day");

  const [goatSpot] = useState(() => {
    const spot = GOAT_SPOTS[Math.floor(Math.random() * GOAT_SPOTS.length)];
    const mirrored = Math.random() > 0.5;
    return { ...spot, mirrored };
  });

  const [goatCoords, setGoatCoords] = useState<{
    left: number;
    bottom: number;
    width: number;
    height: number;
  } | null>(null);

  const [isJumping, setIsJumping] = useState(false);
  const jumpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (jumpTimer.current) clearTimeout(jumpTimer.current); }, []);

  useEffect(() => {
    const hero = scene.current?.parentElement;
    if (!hero) return;

    const updateTime = () => {
      const preview = new URLSearchParams(location.search).get("heroTime");
      const next =
        preview === "day" || preview === "sunset" || preview === "night"
          ? preview
          : timeOfDay(new Date().getHours());
      setTime(next);
      hero.dataset.time = next;
      hero.closest(".design")?.setAttribute("data-hero-time", next);
    };
    updateTime();
    const timer = window.setInterval(updateTime, 60000);

    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const draw = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const progress = reduced.matches
        ? 0
        : Math.max(0, Math.min(-rect.top, rect.height));
      scene.current?.style.setProperty("--far-shift", `${progress * 0.18}px`);
      scene.current?.style.setProperty("--near-shift", `${progress * 0.06}px`);
      scene.current?.style.setProperty(
        "--cloud-shift",
        `${progress * 0.27}px`
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    addEventListener("scroll", onScroll, { passive: true });
    reduced.addEventListener("change", draw);
    draw();

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      reduced.removeEventListener("change", draw);
    };
  }, []);

  useEffect(() => {
    const hero = scene.current?.parentElement;
    if (!hero) return;

    const updatePosition = () => {
      const rect = hero.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      if (!W || !H) return;

      const S = Math.max(W / 1536, H / 1024);
      const left = W / 2 + (goatSpot.x - 768) * S;
      const bottom = (goatSpot.y - GOAT_BOTTOM_OFFSET) * S;
      const width = 43 * S;
      const height = 31 * S;

      setGoatCoords({
        left: Math.round(left),
        bottom: Math.round(bottom),
        width: Math.round(width),
        height: Math.round(height),
      });
    };

    updatePosition();
    const ro = new ResizeObserver(updatePosition);
    ro.observe(hero);
    window.addEventListener("resize", updatePosition);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePosition);
    };
  }, [goatSpot]);

  const handleGoatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isJumping) return;
    setIsJumping(true);
    jumpTimer.current = setTimeout(() => setIsJumping(false), 700);
  };

  return (
    <div
      ref={scene}
      className="hero-landscape"
      data-time={time}
    >
      <div className="hero-sky" />
      <div className="hero-stars" />
      <div className="hero-celestial" />

      {/* Nuvens: vento contínuo em loop infinito */}
      <div className="hero-cloud-layer">
        <div className="hero-wind-track hero-wind-slow">
          <img
            src="/community/cloud-pixel-2.png"
            alt=""
            className="hero-wind-cloud"
          />
          <img
            src="/community/cloud-pixel-2.png"
            alt=""
            className="hero-wind-cloud"
          />
        </div>
        <div className="hero-wind-track hero-wind-fast">
          <img
            src="/community/cloud-pixel.png"
            alt=""
            className="hero-wind-cloud hero-wind-front"
          />
          <img
            src="/community/cloud-pixel.png"
            alt=""
            className="hero-wind-cloud hero-wind-front"
          />
        </div>
      </div>

      {/* Montanhas ao fundo */}
      <img
        className="hero-terrain"
        src="/community/hero/terrain.png"
        alt=""
        fetchPriority="high"
      />

      {/* Terra / Planta / Grama em primeiro plano */}
      <img
        className="hero-foreground"
        src="/community/hero/foreground.png"
        alt=""
      />

      {/* Cabra interativa */}
      {goatCoords && (
        <button
          type="button"
          className="goat-positioner"
          data-layer={goatSpot.y >= 350 ? "far" : "near"}
          style={{
            left: `${goatCoords.left}px`,
            bottom: `${goatCoords.bottom}px`,
            width: `${goatCoords.width}px`,
            height: `${goatCoords.height}px`,
          }}
          onClick={handleGoatClick}
          title="Bééé! 🐐 Clique para ver o mortal 360!"
          aria-label="Cabra interativa"
        >
          <div
            className={`goat-animator${
              isJumping
                ? goatSpot.mirrored
                  ? " jumping-flip-reverse"
                  : " jumping-flip"
                : ""
            }`}
          >
            <img
              src="/community/cabra.png"
              alt="Cabra"
              className={`goat-sprite${goatSpot.mirrored ? " mirrored" : ""}`}
            />
          </div>
        </button>
      )}
    </div>
  );
}

"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CommunityEffects({
  globeDesign = 1,
}: {
  globeDesign?: number;
}) {
  const pathname = usePathname();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const frames = new Set<number>();
    let disposeGlobe: (() => void) | undefined;
    const canvas = document.querySelector<HTMLCanvasElement>("#impact-globe");
    if (canvas) {
      import("./globe")
        .then(({ default: mountGlobe }) => {
          if (!signal.aborted) disposeGlobe = mountGlobe(canvas, globeDesign);
        })
        .catch(() => {
          if (!signal.aborted)
            canvas.setAttribute(
              "aria-label",
              "Conexões do Trilha pelo Brasil e pelo mundo.",
            );
        });
    }
    for (const panel of document.querySelectorAll<HTMLElement>(
      ".trilha-site .campus-art, .trilha-site .community-journal, .trilha-site .team-section",
    )) {
      let pending = 0;
      let x = 0;
      let y = 0;
      const spotlight = !panel.classList.contains("campus-art");
      panel.addEventListener(
        "pointermove",
        (event) => {
          if (reduced.matches || event.pointerType !== "mouse") return;
          const bounds = panel.getBoundingClientRect();
          x = event.clientX - bounds.left;
          y = event.clientY - bounds.top;
          if (pending) return;
          pending = requestAnimationFrame(() => {
            frames.delete(pending);
            pending = 0;
            panel.style.setProperty(
              spotlight ? "--spot-x" : "--light-x",
              `${x}px`,
            );
            panel.style.setProperty(
              spotlight ? "--spot-y" : "--light-y",
              `${y}px`,
            );
            if (spotlight) panel.classList.add("spot-active");
          });
          frames.add(pending);
        },
        { signal },
      );
      panel.addEventListener(
        "pointerleave",
        () => {
          cancelAnimationFrame(pending);
          frames.delete(pending);
          pending = 0;
          panel.classList.remove("spot-active");
        },
        { signal },
      );
    }
    return () => {
      controller.abort();
      frames.forEach(cancelAnimationFrame);
      disposeGlobe?.();
    };
  }, [pathname, globeDesign]);
  return null;
}

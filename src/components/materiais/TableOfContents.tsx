"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (headings && headings.length > 0 && !activeId) {
      setActiveId(headings[0].id);
    }
  }, [headings, activeId]);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, current) =>
            prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: "-100px 0px -66% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const timeoutId = setTimeout(() => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [headings]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsExpanded(false), 200);
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const minLevel = useMemo(
    () => (headings.length > 0 ? Math.min(...headings.map((h) => h.level)) : 0),
    [headings]
  );

  // Apenas os headings de nível principal (ex.: só H2 quando há H2/H3/H4)
  const mainHeadings = useMemo(
    () => headings.filter((h) => h.level === minLevel),
    [headings, minLevel]
  );

  // Cap visual em N tracinhos — páginas com 30+ headings viravam paredão
  const MAX_DOTS = 12;
  const dotHeadings = useMemo(() => {
    if (mainHeadings.length <= MAX_DOTS) return mainHeadings;
    const step = (mainHeadings.length - 1) / (MAX_DOTS - 1);
    return Array.from({ length: MAX_DOTS }, (_, i) =>
      mainHeadings[Math.round(i * step)]
    );
  }, [mainHeadings]);

  // O tracinho ativo é o principal mais próximo (anterior ou igual) ao heading atual
  const activeMainId = useMemo(() => {
    if (!activeId) return "";
    const idx = headings.findIndex((h) => h.id === activeId);
    if (idx < 0) return "";
    for (let i = idx; i >= 0; i--) {
      if (headings[i].level === minLevel) return headings[i].id;
    }
    return "";
  }, [activeId, headings, minLevel]);

  // Quando há sampling, mapeia activeMain → tracinho exibido mais próximo
  const activeDotId = useMemo(() => {
    if (!activeMainId) return "";
    if (dotHeadings.length === mainHeadings.length) return activeMainId;
    const activeIdx = mainHeadings.findIndex((h) => h.id === activeMainId);
    if (activeIdx < 0) return "";
    let bestId = dotHeadings[0]?.id ?? "";
    let bestDist = Infinity;
    for (const dh of dotHeadings) {
      const di = mainHeadings.findIndex((m) => m.id === dh.id);
      const dist = Math.abs(di - activeIdx);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = dh.id;
      }
    }
    return bestId;
  }, [activeMainId, dotHeadings, mainHeadings]);

  if (!headings || headings.length === 0) return null;

  return (
    <div
      className="fixed top-1/2 -translate-y-1/2 right-4 hidden xl:flex z-40"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Painel expandido (hover) */}
      <div
        className="overflow-hidden"
        style={{
          width: isExpanded ? 280 : 0,
          opacity: isExpanded ? 1 : 0,
          marginRight: isExpanded ? 12 : 0,
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          background: "var(--cream)",
          border: "1px solid var(--rule)",
          borderRadius: "var(--radius-m)",
          boxShadow: "0 12px 32px -16px rgba(26,24,21,0.18)",
        }}
      >
        <div
          className="overflow-y-auto no-scrollbar p-4"
          style={{ maxHeight: "60vh", width: 280 }}
        >
          <p
            className="mb-3 uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--ink-muted)",
            }}
          >
            Nesta página
          </p>
          <nav>
            <ul className="space-y-1">
              {headings.map((heading) => {
                const isActive = activeId === heading.id;
                const indent = heading.level - minLevel;

                return (
                  <li key={heading.id}>
                    <button
                      onClick={() => scrollToHeading(heading.id)}
                      className="w-full text-left py-1.5 px-3 rounded-md transition-colors duration-150"
                      style={{
                        paddingLeft: `${12 + indent * 12}px`,
                        fontSize: 14,
                        lineHeight: 1.4,
                        background: isActive ? "var(--mint-soft)" : "transparent",
                        color: isActive ? "var(--ink)" : "var(--ink-soft)",
                        fontWeight: isActive ? 500 : 400,
                      }}
                    >
                      {heading.text}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Indicadores minimalistas — apenas pontos principais (max 12) */}
      <div className="flex flex-col items-end gap-[8px] py-1 max-h-[60vh] overflow-y-auto no-scrollbar">
        {dotHeadings.map((heading) => {
          const isActive = activeDotId === heading.id;
          return (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              aria-label={heading.text}
              className="h-[2px] rounded-[1px] transition-all duration-200 flex-shrink-0"
              style={{
                width: isActive ? 24 : 14,
                background: isActive ? "var(--ink)" : "var(--rule)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--ink-muted)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--rule)";
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

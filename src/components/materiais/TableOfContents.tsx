"use client";

import { useEffect, useState, useRef } from "react";

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

  // Define o primeiro heading como ativo inicialmente
  useEffect(() => {
    if (headings && headings.length > 0 && !activeId) {
      setActiveId(headings[0].id);
    }
  }, [headings, activeId]);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Filtra apenas as entradas visíveis
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Pega o primeiro heading visível na viewport
          const topEntry = visibleEntries.reduce((prev, current) => {
            return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current;
          });
          
          setActiveId(topEntry.target.id);
        }
      },
      { 
        rootMargin: "-100px 0px -66% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    // Adiciona um pequeno delay para garantir que os elementos estão renderizados
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

  if (!headings || headings.length === 0) return null;

  const minLevel = Math.min(...headings.map((h) => h.level));

  return (
    <div
      className="fixed top-1/2 -translate-y-1/2 right-4 hidden xl:flex z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Painel expandido */}
      <div
        className="overflow-hidden bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700"
        style={{
          width: isExpanded ? 280 : 0,
          opacity: isExpanded ? 1 : 0,
          marginRight: isExpanded ? 12 : 0,
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className="overflow-y-auto p-4"
          style={{ maxHeight: "60vh", width: 280 }}
        >
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
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
                      className={`
                        w-full text-left py-1.5 px-3 rounded-lg text-sm
                        transition-colors duration-150
                        ${isActive
                          ? "bg-AzulEletrico/10 text-AzulEletrico dark:bg-AzulCeu/20 dark:text-AzulCeu font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-gray-200"
                        }
                      `}
                      style={{ paddingLeft: `${12 + indent * 12}px` }}
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

      {/* Indicadores minimalistas estilo Notion */}
      <div className="flex flex-col items-end gap-[6px] py-1 max-h-[60vh] overflow-y-auto">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              aria-label={heading.text}
              className={`
                h-[2px] rounded-[1px] transition-all duration-200 flex-shrink-0
                ${isActive
                  ? "w-5 bg-gray-800 dark:bg-gray-200"
                  : "w-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }
              `}
            />
          );
        })}
      </div>
    </div>
  );
}

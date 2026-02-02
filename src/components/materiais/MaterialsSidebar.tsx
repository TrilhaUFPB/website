"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, FileText, FolderOpen, Folder, Book, Menu, X } from "lucide-react";
import { AreaStructure } from "@/lib/materials";

interface MaterialsSidebarProps {
  areas: AreaStructure[];
  className?: string;
}

export default function MaterialsSidebar({ areas, className = "" }: MaterialsSidebarProps) {
  const [expandedAreas, setExpandedAreas] = useState<Set<string>>(new Set());
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Expande todas as áreas por padrão
  useEffect(() => {
    setExpandedAreas(new Set(areas.map((a) => a.slug)));
  }, [areas]);

  // Fecha o menu mobile quando a rota muda
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleArea = (slug: string) => {
    setExpandedAreas((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(slug)) {
        newSet.delete(slug);
      } else {
        newSet.add(slug);
      }
      return newSet;
    });
  };

  const isActive = (area: string, slug: string) => 
    pathname === `/materiais/${area}/${slug}`;
  const isMaterialsIndex = pathname === "/materiais";

  const SidebarContent = () => (
    <div className="h-full flex flex-col">


      {/* Lista de índice */}
      <Link
        href="/materiais"
        className={`
          flex items-center gap-3 px-4 py-2 rounded-xl mb-4 transition-all duration-200 text-sm
          ${isMaterialsIndex
            ? "bg-AzulCeu/15 text-AzulEletrico dark:text-AzulCeu font-semibold"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
          }
        `}
      >
        <FileText className="w-4 h-4" />
        <span>Início</span>
      </Link>

      {/* Separador */}
      <div className="h-px bg-gray-200 dark:bg-slate-700 mb-4" />

      {/* Navegação por áreas → materiais */}
      <nav className="flex-1 overflow-y-auto space-y-2">
        {areas.map((area) => (
          <div key={area.slug} className="space-y-0.5">
            {/* Header da área (pasta) */}
            <button
              onClick={() => toggleArea(area.slug)}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <span className="flex items-center gap-3">
                {expandedAreas.has(area.slug) ? (
                  <FolderOpen className="w-4 h-4 text-AzulCeu" />
                ) : (
                  <Folder className="w-4 h-4 text-gray-400" />
                )}
                {area.name}
              </span>
              {expandedAreas.has(area.slug) ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {/* Lista de materiais da área */}
            {expandedAreas.has(area.slug) && (
              <ul className="ml-5 space-y-0.5 border-l-2 border-gray-200 dark:border-slate-700">
                {area.materials.length > 0 ? (
                  area.materials.map((material) => (
                    <li key={material.slug}>
                      <Link
                        href={`/materiais/${material.area}/${material.slug}`}
                        className={`
                          flex items-center gap-3 px-4 py-2 ml-3 text-xs rounded-lg transition-all duration-200
                          ${isActive(material.area, material.slug)
                            ? "bg-AzulCeu/15 text-AzulEletrico dark:text-AzulCeu font-medium border-l-2 border-AzulEletrico dark:border-AzulCeu -ml-0.5 pl-[18px]"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-gray-200"
                          }
                        `}
                      >
                        <FileText className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{material.title}</span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 ml-3 text-xs text-gray-400 dark:text-gray-500 italic">
                    Nenhum material ainda
                  </li>
                )}
              </ul>
            )}
          </div>
        ))}

        {areas.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Nenhum material disponível</p>
          </div>
        )}
      </nav>
    </div>
  );

  return (
    <>
      {/* Botão mobile para abrir sidebar */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-40 p-4 bg-AzulEletrico text-white rounded-full shadow-xl hover:bg-AzulEletrico/90 transition-colors"
        aria-label="Abrir menu de navegação"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar mobile */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 h-full w-80 bg-white dark:bg-slate-900 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 h-full">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Fechar menu"
          >
            <X className="w-6 h-6" />
          </button>
          <SidebarContent />
        </div>
      </aside>

      {/* Sidebar desktop */}
      <aside
        className={`
          hidden lg:block w-72 xl:w-80 flex-shrink-0 ${className}
        `}
      >
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-6">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}

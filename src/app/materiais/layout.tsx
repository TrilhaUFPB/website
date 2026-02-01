import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MaterialsSidebar from "@/components/materiais/MaterialsSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { getMaterialsByArea } from "@/lib/materials";

export default function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const areas = getMaterialsByArea();

  return (
    <div className="min-h-screen flex flex-col font-poppins bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Header fixo para materiais */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-AzulEletrico dark:hover:text-AzulCeu transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Voltar ao site</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-slate-700 hidden sm:block" />
              <Link href="/materiais" className="text-xl font-bold text-AzulMeiaNoite dark:text-white">
                trilha<span className="text-AzulCeu">/materiais</span>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Conteúdo principal com sidebar e espaço para TOC */}
      <div className="flex-grow max-w-[1900px] mx-auto w-full px-6 py-8">
        <div className="flex gap-10">
          {/* Sidebar de navegação - largura fixa */}
          <MaterialsSidebar areas={areas} />

          {/* Conteúdo principal - mais largo */}
          <main className="flex-grow min-w-0">
            {children}
          </main>
        </div>
      </div>

      {/* Footer simplificado */}
      <footer className="border-t border-gray-200 dark:border-slate-800 py-6 mt-auto">
        <div className="max-w-[1800px] mx-auto px-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Trilha UFPB. Materiais didáticos para estudantes de computação.
          </p>
        </div>
      </footer>
    </div>
  );
}

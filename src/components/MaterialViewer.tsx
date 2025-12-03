"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import MarkdownRenderer, { Heading } from "@/components/MarkdownRenderer";

interface MaterialViewerProps {
  content: string;
  currentPath?: string | null;
  allPaths?: string[];
}

export default function MaterialViewer({ content: initialContent, currentPath: initialPath, allPaths = [] }: MaterialViewerProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [currentPath, setCurrentPath] = useState<string | null>(initialPath || null);
  const [content, setContent] = useState<string>(initialContent);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [prevPath, setPrevPath] = useState<string | null>(null);
  const [showNavButtons, setShowNavButtons] = useState(false);
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const navButtonsRef = useRef<HTMLDivElement>(null);

  const loadMarkdown = (path: string) => {
    import('@/data/markdown-manifest').then(({ getMarkdownByPath, getNavigationPaths }) => {
      const markdownContent = getMarkdownByPath(path);
      if (markdownContent) {
        setCurrentPath(path);
        setContent(markdownContent);
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Reset active heading
        setActiveId("");
        // Update navigation paths
        const navigation = getNavigationPaths(path);
        setNextPath(navigation.next);
        setPrevPath(navigation.prev);
        setShowNavButtons(false);
      }
    });
  };

  // Update navigation paths when currentPath changes
  useEffect(() => {
    if (currentPath) {
      import('@/data/markdown-manifest').then(({ getNavigationPaths }) => {
        const navigation = getNavigationPaths(currentPath);
        setNextPath(navigation.next);
        setPrevPath(navigation.prev);
      });
    }
  }, [currentPath]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((h) => ({
        id: h.id,
        element: document.getElementById(h.id),
      }));

      // Find the heading that's currently in view
      let currentId = "";
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const { id, element } = headingElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            currentId = id;
            break;
          }
        }
      }

      if (currentId && currentId !== activeId) {
        setActiveId(currentId);
      }

      // Show navigation buttons more prominently when scrolled down
      const scrollY = window.scrollY || window.pageYOffset;
      setShowNavButtons(scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings, activeId]);

  const handleHeadingsChange = useCallback((newHeadings: Heading[]) => {
    setHeadings((prevHeadings) => {
      // Only update if headings actually changed
      const changed = 
        prevHeadings.length !== newHeadings.length ||
        prevHeadings.some((h, i) => {
          const newH = newHeadings[i];
          return !newH || h.id !== newH.id || h.text !== newH.text || h.level !== newH.level;
        });
      
      if (!changed) {
        return prevHeadings;
      }
      
      return newHeadings;
    });
    
    setActiveId((prevActiveId) => {
      if (newHeadings.length > 0 && !prevActiveId) {
        return newHeadings[0].id;
      }
      return prevActiveId;
    });
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-AzulCeu/10 to-Branco">
      {/* Logo - Always visible, fixed position */}
      <div className="fixed top-4 left-4 z-30">
        <Link 
          href="/" 
          className="block px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="text-xl font-bold text-AzulMeiaNoite select-none font-poppins">
            trilha
          </div>
        </Link>
      </div>

      {/* Floating Toggle Button for Left Sidebar - Shows when hidden */}
      {!showLeftSidebar && (
        <button
          onClick={() => setShowLeftSidebar(true)}
          className="fixed top-20 left-0 p-2 bg-white dark:bg-gray-800 rounded-r-md shadow-lg border border-l-0 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-30"
          title="Mostrar documentos"
        >
          <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Floating Toggle Button for Right Sidebar - Shows when hidden */}
      {!showRightSidebar && (
        <button
          onClick={() => setShowRightSidebar(true)}
          className="fixed top-20 right-0 p-2 bg-white dark:bg-gray-800 rounded-l-md shadow-lg border border-r-0 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-30"
          title="Mostrar índice"
        >
          <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      <div className="flex">
        {/* Left Sidebar - Markdown Files List */}
        <aside className={`w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 fixed left-0 top-0 h-screen overflow-y-auto pt-20 z-10 transition-transform duration-300 ${
          showLeftSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Toggle Button - Attached to left sidebar */}
          {showLeftSidebar && (
            <button
              onClick={() => setShowLeftSidebar(false)}
              className="absolute top-20 right-0 translate-x-full p-2 bg-white dark:bg-gray-800 rounded-r-md shadow-lg border border-l-0 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-20"
              title="Ocultar documentos"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          <div className="p-6">
            <h2 className="text-lg font-semibold text-AzulMeiaNoite mb-4 font-poppins">Documentos</h2>
            {allPaths.length > 0 ? (
              <nav>
                <ul className="space-y-1">
                  {allPaths.map((path) => (
                    <li key={path}>
                      <button
                        onClick={() => loadMarkdown(path)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          currentPath === path
                            ? "bg-AzulCeu/20 text-AzulEletrico font-semibold"
                            : "text-gray-600 hover:text-AzulEletrico hover:bg-gray-100"
                        }`}
                      >
                        {path.replace(/\.md$/, '').replace(/\//g, ' / ').replace(/^\d+\.\s*/, '')}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : (
              <p className="text-gray-500 text-sm">Nenhum documento disponível</p>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${
          showLeftSidebar ? 'ml-64' : 'ml-0'
        } ${showRightSidebar ? 'lg:mr-64' : 'lg:mr-0'}`}>
          <div className={`mx-auto px-4 sm:px-6 py-8 sm:py-12 transition-all duration-300 ${
            !showLeftSidebar && !showRightSidebar 
              ? 'max-w-7xl' 
              : !showLeftSidebar || !showRightSidebar 
                ? 'max-w-6xl' 
                : 'max-w-6xl'
          }`}>
            <div ref={contentRef} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 sm:p-8 relative">
              <MarkdownRenderer content={content} onHeadingsChange={handleHeadingsChange} />
              
              {/* Navigation Buttons - Inside markdown content */}
              {(prevPath || nextPath) && (
                <div 
                  ref={navButtonsRef}
                  className={`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center transition-all duration-300 ${showNavButtons ? 'opacity-100' : 'opacity-30'}`}
                >
                  {prevPath ? (
                    <button
                      onClick={() => loadMarkdown(prevPath)}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Anterior
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {nextPath && (
                    <button
                      onClick={() => loadMarkdown(nextPath)}
                      className="px-6 py-3 bg-AzulEletrico text-white rounded-md hover:bg-AzulCeu transition-colors font-semibold flex items-center gap-2"
                    >
                      Próximo
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Table of Contents (Outline) */}
        <aside className={`hidden lg:block w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 fixed right-0 top-0 h-screen overflow-y-auto pt-20 z-10 transition-transform duration-300 ${
          showRightSidebar ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Toggle Button - Attached to right sidebar */}
          {showRightSidebar && (
            <button
              onClick={() => setShowRightSidebar(false)}
              className="absolute top-20 left-0 -translate-x-full p-2 bg-white dark:bg-gray-800 rounded-l-md shadow-lg border border-r-0 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-20"
              title="Ocultar índice"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
          )}
          
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 font-poppins">Índice</h3>
            {headings.length > 0 ? (
              <nav className="space-y-1">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`block px-2 py-1 rounded text-sm transition-colors ${
                      activeId === heading.id
                        ? "text-AzulEletrico font-semibold bg-AzulCeu/10"
                        : "text-gray-500 hover:text-AzulEletrico"
                    }`}
                    style={{ paddingLeft: `${(heading.level - 1) * 12 + 8}px` }}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            ) : (
              <p className="text-gray-500 text-sm">Nenhum cabeçalho encontrado</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}


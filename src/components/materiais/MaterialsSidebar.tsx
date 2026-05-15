"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AreaStructure } from "@/lib/materials";

interface MaterialsSidebarProps {
  areas: AreaStructure[];
}

const COLLAPSED_KEY = "materiais-sidebar-collapsed";

export default function MaterialsSidebar({ areas }: MaterialsSidebarProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setExpanded(new Set(areas.map((a) => a.slug)));
  }, [areas]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(COLLAPSED_KEY);
    if (stored === "true") setCollapsed(true);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.materiaisCollapsed = String(collapsed);
    window.localStorage.setItem(COLLAPSED_KEY, String(collapsed));
    return () => {
      delete document.documentElement.dataset.materiaisCollapsed;
    };
  }, [collapsed]);

  const toggle = (slug: string) =>
    setExpanded((prev) => {
      const n = new Set(prev);
      if (n.has(slug)) n.delete(slug);
      else n.add(slug);
      return n;
    });

  const isActive = (area: string, slug: string) => pathname === `/materiais/${area}/${slug}`;
  const isIndex = pathname === "/materiais";

  const Content = ({ showCollapse = false }: { showCollapse?: boolean }) => (
    <div className="materiais-sidebar-inner">
      <div className="materiais-sidebar-header">
        <Link
          href="/materiais"
          className={`materiais-sidebar-home ${isIndex ? "is-active" : ""}`}
        >
          Início
        </Link>
        {showCollapse && (
          <button
            onClick={() => setCollapsed(true)}
            className="materiais-sidebar-collapse"
            aria-label="Recolher menu"
            title="Recolher menu"
          >
            «
          </button>
        )}
      </div>
      <div className="materiais-sidebar-rule" />
      <nav className="materiais-sidebar-nav">
        {areas.map((area) => {
          const open = expanded.has(area.slug);
          return (
            <div key={area.slug}>
              <button
                onClick={() => toggle(area.slug)}
                className="materiais-sidebar-area"
                aria-expanded={open}
              >
                <span className="kicker tag-dot" style={{ color: 'var(--mint-deep)' }}>
                  {area.name}
                </span>
                <span aria-hidden="true" style={{ color: 'var(--ink-soft)' }}>
                  {open ? '–' : '+'}
                </span>
              </button>
              {open && (
                <ul className="materiais-sidebar-list">
                  {area.materials.length > 0 ? (
                    area.materials.map((m) => (
                      <li key={m.slug}>
                        <Link
                          href={`/materiais/${m.area}/${m.slug}`}
                          className={`materiais-sidebar-item ${isActive(m.area, m.slug) ? "is-active" : ""}`}
                        >
                          {m.title}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="materiais-sidebar-empty">Nenhum material ainda</li>
                  )}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="materiais-sidebar-fab"
        aria-label="Abrir navegação dos materiais"
      >
        Materiais
      </button>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="materiais-sidebar-expand"
          aria-label="Abrir menu de materiais"
          title="Abrir menu"
        >
          <span className="materiais-sidebar-expand-icon" aria-hidden="true">»</span>
          <span>Materiais</span>
        </button>
      )}

      {mobileOpen && (
        <div className="materiais-sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`materiais-sidebar-mobile ${mobileOpen ? "is-open" : ""}`}>
        <button
          onClick={() => setMobileOpen(false)}
          className="materiais-sidebar-close"
          aria-label="Fechar"
        >
          ×
        </button>
        <Content />
      </aside>

      <aside className="materiais-sidebar-desktop">
        <div className="materiais-sidebar-sticky">
          <Content showCollapse />
        </div>
      </aside>
    </>
  );
}

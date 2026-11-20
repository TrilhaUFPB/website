"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { select } from "d3-selection";
import { zoom, zoomIdentity, type ZoomBehavior, type ZoomTransform } from "d3-zoom";
import "d3-transition";

export type Role = "aluno" | "org" | "lider" | "fundador";
export type Step = { period: string; role: Role; title: string };
export type Traveler = { id: string; name: string; photo: string; link: string; steps: Step[] };
export type Initiative = { id: string; name: string; students?: boolean; members: { id: string; role: string }[] };
type Point = { x: number; y: number };

const ROLE_LABEL: Record<Role, string> = { fundador: "Fundador", lider: "Liderança", org: "Organização", aluno: "Aluno" };
const ROLE_RANK: Record<Role, number> = { fundador: 0, lider: 1, org: 2, aluno: 3 };
// Same colors the site's timeline uses for each initiative.
const INIT_COLOR: Record<string, string> = { "trilha-ufpb": "#123b37", "trilha-ufpb-alunos": "#123b37", momento: "#665185", "trilha-ufpe": "#1c4ae5", "hack-the-path": "#7e8fff" };

const TOP = 110;
const ROW = 30;
const NODE = 22;
const COL0 = 180;
const COL_GAP = 150;
const AV = 22;
const AV_GAP = 6;
const MIN_PER_ROW = 5;
const LABEL_CHAR_W = 7.8; // ~Space Grotesk 600 at 13px
const LABELS_MIN_K = 0.5;
const PARTICLES = ["de", "da", "do", "dos", "das", "e"];

const initRole = (role: string): Role => (role === "Aluno" ? "aluno" : role === "Presidente" || role.startsWith("Líder") ? "lider" : "org");
const fold = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function RoleGlyph({ role }: { role: Role }) {
  switch (role) {
    case "aluno": return <path d="M-4,-1 L0,-3 L4,-1 L0,1 Z M-2.4,0 V2 Q0,3.4 2.4,2 V0" />;
    case "org": return <><circle cy={-1.5} r={1.5} /><path d="M-3,3 Q-3,0.3 0,0.3 Q3,0.3 3,3 Z" /></>;
    case "lider": return <path d="M0,-3.4 L1,-1.1 L3.3,-1 L1.5,0.6 L2.1,3 L0,1.7 L-2.1,3 L-1.5,0.6 L-3.3,-1 L-1,-1.1 Z" />;
    case "fundador": return <path d="M-2,3.4 V-3.2 M-2,-3.2 H2.8 L1.6,-1.6 L2.8,0 H-2" />;
  }
}
function RoleIcon({ role, x = 0, y = 0 }: { role: Role; x?: number; y?: number }) {
  return <g transform={`translate(${x},${y})`} className={`tj-icon tj-icon--${role}`}><circle r={5.6} className="tj-icon-bg" /><RoleGlyph role={role} /></g>;
}
function RoleChip({ role }: { role: Role }) {
  return <svg width="14" height="14" viewBox="-7 -7 14 14" aria-hidden="true"><RoleIcon role={role} /></svg>;
}

// First-fit interval packing: a row is reused once its previous occupant has left.
function pack(list: Traveler[], periods: string[], y0: number, put: (p: Traveler, y: number) => void) {
  const rows: number[] = [];
  for (const p of list) {
    const first = periods.indexOf(p.steps[0].period);
    const last = periods.indexOf(p.steps[p.steps.length - 1].period);
    let row = rows.findIndex(lastIdx => lastIdx < first);
    if (row < 0) { row = rows.length; rows.push(-1); }
    rows[row] = last;
    put(p, y0 + row * ROW);
  }
  return y0 + rows.length * ROW;
}

export default function Trajetoria({ periods, people, initiatives, children }: { periods: string[]; people: Traveler[]; initiatives: Initiative[]; children?: React.ReactNode }) {
  const [hovered, setHovered] = useState<{ id: string; pt: Point } | null>(null);
  const [pinned, setPinned] = useState<{ id: string; pt: Point } | null>(null);
  const active = hovered ?? pinned;
  const activeId = active?.id ?? null;

  const byId = useMemo(() => new Map(people.map(p => [p.id, p])), [people]);
  const membershipsOf = useMemo(() => {
    const m = new Map<string, { init: Initiative; role: string }[]>();
    for (const init of initiatives) for (const mm of init.members) m.set(mm.id, [...(m.get(mm.id) ?? []), { init, role: mm.role }]);
    return m;
  }, [initiatives]);

  const layout = useMemo(() => {
    const colX = (period: string) => COL0 + periods.indexOf(period) * COL_GAP;
    const firstIdx = (p: Traveler) => periods.indexOf(p.steps[0].period);
    const bestRank = (p: Traveler) => Math.min(...p.steps.map(s => ROLE_RANK[s.role]));
    const byName = (a: Traveler, b: Traveler) => a.name.localeCompare(b.name, "pt-BR");

    // One packed graph; organizers claim rows first, so students end up lower.
    const lanes = people.filter(p => p.steps.length > 0)
      .sort((a, b) => bestRank(a) - bestRank(b) || firstIdx(a) - firstIdx(b) || b.steps.length - a.steps.length || byName(a, b));
    const nodes = new Map<string, Map<string, Point>>();
    const put = (p: Traveler, y: number) => nodes.set(p.id, new Map(p.steps.map(s => [s.period, { x: colX(s.period), y }])));
    const lanesBottom = pack(lanes, periods, TOP + 20, put);

    // Each initiative sits beside the median of its members' latest positions.
    const last = periods[periods.length - 1];
    const initX = colX(last) + 210;
    // Wide enough for the longest "Name · count" title; extra width fits more avatars per row.
    const labelW = Math.max(...initiatives.map(i => 32 + `${i.name} · ${i.members.length}`.length * LABEL_CHAR_W + 16));
    const PER_ROW = Math.max(MIN_PER_ROW, Math.floor((labelW - 32 + AV_GAP) / (AV + AV_GAP)));
    const clusterW = 32 + PER_ROW * AV + (PER_ROW - 1) * AV_GAP;
    const desired = (init: Initiative) => {
      const ys = init.members.map(m => nodes.get(m.id)?.get(last)?.y).filter((v): v is number => v !== undefined).sort((a, b) => a - b);
      return ys.length ? ys[Math.floor(ys.length / 2)] : TOP;
    };
    const clusters: { init: Initiative; y: number; h: number }[] = [];
    const initNodes = new Map<string, Point[]>();
    let y = TOP;
    for (const init of [...initiatives].sort((a, b) => desired(a) - desired(b))) {
      const h = 40 + Math.ceil(init.members.length / PER_ROW) * (AV + AV_GAP) + 8;
      y = Math.max(y, desired(init) - h / 2);
      clusters.push({ init, y, h });
      init.members.forEach((m, i) => {
        const pt = { x: initX + 16 + AV / 2 + (i % PER_ROW) * (AV + AV_GAP), y: y + 40 + AV / 2 + Math.floor(i / PER_ROW) * (AV + AV_GAP) };
        initNodes.set(`${init.id}:${m.id}`, [pt]);
        initNodes.set(m.id, [...(initNodes.get(m.id) ?? []), pt]);
      });
      y += h + 20;
    }

    const height = Math.max(lanesBottom, y) + 40;
    const width = initX + clusterW + 40;
    const perPeriod = Object.fromEntries(periods.map(period => [period, lanes.filter(p => p.steps.some(s => s.period === period)).length]));
    return { colX, lanes, nodes, initX, clusterW, clusters, initNodes, height, width, perPeriod };
  }, [periods, people, initiatives]);

  // First name, plus the next meaningful word when the first name alone is ambiguous.
  const shortName = useMemo(() => {
    const words = (p: Traveler) => p.name.split(" ").filter(w => !PARTICLES.includes(w));
    const firsts = layout.lanes.map(p => words(p)[0]);
    return (p: Traveler) => { const w = words(p); return firsts.filter(f => f === w[0]).length > 1 ? `${w[0]} ${w[1] ?? ""}`.trim() : w[0]; };
  }, [layout.lanes]);

  const stats = useMemo(() => ({
    total: people.length,
    returned: people.filter(p => p.steps.length > 1).length,
    promoted: people.filter(p => { const i = p.steps.findIndex(s => s.role === "aluno"); return i >= 0 && p.steps.slice(i + 1).some(s => s.role !== "aluno"); }).length,
  }), [people]);

  // ---- pan & zoom (d3-zoom: wheel/trackpad zooms, drag pans, pinch on touch) ----
  const canvasRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<ZoomBehavior<HTMLDivElement, unknown>>(null);
  const [view, setView] = useState<{ x: number; y: number; k: number }>({ x: 0, y: 0, k: 1 });
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(canvasRef.current!);
    return () => ro.disconnect();
  }, []);

  const apply = useCallback((t: ZoomTransform, animate = true) => {
    const el = canvasRef.current, z = zoomRef.current;
    if (!el || !z) return;
    const sel = select(el);
    if (animate && !prefersReducedMotion()) sel.transition().duration(480).call(z.transform, t);
    else sel.call(z.transform, t);
  }, []);

  const fitWidth = useCallback((animate: boolean) => {
    const r = canvasRef.current!.getBoundingClientRect();
    const k = Math.min(1, (r.width - 32) / layout.width);
    apply(zoomIdentity.translate(Math.max(16, (r.width - layout.width * k) / 2), 96 - (TOP - 70) * k).scale(k), animate);
  }, [apply, layout.width]);

  const fitAll = () => {
    const r = canvasRef.current!.getBoundingClientRect();
    const k = Math.min((r.width - 32) / layout.width, (r.height - 120) / (layout.height - TOP + 70));
    apply(zoomIdentity.translate((r.width - layout.width * k) / 2, 100 - (TOP - 70) * k).scale(k));
  };

  const zoomBy = (factor: number) => {
    const el = canvasRef.current, z = zoomRef.current;
    if (!el || !z) return;
    const sel = select(el);
    if (prefersReducedMotion()) z.scaleBy(sel, factor);
    else z.scaleBy(sel.transition().duration(260), factor);
  };

  useEffect(() => {
    const el = canvasRef.current!;
    const z = zoom<HTMLDivElement, unknown>()
      .scaleExtent([0.2, 3])
      .clickDistance(4)
      .filter(e => !e.button && !(e.target as Element).closest?.(".tj-ui"))
      .on("zoom", e => setView({ x: e.transform.x, y: e.transform.y, k: e.transform.k }));
    zoomRef.current = z;
    select(el).call(z).on("dblclick.zoom", null);
    fitWidth(false);
    return () => { select(el).on(".zoom", null); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pointOf = useCallback((id: string): Point | undefined => {
    const p = byId.get(id);
    const lane = p?.steps.length ? layout.nodes.get(id)?.get(p.steps[p.steps.length - 1].period) : undefined;
    return lane ?? layout.initNodes.get(id)?.[0];
  }, [byId, layout]);

  const focusPerson = (id: string) => {
    const pt = pointOf(id);
    if (!pt) return;
    const r = canvasRef.current!.getBoundingClientRect();
    const k = Math.max(view.k, 1.15);
    setPinned({ id, pt });
    apply(zoomIdentity.translate(r.width / 2 - pt.x * k, r.height / 2 - pt.y * k).scale(k));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setPinned(null); setHovered(null); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ---- search ----
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const matches = useMemo(() => {
    const q = fold(query.trim());
    if (!q) return [];
    return people.filter(p => fold(p.name).split(" ").some(w => w.startsWith(q)) || fold(p.name).startsWith(q))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR")).slice(0, 6);
  }, [people, query]);
  const choose = (p: Traveler) => { focusPerson(p.id); setQuery(""); setSearchOpen(false); };

  // ---- drawing ----
  const graph = useMemo(() => {
    const last = periods[periods.length - 1];
    const dim = (id: string) => (activeId && activeId !== id ? 0.14 : 1);
    const activeInits = activeId ? (membershipsOf.get(activeId) ?? []).map(m => m.init.id) : [];
    const bind = (id: string, pt: Point) => ({
      onMouseEnter: () => setHovered({ id, pt }),
      onMouseLeave: () => setHovered(null),
      onFocus: () => setHovered({ id, pt }),
      onBlur: () => setHovered(null),
      onClick: (e: React.MouseEvent) => { e.stopPropagation(); setPinned(cur => (cur?.id === id ? null : { id, pt })); },
      onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPinned(cur => (cur?.id === id ? null : { id, pt })); } },
      tabIndex: 0,
      role: "button" as const,
      "aria-label": byId.get(id)?.name,
    });
    const curve = (a: Point, b: Point) => { const mx = (a.x + b.x) / 2; return `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`; };

    const avatar = (id: string, pt: Point, key: string, icon: Role, ring: { role?: Role; colors?: string[] }) => {
      const p = byId.get(id);
      if (!p) return null;
      const r = NODE / 2, R = r + 1.25;
      const colors = ring.colors ?? [];
      return (
        <g key={key} className="tj-node" transform={`translate(${pt.x},${pt.y})`} opacity={dim(id)} {...bind(id, pt)}>
          {colors.length ? (
            <>
              <circle r={r + 2.5} className="tj-ring-bg" />
              {colors.length === 1 ? <circle r={R} fill="none" stroke={colors[0]} strokeWidth={2.5} /> : colors.map((c, i) => {
                // One equal arc per initiative, starting at the top.
                const a0 = (i / colors.length) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / colors.length) * 2 * Math.PI - Math.PI / 2;
                return <path key={c + i} d={`M${R * Math.cos(a0)},${R * Math.sin(a0)} A${R},${R} 0 0 1 ${R * Math.cos(a1)},${R * Math.sin(a1)}`} fill="none" stroke={c} strokeWidth={2.5} />;
              })}
            </>
          ) : <circle r={r + 2.5} className={`tj-ring tj-ring--${ring.role}`} />}
          {p.photo
            ? <image href={p.photo} x={-r} y={-r} width={NODE} height={NODE} clipPath="url(#tj-circle)" preserveAspectRatio="xMidYMid slice" />
            : <><circle r={r} className="tj-initials-bg" /><text className="tj-initials" dy="0.35em">{p.name.split(" ").map(s => s[0]).slice(0, 2).join("")}</text></>}
          <RoleIcon role={icon} x={r * 0.8} y={r * 0.8} />
        </g>
      );
    };

    return (
      <>
        {periods.map(period => (
          <g key={period}>
            <line x1={layout.colX(period)} x2={layout.colX(period)} y1={TOP - 18} y2={layout.height - 20} className="tj-col" />
            <text x={layout.colX(period)} y={TOP - 50} className="tj-col-label">{period}</text>
            <text x={layout.colX(period)} y={TOP - 32} className="tj-col-sub">{layout.perPeriod[period]} pessoas</text>
          </g>
        ))}
        <text x={layout.initX + layout.clusterW / 2} y={TOP - 50} className="tj-col-label">Hoje</text>
        <text x={layout.initX + layout.clusterW / 2} y={TOP - 32} className="tj-col-sub">{initiatives.filter(i => !i.students).length} iniciativas + alunos</text>

        {layout.lanes.map(p => {
          const from = layout.nodes.get(p.id)?.get(last);
          const tos = layout.initNodes.get(p.id);
          if (!from || !tos) return null;
          return tos.map((to, i) => <path key={`${p.id}-l${i}`} d={curve(from, to)} className={`tj-link ${activeId === p.id ? "is-active" : ""}`} opacity={dim(p.id)} />);
        })}

        {layout.lanes.map(p => {
          const pts = p.steps.map(s => layout.nodes.get(p.id)!.get(s.period)!);
          return (
            <g key={p.id} opacity={dim(p.id)}>
              {pts.length > 1 && <path d={`M${pts.map(pt => `${pt.x},${pt.y}`).join(" L")}`} className={`tj-lane ${activeId === p.id ? "is-active" : ""}`} />}
              <text x={pts[0].x - NODE / 2 - 10} y={pts[0].y} dy="0.35em" className="tj-name" {...bind(p.id, pts[pts.length - 1])} tabIndex={-1}>{shortName(p)}</text>
            </g>
          );
        })}
        {layout.lanes.flatMap(p => p.steps.map(s => avatar(p.id, layout.nodes.get(p.id)!.get(s.period)!, `${p.id}-${s.period}`, s.role, { role: s.role })))}

        {layout.clusters.map(({ init, y, h }) => (
          <g key={init.id}>
            <rect x={layout.initX} y={y} width={layout.clusterW} height={h} rx={14} className={`tj-cluster ${activeInits.includes(init.id) ? "is-active" : ""}`} />
            <circle cx={layout.initX + 20} cy={y + 21} r={5} fill={INIT_COLOR[init.id] ?? "#000928"} />
            <text x={layout.initX + 32} y={y + 25} className="tj-cluster-label">{init.name} <tspan className="tj-cluster-count">· {init.members.length}</tspan></text>
          </g>
        ))}
        {initiatives.flatMap(init => init.members.map(m => {
          const pt = layout.initNodes.get(`${init.id}:${m.id}`)?.[0];
          const colors = (membershipsOf.get(m.id) ?? []).map(x => INIT_COLOR[x.init.id] ?? "#000928");
          return pt ? avatar(m.id, pt, `${init.id}-${m.id}`, initRole(m.role), { colors }) : null;
        }))}
      </>
    );
  }, [periods, initiatives, layout, activeId, byId, membershipsOf, shortName]);

  // ---- detail card, anchored to the person in screen space ----
  const card = (() => {
    if (!active) return null;
    const p = byId.get(active.id);
    if (!p || !size.w) return null;
    const W = 280;
    const r = { width: size.w, height: size.h };
    const sx = view.x + active.pt.x * view.k, sy = view.y + active.pt.y * view.k;
    const right = sx + 24 + W < r.width - 12;
    const left = right ? sx + 20 * view.k + 8 : sx - 20 * view.k - 8 - W;
    const top = Math.min(Math.max(12, sy - 40), r.height - 260);
    const memberships = membershipsOf.get(p.id) ?? [];
    return (
      <div className={`tj-card tj-ui ${pinned?.id === p.id ? "is-pinned" : ""}`} style={{ left: Math.max(12, left), top, width: W }} aria-live="polite" onClick={e => e.stopPropagation()}>
        <header>
          {p.photo ? <img src={p.photo} alt="" width={44} height={44} /> : <span className="tj-card-initials">{p.name.split(" ").map(s => s[0]).slice(0, 2).join("")}</span>}
          <div>
            <strong>{p.name}</strong>
            {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>}
          </div>
        </header>
        <ol>
          {p.steps.map(s => <li key={s.period}><RoleChip role={s.role} /><span className="tj-card-period">{s.period}</span>{s.title}</li>)}
          {memberships.map(m => (
            <li key={m.init.id}><span className="tj-card-init" style={{ background: INIT_COLOR[m.init.id] }} /><span className="tj-card-period">Hoje</span>{m.init.students ? m.init.name : `${m.init.name} · ${m.role}`}</li>
          ))}
        </ol>
      </div>
    );
  })();

  const last = periods[periods.length - 1];
  return (
    <section className="tj" aria-label="Trajetórias">
      <header className="tj-head">
        <div className="tj-head-intro">{children}</div>
        <dl className="tj-stats">
          <div><dt>pessoas</dt><dd>{stats.total}</dd></div>
          <div><dt>turmas</dt><dd>{periods.length}</dd></div>
          <div><dt>voltaram em outra turma</dt><dd>{stats.returned}</dd></div>
          <div><dt>de aluno a organização</dt><dd>{stats.promoted}</dd></div>
        </dl>
      </header>

      <div
        ref={canvasRef}
        className={`tj-canvas ${view.k < LABELS_MIN_K ? "is-far" : ""}`}
        style={{ backgroundSize: `${24 * view.k}px ${24 * view.k}px`, backgroundPosition: `${view.x}px ${view.y}px` }}
        onClick={() => setPinned(null)}
      >
        <svg width="100%" height="100%" aria-label={`Trajetórias das pessoas do Trilha de ${periods[0]} a ${last}`}>
          <defs><clipPath id="tj-circle" clipPathUnits="objectBoundingBox"><circle cx=".5" cy=".5" r=".5" /></clipPath></defs>
          <g transform={`translate(${view.x},${view.y}) scale(${view.k})`}>{graph}</g>
        </svg>

        <ul className="tj-legend tj-ui" aria-label="Legenda">
          {(Object.keys(ROLE_LABEL) as Role[]).map(r => <li key={r}><RoleChip role={r} />{ROLE_LABEL[r]}</li>)}
          <li><span className="tj-split-chip" />Em duas iniciativas</li>
        </ul>

        <div className="tj-search tj-ui" onClick={e => e.stopPropagation()}>
          <input
            type="search"
            placeholder="Encontrar pessoa"
            aria-label="Encontrar pessoa"
            role="combobox"
            aria-expanded={searchOpen && matches.length > 0}
            aria-controls="tj-search-results"
            value={query}
            onChange={e => { setQuery(e.target.value); setSearchOpen(true); setCursor(0); }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 120)}
            onKeyDown={e => {
              if (e.key === "ArrowDown") { e.preventDefault(); setCursor(c => Math.min(c + 1, matches.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)); }
              if (e.key === "Enter" && matches[cursor]) choose(matches[cursor]);
            }}
          />
          {searchOpen && matches.length > 0 && (
            <ul id="tj-search-results" role="listbox">
              {matches.map((p, i) => (
                <li key={p.id} role="option" aria-selected={i === cursor} onMouseDown={e => { e.preventDefault(); choose(p); }} onMouseEnter={() => setCursor(i)}>
                  {p.photo ? <img src={p.photo} alt="" width={24} height={24} /> : <span className="tj-card-initials" />}
                  {p.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {card}

        <div className="tj-controls tj-ui" onClick={e => e.stopPropagation()}>
          <button type="button" aria-label="Afastar" onClick={() => zoomBy(1 / 1.3)}>−</button>
          <span aria-live="polite">{Math.round(view.k * 100)}%</span>
          <button type="button" aria-label="Aproximar" onClick={() => zoomBy(1.3)}>+</button>
          <button type="button" className="tj-controls-fit" onClick={fitAll}>Ver tudo</button>
        </div>
        <p className="tj-help">Role para aproximar · arraste para mover</p>
      </div>
    </section>
  );
}

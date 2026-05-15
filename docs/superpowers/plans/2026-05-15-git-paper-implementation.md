# Git Paper Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `public/papers/git-paper.html` with bilingual PT/EN content, in-paper language toggle, four interactive React panels, and add card entries to both locale JSONs.

**Architecture:** Single self-contained static HTML (React 18 + Babel via CDN) inlined with CSS and JSX. `COPY = { pt, en }` object drives every visible string; in-paper toggle persists via `localStorage["paper-lang"]`.

**Tech Stack:** Static HTML, React 18 UMD, @babel/standalone, JetBrains Mono webfont, vanilla browser localStorage.

---

### Task 1: Scaffold the HTML shell

**Files:**
- Create: `public/papers/git-paper.html`

- [ ] **Step 1:** Write the file with `<head>` (fonts, scripts, inline CSS placeholder), `<body>` containing `<div id="root">` and a `<script type="text/babel">` placeholder. Run `curl -s http://localhost:3000/papers/git-paper.html | head -20` after dev server start to confirm 200.

- [ ] **Step 2:** Commit: `git commit -m "feat(paper): scaffold git-paper.html shell"`

### Task 2: Inline the terminal-aesthetic CSS

**Files:**
- Modify: `public/papers/git-paper.html` (the `<style>` block)

- [ ] **Step 1:** Paste full styles from `src/app/posts/git-do-zero/paper.css` of the port-kruta repo, but un-scoped (no `.paper-root` prefix; apply to `body` directly), and use `html[data-lang]` for nothing — the light/dark stays driven by `html.theme-light` class set by the App on mount.

- [ ] **Step 2:** Commit.

### Task 3: Inline the visualization primitives

**Files:**
- Modify: `public/papers/git-paper.html` (Babel script)

- [ ] **Step 1:** Add `CommitGraph`, `ThreeAreas` (with `Area`), and `DualView` components — port directly from `src/app/posts/git-do-zero/Panels.tsx` minus the TypeScript types.

- [ ] **Step 2:** Commit.

### Task 4: Inline the four interactive panels

- [ ] **Step 1:** Add `PanelShell`, `TryThis`, `CmdLog`, `PanelThreeAreas`, `PanelTimeline`, `PanelBranches`, `PanelRemote`. Each panel takes a `t` prop for localized button/empty/log labels.

- [ ] **Step 2:** Commit.

### Task 5: Build the bilingual COPY dictionary

- [ ] **Step 1:** Define `const COPY = { pt: { hero, sections, ui }, en: { hero, sections, ui } }`. Sections is an array of `{ id, num, title, chapter, body }` where `body` is a function returning JSX given a `t` helper.

- [ ] **Step 2:** Translate every string in the 8 sections (~3500 words). Keep filenames, hashes, commands literal.

- [ ] **Step 3:** Commit.

### Task 6: App shell with Topbar (toggle), Hero, Section renderer, Footer

- [ ] **Step 1:** Build `<App/>` that reads `localStorage["paper-lang"]` → falls back to `localStorage["locale"]` → `navigator.language` → `pt`. Renders `<Topbar/>` (with PT/EN toggle button) `<Hero/>` `<Section/>`×8 (interleaved with panels) `<Outro/>` `<Footer/>`.

- [ ] **Step 2:** Mount with `ReactDOM.createRoot(document.getElementById('root')).render(<App/>)`.

- [ ] **Step 3:** Commit.

### Task 7: Add paper card to both locales

**Files:**
- Modify: `src/locales/pt/common.json` (papers.items array)
- Modify: `src/locales/en/common.json` (papers.items array)

- [ ] **Step 1:** Insert new entry at the top of each `items` array. PT/EN titles/desc per spec. `slug: "git-paper"`, `tag: "Git"`, `lang: "PT · EN"`, `author: "Kruta"`.

- [ ] **Step 2:** Commit.

### Task 8: Verify in dev server

- [ ] **Step 1:** `cd /Users/kruta/testes/website && pnpm install` (or `npm install` if pnpm not configured).

- [ ] **Step 2:** `pnpm dev` background, wait for "Ready".

- [ ] **Step 3:** `curl -s http://localhost:3000/papers | grep -oE "Git, do zero"` → should match.

- [ ] **Step 4:** `curl -sI http://localhost:3000/papers/git-paper.html` → 200.

- [ ] **Step 5:** Hand off URL to user for visual verification.

# Git Paper on TrilhaUFPB/website — Design Spec

**Date:** 2026-05-15
**Author:** Pedro Kruta (work.kruta@gmail.com)
**Status:** Approved

## Goal

Publish the "Git, do zero" paper (originally built for `port-kruta`) as a new entry in TrilhaUFPB/website's `/papers` listing, with a fully translated English version and an in-paper PT/EN toggle.

## Non-goals

- Do not modify the `/papers` card layout or `papers/page.tsx`.
- Do not port the "tweaks panel" from the original design (dev-only).
- Do not touch the global i18n provider.
- Do not bundle through Next.js — keep the paper self-contained under `public/`.

## Architecture

### Delivery model

A single self-contained file at `public/papers/git-paper.html`. The existing
`fullstack-paper.html` and `a-first-look-at-machine-learning.html` follow the
same pattern: static HTML served directly from `public/`, linked by the card
as `/papers/${slug}.html`. The card listing on `/papers` already targets that
path — no routing change required.

The paper bootstraps React 18 + ReactDOM + Babel from `unpkg.com` (UMD), with
the original four design files (`viz.jsx`, `panels.jsx`, `paper.jsx`,
`styles.css`) inlined into the HTML inside `<style>` and
`<script type="text/babel">` blocks.

### Bilingual content

A single `COPY` object holds every string in both languages:

```js
const COPY = {
  pt: { hero: {...}, sections: [...], callouts: {...}, ui: {...} },
  en: { hero: {...}, sections: [...], callouts: {...}, ui: {...} },
};
```

Sections are an array of `{ id, num, label, title, body }` where `body` is
authored as React children (or a structured array of rich blocks). The
`PanelThreeAreas / PanelTimeline / PanelBranches / PanelRemote` components
receive a `t` helper for their button labels, "try this" copy, and log
messages.

### Language toggle

A small button in the topbar (right of the meta-tags, replacing the design's
original dark/light toggle) reads:

- `EN` when current lang is `pt`
- `PT` when current lang is `en`

Click flips `lang` state and writes to `localStorage["paper-lang"]`. On boot:

1. If `localStorage["paper-lang"]` set → use it.
2. Else if `localStorage["locale"]` (set by the site's i18n provider) → use
   it.
3. Else if `navigator.language` starts with `en` → `en`.
4. Else → `pt`.

A separate key (`paper-lang` not `locale`) keeps the paper's preference
independent from the site's so they don't fight.

### Card entries

Add one paper entry to both locale JSONs:

```jsonc
// locales/pt/common.json → papers.items
{
  "slug": "git-paper",
  "tag": "Git",
  "title": "Git, do zero",
  "desc": "Um paper amigável de controle de versão pra quem ouve falar de commit, push, branch e finge entender. Modelo mental antes dos comandos.",
  "lang": "PT · EN",
  "author": "Kruta"
}
```

```jsonc
// locales/en/common.json → papers.items
{
  "slug": "git-paper",
  "tag": "Git",
  "title": "Git, from zero",
  "desc": "A friendly version-control paper for those who hear 'commit', 'push', 'branch' and nod along. Mental model before commands.",
  "lang": "PT · EN",
  "author": "Kruta"
}
```

The card's existing `var(--mint-deep)` inline style on `.tag-dot` already
yields the green dot. The footer renders "por Kruta" via the existing
template.

## File layout

```
public/papers/
  git-paper.html              (new — self-contained)

src/locales/
  pt/common.json              (modified — add papers.items entry)
  en/common.json              (modified — add papers.items entry)

docs/superpowers/specs/
  2026-05-15-git-paper-trilha-design.md  (this file)
```

## Translation scope

Translate to English:

- Hero (title, subtitle, deck items, preamble)
- All 8 section titles and bodies (~3,500 words of prose)
- All callouts (`git ≠ github`, `boas mensagens de commit`, `.gitignore`,
  `cuidado` reset warning)
- All code-block comments (`# ...` lines)
- Panel UI: button labels (`edit README.md`, `git add .`, etc.), "try this"
  instructions, command-log output messages, area/column titles
- Outro paragraphs and footer line

Keep untranslated: command names (`git init`, `git commit`), filenames,
hashes, branch names like `main`/`bugfix`.

Translation choices (notes for the writer):

- "Working Directory / Staging / Repository" stays English in both langs.
- "branch", "commit", "push", "pull", "merge", "HEAD", "snapshot" stay
  English in PT (it's how devs talk in Brazil anyway).
- The light tone ("é só uma quarta-feira normal" → "it's just an ordinary
  Wednesday") gets matched in EN, not literally translated.

## Boot sequence

```
HTML loaded
  → React UMD scripts load (deferred bundle)
  → Babel script type="text/babel" blocks transpile inline
  → ReactDOM.createRoot mounts <App/>
  → App reads localStorage to pick initial lang
  → renders <Topbar/> <Hero/> <Section/>×8 <Footer/>
  → 4 PanelXxx components render with embedded state
```

## Testing plan

1. `cd /Users/kruta/testes/website && pnpm install`
2. `pnpm dev` → open http://localhost:3000/papers
3. Card "Git, do zero" should appear with green dot, "por Kruta",
   "PT · EN" badge.
4. Click card → opens `/papers/git-paper.html` in new tab.
5. Default lang should match site locale (or browser).
6. Click the `EN/PT` toggle → all text swaps; interactive panels keep
   their state.
7. Reload → paper remembers the lang choice (localStorage).
8. Site language toggle (top nav) → does NOT change the paper's lang
   (paper has its own preference).
9. All 4 panels work: three areas, timeline, branches, remote — same as
   the original design.

## Open risks

- **Babel + UMD CDN** is slow to first paint and has no integrity hashes
  for some scripts; matches existing pattern but is not ideal. Out of
  scope to fix here.
- The original `Git Paper.html` references `tweaks-panel.jsx` which we
  drop. Need to ensure no remaining references to `TweaksPanel`,
  `useTweaks`, or `TweaksUI` survive in the inlined `paper.jsx`.
- Long inline file (~2,000 lines). Acceptable for static delivery; would
  not survive in production React code, but this isn't that.

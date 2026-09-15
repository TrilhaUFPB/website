# Community website

The homepage now presents Trilha as a community spanning UFPB, Momento, Hack The Path and UFPE. The approved local design was migrated into Next.js components, not embedded as a static page or iframe.

## Routes

- `/`: community landing page, initiatives, history, impact and leadership.
- `/ufpb`: university program; links to the existing `/aulas` and `/materiais`.
- `/ufpe`: coming-soon destination.
- `/historia`: the community's history.
- `/equipe`: organization directory.
- Momento and Hack The Path cards link to `https://momento.sh` and `https://hackthepath.com.br`.

Existing class, material, admin and API routes remain in place.

## Visuals and interactions

`src/components/community/community.css` scopes the approved prototype styles to `.trilha-site`. Other pages retain their existing styling. Poppins and Space Grotesk are loaded using Next fonts. Assets live under `/community/` to avoid replacing assets used by existing pages.

`CommunityEffects.tsx` mounts the canvas globe and pointer lighting and cleans up on navigation. Reduced motion disables pointer lighting; touch devices keep portraits in color. Keyboard arrows rotate the globe and Home returns it to its initial view.

The globe uses the vendored COBE 2.0.1 build, with its MIT license alongside it. Geographic markers are confirmed locations; additional curves illustrate national expansion and do not add confirmed markers. Counts and initiative leadership reflect the content approved during design review. The organization directory is based on the existing project data, with Ralf added and his supplied portrait and LinkedIn profile.

The stylesheet retains the ordered visual overrides from the approved design so migration does not silently change its appearance. Future edits should consolidate these as the design stabilizes.

## Local validation

Run `npm ci`, `npm run build`, then `npm run start -- --port 4318`.
The production build also generates the existing material and class routes.

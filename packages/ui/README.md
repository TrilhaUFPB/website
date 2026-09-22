# @trilha/ui

Shared React components and CSS tokens for the community and UFPB apps. Both apps transpile this workspace directly; no separate package build is needed.

```tsx
import { ButtonLink, ArrowIcon, Container, SectionHeading } from '@trilha/ui';
import '@trilha/ui/styles.css'; // once, in the app root layout

<Container>
  <SectionHeading eyebrow="Comunidade">Aprender juntos.</SectionHeading>
  <ButtonLink href="/aulas" size="lg">Aulas <ArrowIcon /></ButtonLink>
</Container>
```

## Components

- `Button`: native button, default type `button`, supports disabled and native events.
- `ButtonLink`: native anchor for navigation; supports href and native anchor attributes.
- Both accept `variant` (cream/electric/dark) and `size` (sm/md/lg).
- `ArrowIcon`: up-right/down/up/left/right, decorative SVG.
- `Container`: shared responsive content width; does not constrain hero layouts.
- `Eyebrow`, `SectionHeading`: section labels and semantic h2 headings.
- `Card`: article surface, paper/mint/dark. Content and navigation remain explicit children.
- `Badge`: short status or category label.

## Gallery

Run either app in development and open `/dev/components`. The route returns 404 outside development and is marked noindex. Browse categories, change button variants and sizes, test keyboard focus, disabled states, and press interactions. Examples use the exported components directly.

## Ownership

Tokens use the `--trilha-` prefix and components use `ui-` classes. Fonts are supplied by each app’s Next font loader through `--font-poppins`. Existing app styles reference these shared tokens; homepage action buttons and community arrow icons now use package components. Specialized cards, navigation layouts, illustrations, and hero effects remain app-owned. Legacy button selectors still exist for pages not yet migrated; replace them incrementally with Button/ButtonLink instead of adding new duplicates.

Change shared values in `src/styles.css`, then inspect both apps and the gallery. Preserve native button/link semantics and visible focus indicators. Animations respect reduced-motion preferences.

# @trilha/people

Canonical people and cohort data shared by both apps. No app owns these records.

## Data

- `src/data/people.ts`: profiles, founders, historical UFPB organization snapshots, cohort rosters.
- `src/data/students_*.ts`: student profiles by original cohort, referenced by the registry.
- `src/data/cohorts.ts`: periods, cover paths, PT/EN titles and descriptions, student lists. Counts are derived.
- `src/data/testimonials.ts`: student testimonials referencing the same profiles.
- `src/organizations/*.js`: separate current memberships for UFPB, Momento, UFPE, and Hack The Path.
- `src/data/current-organization.ts`: resolves the current UFPB membership snapshot into profiles without modifying historical data.
- `src/data/directory.ts`: canonical profile lookup and derived founder/leader/organizer groups for the main site.

## Consumption

Import `@trilha/people/profiles`, `/cohorts`, `/testimonials`, `/current-organization`, or `/directory`. Import `organizations` and `membershipsFor` from `@trilha/people`.

The UFPB app keeps only a translation hook under `src/data`: it translates shared records, never owns a roster. The main site's PersonCard handles display and its public image URL mapping; names, roles, profiles, and group membership come from this package. Image files are still served by each app’s public directory.

Roles belong to an initiative membership. Nicole can lead Momento and be a UFPB member. Historical `org`/`pos` arrays are UFPB-only legacy fields; do not put other initiatives there. Student cohort membership, founders, historical organization, and current organization are distinct. No 2026.1 student roster is inferred from its organization.

Add a profile once, reference its ID in the applicable initiative list, and add it to a cohort only when confirmed. Build both apps and run this package's tests after changes.

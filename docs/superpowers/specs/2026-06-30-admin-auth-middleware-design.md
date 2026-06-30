# Admin Auth — Middleware + HttpOnly Cookie

**Date:** 2026-06-30  
**Status:** Approved

## Problem

The current `/admin` page uses `React.useState` to track `isAdmin`. Because this is client-side state, anyone can open React DevTools in the browser, find the `AdminDashboard` component, and set `isAdmin = true` to bypass the access check entirely. Firebase Auth is present but adds no real security — the guard is purely in the UI.

## Solution

Replace the client-side auth model with a server-side middleware that blocks unauthenticated access before any HTML is served. A shared username + password (stored as Vercel env vars) is the single credential for the whole organization.

## Architecture

```
Browser → /admin
           ↓
     middleware.ts  (runs on Next.js edge server, before any page loads)
           ↓
     has valid "admin_session" cookie?
       yes → serve /admin
       no  → redirect to /admin/login
           ↓
     user submits username + password
           ↓
     POST /api/admin/login
           ↓
     server compares against ADMIN_USER + ADMIN_PASSWORD env vars
       match   → set HttpOnly cookie, redirect to /admin
       no match → return 401, show error in form
```

## Environment Variables (Vercel)

| Variable | Example |
|---|---|
| `ADMIN_USER` | `trilha` |
| `ADMIN_PASSWORD` | `suasenha` |

No third env var needed. Cookie value is `sha256("user:password")` — stateless and verifiable server-side without a session store.

## Cookie Properties

| Property | Value | Reason |
|---|---|---|
| Name | `admin_session` | — |
| Value | `sha256(ADMIN_USER + ":" + ADMIN_PASSWORD)` | Stateless verification, doesn't expose raw password |
| HttpOnly | `true` | JavaScript cannot read or modify it |
| Secure | `true` | Only sent over HTTPS |
| SameSite | `strict` | Not sent on cross-origin requests |
| MaxAge | `28800` (8 hours) | Forces re-login daily |

## Files

### Create

- **`middleware.ts`** (project root) — matches `/admin` and `/admin/*` except `/admin/login`. Reads `admin_session` cookie, computes expected hash from env vars, redirects to `/admin/login` if missing or invalid.
- **`src/app/admin/login/page.tsx`** — login form with username + password fields, matches existing site design system (Tailwind tokens: `AzulMeiaNoite`, `VerdeMenta`, `Branco`, fonts: `font-poppins`, `font-spaceGrotesk`).
- **`src/app/api/admin/login/route.ts`** — `POST` handler: validates credentials against env vars, sets HttpOnly cookie, returns redirect to `/admin`.
- **`src/app/api/admin/logout/route.ts`** — `POST` handler: clears `admin_session` cookie, redirects to `/admin/login`.

### Modify

- **`src/app/admin/page.tsx`** — remove `<AdminLogin />` import and usage. Just render `<AdminDashboard />`. Middleware guarantees only authenticated users reach this page.
- **`src/components/trilhurna/AdminDashboard.tsx`** — remove `useAdminAuth` import and the `if (!isAdmin)` early return. Add a logout button at the top that calls `POST /api/admin/logout`.

### Delete

- **`src/components/trilhurna/AdminLogin.tsx`** — replaced by `/admin/login` page.
- **`src/hooks/trilhurna/useAdminAuth.ts`** — Firebase Auth removed from admin entirely.

## What Stays Unchanged

- `usePolls`, `CreatePoll`, `AdminDashboard` poll logic — Firebase Firestore for poll CRUD is untouched.
- All other pages and components.

## Security Properties

| Attack | Before | After |
|---|---|---|
| React DevTools `isAdmin = true` | Bypasses dashboard | No effect — middleware blocks the page before React loads |
| Guessing the cookie value | N/A | Must know ADMIN_USER + ADMIN_PASSWORD to compute valid sha256 |
| Intercepting the cookie | Possible on HTTP | Blocked — `Secure` flag requires HTTPS |
| XSS reading the cookie | Possible | Blocked — `HttpOnly` flag |
| CSRF login | Possible | Mitigated — `SameSite: strict` |

## Out of Scope

- Firestore Security Rules: write operations to the `polls` collection still go directly from client to Firestore. This means a determined attacker who knows the collection structure could call the Firebase SDK directly from a browser console. Protecting against this requires Firestore Rules changes and is a separate task.

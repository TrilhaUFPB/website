# Admin Auth Middleware Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the bypassable client-side Firebase Auth on `/admin` with a Next.js middleware that enforces a shared username + password (env vars) before serving any HTML.

**Architecture:** `middleware.ts` at the project root intercepts all `/admin/*` requests (except `/admin/login`) and checks for a valid `admin_session` HttpOnly cookie. The cookie value is `sha256(ADMIN_USER + ":" + ADMIN_PASSWORD)`, computed both at login time (by the API route) and at request time (by the middleware) — stateless, no session store needed. On mismatch or absence the middleware redirects to `/admin/login`.

**Tech Stack:** Next.js 16 App Router, Web Crypto API (`crypto.subtle`), Next.js Edge Middleware, HttpOnly cookies via `NextResponse.cookies`.

## Global Constraints

- No test files — this project has no test suite. Verification steps are manual (browser + curl).
- Use existing CSS classes: `.aulas-input`, `.aulas-form-error`, `.btn`, `.btn--mint` for the login form.
- Fonts: `font-poppins` for headings/labels, `font-spaceGrotesk` for body copy.
- All text facing students/users must be in Portuguese.
- Env vars: `ADMIN_USER` and `ADMIN_PASSWORD` — must be set in Vercel and in `.env.local` for local dev.
- Cookie name: `admin_session`, MaxAge 28800 (8 h), HttpOnly, Secure, SameSite strict.

---

### Task 1: Login and Logout API routes

**Files:**
- Create: `src/app/api/admin/login/route.ts`
- Create: `src/app/api/admin/logout/route.ts`

**Interfaces:**
- Consumes: `ADMIN_USER`, `ADMIN_PASSWORD` env vars
- Produces:
  - `POST /api/admin/login` — accepts `{ username: string, password: string }`, returns `{ ok: true }` (200) or `{ error: string }` (401/500), sets `admin_session` cookie on success
  - `POST /api/admin/logout` — returns `{ ok: true }` (200), deletes `admin_session` cookie

- [ ] **Step 1: Create the login route**

Create `src/app/api/admin/login/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

async function hashCredentials(user: string, password: string): Promise<string> {
  const data = new TextEncoder().encode(`${user}:${password}`);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function POST(req: NextRequest) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const { username, password } = await req.json();

  if (username !== expectedUser || password !== expectedPassword) {
    return NextResponse.json({ error: 'Usuário ou senha incorretos.' }, { status: 401 });
  }

  const token = await hashCredentials(username, password);
  const response = NextResponse.json({ ok: true });
  response.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 28800,
    path: '/',
  });
  return response;
}
```

- [ ] **Step 2: Create the logout route**

Create `src/app/api/admin/logout/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete('admin_session');
  return response;
}
```

- [ ] **Step 3: Add env vars to `.env.local` for local dev**

Create or edit `.env.local` in the project root and add:

```
ADMIN_USER=trilha
ADMIN_PASSWORD=suasenha
```

(Use real values. This file is gitignored — never commit it.)

- [ ] **Step 4: Verify login route manually**

Start the dev server (`npm run dev`) and run:

```bash
curl -s -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"trilha","password":"suasenha"}' \
  -v 2>&1 | grep -E "Set-Cookie|HTTP/|ok"
```

Expected: HTTP 200, `Set-Cookie: admin_session=<hash>; HttpOnly; Secure; SameSite=Strict`

```bash
curl -s -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"wrong","password":"wrong"}'
```

Expected: `{"error":"Usuário ou senha incorretos."}`

- [ ] **Step 5: Commit**

```bash
rtk git add src/app/api/admin/login/route.ts src/app/api/admin/logout/route.ts
rtk git commit -m "feat(admin): add login and logout API routes with HttpOnly cookie"
```

---

### Task 2: Next.js middleware

**Files:**
- Create: `middleware.ts` (project root, alongside `package.json`)

**Interfaces:**
- Consumes: `admin_session` cookie, `ADMIN_USER`, `ADMIN_PASSWORD` env vars
- Produces: passes request through if cookie is valid; redirects to `/admin/login` otherwise

- [ ] **Step 1: Create `middleware.ts`**

Create `middleware.ts` at the project root:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function computeExpectedToken(): Promise<string> {
  const user = process.env.ADMIN_USER ?? '';
  const password = process.env.ADMIN_PASSWORD ?? '';
  const data = new TextEncoder().encode(`${user}:${password}`);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('admin_session');
  const expected = await computeExpectedToken();

  if (cookie?.value !== expected) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/((?!login).*)'],
};
```

Note: the matcher pattern `'/admin/((?!login).*)'` uses a negative lookahead to exclude `/admin/login` from protection, so the login page is always accessible.

- [ ] **Step 2: Verify middleware blocks unauthenticated access**

With the dev server running, visit `http://localhost:3000/admin` in an incognito window (no cookies). Expected: browser redirects to `http://localhost:3000/admin/login`.

- [ ] **Step 3: Verify middleware allows authenticated access**

Log in via the API route to get the cookie:

```bash
curl -s -c /tmp/admin_cookies.txt -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"trilha","password":"suasenha"}'
```

Then check that the admin page is accessible:

```bash
curl -s -b /tmp/admin_cookies.txt http://localhost:3000/admin -I | head -5
```

Expected: `HTTP/1.1 200 OK` (not a redirect).

- [ ] **Step 4: Commit**

```bash
rtk git add middleware.ts
rtk git commit -m "feat(admin): add middleware to protect /admin routes server-side"
```

---

### Task 3: Login page

**Files:**
- Create: `src/app/admin/login/page.tsx`

**Interfaces:**
- Consumes: `POST /api/admin/login` (Task 1)
- Produces: sets the `admin_session` cookie via the API and redirects to `/admin` on success

- [ ] **Step 1: Create the login page**

Create `src/app/admin/login/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error ?? 'Erro ao fazer login.');
      }
    } catch {
      setError('Erro ao conectar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          <div style={{
            background: 'var(--cream)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 16,
            padding: '2rem',
          }}>
            <h1 className="display font-poppins" style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              color: 'var(--ink)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}>
              Admin
            </h1>
            <p className="font-spaceGrotesk" style={{
              color: 'var(--ink-soft)',
              textAlign: 'center',
              marginBottom: '1.5rem',
              fontSize: 14,
            }}>
              TrilhaUFPB
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="font-poppins" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                  Usuário
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="aulas-input"
                  placeholder="usuário"
                  autoComplete="username"
                  required
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="font-poppins" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                  Senha
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="aulas-input"
                  placeholder="senha"
                  autoComplete="current-password"
                  required
                />
              </label>
              {error && <p className="aulas-form-error">{error}</p>}
              <button type="submit" className="btn btn--mint" disabled={loading}>
                {loading ? 'Entrando…' : <>Entrar <span className="arrow">→</span></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify the login page works end-to-end in the browser**

1. Visit `http://localhost:3000/admin` in an incognito window — should redirect to `/admin/login`.
2. Submit wrong credentials — should show "Usuário ou senha incorretos."
3. Submit correct credentials — should redirect to `/admin` and show the dashboard.

- [ ] **Step 3: Commit**

```bash
rtk git add src/app/admin/login/page.tsx
rtk git commit -m "feat(admin): add login page"
```

---

### Task 4: Clean up old Firebase Auth code

**Files:**
- Modify: `src/app/admin/page.tsx`
- Modify: `src/components/trilhurna/AdminDashboard.tsx`
- Delete: `src/components/trilhurna/AdminLogin.tsx`
- Delete: `src/hooks/trilhurna/useAdminAuth.ts`

**Interfaces:**
- Consumes: `POST /api/admin/logout` (Task 1)
- Produces: `AdminDashboard` renders unconditionally (middleware already verified auth); has a logout button

- [ ] **Step 1: Simplify `src/app/admin/page.tsx`**

Replace the entire file with:

```typescript
import { AdminDashboard } from '@/components/trilhurna/AdminDashboard';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-AzulCeu/20 to-Branco py-12">
      <div className="container mx-auto px-4">
        <AdminDashboard />
      </div>
    </div>
  );
}
```

Note: `AdminLogin` import and usage removed. No `'use client'` needed — this is now a Server Component.

- [ ] **Step 2: Update `AdminDashboard` — remove `useAdminAuth`, add logout button**

Replace the entire `src/components/trilhurna/AdminDashboard.tsx` with:

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePolls } from '@/hooks/trilhurna/usePolls';
import { CreatePoll } from './CreatePoll';

export const AdminDashboard = () => {
  const { polls, loading, error, deletePoll } = usePolls();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deletingPoll, setDeletingPoll] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleDeletePoll = async (pollId: string) => {
    if (confirm('Tem certeza que deseja deletar esta enquete? Esta ação não pode ser desfeita.')) {
      setDeletingPoll(pollId);
      try {
        await deletePoll(pollId);
      } catch (error) {
        console.error('Error deleting poll:', error);
      } finally {
        setDeletingPoll(null);
      }
    }
  };

  const copyPollLink = (pollId: string) => {
    const pollUrl = `${window.location.origin}/trilhurna?id=${pollId}`;
    navigator.clipboard.writeText(pollUrl);
    alert('Link da enquete copiado!');
  };

  if (showCreateForm) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => setShowCreateForm(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
          >
            ← Voltar
          </button>
        </div>
        <CreatePoll />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-AzulMeiaNoite font-poppins">
          Admin Dashboard
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-VerdeMenta text-white px-4 py-2 rounded-lg hover:bg-AzulEletrico transition duration-300 font-bold font-poppins text-sm"
          >
            + Nova enquete
          </button>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-sm text-gray-400 hover:text-red-500 transition duration-300 font-spaceGrotesk"
          >
            {loggingOut ? 'Saindo…' : 'Sair'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-VerdeMenta"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {polls.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold text-gray-600 mb-2 font-poppins">
                Nenhuma enquete criada
              </h3>
              <p className="text-gray-500 text-sm font-spaceGrotesk">
                Crie a primeira enquete para começar!
              </p>
            </div>
          ) : (
            polls.map((poll) => (
              <div
                key={poll.id}
                className="bg-Branco p-4 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-AzulMeiaNoite mb-1 font-poppins">
                      {poll.title}
                    </h3>
                    {poll.description && (
                      <p className="text-gray-600 mb-2 text-sm font-spaceGrotesk">
                        {poll.description}
                      </p>
                    )}
                    <div className="text-xs text-gray-500 font-spaceGrotesk">
                      Criado em: {poll.createdAt.toLocaleDateString('pt-BR')}
                      <span className="mx-2">•</span>
                      Total de votos: {poll.totalVotes}
                      <span className="mx-2">•</span>
                      Opções: {poll.options.length}
                      {poll.allowMultipleVotes && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-AzulEletrico">Múltipla escolha (max {poll.maxVotes})</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => copyPollLink(poll.id)}
                      className="bg-AzulEletrico text-white px-2 py-1 rounded text-xs hover:bg-AzulMeiaNoite transition duration-200 font-bold"
                      title="Copiar link"
                    >
                      Copiar
                    </button>
                    <a
                      href={`/trilhurna?id=${poll.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-VerdeMenta text-white px-2 py-1 rounded text-xs hover:bg-AzulEletrico transition duration-200 font-bold"
                      title="Ver enquete"
                    >
                      Ver
                    </a>
                    <button
                      onClick={() => handleDeletePoll(poll.id)}
                      disabled={deletingPoll === poll.id}
                      className={`px-2 py-1 rounded text-xs transition duration-200 font-bold ${
                        deletingPoll === poll.id
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                      title="Deletar"
                    >
                      {deletingPoll === poll.id ? '…' : '×'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {poll.options.map((option) => (
                    <div
                      key={option.id}
                      className="bg-gray-50 p-2 rounded text-center"
                    >
                      <div className="font-medium text-gray-900 text-sm font-poppins">
                        {option.name}
                      </div>
                      <div className="text-xs text-gray-600 font-spaceGrotesk">
                        {option.votes} votos
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 3: Delete the old Firebase Auth files**

```bash
rm src/components/trilhurna/AdminLogin.tsx
rm src/hooks/trilhurna/useAdminAuth.ts
```

- [ ] **Step 4: Verify no remaining imports of deleted files**

```bash
rtk grep -r "AdminLogin\|useAdminAuth" src/
```

Expected: no output (zero results).

- [ ] **Step 5: Verify the full flow in the browser**

1. Visit `http://localhost:3000/admin` in an incognito window → redirects to `/admin/login`.
2. Enter wrong credentials → shows error message.
3. Enter correct credentials → redirects to `/admin`, dashboard loads with polls.
4. Click "Sair" → redirects to `/admin/login`.
5. Open browser DevTools → Application → Cookies → confirm `admin_session` is `HttpOnly` (no JS access).
6. Try `document.cookie` in the console → `admin_session` should NOT appear.

- [ ] **Step 6: Run lint**

```bash
rtk npm run lint
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
rtk git add src/app/admin/page.tsx src/components/trilhurna/AdminDashboard.tsx
rtk git commit -m "feat(admin): replace Firebase Auth with middleware-based session auth"
```

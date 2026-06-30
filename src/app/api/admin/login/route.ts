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

  let username: string | undefined;
  let password: string | undefined;

  try {
    const body = await req.json();
    username = body.username;
    password = body.password;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!username || !password) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Compute hashes for timing-safe comparison
  const submittedHash = await hashCredentials(username, password);
  const expectedHash = await hashCredentials(expectedUser, expectedPassword);

  if (submittedHash !== expectedHash) {
    return NextResponse.json({ error: 'Usuário ou senha incorretos.' }, { status: 401 });
  }

  // Use expected hash as token (derived from server-side credentials)
  const token = expectedHash;
  const response = NextResponse.json({ ok: true });
  response.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 28800,
    path: '/',
  });
  return response;
}

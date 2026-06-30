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

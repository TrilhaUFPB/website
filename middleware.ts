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

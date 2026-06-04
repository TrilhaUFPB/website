import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const sheetsUrl = process.env.SHEETS_URL;
  if (!sheetsUrl) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const body = await req.json();

  await fetch(sheetsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(body),
  });

  return NextResponse.json({ result: 'ok' });
}

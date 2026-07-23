import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type SubmitAulaBody = {
  edition: string;
  aula: string;
  name: string;
  email: string;
  'link-da-tarefa': string;
  observacoes?: string;
};

async function sendConfirmationEmail(data: SubmitAulaBody) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return;

  const port = Number(SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: SMTP_FROM || `Trilha <${SMTP_USER}>`,
    to: data.email,
    subject: `Submissão recebida — ${data.aula}`,
    text: [
      `Olá, ${data.name}!`,
      '',
      `Recebemos a submissão da sua tarefa referente a ${data.aula} (edição ${data.edition}).`,
      `Link enviado: ${data['link-da-tarefa']}`,
      data.observacoes ? `Observações: ${data.observacoes}` : '',
      '',
      'Qualquer dúvida, é só responder este e-mail.',
      '',
      'Equipe Trilha',
    ]
      .filter(Boolean)
      .join('\n'),
  });
}

export async function POST(req: NextRequest) {
  const sheetsUrl = process.env.SHEETS_URL;
  if (!sheetsUrl) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const body: SubmitAulaBody = await req.json();

  await fetch(sheetsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(body),
  });

  try {
    await sendConfirmationEmail(body);
  } catch (err) {
    console.error('Failed to send submission confirmation email', err);
  }

  return NextResponse.json({ result: 'ok' });
}

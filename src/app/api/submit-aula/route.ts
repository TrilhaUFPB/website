import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getSmtpConfig } from '@/lib/smtp-config.cjs';

type SubmitAulaBody = {
  edition: string;
  aula: string;
  name: string;
  email: string;
  'link-da-tarefa': string;
  observacoes?: string;
};

async function sendConfirmationEmail(data: SubmitAulaBody) {
  const { url, from } = getSmtpConfig(process.env);
  const transporter = nodemailer.createTransport(url);

  await transporter.sendMail({
    from,
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

const SMTP_FROM = 'Trilha <contato.trilhaufpb@gmail.com>';

function getSmtpConfig(env) {
  if (!env.SMTP_URL) {
    throw new Error('SMTP_URL is not configured');
  }

  return {
    url: env.SMTP_URL,
    from: SMTP_FROM,
  };
}

module.exports = { getSmtpConfig };

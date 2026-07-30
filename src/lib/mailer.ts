import nodemailer from 'nodemailer';

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const FROM = process.env.SMTP_FROM ?? 'noreply@eaudeparfum.co';
const BRAND = 'EAU DE PARFUM';

function baseTemplate(content: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111111;border:1px solid #2a2a2a;max-width:560px;width:100%;">
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #2a2a2a;text-align:center;">
            <span style="font-family:Georgia,serif;font-size:18px;letter-spacing:6px;color:#c9a96e;text-transform:uppercase;">${BRAND}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            ${content}
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #2a2a2a;text-align:center;">
            <p style="margin:0;font-size:11px;color:#666;letter-spacing:1px;">
              Si no solicitaste esto, puedes ignorar este correo.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const smtpConfigured = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

export async function sendVerificationEmail(to: string, token: string): Promise<void> {
  const url = `${process.env.NEXTAUTH_URL}/verificar?token=${token}`;

  if (!smtpConfigured()) {
    console.log(`\n[AUTH] Verificación de correo para ${to}:\n${url}\n`);
    return;
  }

  const html = baseTemplate(`
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:24px;font-weight:400;color:#f5f0e8;letter-spacing:2px;">Confirma tu correo</h2>
    <p style="margin:0 0 24px;font-size:14px;color:#999;line-height:1.7;">
      Gracias por registrarte. Haz clic en el botón para activar tu cuenta.
    </p>
    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="background:#c9a96e;padding:14px 32px;">
          <a href="${url}" style="font-size:12px;letter-spacing:3px;color:#0a0a0a;text-decoration:none;text-transform:uppercase;font-family:Arial,sans-serif;">Confirmar correo</a>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-size:12px;color:#555;line-height:1.6;">
      Este enlace expira en <strong style="color:#888;">24 horas</strong>.<br>
      Si el botón no funciona copia este enlace:<br>
      <a href="${url}" style="color:#c9a96e;font-size:11px;word-break:break-all;">${url}</a>
    </p>
  `);

  await createTransport().sendMail({ from: FROM, to, subject: `Confirma tu correo — ${BRAND}`, html });
}

export async function sendPasswordResetEmail(to: string, token: string): Promise<void> {
  const url = `${process.env.NEXTAUTH_URL}/nueva-contrasena?token=${token}`;

  if (!smtpConfigured()) {
    console.log(`\n[AUTH] Recuperación de contraseña para ${to}:\n${url}\n`);
    return;
  }

  const html = baseTemplate(`
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:24px;font-weight:400;color:#f5f0e8;letter-spacing:2px;">Recuperar contraseña</h2>
    <p style="margin:0 0 24px;font-size:14px;color:#999;line-height:1.7;">
      Recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón para continuar.
    </p>
    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="background:#c9a96e;padding:14px 32px;">
          <a href="${url}" style="font-size:12px;letter-spacing:3px;color:#0a0a0a;text-decoration:none;text-transform:uppercase;font-family:Arial,sans-serif;">Restablecer contraseña</a>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-size:12px;color:#555;line-height:1.6;">
      Este enlace expira en <strong style="color:#888;">1 hora</strong>.<br>
      Si no solicitaste esto, ignora este mensaje.
    </p>
  `);

  await createTransport().sendMail({ from: FROM, to, subject: `Recuperar contraseña — ${BRAND}`, html });
}

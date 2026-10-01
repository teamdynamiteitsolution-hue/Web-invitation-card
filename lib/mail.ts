import nodemailer from "nodemailer";

export function getMailTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendPasswordResetEmail({
  to,
  username,
  tempPassword,
}: {
  to: string;
  username: string;
  tempPassword: string;
}) {
  const transporter = getMailTransporter();
  const from = process.env.SMTP_FROM || `"উৎসব Invitations" <no-reply@utsab.com>`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px; color: #2C2623; }
          .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 24px; border: 1px solid rgba(212, 175, 55, 0.3); padding: 40px 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
          .logo { font-size: 32px; font-weight: bold; color: #8C4A52; text-align: center; margin-bottom: 24px; font-family: 'Cinzel', serif; }
          .title { font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 12px; color: #2C2623; }
          .text { font-size: 14px; line-height: 1.6; color: #7C7267; text-align: center; margin-bottom: 24px; }
          .box { background: #F9F0EC; border: 2px dashed #D4AF37; border-radius: 16px; padding: 20px; text-align: center; margin: 24px 0; }
          .password { font-size: 28px; font-weight: bold; color: #8C4A52; letter-spacing: 4px; font-family: monospace; }
          .footer { font-size: 11px; color: #A0988F; text-align: center; margin-top: 32px; border-top: 1px solid #ECE7E1; pt: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">উৎসব</div>
          <div class="title">Password Reset Request</div>
          <p class="text">Hello <strong>${username}</strong>,<br>We received a request to reset your password. Use the temporary password below to log in to your account:</p>
          <div class="box">
            <div style="font-size: 11px; text-transform: uppercase; font-weight: bold; color: #7C7267; margin-bottom: 8px;">Temporary Password</div>
            <div class="password">${tempPassword}</div>
          </div>
          <p class="text" style="font-size: 12px;">For your security, please change this password from your Dashboard Settings immediately after logging in.</p>
          <div class="footer">
            If you did not request this password reset, please ignore this email or contact support.
          </div>
        </div>
      </body>
    </html>
  `;

  if (!transporter) {
    console.warn(`[SMTP Warning] SMTP credentials not configured in .env. Password generated for ${to}: ${tempPassword}`);
    return { success: false, reason: "SMTP_NOT_CONFIGURED" };
  }

  await transporter.sendMail({
    from,
    to,
    subject: `Your Temporary Password - উৎসব Invitations`,
    html: htmlContent,
  });

  return { success: true };
}

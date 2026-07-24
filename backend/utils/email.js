/*
import nodemailer from "nodemailer";

const getTransport = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("Email delivery is not configured.");
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
};

export const sendPasswordResetEmail = async ({ to, name, resetUrl }) => {
  const transport = getTransport();
  await transport.sendMail({
    from: process.env.EMAIL_FROM || "FinanceFlow <no-reply@financeflow.app>",
    to,
    subject: "Reset your FinanceFlow password",
    text: `Hi ${name}, reset your FinanceFlow password: ${resetUrl}\n\nThis link expires in 15 minutes. If you did not request it, you can ignore this email.`,
    html: `<div style="background:#0B1120;padding:32px;font-family:Arial,sans-serif;color:#e2e8f0"><div style="max-width:560px;margin:auto;background:#131A2A;border:1px solid #334155;border-radius:24px;padding:32px"><div style="font-size:22px;font-weight:700;color:#fff">FinanceFlow</div><h1 style="font-size:26px;color:#fff;margin:28px 0 12px">Reset your password</h1><p style="line-height:1.6">Hi ${name}, we received a request to reset your FinanceFlow password.</p><a href="${resetUrl}" style="display:inline-block;margin:20px 0;padding:14px 22px;background:#22d3ee;color:#0f172a;text-decoration:none;border-radius:14px;font-weight:700">Reset password</a><p style="font-size:13px;line-height:1.6;color:#94a3b8">This link expires in 15 minutes. If you did not request this, you can safely ignore this email.</p></div></div>`,
  });
};

*/

import nodemailer from "nodemailer";

const getTransport = () => {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    throw new Error("Email delivery is not configured.");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendPasswordResetEmail = async ({ to, name, resetUrl }) => {
  try {
    console.log("🔥 sendPasswordResetEmail CALLED");
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("EMAIL_FROM:", process.env.EMAIL_FROM);
    console.log("Sending To:", to);

    const transport = getTransport();

    console.log("📧 Verifying SMTP...");
    await transport.verify();
    console.log("✅ SMTP verified");

    const info = await transport.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: "Reset your FinanceFlow password",
      text: `Hi ${name}, reset your FinanceFlow password: ${resetUrl}`,
      html: `
        <h2>FinanceFlow Password Reset</h2>
        <p>Hi ${name},</p>
        <p>Click below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    });

    console.log("✅ Email sent successfully");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);

    return info;
  } catch (err) {
    console.error("❌ EMAIL ERROR");
    console.error(err);
    throw err;
  }
};
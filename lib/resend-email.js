import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const fromEmail = process.env.RESEND_FROM_EMAIL || "Sonicite <onboarding@resend.dev>";
const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || "hello@sonicite.ai";
const welcomeTemplateId = process.env.RESEND_WELCOME_TEMPLATE_ID || "welcome-email";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function hasResendConfig() {
  return Boolean(resend);
}

async function sendEmail({ to, subject, html, text, template }) {
  if (!resend) {
    throw new Error("Missing RESEND_API_KEY.");
  }

  const message = {
    from: fromEmail,
    to,
    subject,
    replyTo: replyToEmail,
  };

  if (template) {
    message.template = template;
  } else if (html || text) {
    message.html = html;
    message.text = text;
  } else {
    throw new Error("Missing email template or html/text content.");
  }

  const { data, error } = await resend.emails.send(message);

  if (error) {
    throw new Error(error.message || "Resend email request failed.");
  }

  return data;
}

function buildWelcomeEmail({ locale = "zh", email }) {
  const isZh = locale === "zh";
  const safeEmail = escapeHtml(email);

  return {
    subject: isZh ? "欢迎加入 Sonicite Circle" : "Welcome to the Sonicite Circle",
    template: {
      id: welcomeTemplateId,
    },
    text: isZh
      ? `我们已经收到你的邮箱 ${email}。之后会把 Sonicite 的产品更新、音乐智能笔记和早期体验邀请发给你。`
      : `We received your email ${email}. We will send Sonicite product updates, music intelligence notes, and early access invitations here.`,
    html: isZh
      ? `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#111"><h1 style="font-size:24px">欢迎加入 Sonicite Circle</h1><p>我们已经收到你的邮箱 <strong>${safeEmail}</strong>。</p><p>之后会把 Sonicite 的产品更新、音乐智能笔记和早期体验邀请发给你。</p><p>如果你想直接联系团队，可以回复这封邮件。</p></div>`
      : `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#111"><h1 style="font-size:24px">Welcome to the Sonicite Circle</h1><p>We received your email <strong>${safeEmail}</strong>.</p><p>We will send Sonicite product updates, music intelligence notes, and early access invitations here.</p><p>You can reply to this email if you want to reach the team directly.</p></div>`,
  };
}

function buildContactConfirmationEmail({ locale = "zh", name }) {
  const isZh = locale === "zh";
  const safeName = escapeHtml(name || (isZh ? "你好" : "there"));

  return {
    subject: isZh ? "我们已收到你的 Sonicite 咨询" : "We received your Sonicite message",
    template: {
      id: welcomeTemplateId,
    },
    text: isZh
      ? `${name || "你好"}，我们已经收到你的消息，会尽快回复。`
      : `Hi ${name || "there"}, we received your message and will get back to you soon.`,
    html: isZh
      ? `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#111"><h1 style="font-size:24px">我们已收到你的消息</h1><p>${safeName}，感谢你联系 Sonicite。</p><p>团队已经收到你的提交，会尽快回复。</p></div>`
      : `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#111"><h1 style="font-size:24px">We received your message</h1><p>Hi ${safeName}, thanks for reaching out to Sonicite.</p><p>The team has received your submission and will get back to you soon.</p></div>`,
  };
}

export { buildContactConfirmationEmail, buildWelcomeEmail, hasResendConfig, sendEmail };

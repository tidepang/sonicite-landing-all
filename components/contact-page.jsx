"use client";

import { useEffect, useState } from "react";
import { PageAmbient, SectionRule, SiteFooter, SiteNav } from "./sonicite-shared";

const localeStorageKey = "sonicite-landing-locale";

const copyByLocale = {
  zh: {
    nav: {
      flow: "Flow",
      atmos: "Atmos",
      vibe: "Vibe",
      experiences: "Experiences",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      homeLabel: "Sonicite 首页",
    },
    locale: { zh: "CN", en: "EN" },
    hero: {
      eyebrow: "Contact Sonicite",
      titlePrefix: "Say",
      titleEmphasis: "hello",
      summary: "We'd love to hear from you.",
      bookCall: "Book A Call",
      emailPrompt: "或者发邮件给我们：",
      email: "hello@sonicite.ai",
    },
    section: {
      label: "Write to us",
      title: "Tell us\nwhat's on your mind.",
      body: "One field per thought. No identity boxes, no role pickers — just say what you'd say if we were across the table.",
    },
    form: {
      name: "Your name",
      namePlaceholder: "Jane Smith",
      email: "Your email",
      emailPlaceholder: "jane@example.com",
      message: "Your message",
      messagePlaceholder: "What's on your mind?",
      submit: "Send",
      sending: "发送中...",
      sent: "Sent",
      success: "感谢您的联系！我们会尽快回复。",
      error: "暂时发送失败，请直接邮件联系 hello@sonicite.ai。",
      errors: {
        invalid_fields: "请检查姓名、邮箱和消息内容后再提交。",
        missing_supabase_config: "提交失败：站点还没有配置 Supabase 环境变量。",
        missing_contact_table: "提交失败：数据库里还没有 contact 表。",
        database_write_failed: "提交失败：数据库写入失败，请检查 Supabase 权限或表结构。",
        contact_failed: "暂时发送失败，请直接邮件联系 hello@sonicite.ai。",
      },
    },
  },
  en: {
    nav: {
      flow: "Flow",
      atmos: "Atmos",
      vibe: "Vibe",
      experiences: "Experiences",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      homeLabel: "Sonicite home",
    },
    locale: { zh: "CN", en: "EN" },
    hero: {
      eyebrow: "Contact Sonicite",
      titlePrefix: "Say",
      titleEmphasis: "hello",
      summary: "We'd love to hear from you.",
      bookCall: "Book A Call",
      emailPrompt: "Or email us at ",
      email: "hello@sonicite.ai",
    },
    section: {
      label: "Write to us",
      title: "Tell us\nwhat's on your mind.",
      body: "One field per thought. No identity boxes, no role pickers — just say what you'd say if we were across the table.",
    },
    form: {
      name: "Your name",
      namePlaceholder: "Jane Smith",
      email: "Your email",
      emailPlaceholder: "jane@example.com",
      message: "Your message",
      messagePlaceholder: "What's on your mind?",
      submit: "Send",
      sending: "Sending...",
      sent: "Sent",
      success: "Thanks for reaching out. We will get back to you soon.",
      error: "Sending failed for now. Please email hello@sonicite.ai directly.",
      errors: {
        invalid_fields: "Please check your name, email, and message before submitting.",
        missing_supabase_config: "Submission failed: Supabase environment variables are not configured.",
        missing_contact_table: "Submission failed: the contact database table is missing.",
        database_write_failed: "Submission failed: database write failed. Check Supabase permissions or schema.",
        contact_failed: "Sending failed for now. Please email hello@sonicite.ai directly.",
      },
    },
  },
};

function ContactSignalArt() {
  return (
    <svg className="hv8-art-svg ct-art-svg" viewBox="0 0 520 520" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="ct-glowOrigin" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8b8ff" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#b4c8e8" stopOpacity="0.18" />
          <stop offset="1" stopColor="#0f0f10" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ct-glowTarget" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e8c8a0" stopOpacity="0.45" />
          <stop offset="0.6" stopColor="#e8b4be" stopOpacity="0.15" />
          <stop offset="1" stopColor="#0f0f10" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ct-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8b8ff" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#e8e6de" stopOpacity="0.55" />
          <stop offset="1" stopColor="#e8c8a0" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="ct-arcGhost" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e8e6de" stopOpacity="0.05" />
          <stop offset="0.5" stopColor="#e8e6de" stopOpacity="0.22" />
          <stop offset="1" stopColor="#e8e6de" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <ellipse cx="130" cy="380" rx="160" ry="160" fill="url(#ct-glowOrigin)" className="ct-origin" />
      <ellipse cx="400" cy="150" rx="140" ry="140" fill="url(#ct-glowTarget)" className="ct-target" />
      <path className="ct-arc-ghost" d="M 90 400 C 180 280, 280 220, 430 130" fill="none" stroke="url(#ct-arcGhost)" strokeWidth="1.1" strokeDasharray="2 6" strokeLinecap="round" />
      <path className="ct-arc-main" d="M 100 390 C 190 270, 290 215, 420 140" fill="none" stroke="url(#ct-arc)" strokeWidth="1.4" strokeLinecap="round" pathLength="1" />

      <g className="ct-dots">
        <circle cx="100" cy="390" r="4.5" fill="#f1efe6" />
        <circle cx="160" cy="310" r="2.4" fill="#c8b8ff" />
        <circle cx="230" cy="250" r="2" fill="#b4c8e8" opacity=".85" />
        <circle cx="310" cy="200" r="1.8" fill="#e8e6de" opacity=".7" />
        <circle cx="380" cy="165" r="2.2" fill="#e8c8a0" opacity=".85" />
        <circle cx="420" cy="140" r="5" fill="#f1efe6" />
      </g>

      <g fill="none" stroke="#e8e6de" className="ct-ping ct-ping-origin">
        <circle cx="100" cy="390" r="14" strokeWidth="0.9" opacity=".55" />
        <circle cx="100" cy="390" r="26" strokeWidth="0.7" opacity=".30" />
        <circle cx="100" cy="390" r="40" strokeWidth="0.5" opacity=".15" />
      </g>
      <g fill="none" stroke="#e8c8a0" className="ct-ping ct-ping-target">
        <circle cx="420" cy="140" r="12" strokeWidth="0.9" opacity=".55" />
        <circle cx="420" cy="140" r="22" strokeWidth="0.7" opacity=".30" />
        <circle cx="420" cy="140" r="34" strokeWidth="0.5" opacity=".15" />
      </g>
    </svg>
  );
}

export function ContactPage() {
  const [locale, setLocale] = useState("zh");
  const [status, setStatus] = useState("idle");
  const [errorCode, setErrorCode] = useState("contact_failed");
  const copy = copyByLocale[locale];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryLocale = params.get("lang");
    const storedLocale = window.localStorage.getItem(localeStorageKey);
    const browserLocale = window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
    setLocale(
      queryLocale === "en" || queryLocale === "zh"
        ? queryLocale
        : storedLocale === "en" || storedLocale === "zh"
          ? storedLocale
          : browserLocale,
    );
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem(localeStorageKey, locale);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    window.history.replaceState({}, "", url);
  }, [locale]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setErrorCode("contact_failed");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          role: "",
          message: formData.get("message"),
          locale,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setErrorCode(result?.code || "contact_failed");
        throw new Error("Form submission failed");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="page-shell sc-page page-contact">
      <SiteNav locale={locale} setLocale={setLocale} current="contact" labels={copy} />
      <PageAmbient />

      <main id="top" className="sc-main">
        <section className="hero-v8 contact-hero">
          <div className="hv8-frost" aria-hidden="true"></div>
          <div className="hv8-grain" aria-hidden="true"></div>

          <div className="sc-container hv8-layout contact-hero-layout">
            <div className="hv8-text contact-hero-text">
              <h1 className="hv8-title contact-hero-title">
                {copy.hero.titlePrefix} <em>{copy.hero.titleEmphasis}</em>.
              </h1>
              <p className="hv8-dek contact-hero-dek">{copy.hero.summary}</p>
            </div>

            <div className="hv8-art contact-hero-art" aria-hidden="true">
              <ContactSignalArt />
            </div>
          </div>
        </section>

        <section className="contact-form-section" id="form">
          <div className="sc-container">
            <SectionRule label={copy.section.label} />
            <div className="sc-section-head ct-head">
              <h2 className="sc-section-head-title">
                {copy.section.title.split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </h2>
              <div className="sc-section-head-body">
                <p>{copy.section.body}</p>
              </div>
            </div>

            <form className="ct-form" onSubmit={handleSubmit} noValidate>
              <div className="ct-row ct-row-two">
                <label className="ct-field">
                  <span className="ct-label">{copy.form.name}</span>
                  <input name="name" type="text" placeholder={copy.form.namePlaceholder} autoComplete="name" required />
                  <span className="ct-underline" aria-hidden="true"></span>
                </label>
                <label className="ct-field">
                  <span className="ct-label">{copy.form.email}</span>
                  <input name="email" type="email" placeholder={copy.form.emailPlaceholder} autoComplete="email" required />
                  <span className="ct-underline" aria-hidden="true"></span>
                </label>
              </div>

              <label className="ct-field ct-field-message">
                <span className="ct-label">{copy.form.message}</span>
                <textarea name="message" rows={6} placeholder={copy.form.messagePlaceholder} required />
                <span className="ct-underline" aria-hidden="true"></span>
              </label>

              <div className="ct-actions">
                <button type="submit" className={`ct-submit ${status === "success" ? "is-sent" : ""}`} disabled={status === "sending"}>
                  <span className="ct-submit-label">{status === "sending" ? copy.form.sending : status === "success" ? copy.form.sent : copy.form.submit}</span>
                  <svg className="ct-submit-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {status === "success" ? <span className="ct-form-status is-ok">{copy.form.success}</span> : null}
                {status === "error" ? <span className="ct-form-status is-warn">{copy.form.errors[errorCode] ?? copy.form.error}</span> : null}
              </div>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}

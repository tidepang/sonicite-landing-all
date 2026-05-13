"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const localeStorageKey = "sonicite-landing-locale";
const logoSrc = "/images/sonicite-logo.png";

const copyByLocale = {
  zh: {
    nav: {
      brand: "Flow",
      products: "Atmos",
      highlights: "亮点",
      blog: "Blogs",
      about: "About",
      contact: "Contact",
      homeLabel: "Sonicite 首页",
    },
    locale: { zh: "CN", en: "EN" },
    hero: {
      title: "让我们谈谈您的音乐未来",
      summary: "无论您是 DJ、制作人，还是只是对我们正在构建的内容感到好奇，我们都很乐意听到您的声音。",
      bookCall: "Book A Call",
      emailPrompt: "或者发邮件给我们：",
      email: "hello@sonicite.ai",
    },
    form: {
      name: "您的姓名",
      email: "您的邮箱",
      message: "消息",
      messagePlaceholder: "告诉我们您的想法...",
      submit: "发送消息",
      sending: "发送中...",
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
      brand: "Flow",
      products: "Atmos",
      highlights: "Highlights",
      blog: "Blogs",
      about: "About",
      contact: "Contact",
      homeLabel: "Sonicite home",
    },
    locale: { zh: "CN", en: "EN" },
    hero: {
      title: "Let's talk about your music future",
      summary: "Whether you are a DJ, producer, partner, or simply curious about what we are building, we would love to hear from you.",
      bookCall: "Book A Call",
      emailPrompt: "Or email us at ",
      email: "hello@sonicite.ai",
    },
    form: {
      name: "Your name",
      email: "Your email",
      message: "Message",
      messagePlaceholder: "Tell us what you are thinking...",
      submit: "Send message",
      sending: "Sending...",
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

  const homeHref = `/?lang=${locale}`;
  const blogHref = `/blog?lang=${locale}`;
  const aboutHref = `/about?lang=${locale}`;
  const contactHref = `/contact?lang=${locale}`;
  const bookingHref = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/sonicite";

  return (
    <div className="page-shell content-page-shell">
      <header className="site-header">
        <a className="brandmark" href={homeHref} aria-label={copy.nav.homeLabel}>
          <Image src={logoSrc} alt="sonicite" width={2000} height={800} className="brandmark__logo" priority />
        </a>
        <div className="site-header__right">
          <nav className="site-nav" aria-label="Primary">
            <a href={`${homeHref}#sonicite-card`}>{copy.nav.brand}</a>
            <a href={`${homeHref}#atmos-card`}>{copy.nav.products}</a>
            <a href={blogHref}>{copy.nav.blog}</a>
            <a href={aboutHref}>{copy.nav.about}</a>
            <a href={contactHref} aria-current="page">
              {copy.nav.contact}
            </a>
          </nav>
          <div className="locale-switch" aria-label="Language switch">
            <button className={`locale-switch__button ${locale === "zh" ? "is-active" : ""}`} type="button" onClick={() => setLocale("zh")}>
              {copy.locale.zh}
            </button>
            <button className={`locale-switch__button ${locale === "en" ? "is-active" : ""}`} type="button" onClick={() => setLocale("en")}>
              {copy.locale.en}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="contact-section section">
          <div className="section__inner contact-layout">
            <div className="contact-copy">
              <h1>{copy.hero.title}</h1>
              <p>{copy.hero.summary}</p>
              <div className="contact-primary-actions">
                <a className="contact-booking" href={bookingHref} target="_blank" rel="noreferrer">
                  {copy.hero.bookCall}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
              <p className="contact-email-line">
                {copy.hero.emailPrompt}
                <a href={`mailto:${copy.hero.email}`}>{copy.hero.email}</a>
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                <span>{copy.form.name}</span>
                <input name="name" type="text" required />
              </label>
              <label>
                <span>{copy.form.email}</span>
                <input name="email" type="email" required />
              </label>
              <label className="contact-form__wide">
                <span>{copy.form.message}</span>
                <textarea name="message" placeholder={copy.form.messagePlaceholder} rows={7} required />
              </label>
              <button type="submit" disabled={status === "sending"}>
                {status === "sending" ? copy.form.sending : copy.form.submit}
              </button>
              {status === "success" ? <p className="contact-form__status">{copy.form.success}</p> : null}
              {status === "error" ? (
                <p className="contact-form__status contact-form__status--error">
                  {copy.form.errors[errorCode] ?? copy.form.error}
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

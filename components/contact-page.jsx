"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const localeStorageKey = "sonicite-landing-locale";
const logoSrc = "/images/sonicite-logo.png";

const copyByLocale = {
  zh: {
    nav: {
      brand: "品牌",
      products: "产品",
      highlights: "亮点",
      blog: "博客",
      about: "关于我们",
      contact: "联系",
      homeLabel: "SONICITE 首页",
    },
    locale: { zh: "中文", en: "EN" },
    hero: {
      eyebrow: "Contact",
      title: "让我们谈谈您的音乐未来",
      summary: "无论您是 DJ、制作人，还是只是对我们正在构建的内容感到好奇，我们都很乐意听到您的声音。",
    },
    form: {
      name: "您的姓名",
      email: "您的邮箱",
      role: "角色",
      rolePlaceholder: "选择角色",
      message: "消息",
      messagePlaceholder: "告诉我们您的想法...",
      submit: "发送消息",
      sending: "发送中...",
      success: "感谢您的联系！我们会尽快回复。",
      error: "暂时发送失败，请直接邮件联系 hello@sonicite.ai。",
      roles: ["DJ", "制作人", "唱片公司", "学校", "创作者", "投资者", "其他"],
    },
    details: [
      ["Email", "hello@sonicite.ai"],
      ["Focus", "AI sound intelligence, DJ workflow, spatial music systems"],
      ["For", "Product feedback, partnerships, investment, early users"],
    ],
  },
  en: {
    nav: {
      brand: "Brand",
      products: "Products",
      highlights: "Highlights",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      homeLabel: "SONICITE home",
    },
    locale: { zh: "中文", en: "EN" },
    hero: {
      eyebrow: "Contact",
      title: "Let's talk about your music future",
      summary: "Whether you are a DJ, producer, partner, or simply curious about what we are building, we would love to hear from you.",
    },
    form: {
      name: "Your name",
      email: "Your email",
      role: "Role",
      rolePlaceholder: "Select role",
      message: "Message",
      messagePlaceholder: "Tell us what you are thinking...",
      submit: "Send message",
      sending: "Sending...",
      success: "Thanks for reaching out. We will get back to you soon.",
      error: "Sending failed for now. Please email hello@sonicite.ai directly.",
      roles: ["DJ", "Producer", "Label", "School", "Creator", "Investor", "Other"],
    },
    details: [
      ["Email", "hello@sonicite.ai"],
      ["Focus", "AI sound intelligence, DJ workflow, spatial music systems"],
      ["For", "Product feedback, partnerships, investment, early users"],
    ],
  },
};

export function ContactPage() {
  const [locale, setLocale] = useState("zh");
  const [status, setStatus] = useState("idle");
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

    try {
      const response = await fetch("https://formspree.io/f/mgvglrnq", {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      event.currentTarget.reset();
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

  return (
    <div className="page-shell content-page-shell">
      <header className="site-header">
        <a className="brandmark" href={homeHref} aria-label={copy.nav.homeLabel}>
          <Image src={logoSrc} alt="sonicite" width={2000} height={800} className="brandmark__logo" priority />
        </a>
        <div className="site-header__right">
          <nav className="site-nav" aria-label="Primary">
            <a href={`${homeHref}#brand-thesis`}>{copy.nav.brand}</a>
            <a href={`${homeHref}#product-split`}>{copy.nav.products}</a>
            <a href={`${homeHref}#highlights`}>{copy.nav.highlights}</a>
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
              <p className="eyebrow">{copy.hero.eyebrow}</p>
              <h1>{copy.hero.title}</h1>
              <p>{copy.hero.summary}</p>
              <div className="contact-details">
                {copy.details.map(([label, value]) => (
                  <div className="contact-detail" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
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
              <label>
                <span>{copy.form.role}</span>
                <select name="role" defaultValue="" required>
                  <option value="" disabled>
                    {copy.form.rolePlaceholder}
                  </option>
                  {copy.form.roles.map((role) => (
                    <option value={role} key={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>
              <label className="contact-form__wide">
                <span>{copy.form.message}</span>
                <textarea name="message" placeholder={copy.form.messagePlaceholder} rows={7} required />
              </label>
              <button type="submit" disabled={status === "sending"}>
                {status === "sending" ? copy.form.sending : copy.form.submit}
              </button>
              {status === "success" ? <p className="contact-form__status">{copy.form.success}</p> : null}
              {status === "error" ? <p className="contact-form__status contact-form__status--error">{copy.form.error}</p> : null}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

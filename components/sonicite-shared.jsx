"use client";

import Image from "next/image";

const logoSrc = "/images/sonicite-logo.png";
const flowHref = "https://flow.sonicite.ai/";
const atmosHref = "https://atmos.sonicite.ai/";
const vibeHref = "https://vibe.sonicite.ai/";

export function PageAmbient() {
  return (
    <div className="sc-page-ambient" aria-hidden="true">
      <div className="sc-amb-orb sc-amb-orb-1"></div>
      <div className="sc-amb-orb sc-amb-orb-2"></div>
      <div className="sc-amb-orb sc-amb-orb-3"></div>
    </div>
  );
}

export function SiteNav({ locale, setLocale, current = "home", labels, hideLocaleSwitch = false }) {
  const lang = locale === "zh" ? "zh" : "en";
  const homeHref = `/?lang=${lang}`;
  const blogHref = `/blog?lang=${lang}`;
  const aboutHref = `/about?lang=${lang}`;
  const contactHref = `/contact?lang=${lang}`;
  const experiencesHref = `/experiences?lang=${lang}`;
  const productItems = [
    { id: "flow", href: `/flow?lang=${lang}`, name: "Flow", tag: "面向 DJ" },
    { id: "atmos", href: `/atmos?lang=${lang}`, name: "Atmos", tag: "面向空间" },
    { id: "vibe", href: `/vibe?lang=${lang}`, name: "Vibe", tag: "面向所有人" },
  ];
  const nav = labels?.nav ?? {};
  const localeLabels = labels?.locale ?? { zh: "CN", en: "EN" };

  return (
    <header className="sc-nav-wrap">
      <nav className="sc-nav" aria-label={locale === "zh" ? "主导航" : "Primary"}>
        <a className="sc-nav-logo" href={homeHref} aria-label={nav.homeLabel || "Sonicite home"}>
          <Image src={logoSrc} alt="sonicite" width={2000} height={800} className="sc-logo-img" priority />
        </a>
        <div className="sc-nav-links">
          <div className="sc-product-menu">
            <button className="sc-product-menu-trigger" type="button" aria-current={["flow", "atmos", "vibe"].includes(current) ? "page" : undefined}>
              Product
            </button>
            <div className="sc-product-dropdown" role="menu">
              {productItems.map((item) => (
                <a className="sc-product-dropdown-item" href={item.href} key={item.id} role="menuitem" aria-current={current === item.id ? "page" : undefined}>
                  <span>{item.name}</span>
                  <small>{item.tag}</small>
                </a>
              ))}
            </div>
          </div>
          <a href={experiencesHref} aria-current={current === "experiences" ? "page" : undefined}>
            Experiences
          </a>
          <a href={blogHref} aria-current={current === "blog" ? "page" : undefined}>
            Blog
          </a>
          <a href={aboutHref} aria-current={current === "about" ? "page" : undefined}>
            About
          </a>
          <a href={contactHref} aria-current={current === "contact" ? "page" : undefined}>
            Contact
          </a>
          {hideLocaleSwitch ? null : (
            <div className="sc-lang-switch" role="group" aria-label={locale === "zh" ? "语言" : "Language"}>
              <button className={`sc-lang-btn ${locale === "zh" ? "is-active" : ""}`} type="button" onClick={() => setLocale("zh")}>
                {localeLabels.zh}
              </button>
              <button className={`sc-lang-btn ${locale === "en" ? "is-active" : ""}`} type="button" onClick={() => setLocale("en")}>
                {localeLabels.en}
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export function SectionRule({ label }) {
  return (
    <div className="sc-section-rule">
      <span className="sc-section-rule-label">{label}</span>
    </div>
  );
}

export function SiteFooter({ locale = "en" }) {
  const lang = locale === "zh" ? "zh" : "en";
  const homeHref = `/?lang=${lang}`;
  const copy =
    locale === "zh"
      ? {
          tagline: "让声音终于有意图。",
          products: "产品",
          company: "公司",
          tune: "保持同步",
          body: "不定期发送产品更新、音乐智能笔记和早期体验邀请。",
          placeholder: "your@email.com",
          note: "我们尊重你的隐私，可随时退订。",
          copyright: "© 2026 Sonicite. 保留所有权利。",
        }
      : {
          tagline: "Sound, finally on purpose.",
          products: "Products",
          company: "Company",
          tune: "Stay in tune",
          body: "Product updates, music intelligence notes, and early access — delivered occasionally.",
          placeholder: "your@email.com",
          note: "We respect your privacy. Unsubscribe anytime.",
          copyright: "© 2026 Sonicite. All rights reserved.",
        };

  return (
    <footer className="sc-site-footer">
      <div className="sc-sf-accent" aria-hidden="true"></div>
      <div className="sc-container sc-sf-grid">
        <div className="sc-sf-col sc-sf-brand">
          <a href={homeHref} className="sc-sf-logo" aria-label={locale === "zh" ? "Sonicite 首页" : "Sonicite home"}>
            <Image src={logoSrc} alt="sonicite" width={2000} height={800} className="sc-logo-img" />
          </a>
          <p className="sc-sf-tagline">{copy.tagline}</p>
        </div>

        <nav className="sc-sf-col" aria-label={copy.products}>
          <h5>{copy.products}</h5>
          <ul>
            <li>
              <a href={flowHref}>Sonicite Flow</a>
            </li>
            <li>
              <a href={atmosHref}>Sonicite Atmos</a>
            </li>
            <li>
              <a href={vibeHref}>Sonicite Vibe</a>
            </li>
          </ul>
        </nav>

        <nav className="sc-sf-col" aria-label={copy.company}>
          <h5>{copy.company}</h5>
          <ul>
            <li>
              <a href={`/experiences?lang=${lang}`}>{locale === "zh" ? "现场体验" : "Experiences"}</a>
            </li>
            <li>
              <a href={`/blog?lang=${lang}`}>{locale === "zh" ? "博客" : "Blog"}</a>
            </li>
            <li>
              <a href={`/about?lang=${lang}`}>{locale === "zh" ? "关于" : "About"}</a>
            </li>
            <li>
              <a href={`/contact?lang=${lang}`}>{locale === "zh" ? "联系" : "Contact"}</a>
            </li>
          </ul>
        </nav>

        <div className="sc-sf-col sc-sf-subscribe">
          <h3>{copy.tune}</h3>
          <p>{copy.body}</p>
          <form className="sc-sf-sub-form" onSubmit={(event) => event.preventDefault()}>
            <label className="sc-sf-sub-row">
              <span className="sr-only">{locale === "zh" ? "邮箱" : "Email"}</span>
              <input type="email" name="email" placeholder={copy.placeholder} autoComplete="email" className="sc-sf-sub-input" />
              <button type="submit" className="sc-sf-sub-btn" aria-label={locale === "zh" ? "订阅" : "Subscribe"}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </label>
            <p className="sc-sf-sub-note">{copy.note}</p>
          </form>
        </div>
      </div>

      <div className="sc-container sc-sf-base">
        <div className="sc-sf-base-left">
          <a href={homeHref} className="sc-sf-base-link">
            {locale === "zh" ? "隐私" : "Privacy"}
          </a>
          <a href={homeHref} className="sc-sf-base-link">
            {locale === "zh" ? "条款" : "Terms"}
          </a>
        </div>
        <div className="sc-sf-social" aria-label={locale === "zh" ? "社交媒体" : "Social"}>
          <a href="https://instagram.com/sonicite" target="_blank" rel="noreferrer" className="sc-sf-social-link" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
            </svg>
          </a>
          <a href="https://youtube.com/@sonicite" target="_blank" rel="noreferrer" className="sc-sf-social-link" aria-label="YouTube">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22.5 7.2c-.25-1.5-1-2.4-2.4-2.6C17.8 4.2 12 4.2 12 4.2s-5.8 0-8.1.4c-1.4.2-2.15 1.1-2.4 2.6C1.2 9.4 1.2 12 1.2 12s0 2.6.3 4.8c.25 1.5 1 2.4 2.4 2.6 2.3.4 8.1.4 8.1.4s5.8 0 8.1-.4c1.4-.2 2.15-1.1 2.4-2.6.3-2.2.3-4.8.3-4.8s0-2.6-.3-4.8z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
            </svg>
          </a>
          <a href="https://www.xiaohongshu.com/user/profile/sonicite" target="_blank" rel="noreferrer" className="sc-sf-social-link sc-sf-social-text" aria-label="Xiaohongshu / RED">
            <span>RED</span>
          </a>
          <a href="https://soundcloud.com/sonicite" target="_blank" rel="noreferrer" className="sc-sf-social-link" aria-label="SoundCloud">
            <svg viewBox="0 0 24 16" fill="none" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <line x1="1" y1="10" x2="1" y2="14" />
                <line x1="3" y1="8" x2="3" y2="14" />
                <line x1="5" y1="6" x2="5" y2="14" />
                <line x1="7" y1="4" x2="7" y2="14" />
                <line x1="9" y1="2.5" x2="9" y2="14" />
                <line x1="11" y1="4" x2="11" y2="14" />
              </g>
              <path d="M13 14V6.5c0-.5.5-.9 1-.7 1.8.5 3.2 2 3.5 3.8.6-.4 1.3-.6 2-.6 2 0 3.5 1.5 3.5 3.5S21.5 16 19.5 16H13z" fill="currentColor" opacity="0.92" />
            </svg>
          </a>
          <a href="https://mixcloud.com/sonicite" target="_blank" rel="noreferrer" className="sc-sf-social-link" aria-label="MixCloud">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="7" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </div>
        <div className="sc-sf-base-right">
          <span>{copy.copyright}</span>
        </div>
      </div>
    </footer>
  );
}

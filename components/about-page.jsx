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
      eyebrow: "About Sonicite",
      title: "源于最纯粹的对音乐的热爱",
      summary:
        "我们自己就是 DJ，也是长期沉浸在音乐里的创作者。Sonicite 不是为了替代创作，而是陪音乐人一起做判断。",
    },
    story: {
      index: "01 / 我们的故事",
      title: "把音乐判断变得更清晰，也更安心。",
      paragraphs: [
        "在声音行业，真正稀缺的从来不是声音本身，而是对情绪、能量、结构、音色与场景的判断能力。",
        "在选歌、编排、练习与准备演出的过程中，我们一次次意识到：真正消耗时间与精力的，并不是操作，而是判断。下一首该放什么、怎么接、整套音乐的走向是否成立，这些决定今天几乎完全依赖经验、感觉与记忆。",
        "因此，我们创立了 Sonicite。我们希望音乐人不再被无止境的试错消耗，而是把更多时间留给表达、现场和真正热爱的部分。",
      ],
    },
    mission: [
      {
        label: "使命",
        title: "构建能在人类层面理解音乐的智能工具。",
        text: "我们消除繁琐的工作，放大创造力，为 DJ、制作人和声音创作者提供更稳定的判断支持。",
      },
      {
        label: "愿景",
        title: "让技术与艺术无缝融合。",
        text: "未来，每位音乐创作者都能获得世界级的 AI 辅助。灵感与执行之间的障碍消失，创造力自然流动。",
      },
    ],
    beliefsTitle: "我们的信念",
    beliefs: [
      ["AI 应该走进过程，而不是站在终点", "好的创作从来不是一键生成，而是在一次次判断中慢慢成形。"],
      ["判断，比作品本身更重要", "做出一首歌很难，做出连续、稳定、适合现场的音乐判断更难。"],
      ["时间，应该留给审美与表达", "音乐人的时间不该被反复搜索、试听、整理和试错耗尽。"],
      ["工具应该理解人，而不是训练人", "好的工具应该贴近创作者的习惯，让复杂能力自然进入工作流。"],
    ],
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
      eyebrow: "About Sonicite",
      title: "Built from a pure love of music",
      summary:
        "We are DJs and creators ourselves. Sonicite is not here to replace creation. It helps music people make better judgments.",
    },
    story: {
      index: "01 / Our Story",
      title: "Making musical judgment clearer and calmer.",
      paragraphs: [
        "In sound, the scarce thing is not audio itself. It is the ability to judge emotion, energy, structure, timbre, and context.",
        "While selecting tracks, preparing sets, and shaping musical direction, we kept seeing the same bottleneck: the exhausting part is not operation, but judgment. What comes next, how it transitions, and whether the whole set holds together.",
        "That is why we started Sonicite. We want creators to spend less energy on endless trial and error, and more time on expression, live moments, and the work they genuinely love.",
      ],
    },
    mission: [
      {
        label: "Mission",
        title: "Build intelligent tools that understand music at a human level.",
        text: "We remove tedious work, amplify creativity, and give DJs, producers, and sound creators steadier judgment support.",
      },
      {
        label: "Vision",
        title: "Let technology and art merge naturally.",
        text: "Every music creator should have access to world-class AI assistance, with fewer barriers between inspiration and execution.",
      },
    ],
    beliefsTitle: "What We Believe",
    beliefs: [
      ["AI belongs inside the process", "Strong creative work is not one-click generation. It forms through repeated judgment."],
      ["Judgment matters more than output", "Making a track is hard. Making continuous, contextual musical decisions is harder."],
      ["Time should return to taste and expression", "Creators should not lose their best hours to searching, auditioning, sorting, and retrying."],
      ["Tools should understand people", "Good tools fit the creator's habits and bring complex capability into a natural workflow."],
    ],
  },
};

export function AboutPage() {
  const [locale, setLocale] = useState("zh");
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
            <a href={`${homeHref}#sonicite-card`}>{copy.nav.brand}</a>
            <a href={`${homeHref}#atmos-card`}>{copy.nav.products}</a>
            <a href={blogHref}>{copy.nav.blog}</a>
            <a href={aboutHref} aria-current="page">
              {copy.nav.about}
            </a>
            <a href={contactHref}>{copy.nav.contact}</a>
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
        <section className="content-hero">
          <Image src="/images/sonicite-product.jpg" alt="" fill className="content-hero__image" sizes="100vw" priority />
          <div className="content-hero__overlay"></div>
          <div className="content-hero__inner section__inner">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}</h1>
            <p>{copy.hero.summary}</p>
          </div>
        </section>

        <section className="about-story section">
          <div className="section__inner content-split">
            <div>
              <p className="eyebrow eyebrow--muted">{copy.story.index}</p>
              <h2>{copy.story.title}</h2>
            </div>
            <div className="content-copy">
              {copy.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="about-mission section">
          <div className="section__inner about-mission__grid">
            {copy.mission.map((item) => (
              <article className="about-mission__item" key={item.label}>
                <span>{item.label}</span>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-beliefs section">
          <div className="section__inner content-split">
            <h2>{copy.beliefsTitle}</h2>
            <div className="belief-list">
              {copy.beliefs.map(([title, text]) => (
                <article className="belief-row" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

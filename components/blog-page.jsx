"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { PageAmbient, SectionRule, SiteFooter, SiteNav } from "@/components/sonicite-shared";

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
      homeLabel: "Sonicite home",
    },
    locale: { zh: "CN", en: "EN" },
    hero: {
      title: "Sound intelligence.",
      accent: "In writing.",
      dek: "关于音乐、身份与声音技术的观察。来自 Sonicite 团队的现场笔记，记录我们如何把声音当作系统来认真对待。",
    },
    rule: {
      notes: "All Notes",
      articles: "All Articles",
      featured: "Featured",
    },
    filters: [
      { key: "all", label: "All" },
      { key: "culture", label: "Culture" },
      { key: "story", label: "Story" },
      { key: "insights", label: "Insights" },
      { key: "trend", label: "Trend" },
      { key: "tech", label: "Tech" },
    ],
    readArticle: "Read article",
    empty: "No articles in this topic yet. Try another tag.",
    invite: {
      eyebrow: "Co-creation circle",
      title: "Have insights worth sharing? Got a story, an essay, or a strong take on sound? Join our co-creation circle and write with us.",
      primary: "Get in touch",
      email: "hello@sonicite.ai",
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
      title: "Sound intelligence.",
      accent: "In writing.",
      dek: "Perspectives on music, identity, and the technology behind both. Field notes from people building the system that finally takes sound seriously.",
    },
    rule: {
      notes: "All Notes",
      articles: "All Articles",
      featured: "Featured",
    },
    filters: [
      { key: "all", label: "All" },
      { key: "culture", label: "Culture" },
      { key: "story", label: "Story" },
      { key: "insights", label: "Insights" },
      { key: "trend", label: "Trend" },
      { key: "tech", label: "Tech" },
    ],
    readArticle: "Read article",
    empty: "No articles in this topic yet. Try another tag.",
    invite: {
      eyebrow: "Co-creation circle",
      title: "Have insights worth sharing? Got a story, an essay, or a strong take on sound? Join our co-creation circle and write with us.",
      primary: "Get in touch",
      email: "hello@sonicite.ai",
    },
  },
};

const articleCopy = {
  zh: [
    {
      id: "why-humans-need-music",
      tag: "culture",
      category: "Culture",
      title: "Why Humans Will Always Need Music",
      readTime: "8 min read",
      image: "/images/blog-1.jpg",
      summary: "Music isn't just art — it's one of humanity's oldest survival mechanisms.",
    },
    {
      id: "founder-confession",
      tag: "story",
      category: "Story",
      title: "From The Pure Love of Music",
      readTime: "10 min read",
      image: "/images/blog-2.jpg",
      summary: "Sonicite founder Brenda's musical journey, and why the best products start from personal frustration.",
    },
    {
      id: "how-djs-find-music",
      tag: "insights",
      category: "Insights",
      title: "How Do DJs Find Music?",
      readTime: "7 min read",
      image: "/images/blog-3.jpg",
      summary: "We spoke with 20 professional DJs worldwide to break down how they dig — and what separates taste from knowing a lot of songs.",
    },
    {
      id: "why-clubs-ban-phones",
      tag: "trend",
      category: "Trend",
      title: "Why Are More Clubs Going Phone-Free?",
      readTime: "9 min read",
      image: "/images/blog-4.jpg",
      summary: "From Berlin to Ibiza, nightlife venues are limiting phones to protect immersion, privacy, and authentic dance floor culture.",
    },
    {
      id: "generative-ai-music-industry",
      tag: "tech",
      category: "Tech",
      title: "How Generative AI Is Reshaping the Music Industry",
      readTime: "8 min read",
      image: "/images/blog-5.jpg",
      summary: "From Suno and Udio to AI voice cloning, the way music is created, owned, and experienced is rapidly changing.",
    },
    {
      id: "music-media-evolution",
      tag: "tech",
      category: "Tech",
      title: "From Vinyl to Streaming",
      readTime: "8 min read",
      image: "/images/blog-6.jpg",
      summary: "Over the past century, the evolution of music formats has continuously reshaped how music is produced, distributed, and consumed.",
    },
  ],
  en: [
    {
      id: "why-humans-need-music",
      tag: "culture",
      category: "Culture",
      title: "Why Humans Will Always Need Music",
      readTime: "8 min read",
      image: "/images/blog-1.jpg",
      summary: "Music isn't just art — it's one of humanity's oldest survival mechanisms.",
    },
    {
      id: "founder-confession",
      tag: "story",
      category: "Story",
      title: "From The Pure Love of Music",
      readTime: "10 min read",
      image: "/images/blog-2.jpg",
      summary: "Sonicite founder Brenda's musical journey, and why the best products start from personal frustration.",
    },
    {
      id: "how-djs-find-music",
      tag: "insights",
      category: "Insights",
      title: "How Do DJs Find Music?",
      readTime: "7 min read",
      image: "/images/blog-3.jpg",
      summary: "We spoke with 20 professional DJs worldwide to break down how they dig — and what separates taste from knowing a lot of songs.",
    },
    {
      id: "why-clubs-ban-phones",
      tag: "trend",
      category: "Trend",
      title: "Why Are More Clubs Going Phone-Free?",
      readTime: "9 min read",
      image: "/images/blog-4.jpg",
      summary: "From Berlin to Ibiza, nightlife venues are limiting phones to protect immersion, privacy, and authentic dance floor culture.",
    },
    {
      id: "generative-ai-music-industry",
      tag: "tech",
      category: "Tech",
      title: "How Generative AI Is Reshaping the Music Industry",
      readTime: "8 min read",
      image: "/images/blog-5.jpg",
      summary: "From Suno and Udio to AI voice cloning, the way music is created, owned, and experienced is rapidly changing.",
    },
    {
      id: "music-media-evolution",
      tag: "tech",
      category: "Tech",
      title: "From Vinyl to Streaming",
      readTime: "8 min read",
      image: "/images/blog-6.jpg",
      summary: "Over the past century, the evolution of music formats has continuously reshaped how music is produced, distributed, and consumed.",
    },
  ],
};

function getArticleUrl(article, locale) {
  return `/blog/${article.id}?lang=${locale}`;
}

function BlogHeroArt() {
  return (
    <svg className="blog-hero-svg" viewBox="0 0 520 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <radialGradient id="blogHaloA" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0" stopColor="#c8b8ff" stopOpacity="0.4" />
          <stop offset="0.55" stopColor="#b4c8e8" stopOpacity="0.16" />
          <stop offset="1" stopColor="#0f0f10" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blogHaloB" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e8c8a0" stopOpacity="0.22" />
          <stop offset="1" stopColor="#0f0f10" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="blogRule" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8b8ff" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#b4c8e8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#e8c8a0" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <circle cx="260" cy="260" r="230" fill="url(#blogHaloA)" className="blog-hero-halo" />
      <circle cx="260" cy="260" r="160" fill="url(#blogHaloB)" className="blog-hero-halo blog-hero-halo-secondary" />
      <g className="blog-art-lines" stroke="url(#blogRule)" strokeLinecap="round" fill="none">
        <line x1="120" y1="170" x2="400" y2="170" strokeWidth="1.4" opacity="0.85" />
        <line x1="120" y1="200" x2="360" y2="200" strokeWidth="1.1" opacity="0.55" />
        <line x1="120" y1="230" x2="380" y2="230" strokeWidth="1.1" opacity="0.55" />
        <line x1="120" y1="260" x2="330" y2="260" strokeWidth="1.1" opacity="0.55" />
        <line x1="120" y1="290" x2="370" y2="290" strokeWidth="1.1" opacity="0.55" />
        <line x1="120" y1="320" x2="340" y2="320" strokeWidth="1.1" opacity="0.55" />
        <line x1="120" y1="350" x2="300" y2="350" strokeWidth="1.1" opacity="0.55" />
      </g>
      <path className="blog-art-wave" d="M70 260 Q110 220 150 260 T230 260 T310 260 T390 260 T450 260" fill="none" stroke="#f1efe6" strokeWidth="1.4" strokeLinecap="round" opacity="0.78" />
      <path className="blog-art-wave blog-art-wave-2" d="M70 260 Q110 295 150 260 T230 260 T310 260 T390 260 T450 260" fill="none" stroke="#c8b8ff" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
      <g className="blog-art-dots">
        <circle cx="150" cy="260" r="2.6" fill="#c8b8ff" />
        <circle cx="230" cy="260" r="2.2" fill="#b4c8e8" />
        <circle cx="310" cy="260" r="2.6" fill="#e8c8a0" />
        <circle cx="390" cy="260" r="2.2" fill="#e8b4be" />
      </g>
      <circle cx="260" cy="260" r="3.5" fill="#f1efe6" className="blog-hero-core" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BlogPage() {
  const [locale, setLocale] = useState("zh");
  const [activeTag, setActiveTag] = useState("all");
  const copy = copyByLocale[locale];
  const articles = articleCopy[locale];
  const featured = articles[0];

  const filteredArticles = useMemo(() => {
    if (activeTag === "all") {
      return articles;
    }

    return articles.filter((article) => article.tag === activeTag);
  }, [activeTag, articles]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const queryLocale = params.get("lang");
    const storedLocale = window.localStorage.getItem(localeStorageKey);
    const browserLocale = window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
    const nextLocale =
      queryLocale === "en" || queryLocale === "zh"
        ? queryLocale
        : storedLocale === "en" || storedLocale === "zh"
          ? storedLocale
          : browserLocale;

    setLocale(nextLocale);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem(localeStorageKey, locale);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    window.history.replaceState({}, "", url);
    setActiveTag("all");
  }, [locale]);

  return (
    <div className="sc-page page-blog">
      <SiteNav locale={locale} setLocale={setLocale} current="blog" labels={copy} />
      <PageAmbient />

      <main className="sc-main" id="top">
        <section className="hero-v8 blog-hero" aria-labelledby="blog-page-title">
          <div className="hv8-frost" aria-hidden="true"></div>
          <div className="hv8-grain" aria-hidden="true"></div>

          <div className="sc-container hv8-layout blog-hero-layout">
            <div className="hv8-text">
              <h1 className="hv8-title blog-hero-title" id="blog-page-title">
                <span>{copy.hero.title}</span>
                <br />
                <em>{copy.hero.accent}</em>
              </h1>
              <p className="hv8-dek blog-hero-dek">{copy.hero.dek}</p>
            </div>
            <div className="hv8-art blog-hero-art">
              <BlogHeroArt />
            </div>
          </div>
        </section>

        <section className="blog-filter-section" aria-label="Filter by topic">
          <div className="sc-container">
            <SectionRule label={copy.rule.notes} />
            <div className="bf-bar" role="tablist">
              {copy.filters.map((filter) => (
                <button
                  className={`bf-tag ${activeTag === filter.key ? "is-active" : ""}`}
                  data-tag={filter.key}
                  key={filter.key}
                  type="button"
                  role="tab"
                  aria-selected={activeTag === filter.key}
                  onClick={() => setActiveTag(filter.key)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="blog-featured" data-tag={featured.tag}>
          <div className="sc-container">
            <span className="bf-eyebrow">{copy.rule.featured}</span>
            <a className="bf-card" href={getArticleUrl(featured, locale)}>
              <div className="bf-cover">
                <Image src={featured.image} alt={featured.title} fill priority sizes="(max-width: 880px) 100vw, 58vw" className="bf-cover-inner" />
              </div>
              <div className="bf-body">
                <div className="bf-meta">
                  <span className={`bf-tag-badge bf-tag-${featured.tag}`}>{featured.category}</span>
                  <span className="meta-dot"></span>
                  <span className="bf-read">{featured.readTime}</span>
                </div>
                <h2 className="bf-title">{featured.title}</h2>
                <p className="bf-summary">{featured.summary}</p>
                <span className="bf-cta">
                  <span>{copy.readArticle}</span>
                  <ArrowIcon />
                </span>
              </div>
            </a>
          </div>
        </section>

        <section className="blog-grid-section">
          <div className="sc-container">
            <SectionRule label={copy.rule.articles} />
            <div className="bg-grid" id="blog-grid">
              {filteredArticles.map((article) => (
                <a className="bg-card" data-tag={article.tag} href={getArticleUrl(article, locale)} key={article.id}>
                  <div className="bg-cover">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      loading="eager"
                      sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
                      className="bg-cover-inner"
                    />
                  </div>
                  <div className="bg-card-body">
                    <div className="bg-meta">
                      <span className={`bg-tag bg-tag-${article.tag}`}>{article.category}</span>
                      <span className="meta-dot"></span>
                      <span className="bg-read">{article.readTime}</span>
                    </div>
                    <h3 className="bg-title">{article.title}</h3>
                    <p className="bg-summary">{article.summary}</p>
                  </div>
                </a>
              ))}
            </div>
            {filteredArticles.length === 0 ? <p className="bg-empty">{copy.empty}</p> : null}
          </div>
        </section>

        <section className="blog-index-invitation">
          <div className="sc-container">
            <div className="about-invitation-card">
              <div className="blog-inv-art" aria-hidden="true">
                <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <radialGradient id="blogInvGradA" cx="0.2" cy="0.4" r="0.7">
                      <stop offset="0" stopColor="#c8b8ff" stopOpacity="0.55" />
                      <stop offset="1" stopColor="#c8b8ff" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="blogInvGradB" cx="0.8" cy="0.7" r="0.65">
                      <stop offset="0" stopColor="#e8b4be" stopOpacity="0.5" />
                      <stop offset="1" stopColor="#e8b4be" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="blogInvStroke" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#c8b8ff" stopOpacity="0.7" />
                      <stop offset="1" stopColor="#e8c8a0" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  <rect width="320" height="220" fill="url(#blogInvGradA)" />
                  <rect width="320" height="220" fill="url(#blogInvGradB)" />
                  <g fill="none" stroke="url(#blogInvStroke)" strokeLinecap="round" className="blog-inv-rings">
                    <circle cx="260" cy="110" r="40" strokeWidth="1.1" opacity="0.7" />
                    <circle cx="260" cy="110" r="68" strokeWidth="0.9" opacity="0.45" />
                    <circle cx="260" cy="110" r="96" strokeWidth="0.7" opacity="0.25" />
                  </g>
                  <path className="blog-inv-wave" d="M20 140 Q60 110 100 140 T180 140 T260 140 T320 140" fill="none" stroke="#e8e6de" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
                  <g className="blog-inv-dots">
                    <circle cx="260" cy="110" r="2.6" fill="#f1efe6" />
                    <circle cx="220" cy="96" r="1.8" fill="#c8b8ff" />
                    <circle cx="296" cy="130" r="1.6" fill="#e8c8a0" />
                  </g>
                </svg>
              </div>
              <div className="about-inv-content">
                <span>{copy.invite.eyebrow}</span>
                <h3>
                  Have insights worth <em>sharing</em>? Got a story, an essay, or a <em>strong take</em> on sound? Join our co-creation circle and write with us.
                </h3>
                <div>
                  <a href={`/contact?lang=${locale}`}>
                    {copy.invite.primary}
                    <ArrowIcon />
                  </a>
                  <a href="mailto:hello@sonicite.ai">{copy.invite.email}</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}

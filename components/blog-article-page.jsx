"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { PageAmbient, SectionRule, SiteFooter, SiteNav } from "@/components/sonicite-shared";
import { articleCopyByLocale, getArticle, getRelatedArticles } from "@/components/blog-article-data";

const localeStorageKey = "sonicite-landing-locale";

const navCopyByLocale = {
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
    actions: {
      back: "Back to Blog",
      related: "Related Reading",
      share: "Share",
      copied: "Copied",
      read: "Read article",
      inviteEyebrow: "Co-creation circle",
      inviteTitle: "Have insights worth sharing? Got a story, an essay, or a strong take on sound? Join our co-creation circle and write with us.",
      invitePrimary: "Get in touch",
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
    actions: {
      back: "Back to Blog",
      related: "Related Reading",
      share: "Share",
      copied: "Copied",
      read: "Read article",
      inviteEyebrow: "Co-creation circle",
      inviteTitle: "Have insights worth sharing? Got a story, an essay, or a strong take on sound? Join our co-creation circle and write with us.",
      invitePrimary: "Get in touch",
    },
  },
};

const cloneArticleMeta = {
  "why-humans-need-music": {
    titleParts: ["Why Humans Will Always Need ", "Music", ""],
    title: "Why Humans Will Always Need Music",
    category: "Culture",
    tag: "culture",
    date: "Jun 04 2026",
    readTime: "8 min read",
    byline: "Sonicite",
    image: "/images/blog-1.jpg",
    summary:
      "Music isn't just art — it's one of humanity's oldest survival mechanisms. From physiological rhythm to social bonding, emotional release to memory — as long as we feel, music will always matter.",
  },
  "founder-confession": {
    titleParts: ["From The Pure ", "Love", " of Music"],
    title: "From The Pure Love of Music",
    category: "Story",
    tag: "story",
    date: "May 28 2026",
    readTime: "10 min read",
    byline: "Brenda Xia",
    image: "/images/blog-2.jpg",
    summary:
      "From guzheng to raves, from the DJ booth to building AI tools — Sonicite founder Brenda's musical journey, and why the best products start from personal frustration.",
  },
  "how-djs-find-music": {
    titleParts: ["How Do ", "DJs", " Find Music?"],
    title: "How Do DJs Find Music?",
    category: "Insights",
    tag: "insights",
    date: "May 14 2026",
    readTime: "7 min read",
    byline: "Sonicite",
    image: "/images/blog-3.jpg",
    summary:
      "Finding music has never been the easy part of a DJ's job. We spoke with 20 professional DJs worldwide to break down how they dig, which platforms they trust, and what separates taste from just knowing a lot of songs.",
  },
  "why-clubs-ban-phones": {
    titleParts: ["Why Are More Clubs Going ", "Phone-Free", "?"],
    title: "Why Are More Clubs Going Phone-Free?",
    category: "Trend",
    tag: "trend",
    date: "Apr 30 2026",
    readTime: "9 min read",
    byline: "Sonicite",
    image: "/images/blog-4.jpg",
    summary:
      "From Berlin to Ibiza, nightlife venues are limiting phones to protect immersion, privacy, and authentic dance floor culture. This article explores how smartphones are reshaping club experiences, DJ performance, and the future of nightlife itself.",
  },
  "generative-ai-music-industry": {
    titleParts: ["How ", "Generative AI", " Is Reshaping the Music Industry"],
    title: "How Generative AI Is Reshaping the Music Industry",
    category: "Tech",
    tag: "tech",
    date: "Apr 16 2026",
    readTime: "8 min read",
    byline: "Sonicite",
    image: "/images/blog-5.jpg",
    summary:
      "From Suno and Udio to AI voice cloning, the way music is created, owned, and experienced is rapidly changing. Music is no longer static content, but a dynamic, generative experience.",
  },
  "music-media-evolution": {
    titleParts: ["From ", "Vinyl", " to Streaming"],
    title: "From Vinyl to Streaming",
    category: "Tech",
    tag: "tech",
    date: "Apr 02 2026",
    readTime: "8 min read",
    byline: "Sonicite",
    image: "/images/blog-6.jpg",
    summary:
      "Over the past century, the evolution of music formats has continuously reshaped how music is produced, distributed, and consumed. Technology has become the core logic of the music industry itself.",
  },
};

const cloneRelatedIds = {
  "why-humans-need-music": ["founder-confession", "music-media-evolution", "why-clubs-ban-phones"],
  "founder-confession": ["why-humans-need-music", "how-djs-find-music", "generative-ai-music-industry"],
  "how-djs-find-music": ["founder-confession", "generative-ai-music-industry", "why-clubs-ban-phones"],
  "why-clubs-ban-phones": ["why-humans-need-music", "founder-confession", "how-djs-find-music"],
  "generative-ai-music-industry": ["music-media-evolution", "how-djs-find-music", "why-humans-need-music"],
  "music-media-evolution": ["generative-ai-music-industry", "why-humans-need-music", "founder-confession"],
};

function enhanceArticle(article) {
  if (!article) {
    return null;
  }

  const cloneMeta = cloneArticleMeta[article.id];

  if (!cloneMeta) {
    return {
      ...article,
      tag: "culture",
      titleParts: [article.title, "", ""],
      byline: "Sonicite",
    };
  }

  return {
    ...article,
    ...cloneMeta,
    body: article.body,
  };
}

function renderTitle(article) {
  const [before, emphasis, after] = article.titleParts ?? [article.title, "", ""];

  if (!emphasis) {
    return article.title;
  }

  return (
    <>
      {before}
      <em>{emphasis}</em>
      {after}
    </>
  );
}

function renderBlock(block, index) {
  if (block.type === "lead") {
    return (
      <p className="ab-lead" key={`${block.type}-${index}`}>
        {block.text}
      </p>
    );
  }

  if (block.type === "heading") {
    return <h2 key={`${block.type}-${index}`}>{block.text}</h2>;
  }

  if (block.type === "quote") {
    return <blockquote key={`${block.type}-${index}`}>{block.text}</blockquote>;
  }

  return <p key={`${block.type}-${index}`}>{block.text}</p>;
}

function ArrowIcon({ direction = "right" }) {
  if (direction === "left") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M19 12H5M11 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 3h3l-7.5 8.6L22 21h-6.8l-5.3-6.4L3.8 21H1l8-9.2L1 3h6.9l4.8 5.8L18 3zm-1.2 16h1.7L7.3 5H5.5l11.3 14z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 14a4 4 0 015.66 0l3-3a4 4 0 00-5.66-5.66l-1.5 1.5M14 10a4 4 0 01-5.66 0l-3 3a4 4 0 005.66 5.66l1.5-1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BlogInvitation({ copy, locale }) {
  return (
    <section className="blog-invitation">
      <div className="sc-container">
        <div className="about-invitation-card">
          <div className="blog-inv-art" aria-hidden="true">
            <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="blogArticleInvGradA" cx="0.2" cy="0.4" r="0.7">
                  <stop offset="0" stopColor="#c8b8ff" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#c8b8ff" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="blogArticleInvGradB" cx="0.8" cy="0.7" r="0.65">
                  <stop offset="0" stopColor="#e8b4be" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#e8b4be" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="blogArticleInvStroke" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#c8b8ff" stopOpacity="0.7" />
                  <stop offset="1" stopColor="#e8c8a0" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <rect width="320" height="220" fill="url(#blogArticleInvGradA)" />
              <rect width="320" height="220" fill="url(#blogArticleInvGradB)" />
              <g fill="none" stroke="url(#blogArticleInvStroke)" strokeLinecap="round" className="blog-inv-rings">
                <circle cx="260" cy="110" r="40" strokeWidth="1.1" opacity="0.7" />
                <circle cx="260" cy="110" r="68" strokeWidth="0.9" opacity="0.45" />
                <circle cx="260" cy="110" r="96" strokeWidth="0.7" opacity="0.25" />
              </g>
              <path className="blog-inv-wave" d="M20 140 Q60 110 100 140 T180 140 T260 140 T320 140" fill="none" stroke="#e8e6de" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
              <circle cx="260" cy="110" r="2.6" fill="#f1efe6" />
              <circle cx="220" cy="96" r="1.8" fill="#c8b8ff" />
              <circle cx="296" cy="130" r="1.6" fill="#e8c8a0" />
            </svg>
          </div>
          <div className="about-inv-content">
            <span>{copy.actions.inviteEyebrow}</span>
            <h3>{copy.actions.inviteTitle}</h3>
            <div>
              <a href={`/contact?lang=${locale}`}>
                {copy.actions.invitePrimary}
                <ArrowIcon />
              </a>
              <a href="mailto:hello@sonicite.ai">hello@sonicite.ai</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BlogArticlePage({ slug, fallbackCopy, initialArticle, initialRelatedArticles = [] }) {
  const [locale, setLocale] = useState("zh");
  const [copied, setCopied] = useState(false);
  const copy = navCopyByLocale[locale] ?? fallbackCopy ?? navCopyByLocale.zh;
  const article = enhanceArticle(getArticle(locale, slug) ?? initialArticle ?? getArticle("zh", slug));
  const relatedArticles = useMemo(() => {
    if (cloneRelatedIds[slug]) {
      return cloneRelatedIds[slug]
        .map((id) => enhanceArticle(getArticle(locale, id) ?? getArticle("zh", id)))
        .filter(Boolean);
    }

    const fromLocale = getRelatedArticles(locale, slug);
    const related = fromLocale.length > 0 ? fromLocale : initialRelatedArticles;
    return related.map(enhanceArticle).filter(Boolean).slice(0, 3);
  }, [initialRelatedArticles, locale, slug]);

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
  }, [locale]);

  if (!article) {
    return null;
  }

  const blogHref = `/blog?lang=${locale}`;

  const handleShare = () => {
    if (typeof window === "undefined") {
      return;
    }

    const text = encodeURIComponent(`Read this on Sonicite: ${article.title}`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    if (typeof window === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="sc-page page-blog page-blog-single">
      <SiteNav locale={locale} setLocale={setLocale} current="blog" labels={copy} />
      <PageAmbient />

      <main className="sc-main" id="top">
        <article>
          <section className="article-hero">
            <div className="sc-container article-hero-container">
              <h1 className="ah-title">{renderTitle(article)}</h1>
              <p className="ah-summary">{article.summary}</p>

              <div className="ah-metabar">
                <span className={`ah-tag ah-tag-${article.tag}`}>{article.category}</span>
                <span className="ah-meta-dot"></span>
                <span className="ah-meta-item">{article.date}</span>
                <span className="ah-meta-dot"></span>
                <span className="ah-meta-item">{article.readTime}</span>
                <span className="ah-meta-dot"></span>
                <span className="ah-meta-item ah-byline-inline">
                  By <strong>{article.byline}</strong>
                </span>
              </div>

              <div className="ah-cover">
                <Image src={article.image} alt={article.title} fill priority sizes="(max-width: 760px) 100vw, 1200px" className="ah-cover-img" />
              </div>
            </div>
          </section>

          <section className="article-body">
            <div className="sc-container">
              <div className="ab-content">{article.body.map(renderBlock)}</div>
            </div>
          </section>

          <section className="article-share">
            <div className="sc-container">
              <div className="as-row">
                <a className="as-back" href={blogHref}>
                  <ArrowIcon direction="left" />
                  <span>{copy.actions.back}</span>
                </a>
                <div className="as-share">
                  <span className="as-share-label">{copied ? copy.actions.copied : copy.actions.share}</span>
                  <button aria-label="Share on X" type="button" onClick={handleShare}>
                    <ShareIcon />
                  </button>
                  <button aria-label="Copy link" type="button" onClick={handleCopy}>
                    <LinkIcon />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </article>

        <section className="article-related">
          <div className="sc-container">
            <SectionRule label={copy.actions.related} />
            <div className="ar-grid">
              {relatedArticles.map((related) => (
                <a className="bg-card" href={`/blog/${related.id}?lang=${locale}`} key={related.id}>
                  <div className="bg-cover">
                    <Image src={related.image} alt={related.title} fill loading="eager" sizes="(max-width: 640px) 100vw, 33vw" className="bg-cover-inner" />
                  </div>
                  <div className="bg-card-body">
                    <div className="bg-meta">
                      <span className={`bg-tag bg-tag-${related.tag}`}>{related.category}</span>
                    </div>
                    <h3 className="bg-title">{related.title}</h3>
                    <p className="bg-summary">{related.summary}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <BlogInvitation copy={copy} locale={locale} />
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}

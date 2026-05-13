"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { articleCopyByLocale, getArticle, getRelatedArticles } from "@/components/blog-article-data";

const localeStorageKey = "sonicite-landing-locale";
const logoSrc = "/images/sonicite-logo.png";

function renderBlock(block, index) {
  if (block.type === "lead") {
    return (
      <p className="article-content__lead" key={`${block.type}-${index}`}>
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

export function BlogArticlePage({ slug, fallbackCopy, initialArticle, initialRelatedArticles = [] }) {
  const [locale, setLocale] = useState("zh");
  const copy = articleCopyByLocale[locale] ?? fallbackCopy;
  const article = initialArticle ?? getArticle(locale, slug) ?? getArticle("zh", slug);
  const relatedArticles = useMemo(
    () => (initialRelatedArticles.length > 0 ? initialRelatedArticles : getRelatedArticles(locale, slug)),
    [initialRelatedArticles, locale, slug],
  );

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
    <div className="page-shell blog-page-shell article-shell">
      <header className="site-header">
        <a className="brandmark" href={homeHref} aria-label={copy.nav.homeLabel}>
          <Image src={logoSrc} alt="sonicite" width={2000} height={800} className="brandmark__logo" priority />
        </a>

        <div className="site-header__right">
          <nav className="site-nav" aria-label="Primary">
            <a href={`${homeHref}#sonicite-card`}>{copy.nav.brand}</a>
            <a href={`${homeHref}#atmos-card`}>{copy.nav.products}</a>
            <a href={blogHref} aria-current="page">
              {copy.nav.blog}
            </a>
            <a href={aboutHref}>{copy.nav.about}</a>
            <a href={contactHref}>{copy.nav.contact}</a>
          </nav>

          <div className="locale-switch" aria-label="Language switch">
            <button
              className={`locale-switch__button ${locale === "zh" ? "is-active" : ""}`}
              type="button"
              onClick={() => setLocale("zh")}
              aria-pressed={locale === "zh"}
            >
              {copy.locale.zh}
            </button>
            <button
              className={`locale-switch__button ${locale === "en" ? "is-active" : ""}`}
              type="button"
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
            >
              {copy.locale.en}
            </button>
          </div>
        </div>
      </header>

      <main>
        <article className="article-detail">
          <header className="article-hero section__inner">
            <a className="article-back-link" href={blogHref}>
              <span aria-hidden="true">←</span>
              <span>{copy.actions.back}</span>
            </a>
            <div className="article-hero__meta">
              <span>{article.category}</span>
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
            <h1>{article.title}</h1>
            <p>{article.summary}</p>
          </header>

          <div className="article-cover section__inner">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="article-cover__image"
              sizes="(max-width: 960px) 100vw, 1100px"
              priority
            />
          </div>

          <div className="article-layout section__inner">
            <aside className="article-sidebar" aria-label="Article information">
              <span>{article.category}</span>
              <strong>{article.date}</strong>
              <p>{article.readTime}</p>
            </aside>

            <div className="article-content">{article.body.map(renderBlock)}</div>
          </div>
        </article>

        <section className="article-related" aria-labelledby="article-related-title">
          <div className="section__inner">
            <h2 id="article-related-title">{copy.actions.related}</h2>
            <div className="article-related__grid">
              {relatedArticles.map((related) => (
                <article className="article-related-card" key={related.id}>
                  <a className="article-related-card__image" href={`/blog/${related.id}?lang=${locale}`}>
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="journal-card__image"
                      sizes="(max-width: 960px) 100vw, 33vw"
                    />
                  </a>
                  <div>
                    <span>{related.category}</span>
                    <h3>
                      <a href={`/blog/${related.id}?lang=${locale}`}>{related.title}</a>
                    </h3>
                    <p>{related.summary}</p>
                    <a className="journal-card__link" href={`/blog/${related.id}?lang=${locale}`}>
                      <span>{copy.actions.article}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

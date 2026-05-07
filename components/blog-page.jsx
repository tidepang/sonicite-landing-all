"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { articleListCopyByLocale } from "@/components/blog-article-list";

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
    locale: {
      zh: "中文",
      en: "EN",
    },
    hero: {
      eyebrow: "SONICITE Journal",
      title: "关于声音智能、空间与音乐工作流的文章。",
      summary:
        "记录 SONICITE 如何理解音乐、编排场景，并把声音从素材变成可运营的系统。",
      latest: "最新文章",
      read: "阅读全文",
    },
    filters: ["全部", "品牌", "技术", "产品", "现场"],
    archiveTitle: "所有文章",
    newsletter: {
      title: "接收下一篇文章",
      description: "我们会把关于音乐智能、产品更新和空间声音实践的内容发给你。",
      placeholder: "输入您的邮箱",
      submit: "订阅",
    },
    articles: [
      {
        id: "sound-judgment",
        title: "声音判断为什么需要系统化",
        category: "品牌",
        date: "2026.05.03",
        readTime: "6 min",
        image: "/images/atmos-product.jpg",
        summary:
          "音乐不是背景填充，而是空间体验的一部分。当品牌把声音当作系统来运营，氛围、节奏和顾客感受才会进入同一条曲线。",
        excerpt:
          "在商业空间里，声音常常被放到最后处理：开店前选一个歌单，营业时让它自己播放。问题不在于歌单不好，而在于它无法理解当下。早高峰、午后、夜晚、节假日和活动现场，需要的是不同的能量结构。",
      },
      {
        id: "recommendation-context",
        title: "为什么音乐推荐不够用",
        category: "技术",
        date: "2026.04.22",
        readTime: "8 min",
        image: "/images/sonicite-product.jpg",
        summary:
          "推荐算法解决的是喜好匹配，SONICITE 关心的是语境匹配：这首歌是否适合此刻、这个人、这个空间和这段节奏。",
        excerpt:
          "传统推荐系统会问：用户可能喜欢什么？声音智能还要继续追问：这个场景需要什么？当问题改变，特征、排序和交互方式也会改变。",
      },
      {
        id: "atmos-daypart",
        title: "Atmos 如何编排一整天的声音氛围",
        category: "产品",
        date: "2026.04.15",
        readTime: "7 min",
        image: "/images/atmos-product.jpg",
        summary:
          "从开门、午间、晚高峰到收店，Atmos 把不同营业时段拆成可管理的声音片段。",
        excerpt:
          "一天里的声音不是一条直线。Atmos 关注时段、客流、空间属性和品牌性格，让播放从随机歌单变成可以调整和复用的运营资产。",
      },
      {
        id: "dj-workflow",
        title: "从 DJ 台开始重做音乐理解工作流",
        category: "现场",
        date: "2026.04.03",
        readTime: "5 min",
        image: "/images/sonicite-product.jpg",
        summary:
          "DJ 对音乐的判断很快，但准备过程仍然依赖记忆和反复试听。Sonicite 试图让理解更快进入可用状态。",
        excerpt:
          "能量、情绪、段落、过渡空间和现场语境，这些信息原本散落在经验里。我们把它们整理成更直接的阅读界面。",
      },
      {
        id: "architecture",
        title: "SONICITE 架构里的四个核心能力",
        category: "技术",
        date: "2026.03.28",
        readTime: "9 min",
        image: "/images/sonicite-product.jpg",
        summary:
          "理解、搜索、编排、操作，这四个模块共同决定声音智能能不能真正落地。",
        excerpt:
          "理解负责把音乐变成结构化线索，搜索负责让意图进入音乐库，编排负责形成连续的声音路径，操作负责让方案进入真实场景。",
      },
      {
        id: "brand-memory",
        title: "品牌记忆里，声音应该占一个位置",
        category: "品牌",
        date: "2026.03.12",
        readTime: "6 min",
        image: "/images/atmos-product.jpg",
        summary:
          "视觉、空间和服务之外，声音同样会影响顾客对品牌的记忆。它需要稳定，也需要随场景变化。",
        excerpt:
          "好的品牌声音不是固定播放同一类音乐，而是在稳定的性格之下拥有变化能力。它既要能被识别，也要能适应不同现场。",
      },
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
    locale: {
      zh: "中文",
      en: "EN",
    },
    hero: {
      eyebrow: "SONICITE Journal",
      title: "Notes on sound intelligence, spaces, and music workflows.",
      summary:
        "How SONICITE understands music, orchestrates context, and turns sound from material into an operating system.",
      latest: "Latest Article",
      read: "Read Article",
    },
    filters: ["All", "Brand", "Tech", "Product", "Live"],
    archiveTitle: "All Articles",
    newsletter: {
      title: "Get the next article",
      description: "Product updates, music intelligence notes, and spatial sound practices.",
      placeholder: "Enter your email",
      submit: "Subscribe",
    },
    articles: [
      {
        id: "sound-judgment",
        title: "Why sonic judgment needs a system",
        category: "Brand",
        date: "2026.05.03",
        readTime: "6 min",
        image: "/images/atmos-product.jpg",
        summary:
          "Music is not background filler. When brands operate sound as a system, atmosphere, rhythm, and customer experience can move together.",
        excerpt:
          "In commercial spaces, sound is often handled last: choose a playlist before opening and let it run. The issue is not that playlists are bad. The issue is that they do not understand the moment.",
      },
      {
        id: "recommendation-context",
        title: "Why music recommendation is not enough",
        category: "Tech",
        date: "2026.04.22",
        readTime: "8 min",
        image: "/images/sonicite-product.jpg",
        summary:
          "Recommendation solves taste matching. SONICITE cares about context matching: whether a track fits this moment, person, space, and rhythm.",
        excerpt:
          "Classic recommendation asks what a user might like. Sound intelligence asks what the situation needs. When the question changes, features, ranking, and interaction change too.",
      },
      {
        id: "atmos-daypart",
        title: "How Atmos orchestrates a full day of sound",
        category: "Product",
        date: "2026.04.15",
        readTime: "7 min",
        image: "/images/atmos-product.jpg",
        summary:
          "From opening to closing, Atmos breaks the business day into manageable sonic moments.",
        excerpt:
          "A day of sound is not a straight line. Atmos considers dayparts, traffic, space attributes, and brand character so playback becomes an operational asset.",
      },
      {
        id: "dj-workflow",
        title: "Rebuilding music understanding from the DJ booth",
        category: "Live",
        date: "2026.04.03",
        readTime: "5 min",
        image: "/images/sonicite-product.jpg",
        summary:
          "DJs judge music quickly, but preparation still depends on memory and repeated listening. Sonicite makes understanding immediately usable.",
        excerpt:
          "Energy, mood, sections, transition space, and live context usually live inside experience. We organize them into a faster reading interface.",
      },
      {
        id: "architecture",
        title: "The four capabilities inside SONICITE",
        category: "Tech",
        date: "2026.03.28",
        readTime: "9 min",
        image: "/images/sonicite-product.jpg",
        summary:
          "Understand, Search, Orchestrate, and Operate determine whether sound intelligence can become useful in the real world.",
        excerpt:
          "Understanding turns music into structured signals. Search brings intent into the library. Orchestration forms sonic paths. Operation moves plans into real spaces.",
      },
      {
        id: "brand-memory",
        title: "Sound deserves a place in brand memory",
        category: "Brand",
        date: "2026.03.12",
        readTime: "6 min",
        image: "/images/atmos-product.jpg",
        summary:
          "Beyond visuals, space, and service, sound shapes how people remember a brand. It needs consistency and contextual movement.",
        excerpt:
          "Good brand sound is not one fixed kind of music. It has a stable character with enough variation to adapt to the live environment.",
      },
    ],
  },
};

function getArticleUrl(article, locale) {
  return `/blog/${article.id}?lang=${locale}`;
}

export function BlogPage({ initialArticles = [] }) {
  const [locale, setLocale] = useState("zh");
  const [activeFilter, setActiveFilter] = useState(0);
  const copy = copyByLocale[locale];
  const articleCopy = articleListCopyByLocale[locale] ?? articleListCopyByLocale.zh;
  const articles = initialArticles.length > 0 ? initialArticles : articleCopy.articles;
  const filters = useMemo(() => {
    const categoryFilters = [...new Set(articles.map((article) => article.category))];
    return [locale === "zh" ? "全部" : "All", ...categoryFilters];
  }, [articles, locale]);
  const featured = articles[0];

  const filteredArticles = useMemo(() => {
    const activeLabel = filters[activeFilter];

    if (activeFilter === 0) {
      return articles;
    }

    return articles.filter((article) => article.category === activeLabel);
  }, [activeFilter, articles, filters]);

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
    setActiveFilter(0);
  }, [locale]);

  const homeHref = `/?lang=${locale}`;
  const aboutHref = `/about?lang=${locale}`;
  const contactHref = `/contact?lang=${locale}`;

  return (
    <div className="page-shell blog-page-shell">
      <header className="site-header">
        <a className="brandmark" href={homeHref} aria-label={copy.nav.homeLabel}>
          <Image src={logoSrc} alt="sonicite" width={2000} height={800} className="brandmark__logo" priority />
        </a>

        <div className="site-header__right">
          <nav className="site-nav" aria-label="Primary">
            <a href={`${homeHref}#brand-thesis`}>{copy.nav.brand}</a>
            <a href={`${homeHref}#product-split`}>{copy.nav.products}</a>
            <a href={`${homeHref}#highlights`}>{copy.nav.highlights}</a>
            <a href={`/blog?lang=${locale}`} aria-current="page">
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
        <section className="blog-page-hero" aria-labelledby="blog-page-title">
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            className="blog-page-hero__image"
            sizes="100vw"
            priority
          />
          <div className="blog-page-hero__overlay"></div>
          <div className="blog-page-hero__content section__inner">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1 id="blog-page-title">{copy.hero.title}</h1>
            <p>{copy.hero.summary}</p>
            <a className="blog-page-hero__latest" href={getArticleUrl(featured, locale)}>
              <span>{copy.hero.latest}</span>
              <strong>{featured.title}</strong>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="blog-archive section" aria-labelledby="blog-archive-title">
          <div className="section__inner">
            <div className="blog-archive__header">
              <h2 id="blog-archive-title">{copy.archiveTitle}</h2>
              <div className="blog-filter" role="tablist" aria-label={copy.archiveTitle}>
                {filters.map((filter, index) => (
                  <button
                    key={filter}
                    className={`blog-filter__button ${activeFilter === index ? "is-active" : ""}`}
                    type="button"
                    role="tab"
                    aria-selected={activeFilter === index}
                    onClick={() => setActiveFilter(index)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="journal-grid">
              {filteredArticles.map((article, index) => (
                <article
                  className={`journal-card ${index === 0 ? "journal-card--lead" : ""}`}
                  id={article.id}
                  key={article.id}
                >
                  <a className="journal-card__visual" href={getArticleUrl(article, locale)} aria-label={article.title}>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="journal-card__image"
                      sizes={index === 0 ? "(max-width: 960px) 100vw, 54vw" : "(max-width: 960px) 100vw, 33vw"}
                    />
                  </a>
                  <div className="journal-card__body">
                    <div className="journal-card__meta">
                      <span>{article.category}</span>
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3>
                      <a href={getArticleUrl(article, locale)}>{article.title}</a>
                    </h3>
                    <p className="journal-card__summary">{article.summary}</p>
                    <p className="journal-card__excerpt">{article.excerpt}</p>
                    <a className="journal-card__link" href={getArticleUrl(article, locale)}>
                      <span>{copy.hero.read}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="blog-newsletter" aria-labelledby="blog-newsletter-title">
          <div className="section__inner blog-newsletter__inner">
            <div>
              <p className="eyebrow eyebrow--muted">{copy.hero.eyebrow}</p>
              <h2 id="blog-newsletter-title">{copy.newsletter.title}</h2>
              <p>{copy.newsletter.description}</p>
            </div>
            <form className="blog-newsletter__form" onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor="blog-email">
                {copy.newsletter.placeholder}
              </label>
              <input id="blog-email" type="email" placeholder={copy.newsletter.placeholder} />
              <button type="submit">{copy.newsletter.submit}</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

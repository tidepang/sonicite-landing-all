"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const heroVideoSrc =
  "https://ufwqrsdoaxjxcsbxpirb.supabase.co/storage/v1/object/public/langding_page/landing_all.mp4";
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
      title: "SONICITE AI Sound Systems",
      ctaPrimary: "进入 Sonicite",
      ctaSecondary: "进入 Atmos",
      ctaGhost: "预约 Demo",
      play: "Play",
      pause: "Pause",
      muted: "Muted",
      soundOn: "Sound On",
      volume: "Volume",
      pauseVideo: "暂停视频",
      playVideo: "播放视频",
      muteVideo: "静音视频",
      unmuteVideo: "打开视频声音",
    },
    thesis: {
      eyebrow: "Brand Thesis",
      title: "音乐无处不在，\n理解却不是。",
      paragraphs: [
        "原本依赖经验、记忆和反复试听完成的事情，不论发生在 DJ 的音乐工作流里，还是发生在咖啡店、餐厅和零售空间里，都可以被重新组织成一个更清晰的声音系统。",
        "SONICITE 试图做的不是替代审美，而是让理解、判断和编排拥有更稳定的结构。对创作者来说，这是更快进入状态的工作流。对品牌和空间来说，这是让声音真正服务营业节奏和体验的一套方法。",
      ],
    },
    products: {
      eyebrow: "Product Split",
      title: "一个声音智能系统",
      description:
        "一个面向 DJ 与音乐工作流，一个面向品牌与空间氛围。首页先把这两个入口讲清楚，后面的内容再继续往深处展开。",
      list: [
        {
          id: "sonicite-card",
          className: "product-card product-card--sonicite reveal",
          label: "For DJs & Music Workflows",
          title: "Sonicite",
          summary: "更快理解音乐，更稳定做选歌与编排判断。",
          imageSrc: "/images/sonicite-product.jpg",
          imageAlt: "DJ mixer and deck under vivid orange-red light.",
          cta: "View Sonicite",
          visualClassName: "product-card__visual product-card__visual--sonicite",
        },
        {
          id: "atmos-card",
          className: "product-card product-card--atmos reveal",
          label: "For Brands & Spaces",
          title: "Atmos",
          summary: "为你的空间编排一整天的声音氛围。",
          imageSrc: "/images/atmos-product.jpg",
          imageAlt: "Immersive red-lit spatial environment with people and architecture.",
          cta: "View Atmos",
          visualClassName: "product-card__visual product-card__visual--atmos",
        },
      ],
    },
    highlights: {
      eyebrow: "Highlights",
      title: "把声音判断拆成四个可用能力",
      description:
        "从理解音乐，到搜索、编排和落地播放，SONICITE 把模糊的声音直觉整理成可以被使用的系统能力。",
      cta: "Learn More",
      list: [
        {
          title: "Understand",
          summary: "读取音乐的能量、情绪、结构和语境，让声音先被理解。",
        },
        {
          title: "Search",
          summary: "用意图、场景和氛围寻找音乐，不只依赖歌名和记忆。",
        },
        {
          title: "Orchestrate",
          summary: "辅助选歌、排序、过渡和全天候声音节奏的编排。",
        },
        {
          title: "Operate",
          summary: "让声音方案可播放、可管理、可复用，真正进入现场。",
        },
      ],
    },
    blog: {
      eyebrow: "Insights",
      title: "声音背后的故事",
      description:
        "从技术原理到场景实践，记录 SONICITE 如何让声音判断变得更清晰、更可用。",
      tabs: ["全部", "品牌", "技术", "产品"],
      articles: [
        {
          id: "blog-1",
          title: "为什么音乐推荐不够用",
          summary:
            "推荐算法关注的是「你可能喜欢什么」，而不是「你现在需要什么」。SONICITE 选择了一条不同的路径——从场景和意图出发理解声音。",
          category: "技术",
          image: "/images/sonicite-product.jpg",
        },
        {
          id: "blog-2",
          title: "咖啡店的声音不该是随机的",
          summary:
            "一家咖啡店的早高峰和午后时段需要完全不同的声音节奏。Atmos 通过理解营业节奏，让声音真正服务于空间体验。",
          category: "品牌",
          image: "/images/atmos-product.jpg",
        },
        {
          id: "blog-3",
          title: "SONICITE 技术架构：四个核心能力",
          summary:
            "理解、搜索、编排、操作——这四个能力如何协同工作，构成一个完整的声音智能系统。",
          category: "技术",
          image: "/images/sonicite-product.jpg",
        },
        {
          id: "blog-4",
          title: "从 DJ 台到零售空间：声音智能的两条路径",
          summary:
            "Sonicite 和 Atmos 看起来是两个产品，但它们共享同一个核心——让声音判断从直觉变成系统。",
          category: "品牌",
          image: "/images/atmos-product.jpg",
        },
        {
          id: "blog-5",
          title: "Sonicite 1.0 发布：更快理解音乐的工作流",
          summary:
            "重新设计的音乐理解界面，让 DJ 在几秒内读取一首歌的能量、情绪和结构。",
          category: "产品",
          image: "/images/sonicite-product.jpg",
        },
        {
          id: "blog-6",
          title: "Atmos 如何编排一整天的声音氛围",
          summary:
            "从晨间到深夜，Atmos 分析全天候的声音曲线，让每一个时段都有恰到好处的声音陪伴。",
          category: "产品",
          image: "/images/atmos-product.jpg",
        },
      ],
    },
    footer: {
      title: "加入 SONICITE Circle",
      description:
        "接收关于音乐智能、DJ 工作流和空间声音系统的产品更新与早期体验邀请。",
      emailPlaceholder: "输入您的邮箱",
      subscribe: "订阅",
      privacy: "我们尊重你的隐私。随时退订。",
      products: "产品",
      productLinks: ["Sonicite", "Atmos"],
      company: "公司",
      companyLinks: ["关于", "博客", "联系"],
      legal: "法律",
      legalLinks: ["隐私", "条款"],
      socialLinks: ["Instagram", "YouTube", "X"],
      copyright: "© 2026 SONICITE. All rights reserved.",
    },
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
      title: "SONICITE AI Sound Systems",
      ctaPrimary: "Explore Sonicite",
      ctaSecondary: "Explore Atmos",
      ctaGhost: "Book a Demo",
      play: "Play",
      pause: "Pause",
      muted: "Muted",
      soundOn: "Sound On",
      volume: "Volume",
      pauseVideo: "Pause video",
      playVideo: "Play video",
      muteVideo: "Mute video",
      unmuteVideo: "Unmute video",
    },
    thesis: {
      eyebrow: "Brand Thesis",
      title: "Music is everywhere.\nUnderstanding is not.",
      paragraphs: [
        "What used to depend on memory, instinct, and repeated listening, whether in a DJ workflow or inside a cafe, restaurant, or retail space, can be reorganized into a clearer sound system.",
        "SONICITE is not trying to replace taste. It is trying to give understanding, judgment, and orchestration a more stable structure. For creators, that means a faster way into flow. For brands and spaces, it means a system where sound actually supports operations and experience.",
      ],
    },
    products: {
      eyebrow: "Product Split",
      title: "One sound intelligence system",
      description:
        "One is built for DJs and music workflows. The other is built for brands and spaces. The homepage should make those two entry points immediately clear.",
      list: [
        {
          id: "sonicite-card",
          className: "product-card product-card--sonicite reveal",
          label: "For DJs & Music Workflows",
          title: "Sonicite",
          summary: "Understand music faster and make more stable sequencing decisions.",
          imageSrc: "/images/sonicite-product.jpg",
          imageAlt: "DJ mixer and deck under vivid orange-red light.",
          cta: "View Sonicite",
          visualClassName: "product-card__visual product-card__visual--sonicite",
        },
        {
          id: "atmos-card",
          className: "product-card product-card--atmos reveal",
          label: "For Brands & Spaces",
          title: "Atmos",
          summary: "Orchestrate a full day of sonic atmosphere for your space.",
          imageSrc: "/images/atmos-product.jpg",
          imageAlt: "Immersive red-lit spatial environment with people and architecture.",
          cta: "View Atmos",
          visualClassName: "product-card__visual product-card__visual--atmos",
        },
      ],
    },
    highlights: {
      eyebrow: "Highlights",
      title: "Four ways sonic judgment becomes usable",
      description:
        "From reading music to searching, orchestrating, and operating playback, SONICITE turns vague sonic instinct into system-level capabilities.",
      cta: "Learn More",
      list: [
        {
          title: "Understand",
          summary: "Reads energy, mood, structure, and context so sound can be understood.",
        },
        {
          title: "Search",
          summary: "Finds music through intention and atmosphere, not only titles or memory.",
        },
        {
          title: "Orchestrate",
          summary: "Supports sequencing, transitions, and full-day sound arcs with clarity.",
        },
        {
          title: "Operate",
          summary: "Makes sound plans playable, manageable, and reusable in real spaces.",
        },
      ],
    },
    blog: {
      eyebrow: "Insights",
      title: "Stories Behind Sound",
      description:
        "From technical principles to real-world practice, documenting how SONICITE makes sonic judgment clearer and more usable.",
      tabs: ["All", "Brand", "Tech", "Product"],
      articles: [
        {
          id: "blog-1",
          title: "Why Music Recommendation Is Not Enough",
          summary:
            "Recommendation algorithms focus on what you might like, not what you need right now. SONICITE takes a different path — understanding sound through context and intent.",
          category: "Tech",
          image: "/images/sonicite-product.jpg",
        },
        {
          id: "blog-2",
          title: "A Coffee Shop's Sound Shouldn't Be Random",
          summary:
            "Morning rush and afternoon lull need completely different sonic rhythms. Atmos understands business tempo to make sound truly serve the spatial experience.",
          category: "Brand",
          image: "/images/atmos-product.jpg",
        },
        {
          id: "blog-3",
          title: "SONICITE Architecture: Four Core Capabilities",
          summary:
            "Understand, Search, Orchestrate, Operate — how these four capabilities work together to form a complete sound intelligence system.",
          category: "Tech",
          image: "/images/sonicite-product.jpg",
        },
        {
          id: "blog-4",
          title: "From DJ Booth to Retail: Two Paths of Sonic Intelligence",
          summary:
            "Sonicite and Atmos look like two products, but they share the same core — turning sonic judgment from intuition into system.",
          category: "Brand",
          image: "/images/atmos-product.jpg",
        },
        {
          id: "blog-5",
          title: "Sonicite 1.0 Launch: A Faster Music Understanding Workflow",
          summary:
            "Redesigned music understanding interface lets DJs read a song's energy, mood, and structure in seconds.",
          category: "Product",
          image: "/images/sonicite-product.jpg",
        },
        {
          id: "blog-6",
          title: "How Atmos Orchestrates a Full Day of Sonic Atmosphere",
          summary:
            "From morning to midnight, Atmos analyzes all-day sound curves to ensure every moment has just the right sonic companion.",
          category: "Product",
          image: "/images/atmos-product.jpg",
        },
      ],
    },
    footer: {
      title: "Join the SONICITE Circle",
      description:
        "Receive product updates, music intelligence notes, and early access across Sonicite and Atmos.",
      emailPlaceholder: "Enter your email",
      subscribe: "Subscribe",
      privacy: "We respect your privacy. Unsubscribe anytime.",
      products: "Products",
      productLinks: ["Sonicite", "Atmos"],
      company: "Company",
      companyLinks: ["About", "Blog", "Contact"],
      legal: "Legal",
      legalLinks: ["Privacy", "Terms"],
      socialLinks: ["Instagram", "YouTube", "X"],
      copyright: "© 2026 SONICITE. All rights reserved.",
    },
  },
};

function BlogSection({ copy }) {
  const [activeTab, setActiveTab] = useState(0);

  const allArticles = copy.blog.articles;
  const activeLabel = copy.blog.tabs[activeTab];
  const filteredArticles =
    activeTab === 0 ? allArticles : allArticles.filter((a) => a.category === activeLabel);
  const featured = filteredArticles[0];
  const rest = filteredArticles.slice(1);

  return (
    <section className="section section--blog" id="blog" aria-labelledby="blog-title">
      <div className="section__inner">
        <div className="blog-header reveal">
          <p className="eyebrow eyebrow--muted">{copy.blog.eyebrow}</p>
          <h2 id="blog-title">{copy.blog.title}</h2>
          <p>{copy.blog.description}</p>
        </div>

        <div className="blog-tabs reveal" role="tablist">
          {copy.blog.tabs.map((tab, index) => (
            <button
              key={tab}
              className={`blog-tab ${activeTab === index ? "is-active" : ""}`}
              type="button"
              role="tab"
              aria-selected={activeTab === index}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        {featured ? (
          <div className="blog-content reveal">
            <article className="blog-card blog-card--featured">
              <div className="blog-card__visual">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="blog-card__image"
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
                <div className="blog-card__image-overlay"></div>
              </div>
              <div className="blog-card__body">
                <span className="blog-card__category">{featured.category}</span>
                <h3>{featured.title}</h3>
                <p>{featured.summary}</p>
                <a className="blog-card__link" href={`#${featured.id}`}>
                  <span>{copy.blog.tabs[0] === "全部" ? "阅读全文" : "Read More"}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>

            <div className="blog-list">
              {rest.map((article) => (
                <article className="blog-card blog-card--compact" key={article.id}>
                  <div className="blog-card__thumb">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="blog-card__thumb-image"
                      sizes="120px"
                    />
                  </div>
                  <div className="blog-card__info">
                    <span className="blog-card__category">{article.category}</span>
                    <h3>{article.title}</h3>
                    <p>{article.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function LandingPage() {
  const videoRef = useRef(null);
  const [locale, setLocale] = useState("zh");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0);
  const copy = copyByLocale[locale];

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    video.volume = 0;
    video.muted = true;

    const syncState = () => {
      setIsPlaying(!video.paused);
      setIsMuted(video.muted || video.volume === 0);
      setVolume(Math.round(video.volume * 100));
    };

    syncState();

    video.addEventListener("play", syncState);
    video.addEventListener("pause", syncState);
    video.addEventListener("volumechange", syncState);

    return () => {
      video.removeEventListener("play", syncState);
      video.removeEventListener("pause", syncState);
      video.removeEventListener("volumechange", syncState);
    };
  }, []);

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

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (elements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handlePlayToggle = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.error("Unable to resume hero video playback.", error);
      }

      return;
    }

    video.pause();
  };

  const handleMuteToggle = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.muted || video.volume === 0) {
      video.muted = false;
      video.volume = Math.max(video.volume, 0.35);

      try {
        await video.play();
      } catch (error) {
        console.error("Unable to play hero video with sound.", error);
      }

      return;
    }

    video.muted = true;
  };

  const handleVolumeChange = async (event) => {
    const video = videoRef.current;
    const nextVolume = Number(event.target.value) / 100;

    if (!video) {
      return;
    }

    video.volume = nextVolume;
    video.muted = nextVolume === 0;

    if (nextVolume > 0 && video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.error("Unable to resume hero video from volume interaction.", error);
      }
    }
  };

  const handleFooterSubmit = (event) => {
    event.preventDefault();
  };

  const blogHref = `/blog?lang=${locale}`;
  const aboutHref = `/about?lang=${locale}`;
  const contactHref = `/contact?lang=${locale}`;

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brandmark" href="#top" aria-label={copy.nav.homeLabel}>
          <Image src={logoSrc} alt="sonicite" width={2000} height={800} className="brandmark__logo" priority />
        </a>

        <div className="site-header__right">
          <nav className="site-nav" aria-label="Primary">
            <a href="#brand-thesis">{copy.nav.brand}</a>
            <a href="#product-split">{copy.nav.products}</a>
            <a href="#highlights">{copy.nav.highlights}</a>
            <a href={blogHref}>{copy.nav.blog}</a>
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

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <video
            ref={videoRef}
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
          <div className="hero__video-overlay"></div>
          <div className="hero__grain"></div>

          <div className="hero__content">
            <h1 className="sr-only" id="hero-title">
              {copy.hero.title}
            </h1>

            <div className="hero__control-row reveal">
              <div className="hero__actions">
                <a className="button button--primary" href="#sonicite-card">
                  {copy.hero.ctaPrimary}
                </a>
                <a className="button button--secondary" href="#atmos-card">
                  {copy.hero.ctaSecondary}
                </a>
                <a className="button button--ghost" href="mailto:hello@sonicite.ai">
                  {copy.hero.ctaGhost}
                </a>
              </div>

              <div className="video-console" aria-label="Video controls">
                <button
                  className="console-button"
                  type="button"
                  onClick={handlePlayToggle}
                  aria-label={isPlaying ? copy.hero.pauseVideo : copy.hero.playVideo}
                >
                  {isPlaying ? copy.hero.pause : copy.hero.play}
                </button>

                <button
                  className="console-button console-button--muted"
                  type="button"
                  onClick={handleMuteToggle}
                  aria-label={isMuted ? copy.hero.unmuteVideo : copy.hero.muteVideo}
                >
                  {isMuted ? copy.hero.muted : copy.hero.soundOn}
                </button>

                <label className="volume-control" htmlFor="video-volume">
                  <span>{copy.hero.volume}</span>
                  <input
                    id="video-volume"
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--thesis" id="brand-thesis" aria-labelledby="thesis-title">
          <div className="section__inner section__inner--thesis">
            <div className="thesis-heading reveal">
              <p className="eyebrow eyebrow--muted">{copy.thesis.eyebrow}</p>
              <h2 id="thesis-title">
                {copy.thesis.title.split("\n").map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            <div className="thesis-copy reveal">
              {copy.thesis.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--products" id="product-split" aria-labelledby="products-title">
          <div className="section__inner">
            <div className="products-header reveal">
              <p className="eyebrow eyebrow--muted">{copy.products.eyebrow}</p>
              <h2 id="products-title">{copy.products.title}</h2>
              <p>{copy.products.description}</p>
            </div>

            <div className="product-grid">
              {copy.products.list.map((product) => (
                <article className={product.className} id={product.id} key={product.id}>
                  <div className="product-card__glow"></div>
                  <div className="product-card__visual-frame">
                    <div className={product.visualClassName}>
                      <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        fill
                        className="product-card__image"
                        sizes="(max-width: 980px) 100vw, 50vw"
                      />
                      <div className="product-card__image-overlay"></div>
                    </div>
                  </div>

                  <div className="product-card__body">
                    <div className="product-card__header">
                      <p className="product-card__label">{product.label}</p>
                      <h3>{product.title}</h3>
                      <p className="product-card__summary">{product.summary}</p>
                    </div>

                    <a className="product-card__cta" href={`#${product.id}`}>
                      <span>{product.cta}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--highlights" id="highlights" aria-labelledby="highlights-title">
          <div className="section__inner">
            <h2 className="sr-only" id="highlights-title">
              {copy.highlights.title}
            </h2>

            <div className="highlight-grid">
              {copy.highlights.list.map((highlight, index) => (
                <article className="highlight-card reveal" key={highlight.title}>
                  <span className="highlight-card__index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className="highlight-card__action" aria-hidden="true">
                    <span></span>
                  </span>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.summary}</p>
                  <a href="#product-split">
                    <span>{copy.highlights.cta}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BlogSection copy={copy} />
      </main>

      <footer className="site-footer" id="footer">
        <div className="site-footer__grid section__inner reveal">
          <div className="site-footer__brand">
            <a className="footer-brandmark" href="#top" aria-label={copy.nav.homeLabel}>
              <Image src={logoSrc} alt="sonicite" width={2000} height={800} className="footer-brandmark__logo" />
            </a>
          </div>

          <nav className="footer-links" aria-label={copy.footer.products}>
            <h3>{copy.footer.products}</h3>
            {copy.footer.productLinks.map((link) => (
              <a href={link === "Sonicite" ? "#sonicite-card" : "#atmos-card"} key={link}>
                {link}
              </a>
            ))}
          </nav>

          <nav className="footer-links" aria-label={copy.footer.company}>
            <h3>{copy.footer.company}</h3>
            {copy.footer.companyLinks.map((link) => (
              <a
                href={
                  link === "Contact" || link === "联系"
                    ? contactHref
                    : link === "Blog" || link === "博客"
                      ? blogHref
                      : link === "About" || link === "关于"
                        ? aboutHref
                      : "#top"
                }
                key={link}
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="site-footer__newsletter">
            <h3>{copy.footer.title}</h3>
            <p>{copy.footer.description}</p>

            <form className="footer-form" onSubmit={handleFooterSubmit}>
              <label className="sr-only" htmlFor="footer-email">
                {copy.footer.emailPlaceholder}
              </label>
              <input id="footer-email" type="email" placeholder={copy.footer.emailPlaceholder} />
              <button type="submit">{copy.footer.subscribe}</button>
            </form>

            <p className="site-footer__privacy">{copy.footer.privacy}</p>
          </div>
        </div>

        <div className="site-footer__meta section__inner">
          <nav className="site-footer__legal" aria-label={copy.footer.legal}>
            {copy.footer.legalLinks.map((link) => (
              <a href="#top" key={link}>
                {link}
              </a>
            ))}
          </nav>

          <nav className="site-footer__socials" aria-label="Social">
            {copy.footer.socialLinks.map((link) => (
              <a href="#top" key={link}>
                {link}
              </a>
            ))}
          </nav>

          <p>{copy.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}

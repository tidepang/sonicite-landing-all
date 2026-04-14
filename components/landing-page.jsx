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
            <a href="#footer">{copy.nav.contact}</a>
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
              <a href={link === "Contact" || link === "联系" ? "mailto:hello@sonicite.ai" : "#top"} key={link}>
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

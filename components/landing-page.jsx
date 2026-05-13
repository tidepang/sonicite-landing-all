"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const heroVideoSrc =
  "https://ufwqrsdoaxjxcsbxpirb.supabase.co/storage/v1/object/public/langding_page/landing_all.mp4";
const localeStorageKey = "sonicite-landing-locale";
const logoSrc = "/images/sonicite-logo.png";
const footerSocialHrefs = {
  IG: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/sonicite.ai?igsh=NzI3MG9sYm56cDlj",
  YouTube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@sonicite-ai",
  Rednote: "https://xhslink.com/m/5FNXRtD0fWp",
  SoundCloud: process.env.NEXT_PUBLIC_SOUNDCLOUD_URL || "https://soundcloud.com/sonicite-fm",
  MixCloud: process.env.NEXT_PUBLIC_MIXCLOUD_URL || "https://www.mixcloud.com/sonicite-fm",
};

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
    locale: {
      zh: "CN",
      en: "EN",
    },
    hero: {
      title: "Sonicite AI Sound Systems",
      ctaPrimary: "Explore Sonicite Flow",
      ctaSecondary: "Explore Sonicite Atmos",
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
      title: "音乐无处不在，\n理解却不是。",
      paragraphs: [
        "原本依赖经验、记忆和反复试听完成的事情，不论发生在 DJ 的音乐工作流里，还是发生在咖啡店、餐厅和零售空间里，都可以被重新组织成一个更清晰的声音系统。",
        "Sonicite 试图做的不是替代审美，而是让理解、判断和编排拥有更稳定的结构。对创作者来说，这是更快进入状态的工作流。对品牌和空间来说，这是让声音真正服务营业节奏和体验的一套方法。",
      ],
    },
    products: {
      title: "一个声音智能系统",
      description:
        "一个面向 DJ 与音乐工作流，一个面向品牌与空间氛围。首页先把这两个入口讲清楚，后面的内容再继续往深处展开。",
      list: [
        {
          id: "sonicite-card",
          className: "product-card product-card--sonicite reveal",
          label: "For DJs & Music Workflows",
          title: "Sonicite Flow",
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
          title: "Sonicite Atmos",
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
      title: "Sonicite 如何工作",
      description:
        "从音乐和场景出发，把模糊的声音直觉整理成可以执行、调整和复用的工作流。",
      list: [
        {
          title: "Read Context",
          summary: "先读取音乐的能量、情绪、结构，以及它所处的空间和使用场景。",
        },
        {
          title: "Find Direction",
          summary: "把模糊的感觉转成清晰方向，知道下一段声音应该往哪里走。",
        },
        {
          title: "Shape Flow",
          summary: "组织选歌、排序、过渡和节奏，让一段声音体验形成连续结构。",
        },
        {
          title: "Run Live",
          summary: "把声音方案变成可播放、可管理、可调整的现场系统。",
        },
      ],
    },
    blog: {
      eyebrow: "Insights",
      title: "声音背后的故事",
      description:
        "从技术原理到场景实践，记录 Sonicite 如何让声音判断变得更清晰、更可用。",
      tabs: ["全部", "品牌", "技术", "产品"],
      articles: [
        {
          id: "blog-1",
          title: "为什么音乐推荐不够用",
          summary:
            "推荐算法关注的是「你可能喜欢什么」，而不是「你现在需要什么」。Sonicite 选择了一条不同的路径——从场景和意图出发理解声音。",
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
          title: "Sonicite 技术架构：四个核心能力",
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
      title: "加入 Sonicite Circle",
      description:
        "接收关于音乐智能、DJ 工作流和空间声音系统的产品更新与早期体验邀请。",
      emailPlaceholder: "输入您的邮箱",
      subscribe: "订阅",
      subscribing: "提交中...",
      subscribeSuccess: "已发送确认邮件，请查收邮箱。",
      subscribeError: "暂时发送失败，请稍后再试。",
      bookCall: "Book A Call",
      privacy: "我们尊重你的隐私。随时退订。",
      products: "产品",
      productLinks: ["Sonicite", "Atmos"],
      company: "公司",
      companyLinks: ["关于", "博客", "联系"],
      legal: "法律",
      legalLinks: ["隐私", "条款"],
      socialLinks: ["IG", "YouTube", "Rednote", "SoundCloud", "MixCloud"],
      copyright: "© 2026 Sonicite. All rights reserved.",
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
    locale: {
      zh: "CN",
      en: "EN",
    },
    hero: {
      title: "Sonicite AI Sound Systems",
      ctaPrimary: "Explore Sonicite Flow",
      ctaSecondary: "Explore Sonicite Atmos",
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
      title: "Music is everywhere.\nUnderstanding is not.",
      paragraphs: [
        "What used to depend on memory, instinct, and repeated listening, whether in a DJ workflow or inside a cafe, restaurant, or retail space, can be reorganized into a clearer sound system.",
        "Sonicite is not trying to replace taste. It is trying to give understanding, judgment, and orchestration a more stable structure. For creators, that means a faster way into flow. For brands and spaces, it means a system where sound actually supports operations and experience.",
      ],
    },
    products: {
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
      title: "How Sonicite works",
      description:
        "Sonicite turns vague sonic instinct into a workflow that can be executed, adjusted, and reused.",
      list: [
        {
          title: "Read Context",
          summary: "Reads energy, mood, structure, space, and use case before making sound decisions.",
        },
        {
          title: "Find Direction",
          summary: "Turns fuzzy taste and atmosphere into a clear direction for what should happen next.",
        },
        {
          title: "Shape Flow",
          summary: "Organizes tracks, order, transitions, and pacing into a continuous sound experience.",
        },
        {
          title: "Run Live",
          summary: "Makes sound plans playable, manageable, adjustable, and reusable in real spaces.",
        },
      ],
    },
    blog: {
      eyebrow: "Insights",
      title: "Stories Behind Sound",
      description:
        "From technical principles to real-world practice, documenting how Sonicite makes sonic judgment clearer and more usable.",
      tabs: ["All", "Brand", "Tech", "Product"],
      articles: [
        {
          id: "blog-1",
          title: "Why Music Recommendation Is Not Enough",
          summary:
            "Recommendation algorithms focus on what you might like, not what you need right now. Sonicite takes a different path — understanding sound through context and intent.",
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
          title: "Sonicite Architecture: Four Core Capabilities",
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
      title: "Join the Sonicite Circle",
      description:
        "Receive product updates, music intelligence notes, and early access across Sonicite and Atmos.",
      emailPlaceholder: "Enter your email",
      subscribe: "Subscribe",
      subscribing: "Sending...",
      subscribeSuccess: "Confirmation email sent. Please check your inbox.",
      subscribeError: "Sending failed. Please try again later.",
      bookCall: "Book A Call",
      privacy: "We respect your privacy. Unsubscribe anytime.",
      products: "Products",
      productLinks: ["Sonicite", "Atmos"],
      company: "Company",
      companyLinks: ["About", "Blog", "Contact"],
      legal: "Legal",
      legalLinks: ["Privacy", "Terms"],
      socialLinks: ["IG", "YouTube", "Rednote", "SoundCloud", "MixCloud"],
      copyright: "© 2026 Sonicite. All rights reserved.",
    },
  },
};

function BlogSection({ copy }) {
  const articles = copy.blog.articles.slice(0, 6);

  return (
    <section className="section section--blog" id="blog" aria-labelledby="blog-title">
      <div className="section__inner">
        <div className="blog-header reveal">
          <h2 id="blog-title">{copy.blog.title}</h2>
          <p>{copy.blog.description}</p>
        </div>

        <div className="blog-grid reveal">
          {articles.map((article) => (
            <article className="blog-card" key={article.id}>
              <div className="blog-card__visual">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="blog-card__image"
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
                <div className="blog-card__image-overlay"></div>
              </div>
              <div className="blog-card__body">
                <span className="blog-card__category">{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingPage() {
  const videoRef = useRef(null);
  const [locale, setLocale] = useState("zh");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");
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

  const handleFooterSubmit = async (event) => {
    event.preventDefault();
    setNewsletterStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error("Newsletter subscription failed");
      }

      form.reset();
      setNewsletterStatus("success");
    } catch (error) {
      console.error(error);
      setNewsletterStatus("error");
    }
  };

  const blogHref = `/blog?lang=${locale}`;
  const aboutHref = `/about?lang=${locale}`;
  const contactHref = `/contact?lang=${locale}`;
  const bookingHref = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/sonicite";

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brandmark" href="#top" aria-label={copy.nav.homeLabel}>
          <Image src={logoSrc} alt="sonicite" width={2000} height={800} className="brandmark__logo" priority />
        </a>

        <div className="site-header__right">
          <nav className="site-nav" aria-label="Primary">
            <a href="#sonicite-card">{copy.nav.brand}</a>
            <a href="#atmos-card">{copy.nav.products}</a>
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
              </div>

              <div className="video-console" aria-label="Video controls">
                <button
                  className="console-button"
                  type="button"
                  onClick={handlePlayToggle}
                  aria-label={isPlaying ? copy.hero.pauseVideo : copy.hero.playVideo}
                >
                  <span className={`console-icon ${isPlaying ? "console-icon--pause" : "console-icon--play"}`} aria-hidden="true"></span>
                  <span className="sr-only">{isPlaying ? copy.hero.pause : copy.hero.play}</span>
                </button>

                <button
                  className="console-button console-button--muted"
                  type="button"
                  onClick={handleMuteToggle}
                  aria-label={isMuted ? copy.hero.unmuteVideo : copy.hero.muteVideo}
                >
                  <span className={`console-icon ${isMuted ? "console-icon--muted" : "console-icon--sound"}`} aria-hidden="true"></span>
                  <span className="sr-only">{isMuted ? copy.hero.muted : copy.hero.soundOn}</span>
                </button>

                <label className="volume-control" htmlFor="video-volume" aria-label={copy.hero.volume}>
                  <span className={`volume-icon ${isMuted || volume === 0 ? "is-muted" : ""}`} aria-hidden="true"></span>
                  <input
                    id="video-volume"
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    aria-label={copy.hero.volume}
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

                    <a className="product-card__cta" href={`#${product.id}`} aria-label={product.cta}>
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
                  <h3>{highlight.title}</h3>
                  <p>{highlight.summary}</p>
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
            <a className="footer-booking" href={bookingHref} target="_blank" rel="noreferrer">
              {copy.footer.bookCall}
              <span aria-hidden="true">↗</span>
            </a>

            <form className="footer-form" onSubmit={handleFooterSubmit}>
              <label className="sr-only" htmlFor="footer-email">
                {copy.footer.emailPlaceholder}
              </label>
              <input id="footer-email" name="email" type="email" placeholder={copy.footer.emailPlaceholder} required />
              <button type="submit" disabled={newsletterStatus === "sending"}>
                {newsletterStatus === "sending" ? copy.footer.subscribing : copy.footer.subscribe}
              </button>
            </form>
            {newsletterStatus === "success" ? (
              <p className="footer-form__status">{copy.footer.subscribeSuccess}</p>
            ) : null}
            {newsletterStatus === "error" ? (
              <p className="footer-form__status footer-form__status--error">{copy.footer.subscribeError}</p>
            ) : null}

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
              <a href={footerSocialHrefs[link] || "#top"} key={link} target={footerSocialHrefs[link] ? "_blank" : undefined} rel={footerSocialHrefs[link] ? "noreferrer" : undefined}>
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

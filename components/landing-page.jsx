"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SiteNav } from "./sonicite-shared";

const heroVideoSrc =
  "https://ufwqrsdoaxjxcsbxpirb.supabase.co/storage/v1/object/public/langding_page/landing_all.mp4";
const localeStorageKey = "sonicite-landing-locale";
const logoSrc = "/images/sonicite-logo.png";
const productLogoSrc = {
  flow: "/images/products/sonicite-flow-logo.png",
  atmos: "/images/products/sonicite-atmos-logo.png",
  vibe: "/images/products/sonicite-vibe-logo.png",
};
const productPageHref = {
  flow: "/flow",
  atmos: "/atmos",
  vibe: "/vibe",
};
const flowHref = "https://flow.sonicite.ai/";
const atmosHref = "https://atmos.sonicite.ai/";
const vibeHref = "https://vibe.sonicite.ai/";
const footerSocialHrefs = {
  IG: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/sonicite.ai?igsh=NzI3MG9sYm56cDlj",
  YouTube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@sonicite-ai",
  Rednote: "https://xhslink.com/m/5FNXRtD0fWp",
  SoundCloud: process.env.NEXT_PUBLIC_SOUNDCLOUD_URL || "https://soundcloud.com/sonicite-fm",
  MixCloud: process.env.NEXT_PUBLIC_MIXCLOUD_URL || "https://www.mixcloud.com/sonicite-fm",
};

const homeBlogArticles = [
  {
    id: "why-humans-need-music",
    title: "Why Humans Will Always Need Music",
    category: "Culture",
    date: "04 · 06 · 2026",
    readTime: "8 min read",
    image: "/images/blog-1.jpg",
  },
  {
    id: "founder-confession",
    title: "From The Pure Love of Music",
    category: "Story",
    date: "28 · 05 · 2026",
    readTime: "10 min read",
    image: "/images/blog-2.jpg",
  },
  {
    id: "how-djs-find-music",
    title: "How Do DJs Find Music?",
    category: "Insights",
    date: "14 · 05 · 2026",
    readTime: "7 min read",
    image: "/images/blog-3.jpg",
  },
  {
    id: "why-clubs-ban-phones",
    title: "Why Are More Clubs Going Phone-Free?",
    category: "Trend",
    date: "30 · 04 · 2026",
    readTime: "9 min read",
    image: "/images/blog-4.jpg",
  },
  {
    id: "generative-ai-music-industry",
    title: "How Generative AI Is Reshaping the Music Industry",
    category: "Tech",
    date: "16 · 04 · 2026",
    readTime: "8 min read",
    image: "/images/blog-5.jpg",
  },
  {
    id: "music-media-evolution",
    title: "From Vinyl to Streaming",
    category: "Tech",
    date: "02 · 04 · 2026",
    readTime: "8 min read",
    image: "/images/blog-6.jpg",
  },
];

const copyByLocale = {
  zh: {
    nav: {
      flow: "flow",
      atmos: "atmos",
      vibe: "vibe",
      brand: "Flow",
      products: "Product",
      experiences: "experiences",
      highlights: "亮点",
      blog: "blog",
      about: "about",
      contact: "contact",
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
      ctaTertiary: "Explore Sonicite Vibe",
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
    constellation: {
      eyebrow: "02 / Constellation",
      meta: "Three orbits · one center",
      center: ["Sonicite", "System"],
      modules: [
        { id: "flow", href: "#flow", name: "sonicite", label: "flow", ariaLabel: "Sonicite Flow" },
        { id: "atmos", href: "#atmos", name: "sonicite", label: "atmos", ariaLabel: "Sonicite Atmos" },
        { id: "vibe", href: "#vibe", name: "sonicite", label: "vibe", ariaLabel: "Sonicite Vibe" },
      ],
      footLabel: "Read",
      foot:
        "三个模块围绕同一个声音智能核心运行。Flow 面向音乐工作流，Atmos 面向空间氛围，Vibe 作为现场共创方向被放在同一系统关系里呈现。",
    },
    products: {
      title: "一个声音智能系统",
      description:
        "三个入口，共用同一个声音智能核心。从 DJ 工作流，到品牌空间氛围，再到现场共创方向，把声音理解和编排放进同一个系统里。",
      list: [
        {
          id: "sonicite-card",
          className: "product-card product-card--sonicite",
          label: "For DJs & Music Workflows",
          title: "Sonicite Flow",
          module: "flow",
          summary: "更快理解音乐，更稳定做选歌与编排判断。",
          cta: "View Sonicite",
          visualClassName: "product-card__visual product-card__visual--sonicite",
          visualType: "flow",
          mode: "Mode 01",
          visualLabel: "signal · purple",
          ctaHref: productPageHref.flow,
          specs: [
            ["Use", "DJs · Curators"],
            ["Mode", "Workflow"],
            ["Status", "Live"],
          ],
        },
        {
          id: "atmos-card",
          className: "product-card product-card--atmos",
          label: "For Brands & Spaces",
          title: "Sonicite Atmos",
          module: "atmos",
          summary: "为你的空间编排一整天的声音氛围。",
          cta: "View Atmos",
          visualClassName: "product-card__visual product-card__visual--atmos",
          visualType: "atmos",
          mode: "Mode 02",
          visualLabel: "field · blue",
          ctaHref: productPageHref.atmos,
          specs: [
            ["Use", "Brands · Spaces"],
            ["Mode", "Dynamic"],
            ["Status", "Live"],
          ],
        },
        {
          id: "vibe-card",
          className: "product-card product-card--vibe",
          label: "For Live & Co-Creation",
          title: "Sonicite Vibe",
          module: "vibe",
          summary: "把 AI 音乐生成、现场互动和实时视觉放进共同创作体验。",
          cta: "View Vibe",
          visualClassName: "product-card__visual product-card__visual--vibe",
          visualType: "vibe",
          mode: "Mode 03 · new",
          visualLabel: "pulse · orange",
          ctaHref: productPageHref.vibe,
          specs: [
            ["Use", "Live · Co-create"],
            ["Mode", "Realtime"],
            ["Status", "Preview"],
          ],
        },
      ],
    },
    audiences: {
      slides: [
        {
          title: ["For", "Musicians"],
          short: "Musicians",
          sub: ["Studio-grade taste", "at your fingertips."],
          body: "少花时间追参考，多把时间留给完成作品。Sonicite Flow 和你一起听，找到下一步，并逐渐适配你的风格。",
          cta: "Try Flow",
          href: flowHref,
        },
        {
          title: ["For", "Brands & Spaces"],
          short: "Brands",
          sub: ["A signature sound", "that scales."],
          body: "Atmos 把品牌变成一套可运行的声音系统，随时间、天气和人流调整，同时保持每个空间里的统一识别度。",
          cta: "Explore Atmos",
          href: atmosHref,
        },
        {
          title: ["For", "Listeners"],
          short: "Listeners",
          sub: ["Music that meets you", "where you are."],
          body: "Vibe 为当下的房间、情绪和人群共同生成声音，让参与者进入实时共创的音乐体验。",
          cta: "Meet Vibe",
          href: vibeHref,
        },
      ],
      previous: "Previous",
      next: "Next",
      label: "Audience slides",
    },
    highlights: {
      eyebrow: "Why Sonicite",
      title: "Why Sonicite",
      description:
        "一套声音智能系统需要理解、生成、编排，并在真实场景中持续进化。",
      list: [
        {
          title: "Understand",
          pillar: "understand",
          summary: "Reveal the structure, emotion, and intent behind sound.",
        },
        {
          title: "Create",
          pillar: "create",
          summary: "Transform ideas, emotions, and language into music.",
        },
        {
          title: "Orchestrate",
          pillar: "orchestrate",
          summary: "Adapt sound across people, spaces, and moments.",
        },
        {
          title: "Evolve",
          pillar: "evolve",
          summary: "Learn from creators, audiences, and environments.",
        },
      ],
    },
    blog: {
      eyebrow: "Insights",
      title: "Sound intelligence. In writing.",
      description:
        "Perspectives on music, identity, and the technology behind both. Field notes from people building the system that finally takes sound seriously.",
      tabs: ["全部", "品牌", "技术", "产品"],
      articles: [
        {
          id: "blog-1",
          title: "为什么音乐推荐不够用",
          summary:
            "推荐算法关注的是「你可能喜欢什么」，而不是「你现在需要什么」。Sonicite 选择了一条不同的路径——从场景和意图出发理解声音。",
          category: "技术",
          image: "/images/blog-1.png",
        },
        {
          id: "blog-2",
          title: "咖啡店的声音不该是随机的",
          summary:
            "一家咖啡店的早高峰和午后时段需要完全不同的声音节奏。Atmos 通过理解营业节奏，让声音真正服务于空间体验。",
          category: "品牌",
          image: "/images/blog-2.png",
        },
        {
          id: "blog-3",
          title: "Sonicite 技术架构：四个核心能力",
          summary:
            "理解、搜索、编排、操作——这四个能力如何协同工作，构成一个完整的声音智能系统。",
          category: "技术",
          image: "/images/blog-3.png",
        },
        {
          id: "blog-4",
          title: "从 DJ 台到零售空间：声音智能的两条路径",
          summary:
            "Sonicite 和 Atmos 看起来是两个产品，但它们共享同一个核心——让声音判断从直觉变成系统。",
          category: "品牌",
          image: "/images/blog-4.png",
        },
        {
          id: "blog-5",
          title: "Sonicite 1.0 发布：更快理解音乐的工作流",
          summary:
            "重新设计的音乐理解界面，让 DJ 在几秒内读取一首歌的能量、情绪和结构。",
          category: "产品",
          image: "/images/blog-5.png",
        },
        {
          id: "blog-6",
          title: "Atmos 如何编排一整天的声音氛围",
          summary:
            "从晨间到深夜，Atmos 分析全天候的声音曲线，让每一个时段都有恰到好处的声音陪伴。",
          category: "产品",
          image: "/images/blog-6.png",
        },
      ],
      page: "第 01 / 14",
      viewMore: "查看全部条目 →",
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
      productLinks: ["Sonicite Flow", "Sonicite Atmos", "Sonicite Vibe"],
      company: "公司",
      companyLinks: ["Experiences", "博客", "关于", "联系"],
      legal: "法律",
      legalLinks: ["隐私", "条款"],
      socialLinks: ["IG", "YouTube", "Rednote", "SoundCloud", "MixCloud"],
      copyright: "© 2026 Sonicite. All rights reserved.",
    },
  },
  en: {
    nav: {
      flow: "flow",
      atmos: "atmos",
      vibe: "vibe",
      brand: "Flow",
      products: "Product",
      experiences: "experiences",
      highlights: "Highlights",
      blog: "blog",
      about: "about",
      contact: "contact",
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
      ctaTertiary: "Explore Sonicite Vibe",
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
    constellation: {
      eyebrow: "02 / Constellation",
      meta: "Three orbits · one center",
      center: ["Sonicite", "System"],
      modules: [
        { id: "flow", href: "#flow", name: "sonicite", label: "flow", ariaLabel: "Sonicite Flow" },
        { id: "atmos", href: "#atmos", name: "sonicite", label: "atmos", ariaLabel: "Sonicite Atmos" },
        { id: "vibe", href: "#vibe", name: "sonicite", label: "vibe", ariaLabel: "Sonicite Vibe" },
      ],
      footLabel: "Read",
      foot:
        "Three modules orbit one shared sound intelligence core. Flow serves music workflows, Atmos serves spatial atmosphere, and Vibe frames the live co-creation direction inside the same system.",
    },
    products: {
      title: "One sound intelligence system",
      description:
        "Three entry points, one shared core. From DJ workflow, to brand atmosphere, to live co-creation — sound, understood and orchestrated.",
      list: [
        {
          id: "sonicite-card",
          className: "product-card product-card--sonicite",
          label: "For DJs & Music Curators",
          title: "Sonicite Flow",
          module: "flow",
          summary:
            "An AI music workflow system for DJs and music curators — understand, organize, and sequence music more efficiently.",
          cta: "View Sonicite",
          visualClassName: "product-card__visual product-card__visual--sonicite",
          visualType: "flow",
          mode: "Mode 01",
          visualLabel: "signal · purple",
          ctaHref: productPageHref.flow,
          specs: [
            ["Use", "DJs · Curators"],
            ["Mode", "Workflow"],
            ["Status", "Live"],
          ],
        },
        {
          id: "atmos-card",
          className: "product-card product-card--atmos",
          label: "For Brands & Spaces",
          title: "Sonicite Atmos",
          module: "atmos",
          summary: "A dynamic sound system for brands and spaces — sound that shifts with scene, time, and atmosphere.",
          cta: "View Atmos",
          visualClassName: "product-card__visual product-card__visual--atmos",
          visualType: "atmos",
          mode: "Mode 02",
          visualLabel: "field · blue",
          ctaHref: productPageHref.atmos,
          specs: [
            ["Use", "Brands · Spaces"],
            ["Mode", "Dynamic"],
            ["Status", "Live"],
          ],
        },
        {
          id: "vibe-card",
          className: "product-card product-card--vibe",
          label: "For Live & Co-Creation",
          title: "Sonicite Vibe",
          module: "vibe",
          summary:
            "A new music co-creation experience combining AI music generation, live coding, and real-time visual interaction.",
          cta: "View Vibe",
          visualClassName: "product-card__visual product-card__visual--vibe",
          visualType: "vibe",
          mode: "Mode 03 · new",
          visualLabel: "pulse · orange",
          ctaHref: productPageHref.vibe,
          specs: [
            ["Use", "Live · Co-create"],
            ["Mode", "Realtime"],
            ["Status", "Preview"],
          ],
        },
      ],
    },
    audiences: {
      slides: [
        {
          title: ["For", "Musicians"],
          short: "Musicians",
          sub: ["Studio-grade taste", "at your fingertips."],
          body: "Spend less time chasing references and more time finishing tracks. Sonicite Flow listens with you, finds the next move, and adapts to your style.",
          cta: "Try Flow",
          href: flowHref,
        },
        {
          title: ["For", "Brands & Spaces"],
          short: "Brands",
          sub: ["A signature sound", "that scales."],
          body: "Atmos turns your brand into a living sound system — adapting to time, weather, and footfall while staying unmistakably you across every venue.",
          cta: "Explore Atmos",
          href: atmosHref,
        },
        {
          title: ["For", "Listeners"],
          short: "Listeners",
          sub: ["Music that meets you", "where you are."],
          body: "Vibe co-creates sound for the room you're in, the mood you're in, and the people you're with — in real time, with the people in it.",
          cta: "Meet Vibe",
          href: vibeHref,
        },
      ],
      previous: "Previous",
      next: "Next",
      label: "Audience slides",
    },
    highlights: {
      eyebrow: "Why Sonicite",
      title: "Why Sonicite",
      description:
        "A sound intelligence system has to understand, create, orchestrate, and keep learning in context.",
      list: [
        {
          title: "Understand",
          pillar: "understand",
          summary: "Reveal the structure, emotion, and intent behind sound.",
        },
        {
          title: "Create",
          pillar: "create",
          summary: "Transform ideas, emotions, and language into music.",
        },
        {
          title: "Orchestrate",
          pillar: "orchestrate",
          summary: "Adapt sound across people, spaces, and moments.",
        },
        {
          title: "Evolve",
          pillar: "evolve",
          summary: "Learn from creators, audiences, and environments.",
        },
      ],
    },
    blog: {
      eyebrow: "Insights",
      title: "Sound intelligence. In writing.",
      description:
        "Perspectives on music, identity, and the technology behind both. Field notes from people building the system that finally takes sound seriously.",
      tabs: ["All", "Brand", "Tech", "Product"],
      articles: [
        {
          id: "blog-1",
          title: "Why Music Recommendation Is Not Enough",
          summary:
            "Recommendation algorithms focus on what you might like, not what you need right now. Sonicite takes a different path — understanding sound through context and intent.",
          category: "Tech",
          image: "/images/blog-1.png",
        },
        {
          id: "blog-2",
          title: "A Coffee Shop's Sound Shouldn't Be Random",
          summary:
            "Morning rush and afternoon lull need completely different sonic rhythms. Atmos understands business tempo to make sound truly serve the spatial experience.",
          category: "Brand",
          image: "/images/blog-2.png",
        },
        {
          id: "blog-3",
          title: "Sonicite Architecture: Four Core Capabilities",
          summary:
            "Understand, Search, Orchestrate, Operate — how these four capabilities work together to form a complete sound intelligence system.",
          category: "Tech",
          image: "/images/blog-3.png",
        },
        {
          id: "blog-4",
          title: "From DJ Booth to Retail: Two Paths of Sonic Intelligence",
          summary:
            "Sonicite and Atmos look like two products, but they share the same core — turning sonic judgment from intuition into system.",
          category: "Brand",
          image: "/images/blog-4.png",
        },
        {
          id: "blog-5",
          title: "Sonicite 1.0 Launch: A Faster Music Understanding Workflow",
          summary:
            "Redesigned music understanding interface lets DJs read a song's energy, mood, and structure in seconds.",
          category: "Product",
          image: "/images/blog-5.png",
        },
        {
          id: "blog-6",
          title: "How Atmos Orchestrates a Full Day of Sonic Atmosphere",
          summary:
            "From morning to midnight, Atmos analyzes all-day sound curves to ensure every moment has just the right sonic companion.",
          category: "Product",
          image: "/images/blog-6.png",
        },
      ],
      page: "Page 01 / 14",
      viewMore: "View all entries →",
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
      productLinks: ["Sonicite Flow", "Sonicite Atmos", "Sonicite Vibe"],
      company: "Company",
      companyLinks: ["Experiences", "Blog", "About", "Contact"],
      legal: "Legal",
      legalLinks: ["Privacy", "Terms"],
      socialLinks: ["IG", "YouTube", "Rednote", "SoundCloud", "MixCloud"],
      copyright: "© 2026 Sonicite. All rights reserved.",
    },
  },
};

function FooterSocialIcon({ link }) {
  if (link === "IG") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  if (link === "YouTube") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M22.5 7.2c-.25-1.5-1-2.4-2.4-2.6C17.8 4.2 12 4.2 12 4.2s-5.8 0-8.1.4c-1.4.2-2.15 1.1-2.4 2.6C1.2 9.4 1.2 12 1.2 12s0 2.6.3 4.8c.25 1.5 1 2.4 2.4 2.6 2.3.4 8.1.4 8.1.4s5.8 0 8.1-.4c1.4-.2 2.15-1.1 2.4-2.6.3-2.2.3-4.8.3-4.8s0-2.6-.3-4.8z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
      </svg>
    );
  }

  if (link === "Rednote") {
    return <span>RED</span>;
  }

  if (link === "SoundCloud") {
    return (
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
    );
  }

  if (link === "MixCloud") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="7" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  return <span>{link}</span>;
}

function ProductVisual({ type }) {
  if (type === "flow") {
    return (
      <>
        <svg className="pv-mesh" viewBox="0 0 400 250" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="flow-g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#6b46c1" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="flow-g2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="400" height="250" fill="url(#flow-g1)" opacity="0.18" />
          <g className="pv-lines" stroke="url(#flow-g2)" fill="none" strokeLinecap="round">
            <path strokeWidth="1.2" d="M0,180 Q60,160 100,170 T200,150 T300,160 T400,140" />
            <path strokeWidth="1" d="M0,170 Q60,140 100,150 T200,120 T300,140 T400,120" opacity="0.85" />
            <path strokeWidth="0.9" d="M0,160 Q60,120 100,130 T200,95 T300,120 T400,100" opacity="0.7" />
            <path strokeWidth="0.8" d="M0,150 Q60,100 100,110 T200,70 T300,100 T400,80" opacity="0.55" />
            <path strokeWidth="0.7" d="M0,140 Q60,80 100,90 T200,50 T300,80 T400,60" opacity="0.4" />
            <path strokeWidth="0.6" d="M0,130 Q60,60 100,70 T200,30 T300,60 T400,40" opacity="0.25" />
          </g>
        </svg>
        <div className="pv-grain"></div>
        <div className="pv-orb pv-orb-1"></div>
        <div className="pv-orb pv-orb-2"></div>
      </>
    );
  }

  if (type === "atmos") {
    return (
      <>
        <div className="pv-aurora pv-aurora-1"></div>
        <div className="pv-aurora pv-aurora-2"></div>
        <div className="pv-aurora pv-aurora-3"></div>
        <svg className="pv-rings" viewBox="0 0 400 250" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <radialGradient id="atmos-rg" cx="50%" cy="55%" r="50%">
              <stop offset="0%" stopColor="#bcd9ff" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#79b7ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="140" r="120" fill="url(#atmos-rg)" />
          <g fill="none" stroke="rgba(188,217,255,0.35)">
            <ellipse cx="200" cy="140" rx="165" ry="50" strokeWidth="0.5" />
            <ellipse cx="200" cy="140" rx="140" ry="38" strokeWidth="0.5" opacity="0.7" />
            <ellipse cx="200" cy="140" rx="110" ry="26" strokeWidth="0.5" opacity="0.5" />
            <ellipse cx="200" cy="140" rx="80" ry="16" strokeWidth="0.5" opacity="0.35" />
          </g>
        </svg>
        <div className="pv-grain"></div>
      </>
    );
  }

  return (
    <>
      <div className="pv-vgrid"></div>
      <svg className="pv-pulse" viewBox="0 0 400 250" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="vibe-stroke" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#ffd9b3" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffb069" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff7a2e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="url(#vibe-stroke)" fill="none" strokeWidth="1.5" strokeLinecap="round">
          <path d="M0,125 L60,125 L72,90 L84,160 L96,70 L108,170 L120,100 L140,125 L200,125 L212,80 L224,170 L236,50 L248,180 L260,110 L280,125 L400,125" />
        </g>
      </svg>
      <div className="pv-scan"></div>
      <div className="pv-grain"></div>
    </>
  );
}

function StepVisual({ pillar }) {
  if (pillar === "understand") {
    return (
      <div className="step-visual" aria-hidden="true">
        <svg viewBox="0 0 120 80" className="step-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="grad-understand" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#a78bfa" stopOpacity="0.95" />
              <stop offset="1" stopColor="#a78bfa" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <g stroke="url(#grad-understand)" fill="none" strokeWidth="1.4" strokeLinecap="round">
            <path className="sv-wave" d="M6,40 Q18,18 30,40 T54,40 T78,40 T102,40 T126,40" />
            <path className="sv-wave sv-wave-2" d="M6,52 Q22,32 38,52 T70,52 T102,52 T134,52" opacity="0.45" />
          </g>
          <g className="sv-bars" stroke="#a78bfa" strokeWidth="1.6" strokeLinecap="round">
            {[22, 38, 54, 70, 86, 102].map((x, index) => (
              <line key={x} x1={x} y1={62 - Math.abs(2 - index) * 2} x2={x} y2="68" />
            ))}
          </g>
        </svg>
      </div>
    );
  }

  if (pillar === "create") {
    return (
      <div className="step-visual" aria-hidden="true">
        <svg viewBox="0 0 120 80" className="step-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="grad-create" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#79b7ff" stopOpacity="0.95" />
              <stop offset="1" stopColor="#79b7ff" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path className="sv-create" d="M10,52 L26,52 L34,28 L46,62 L58,18 L70,58 L82,34 L94,46 L110,46" stroke="url(#grad-create)" fill="none" strokeWidth="1.4" strokeLinecap="round" />
          <g className="sv-create-dots" fill="#79b7ff">
            <circle cx="34" cy="28" r="2" />
            <circle cx="58" cy="18" r="2.4" />
            <circle cx="82" cy="34" r="2" />
          </g>
          <g className="sv-create-spark" stroke="#79b7ff" strokeWidth="1" strokeLinecap="round" opacity="0.55">
            <line x1="58" y1="10" x2="58" y2="4" />
            <line x1="52" y1="12" x2="48" y2="8" />
            <line x1="64" y1="12" x2="68" y2="8" />
          </g>
        </svg>
      </div>
    );
  }

  if (pillar === "orchestrate") {
    return (
      <div className="step-visual" aria-hidden="true">
        <svg viewBox="0 0 120 80" className="step-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="grad-orch" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#f5a05c" stopOpacity="0.9" />
              <stop offset="1" stopColor="#f5a05c" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g className="sv-orch-links" stroke="#f5a05c" strokeWidth="1" opacity="0.45">
            <line x1="30" y1="20" x2="60" y2="40" />
            <line x1="90" y1="20" x2="60" y2="40" />
            <line x1="22" y1="58" x2="60" y2="40" />
            <line x1="98" y1="58" x2="60" y2="40" />
            <line x1="60" y1="66" x2="60" y2="40" />
          </g>
          <circle cx="60" cy="40" r="16" fill="url(#grad-orch)" />
          <circle cx="60" cy="40" r="4" fill="#f5a05c" />
          <g className="sv-orch-nodes" fill="#f5a05c">
            <circle cx="30" cy="20" r="2.4" />
            <circle cx="90" cy="20" r="2.4" />
            <circle cx="22" cy="58" r="2.4" />
            <circle cx="98" cy="58" r="2.4" />
            <circle cx="60" cy="66" r="2.4" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className="step-visual" aria-hidden="true">
      <svg viewBox="0 0 120 80" className="step-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="grad-evolve" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#a78bfa" stopOpacity="0.85" />
            <stop offset="0.5" stopColor="#79b7ff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#f5a05c" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <path className="sv-evolve-trace" d="M8,62 C24,60 28,52 38,50 C50,48 54,40 64,36 C76,32 82,22 96,18 L112,14" stroke="url(#grad-evolve)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <g className="sv-evolve-dots">
          <circle cx="8" cy="62" r="2" fill="#a78bfa" />
          <circle cx="38" cy="50" r="2.2" fill="#a78bfa" />
          <circle cx="64" cy="36" r="2.4" fill="#79b7ff" />
          <circle cx="96" cy="18" r="2.6" fill="#f5a05c" />
          <circle cx="112" cy="14" r="3" fill="#f5a05c" />
        </g>
        <g className="sv-evolve-rings" stroke="#f5a05c" fill="none" opacity="0.45">
          <circle cx="112" cy="14" r="6" />
          <circle cx="112" cy="14" r="10" opacity="0.55" />
        </g>
      </svg>
    </div>
  );
}

function AudienceSection({ copy }) {
  const [activeAudience, setActiveAudience] = useState(0);
  const slides = copy.audiences.slides;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveAudience((current) => (current + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const goToAudience = (nextIndex) => {
    setActiveAudience((nextIndex + slides.length) % slides.length);
  };

  return (
    <section
      className="section audiences audiences-section reveal"
      id="audiences"
      aria-labelledby="audiences-title"
      data-aud-active={activeAudience}
    >
      <div className="aud-bg" aria-hidden="true">
        <div className="aud-gradient"></div>
        <div className="aud-wash"></div>
        <div className="aud-grain"></div>
      </div>

      <div className="section__inner aud-container">
        <div className="section-rule aud-section-rule">
          <span className="section-rule-label">Audiences</span>
        </div>

        <div className="aud-stage" data-aud-stage>
          <button className="aud-arrow aud-arrow-prev" type="button" aria-label={copy.audiences.previous} data-aud-prev onClick={() => goToAudience(activeAudience - 1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <div className="aud-track" data-aud-track>
            {slides.map((slide, index) => {
              const previousSlide = slides[(index - 1 + slides.length) % slides.length];
              const nextSlide = slides[(index + 1) % slides.length];
              return (
                <article
                  className={`aud-slide ${activeAudience === index ? "is-active" : ""}`}
                  key={slide.short}
                  data-aud-slide={index}
                >
                  <h2 className="aud-title" id={index === 0 ? "audiences-title" : undefined} data-prev={`For ${previousSlide.short}`} data-next={`For ${nextSlide.short}`}>
                    {slide.title[0]} <em>{slide.title[1]}</em>
                  </h2>
                  <p className="aud-sub">
                    {slide.sub[0]}
                    <br />
                    {slide.sub[1]}
                  </p>
                  <p className="aud-body">{slide.body}</p>
                  <a className="aud-cta" href={slide.href}>
                    <span>{slide.cta}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </a>
                </article>
              );
            })}
          </div>

          <button className="aud-arrow aud-arrow-next" type="button" aria-label={copy.audiences.next} data-aud-next onClick={() => goToAudience(activeAudience + 1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="aud-foot">
          <div className="aud-dots" role="tablist" aria-label={copy.audiences.label}>
            {slides.map((slide, index) => (
              <button
                className={`aud-dot ${activeAudience === index ? "is-active" : ""}`}
                type="button"
                key={slide.short}
                aria-label={slide.short}
                aria-selected={activeAudience === index}
                data-aud-goto={index}
                onClick={() => goToAudience(index)}
              ></button>
            ))}
          </div>
          <span className="aud-count">
            <span>{String(activeAudience + 1).padStart(2, "0")}</span>
            <span className="aud-count-sep">∕</span>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

function BlogSection({ blogHref, copy, locale }) {
  return (
    <section className="home-blog reveal" id="blog" aria-labelledby="blog-title">
      <div className="section__inner home-blog-inner">
        <div className="home-section-rule">
          <span>Notes</span>
        </div>

        <div className="home-blog-head reveal">
          <h2 id="blog-title">{copy.blog.title}</h2>
          <p>{copy.blog.description}</p>
        </div>

        <div className="home-blog-grid reveal">
          {homeBlogArticles.map((article) => (
            <a className="home-blog-card" href={`/blog/${article.id}?lang=${locale}`} key={article.id}>
              <div className="home-blog-card__image">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  loading="eager"
                  className="home-blog-card__img"
                  sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
                />
              </div>
              <div className="home-blog-card__meta">
                <span>{article.category}</span>
              </div>
              <h3>{article.title}</h3>
              <span className="home-blog-card__date">{article.date}</span>
              <span className="home-blog-card__byline">{article.readTime}</span>
              <span className="home-blog-card__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" focusable="false">
                  <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>

        <div className="home-blog-pagination reveal">
          <span>6 entries</span>
          <a href={blogHref}>
            <span>Read all on the blog</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function ConstellationSection({ copy }) {
  const constellationLabel = copy.constellation.eyebrow.replace(/^\d+\s*\/\s*/, "");

  return (
    <section className="section constellation constellation-section reveal" id="constellation" aria-labelledby="constellation-title">
      <div className="section__inner">
        <div className="section-rule const-section-rule">
          <span className="section-rule-label" id="constellation-title">{constellationLabel}</span>
          <span className="const-meta">{copy.constellation.meta}</span>
        </div>

        <div className="const-stage constellation-stage" aria-label={copy.constellation.meta}>
          <div className="const-bands constellation-bands" aria-hidden="true"></div>

          <svg className="const-ring constellation-ring" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <circle cx="300" cy="300" r="230" fill="none" stroke="rgba(245,241,232,0.22)" strokeWidth="0.8" />
            <circle cx="300" cy="300" r="230" fill="none" stroke="rgba(245,241,232,0.06)" strokeWidth="0.8" strokeDasharray="2 6" />
          </svg>

          <div className="const-center constellation-center" aria-hidden="true">
            <span className="const-center-label">
              {copy.constellation.center.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </span>
          </div>

          {copy.constellation.modules.map((module) => (
            <div className={`orbit orbit-${module.id} constellation-orbit constellation-orbit--${module.id}`} key={module.id}>
              <a className={`orb orb-${module.id} constellation-orb constellation-orb--${module.id}`} href={module.href} aria-label={module.ariaLabel}>
                <span className="orb-blob constellation-orb__blob" aria-hidden="true"></span>
                <span className="orb-counter constellation-orb__counter">
                  <span className="orb-label constellation-orb__label">
                    {module.name}
                    <br />
                    <em>{module.label}</em>
                  </span>
                </span>
              </a>
            </div>
          ))}

          <svg className="const-paths constellation-paths" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <circle cx="300" cy="300" r="180" fill="none" stroke="rgba(245,241,232,0.07)" strokeWidth="0.6" />
            <circle cx="300" cy="300" r="230" fill="none" stroke="rgba(245,241,232,0.06)" strokeWidth="0.6" />
            <circle cx="300" cy="300" r="270" fill="none" stroke="rgba(245,241,232,0.05)" strokeWidth="0.6" />
          </svg>
        </div>

        <div className="const-foot constellation-foot">
          <span className="const-foot-cap">{copy.constellation.footLabel}</span>
          <span className="const-foot-val">{copy.constellation.foot}</span>
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

    const revealVisibleElements = () => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const hasEnteredViewport = rect.top < window.innerHeight * 0.95;
        const isNotFarAboveViewport = rect.bottom > -window.innerHeight * 0.25;

        if (hasEnteredViewport && isNotFarAboveViewport) {
          element.classList.add("is-visible");
        }
      });
    };

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

    elements.forEach((element) => {
      if (!element.classList.contains("is-visible")) {
        observer.observe(element);
      }
    });

    const frameId = window.requestAnimationFrame(revealVisibleElements);
    const timeoutId = window.setTimeout(revealVisibleElements, 160);
    window.addEventListener("pageshow", revealVisibleElements);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("pageshow", revealVisibleElements);
    };
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
  const experiencesHref = `/experiences?lang=${locale}`;
  const footerProductHrefByLabel = {
    "Sonicite Flow": flowHref,
    "Sonicite Atmos": atmosHref,
    "Sonicite Vibe": vibeHref,
  };
  const footerCompanyHrefByLabel = {
    Experiences: experiencesHref,
    Blog: blogHref,
    "博客": blogHref,
    About: aboutHref,
    "关于": aboutHref,
    Contact: contactHref,
    "联系": contactHref,
  };

  return (
    <div className="page-shell">
      <SiteNav locale={locale} setLocale={setLocale} current="home" labels={copy} />

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
                <a className="button button--primary" href={flowHref}>
                  {copy.hero.ctaPrimary}
                </a>
                <a className="button button--secondary" href={atmosHref}>
                  {copy.hero.ctaSecondary}
                </a>
                <a className="button button--secondary" href={vibeHref}>
                  {copy.hero.ctaTertiary}
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

        <ConstellationSection copy={copy} />

        <section className="section section--products products reveal" id="product-split" aria-labelledby="products-title">
          <div className="section__inner">
            <div className="section-rule home-products-rule">
              <span className="section-rule-label">System</span>
            </div>
            <div className="products-head reveal">
              <h2 className="products-title" id="products-title">{copy.products.title}</h2>
              <p className="products-sub">{copy.products.description}</p>
            </div>

            <div className="products-grid">
              {copy.products.list.map((product) => (
                <article
                  className={`${product.className} tilt`}
                  data-product={product.module}
                  id={product.id}
                  key={product.id}
                >
                  <span className="module-anchor" id={product.module} aria-hidden="true"></span>
                  <div className="pc-header">
                    <span className="pc-num">{product.module === "flow" ? "Flow" : product.module === "atmos" ? "Atmos" : "Vibe"}</span>
                    <span className="pc-mode">
                      <span className="pc-dot"></span>
                      <span>{product.mode}</span>
                    </span>
                  </div>
                  <div className={`pc-glow pc-glow-${product.module === "flow" ? "purple" : product.module === "atmos" ? "blue" : "amber"}`}></div>
                  <div className={`pc-visual visual-${product.module}`} data-label={product.visualLabel} aria-hidden="true">
                    <ProductVisual type={product.visualType} />
                  </div>

                  <div className="pc-body">
                    {product.module === "vibe" ? (
                      <div className="pc-eyebrow-row">
                        <span className="eyebrow">{product.label}</span>
                        <span className="pc-badge">New</span>
                      </div>
                    ) : (
                      <span className="eyebrow">{product.label}</span>
                    )}
                    <h3 className="pc-title pc-title--logo">
                      <Image
                        className="pc-logo-img"
                        src={productLogoSrc[product.module]}
                        alt={product.title}
                        width={596}
                        height={193}
                        sizes="(max-width: 720px) 220px, 280px"
                      />
                    </h3>
                    <div className="pc-row">
                      <p className="pc-desc">{product.summary}</p>
                      <a
                        className="pc-arrow"
                        href={product.ctaHref?.startsWith("/") ? `${product.ctaHref}?lang=${locale}` : product.ctaHref || `#${product.id}`}
                        aria-label={product.cta}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="pc-spec" aria-label={`${product.title} details`}>
                    {product.specs.map(([key, value]) => (
                      <div key={`${product.id}-${key}`}>
                        <span className="pc-spec-key">{key}</span>
                        <span className="pc-spec-val">{value}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <AudienceSection copy={copy} />

        <section className="section how reveal" id="highlights" aria-labelledby="highlights-title">
          <div className="section__inner">
            <div className="section-rule home-how-rule">
              <span className="section-rule-label">{copy.highlights.eyebrow}</span>
            </div>
            <div className="how-head reveal">
              <h2 className="how-title" id="highlights-title">{copy.highlights.title}</h2>
            </div>

            <div className="how-grid">
              {copy.highlights.list.map((highlight) => (
                <article className="step-card reveal" data-pillar={highlight.pillar} key={highlight.title}>
                  <StepVisual pillar={highlight.pillar} />
                  <h4 className="step-title">{highlight.title}</h4>
                  <p className="step-desc">{highlight.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BlogSection blogHref={blogHref} copy={copy} locale={locale} />
      </main>

      <footer className="site-footer" id="footer">
        <div className="sf-accent" aria-hidden="true"></div>

        <div className="section__inner sf-grid reveal">
          <div className="sf-col sf-brand">
            <a className="sf-logo" href="#top" aria-label={copy.nav.homeLabel}>
              <Image src={logoSrc} alt="sonicite" width={2000} height={800} className="sonicite-logo-img" />
            </a>
            <p className="sf-tagline">Sound, finally on purpose.</p>
          </div>

          <nav className="sf-col" aria-label={copy.footer.products}>
            <h5 className="sf-col-title">{copy.footer.products}</h5>
            <ul>
              {copy.footer.productLinks.map((link) => (
                <li key={link}>
                  <a href={footerProductHrefByLabel[link] || "#product-split"}>{link}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="sf-col" aria-label={copy.footer.company}>
            <h5 className="sf-col-title">{copy.footer.company}</h5>
            <ul>
              {copy.footer.companyLinks.map((link) => (
                <li key={link}>
                  <a href={footerCompanyHrefByLabel[link] || "#top"}>{link}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sf-col sf-subscribe">
            <h3 className="sf-circle-title">Stay in tune</h3>
            <p className="sf-circle-body">{copy.footer.description}</p>

            <form className="sf-sub-form" onSubmit={handleFooterSubmit} noValidate>
              <label className="sf-sub-row" htmlFor="sf-sub-email">
                <input
                  id="sf-sub-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                  className="sf-sub-input"
                  disabled={newsletterStatus === "success"}
                />
                <button
                  className={`sf-sub-btn ${newsletterStatus === "success" ? "is-sent" : ""}`}
                  type="submit"
                  aria-label={copy.footer.subscribe}
                  disabled={newsletterStatus === "sending" || newsletterStatus === "success"}
                >
                  {newsletterStatus === "success" ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </label>
              <p className={`sf-sub-note ${newsletterStatus === "error" ? "is-error" : ""}`}>
                {newsletterStatus === "success"
                  ? copy.footer.subscribeSuccess
                  : newsletterStatus === "error"
                    ? copy.footer.subscribeError
                    : copy.footer.privacy}
              </p>
            </form>
          </div>
        </div>

        <div className="section__inner sf-base">
          <nav className="sf-base-left" aria-label={copy.footer.legal}>
            {copy.footer.legalLinks.map((link) => (
              <a className="sf-base-link" href="#top" key={link}>
                {link}
              </a>
            ))}
          </nav>

          <nav className="sf-base-center sf-social" aria-label="Social">
            {copy.footer.socialLinks.map((link) => (
              <a
                className={`sf-social-link ${link === "Rednote" ? "sf-social-text" : ""}`}
                href={footerSocialHrefs[link] || "#top"}
                key={link}
                target={footerSocialHrefs[link] ? "_blank" : undefined}
                rel={footerSocialHrefs[link] ? "noreferrer" : undefined}
                aria-label={link}
              >
                <FooterSocialIcon link={link} />
              </a>
            ))}
          </nav>

          <div className="sf-base-right">
            <span>{copy.footer.copyright}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

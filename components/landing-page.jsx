"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { articleListCopyByLocale } from "./blog-article-list";

const heroVideoSrc =
  "https://ufwqrsdoaxjxcsbxpirb.supabase.co/storage/v1/object/public/langding_page/landing_all.mp4";
const localeStorageKey = "sonicite-landing-locale";
const logoSrc = "/images/sonicite-logo.png";
const flowHref = "https://flow.sonicite.ai";
const atmosHref = "https://atmos.sonicite.ai";
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
    constellation: {
      eyebrow: "02 / Constellation",
      meta: "Three orbits · one center",
      center: ["Sonicite", "System"],
      modules: [
        { id: "flow", href: "#sonicite-card", name: "sonicite", label: "flow", ariaLabel: "Sonicite Flow" },
        { id: "atmos", href: "#atmos-card", name: "sonicite", label: "atmos", ariaLabel: "Sonicite Atmos" },
        { id: "vibe", href: "#product-split", name: "sonicite", label: "vibe", ariaLabel: "Sonicite Vibe" },
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
          ctaHref: flowHref,
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
          ctaHref: atmosHref,
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
          href: "#vibe-card",
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
    constellation: {
      eyebrow: "02 / Constellation",
      meta: "Three orbits · one center",
      center: ["Sonicite", "System"],
      modules: [
        { id: "flow", href: "#sonicite-card", name: "sonicite", label: "flow", ariaLabel: "Sonicite Flow" },
        { id: "atmos", href: "#atmos-card", name: "sonicite", label: "atmos", ariaLabel: "Sonicite Atmos" },
        { id: "vibe", href: "#product-split", name: "sonicite", label: "vibe", ariaLabel: "Sonicite Vibe" },
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
          label: "For DJs & Music Workflows",
          title: "Sonicite Flow",
          module: "flow",
          summary: "Understand music faster and make more stable sequencing decisions.",
          cta: "View Sonicite",
          visualClassName: "product-card__visual product-card__visual--sonicite",
          visualType: "flow",
          mode: "Mode 01",
          visualLabel: "signal · purple",
          ctaHref: flowHref,
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
          title: "Atmos",
          module: "atmos",
          summary: "Orchestrate a full day of sonic atmosphere for your space.",
          cta: "View Atmos",
          visualClassName: "product-card__visual product-card__visual--atmos",
          visualType: "atmos",
          mode: "Mode 02",
          visualLabel: "field · blue",
          ctaHref: atmosHref,
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
          title: "Vibe",
          module: "vibe",
          summary: "A music co-creation experience combining AI music generation, live interaction, and real-time visuals.",
          cta: "View Vibe",
          visualClassName: "product-card__visual product-card__visual--vibe",
          visualType: "vibe",
          mode: "Mode 03 · new",
          visualLabel: "pulse · orange",
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
          body: "Atmos turns your brand into a living sound system, adapting to time, weather, and footfall while staying unmistakably you across every venue.",
          cta: "Explore Atmos",
          href: atmosHref,
        },
        {
          title: ["For", "Listeners"],
          short: "Listeners",
          sub: ["Music that meets you", "where you are."],
          body: "Vibe co-creates sound for the room you are in, the mood you are in, and the people you are with, in real time.",
          cta: "Meet Vibe",
          href: "#vibe-card",
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

function formatBlogDate(date) {
  return date ? date.replaceAll(".", " · ") : "";
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
      className="section audiences-section"
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
        <div className="aud-stage">
          <button className="aud-arrow aud-arrow-prev" type="button" aria-label={copy.audiences.previous} onClick={() => goToAudience(activeAudience - 1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <div className="aud-track">
            {slides.map((slide, index) => {
              const previousSlide = slides[(index - 1 + slides.length) % slides.length];
              const nextSlide = slides[(index + 1) % slides.length];
              return (
                <article
                  className={`aud-slide ${activeAudience === index ? "is-active" : ""}`}
                  key={slide.short}
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

          <button className="aud-arrow aud-arrow-next" type="button" aria-label={copy.audiences.next} onClick={() => goToAudience(activeAudience + 1)}>
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
                onClick={() => goToAudience(index)}
              ></button>
            ))}
          </div>
          <span className="aud-count">
            <span>{String(activeAudience + 1).padStart(2, "0")}</span>
            <span className="aud-count-sep">/</span>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

function BlogSection({ blogHref, copy, locale }) {
  const articles = articleListCopyByLocale[locale].articles.slice(0, 6);

  return (
    <section className="section section--blog" id="blog" aria-labelledby="blog-title">
      <div className="section__inner">
        <div className="blog-header reveal">
          <h2 id="blog-title">{copy.blog.title}</h2>
          <p>{copy.blog.description}</p>
        </div>

        <div className="blog-grid reveal">
          {articles.map((article, index) => (
            <a className="blog-card" href={`/blog/${article.id}?lang=${locale}`} key={article.id}>
              <div className="blog-card__visual">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="blog-card__image"
                  sizes="80px"
                />
                <div className="blog-card__image-overlay"></div>
              </div>
              <span className="blog-card__category">{article.category}</span>
              <h3>{article.title}</h3>
              <span className="blog-card__date">{formatBlogDate(article.date)}</span>
              <span className="blog-card__byline">{article.readTime}</span>
              <span className="blog-card__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
              <span className="sr-only">{String(index + 1).padStart(2, "0")}</span>
            </a>
          ))}
        </div>

        <div className="blog-pagination reveal">
          <span>{copy.blog.page}</span>
          <a href={blogHref}>
            {copy.blog.viewMore}
          </a>
        </div>
      </div>
    </section>
  );
}

function ConstellationSection({ copy }) {
  return (
    <section className="section constellation-section" id="constellation" aria-labelledby="constellation-title">
      <div className="section__inner">
        <div className="constellation-head">
          <span id="constellation-title">{copy.constellation.eyebrow}</span>
          <span>{copy.constellation.meta}</span>
        </div>

        <div className="constellation-stage" aria-label={copy.constellation.meta}>
          <div className="constellation-bands" aria-hidden="true"></div>

          <svg className="constellation-ring" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <circle cx="300" cy="300" r="230" fill="none" stroke="rgba(245,241,232,0.22)" strokeWidth="0.8" />
            <circle cx="300" cy="300" r="230" fill="none" stroke="rgba(245,241,232,0.06)" strokeWidth="0.8" strokeDasharray="2 6" />
          </svg>

          <div className="constellation-center" aria-hidden="true">
            {copy.constellation.center.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>

          {copy.constellation.modules.map((module) => (
            <div className={`constellation-orbit constellation-orbit--${module.id}`} key={module.id}>
              <a className={`constellation-orb constellation-orb--${module.id}`} href={module.href} aria-label={module.ariaLabel}>
                <span className="constellation-orb__blob" aria-hidden="true"></span>
                <span className="constellation-orb__counter">
                  <span className="constellation-orb__label">
                    {module.name}
                    <em>{module.label}</em>
                  </span>
                </span>
              </a>
            </div>
          ))}

          <svg className="constellation-paths" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <circle cx="300" cy="300" r="180" fill="none" stroke="rgba(245,241,232,0.07)" strokeWidth="0.6" />
            <circle cx="300" cy="300" r="230" fill="none" stroke="rgba(245,241,232,0.06)" strokeWidth="0.6" />
            <circle cx="300" cy="300" r="270" fill="none" stroke="rgba(245,241,232,0.05)" strokeWidth="0.6" />
          </svg>
        </div>

        <div className="constellation-foot">
          <span>{copy.constellation.footLabel}</span>
          <p>{copy.constellation.foot}</p>
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
                <a className="button button--primary" href={flowHref}>
                  {copy.hero.ctaPrimary}
                </a>
                <a className="button button--secondary" href={atmosHref}>
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

        <ConstellationSection copy={copy} />

        <section className="section section--products" id="product-split" aria-labelledby="products-title">
          <div className="section__inner">
            <div className="products-header reveal">
              <h2 id="products-title">{copy.products.title}</h2>
              <p>{copy.products.description}</p>
            </div>

            <div className="product-grid">
              {copy.products.list.map((product) => (
                <article className={product.className} id={product.id} key={product.id}>
                  <div className="product-card__meta">
                    <span>{product.title.replace("Sonicite ", "")}</span>
                    <span>
                      <span className="product-card__status-dot"></span>
                      {product.mode}
                    </span>
                  </div>
                  <div className="product-card__visual-frame">
                    <div className={product.visualClassName} data-label={product.visualLabel}>
                      <ProductVisual type={product.visualType} />
                    </div>
                  </div>

                  <div className="product-card__body">
                    <div className="product-card__header">
                      <p className="product-card__label">{product.label}</p>
                      <h3>
                        <span className="product-card__title-brand">sonicite</span>{" "}
                        <span className={`product-card__title-module product-card__title-module--${product.module}`}>
                          {product.module}
                        </span>
                      </h3>
                      <p className="product-card__summary">{product.summary}</p>
                    </div>

                    <a className="product-card__cta" href={product.ctaHref || `#${product.id}`} aria-label={product.cta}>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>

                  <div className="product-card__specs" aria-label={`${product.title} details`}>
                    {product.specs.map(([key, value]) => (
                      <div className="product-card__spec" key={`${product.id}-${key}`}>
                        <span>{key}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <AudienceSection copy={copy} />

        <section className="section section--highlights" id="highlights" aria-labelledby="highlights-title">
          <div className="section__inner">
            <h2 className="sr-only" id="highlights-title">
              {copy.highlights.title}
            </h2>

            <div className="highlights-header reveal">
              <p className="eyebrow eyebrow--muted">{copy.highlights.eyebrow}</p>
              <h2>{copy.highlights.title}</h2>
              <p>{copy.highlights.description}</p>
            </div>

            <div className="highlight-grid">
              {copy.highlights.list.map((highlight, index) => (
                <article className="highlight-card reveal" data-pillar={highlight.pillar} key={highlight.title}>
                  <span className="highlight-card__index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <StepVisual pillar={highlight.pillar} />
                  <h3>{highlight.title}</h3>
                  <p>{highlight.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BlogSection blogHref={blogHref} copy={copy} locale={locale} />
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

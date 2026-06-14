"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductHeroShader } from "./product-hero-shader";
import { SiteFooter, SiteNav } from "./sonicite-shared";

const localeStorageKey = "sonicite-landing-locale";

const productLogos = {
  flow: "/images/products/sonicite-flow-logo.png",
  atmos: "/images/products/sonicite-atmos-logo.png",
  vibe: "/images/products/sonicite-vibe-logo.png",
};

const navLabels = {
  nav: {
    product: "产品",
    products: "产品",
    experiences: "现场体验",
    blog: "博客",
    about: "关于",
    contact: "联系",
    homeLabel: "Sonicite 首页",
  },
  locale: { zh: "CN", en: "EN" },
};

const audienceSlides = [
  {
    title: "面向 DJ 与音乐策划者",
    titleEm: "DJs & Music Curators",
    sub: "把专业级判断放到手边。",
    body: "少花时间追参考，多把时间留给完成作品。Sonicite Flow 和你一起听，找到下一步，并逐渐适配你的风格。",
    href: "/flow",
    cta: "体验 Flow",
  },
  {
    title: "面向品牌与空间",
    titleEm: "Brands & Spaces",
    sub: "可规模化的品牌声音识别。",
    body: "Atmos 把品牌变成一套可运行的声音系统，随时间、天气和人流调整，同时保持每个空间里的统一识别度。",
    href: "/atmos",
    cta: "了解 Atmos",
  },
  {
    title: "面向听众",
    titleEm: "Listeners",
    sub: "音乐回应你所在的当下。",
    body: "Vibe 为当下的房间、情绪和人群共同生成声音，让参与者进入实时共创的音乐体验。",
    href: "/vibe",
    cta: "认识 Vibe",
  },
];

const productPages = {
  flow: {
    module: "flow",
    title: "Sonicite Flow",
    accent: "flow",
    externalHref: "https://flow.sonicite.ai/",
    heroTitle: "不再迷失。",
    heroAccent: "被音乐带路。",
    heroSub: "知道你要去哪里的音乐工作流。",
    heroNote: "为 DJ 打造，试点期免费。",
    primaryCta: "加入候补名单",
    secondaryCta: null,
    videoLabel: "产品影片 - 即将嵌入",
    audienceIndex: 0,
    sections: [
      {
        type: "flora",
        eyebrow: "如何工作",
        title: <>覆盖你工作流的<em>每一个环节。</em></>,
        sub: "从混乱曲库，到可直接上场的 set。",
        items: [
          {
            num: "01",
            label: "曲库",
            title: "终于真正理解你的曲库。",
            body: "Flow 解析每首歌的风格、能量、情绪、音色、人声和和声结构，并自动生成标签。",
            expanded: "混音建议会同步出现。你的曲库不再只是文件夹，而是一套可操作的工具。",
            visual: "library",
          },
          {
            num: "02",
            label: "搜索",
            title: "按感觉找歌，也能找到它的双生曲。",
            body: '输入你想要的感受，比如「强烈但不分散注意力」，Flow 会搜索你的曲库和已连接平台。',
            expanded: "也可以从一首你喜欢的歌出发：Flow 会找出能量、调性和情绪相近的曲目，并给出相似度。",
            visual: "search",
          },
          {
            num: "03",
            label: "歌单",
            title: "选择场景，生成整套 set。",
            body: "Club、音乐节、咖啡店、时装活动：选择场景后，Flow 会生成符合能量曲线与情绪的 setlist。",
            expanded: "你可以替换任意曲目、自由调整顺序，整体逻辑仍会保持稳定。",
            visual: "setlist",
          },
          {
            num: "04",
            label: "助手",
            title: "真正了解你曲库的建议。",
            body: "你可以询问混音技巧、设备或乐理。Flow 助手拥有你的曲库上下文。",
            expanded: "它给出的建议会引用你的真实曲目，而不是抽象假设。",
            visual: "assistant",
          },
        ],
      },
      {
        type: "beliefs",
        eyebrow: "为什么是 Flow",
        items: [
          ["让曲库终于懂你。", "Flow 理解你已经拥有的音乐，而不只是 metadata。它读取能量、质感、人声、调性、情绪和适配度。"],
          ["突破自己的音乐边界。", "找到相邻曲目、意外双生曲和新的 set 方向，让你的审美持续移动，同时不丢掉自己的身份。"],
          ["任何场地、任何 vibe，都能准备好。", "在进入现场前，把场景、时间和能量转化成可执行的 set 结构。"],
          ["像已经演过一百次那样上场。", "判断仍然属于你，Flow 负责周围的聆听、比较和结构。"],
        ],
      },
    ],
    finalTitle: <>准备好听见<span>差别了吗？</span></>,
    finalBody: "加入候补名单，成为第一批用 Flow 管理曲库的 DJ。",
  },
  atmos: {
    module: "atmos",
    title: "Sonicite Atmos",
    accent: "atmos",
    externalHref: "https://atmos.sonicite.ai/",
    heroTitle: "不只是被听见。",
    heroAccent: "而是被感知。",
    heroSub: "超越播放列表，一套活的声音身份。",
    heroNote: null,
    primaryCta: "加入试点",
    secondaryCta: "聆听你的空间",
    videoLabel: "空间影片 + Atmos 界面 - 即将嵌入",
    audienceIndex: 1,
    sections: [
      {
        type: "stats",
        eyebrow: "为什么声音重要",
        title: <>空间里的每个细节都被<em>设计过。</em>除了声音。</>,
        sub: "光线、材质、气味都被认真考虑，但大多数空间仍把背景音乐交给随机播放。Atmos 改变这件事。",
        items: [
          ["+38%", "停留时间", "当音乐匹配空间节奏，客人会停留更久。"],
          ["+9%", "单次消费", "速度和能量会直接影响人的移动方式，以及他们点什么。"],
          ["96%", "品牌记忆", "声音先被情绪处理，再被意识处理。它会留下来。"],
          ["2x", "情绪响应", "音乐触发的情绪参与度，是其他环境刺激的两倍。"],
        ],
      },
      {
        type: "flora",
        eyebrow: "如何工作",
        title: <>从几个问题开始，生成一套<em>活的声音身份。</em></>,
        items: [
          ["01", "描述", "描述你的空间，我们读取你的品牌。", "回答四个关于空间和客人的问题。也可以更深入：上传品牌手册，或输入你的网站。", "Atmos 会读取视觉身份，并把它翻译成声音方向。", "品牌输入"],
          ["02", "人格", "你的品牌声音人格开始成形。", "Atmos 会匹配空间的声音原型，并生成有名字的人格，包括声音方向、空间气质、偏好和避雷。", "这不是一种曲风，而是围绕品牌建立的角色。", "人格卡片"],
          ["03", "上线", "音乐开始运行，像专业 set 一样编排。", "每首歌都按调性、能量和情绪弧线选择与排序，就像专业 DJ 搭建一套 set。", "不是 shuffle，不是随机，而是一段连续、贴合空间并随时段变化的声音旅程。", "实时播放"],
          ["04", "调音", "调整情绪，训练你的声音。", "拖动情绪旋钮，在 Fluid 与 Structured、Easy 与 Intense 之间切换，并实时听到变化。", "互动越多，Atmos 越能精准理解你的空间需要什么。", "空间调音旋钮"],
        ].map(([num, label, title, body, expanded, visual]) => ({ num, label, title, body, expanded, visual })),
      },
      {
        type: "marquee",
        eyebrow: "声音原型",
        title: <>12 种声音身份。<em>哪一种属于你的空间？</em></>,
        sub: "每个原型都包含策划音乐、声音方向和人格设定。悬停即可预览。",
        items: ["安静工作室", "缓慢绽放", "深夜酒吧", "开放舞池", "创作工坊", "花园", "长途公路", "高挑大厅", "阳光房", "丝绒房间", "工作间", "门槛"],
      },
      {
        type: "beliefs",
        eyebrow: "为什么是 Atmos",
        items: [
          ["不是播放列表，而是声音身份。", "Atmos 为你的空间建立一套活的声音语言，而不是一堆还不错的随机曲目。"],
          ["由音乐总监建立，由 AI 持续细化。", "人类审美设定框架，AI 让系统随时间保持适应、响应和一致。"],
          ["早上 9 点和晚上 9 点听起来不同。", "Atmos 随一天的节奏变化，同时保留统一的品牌感受。"],
          ["播放越久，越贴合。", "反馈、情绪变化和空间行为会持续帮助声音变得更具体、更属于你。"],
        ],
      },
      {
        type: "beyond",
        eyebrow: "平台之外",
        title: <>需要从零<em>定制声音</em>吗？</>,
        sub: "适合品牌活动、快闪空间和需要被设计而不是被播放的事件。我们会选择性承接项目。",
        items: ["品牌活动", "快闪空间", "产品发布", "文化事件", "零售开业"],
      },
      {
        type: "faq",
        eyebrow: "FAQ",
        title: <>几个直接的<em>回答。</em></>,
        items: [
          ["Atmos 和 Spotify 或播放列表服务有什么不同？", "Spotify 帮听众发现可能喜欢的音乐。Atmos 为品牌空间建立声音身份：匹配你的原型、客人和营业节奏。"],
          ["声音可以定制到什么程度？", "可以完全定制。你可以用四个快速问题生成第一版，也可以深入输入品牌资料、人群画像和全天时段节奏设置。"],
          ["Pilot 试点包含什么？", "我们会直接与少量空间合作部署 Atmos，收集真实反馈，并一起打磨产品。"],
          ["Atmos 适合什么空间？", "咖啡店、餐厅、零售店、酒店、疗愈空间、画廊、活动场地，以及任何声音重要的真实空间。"],
        ],
      },
    ],
    finalTitle: <>准备让你的空间拥有<span>自己的声音</span>了吗？</>,
    finalBody: "加入试点，为你的空间塑造一套活的声音身份。",
  },
  vibe: {
    module: "vibe",
    title: "Sonicite Vibe",
    accent: "vibe",
    externalHref: "https://vibe.sonicite.ai/",
    heroTitle: "不是预先安排。",
    heroAccent: "而是现场生成。",
    heroSub: "永远不是一个人玩的创作。",
    heroBody: "一句话，一个房间，所有人一起进入。",
    heroNote: "无需注册。",
    primaryCta: "创建房间",
    secondaryCta: null,
    audienceIndex: 2,
    sections: [
      {
        type: "cards3",
        eyebrow: "如何工作",
        title: <>一句话，生成<em>一整场 jam。</em></>,
        items: [
          ["Prompt · 描述", "告诉 Vibe 你正在感受什么。", "不需要乐理，不需要 DAW。中文、英文、emoji 都可以。描述一种情绪、一个地点或一段记忆。", "\"rainy Tokyo · BPM 92 · piano on the off-beat · a touch of distortion\""],
          ["生成", "3 秒内出现音乐。", "AI 把你的文字翻译成可播放的 pattern code，并匹配风格、BPM 和约束。无需等待，无需猜测。", "setcps(0.92);\nstack(\"~ piano ~ piano*2\".jux(rev), \"bd ~ ~ sd\".distort(0.3))"],
          ["Jam", "分享链接，整个房间一起听见。", "一个 URL，所有人加入同一个房间，在世界任何地方同步聆听、编辑和回应。", "LIVE  vibe.sonicite/r/tokyo-rain\n4 listening · 1 editing"],
        ],
      },
      {
        type: "drops",
        eyebrow: "Vibe Drops",
        title: <>想不到要放什么？<em>从这里开始。</em></>,
        sub: "不断增长的情绪预设库。选一个，点击播放，分享房间。",
        items: ["after rain", "soft chaos", "warehouse sunrise", "late train", "slow bloom", "neon study", "warm static", "empty club", "roof party", "quiet bass"],
      },
      {
        type: "show",
        eyebrow: "演出模式",
        title: <>音乐开始播放，<em>房间也开始响应。</em></>,
        sub: "声音生成的瞬间，视觉场景也会启动。可以同步到屏幕、墙面或现场空间。",
        items: [
          ["场景切换", "Radar · Cracks · Torn · Particles，会随 BPM 和情绪自动切换。"],
          ["投影模式", "一键全屏：LED 墙、投影仪、派对屏幕，连接即可使用。"],
          ["品牌背景", "上传 logo 或视觉身份，Vibe 会把它适配成现场演出背景。"],
        ],
      },
      {
        type: "beliefs",
        eyebrow: "为什么是 Vibe",
        items: [
          ["不需要任何经验。", "只要能描述感受，就能用 Vibe 做音乐。不需要 DAW、乐理或插件。"],
          ["一个链接，无限协作者。", "把整个房间邀请进同一段声音，不论他们在听、编辑、回应还是表演。"],
          ["音乐和视觉一起发生。", "生成的声音已经知道该如何带动屏幕、墙面或现场空间。"],
          ["开放、可延展、可演出。", "Vibe 把音乐当作共享的现场对象，让人们一起塑造它。"],
        ],
      },
    ],
    finalTitle: <>现在就<span>创建房间。</span></>,
    finalBody: "音乐已经在等你。",
  },
};

function useLocale() {
  const [locale, setLocale] = useState("zh");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get("lang");
    const next = paramLang === "zh" || paramLang === "en" ? paramLang : "zh";
    setLocale(next);
  }, []);

  const updateLocale = (next) => {
    setLocale(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(localeStorageKey, next);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      window.history.replaceState(null, "", url.toString());
    }
  };

  return [locale, updateLocale];
}

function ProductRule({ label }) {
  return (
    <div className="pd-rule">
      <span>{label}</span>
    </div>
  );
}

function ProductHero({ page }) {
  return (
    <section className="pd-hero">
      <ProductHeroShader brand={page.module} />
      <div className="pd-hero-inner">
        <ProductHeroWordmark module={page.module} title={page.title} />
        <h1>
          {page.heroTitle} <span>{page.heroAccent}</span>
        </h1>
        <p className="pd-hero-sub">{page.heroSub}</p>
        {page.heroBody ? <p className="pd-hero-body">{page.heroBody}</p> : null}
        <div className="pd-hero-actions">
          <a className="pd-btn" href={page.externalHref} target="_blank" rel="noreferrer">
            {page.primaryCta}
          </a>
          {page.secondaryCta ? (
            <a className="pd-btn pd-btn--ghost" href="#how">
              {page.secondaryCta}
            </a>
          ) : null}
          {page.heroNote ? <span className="pd-hero-note">{page.heroNote}</span> : null}
        </div>
      </div>
    </section>
  );
}

function ProductHeroWordmark({ module, title }) {
  return (
    <svg className="pd-hero-wordmark" viewBox="0 0 380 80" preserveAspectRatio="xMidYMid meet" aria-label={title} role="img">
      <g transform="translate(22 40)" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round">
        <circle cx="0" cy="0" r="22" strokeOpacity="0.16" />
        <path d="M-20 -10 a 22 22 0 0 1 40 0" opacity="0.95" />
        <path d="M-21 -3 a 22 22 0 0 1 42 0" opacity="0.82" />
        <path d="M-22 4 a 22 22 0 0 1 44 0" opacity="0.7" />
        <path d="M-20 11 a 22 22 0 0 1 40 0" opacity="0.55" />
        <path d="M-17 17 a 22 22 0 0 1 34 0" opacity="0.4" />
      </g>
      <text x="60" y="58" fill="var(--pd-accent)" fontFamily="Inter, 'Helvetica Neue', Arial, sans-serif" fontWeight="800" fontSize="52" letterSpacing="-0.02em">
        {module}
      </text>
    </svg>
  );
}

function FloraSection({ section }) {
  const [active, setActive] = useState(0);
  return (
    <ProductSection section={section} id={section.eyebrow === "如何工作" ? "how" : undefined}>
      <div className="pd-flora">
        {section.items.map((item, index) => (
          <button className={`pd-flora-card ${active === index ? "is-active" : ""}`} type="button" key={item.title} onClick={() => setActive(index)}>
            <span className="pd-flora-num">
              <strong>{item.num}</strong> · {item.label}
            </span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <p className="pd-flora-expanded">{item.expanded}</p>
            <FloraVisual type={item.visual} />
          </button>
        ))}
      </div>
    </ProductSection>
  );
}

function FloraVisual({ type }) {
  if (type === "library") {
    return (
      <div className="pd-mini pd-mini-library">
        {[0, 1, 2].map((row) => (
          <div className="pd-mini-row" key={row}>
            <span className="pd-mini-wave">{Array.from({ length: 10 }).map((_, i) => <i key={i}></i>)}</span>
            <span className="pd-mini-meta">
              <b>{["Pendulum - Slam", "Bicep - Apricots", "Floating Points - Birth"][row]}</b>
              <small>{["温暖 · groove · 128", "明亮 · vocal · 124", "深潜 · minimal · 122"][row]}</small>
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (type === "search") {
    return (
      <div className="pd-mini">
        <div className="pd-mini-search">强烈但不分散注意力</div>
        {["Skee Mask - CZ3000 Dust 94%", "Four Tet - Two Thousand 91%", "DJ Python - Pia 88%"].map((item) => (
          <span className="pd-mini-result" key={item}>{item}</span>
        ))}
      </div>
    );
  }
  if (type === "setlist") {
    return (
      <div className="pd-mini pd-mini-arc">
        <span>Club 场景</span>
        <svg viewBox="0 0 240 80" aria-hidden="true">
          <path d="M0 62 C45 62 78 42 118 30 C160 18 190 24 240 48" />
        </svg>
        <small>8 首 · 62 分钟 · 124 bpm</small>
      </div>
    );
  }
  if (type === "assistant") {
    return (
      <div className="pd-mini pd-mini-chat">
        <span>让第二小时更紧。</span>
        <b>换到 A 小调里更紧的 groove。</b>
        <i></i>
      </div>
    );
  }
  return (
    <div className="pd-mini pd-mini-label">
      <span>{type}</span>
    </div>
  );
}

function ProductSection({ section, children, id }) {
  return (
    <section className="pd-section" id={id}>
      <div className="pd-section-inner">
        <ProductRule label={section.eyebrow} />
        {section.title ? <h2 className="pd-section-title">{section.title}</h2> : null}
        {section.sub ? <p className="pd-section-sub">{section.sub}</p> : null}
        {children}
      </div>
    </section>
  );
}

function StatsSection({ section }) {
  return (
    <ProductSection section={section}>
      <div className="pd-data-grid">
        {section.items.map(([stat, label, body]) => (
          <article className="pd-data-card" key={label}>
            <strong>{stat}</strong>
            <span>{label}</span>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </ProductSection>
  );
}

function BeliefsSection({ section }) {
  return (
    <ProductSection section={section}>
      <div className="pd-beliefs-grid">
        {section.items.map(([title, body], index) => (
          <article className="pd-belief-card" key={title}>
            <div className="pd-belief-icon" data-slot={index} aria-hidden="true"></div>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </ProductSection>
  );
}

function MarqueeSection({ section }) {
  const items = [...section.items, ...section.items];
  return (
    <ProductSection section={section}>
      <div className="pd-marquee">
        <div className="pd-marquee-track">
          {items.map((item, index) => (
            <article className="pd-archetype" key={`${item}-${index}`}>
              <span>声音原型</span>
              <h4>{item}</h4>
              <p>策划方向、情绪速度，以及可重复的声音人格。</p>
            </article>
          ))}
        </div>
      </div>
    </ProductSection>
  );
}

function Cards3Section({ section }) {
  return (
    <ProductSection section={section}>
      <div className="pd-cards-3">
        {section.items.map(([eyebrow, title, body, example]) => (
          <article className="pd-card-3" key={title}>
            <span>{eyebrow}</span>
            <h3>{title}</h3>
            <p>{body}</p>
            <pre>{example}</pre>
          </article>
        ))}
      </div>
    </ProductSection>
  );
}

function DropsSection({ section }) {
  return (
    <ProductSection section={section}>
      <div className="pd-drops">
        {[0, 1].map((row) => (
          <div className={`pd-drops-row ${row === 1 ? "is-reverse" : ""}`} key={row}>
            {[...section.items, ...section.items].map((item, index) => (
              <span key={`${row}-${item}-${index}`}>{item}</span>
            ))}
          </div>
        ))}
      </div>
    </ProductSection>
  );
}

function ShowSection({ section }) {
  return (
    <ProductSection section={section}>
      <div className="pd-show-grid">
        <div className="pd-show-visual" aria-hidden="true"></div>
        <div className="pd-show-list">
          {section.items.map(([title, body]) => (
            <article key={title}>
              <h4>{title}</h4>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </ProductSection>
  );
}

function BeyondSection({ section }) {
  return (
    <ProductSection section={section}>
      <div className="pd-beyond">
        <a href="/experiences" className="pd-beyond-link">查看我们的现场案例</a>
        <ul>
          {section.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </ProductSection>
  );
}

function FaqSection({ section }) {
  const [open, setOpen] = useState(0);
  return (
    <ProductSection section={section}>
      <div className="pd-faq">
        {section.items.map(([question, answer], index) => (
          <article className={`pd-faq-item ${open === index ? "is-open" : ""}`} key={question}>
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
              {question}
              <span></span>
            </button>
            <p>{answer}</p>
          </article>
        ))}
      </div>
    </ProductSection>
  );
}

function AudienceSection({ activeIndex }) {
  const [selected, setSelected] = useState(activeIndex);
  const [direction, setDirection] = useState("next");
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    setSelected(activeIndex);
  }, [activeIndex]);

  const goTo = (nextIndex) => {
    if (nextIndex === selected) return;
    const total = audienceSlides.length;
    const forward = (nextIndex - selected + total) % total <= total / 2;
    setDirection(forward ? "next" : "prev");
    setSelected(nextIndex);
    setChanging(true);
    window.setTimeout(() => setChanging(false), 720);
  };

  const previous = () => goTo((selected - 1 + audienceSlides.length) % audienceSlides.length);
  const next = () => goTo((selected + 1) % audienceSlides.length);
  const activeSlide = audienceSlides[selected];
  const prevSlide = audienceSlides[(selected - 1 + audienceSlides.length) % audienceSlides.length];
  const nextSlide = audienceSlides[(selected + 1) % audienceSlides.length];

  return (
    <section className={`pd-audience ${changing ? "is-changing" : ""}`} data-aud-active={selected} data-aud-dir={direction}>
      <div className="pd-audience-bg" aria-hidden="true">
        <div className="pd-audience-gradient"></div>
        <div className="pd-audience-wash"></div>
        <div className="pd-audience-grain"></div>
      </div>
      <div className="pd-section-inner pd-audience-container">
        <div className="pd-audience-stage">
          <button className="pd-audience-arrow" type="button" aria-label="上一组受众" onClick={previous}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <div className="pd-audience-track">
          {audienceSlides.map((slide, index) => (
            <article className={`pd-audience-slide ${selected === index ? "is-active" : ""}`} key={slide.title}>
              <h2 className="pd-audience-title" data-prev={prevSlide.title} data-next={nextSlide.title}>
                面向 <em>{slide.titleEm}</em>
              </h2>
              <p className="pd-audience-sub">{slide.sub}</p>
              <p className="pd-audience-body">{slide.body}</p>
              <a className="pd-audience-cta" href={slide.href}>
                <span>{slide.cta}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </article>
          ))}
          </div>
          <button className="pd-audience-arrow" type="button" aria-label="下一组受众" onClick={next}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="pd-audience-foot">
          <div className="pd-audience-dots" role="tablist" aria-label="受众轮播">
            {audienceSlides.map((slide, index) => (
              <button
                className={`pd-audience-dot ${selected === index ? "is-active" : ""}`}
                type="button"
                aria-label={slide.title}
                aria-selected={selected === index}
                key={slide.title}
                onClick={() => goTo(index)}
              ></button>
            ))}
          </div>
          <span className="pd-audience-count">
            <span>{String(selected + 1).padStart(2, "0")}</span>
            <span className="pd-audience-count-sep">/</span>
            <span>03</span>
          </span>
        </div>
      </div>
    </section>
  );
}

function ProductVideo({ page }) {
  if (!page.videoLabel) return null;
  return (
    <section className="pd-video-band">
      <div className="pd-video-frame">
        <span>{page.videoLabel}</span>
      </div>
    </section>
  );
}

function SectionRenderer({ section }) {
  if (section.type === "flora") return <FloraSection section={section} />;
  if (section.type === "stats") return <StatsSection section={section} />;
  if (section.type === "beliefs") return <BeliefsSection section={section} />;
  if (section.type === "marquee") return <MarqueeSection section={section} />;
  if (section.type === "cards3") return <Cards3Section section={section} />;
  if (section.type === "drops") return <DropsSection section={section} />;
  if (section.type === "show") return <ShowSection section={section} />;
  if (section.type === "beyond") return <BeyondSection section={section} />;
  if (section.type === "faq") return <FaqSection section={section} />;
  return null;
}

export function ProductDetailPage({ product }) {
  const [locale, setLocale] = useLocale();
  const page = productPages[product] || productPages.flow;

  return (
    <div className={`pd-page pd-page-${page.module}`}>
      <SiteNav locale={locale} setLocale={setLocale} current={page.module} labels={navLabels} />
      <main>
        <ProductHero page={page} />
        <ProductVideo page={page} />
        {page.sections.map((section, index) => (
          <SectionRenderer section={section} key={`${section.type}-${index}`} />
        ))}
        <AudienceSection activeIndex={page.audienceIndex} />
        <section className="pd-final-cta">
          <h2>{page.finalTitle}</h2>
          <p>{page.finalBody}</p>
          <a className="pd-btn" href={page.externalHref} target="_blank" rel="noreferrer">{page.primaryCta}</a>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

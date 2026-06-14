"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PageAmbient, SectionRule, SiteFooter, SiteNav } from "./sonicite-shared";

const localeStorageKey = "sonicite-landing-locale";

const founders = [
  {
    name: "Brenda",
    last: "Xia",
    role: "产品 · 策略",
    tone: "purple",
    image: "/images/founders/brenda.jpg",
    text: "5 岁开始学习音乐，在北美 12 年学习商业、从事 hospitality 工作，并为创业公司打造产品。她不断遇到同一个问题：声音没有足够好的工具。于是决定不再等待。",
  },
  {
    name: "Stephen",
    last: "Li",
    role: "架构 · LLM",
    tone: "rose",
    image: "/images/founders/stephen.jpg",
    text: "曾任职 Microsoft、IBM、Morgan Stanley。20 多年来持续把复杂问题转化为可靠系统，在 Sonicite 负责 LLM 架构与全栈开发。",
  },
  {
    name: "Cookie",
    last: "Pang",
    role: "工程 · 系统",
    tone: "blue",
    image: "/images/founders/cookie.jpg",
    text: "曾任职 Tencent，多年构建大规模系统。相信最好的基础设施是几乎不会被注意到的那一种，负责技术架构与产品开发。",
  },
  {
    name: "Mia",
    last: "Zhang",
    role: "增长 · 合作",
    tone: "amber",
    image: "/images/founders/mia.jpg",
    text: "曾任职 Huawei Africa，在许多人不会想到的地方从零建立市场。负责增长、合作，以及找到最需要 Sonicite 的人。",
  },
];

const beliefs = [
  {
    tone: "purple",
    title: "声音不是",
    emphasis: "装饰",
    text: "它塑造人的感受、专注、移动和记忆。把它当作背景噪音，是一种会悄悄累积后果的设计失误。",
  },
  {
    tone: "blue",
    title: "审美不能被",
    emphasis: "自动化",
    text: "AI 应该扩展人类判断的可能性，而不是替代它。最好的工具会让人在自己真正关心的工作上变得更敏锐。",
  },
  {
    tone: "amber",
    title: "音乐是一种",
    emphasis: "语言",
    text: "它传达语言无法传达的东西：情绪、记忆、身份与归属。它值得拥有和媒介本身同样认真、同样被深思熟虑的工具。",
  },
  {
    tone: "rose",
    title: "社区才是",
    emphasis: "重点",
    text: "那些场景、空间，以及持续为彼此出现的人。声音是媒介，连接始终是目标。",
  },
];

const timeline = [
  ["2025 · Q4", "创立", "Sonicite 开始。", "S-tron Hackathon 上，Sonicite Flow 第一次在真实用户面前运行。某些东西被点亮了。"],
  ["2026 · Jan", "构建中", "Sonicite Flow 上线。", "内部 beta 开放。第一批真实用户，第一轮真实反馈。"],
  ["2026 · Mar", "构建中", "Sonicite Atmos 成形。", "第一次 Atmos demo。我们开始制作音乐，而不只是制作播放音乐的工具。"],
  ["2026 · May", "构建中", "Sonicite Vibe 发布。", "真实现场、真实房间。声音在当下与房间里的人一起生成。"],
  ["2026 · Jun", "现在", "开始开放。", "第一批合作开始：MuShanghai、Cyborg Party、Altnext。Sonicite Experiences 启动。"],
  ["→", "下一步", "接下来。", "更多空间，更多创作者，更多关于声音能成为什么的答案。"],
];

const partners = [
  ["/images/partners/altnext.png", "AltNext"],
  ["/images/partners/waic.png", "WAIC"],
  ["/images/partners/insland.png", "INS Land"],
  ["/images/partners/mushanghai.png", "Mu Shanghai"],
];

const copyByLocale = {
  zh: {
    nav: {
      flow: "Flow",
      atmos: "Atmos",
      vibe: "Vibe",
      experiences: "现场体验",
      blog: "博客",
      about: "关于",
      contact: "联系",
      homeLabel: "Sonicite 首页",
    },
    locale: { zh: "CN", en: "EN" },
  },
  en: {
    nav: {
      flow: "Flow",
      atmos: "Atmos",
      vibe: "Vibe",
      experiences: "现场体验",
      blog: "博客",
      about: "关于",
      contact: "联系",
      homeLabel: "Sonicite home",
    },
    locale: { zh: "CN", en: "EN" },
  },
};

function AboutHeroArt() {
  return (
    <svg className="hv8-art-svg about-hero-svg" viewBox="0 0 520 520" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="aboutHaloA" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8b8ff" stopOpacity="0.45" />
          <stop offset="0.55" stopColor="#b4c8e8" stopOpacity="0.18" />
          <stop offset="1" stopColor="#0f0f10" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="aboutHaloB" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e8b4be" stopOpacity="0.3" />
          <stop offset="1" stopColor="#0f0f10" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="aboutRingStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8b8ff" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#b4c8e8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#e8c8a0" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <circle cx="260" cy="260" r="230" fill="url(#aboutHaloA)" className="about-art-halo" />
      <circle cx="260" cy="260" r="170" fill="url(#aboutHaloB)" className="about-art-halo2" />
      <g fill="none" stroke="url(#aboutRingStroke)" strokeLinecap="round" className="about-art-rings">
        <circle cx="260" cy="260" r="60" strokeWidth="1.5" opacity="0.85" />
        <circle cx="260" cy="260" r="95" strokeWidth="1.3" opacity="0.65" />
        <circle cx="260" cy="260" r="135" strokeWidth="1.1" opacity="0.45" />
        <circle cx="260" cy="260" r="180" strokeWidth="0.9" opacity="0.28" />
        <circle cx="260" cy="260" r="225" strokeWidth="0.7" opacity="0.16" />
      </g>
      <path className="about-art-wave" d="M40 260 Q90 220 120 260 T200 260 T280 260 T360 260 T440 260 T480 260" fill="none" stroke="#e8e6de" strokeWidth="1.4" strokeLinecap="round" opacity="0.72" />
      <path className="about-art-wave about-art-wave-2" d="M40 260 Q90 290 120 260 T200 260 T280 260 T360 260 T440 260 T480 260" fill="none" stroke="#c8b8ff" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
      <g className="about-art-nodes">
        <circle cx="260" cy="200" r="3.2" fill="#c8b8ff" />
        <circle cx="320" cy="260" r="2.6" fill="#b4c8e8" />
        <circle cx="260" cy="320" r="3" fill="#e8c8a0" />
        <circle cx="200" cy="260" r="2.4" fill="#e8b4be" />
      </g>
      <circle cx="260" cy="260" r="4" fill="#f1efe6" className="about-art-core" />
    </svg>
  );
}

function BeliefVisual({ tone }) {
  if (tone === "purple") {
    return (
      <svg viewBox="0 0 120 80" className="about-belief-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="about-belief-grad-purple" cx="0.2" cy="0.5" r="0.9">
            <stop offset="0" stopColor="#c8b8ff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#c8b8ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g stroke="#c8b8ff" fill="none" strokeWidth="1.3" strokeLinecap="round">
          <circle cx="22" cy="40" r="6" opacity="0.9" />
          <path d="M34 32 Q44 40 34 48" opacity="0.75" />
          <path d="M44 24 Q58 40 44 56" opacity="0.55" />
          <path d="M56 18 Q74 40 56 62" opacity="0.4" />
          <path d="M70 14 Q92 40 70 66" opacity="0.28" />
          <path d="M84 10 Q108 40 84 70" opacity="0.18" />
        </g>
        <circle cx="22" cy="40" r="24" fill="url(#about-belief-grad-purple)" />
      </svg>
    );
  }

  if (tone === "blue") {
    return (
      <svg viewBox="0 0 120 80" className="about-belief-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="about-belief-grad-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b4c8e8" stopOpacity="0.9" />
            <stop offset="1" stopColor="#b4c8e8" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <g stroke="url(#about-belief-grad-blue)" fill="none" strokeWidth="1" opacity="0.55">
          <line x1="20" y1="20" x2="100" y2="20" />
          <line x1="20" y1="32" x2="100" y2="32" />
          <line x1="20" y1="44" x2="100" y2="44" />
          <line x1="20" y1="56" x2="100" y2="56" />
          <line x1="20" y1="68" x2="100" y2="68" />
          <line x1="30" y1="14" x2="30" y2="74" />
          <line x1="50" y1="14" x2="50" y2="74" />
          <line x1="70" y1="14" x2="70" y2="74" />
          <line x1="90" y1="14" x2="90" y2="74" />
        </g>
        <g fill="#b4c8e8">
          <circle cx="30" cy="32" r="1.6" opacity="0.5" />
          <circle cx="50" cy="20" r="1.6" opacity="0.5" />
          <circle cx="70" cy="56" r="1.6" opacity="0.5" />
          <circle cx="90" cy="44" r="1.6" opacity="0.5" />
        </g>
        <path d="M14 60 Q24 32 40 36 Q56 40 60 28 Q66 14 88 24 Q104 32 108 18" stroke="#b4c8e8" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <circle cx="60" cy="28" r="3" fill="#b4c8e8" stroke="#0f0f10" strokeWidth="1" />
      </svg>
    );
  }

  if (tone === "amber") {
    return (
      <svg viewBox="0 0 120 80" className="about-belief-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="about-belief-grad-amber" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e8c8a0" stopOpacity="0.95" />
            <stop offset="1" stopColor="#e8c8a0" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <g stroke="url(#about-belief-grad-amber)" strokeWidth="1.3" fill="none" strokeLinecap="round">
          <line x1="22" y1="22" x2="22" y2="58" />
          <path d="M22 22 Q34 18 34 30" />
          <circle cx="22" cy="56" r="4" fill="#e8c8a0" stroke="none" />
          <line x1="42" y1="18" x2="42" y2="54" />
          <line x1="42" y1="18" x2="52" y2="22" />
          <line x1="52" y1="22" x2="52" y2="50" />
          <circle cx="42" cy="54" r="3.4" fill="#e8c8a0" stroke="none" />
          <circle cx="52" cy="50" r="3" fill="#e8c8a0" stroke="none" />
        </g>
        <g stroke="#e8c8a0" strokeWidth="1" strokeLinecap="round" opacity="0.65">
          <path d="M66 30 Q72 26 78 30" />
          <path d="M66 40 Q74 34 82 40" />
          <path d="M66 50 Q76 44 86 50" />
        </g>
        <g fill="#e8c8a0" fontFamily="Georgia, serif" fontStyle="italic" fontSize="10" opacity="0.85">
          <text x="94" y="32">A</text>
          <text x="94" y="46">e</text>
          <text x="94" y="60">i</text>
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 80" className="about-belief-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="about-belief-grad-rose" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0" stopColor="#e8b4be" stopOpacity="0.55" />
          <stop offset="1" stopColor="#e8b4be" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="40" r="28" fill="url(#about-belief-grad-rose)" />
      <g stroke="#e8b4be" strokeWidth="1" opacity="0.55" fill="none">
        <line x1="30" y1="22" x2="60" y2="40" />
        <line x1="90" y1="22" x2="60" y2="40" />
        <line x1="22" y1="56" x2="60" y2="40" />
        <line x1="98" y1="56" x2="60" y2="40" />
        <line x1="60" y1="14" x2="60" y2="40" />
        <line x1="60" y1="66" x2="60" y2="40" />
        <line x1="30" y1="22" x2="90" y2="22" />
        <line x1="22" y1="56" x2="98" y2="56" />
      </g>
      <g fill="#e8b4be">
        <circle cx="30" cy="22" r="2.6" />
        <circle cx="90" cy="22" r="2.6" />
        <circle cx="22" cy="56" r="2.6" />
        <circle cx="98" cy="56" r="2.6" />
        <circle cx="60" cy="14" r="2.6" />
        <circle cx="60" cy="66" r="2.6" />
        <circle cx="60" cy="40" r="4" stroke="#0f0f10" strokeWidth="1" />
      </g>
    </svg>
  );
}

export function AboutPage() {
  const [locale, setLocale] = useState("zh");
  const copy = copyByLocale[locale];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryLocale = params.get("lang");
    setLocale(
      queryLocale === "en" || queryLocale === "zh"
        ? queryLocale
        : "zh",
    );
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem(localeStorageKey, locale);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    window.history.replaceState({}, "", url);
  }, [locale]);

  return (
    <div className="page-shell sc-page about-clone-page">
      <SiteNav locale={locale} setLocale={setLocale} current="about" labels={copy} />
      <PageAmbient />

      <main id="top" className="sc-main">
        <section className="hero-v8 about-hero">
          <div className="hv8-frost" aria-hidden="true"></div>
          <div className="hv8-grain" aria-hidden="true"></div>
          <div className="sc-container hv8-layout about-hero-layout">
            <div className="hv8-text about-hero-text">
              <h1 className="hv8-title about-hero-title">
                <span>
                  因为<em>热爱</em>
                </span>
                <br />
                声音。
              </h1>
              <p className="hv8-dek about-hero-dek">
                Sonicite 由一群关心声音如何塑造情绪、空间、记忆和人与人连接的人共同建立。我们相信，声音值得拥有更好的工具。
              </p>
            </div>
            <div className="hv8-art about-hero-art" aria-hidden="true">
              <AboutHeroArt />
            </div>
          </div>
        </section>

        <section className="thesis about-thesis" id="story">
          <div className="thesis-glow about-thesis-glow" aria-hidden="true"></div>
          <div className="sc-container">
            <SectionRule label="我们的故事" />
            <div className="thesis-grid about-thesis-grid">
              <h2 className="thesis-title">
                我们在打造那些
                <br />
                一直<em>希望</em>&nbsp;存在的工具。
              </h2>
              <div className="thesis-body about-thesis-body">
                <p>它始于一种很具体的感受：站在一套 DJ set 前，或走进一个本该鲜活的空间，却找不到对的音乐。不是因为音乐不存在，而是因为没有好的方式抵达它。</p>
                <p>
                  我们来自音乐、技术、设计和空间。路径不同，撞上的却是<strong>同一堵墙</strong>。所以我们开始自己打造那些一直希望存在的工具。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pullquote pq-v25 about-pullquote">
          <div className="sc-container">
            <div className="pq25-grid pq25-grid-single">
              <figure className="pq25-figure about-quote-figure">
                <span className="pq25-glyph about-quote-glyph" aria-hidden="true">
                  “
                </span>
                <blockquote className="pq25-quote">
                  <p className="pq25-line">
                  声音是<em>沟通</em>。
                  </p>
                  <p className="pq25-line">
                  它是<em>氛围</em>，是<em>身份</em>。
                  </p>
                  <p className="pq25-line">
                  它是<em>记忆</em>。
                  </p>
                  <p className="pq25-line pq25-line-coda about-quote-coda">
                  而且越来越像一种<em>基础设施</em>。
                  </p>
                </blockquote>
                <figcaption className="pq25-cap">
                  <span className="pq25-cap-bar" aria-hidden="true"></span>
                  <span className="pq25-cap-text">来自 Sonicite brief</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="about-beliefs" id="beliefs">
          <div className="sc-container">
            <SectionRule label="我们的信念" />
            <div className="about-section-head">
              <h2>
                我们反复
                <br />
                回到的事情。
              </h2>
            </div>
            <div className="about-beliefs-grid">
              {beliefs.map((belief) => (
                <article className="about-belief-card" data-tone={belief.tone} key={belief.emphasis}>
                  <div className="about-belief-visual" aria-hidden="true">
                    <BeliefVisual tone={belief.tone} />
                  </div>
                  <h3>
                    {belief.title} <em>{belief.emphasis}</em>。
                  </h3>
                  <p>{belief.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-crew" id="team">
          <div className="sc-container">
            <SectionRule label="团队" />
            <div className="sc-section-head">
              <h2 className="sc-section-head-title">
                四位创始人，
                <br />
                一个共同执念。
              </h2>
              <div className="sc-section-head-body">
                <p>四个学科，两座城市，一个值得解决的问题。这是 Sonicite 背后的团队，也包括与我们一起塑造它的更大共创圈。</p>
              </div>
            </div>

            <div className="about-founders-grid">
              {founders.map((founder) => (
                <article className="about-founder-card" data-tone={founder.tone} key={founder.name}>
                  <div className="about-founder-portrait" aria-hidden="true">
                    <div className="about-founder-bg"></div>
                    <Image src={founder.image} alt="" fill sizes="(max-width: 900px) 50vw, 25vw" className="about-founder-photo" />
                    <div className="about-founder-veil"></div>
                    <div className="about-founder-glow"></div>
                  </div>
                  <div className="about-founder-body">
                    <h3>
                      {founder.name} <em>{founder.last}</em>
                    </h3>
                    <p className="about-founder-role">{founder.role}</p>
                    <p>{founder.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="about-advisor">
              <span>共创者</span>
              <p>我们也与获奖制作人、DMC 冠军，以及音乐创作、空间设计和 AI 系统领域的实践者合作。Sonicite 欢迎更广泛的共创计划，因为最有意思的工作，往往发生在使用工具的人也参与塑造工具的时候。</p>
            </div>
          </div>
        </section>

        <section className="about-timeline" id="now">
          <div className="sc-container">
            <SectionRule label="我们在哪里" />
            <div className="about-section-head">
              <h2>一条简短时间线。</h2>
            </div>
            <ol className="about-timeline-list">
              {timeline.map(([year, tag, title, text]) => (
                <li className={`about-timeline-item ${tag === "现在" ? "is-now" : ""} ${tag === "下一步" ? "is-future" : ""}`} key={`${year}-${title}`}>
                  <span className="about-timeline-marker"></span>
                  <div className="about-timeline-meta">
                    <span>{year}</span>
                    <span className={tag === "现在" ? "is-now-tag" : ""}>{tag}</span>
                  </div>
                  <div className="about-timeline-body">
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="about-partners" id="partners">
          <div className="sc-container">
            <SectionRule label="合作伙伴" />
            <div className="about-section-head">
              <h2>
                与我们一起
                <br />
                共建的空间与人。
              </h2>
            </div>
            <ul className="about-partner-logos">
              {partners.map(([src, alt]) => (
                <li key={alt}>
                  <Image src={src} alt={alt} width={240} height={120} />
                </li>
              ))}
            </ul>
            <p className="about-partners-note">更多合作伙伴即将加入。</p>
          </div>
        </section>

        <section className="about-thesis about-thesis-late">
          <div className="sc-container">
            <SectionRule label="向前看" />
            <div className="about-thesis-grid">
              <h2>
                我们仍在<em>早期</em>。
              </h2>
              <div className="about-thesis-body">
                <p>Sonicite 是一场关于声音还能成为什么的持续探索。我们每天都在与创作者、品牌、场地、艺术家和社区一起学习。</p>
                <p>
                  有些答案会来自技术，有些会来自人。<strong>最有意思的答案，会来自两者相遇的地方。</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-invitation">
          <div className="sc-container">
            <div className="about-invitation-card">
              <div className="about-inv-art" aria-hidden="true">
                <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <radialGradient id="aboutInvGrad1" cx="0.2" cy="0.4" r="0.7">
                      <stop offset="0" stopColor="#c8b8ff" stopOpacity="0.55" />
                      <stop offset="1" stopColor="#c8b8ff" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="aboutInvGrad2" cx="0.8" cy="0.7" r="0.65">
                      <stop offset="0" stopColor="#e8b4be" stopOpacity="0.5" />
                      <stop offset="1" stopColor="#e8b4be" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="aboutInvStroke" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#c8b8ff" stopOpacity="0.7" />
                      <stop offset="1" stopColor="#e8c8a0" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  <rect width="320" height="220" fill="url(#aboutInvGrad1)" />
                  <rect width="320" height="220" fill="url(#aboutInvGrad2)" />
                  <g fill="none" stroke="url(#aboutInvStroke)" strokeLinecap="round" className="about-inv-rings">
                    <circle cx="260" cy="110" r="40" strokeWidth="1.1" opacity=".7" />
                    <circle cx="260" cy="110" r="68" strokeWidth="0.9" opacity=".45" />
                    <circle cx="260" cy="110" r="96" strokeWidth="0.7" opacity=".25" />
                  </g>
                  <path className="about-inv-wave" d="M20 140 Q60 110 100 140 T180 140 T260 140 T320 140" fill="none" stroke="#e8e6de" strokeWidth="1.1" strokeLinecap="round" opacity=".55" />
                  <g className="about-inv-dots">
                    <circle cx="260" cy="110" r="2.6" fill="#f1efe6" />
                    <circle cx="220" cy="96" r="1.8" fill="#c8b8ff" />
                    <circle cx="296" cy="130" r="1.6" fill="#e8c8a0" />
                  </g>
                </svg>
              </div>
              <div className="about-inv-content">
                <span>想和我们聊聊？</span>
                <h3>
                  不论你是<em>用户</em>、<em>投资人</em>，还是潜在<em>合作伙伴</em>，或者只是一个总在思考声音的人，我们都想听听你的想法。
                </h3>
                <div>
                  <a className="sc-text-pill" href={`/contact?lang=${locale}`}>
                    打个招呼
                    <span aria-hidden="true">→</span>
                  </a>
                  <a className="sc-text-pill" href="mailto:hello@sonicite.ai">
                    hello@sonicite.ai
                  </a>
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

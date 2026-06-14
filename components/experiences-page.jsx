"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { bringItems, experienceEvents } from "./experiences-data";
import { PageAmbient, SectionRule, SiteFooter, SiteNav } from "./sonicite-shared";

const localeStorageKey = "sonicite-landing-locale";

const copy = {
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
};

function StageHeroArt() {
  return (
    <svg className="hv8-art-svg experiences-hero-svg" viewBox="0 0 520 520" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="xph-stageGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8b8ff" stopOpacity="0.6" />
          <stop offset="0.5" stopColor="#e8b4be" stopOpacity="0.16" />
          <stop offset="1" stopColor="#0f0f10" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="xph-floorGlow" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0" stopColor="#b4c8e8" stopOpacity="0.10" />
          <stop offset="1" stopColor="#0f0f10" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="xph-beamFade" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#f1efe6" stopOpacity="0.55" />
          <stop offset="0.7" stopColor="#f1efe6" stopOpacity="0.08" />
          <stop offset="1" stopColor="#f1efe6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="xph-beamMaskGrad" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.5" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id="xph-beamMask">
          <rect x="0" y="0" width="520" height="520" fill="url(#xph-beamMaskGrad)" />
        </mask>
        <linearGradient id="xph-floorLine" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#e8e6de" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="#e8e6de" stopOpacity="0.28" />
          <stop offset="1" stopColor="#e8e6de" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="xph-horizonLine" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0" stopColor="#e8e6de" stopOpacity="0" />
          <stop offset="0.2" stopColor="#e8e6de" stopOpacity="0.4" />
          <stop offset="0.5" stopColor="#e8e6de" stopOpacity="0.7" />
          <stop offset="0.8" stopColor="#e8e6de" stopOpacity="0.4" />
          <stop offset="1" stopColor="#e8e6de" stopOpacity="0" />
        </linearGradient>
        <filter id="xph-pointGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="260" cy="175" rx="140" ry="60" fill="url(#xph-stageGlow)" />
      <ellipse cx="260" cy="420" rx="260" ry="70" fill="url(#xph-floorGlow)" />

      <g className="xph-stage">
        <g mask="url(#xph-beamMask)" className="xph-beam-volume">
          <path d="M254 175 C 252 230, 235 320, 200 460 L 320 460 C 285 320, 268 230, 266 175 Z" fill="url(#xph-beamFade)" />
        </g>

        <g className="xph-beam-core">
          <path d="M258 178 C 256 240, 248 340, 232 458" stroke="#f1efe6" strokeWidth="0.6" strokeLinecap="round" fill="none" opacity="0.32" />
          <path d="M262 178 C 264 240, 272 340, 288 458" stroke="#f1efe6" strokeWidth="0.6" strokeLinecap="round" fill="none" opacity="0.32" />
        </g>

        <g className="xph-stage-light">
          <g filter="url(#xph-pointGlow)">
            <circle cx="260" cy="175" r="22" fill="#c8b8ff" opacity="0.18" />
            <circle cx="260" cy="175" r="12" fill="#f1efe6" opacity="0.45" />
          </g>
          <circle cx="260" cy="175" r="2.6" fill="#f1efe6" />
          <circle cx="260" cy="175" r="9" fill="none" stroke="#f1efe6" strokeWidth="0.5" opacity="0.55" />
          <circle cx="260" cy="175" r="18" fill="none" stroke="#e8c8a0" strokeWidth="0.4" opacity="0.28" />
        </g>

        <path d="M178 202 Q 260 196 342 202" stroke="#e8e6de" strokeWidth="1" opacity="0.6" strokeLinecap="round" fill="none" />
        <path d="M198 213 Q 260 208 322 213" stroke="#e8e6de" strokeWidth="0.6" opacity="0.22" strokeLinecap="round" fill="none" />

        <g stroke="url(#xph-floorLine)" strokeWidth="0.7" strokeLinecap="round" fill="none">
          <path d="M188 202 C 170 270, 130 380, 50 498" />
          <path d="M215 202 C 205 270, 175 380, 130 498" />
          <path d="M240 202 C 236 270, 224 380, 208 498" />
          <path d="M260 202 C 260 270, 260 380, 260 498" />
          <path d="M280 202 C 284 270, 296 380, 312 498" />
          <path d="M305 202 C 315 270, 345 380, 390 498" />
          <path d="M332 202 C 350 270, 390 380, 470 498" />
        </g>

        <g stroke="url(#xph-horizonLine)" strokeLinecap="round" fill="none">
          <path d="M150 252 Q 260 264 370 252" strokeWidth="0.6" />
          <path d="M125 300 Q 260 316 395 300" strokeWidth="0.65" />
          <path d="M95 360 Q 260 380 425 360" strokeWidth="0.75" />
          <path d="M55 430 Q 260 454 465 430" strokeWidth="0.9" />
        </g>

        <g className="xph-crowd">
          <g className="xph-crowd-row xph-crowd-row-1">
            <circle cx="195" cy="258" r="1.2" fill="#e8e6de" opacity="0.5" />
            <circle cx="222" cy="260" r="1.2" fill="#e8e6de" opacity="0.5" />
            <circle cx="248" cy="261" r="1.2" fill="#e8e6de" opacity="0.5" />
            <circle cx="274" cy="261" r="1.2" fill="#e8e6de" opacity="0.5" />
            <circle cx="300" cy="260" r="1.2" fill="#e8e6de" opacity="0.5" />
            <circle cx="326" cy="258" r="1.2" fill="#e8e6de" opacity="0.5" />
          </g>
          <g className="xph-crowd-row xph-crowd-row-2">
            <circle cx="152" cy="308" r="1.7" fill="#e8e6de" opacity="0.65" />
            <circle cx="186" cy="312" r="1.7" fill="#e8e6de" opacity="0.65" />
            <circle cx="220" cy="314" r="1.7" fill="#e8e6de" opacity="0.65" />
            <circle cx="258" cy="316" r="2.0" fill="#c8b8ff" opacity="0.85" />
            <circle cx="296" cy="314" r="1.7" fill="#e8e6de" opacity="0.65" />
            <circle cx="332" cy="312" r="1.7" fill="#e8e6de" opacity="0.65" />
            <circle cx="368" cy="308" r="1.7" fill="#e8e6de" opacity="0.65" />
          </g>
          <g className="xph-crowd-row xph-crowd-row-3">
            <circle cx="118" cy="370" r="2.3" fill="#e8e6de" opacity="0.8" />
            <circle cx="160" cy="374" r="2.3" fill="#e8e6de" opacity="0.8" />
            <circle cx="205" cy="378" r="2.3" fill="#b4c8e8" opacity="0.85" />
            <circle cx="258" cy="380" r="2.6" fill="#e8b4be" opacity="0.9" />
            <circle cx="312" cy="378" r="2.3" fill="#e8e6de" opacity="0.8" />
            <circle cx="358" cy="374" r="2.3" fill="#e8e6de" opacity="0.8" />
            <circle cx="402" cy="370" r="2.3" fill="#e8c8a0" opacity="0.85" />
          </g>
          <g className="xph-crowd-front xph-crowd-row xph-crowd-row-4">
            <circle cx="75" cy="443" r="3.0" fill="#e8e6de" />
            <circle cx="128" cy="448" r="3.2" fill="#c8b8ff" />
            <circle cx="184" cy="452" r="3.0" fill="#e8e6de" />
            <circle cx="240" cy="454" r="3.4" fill="#e8c8a0" />
            <circle cx="298" cy="454" r="3.0" fill="#e8e6de" />
            <circle cx="354" cy="452" r="3.2" fill="#e8b4be" />
            <circle cx="408" cy="448" r="3.0" fill="#b4c8e8" />
            <circle cx="460" cy="443" r="3.0" fill="#e8e6de" />
          </g>
        </g>
      </g>
    </svg>
  );
}

function BringVisual({ index }) {
  if (index === 0) {
    return (
      <svg className="xp-bring-svg" viewBox="0 0 120 64" preserveAspectRatio="xMidYMid meet">
        <g stroke="#c8b8ff" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5">
          <line x1="18" y1="8" x2="18" y2="56" />
          <line x1="34" y1="8" x2="34" y2="56" />
          <line x1="50" y1="8" x2="50" y2="56" />
          <line x1="66" y1="8" x2="66" y2="56" />
          <line x1="82" y1="8" x2="82" y2="56" />
          <line x1="98" y1="8" x2="98" y2="56" />
        </g>
        <g stroke="#c8b8ff" strokeWidth="0.6" opacity="0.35">
          <line x1="10" y1="20" x2="106" y2="20" />
          <line x1="10" y1="32" x2="106" y2="32" />
          <line x1="10" y1="44" x2="106" y2="44" />
        </g>
        <g fill="#c8b8ff">
          <rect x="13" y="36" width="10" height="5" rx="1.5" opacity="0.95" />
          <rect x="29" y="22" width="10" height="5" rx="1.5" opacity="0.85" />
          <rect x="45" y="42" width="10" height="5" rx="1.5" opacity="0.9" />
          <rect x="61" y="15" width="10" height="5" rx="1.5" opacity="0.8" />
          <rect x="77" y="30" width="10" height="5" rx="1.5" opacity="0.85" />
          <rect x="93" y="40" width="10" height="5" rx="1.5" opacity="0.7" />
        </g>
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg className="xp-bring-svg" viewBox="0 0 120 64" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="xpb2sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b4c8e8" stopOpacity="0" />
            <stop offset="1" stopColor="#b4c8e8" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <g stroke="#b4c8e8" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.55">
          <rect x="14" y="10" width="92" height="44" rx="2" />
          <line x1="60" y1="10" x2="60" y2="54" opacity="0.5" />
          <line x1="14" y1="32" x2="106" y2="32" opacity="0.5" />
        </g>
        <g stroke="#b4c8e8" strokeWidth="1" fill="none" opacity="0.7">
          <path d="M60 32 L100 32" />
          <path d="M60 32 A 40 40 0 0 0 80 16" opacity="0.55" />
          <path d="M60 32 A 40 40 0 0 0 92 22" opacity="0.35" />
        </g>
        <path d="M60 32 L100 32 A 40 40 0 0 0 60 -8 Z" fill="url(#xpb2sweep)" opacity="0.45" />
        <g fill="#b4c8e8">
          <circle cx="60" cy="32" r="2.4" />
          <circle cx="30" cy="22" r="1.8" opacity="0.8" />
          <circle cx="42" cy="44" r="1.8" opacity="0.75" />
          <circle cx="82" cy="46" r="1.8" opacity="0.7" />
          <circle cx="94" cy="20" r="1.8" opacity="0.7" />
          <circle cx="74" cy="18" r="1.5" opacity="0.6" />
        </g>
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg className="xp-bring-svg" viewBox="0 0 120 64" preserveAspectRatio="xMidYMid meet">
        <g stroke="#e8b4be" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7">
          <rect x="30" y="10" width="60" height="36" rx="2" />
          <line x1="45" y1="54" x2="75" y2="54" opacity="0.6" />
          <line x1="55" y1="46" x2="55" y2="54" opacity="0.6" />
          <line x1="65" y1="46" x2="65" y2="54" opacity="0.6" />
        </g>
        <g stroke="#e8b4be" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.95">
          <line x1="50" y1="28" x2="50" y2="28" />
          <line x1="56" y1="24" x2="56" y2="32" />
          <line x1="62" y1="18" x2="62" y2="38" />
          <line x1="68" y1="22" x2="68" y2="34" />
          <line x1="74" y1="26" x2="74" y2="30" />
        </g>
        <g stroke="#e8b4be" strokeWidth="0.7" fill="none" opacity="0.4">
          <path d="M22 28 Q14 28 14 36" />
          <path d="M22 28 Q10 28 10 40" />
          <path d="M98 28 Q106 28 106 36" />
          <path d="M98 28 Q110 28 110 40" />
        </g>
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg className="xp-bring-svg" viewBox="0 0 120 64" preserveAspectRatio="xMidYMid meet">
        <g stroke="#e8c8a0" strokeWidth="1.2" fill="none" strokeLinecap="round">
          <line x1="22" y1="14" x2="22" y2="50" />
          <path d="M22 14 Q34 10 34 22" />
          <circle cx="22" cy="50" r="4" fill="#e8c8a0" stroke="none" />
          <line x1="46" y1="10" x2="46" y2="44" />
          <line x1="46" y1="10" x2="58" y2="14" />
          <line x1="58" y1="14" x2="58" y2="40" />
          <circle cx="46" cy="44" r="3.4" fill="#e8c8a0" stroke="none" />
          <circle cx="58" cy="40" r="3" fill="#e8c8a0" stroke="none" />
          <path d="M74 22 Q80 18 86 22" opacity="0.65" />
          <path d="M74 32 Q82 26 90 32" opacity="0.65" />
          <path d="M74 42 Q84 36 94 42" opacity="0.65" />
        </g>
      </svg>
    );
  }

  if (index === 4) {
    return (
      <svg className="xp-bring-svg" viewBox="0 0 120 64" preserveAspectRatio="xMidYMid meet">
        <g stroke="#c8b8ff" strokeWidth="1" opacity="0.55" fill="none">
          <line x1="22" y1="14" x2="60" y2="32" />
          <line x1="22" y1="50" x2="60" y2="32" />
          <line x1="98" y1="14" x2="60" y2="32" />
          <line x1="98" y1="50" x2="60" y2="32" />
          <line x1="60" y1="32" x2="60" y2="8" />
          <line x1="60" y1="32" x2="60" y2="56" />
        </g>
        <g fill="#c8b8ff">
          <circle cx="22" cy="14" r="3" />
          <circle cx="22" cy="50" r="3" />
          <circle cx="98" cy="14" r="3" />
          <circle cx="98" cy="50" r="3" />
          <circle cx="60" cy="8" r="2.4" opacity="0.7" />
          <circle cx="60" cy="56" r="2.4" opacity="0.7" />
          <circle cx="60" cy="32" r="4.2" stroke="#0f0f10" strokeWidth="1" />
        </g>
      </svg>
    );
  }

  if (index === 5) {
    return (
      <svg className="xp-bring-svg" viewBox="0 0 120 64" preserveAspectRatio="xMidYMid meet">
        <g stroke="#b4c8e8" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7">
          <path d="M18 14 L60 22 L102 14 L102 50 L60 58 L18 50 Z" />
          <line x1="60" y1="22" x2="60" y2="58" />
          <line x1="26" y1="26" x2="52" y2="32" opacity="0.7" />
          <line x1="26" y1="34" x2="52" y2="40" opacity="0.7" />
          <line x1="26" y1="42" x2="52" y2="48" opacity="0.7" />
          <line x1="68" y1="32" x2="94" y2="26" opacity="0.7" />
          <line x1="68" y1="40" x2="94" y2="34" opacity="0.7" />
          <line x1="68" y1="48" x2="94" y2="42" opacity="0.7" />
        </g>
      </svg>
    );
  }

  if (index === 6) {
    return (
      <svg className="xp-bring-svg" viewBox="0 0 120 64" preserveAspectRatio="xMidYMid meet">
        <g stroke="#e8b4be" strokeWidth="1.2" fill="none" strokeLinecap="round">
          <circle cx="60" cy="32" r="24" opacity="0.55" />
          <circle cx="60" cy="32" r="16" opacity="0.4" />
          <circle cx="60" cy="32" r="8" opacity="0.7" />
          <circle cx="60" cy="32" r="2.4" fill="#e8b4be" stroke="none" />
          <line x1="84" y1="14" x2="100" y2="22" opacity="0.7" />
          <circle cx="100" cy="22" r="3" fill="#e8b4be" stroke="none" />
        </g>
      </svg>
    );
  }

  return (
    <svg className="xp-bring-svg" viewBox="0 0 120 64" preserveAspectRatio="xMidYMid meet">
      <g stroke="#e8c8a0" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.55">
        <line x1="40" y1="10" x2="40" y2="15" />
        <line x1="30" y1="15" x2="33" y2="19" />
        <line x1="22" y1="24" x2="27" y2="27" />
        <line x1="20" y1="36" x2="25" y2="36" />
        <line x1="22" y1="48" x2="27" y2="45" />
        <line x1="30" y1="56" x2="33" y2="53" />
        <line x1="40" y1="62" x2="40" y2="57" />
        <line x1="50" y1="56" x2="47" y2="53" />
        <line x1="58" y1="48" x2="53" y2="45" />
        <line x1="60" y1="36" x2="55" y2="36" />
        <line x1="58" y1="24" x2="53" y2="27" />
        <line x1="50" y1="15" x2="47" y2="19" />
      </g>
      <circle cx="40" cy="36" r="16" fill="none" stroke="#e8c8a0" strokeWidth="1" opacity="0.8" />
      <circle cx="40" cy="36" r="10" fill="none" stroke="#e8c8a0" strokeWidth="0.6" opacity="0.45" />
      <line x1="40" y1="36" x2="49" y2="27" stroke="#e8c8a0" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="40" cy="36" r="1.8" fill="#e8c8a0" />
      <g stroke="#e8c8a0" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.65">
        <line x1="72" y1="20" x2="110" y2="20" />
        <line x1="72" y1="32" x2="110" y2="32" />
        <line x1="72" y1="44" x2="110" y2="44" />
      </g>
      <g fill="#e8c8a0">
        <circle cx="82" cy="20" r="2.2" />
        <circle cx="96" cy="32" r="2.2" opacity="0.85" />
        <circle cx="90" cy="44" r="2.2" opacity="0.75" />
      </g>
    </svg>
  );
}

export function ExperiencesPage() {
  const [locale, setLocale] = useState("zh");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryLocale = params.get("lang");
    setLocale(queryLocale === "zh" || queryLocale === "en" ? queryLocale : "zh");
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem(localeStorageKey, locale);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    window.history.replaceState({}, "", url);
  }, [locale]);

  return (
    <div className="page-shell sc-page page-experiences">
      <SiteNav locale={locale} setLocale={setLocale} current="experiences" labels={copy} />
      <PageAmbient />

      <main className="sc-main">
        <section className="hero-v8 experiences-hero">
          <div className="hv8-frost" aria-hidden="true"></div>
          <div className="hv8-grain" aria-hidden="true"></div>
          <div className="sc-container hv8-layout experiences-hero-layout">
            <div className="hv8-text experiences-hero-text">
              <h1 className="hv8-title experiences-hero-title">
                我们为重要的<em>时刻</em>配乐。
              </h1>
              <p className="hv8-dek experiences-hero-dek">
                从 opening night 到 after-hours rave，Sonicite 把声音智能带入真实空间：作为氛围，作为表演，也作为体验。
              </p>
            </div>
            <div className="hv8-art experiences-hero-art" aria-hidden="true">
              <StageHeroArt />
            </div>
          </div>
        </section>

        <section className="xp-events" id="events">
          <div className="sc-container">
            <SectionRule label="活动" />
            <div className="xp-events-grid">
              {experienceEvents.map((event) => (
                <a className="xp-event-card" href={`/experiences/${event.slug}?lang=${locale}`} data-tone={event.tone} key={event.slug}>
                  <div className="xp-poster">
                    <Image src={event.cardImage} alt={`${event.title} poster`} fill sizes="(max-width: 820px) 90vw, 440px" className="xp-poster-img" />
                  </div>
                  <div className="xp-event-body">
                    <p className="xp-event-meta">
                      <span>{event.city}</span>
                      <span>{event.date}</span>
                    </p>
                    <h3 className="xp-event-title">{event.title}</h3>
                    <p className="xp-event-tag">{event.cardTag}</p>
                    <span className="xp-event-arrow">
                      查看 <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="xp-bring" id="bring">
          <div className="sc-container">
            <SectionRule label="我们带来什么" />
            <div className="xp-bring-grid">
              {bringItems.map(([tone, title, text], index) => (
                <article className="xp-bring-card" data-tone={tone} key={title}>
                  <div className="xp-bring-visual" aria-hidden="true">
                    <BringVisual index={index} />
                  </div>
                  <h3 className="xp-bring-title">{title}</h3>
                  <p className="xp-bring-desc">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-invitation">
          <div className="sc-container">
            <div className="about-invitation-card">
              <div className="about-inv-art" aria-hidden="true"></div>
              <div className="about-inv-content">
                <span>有空间或活动想一起做？</span>
                <h3>
                  不论是<em>场地</em>、<em>品牌时刻</em>、<em>音乐节</em>，还是一个需要对的声音的房间，我们都想和你一起把它做出来。
                </h3>
                <div>
                  <a className="sc-text-pill" href={`/contact?lang=${locale}`}>
                    打个招呼 <span aria-hidden="true">→</span>
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

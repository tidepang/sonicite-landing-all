"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PageAmbient, SectionRule, SiteFooter, SiteNav } from "./sonicite-shared";

const localeStorageKey = "sonicite-landing-locale";

const founders = [
  {
    name: "Brenda",
    last: "Xia",
    role: "Product · Strategy",
    tone: "purple",
    image: "/images/founders/brenda.jpg",
    text: "Musician since 5. Spent 12 years in North America studying business, working in hospitality, then building products for startups. Kept running into the same problem — no good tools for sound. Stopped waiting.",
  },
  {
    name: "Stephen",
    last: "Li",
    role: "Architecture · LLM",
    tone: "rose",
    image: "/images/founders/stephen.jpg",
    text: "Former Microsoft, IBM, Morgan Stanley. 20+ years turning complex problems into reliable systems. Leads LLM architecture and full-stack development at Sonicite.",
  },
  {
    name: "Cookie",
    last: "Pang",
    role: "Engineering · Systems",
    tone: "blue",
    image: "/images/founders/cookie.jpg",
    text: "Former Tencent. Spent years building systems at scale. Believes the best infrastructure is the kind nobody notices. Leads technical architecture and product development.",
  },
  {
    name: "Mia",
    last: "Zhang",
    role: "Growth · Partnerships",
    tone: "amber",
    image: "/images/founders/mia.jpg",
    text: "Former Huawei Africa. Built markets from scratch in places most people wouldn't think to start. Focuses on growth, partnerships, and finding the people who need Sonicite most.",
  },
];

const beliefs = [
  {
    tone: "purple",
    title: "Sound is not",
    emphasis: "decoration",
    text: "It shapes how people feel, focus, move, and remember. Treating it like background noise is a design failure with consequences that compound silently.",
  },
  {
    tone: "blue",
    title: "Taste cannot be",
    emphasis: "automated",
    text: "AI should expand what's possible for human judgment, not replace it. The best tools make people sharper at the work they already care about deeply.",
  },
  {
    tone: "amber",
    title: "Music is a",
    emphasis: "language",
    text: "It communicates what words can't — mood, memory, identity, belonging. It deserves tools as serious and considered as the medium itself.",
  },
  {
    tone: "rose",
    title: "Community is",
    emphasis: "the point",
    text: "The scenes, the spaces, the people who keep showing up for each other. Sound is the medium. Connection is always the goal.",
  },
];

const timeline = [
  ["2025 · Q4", "Founded", "Sonicite begins.", "S-tron Hackathon. Sonicite Flow runs for the first time in front of real people. Something clicks."],
  ["2026 · Jan", "Building", "Sonicite Flow goes live.", "Internal beta opens. First real users. First real feedback."],
  ["2026 · Mar", "Building", "Sonicite Atmos takes shape.", "First Atmos demo. We start making music — not just building tools to play it."],
  ["2026 · May", "Building", "Sonicite Vibe launches.", "Live. Real rooms. Sound built in the moment, with the people in it."],
  ["2026 · Jun", "Now", "Opening up.", "First partnerships. MuShanghai, Cyborg Party, Altnext. Sonicite Experiences begins."],
  ["→", "Next", "What comes next.", "More spaces. More creators. More of what sound can do."],
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
      experiences: "Experiences",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      homeLabel: "Sonicite 首页",
    },
    locale: { zh: "CN", en: "EN" },
  },
  en: {
    nav: {
      flow: "Flow",
      atmos: "Atmos",
      vibe: "Vibe",
      experiences: "Experiences",
      blog: "Blog",
      about: "About",
      contact: "Contact",
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
    const storedLocale = window.localStorage.getItem(localeStorageKey);
    const browserLocale = window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
    setLocale(
      queryLocale === "en" || queryLocale === "zh"
        ? queryLocale
        : storedLocale === "en" || storedLocale === "zh"
          ? storedLocale
          : browserLocale,
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
                  For the <em>love</em> of
                </span>
                <br />
                sound.
              </h1>
              <p className="hv8-dek about-hero-dek">
                Sonicite is built by people who care about how sound shapes emotion, space, memory, and human connection — and who believe sound deserves better tools.
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
            <SectionRule label="Our Story" />
            <div className="thesis-grid about-thesis-grid">
              <h2 className="thesis-title">
                We build the tools
                <br />
                we kept <em>wishing</em>&nbsp;existed.
              </h2>
              <div className="thesis-body about-thesis-body">
                <p>It started with a specific feeling — standing in front of a DJ set, or walking into a space that should feel alive, and not being able to find the right music. Not because it didn't exist. Because there was no good way to reach it.</p>
                <p>
                  We come from music, technology, design, and spaces. Different paths, <strong>same wall</strong>. So we started building the tools we kept wishing existed.
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
                  Sound is <em>communication</em>.
                  </p>
                  <p className="pq25-line">
                  It's <em>atmosphere</em>. It's <em>identity</em>.
                  </p>
                  <p className="pq25-line">
                  It's <em>memory</em>.
                  </p>
                  <p className="pq25-line pq25-line-coda about-quote-coda">
                  And increasingly, it's <em>infrastructure</em>.
                  </p>
                </blockquote>
                <figcaption className="pq25-cap">
                  <span className="pq25-cap-bar" aria-hidden="true"></span>
                  <span className="pq25-cap-text">From the Sonicite brief</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="about-beliefs" id="beliefs">
          <div className="sc-container">
            <SectionRule label="Our Beliefs" />
            <div className="about-section-head">
              <h2>
                What we keep
                <br />
                coming&nbsp;back&nbsp;to.
              </h2>
            </div>
            <div className="about-beliefs-grid">
              {beliefs.map((belief) => (
                <article className="about-belief-card" data-tone={belief.tone} key={belief.emphasis}>
                  <div className="about-belief-visual" aria-hidden="true">
                    <BeliefVisual tone={belief.tone} />
                  </div>
                  <h3>
                    {belief.title} <em>{belief.emphasis}</em>.
                  </h3>
                  <p>{belief.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-crew" id="team">
          <div className="sc-container">
            <SectionRule label="The Crew" />
            <div className="sc-section-head">
              <h2 className="sc-section-head-title">
                Four founders,
                <br />
                one obsession.
              </h2>
              <div className="sc-section-head-body">
                <p>Four disciplines, two cities, one problem worth solving. Here's who's behind Sonicite — and the wider circle who help us shape it.</p>
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
              <span>Co-creators</span>
              <p>We also collaborate with award-winning producers, DMC champions, and other practitioners across music creation, spatial design, and AI systems as our co-creators. Sonicite embraces a broader co-creation program — the most interesting work happens when the people using these tools help shape them.</p>
            </div>
          </div>
        </section>

        <section className="about-timeline" id="now">
          <div className="sc-container">
            <SectionRule label="Where We Are" />
            <div className="about-section-head">
              <h2>A short timeline.</h2>
            </div>
            <ol className="about-timeline-list">
              {timeline.map(([year, tag, title, text]) => (
                <li className={`about-timeline-item ${tag === "Now" ? "is-now" : ""} ${tag === "Next" ? "is-future" : ""}`} key={`${year}-${title}`}>
                  <span className="about-timeline-marker"></span>
                  <div className="about-timeline-meta">
                    <span>{year}</span>
                    <span className={tag === "Now" ? "is-now-tag" : ""}>{tag}</span>
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
            <SectionRule label="Partners" />
            <div className="about-section-head">
              <h2>
                The places and people
                <br />
                we build with.
              </h2>
            </div>
            <ul className="about-partner-logos">
              {partners.map(([src, alt]) => (
                <li key={alt}>
                  <Image src={src} alt={alt} width={240} height={120} />
                </li>
              ))}
            </ul>
            <p className="about-partners-note">More partners landing soon.</p>
          </div>
        </section>

        <section className="about-thesis about-thesis-late">
          <div className="sc-container">
            <SectionRule label="Looking Ahead" />
            <div className="about-thesis-grid">
              <h2>
                We're still <em>early</em>.
              </h2>
              <div className="about-thesis-body">
                <p>Sonicite is an ongoing exploration of what sound can become. We're learning alongside creators, brands, venues, artists, and communities every day.</p>
                <p>
                  Some answers will come from technology. Others will come from people. <strong>The most interesting ones will come from both.</strong>
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
                <span>Interested in us?</span>
                <h3>
                  Whether you're a <em>user</em>, an <em>investor</em>, or a possible <em>partner</em> — or just someone who thinks about sound too much — we'd love to hear from you.
                </h3>
                <div>
                  <a className="sc-text-pill" href={`/contact?lang=${locale}`}>
                    Say hello
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

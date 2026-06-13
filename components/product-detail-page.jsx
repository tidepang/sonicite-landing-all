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
    product: "Product",
    products: "Product",
    experiences: "experiences",
    blog: "blog",
    about: "about",
    contact: "contact",
    homeLabel: "Sonicite home",
  },
  locale: { zh: "CN", en: "EN" },
};

const audienceSlides = [
  {
    title: "For DJs & Music Curators",
    titleEm: "DJs & Music Curators",
    sub: "Studio-grade taste at your fingertips.",
    body: "Spend less time chasing references and more time finishing tracks. Sonicite Flow listens with you, finds the next move, and adapts to your style.",
    href: "/flow",
    cta: "Try Flow",
  },
  {
    title: "For Brands & Spaces",
    titleEm: "Brands & Spaces",
    sub: "A signature sound that scales.",
    body: "Atmos turns your brand into a living sound system, adapting to time, weather, and footfall while staying unmistakably you across every venue.",
    href: "/atmos",
    cta: "Explore Atmos",
  },
  {
    title: "For Listeners",
    titleEm: "Listeners",
    sub: "Music that meets you where you are.",
    body: "Vibe co-creates sound for the room you’re in, the mood you’re in, and the people you’re with, in real time, with the people in it.",
    href: "/vibe",
    cta: "Meet Vibe",
  },
];

const productPages = {
  flow: {
    module: "flow",
    title: "Sonicite Flow",
    accent: "flow",
    externalHref: "https://flow.sonicite.ai/",
    heroTitle: "Not lost.",
    heroAccent: "Led.",
    heroSub: "Music that knows where you're going.",
    heroNote: "Built for DJs. Free during pilot.",
    primaryCta: "Join the waitlist",
    secondaryCta: null,
    videoLabel: "Product film - to be embedded",
    audienceIndex: 0,
    sections: [
      {
        type: "flora",
        eyebrow: "How it works",
        title: <>Built for every part of <em>your workflow.</em></>,
        sub: "From library chaos to a set that's ready.",
        items: [
          {
            num: "01",
            label: "Library",
            title: "Your library, finally understood.",
            body: "Flow parses every track's style, energy, mood, timbre, vocals, and harmonic structure. Tags generate automatically.",
            expanded: "Mix suggestions appear alongside. Your library stops being a folder and starts being a tool.",
            visual: "library",
          },
          {
            num: "02",
            label: "Search",
            title: "Find it by feeling. Or find its twin.",
            body: 'Type how a track should feel, like "intense but not distracting", and Flow searches your library and connected platforms.',
            expanded: "Or start from a track you love: Flow surfaces everything that matches its energy, key, and mood with a similarity score.",
            visual: "search",
          },
          {
            num: "03",
            label: "Setlist",
            title: "Pick the room. Get the set.",
            body: "Club, festival, coffee shop, fashion event: select your setting and Flow builds a setlist that fits the energy arc and mood.",
            expanded: "Adjust any track. Reorder freely. The logic stays intact.",
            visual: "setlist",
          },
          {
            num: "04",
            label: "Assistant",
            title: "Advice that knows your library.",
            body: "Ask about mix techniques, gear, or music theory. Flow's assistant has full context of your library.",
            expanded: "Its suggestions reference your actual tracks, not hypothetical ones.",
            visual: "assistant",
          },
        ],
      },
      {
        type: "beliefs",
        eyebrow: "Why Flow",
        items: [
          ["Your library finally knows you.", "Flow understands the music you already have, not just metadata. It reads energy, texture, vocals, key, mood, and fit."],
          ["Break past your own musical boundaries.", "Find adjacent tracks, unexpected twins, and set directions that keep your taste moving without losing your identity."],
          ["Any venue, any vibe, always ready.", "Turn scene, time, and energy into a working set structure before you step into the room."],
          ["Play like you've done this a hundred times.", "Keep the judgment yours, while Flow handles the listening, comparison, and structure around it."],
        ],
      },
    ],
    finalTitle: <>Ready to hear <span>the difference?</span></>,
    finalBody: "Join the waitlist and be among the first DJs to manage their library with Flow.",
  },
  atmos: {
    module: "atmos",
    title: "Sonicite Atmos",
    accent: "atmos",
    externalHref: "https://atmos.sonicite.ai/",
    heroTitle: "Not heard.",
    heroAccent: "Felt.",
    heroSub: "Beyond playlists. A living sonic identity.",
    heroNote: null,
    primaryCta: "Join the Pilot",
    secondaryCta: "Hear your space",
    videoLabel: "Space film + Atmos interface - to be embedded",
    audienceIndex: 1,
    sections: [
      {
        type: "stats",
        eyebrow: "Why sound matters",
        title: <>Every detail of your space is <em>designed.</em> Except the sound.</>,
        sub: "Light, material, scent, all considered. But most spaces still leave their soundtrack to chance. Atmos changes that.",
        items: [
          ["+38%", "Dwell time", "Guests stay longer when the music matches the pace of the space."],
          ["+9%", "Spend per visit", "Tempo and energy level directly influence how people move, and what they order."],
          ["96%", "Brand recall", "Sound is processed emotionally before it's processed consciously. It stays."],
          ["2x", "Emotional response", "Music triggers twice the emotional engagement of any other ambient stimulus in a space."],
        ],
      },
      {
        type: "flora",
        eyebrow: "How it works",
        title: <>From a few questions to a <em>living sonic identity.</em></>,
        items: [
          ["01", "Describe", "Describe your space. We read your brand.", "Answer four questions about your space and your guests. Or go deeper: upload your brand guide, drop in your website.", "Atmos reads your visual identity and translates it into sound direction.", "Brand input"],
          ["02", "Persona", "Your brand persona takes shape.", "Atmos matches your space to a sonic archetype and generates a named persona with sound direction, space essence, and wants and avoids.", "Not a genre. A character built around your brand.", "Persona card"],
          ["03", "Live", "Music goes live. Sequenced like a pro set.", "Every track is selected and ordered by key, energy, and emotional arc, the way a professional DJ builds a set.", "Not shuffled. Not random. A continuous sound journey that fits your space and shifts with the time of day.", "Live playback"],
          ["04", "Tune", "Adjust the mood. Train your sound.", "Drag the mood dial between Fluid and Structured, Easy and Intense, and hear the shift in real time.", "The more you interact, the more precisely Atmos understands what your space needs.", "Space Tune dial"],
        ].map(([num, label, title, body, expanded, visual]) => ({ num, label, title, body, expanded, visual })),
      },
      {
        type: "marquee",
        eyebrow: "Archetypes",
        title: <>12 sonic identities. <em>Which one is your space?</em></>,
        sub: "Each archetype comes with curated music, a sound direction, and a persona. Hover to preview.",
        items: ["The Quiet Studio", "The Slow Bloom", "The Late Bar", "The Open Floor", "The Atelier", "The Garden", "The Long Drive", "The High Hall", "The Sun Room", "The Velvet Room", "The Workshop", "The Threshold"],
      },
      {
        type: "beliefs",
        eyebrow: "Why Atmos",
        items: [
          ["Not a playlist. A sonic identity.", "Atmos builds a living sound language for your space, not a shuffled folder of acceptable tracks."],
          ["Built by music directors. Refined by AI.", "Human taste sets the frame. AI keeps the system adaptive, responsive, and consistent across time."],
          ["Sounds different at 9am and 9pm.", "Atmos changes with the rhythm of the day while preserving one coherent brand feeling."],
          ["The more it plays, the better it fits.", "Feedback, mood shifts, and space behavior help refine the sound into something specific to you."],
        ],
      },
      {
        type: "beyond",
        eyebrow: "Beyond the platform",
        title: <>Need something <em>built from scratch?</em></>,
        sub: "For brand activations, pop-ups, and events where the sound needs to be designed, not just played. Our team takes on select projects directly.",
        items: ["Brand activations", "Pop-up spaces", "Product launches", "Cultural events", "Retail openings"],
      },
      {
        type: "faq",
        eyebrow: "FAQ",
        title: <>A few honest <em>answers.</em></>,
        items: [
          ["How is Atmos different from Spotify or a playlist service?", "Spotify surfaces music you might like as a listener. Atmos builds a sound identity for your space as a brand: matched to your archetype, your guests, and your business rhythm."],
          ["How much can we customize the sound?", "Fully. Start with four quick questions for a first version, or go deep with brand materials, audience profiles, and time-of-day rhythm settings."],
          ["What does the Pilot program involve?", "We work directly with a small number of spaces to deploy Atmos, gather real feedback, and refine the product together."],
          ["What kinds of spaces is Atmos right for?", "Cafes, restaurants, retail stores, hotels, wellness studios, galleries, event venues, and any physical space where sound matters."],
        ],
      },
    ],
    finalTitle: <>Ready to give your space <span>its own sound?</span></>,
    finalBody: "Join the pilot and shape a living sonic identity for your space.",
  },
  vibe: {
    module: "vibe",
    title: "Sonicite Vibe",
    accent: "vibe",
    externalHref: "https://vibe.sonicite.ai/",
    heroTitle: "Not planned.",
    heroAccent: "Live.",
    heroSub: "Creation you never play alone.",
    heroBody: "One sentence. One room. Everyone in.",
    heroNote: "No sign-up required.",
    primaryCta: "Start a room",
    secondaryCta: null,
    audienceIndex: 2,
    sections: [
      {
        type: "cards3",
        eyebrow: "How it works",
        title: <>One sentence. <em>A full jam.</em></>,
        items: [
          ["Prompt · Describe", "Tell Vibe what you're feeling.", "No music theory. No DAW. Chinese, English, emoji, whatever works. Describe a mood, a place, a memory.", "\"rainy Tokyo · BPM 92 · piano on the off-beat · a touch of distortion\""],
          ["Generate", "Music appears in under 3 seconds.", "AI translates your words into playable pattern code, matched to your style, BPM, and constraints. No waiting. No guessing.", "setcps(0.92);\nstack(\"~ piano ~ piano*2\".jux(rev), \"bd ~ ~ sd\".distort(0.3))"],
          ["Jam", "Share a link. The whole room hears it.", "One URL. Everyone joins the same room, listening to the same music, in sync, anywhere in the world.", "LIVE  vibe.sonicite/r/tokyo-rain\n4 listening · 1 editing"],
        ],
      },
      {
        type: "drops",
        eyebrow: "Vibe Drops",
        title: <>Can't think of what to play? <em>Start here.</em></>,
        sub: "A growing library of mood presets. Pick one, hit play, share the room.",
        items: ["after rain", "soft chaos", "warehouse sunrise", "late train", "slow bloom", "neon study", "warm static", "empty club", "roof party", "quiet bass"],
      },
      {
        type: "show",
        eyebrow: "Show Mode",
        title: <>The music plays. <em>So does the room.</em></>,
        sub: "The moment you generate a sound, a visual scene starts running. Sync them to a screen, a wall, a venue.",
        items: [
          ["Scene switching", "Radar · Cracks · Torn · Particles, auto-switch with BPM and mood."],
          ["Project mode", "One tap to fullscreen: LED wall, projector, party display. Plug in and go."],
          ["Brand BG", "Upload a logo or visual identity. Vibe adapts it as a live show backdrop."],
        ],
      },
      {
        type: "beliefs",
        eyebrow: "Why Vibe",
        items: [
          ["No experience needed.", "If you can describe a feeling, you can make music with Vibe. No DAW, no theory, no plugins."],
          ["One link, infinite collaborators.", "Invite the room into the same sound, whether they are listening, editing, reacting, or performing."],
          ["Music and visuals, together.", "The generated sound already knows how to move a screen, a wall, or a venue."],
          ["Open. Build on it. Perform it.", "Vibe treats music as a shared live object, something people can shape together."],
        ],
      },
    ],
    finalTitle: <>Start a room. <span>Right now.</span></>,
    finalBody: "The music is already waiting.",
  },
};

function useLocale() {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get("lang");
    const saved = window.localStorage.getItem(localeStorageKey);
    const browserLocale = window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
    const next = paramLang === "zh" || paramLang === "en" ? paramLang : saved || browserLocale;
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
    <ProductSection section={section} id={section.eyebrow === "How it works" ? "how" : undefined}>
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
              <small>{["warm · groove · 128", "euphoric · vocal · 124", "deep · minimal · 122"][row]}</small>
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (type === "search") {
    return (
      <div className="pd-mini">
        <div className="pd-mini-search">intense but not distracting</div>
        {["Skee Mask - CZ3000 Dust 94%", "Four Tet - Two Thousand 91%", "DJ Python - Pia 88%"].map((item) => (
          <span className="pd-mini-result" key={item}>{item}</span>
        ))}
      </div>
    );
  }
  if (type === "setlist") {
    return (
      <div className="pd-mini pd-mini-arc">
        <span>Club</span>
        <svg viewBox="0 0 240 80" aria-hidden="true">
          <path d="M0 62 C45 62 78 42 118 30 C160 18 190 24 240 48" />
        </svg>
        <small>8 tracks · 62 min · 124 bpm</small>
      </div>
    );
  }
  if (type === "assistant") {
    return (
      <div className="pd-mini pd-mini-chat">
        <span>Tighten the second hour.</span>
        <b>Swap to a tighter groove in A min.</b>
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
              <span>Archetype</span>
              <h4>{item}</h4>
              <p>Curated direction, emotional tempo, and a repeatable sonic persona.</p>
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
        <a href="/experiences" className="pd-beyond-link">See how we've done it</a>
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
          <button className="pd-audience-arrow" type="button" aria-label="Previous audience" onClick={previous}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <div className="pd-audience-track">
          {audienceSlides.map((slide, index) => (
            <article className={`pd-audience-slide ${selected === index ? "is-active" : ""}`} key={slide.title}>
              <h2 className="pd-audience-title" data-prev={prevSlide.title} data-next={nextSlide.title}>
                For <em>{slide.titleEm}</em>
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
          <button className="pd-audience-arrow" type="button" aria-label="Next audience" onClick={next}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="pd-audience-foot">
          <div className="pd-audience-dots" role="tablist" aria-label="Audience slides">
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

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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

function GalleryPlaceholderIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 16l3-4 3 3 2-2 2 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="1.2" fill="currentColor" />
    </svg>
  );
}

function partnerSrc(partner) {
  return typeof partner === "string" ? partner : partner.src;
}

function partnerHref(partner) {
  return typeof partner === "string" ? null : partner.href;
}

function partnerText(partner) {
  return typeof partner === "string" ? null : partner.text;
}

function partnerAlt(partner) {
  const src = partnerSrc(partner);
  if (!src) return partnerText(partner) || "partner";
  const file = src.split("/").pop()?.replace(/\.[^.]+$/, "") || "partner";
  return file
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function renderInlineContent(content) {
  if (typeof content === "string") return content;

  return content.map((part, index) => {
    if (typeof part === "string") return part;
    const key = `${part.text}-${index}`;

    if (part.href) {
      return (
        <a className="xpd-inline-link" href={part.href} target="_blank" rel="noreferrer" key={key}>
          {part.text}
        </a>
      );
    }

    if (part.em) {
      return <em key={key}>{part.text}</em>;
    }

    return part.text;
  });
}

function renderCreditName(name) {
  if (typeof name === "string") return name;

  return (
    <a className="xpd-credit-link" href={name.href} target="_blank" rel="noreferrer">
      {name.text}
    </a>
  );
}

export function ExperienceDetailPage({ event }) {
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
    <div className="page-shell sc-page page-experiences page-event-detail" data-tone={event.tone}>
      <SiteNav locale={locale} setLocale={setLocale} current="experiences" labels={copy} />
      <PageAmbient />

      <main className="sc-main">
        <a className="xpd-back-float" href={`/experiences?lang=${locale}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          所有现场体验
        </a>

        <section className="xpd-hero">
          <div className="sc-container">
            <div className="xpd-hero-layout">
              <div className="xpd-poster">
                <Image src={event.fullImage} alt={`${event.title} poster`} fill priority sizes="(max-width: 900px) 90vw, 50vw" className="xpd-poster-img" />
              </div>
              <div className="xpd-hero-text">
                <p className="xpd-meta">
                  <span>{event.venue}</span>
                  <span>{event.city}</span>
                  <span>{event.date}</span>
                </p>
                <h1 className="xpd-title">
                  {event.titleParts[0]} <em>{event.titleParts[1]}</em>.
                </h1>
                {event.body.map((paragraph, index) => (
                  <p className="xpd-body" key={`body-${index}`}>
                    {renderInlineContent(paragraph)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {event.videoSrc ? (
          <section className="xpd-video-wrap">
            <div className="sc-container">
              <div className="xpd-video">
                <video className="xpd-video-player" src={event.videoSrc} autoPlay muted controls playsInline preload="metadata" poster={event.fullImage} />
              </div>
            </div>
          </section>
        ) : null}

        <section className="xpd-gallery-wrap">
          <div className="sc-container">
            <SectionRule label="现场图集" />
            <div className="xpd-gallery">
              {(event.galleryImages?.length ? event.galleryImages : event.galleryRatios || ["ar-4-5", "ar-16-9", "ar-3-4", "ar-3-2", "ar-1-1", "ar-3-4", "ar-4-5", "ar-16-9", "ar-3-2"]).map((item, index) => {
                const hasImage = event.galleryImages?.length;
                const ratio = hasImage ? event.galleryRatios?.[index % event.galleryRatios.length] || "ar-4-5" : item;

                return (
                  <div className={`xpd-gallery-item ${ratio}`} key={`${ratio}-${index}`}>
                    {hasImage ? (
                      <Image
                        src={item}
                        alt={`${event.title} photo ${String(index + 1).padStart(2, "0")}`}
                        fill
                        unoptimized
                        sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 31vw"
                        className="xpd-gallery-img"
                      />
                    ) : (
                      <div className="xpd-gallery-placeholder">
                        <GalleryPlaceholderIcon />
                        <span>照片 · 待上传 {String(index + 1).padStart(2, "0")}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="xpd-credits">
          <div className="sc-container">
            <SectionRule label="参与者" />
            <div className="xpd-credits-grid">
              {event.credits.map(([role, name, bio]) => (
                <div className="xpd-credit-item" key={`${role}-${typeof name === "string" ? name : name.text}`}>
                  <p className="xpd-credit-role">{role}</p>
                  <h4 className="xpd-credit-name">{renderCreditName(name)}</h4>
                  <p className="xpd-credit-bio">{bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {event.partners?.length ? (
          <section className="xpd-featured xpd-partners">
            <div className="sc-container">
              <SectionRule label="合作伙伴" />
              <div className="xpd-partner-row">
                {event.partners.map((partner) => {
                  const src = partnerSrc(partner);
                  const href = partnerHref(partner);
                  const text = partnerText(partner);

                  if (text) {
                    return href ? (
                      <a className="xpd-partner-text" href={href} target="_blank" rel="noreferrer" key={text}>
                        {text}
                      </a>
                    ) : (
                      <span className="xpd-partner-text" key={text}>
                        {text}
                      </span>
                    );
                  }

                  const content = <Image src={src} alt={partnerAlt(partner)} width={220} height={110} />;

                  return href ? (
                    <a className="xpd-partner-logo" href={href} target="_blank" rel="noreferrer" key={src}>
                      {content}
                    </a>
                  ) : (
                    <span className="xpd-partner-logo" key={src}>
                      {content}
                    </span>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}

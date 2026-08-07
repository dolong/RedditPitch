const { useState, useEffect, useRef } = React;
const SAMPLE_PILOTS = [
  {
    id: "p01",
    name: "RYX FROST",
    callsign: "PEETAN",
    jp: "\u30D5\u30ED\u30B9\u30C8",
    position: "SF",
    tier: "DIAMOND",
    color: "#19e6c4",
    overall: 89,
    rarity: 5,
    level: 45,
    maxLevel: 50,
    role: "FORWARD",
    spd: 85,
    dex: 92,
    jmp: 78,
    acc: 88,
    ability: "ICE SHATTER"
  },
  {
    id: "p02",
    name: "VOLT STRIKER",
    callsign: "THUNDERKID",
    jp: "\u30DC\u30EB\u30C8",
    position: "PG",
    tier: "PLATINUM",
    color: "#3ea6ff",
    overall: 87,
    rarity: 5,
    level: 42,
    maxLevel: 50,
    role: "GUARD",
    spd: 95,
    dex: 88,
    jmp: 82,
    acc: 90,
    ability: "SPARK RUSH"
  },
  {
    id: "p03",
    name: "NOVA BLAZE",
    callsign: "INFERNO",
    jp: "\u30CE\u30F4\u30A1",
    position: "SG",
    tier: "GOLD",
    color: "#ff7a3c",
    overall: 84,
    rarity: 4,
    level: 38,
    maxLevel: 50,
    role: "SHOOTER",
    spd: 82,
    dex: 85,
    jmp: 76,
    acc: 91,
    ability: "FLAME BURST"
  }
];
window.PILOTS = SAMPLE_PILOTS;
const PALETTES = {
  cyanMagenta: {
    name: "Cyan / Magenta",
    left: "#19e6c4",
    leftGlow: "#5bf2d4",
    leftDeep: "#04201a",
    leftBg: "radial-gradient(ellipse at 0% 50%, #0e3a32 0%, #04140f 55%, #02080a 100%)",
    right: "#ff2d6f",
    rightGlow: "#ff6b9a",
    rightDeep: "#1f0612",
    rightBg: "radial-gradient(ellipse at 100% 50%, #3e0a1f 0%, #160510 55%, #0a0306 100%)"
  },
  blueOrange: {
    name: "Blue / Orange",
    left: "#3ea6ff",
    leftGlow: "#7fc7ff",
    leftDeep: "#06121f",
    leftBg: "radial-gradient(ellipse at 0% 50%, #0a2745 0%, #06121f 55%, #02060a 100%)",
    right: "#ff7a3c",
    rightGlow: "#ffaa70",
    rightDeep: "#1f0e06",
    rightBg: "radial-gradient(ellipse at 100% 50%, #45200a 0%, #1f0e06 55%, #0a0603 100%)"
  },
  goldCrimson: {
    name: "Gold / Crimson",
    left: "#ffc94a",
    leftGlow: "#ffe080",
    leftDeep: "#201a04",
    leftBg: "radial-gradient(ellipse at 0% 50%, #3a2e0e 0%, #14100f 55%, #08070a 100%)",
    right: "#ff3b3b",
    rightGlow: "#ff7a7a",
    rightDeep: "#1f0608",
    rightBg: "radial-gradient(ellipse at 100% 50%, #4a0a14 0%, #1a0508 55%, #0a0306 100%)"
  }
};
function applyPalette(p) {
  const r = document.documentElement;
  r.style.setProperty("--c-left", p.left);
  r.style.setProperty("--c-left-glow", p.leftGlow);
  r.style.setProperty("--c-left-deep", p.leftDeep);
  r.style.setProperty("--c-left-bg", p.leftBg);
  r.style.setProperty("--c-right", p.right);
  r.style.setProperty("--c-right-glow", p.rightGlow);
  r.style.setProperty("--c-right-deep", p.rightDeep);
  r.style.setProperty("--c-right-bg", p.rightBg);
}
function PitchHero({ onStart }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-hero", style: {
    background: "var(--c-left-bg)",
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px"
  } }, /* @__PURE__ */ React.createElement("img", { src: "title.svg", alt: "ANOMALY", style: {
    width: "400px",
    height: "auto",
    filter: "drop-shadow(0 0 20px rgba(25, 230, 196, 0.3))"
  } }), /* @__PURE__ */ React.createElement("div", { className: "pitch-hero-sub" }, "Reddit Updates"), /* @__PURE__ */ React.createElement("button", { className: "pitch-hero-cta", onClick: onStart }, "ENTER PITCH"));
}
const SECTION_ORDER = [
  "pitch-vision",
  // Vision
  "pitch-coreloop",
  // Farnsworth
  "pitch-monetization",
  // Catalog Economics
  "pitch-living-economy"
  // Living Worlds
];
function PitchHeader({ titleBig, titleSub, onBack, onOverview, onNext }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-header" }, onOverview && /* @__PURE__ */ React.createElement("button", { className: "pitch-close-x", onClick: onOverview, "aria-label": "Back to overview" }, "\xD7"), onOverview && /* @__PURE__ */ React.createElement("button", { className: "pitch-overview-btn", onClick: onOverview }, "BACK TO OVERVIEW"), /* @__PURE__ */ React.createElement("div", { className: "pitch-header-row" }, /* @__PURE__ */ React.createElement("button", { className: "pitch-back-btn", onClick: onBack }, /* @__PURE__ */ React.createElement("span", null, "\u25C0"), /* @__PURE__ */ React.createElement("span", null, "BACK")), /* @__PURE__ */ React.createElement("div", { className: "pitch-title" }, /* @__PURE__ */ React.createElement("span", { className: "pitch-title-big" }, titleBig), /* @__PURE__ */ React.createElement("span", { className: "pitch-title-sub" }, titleSub)), onNext ? /* @__PURE__ */ React.createElement("button", { className: "pitch-back-btn", onClick: onNext }, /* @__PURE__ */ React.createElement("span", null, "NEXT"), /* @__PURE__ */ React.createElement("span", null, "\u25B6")) : /* @__PURE__ */ React.createElement("div", { style: { width: "140px" } })));
}
function PitchFooterNav({ onBack, onNext, nextTitle }) {
  if (!onBack && !onNext) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-footer-nav" }, onBack ? /* @__PURE__ */ React.createElement("button", { className: "pitch-back-btn", onClick: onBack }, /* @__PURE__ */ React.createElement("span", null, "\u25C0"), /* @__PURE__ */ React.createElement("span", null, "BACK")) : /* @__PURE__ */ React.createElement("div", null), onNext ? /* @__PURE__ */ React.createElement("button", { className: "pitch-back-btn pitch-next-btn", onClick: onNext }, /* @__PURE__ */ React.createElement("span", null, "NEXT", nextTitle ? `: ${nextTitle}` : ""), /* @__PURE__ */ React.createElement("span", null, "\u25B6")) : /* @__PURE__ */ React.createElement("div", null));
}
function CatalogPage({ onBack, onOverview, onNext, nextTitle }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement(PitchHeader, { titleBig: "VISION", titleSub: "GAMING ON REDDIT", onBack, onOverview, onNext }), /* @__PURE__ */ React.createElement("div", { className: "pitch-content", style: { gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: "24px" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "pitch-media" }, /* @__PURE__ */ React.createElement("img", { src: "GamesOnReddit.png", alt: "r/GamesOnReddit", style: { width: "100%", height: "auto", display: "block" } })), /* @__PURE__ */ React.createElement("div", { className: "pitch-caption" }, "r/GamesOnReddit is free distribution for new Reddit games \u2014 top titles clear 50K weekly users with no paid marketing."))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4CA} STATE OF PLAY"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Anomaly is building a revenue-bearing catalog, not betting on one hit."), " We launch three games per month. Each qualified title receives a one-time payment and contributes recurring Reddit revenue, while the strongest games layer in-app purchases on top."), /* @__PURE__ */ React.createElement("div", { className: "pitch-metrics", style: { gridTemplateColumns: "repeat(3, 1fr)" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-value" }, "3"), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-label" }, "Games launched / month")), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-value" }, "50K"), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-label" }, "Average DQE per title")), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-value" }, "36"), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-label" }, "Qualified titles in catalog"))), /* @__PURE__ */ React.createElement("div", { className: "pitch-metrics", style: { gridTemplateColumns: "repeat(2, 1fr)" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-value" }, "$180K"), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-label" }, "Exit MRR")), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-value" }, "$2.16M"), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-label" }, "Annualized run-rate, before IAP"))), /* @__PURE__ */ React.createElement("div", { className: "pitch-note" }, "DQE = Daily Qualified Engager, the unit Reddit pays platform revenue against.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F9EE} THE BASE MODEL"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "At a scenario average of 50K DQE across 36 qualified titles, the catalog reaches:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "\u2022 ", /* @__PURE__ */ React.createElement("strong", null, "$180K"), " exit MRR", /* @__PURE__ */ React.createElement("br", null), "\u2022 ", /* @__PURE__ */ React.createElement("strong", null, "$2.16M"), " annualized exit run-rate before IAP", /* @__PURE__ */ React.createElement("br", null), "\u2022 ", /* @__PURE__ */ React.createElement("strong", null, "$144K"), " in cumulative one-time payments, assuming $4K per qualified title", /* @__PURE__ */ React.createElement("br", null), "\u2022 ", /* @__PURE__ */ React.createElement("strong", null, "$90K"), " exit MRR if only half the titles qualify at that level")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F501} THE ANOMALY ADVANTAGE"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "Three games a month. Each launch adds revenue to the catalog ", /* @__PURE__ */ React.createElement("em", null, "and"), " production intelligence to Farnsworth."), /* @__PURE__ */ React.createElement("div", { className: "pitch-steps" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-step" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-step-title" }, "CATALOG REVENUE"), /* @__PURE__ */ React.createElement("div", { className: "pitch-step-body" }, "Every qualified title adds a one-time payment plus recurring Reddit revenue, with IAP layered onto the strongest games.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-step" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-step-title" }, "PRODUCTION INTELLIGENCE"), /* @__PURE__ */ React.createElement("div", { className: "pitch-step-body" }, "Every title leaves behind reusable code, tests, workflows, and player learnings, so the next one starts further ahead."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-steps", style: { marginTop: "4px" } }, [
    { src: "assets/dailyrun.mov", label: "Don't Die \u2014 Daily Run" },
    { src: "assets/MBAClip.mov", label: "Multiverse Basketball Association" }
  ].map((clip) => /* @__PURE__ */ React.createElement("div", { key: clip.src, style: {
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(25, 230, 196, 0.2)",
    background: "#02060a"
  } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-video-crop", style: {
    position: "relative",
    width: "100%",
    aspectRatio: "384 / 360",
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement(
    "video",
    {
      src: clip.src,
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      preload: "none",
      style: {
        position: "absolute",
        top: 0,
        left: "-33.3333%",
        width: "166.6667%",
        height: "100%",
        display: "block"
      }
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "pitch-media-label" }, clip.label))))))), /* @__PURE__ */ React.createElement(PitchFooterNav, { onBack, onNext, nextTitle }), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function RedditStrategyPage({ onBack, onOverview, onNext, nextTitle }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement(PitchHeader, { titleBig: "REDDIT STRATEGY", titleSub: "GAMEPLAY \xD7 PLATFORM", onBack, onOverview, onNext }), /* @__PURE__ */ React.createElement("div", { className: "pitch-content", style: { gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: {
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(25, 230, 196, 0.2)",
    height: "600px",
    background: "#02060a",
    position: "sticky",
    top: "20px"
  } }, /* @__PURE__ */ React.createElement(
    "video",
    {
      src: "reddit-strategy-demo.mp4",
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      controls: true,
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F3AE} MATCH GAMEPLAY"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "A match plays out like a ", /* @__PURE__ */ React.createElement("strong", null, "televised broadcast"), ". You're the head coach: call plays between possessions, watch your pixel squad execute like TFT units.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Possession-based tactics."), " Real-time 5v5 basketball with auto-playing units. You make strategic decisions: steal the ball, press defense, or let the opponent score to reset momentum.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Pixel-art spectacle."), " Slow-mo replays, crowd reactions, scoreboard drama. Every basket feels earned.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F310} PLATFORM"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Anomaly lives inside a Reddit post."), " Open a post, the game loads. No install, no app store, no friction.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Reddit is the delivery mechanism:"), /* @__PURE__ */ React.createElement("br", null), "\u2022 Identity (login with your Reddit account)", /* @__PURE__ */ React.createElement("br", null), "\u2022 Payments (Reddit Coins)", /* @__PURE__ */ React.createElement("br", null), "\u2022 Distribution (front page, subreddit leagues, cross-posts)", /* @__PURE__ */ React.createElement("br", null), "\u2022 Social (upvotes, comments, shares)")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u26A1 THE INTEGRATION"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Posts ARE matches."), " Create a post to start a ranked match. Play in real-time. Other Redditors watch live in the comments.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Comments ARE comms."), " Teammates coordinate in real-time. Opponents trash-talk. Crowd votes on bold plays.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Upvotes ARE discovery."), " Epic matches bubble up to the front page. New players find the game organically.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F3C6} REDDIT LEAGUES"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Build community tournaments inside subreddits."), " Create seasonal leagues where players compete for rank and reddit-wide leaderboards.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Subreddit-native leagues:"), /* @__PURE__ */ React.createElement("br", null), "\u2022 r/AnomalyLeague (flagship competitive)", /* @__PURE__ */ React.createElement("br", null), "\u2022 r/CasualBall (pickup games)", /* @__PURE__ */ React.createElement("br", null), "\u2022 r/NBA2026 (themed tournament)", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "Reddit's infrastructure becomes the league infrastructure.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4CA} VIRALITY"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Games go viral on Reddit."), " A player hits a clutch shot, the clip gets upvoted 50k times, front page, new players download the game.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Built-in amplification:"), " Every match is shareable. Every win is a moment to post. Every loss is a meme template.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Reddit's own games feed the platform."), " We're not competing for space; we're native to the feed.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4B0} MONETIZATION"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "Reddit monetization is still early, which creates the opportunity. Anomaly will begin with proven, low-friction revenue loops: non-pay-to-win cosmetics, premium currency, seasonal passes, grants, and sponsored collaborations.")))), /* @__PURE__ */ React.createElement(PitchFooterNav, { onBack, onNext, nextTitle }), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function RoadmapPage({ onBack, onOverview, onNext, nextTitle }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement(PitchHeader, { titleBig: "ROADMAP", titleSub: "18-MONTH EXECUTION", onBack, onOverview, onNext }), /* @__PURE__ */ React.createElement("div", { className: "pitch-content", style: { gridTemplateColumns: "1fr", gap: "24px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4C5} Q3 2026 \u2014 Build the Rails"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Ship the tooling, analytics, and ingestion layer that turns Reddit into a measurable platform."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Track every popular game, every weekly metric, every breakout signal. Already live: 48 games tracked, 1.4M weekly users measured, daily growth analytics."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Launch closed beta testing of Multiverse Basketball Association and Don't Die."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F3AE} Q4 2026 \u2014 Launch First Titles"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Full launch of Multiverse Basketball Association and Don't Die through Devvit."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Use the data layer to A/B test mechanics, monetization, and viral hooks in real time. Goals: hit ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "18px", fontWeight: "900", color: "var(--c-left)" } }, "50K WAU"), " per title and ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "18px", fontWeight: "900", color: "var(--c-left)" } }, "$10K"), " monthly revenue per title."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F680} Q1 2027 \u2014 Compound the Hits"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Ship ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "18px", fontWeight: "900", color: "var(--c-left)" } }, "10 games"), " in parallel."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "AI-accelerated production means a Q1 launch slate, not a Q1 launch. Iterate from real data, leverage the tools to rapidly test and ship at scale."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F513} Q2 2027 \u2014 Open the Platform"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "License the tooling, run growth services, and start publishing third-party titles under the Anomaly banner."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "The catalog and the data layer become the moat."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F451} Q3 2027 \u2192 Q2 2028 \u2014 Publisher of Record"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "By the time competitors realize Reddit is a games category, we own the analytics, the catalog, and the developer relationships."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Anomaly is the publisher for native Reddit games."))))), /* @__PURE__ */ React.createElement(PitchFooterNav, { onBack, onNext, nextTitle }), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function TeamPage({ onBack, onOverview, onNext, nextTitle }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement(PitchHeader, { titleBig: "THE TEAM", titleSub: "TRACK RECORD", onBack, onOverview, onNext }), /* @__PURE__ */ React.createElement("div", { className: "pitch-content", style: { gridTemplateColumns: "400px 1fr", gap: "24px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "pitch-media" }, /* @__PURE__ */ React.createElement("img", { src: "long-do-photo.jpg", alt: "Long Do", style: { width: "100%", height: "auto", display: "block" } })), /* @__PURE__ */ React.createElement("div", { className: "pitch-caption" }, "Long Do \u2014 founder, Anomaly.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4E6} WHAT THE TEAM HAS SHIPPED"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Over 12 titles in the last two years, averaging $50\u2013100K in revenue per title shipped."), " ", "Anomaly is a team of experts in emerging casual, bite-sized games \u2014 the exact shape of game that qualifies on Reddit."), /* @__PURE__ */ React.createElement("div", { className: "pitch-metrics", style: { gridTemplateColumns: "repeat(3, 1fr)" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-value" }, "12+"), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-label" }, "Titles shipped, 2 years")), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-value" }, "$50\u2013100K"), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-label" }, "Average revenue per title")), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-value" }, "500K"), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-label" }, "Peak weekly users, Sword & Supper")))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F464} LONG DO \u2014 FOUNDER"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Repeat founder with multiple successful exits"), " and investment from leading names including a16z and Kevin O'Leary. A decade of shipping as an indie developer: 10+ titles built without teams, without publishers, against 30% app store cuts. Dual degrees in Computer Science and Information Technology.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F5E1}\uFE0F MARGARET \u2014 LEAD GAME DESIGNER"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Margaret concepted the first monetizable game built with Reddit directly: Sword & Supper."), " ", "500K peak weekly users, 82K weekly users as of July 2026, and proven IAP \u2014 the upper-tail case for what a qualified title on this platform can become.")))), /* @__PURE__ */ React.createElement(PitchFooterNav, { onBack, onNext, nextTitle }), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function SubsectionLabel({ children }) {
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "1px", flex: "0 0 40px", background: "var(--c-left)" } }), /* @__PURE__ */ React.createElement("span", { className: "pitch-sublabel" }, children), /* @__PURE__ */ React.createElement("div", { style: { height: "1px", flex: "1", background: "rgba(25, 230, 196, 0.2)" } }));
}
function LivingWorldsPage({ onBack, onOverview, onNext, nextTitle }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement(PitchHeader, { titleBig: "AGENTIC LIVEOPS", titleSub: "REUSABLE SYSTEMS, NOT ONE-OFF FEATURES", onBack, onOverview, onNext }), /* @__PURE__ */ React.createElement("div", { className: "pitch-content", style: { gridTemplateColumns: "1fr", gap: "24px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F916} A SCALABLE GAMING OPS SYSTEM"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Agentic systems built into Farnsworth, plus analytics add-ons, create a scalable gaming ops system"), " \u2014 generating daily challenges, filling matchmaking queues, participating in in-game auctions, and creating replayable content loops.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "These are Farnsworth systems, not per-game features: built once, hardened once, then reused across the catalog. A game world that never feels empty is a launch requirement, not a nice-to-have.")), /* @__PURE__ */ React.createElement(SubsectionLabel, null, "IN PRACTICE"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-media-cell" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-media-stage" }, /* @__PURE__ */ React.createElement(
    "video",
    {
      src: "living-economy-demo.mp4",
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      controls: true,
      style: { height: "100%", width: "auto", display: "block" }
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "pitch-media-label" }, "Living economy \u2014 agent-run auctions")), /* @__PURE__ */ React.createElement("div", { className: "pitch-media-cell" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-media-stage", style: { width: "100%" } }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "liveops-live.png",
      alt: "Farnsworth Live \u2014 weekly users, contributions, activity over time, and community insights for The Last Draft",
      style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "pitch-media-label" }, "Farnsworth Live \u2014 analytics & community insights")), /* @__PURE__ */ React.createElement("div", { className: "pitch-media-cell" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-media-stage" }, /* @__PURE__ */ React.createElement(
    "video",
    {
      src: "assets/scoopcity.mp4",
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      preload: "none",
      style: { height: "100%", width: "auto", display: "block" }
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "pitch-media-label" }, "Scoop City \u2014 real-world data feeds")))), /* @__PURE__ */ React.createElement(PitchFooterNav, { onBack, onNext, nextTitle }), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function MarketOpportunityPage({ onBack, onOverview, onNext, nextTitle }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement(PitchHeader, { titleBig: "MARKET OPPORTUNITY", titleSub: "REDDIT'S GAMING ECOSYSTEM", onBack, onOverview, onNext }), /* @__PURE__ */ React.createElement("div", { className: "pitch-content", style: { gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    background: "rgba(0,0,0,0.3)",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(25, 230, 196, 0.2)",
    maxHeight: "700px"
  } }, /* @__PURE__ */ React.createElement("img", { src: "ExampleWeekly.png", alt: "Element Synergy Puzzle", style: {
    width: "100%",
    height: "auto",
    display: "block"
  } })), /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: "12px",
    fontSize: "13px",
    color: "rgba(234, 246, 243, 0.7)",
    lineHeight: "1.5",
    fontStyle: "italic"
  } }, "Element Synergy Puzzle by u/Runaider \u2014 107k weekly visitors. Solo developer, Reddit-native game.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F3AF} THE PROOF POINT"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "We're tracking 48 active games on Reddit. Just the popular tier alone:"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "1,397,209"), " weekly active users across tracked titles", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "531,931"), " weekly contributions (votes, posts, plays \u2014 not passive scrolling)", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "38.1%"), " platform-wide engagement rate (contributions \xF7 WAU). On mobile F2P, 5\u201310% is industry standard. This is 4\u20138x higher."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Individual breakouts:"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "\u2022 ", /* @__PURE__ */ React.createElement("strong", null, "Bunny Trials:"), " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "414K"), " WAU in 8 months. Single-developer game.", /* @__PURE__ */ React.createElement("br", null), "\u2022 ", /* @__PURE__ */ React.createElement("strong", null, "Element Synergy Puzzle:"), " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "129K"), " WAU \u2014 solo dev again", /* @__PURE__ */ React.createElement("br", null), "\u2022 ", /* @__PURE__ */ React.createElement("strong", null, "Pixelary:"), " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "67K"), " WAU and ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "64K"), " weekly contributions \u2014 near 1:1 player-to-action ratio, a metric most F2P titles would kill for"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "The breakout case \u2014 Bunny Trials:"), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Launched September 2025. Eight months later, 414k weekly active users \u2014 a number a small indie studio would normally need a multi-million dollar UA budget to reach. Distribution cost: $0."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4C8} MARKET SIZE"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Total Addressable Market:"), " $12B+ digital collectibles", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Serviceable Market:"), " Reddit's 420M monthly active users, gaming audience estimated at 50M+", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Serviceable Obtainable Market:"), " 2.5M active monthly players in similar titles on Reddit alone")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4A1} WHY NOW?"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "The ecosystem is bootstrapping in real time:"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "\u2022 ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "50%"), " of the 48 tracked games launched in 2026 alone (24 of 48, in just five months)", /* @__PURE__ */ React.createElement("br", null), "\u2022 ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "73%"), " launched in the last 9 months (35 of 48 since September 2025)", /* @__PURE__ */ React.createElement("br", null), "\u2022 Newest tracked game: launched 2026-05-16 \u2014 ten days ago", /* @__PURE__ */ React.createElement("br", null), "\u2022 The oldest tracked breakout (Pixelary) is only 18 months old, already at 67K WAU with 95.5% engagement"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "We are at the very start of a platform shift."), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Roblox at 18 months: ~100K MAU. Devvit games at 18 months: ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "1.4M"), " weekly active users across just 48 titles tracked. ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "~14x"), " ahead of where Roblox was at the same stage of its lifecycle."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F680} OUR OPPORTUNITY"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Build the publishing house Reddit doesn't have yet \u2014 and use the tools to power it before anyone else can."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Year 1 \u2014 Build the infrastructure"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "In our first year we've proven out several builds, experimented with changing code bases. Developed the tooling, tracking, and testing layer that no studio on Reddit currently owns: real-time WAU/contribution dashboards, growth analytics, A/B testing, screenshot pipelines, ingestion automation."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "While other devs ship one game at a time, we'll ship a system \u2014 one that surfaces what's working before the market notices."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Internal proof point: we already track ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "48 games"), ", ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "1.4M"), " weekly users, daily measurement, growth analytics, and screenshot pipelines \u2014 the platform exists."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Year 2 \u2014 Ship the breakouts"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Use the data and tools to deliberately engineer hits. The platform has shown that solo developers can reach 100K+ weekly users in months. A team with infrastructure, capital, and the data layer has no excuse not to ship two or three of them."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Year 3 \u2014 Become the biggest publisher on Reddit"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "By the time the rest of the industry realizes Reddit is a games platform, we own the catalog, the tools, the analytics, and the relationships with the developers building on it. Anomaly Studio becomes the publisher of record for native Reddit games \u2014 distribution, monetization, growth, and discoverability under one roof."))))), /* @__PURE__ */ React.createElement(PitchFooterNav, { onBack, onNext, nextTitle }), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
const SCENARIOS = [
  { name: "50% qualify at 50K DQE", titles: "18", mrr: "$90K", arr: "$1.08M" },
  { name: "Base scenario", titles: "36", mrr: "$180K", arr: "$2.16M", base: true },
  { name: "Upper DQE scenarios", titles: "36", mrr: "Up to ~$445K", arr: "Up to ~$5.34M" }
];
function ScenarioTable() {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-table" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-table-row pitch-table-head" }, /* @__PURE__ */ React.createElement("div", null, "Scenario"), /* @__PURE__ */ React.createElement("div", null, "Qualified titles"), /* @__PURE__ */ React.createElement("div", null, "Exit MRR"), /* @__PURE__ */ React.createElement("div", null, "Annualized exit run-rate")), SCENARIOS.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.name, className: `pitch-table-row${s.base ? " is-base" : ""}` }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "pitch-cell-label" }, "Scenario"), s.name), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "pitch-cell-label" }, "Qualified titles"), s.titles), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "pitch-cell-label" }, "Exit MRR"), s.mrr), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "pitch-cell-label" }, "Annualized"), s.arr))));
}
function EconomicsPage({ onBack, onOverview, onNext, nextTitle }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement(PitchHeader, { titleBig: "CATALOG ECONOMICS", titleSub: "MULTIPLE WAYS TO WIN", onBack, onOverview, onNext }), /* @__PURE__ */ React.createElement("div", { className: "pitch-content", style: { gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: "24px" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "pitch-media" }, /* @__PURE__ */ React.createElement("img", { src: "Shop.png", alt: "In-Game Shop", style: { width: "100%", height: "auto", display: "block" } })), /* @__PURE__ */ React.createElement("div", { className: "pitch-caption" }, "IAP is layered onto the strongest titles \u2014 cosmetics, premium currency, and pass progression on top of platform revenue.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "pitch-media" }, /* @__PURE__ */ React.createElement("img", { src: "SwordAndSupper.png", alt: "Sword & Supper", style: { width: "100%", height: "auto", display: "block" } })), /* @__PURE__ */ React.createElement("div", { className: "pitch-caption" }, "Sword & Supper \u2014 concepted by Margaret on our team, the first monetizable game built with Reddit directly."))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4CA} A CATALOG WITH MULTIPLE WAYS TO WIN"), /* @__PURE__ */ React.createElement(ScenarioTable, null), /* @__PURE__ */ React.createElement("div", { className: "pitch-note" }, "All scenarios before IAP. The base model assumes 50K average DQE across 36 qualified titles.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u2795 ADDITIONAL UPSIDE"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "\u2022 Up to ", /* @__PURE__ */ React.createElement("strong", null, "$7.5K"), " in one-time program payments per game", /* @__PURE__ */ React.createElement("br", null), "\u2022 ", /* @__PURE__ */ React.createElement("strong", null, "$4K"), " per qualified title used in the base model", /* @__PURE__ */ React.createElement("br", null), "\u2022 ", /* @__PURE__ */ React.createElement("strong", null, "$144K"), " in cumulative one-time payments across 36 qualified titles", /* @__PURE__ */ React.createElement("br", null), "\u2022 IAP layered onto the strongest titles", /* @__PURE__ */ React.createElement("br", null), "\u2022 One or two breakout games can materially outperform the base catalog economics")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u267B\uFE0F RESHIPPABLE TITLES"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Not every launch starts from zero."), " Anomaly already owns a back catalog of shipped titles \u2014 art, animation, audio, game systems, and validated designs that can be re-cut as Reddit-native games instead of rebuilt.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "A reship reuses proven assets and a loop players have already responded to, so it reaches the same qualification bar for a fraction of a ground-up build \u2014 and it enters the catalog on the same terms: one-time payment, recurring Reddit revenue, IAP where the title earns it."), /* @__PURE__ */ React.createElement("div", { className: "pitch-steps" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-step" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-step-title" }, "OWNED ASSETS"), /* @__PURE__ */ React.createElement("div", { className: "pitch-step-body" }, "Existing art, audio, and game systems carry over, so production spend goes to the Reddit layer, not to making a game from scratch.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-step" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-step-title" }, "PROVEN LOOPS"), /* @__PURE__ */ React.createElement("div", { className: "pitch-step-body" }, "Reshipped titles arrive with real player data behind them \u2014 less design risk per slot in the launch calendar."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-note" }, "Reships and new builds fill the same three-a-month cadence; the mix is chosen on cost per qualified title.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F5E1}\uFE0F THE UPPER TAIL \u2014 SWORD & SUPPER"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Margaret, Anomaly's leading game designer, concepted the first monetizable game with Reddit directly."), " ", "Sword & Supper is the proof of the upper tail: a single qualified title can outrun the whole base scenario."), /* @__PURE__ */ React.createElement("div", { className: "pitch-metrics", style: { gridTemplateColumns: "repeat(3, 1fr)" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-value" }, "500K"), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-label" }, "Peak weekly users")), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-value" }, "82K"), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-label" }, "Weekly users, July 2026")), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-value" }, "IAP"), /* @__PURE__ */ React.createElement("div", { className: "pitch-metric-label" }, "Proven on platform"))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://www.reddit.com/r/SwordAndSupperGame/",
      target: "_blank",
      rel: "noopener noreferrer",
      style: { color: "var(--c-left)", fontWeight: 600, textDecoration: "underline" }
    },
    "Play Sword & Supper here \u2192"
  ))))), /* @__PURE__ */ React.createElement(PitchFooterNav, { onBack, onNext, nextTitle }), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function FarnsworthPage({ onBack, onOverview, onNext, nextTitle }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement(PitchHeader, { titleBig: "FARNSWORTH", titleSub: "THE PRODUCTION ENGINE BEHIND THE CATALOG", onBack, onOverview, onNext }), /* @__PURE__ */ React.createElement("div", { className: "pitch-content", style: { gridTemplateColumns: "1fr", gap: "20px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: "20px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: {
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(25, 230, 196, 0.2)",
    background: "#02060a"
  } }, /* @__PURE__ */ React.createElement(
    "video",
    {
      src: "farnsworth.mp4",
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      controls: true,
      style: {
        width: "100%",
        height: "auto",
        display: "block"
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "pitch-media-label" }, "Farnsworth \u2014 production system")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u2753 WHY BELIEVE THE CADENCE"), /* @__PURE__ */ React.createElement("div", { className: "pitch-question" }, '"Why should I believe this team can repeatedly ship three qualified games a month without costs rising at the same rate?"'), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Farnsworth is the proprietary production system behind that cadence."), " It standardizes the full Reddit game workflow \u2014 from reusable game systems and agent-assisted development to Devvit emulation, live preview, QA, launch, and production feedback. Each game leaves behind reusable code, tests, workflows, and player learnings, so the next title starts further ahead."), /* @__PURE__ */ React.createElement("div", { className: "pitch-quote" }, '"Farnsworth makes this volume possible without scaling headcount linearly."'))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u2699\uFE0F GAME CREATION AS A REPEATABLE SYSTEM"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "Most studios treat every game as a new production process. Anomaly uses Farnsworth to turn game creation into a repeatable one."), /* @__PURE__ */ React.createElement("div", { className: "pitch-steps", style: { gridTemplateColumns: "repeat(4, 1fr)" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-step" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-step-title" }, "BUILD"), /* @__PURE__ */ React.createElement("div", { className: "pitch-step-body" }, "Reusable game primitives, persistent project knowledge, and AI-assisted implementation shorten the path from concept to playable build.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-step" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-step-title" }, "VALIDATE"), /* @__PURE__ */ React.createElement("div", { className: "pitch-step-body" }, "A Reddit-native emulator, multi-user simulation, live previews, and integrated QA let games be tested before launch.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-step" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-step-title" }, "OPERATE"), /* @__PURE__ */ React.createElement("div", { className: "pitch-step-body" }, "Production signals return to the same environment where the game was built, so the team can spot issues, create tasks, and iterate.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-step" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-step-title" }, "COMPOUND"), /* @__PURE__ */ React.createElement("div", { className: "pitch-step-body" }, "Every title adds reusable code, tests, workflows, and player learnings that improve the next title."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-note" }, "The result: Anomaly can grow launch volume without assembling a separate production team and toolchain for every game.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F91D} OUTSIDE CREATIVE CAPACITY"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Anomaly does not need to employ every team that produces the next hit."), " Farnsworth turns outside creative capacity into a standardized, testable, monetizable catalog.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "We begin with 36 internal attempts a year. Farnsworth gives us a path to hundreds of partner-powered attempts without hundreds of internal employees.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F9ED} WHAT WE BUILD, AND WHAT WE DON'T"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "Anomaly only builds Farnsworth capabilities that increase launch velocity, improve qualification rates, reduce production costs, or improve portfolio revenue. Nothing else gets built.")))), /* @__PURE__ */ React.createElement(PitchFooterNav, { onBack, onNext, nextTitle }), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function PitchDetails({ onAuction, onVision, onCoreLoop, onMonetization, onMarketOpportunity, onLivingEconomy, onRedditStrategy, onRoadmap, onFounder }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-header" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-title" }, /* @__PURE__ */ React.createElement("span", { className: "pitch-title-big" }, "ANOMALY STUDIO"), /* @__PURE__ */ React.createElement("span", { className: "pitch-title-sub" }, "THREE GAMES A MONTH \xB7 THE ANOMALY ADVANTAGE"))), /* @__PURE__ */ React.createElement("div", { className: "pitch-content" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card", onClick: onVision, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u26A1 VISION"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Anomaly is building a revenue-bearing catalog, not betting on one hit."), " We launch three games per month. Each qualified title receives a one-time payment and contributes recurring Reddit revenue, while the strongest games layer in-app purchases on top.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "At 50K average DQE per title, a 36-game catalog reaches ", /* @__PURE__ */ React.createElement("strong", null, "$180K MRR"), " and a ", /* @__PURE__ */ React.createElement("strong", null, "$2.16M"), " annualized platform-revenue run-rate before IAP."), /* @__PURE__ */ React.createElement("div", { className: "pitch-cta" }, "CLICK TO EXPLORE \u2192")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card", onClick: onCoreLoop, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F3ED} FARNSWORTH"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "The proprietary production system behind the cadence."), " It standardizes the full Reddit game workflow \u2014 reusable game systems, agent-assisted development, Devvit emulation, live preview, QA, launch, and production feedback.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "Each game leaves behind reusable code, tests, workflows, and player learnings, so the next title starts further ahead. Farnsworth makes this volume possible without scaling headcount linearly."), /* @__PURE__ */ React.createElement("div", { className: "pitch-cta" }, "CLICK TO EXPLORE \u2192")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card", onClick: onMonetization, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4B0} CATALOG ECONOMICS"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Multiple ways to win."), " $90K exit MRR if only half the titles qualify. $180K in the base scenario. Up to ~$445K in upper DQE scenarios.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "On top of that: up to $7.5K in one-time program payments per game, IAP on the strongest titles, and breakout upside that can outperform the whole base model."), /* @__PURE__ */ React.createElement("div", { className: "pitch-cta" }, "CLICK TO EXPLORE \u2192")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card", onClick: onLivingEconomy, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F310} AGENTIC LIVEOPS"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "Clearly labeled AI agents and opponents keep worlds active from day one \u2014 generating daily challenges, filling matchmaking queues, and participating in in-game economies.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "Built once inside Farnsworth, then reused across the catalog: no cold start, no empty leaderboards, no stale endgame."), /* @__PURE__ */ React.createElement("div", { className: "pitch-cta" }, "CLICK TO EXPLORE \u2192"))), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "INTERACTIVE PITCH EXPERIENCE")));
}
const CornerBracket = () => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 64 64" }, /* @__PURE__ */ React.createElement("path", { d: "M2 22 L2 2 L22 2", fill: "none", stroke: "rgba(234,246,243,0.5)", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M8 16 L8 8 L16 8", fill: "none", stroke: "rgba(234,246,243,0.3)", strokeWidth: "1" }));
function ScaledStage({ children }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function fit() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const portrait = h > w;
      const narrow = w < 900;
      const mobile = portrait || narrow;
      setIsMobile(mobile);
      if (mobile) {
        setScale(1);
        document.body.classList.add("is-mobile");
      } else {
        const s = Math.min(w / 1920, h / 1080);
        setScale(s);
        document.body.classList.remove("is-mobile");
      }
    }
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  if (isMobile) {
    return /* @__PURE__ */ React.createElement("div", { className: "mobile-shell" }, children);
  }
  return /* @__PURE__ */ React.createElement("div", { ref: wrapRef, style: {
    width: 1920,
    height: 1080,
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: `translate(-50%, -50%) scale(${scale})`,
    transformOrigin: "center center",
    flex: "none"
  } }, children);
}
function PrototypeControls({ state, goto }) {
  const [open, setOpen] = useState(false);
  const STATES = [
    ["pitch-hero", "Hero"],
    ["pitch-details", "Details"],
    ["pitch-vision", "Vision"],
    ["pitch-coreloop", "Farnsworth"],
    ["auction", "Live Auction"],
    ["post", "Shareable Post"]
  ];
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "button",
    {
      className: `controls-fab ${open ? "open" : ""}`,
      onClick: () => setOpen((o) => !o),
      "aria-label": open ? "Hide controls" : "Show controls"
    },
    open ? "\u2715" : "\u2261"
  ), open && /* @__PURE__ */ React.createElement("div", { className: "controls" }, /* @__PURE__ */ React.createElement("span", { className: "label" }, "PITCH"), STATES.map(([id, label]) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: id,
      className: state === id ? "active" : "",
      onClick: () => {
        goto(id);
        setOpen(false);
      }
    },
    label
  ))));
}
const TWEAK_DEFAULTS = (
  /*EDITMODE-BEGIN*/
  {
    "palette": "cyanMagenta"
  }
);
function PitchApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [state, setState] = useState("pitch-hero");
  const [auctionPilotId, setAuctionPilotId] = useState("p01");
  useEffect(() => {
    applyPalette(PALETTES[t.palette] || PALETTES.cyanMagenta);
  }, [t.palette]);
  return /* @__PURE__ */ React.createElement("div", { className: "stage-wrap" }, /* @__PURE__ */ React.createElement(ScaledStage, null, /* @__PURE__ */ React.createElement("div", { className: "stage", "data-state": state }, state !== "pitch-hero" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } }))), state === "pitch-hero" && /* @__PURE__ */ React.createElement(PitchHero, { onStart: () => setState("pitch-details") }), state === "pitch-details" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(
    PitchDetails,
    {
      onAuction: () => setState("auction"),
      onVision: () => setState("pitch-vision"),
      onCoreLoop: () => setState("pitch-coreloop"),
      onMonetization: () => setState("pitch-monetization"),
      onMarketOpportunity: () => setState("pitch-market"),
      onLivingEconomy: () => setState("pitch-living-economy"),
      onRedditStrategy: () => setState("pitch-reddit-strategy"),
      onRoadmap: () => setState("pitch-roadmap"),
      onFounder: () => setState("pitch-founder")
    }
  )), state === "pitch-vision" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(CatalogPage, { onBack: () => setState("pitch-details"), onOverview: () => setState("pitch-details"), onNext: () => setState("pitch-coreloop"), nextTitle: "FARNSWORTH" })), state === "pitch-coreloop" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(FarnsworthPage, { onBack: () => setState("pitch-vision"), onOverview: () => setState("pitch-details"), onNext: () => setState("pitch-monetization"), nextTitle: "CATALOG ECONOMICS" })), state === "pitch-reddit-strategy" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(RedditStrategyPage, { onBack: () => setState("pitch-details") })), state === "pitch-roadmap" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(RoadmapPage, { onBack: () => setState("pitch-founder"), onOverview: () => setState("pitch-details") })), state === "pitch-founder" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(TeamPage, { onBack: () => setState("pitch-living-economy"), onOverview: () => setState("pitch-details") })), state === "pitch-living-economy" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(LivingWorldsPage, { onBack: () => setState("pitch-monetization"), onOverview: () => setState("pitch-details") })), state === "pitch-market" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(MarketOpportunityPage, { onBack: () => setState("pitch-monetization"), onOverview: () => setState("pitch-details"), onNext: () => setState("pitch-living-economy"), nextTitle: "LIVING WORLDS" })), state === "pitch-monetization" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(EconomicsPage, { onBack: () => setState("pitch-coreloop"), onOverview: () => setState("pitch-details"), onNext: () => setState("pitch-living-economy"), nextTitle: "AGENTIC LIVEOPS" })), state === "auction" && /* @__PURE__ */ React.createElement(
    AuctionView,
    {
      pilotId: auctionPilotId,
      onBack: () => setState("pitch-details"),
      onSharePost: () => setState("post")
    }
  ), state === "post" && /* @__PURE__ */ React.createElement(
    PostView,
    {
      pilotId: auctionPilotId,
      onBack: () => setState("auction"),
      onBid: () => setState("auction")
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "scanlines" }), /* @__PURE__ */ React.createElement("div", { className: "crt-glow" }))), /* @__PURE__ */ React.createElement(TweaksPanel, null, /* @__PURE__ */ React.createElement(TweakSection, { label: "Aesthetic" }), /* @__PURE__ */ React.createElement(
    TweakSelect,
    {
      label: "Palette",
      value: t.palette,
      options: [
        { value: "cyanMagenta", label: "Cyan / Magenta" },
        { value: "blueOrange", label: "Blue / Orange" },
        { value: "goldCrimson", label: "Gold / Crimson" }
      ],
      onChange: (v) => setTweak("palette", v)
    }
  )));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(PitchApp, null));
console.log("hot reload probe " + Date.now());

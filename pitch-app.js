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
  } }), /* @__PURE__ */ React.createElement("div", { className: "pitch-hero-sub" }, "Reddit Games Pipeline"), /* @__PURE__ */ React.createElement("button", { className: "pitch-hero-cta", onClick: onStart }, "ENTER PITCH"));
}
const SECTION_ORDER = [
  "pitch-vision",
  "pitch-coreloop",
  "pitch-monetization",
  "pitch-market",
  "pitch-living-economy",
  "pitch-founder",
  "pitch-roadmap"
];
function PitchHeader({ titleBig, titleSub, onBack, onOverview, onNext }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-header" }, onOverview && /* @__PURE__ */ React.createElement("button", { className: "pitch-overview-btn", onClick: onOverview }, "OVERVIEW"), /* @__PURE__ */ React.createElement("div", { className: "pitch-header-row" }, /* @__PURE__ */ React.createElement("button", { className: "pitch-back-btn", onClick: onBack }, /* @__PURE__ */ React.createElement("span", null, "\u25C0"), /* @__PURE__ */ React.createElement("span", null, "BACK")), /* @__PURE__ */ React.createElement("div", { className: "pitch-title" }, /* @__PURE__ */ React.createElement("span", { className: "pitch-title-big" }, titleBig), /* @__PURE__ */ React.createElement("span", { className: "pitch-title-sub" }, titleSub)), onNext ? /* @__PURE__ */ React.createElement("button", { className: "pitch-back-btn", onClick: onNext }, /* @__PURE__ */ React.createElement("span", null, "NEXT"), /* @__PURE__ */ React.createElement("span", null, "\u25B6")) : /* @__PURE__ */ React.createElement("div", { style: { width: "140px" } })));
}
function VisionPage({ onBack, onOverview, onNext }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement(PitchHeader, { titleBig: "VISION", titleSub: "GAMING ON REDDIT", onBack, onOverview, onNext }), /* @__PURE__ */ React.createElement("div", { className: "pitch-content", style: { gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    background: "rgba(0,0,0,0.3)",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(25, 230, 196, 0.2)",
    maxHeight: "800px"
  } }, /* @__PURE__ */ React.createElement("img", { src: "GamesOnReddit.png", alt: "r/GamesOnReddit", style: {
    width: "100%",
    height: "auto",
    display: "block"
  } })), /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: "12px",
    fontSize: "13px",
    color: "rgba(234, 246, 243, 0.7)",
    lineHeight: "1.5",
    fontStyle: "italic"
  } }, "r/GamesOnReddit is a free marketing sub for new Reddit games with top games easily topping 50k WAU")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u26A1 THE OPPORTUNITY"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Reddit has quietly become a native games platform. "), "Devvit lets developers build interactive games that run directly inside Reddit posts, with Reddit-native identity, distribution, payments, and community mechanics.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "48"), " tracked native games. ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "1.4M"), " weekly active users. ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "532K"), " weekly contributions. A solo developer just hit ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "414,000"), " weekly players in 8 months \u2014 without spending a dollar on marketing. The average game on the platform converts ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "38%"), " of its players into active contributors every week, four to eight times higher than mobile."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://reddit.poweredbynova.ai",
      target: "_blank",
      rel: "noopener noreferrer",
      style: { color: "var(--c-left)", fontWeight: "600", marginLeft: "4px" }
    },
    "See our Reddit Games Dashboard, tracking the entire ecosystem in real time"
  ), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "The infrastructure is already there:"), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "420M monthly Redditors. A developer platform (Devvit) that runs code natively inside posts. Identity, payments, and distribution built in. Zero app store friction."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Anomaly is building the Reddit Games Pipeline"), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "\u2014 a framework, a data layer, and a first-party portfolio that turns this moment into a publishing house. Reddit's killer app is games. We're going to prove it, and we're going to own it."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F3AE} FIRST TITLES"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Multiverse Basketball Association"), " \u2014 Pixel-art esports. Collect pilots, build rosters, compete in 1v1 matches with live auctions.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Don't Die"), " \u2014 Arcade roguelike. Real-time survival gameplay, leaderboards, seasonal runs.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Scoop City"), " \u2014 Ice Cream Shop Sim. Time management meets Reddit virality. Create and share your wackiest sundaes. Real life geo features resembling Pokemon Go.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "Designed to be natively shareable, virally engaging, and monetizable through Reddit's existing systems."), /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: "16px",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(25, 230, 196, 0.2)",
    background: "#02060a"
  }, className: "pitch-video-half" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-video-crop", style: {
    position: "relative",
    width: "100%",
    aspectRatio: "384 / 360",
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement(
    "video",
    {
      src: "assets/dailyrun.mov",
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
  )), /* @__PURE__ */ React.createElement("div", { style: {
    padding: "8px 12px",
    fontFamily: "var(--f-mono)",
    fontSize: "11px",
    letterSpacing: "0.18em",
    color: "var(--c-left)",
    borderTop: "1px solid rgba(25, 230, 196, 0.15)",
    textTransform: "uppercase"
  } }, "Don't Die \u2014 Daily Run"))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4A1} WHY REDDIT WORKS FOR GAMES"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Frictionless distribution:"), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "A great game spawns a great post. A great post lands on r/all. r/all is free marketing."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Bunny Trials hit ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "24px", fontWeight: "900", color: "var(--c-left)" } }, "414K"), " weekly users in 8 months. Color Puzzle: ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "24px", fontWeight: "900", color: "var(--c-left)" } }, "120K"), " in 4 months. Pixelary: ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "24px", fontWeight: "900", color: "var(--c-left)" } }, "67K"), " with 95.5% of players actively posting back into the feed. None of these games spent on user acquisition \u2014 the post is the game is the ad."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Across 48 tracked Devvit games, average engagement is ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "24px", fontWeight: "900", color: "var(--c-left)" } }, "38.1%"), " (contributions \xF7 WAU). Mobile F2P industry standard is 5\u201310%. Every player is also a content creator \u2014 every game session is itself a viral unit."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Cold-start solved:"), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "24 of the 48 games we track launched in 2026 alone \u2014 half the ecosystem is less than 5 months old. There is no early-mover penalty here. Devvit is still bootstrapping its catalog. The studio that ships 2\u20133 hits in the next 12 months is locked in for the cycle."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Time-to-traction is collapsed:"), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "On mobile, a new title typically needs $100K+ in UA to reach 50K MAU. On Reddit, Designer Eye reached 4.7K WAU in 57 days with no marketing. MiniGawf hit 49K WAU in 68 days. The dev cost is the only real cost."))))), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function RedditStrategyPage({ onBack, onOverview, onNext }) {
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
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F3AE} MATCH GAMEPLAY"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "A match plays out like a ", /* @__PURE__ */ React.createElement("strong", null, "televised broadcast"), ". You're the head coach: call plays between possessions, watch your pixel squad execute like TFT units.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Possession-based tactics."), " Real-time 5v5 basketball with auto-playing units. You make strategic decisions: steal the ball, press defense, or let the opponent score to reset momentum.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Pixel-art spectacle."), " Slow-mo replays, crowd reactions, scoreboard drama. Every basket feels earned.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F310} PLATFORM"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Anomaly lives inside a Reddit post."), " Open a post, the game loads. No install, no app store, no friction.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Reddit is the delivery mechanism:"), /* @__PURE__ */ React.createElement("br", null), "\u2022 Identity (login with your Reddit account)", /* @__PURE__ */ React.createElement("br", null), "\u2022 Payments (Reddit Coins)", /* @__PURE__ */ React.createElement("br", null), "\u2022 Distribution (front page, subreddit leagues, cross-posts)", /* @__PURE__ */ React.createElement("br", null), "\u2022 Social (upvotes, comments, shares)")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u26A1 THE INTEGRATION"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Posts ARE matches."), " Create a post to start a ranked match. Play in real-time. Other Redditors watch live in the comments.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Comments ARE comms."), " Teammates coordinate in real-time. Opponents trash-talk. Crowd votes on bold plays.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Upvotes ARE discovery."), " Epic matches bubble up to the front page. New players find the game organically.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F3C6} REDDIT LEAGUES"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Build community tournaments inside subreddits."), " Create seasonal leagues where players compete for rank and reddit-wide leaderboards.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Subreddit-native leagues:"), /* @__PURE__ */ React.createElement("br", null), "\u2022 r/AnomalyLeague (flagship competitive)", /* @__PURE__ */ React.createElement("br", null), "\u2022 r/CasualBall (pickup games)", /* @__PURE__ */ React.createElement("br", null), "\u2022 r/NBA2026 (themed tournament)", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "Reddit's infrastructure becomes the league infrastructure.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4CA} VIRALITY"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Games go viral on Reddit."), " A player hits a clutch shot, the clip gets upvoted 50k times, front page, new players download the game.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Built-in amplification:"), " Every match is shareable. Every win is a moment to post. Every loss is a meme template.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Reddit's own games feed the platform."), " We're not competing for space; we're native to the feed.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4B0} MONETIZATION"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "Reddit monetization is still early, which creates the opportunity. Anomaly will begin with proven, low-friction revenue loops: non-pay-to-win cosmetics, premium currency, seasonal passes, grants, and sponsored collaborations.")))), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function RoadmapPage({ onBack, onOverview, onNext }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement(PitchHeader, { titleBig: "ROADMAP", titleSub: "18-MONTH EXECUTION", onBack, onOverview, onNext }), /* @__PURE__ */ React.createElement("div", { className: "pitch-content", style: { gridTemplateColumns: "1fr", gap: "24px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4C5} Q3 2026 \u2014 Build the Rails"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Ship the tooling, analytics, and ingestion layer that turns Reddit into a measurable platform."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Track every popular game, every weekly metric, every breakout signal. Already live: 48 games tracked, 1.4M weekly users measured, daily growth analytics."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Launch closed beta testing of Multiverse Basketball Association and Don't Die."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F3AE} Q4 2026 \u2014 Launch First Titles"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Full launch of Multiverse Basketball Association and Don't Die through Devvit."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Use the data layer to A/B test mechanics, monetization, and viral hooks in real time. Goals: hit ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "18px", fontWeight: "900", color: "var(--c-left)" } }, "50K WAU"), " per title and ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "18px", fontWeight: "900", color: "var(--c-left)" } }, "$10K"), " monthly revenue per title."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F680} Q1 2027 \u2014 Compound the Hits"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Ship ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "18px", fontWeight: "900", color: "var(--c-left)" } }, "10 games"), " in parallel."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "AI-accelerated production means a Q1 launch slate, not a Q1 launch. Iterate from real data, leverage the tools to rapidly test and ship at scale."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F513} Q2 2027 \u2014 Open the Platform"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "License the tooling, run growth services, and start publishing third-party titles under the Anomaly banner."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "The catalog and the data layer become the moat."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F451} Q3 2027 \u2192 Q2 2028 \u2014 Publisher of Record"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "By the time competitors realize Reddit is a games category, we own the analytics, the catalog, and the developer relationships."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Anomaly is the publisher for native Reddit games."))))), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function FounderPage({ onBack, onOverview, onNext }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement(PitchHeader, { titleBig: "THE FOUNDER", titleSub: "LONG DO", onBack, onOverview, onNext }), /* @__PURE__ */ React.createElement("div", { className: "pitch-content", style: { gridTemplateColumns: "400px 1fr", gap: "24px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    background: "rgba(0,0,0,0.3)",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(25, 230, 196, 0.2)",
    maxHeight: "600px"
  } }, /* @__PURE__ */ React.createElement("img", { src: "long-do-photo.jpg", alt: "Long Do", style: {
    width: "100%",
    height: "auto",
    display: "block"
  } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F464} LONG DO"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "A decade of shipping hits as an indie developer."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "10+ shipped titles. $50K\u2013$2M acquisitions. Built without teams, without publishers, against 30% app store cuts."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Long Do is a repeat founder with multiple successful exits"), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "and investment from leading names including a16z and Kevin O'Leary. He brings deep technical expertise through dual degrees in Computer Science and Information Technology."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Two forces have just compressed the math:"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "\u2022 ", /* @__PURE__ */ React.createElement("strong", null, "AI"), " turns a 12-month build into a 3-month ship", /* @__PURE__ */ React.createElement("br", null), "\u2022 ", /* @__PURE__ */ React.createElement("strong", null, "Reddit"), " removes every distribution and monetization tax that used to slow indies down"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "The model that worked for one developer building one game at a time now works for one developer building ten at a time, on the platform with the lowest friction in gaming history."))))), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function AIDifferencePage({ onBack, onOverview, onNext }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement(PitchHeader, { titleBig: "ANOMALY'S LIVING WORLDS", titleSub: "AI AGENTS NATIVE TO REDDIT", onBack, onOverview, onNext }), /* @__PURE__ */ React.createElement("div", { className: "pitch-content", style: { gridTemplateColumns: "1fr", gap: "24px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F916} AI AGENTS EMBEDDED INTO THE REDDIT ECOSYSTEM"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Most studios bolt AI on as a feature. Clearly labeled AI opponents and game agents keep worlds active from day one. They can generate daily challenges, fill matchmaking queues, participate in in-game auctions, and create replayable content loops \u2014 without pretending to be human users or manipulating Reddit votes."), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "\u2014 autonomous participants embedded directly in the feed, the comments, and the game economy."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Create content, posts, content \u2014 seeding activity, filling matchmaking, and keeping every community alive from day one."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "The result:"), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "a game world that never feels empty, and a content engine that runs itself. Our AI difference isn't a smarter NPC \u2014 it's an always-on population native to the platform."))), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginTop: "8px"
  } }, /* @__PURE__ */ React.createElement("div", { style: { height: "1px", flex: "0 0 40px", background: "var(--c-left)" } }), /* @__PURE__ */ React.createElement("span", { style: {
    color: "var(--c-left)",
    fontSize: "14px",
    letterSpacing: "0.2em",
    fontWeight: "700"
  } }, "IN PRACTICE \u2014 THE LIVING ECONOMY"), /* @__PURE__ */ React.createElement("div", { style: { height: "1px", flex: "1", background: "rgba(25, 230, 196, 0.2)" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(25, 230, 196, 0.2)",
    position: "relative",
    height: "600px"
  } }, /* @__PURE__ */ React.createElement(
    "video",
    {
      src: "living-economy-demo.mp4",
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
  ))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F916} WHAT IS A LIVING ECONOMY?"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "The hardest problem in games isn't building a world \u2014 it's keeping it alive after launch."), " Scripted economies go stale; players churn.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Anomaly has a living economy:"), " Admin AI Assisted controlled agents that think, bid, scout, and adapt in real time. They have unique rosters, bidding strategies, and personalities. They're not just opponents \u2014 they're market participants, price makers, and ecosystem participants.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "What this means:"), " Every day the economy looks different. New meta emerges. New opportunities surface. The world feels alive.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F3C6} RANKED LADDER WITH AGENTS"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Queue System:"), " Players are matched against ranked opponents based on their player roster strength AND agent rosters.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Agent Variety:"), " Different agents have different strategies:", /* @__PURE__ */ React.createElement("br", null), "\u2022 Aggressive bidders who drive auction prices", /* @__PURE__ */ React.createElement("br", null), "\u2022 Scout agents who discover undervalued pilots", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Solving Cold Start:"), " Day 1, new players draft a starter roster, queue matches against agents, win gold, bid in auctions, and climb the leaderboard \u2014 a thriving ecosystem with competitive matches, an active auction market, and meaningful progression from the very first session.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F48E} MARKET MAKING VIA AGENTS"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Liquidity on demand:"), " Agents always bid if prices drop too low", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Price stability:"), " Agents dampen extreme volatility", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Player confidence:"), " Market depth feels real", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Natural progression:"), " Agents sell inventory as players climb ranks")))), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginTop: "8px"
  } }, /* @__PURE__ */ React.createElement("div", { style: { height: "1px", flex: "0 0 40px", background: "var(--c-left)" } }), /* @__PURE__ */ React.createElement("span", { style: {
    color: "var(--c-left)",
    fontSize: "14px",
    letterSpacing: "0.2em",
    fontWeight: "700"
  } }, "IN PRACTICE \u2014 DON'T DIE: DAILY ROGUELIKE"), /* @__PURE__ */ React.createElement("div", { style: { height: "1px", flex: "1", background: "rgba(25, 230, 196, 0.2)" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: {
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
      src: "assets/dailyrun.mov",
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
  )), /* @__PURE__ */ React.createElement("div", { style: {
    padding: "8px 12px",
    fontFamily: "var(--f-mono)",
    fontSize: "11px",
    letterSpacing: "0.18em",
    color: "var(--c-left)",
    borderTop: "1px solid rgba(25, 230, 196, 0.15)",
    textTransform: "uppercase"
  } }, "Don't Die \u2014 Daily Run")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F5E1}\uFE0F AGENT-GENERATED DAILY CHALLENGES"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "A deck-building roguelike in the Slay the Spire tradition \u2014 but the runs build themselves."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "An AI agent auto-generates a fresh daily challenge \u2014 new map, enemies, relics, and modifiers \u2014 and posts it straight to Reddit as a playable post. Every day is a new seed, a new leaderboard, a new conversation."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Why it works:"), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "The content engine never sleeps and never runs dry. Players return daily to chase the same seed, compare runs in the comments, and the post itself is the distribution."))))), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginTop: "8px"
  } }, /* @__PURE__ */ React.createElement("div", { style: { height: "1px", flex: "0 0 40px", background: "var(--c-left)" } }), /* @__PURE__ */ React.createElement("span", { style: {
    color: "var(--c-left)",
    fontSize: "14px",
    letterSpacing: "0.2em",
    fontWeight: "700"
  } }, "IN PRACTICE \u2014 REAL-WORLD DYNAMIC DATA"), /* @__PURE__ */ React.createElement("div", { style: { height: "1px", flex: "1", background: "rgba(25, 230, 196, 0.2)" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: {
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(25, 230, 196, 0.2)",
    background: "#02060a"
  } }, /* @__PURE__ */ React.createElement(
    "video",
    {
      src: "assets/scoopcity.mp4",
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      preload: "none",
      style: {
        width: "100%",
        height: "auto",
        display: "block"
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: {
    padding: "8px 12px",
    fontFamily: "var(--f-mono)",
    fontSize: "11px",
    letterSpacing: "0.18em",
    color: "var(--c-left)",
    borderTop: "1px solid rgba(25, 230, 196, 0.15)",
    textTransform: "uppercase"
  } }, "Scoop City")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F30E} REAL-WORLD DATA AS GAME FUEL"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "A game world wired directly into reality."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Real-life events, live weather, and real-time data feeds stream in, and an AI agent monitors them to generate dynamic game content \u2014 events, conditions, and challenges that mirror what's actually happening in the world."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Why it works:"), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "The game is never the same twice and is impossible to fully script around. A storm rolls through your city, the world reacts. The agent turns the real world into an endless, self-refreshing content pipeline.")))))), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function MarketOpportunityPage({ onBack, onOverview, onNext }) {
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
  } }, "Element Synergy Puzzle by u/Runaider \u2014 107k weekly visitors. Solo developer, Reddit-native game.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F3AF} THE PROOF POINT"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "We're tracking 48 active games on Reddit. Just the popular tier alone:"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "1,397,209"), " weekly active users across tracked titles", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "531,931"), " weekly contributions (votes, posts, plays \u2014 not passive scrolling)", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "38.1%"), " platform-wide engagement rate (contributions \xF7 WAU). On mobile F2P, 5\u201310% is industry standard. This is 4\u20138x higher."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Individual breakouts:"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "\u2022 ", /* @__PURE__ */ React.createElement("strong", null, "Bunny Trials:"), " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "414K"), " WAU in 8 months. Single-developer game.", /* @__PURE__ */ React.createElement("br", null), "\u2022 ", /* @__PURE__ */ React.createElement("strong", null, "Element Synergy Puzzle:"), " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "129K"), " WAU \u2014 solo dev again", /* @__PURE__ */ React.createElement("br", null), "\u2022 ", /* @__PURE__ */ React.createElement("strong", null, "Pixelary:"), " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "67K"), " WAU and ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "64K"), " weekly contributions \u2014 near 1:1 player-to-action ratio, a metric most F2P titles would kill for"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "The breakout case \u2014 Bunny Trials:"), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Launched September 2025. Eight months later, 414k weekly active users \u2014 a number a small indie studio would normally need a multi-million dollar UA budget to reach. Distribution cost: $0."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4C8} MARKET SIZE"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Total Addressable Market:"), " $12B+ digital collectibles", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Serviceable Market:"), " Reddit's 420M monthly active users, gaming audience estimated at 50M+", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Serviceable Obtainable Market:"), " 2.5M active monthly players in similar titles on Reddit alone")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4A1} WHY NOW?"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "The ecosystem is bootstrapping in real time:"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "\u2022 ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "50%"), " of the 48 tracked games launched in 2026 alone (24 of 48, in just five months)", /* @__PURE__ */ React.createElement("br", null), "\u2022 ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "73%"), " launched in the last 9 months (35 of 48 since September 2025)", /* @__PURE__ */ React.createElement("br", null), "\u2022 Newest tracked game: launched 2026-05-16 \u2014 ten days ago", /* @__PURE__ */ React.createElement("br", null), "\u2022 The oldest tracked breakout (Pixelary) is only 18 months old, already at 67K WAU with 95.5% engagement"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "We are at the very start of a platform shift."), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Roblox at 18 months: ~100K MAU. Devvit games at 18 months: ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "1.4M"), " weekly active users across just 48 titles tracked. ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "~14x"), " ahead of where Roblox was at the same stage of its lifecycle."))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F680} OUR OPPORTUNITY"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Build the publishing house Reddit doesn't have yet \u2014 and use the tools to power it before anyone else can."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Year 1 \u2014 Build the infrastructure"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "In our first year we've proven out several builds, experimented with changing code bases. Developed the tooling, tracking, and testing layer that no studio on Reddit currently owns: real-time WAU/contribution dashboards, growth analytics, A/B testing, screenshot pipelines, ingestion automation."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "While other devs ship one game at a time, we'll ship a system \u2014 one that surfaces what's working before the market notices."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Internal proof point: we already track ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "48 games"), ", ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "1.4M"), " weekly users, daily measurement, growth analytics, and screenshot pipelines \u2014 the platform exists."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Year 2 \u2014 Ship the breakouts"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "Use the data and tools to deliberately engineer hits. The platform has shown that solo developers can reach 100K+ weekly users in months. A team with infrastructure, capital, and the data layer has no excuse not to ship two or three of them."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Year 3 \u2014 Become the biggest publisher on Reddit"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "By the time the rest of the industry realizes Reddit is a games platform, we own the catalog, the tools, the analytics, and the relationships with the developers building on it. Anomaly Studio becomes the publisher of record for native Reddit games \u2014 distribution, monetization, growth, and discoverability under one roof."))))), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function MonetizationPage({ onBack, onOverview, onNext }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement(PitchHeader, { titleBig: "MONETIZATION", titleSub: "SUSTAINABLE REVENUE", onBack, onOverview, onNext }), /* @__PURE__ */ React.createElement("div", { className: "pitch-content", style: { gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    background: "rgba(0,0,0,0.3)",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(25, 230, 196, 0.2)",
    maxHeight: "700px"
  } }, /* @__PURE__ */ React.createElement("img", { src: "Shop.png", alt: "In-Game Shop", style: {
    width: "100%",
    height: "auto",
    display: "block"
  } })), /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: "12px",
    fontSize: "13px",
    color: "rgba(234, 246, 243, 0.7)",
    lineHeight: "1.5",
    fontStyle: "italic"
  } }, "Our gem shop allows players to purchase cosmetics and battle pass progression")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F48E} PREMIUM CURRENCY MONETIZATION"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "Initial monetization will focus on non-pay-to-win cosmetics, seasonal passes, Reddit Gold purchases, and sponsored collaborations. We will validate ARPU, conversion, and retention across first-party titles before expanding into third-party publishing.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F91D} GRANTS & COLLABORATIONS"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "Reddit's Fund supports virality of games with up to $200k in grants for creating played games. Monetization is early, but we can start with revenue share on Fund-supported titles and expand into sponsored collaborations with brands and IP holders.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "Reddit is also early in exploring paid attention and analytics services for game developers. We can position Anomaly as a growth partner for Fund-supported titles, offering paid services to help them optimize their games and scale their audiences.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4CA} REVENUE PROJECTIONS"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Y1:"), " 10 Games, 50k players each, $400k\u2013600k MRR (Reddit Gold)", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Y2+:"), " 20 Games, 500k players each, $400k\u2013600k MRR (Reddit Gold, Revenue Share with Reddit Attention)")))), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function CoreLoopPage({ onBack, onOverview, onNext }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement(PitchHeader, { titleBig: "REDDIT MECHANICS", titleSub: "POSTS ARE GAMES", onBack, onOverview, onNext }), /* @__PURE__ */ React.createElement("div", { className: "pitch-content", style: { gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    background: "rgba(0,0,0,0.3)",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(25, 230, 196, 0.2)",
    maxHeight: "800px"
  } }, /* @__PURE__ */ React.createElement("img", { src: "SwordAndSupper.png", alt: "Sword & Supper Game", style: {
    width: "100%",
    height: "auto",
    display: "block"
  } })), /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: "12px",
    fontSize: "13px",
    color: "rgba(234, 246, 243, 0.7)",
    lineHeight: "1.5",
    fontStyle: "italic"
  } }, "Margaret on our team created Sword & Supper, the first monetized game on Reddit")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4EE} POSTS ARE GAMES"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "A Reddit post hosts the entire match. Open a post, the game loads. One click. No friction.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "What it means:"), " Every match is a persistent container with its own URL and thread. Players can share, spectate, and comment on live games. A great match becomes a shareable moment that lands on r/all.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F3C0} MULTIVERSE BASKETBALL ASSOCIATION \u2014 IN ACTION"), /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: "12px",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(25, 230, 196, 0.2)",
    background: "#02060a"
  }, className: "pitch-video-half" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-video-crop", style: {
    position: "relative",
    width: "100%",
    aspectRatio: "384 / 360",
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement(
    "video",
    {
      src: "assets/MBAClip.mov",
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
  )), /* @__PURE__ */ React.createElement("div", { style: {
    padding: "8px 12px",
    fontFamily: "var(--f-mono)",
    fontSize: "11px",
    letterSpacing: "0.18em",
    color: "var(--c-left)",
    borderTop: "1px solid rgba(25, 230, 196, 0.15)",
    textTransform: "uppercase"
  } }, "Multiverse Basketball Association"))), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4AC} COMMENTS = GUILD COMMS"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "The comment thread is where the community lives. Players trash talk, celebrate, and strategize in real time.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Post-game:"), " Commentary, GIFs, replays, and leaderboard updates thread together naturally. No separate discord, no fragmentation.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u2B06\uFE0F UPVOTES = DISCOVERY"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "Upvotes signal quality and drive the feed algorithm. A close match, a rare auction upset, a legendary play \u2014 these become viral posts.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "What we get:"), " Free distribution. Organic marketing. The algorithm does the work.")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F465} SUBREDDITS = GUILDS"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "r/MultiverseBA is the tribe. Weekly tournaments, seasonal leagues, collaborative bosses.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Retention:"), " Your friends ARE your league. Reddit's tribal structure becomes progression infrastructure.")))), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "REDDIT GAMES PIPELINE")));
}
function PitchDetails({ onBack, onAuction, onVision, onCoreLoop, onMonetization, onMarketOpportunity, onLivingEconomy, onRedditStrategy, onRoadmap, onFounder }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pitch-details" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-header" }, /* @__PURE__ */ React.createElement("button", { className: "pitch-back-btn", onClick: onBack }, /* @__PURE__ */ React.createElement("span", null, "\u25C0"), /* @__PURE__ */ React.createElement("span", null, "BACK")), /* @__PURE__ */ React.createElement("div", { className: "pitch-title" }, /* @__PURE__ */ React.createElement("span", { className: "pitch-title-big" }, "ANOMALY STUDIO"), /* @__PURE__ */ React.createElement("span", { className: "pitch-title-sub" }, "INTERACTIVE PITCH DECK")), /* @__PURE__ */ React.createElement("div", { style: { width: "140px" } })), /* @__PURE__ */ React.createElement("div", { className: "pitch-content" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card", onClick: onVision, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u26A1 VISION"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Reddit has quietly become a native games platform."), " Anomaly has the data, tooling, AI systems, and game production engine to become the first major Reddit-native games publisher.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "420M monthly active users. A developer platform that runs code in posts. Built-in identity, payments, and distribution.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Anomaly"), " is building the ", /* @__PURE__ */ React.createElement("strong", null, "Reddit Games Pipeline"), " \u2014 flagship games that prove games are Reddit's killer app."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "8px", color: "var(--c-left)", fontSize: "12px", letterSpacing: "0.1em" } }, "CLICK TO EXPLORE \u2192")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card", onClick: onCoreLoop, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F3AE} NEW INNOVATIVE LOOPS"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", null, "Collect, Customize, Compete, and Trade"), " \u2014 Draft legendary pixel athletes, Build lineups around playstyles, Bid, auction, and upgrade your roster through a player-driven market", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Casual Evergreen Games"), " \u2014  Automated engagement loops, live events, and dynamic content keep the world fresh and players coming back for more", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", null, "Virality in Mind"), " \u2014 Share simple things like Ice Cream cones in shareable Reddit post, with built-in commenting to drive community and discovery"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "8px", color: "var(--c-left)", fontSize: "12px", letterSpacing: "0.1em" } }, "CLICK TO EXPLORE \u2192")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card", onClick: onMonetization, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4B0} MONETIZATION"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "Reddit monetization is still early, which creates the opportunity. Anomaly will begin with proven, low-friction revenue loops: non-pay-to-win cosmetics, premium currency, seasonal passes, grants, and sponsored collaborations."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "8px", color: "var(--c-left)", fontSize: "12px", letterSpacing: "0.1em" } }, "CLICK TO EXPLORE \u2192")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card", onClick: onMarketOpportunity, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4CA} MARKET OPPORTUNITY"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "We're tracking ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "48"), " active games on Reddit. Just the popular tier alone:"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "1,397,209"), " weekly active users across tracked titles", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "531,931"), " weekly contributions (votes, posts, plays \u2014 not passive scrolling)", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "38.1%"), " platform-wide engagement rate (contributions \xF7 WAU). On mobile F2P, 5\u201310% is industry standard. This is ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "20px", fontWeight: "900", color: "var(--c-left)" } }, "4\u20138x"), " higher.")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "8px", color: "var(--c-left)", fontSize: "12px", letterSpacing: "0.1em" } }, "CLICK TO EXPLORE \u2192")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card", onClick: onLivingEconomy, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F310} ANOMALY'S LIVING WORLDS"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "AI agents embedded natively into the Reddit ecosystem \u2014 they post, comment, bid, and compete like real Redditors, seeding activity and keeping every community alive from day one.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "In practice, this powers a living economy: no cold start, no empty leaderboards, no churn from stale endgame. A world that feels alive."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "8px", color: "var(--c-left)", fontSize: "12px", letterSpacing: "0.1em" } }, "CLICK TO EXPLORE \u2192")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card", onClick: onFounder, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F464} THE FOUNDER"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Long Do"), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "\u2014 solo developer, in the last 3 years, 10+ shipped titles each successfully brought in revenue $50K\u2013$2M."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "A decade of shipping hits as an indie \u2014 built without teams, without publishers, against 30% app store cuts."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Two forces have just compressed the math:"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--c-ink)" } }, "\u2022 AI turns a 12-month build into a 1-month ship", /* @__PURE__ */ React.createElement("br", null), "\u2022 Reddit removes every distribution and monetization tax that used to slow indies down")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "8px", color: "var(--c-left)", fontSize: "12px", letterSpacing: "0.1em" } }, "CLICK TO EXPLORE \u2192")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card", onClick: onRoadmap, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F4C5} THE ROADMAP"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--c-ink)" } }, "Five quarters to category leadership."), " Build the infrastructure and tools (Q3 2026), launch flagship titles (Q4 2026), compound with a portfolio of hits (Q1 2027), open to third-party studios (Q2 2027), and become Reddit's publisher of record by Q2 2028."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "8px", color: "var(--c-left)", fontSize: "12px", letterSpacing: "0.1em" } }, "CLICK TO EXPLORE \u2192")), /* @__PURE__ */ React.createElement("div", { className: "pitch-card" }, /* @__PURE__ */ React.createElement("div", { className: "pitch-card-title" }, "\u{1F47E} LIVE DEMO"), /* @__PURE__ */ React.createElement("div", { className: "pitch-card-body" }, "Experience the ", /* @__PURE__ */ React.createElement("strong", null, "auction house in action"), ". See how players bid on legendary pilots in real time with our live bidding interface.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("button", { onClick: onAuction, style: {
    appearance: "none",
    border: "1px solid var(--c-left)",
    background: "rgba(25, 230, 196, 0.1)",
    color: "var(--c-left)",
    padding: "10px 20px",
    cursor: "pointer",
    font: "700 14px var(--f-head)",
    letterSpacing: "0.1em",
    marginTop: "8px"
  } }, "ENTER AUCTION HOUSE \u2192")))), /* @__PURE__ */ React.createElement("div", { className: "pitch-footer" }, /* @__PURE__ */ React.createElement("span", null, "ANOMALY STUDIO \xA9 2026"), /* @__PURE__ */ React.createElement("span", null, "INTERACTIVE PITCH EXPERIENCE")));
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
    ["pitch-coreloop", "Core Loop"],
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
      onBack: () => setState("pitch-hero"),
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
  )), state === "pitch-vision" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(VisionPage, { onBack: () => setState("pitch-details"), onOverview: () => setState("pitch-details"), onNext: () => setState("pitch-coreloop") })), state === "pitch-coreloop" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(CoreLoopPage, { onBack: () => setState("pitch-vision"), onOverview: () => setState("pitch-details"), onNext: () => setState("pitch-monetization") })), state === "pitch-reddit-strategy" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(RedditStrategyPage, { onBack: () => setState("pitch-details") })), state === "pitch-roadmap" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(RoadmapPage, { onBack: () => setState("pitch-founder"), onOverview: () => setState("pitch-details") })), state === "pitch-founder" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(FounderPage, { onBack: () => setState("pitch-living-economy"), onOverview: () => setState("pitch-details"), onNext: () => setState("pitch-roadmap") })), state === "pitch-living-economy" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(AIDifferencePage, { onBack: () => setState("pitch-market"), onOverview: () => setState("pitch-details"), onNext: () => setState("pitch-founder") })), state === "pitch-market" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(MarketOpportunityPage, { onBack: () => setState("pitch-monetization"), onOverview: () => setState("pitch-details"), onNext: () => setState("pitch-living-economy") })), state === "pitch-monetization" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "backplate" }), /* @__PURE__ */ React.createElement("div", { className: "starfield" }), /* @__PURE__ */ React.createElement("div", { className: "planet" }), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-tr" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-bl" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "corner-bracket cb-br" }, /* @__PURE__ */ React.createElement(CornerBracket, null)), /* @__PURE__ */ React.createElement("div", { className: "side-slashes left" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement("div", { className: "side-slashes right" }, /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 40 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 80, opacity: 0.5 } }), /* @__PURE__ */ React.createElement("div", { className: "slash", style: { left: 160, opacity: 0.25 } })), /* @__PURE__ */ React.createElement(MonetizationPage, { onBack: () => setState("pitch-coreloop"), onOverview: () => setState("pitch-details"), onNext: () => setState("pitch-market") })), state === "auction" && /* @__PURE__ */ React.createElement(
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

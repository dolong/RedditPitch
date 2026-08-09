/* global React, ReactDOM */
/* Anomaly — Reddit Games Pipeline Pitch */

const { useState, useEffect, useRef } = React;

// ─── Sample pilot data ──────────────────────────────────────
const SAMPLE_PILOTS = [
  {
    id: "p01",
    name: "RYX FROST",
    callsign: "PEETAN",
    jp: "フロスト",
    position: "SF",
    tier: "DIAMOND",
    color: "#19e6c4",
    overall: 89,
    rarity: 5,
    level: 45,
    maxLevel: 50,
    role: "FORWARD",
    spd: 85, dex: 92, jmp: 78, acc: 88,
    ability: "ICE SHATTER",
  },
  {
    id: "p02",
    name: "VOLT STRIKER",
    callsign: "THUNDERKID",
    jp: "ボルト",
    position: "PG",
    tier: "PLATINUM",
    color: "#3ea6ff",
    overall: 87,
    rarity: 5,
    level: 42,
    maxLevel: 50,
    role: "GUARD",
    spd: 95, dex: 88, jmp: 82, acc: 90,
    ability: "SPARK RUSH",
  },
  {
    id: "p03",
    name: "NOVA BLAZE",
    callsign: "INFERNO",
    jp: "ノヴァ",
    position: "SG",
    tier: "GOLD",
    color: "#ff7a3c",
    overall: 84,
    rarity: 4,
    level: 38,
    maxLevel: 50,
    role: "SHOOTER",
    spd: 82, dex: 85, jmp: 76, acc: 91,
    ability: "FLAME BURST",
  },
];

window.PILOTS = SAMPLE_PILOTS;

// ─── Palette options ────────────────────────────────────────
const PALETTES = {
  cyanMagenta: {
    name: "Cyan / Magenta",
    left: "#19e6c4", leftGlow: "#5bf2d4", leftDeep: "#04201a",
    leftBg: "radial-gradient(ellipse at 0% 50%, #0e3a32 0%, #04140f 55%, #02080a 100%)",
    right: "#ff2d6f", rightGlow: "#ff6b9a", rightDeep: "#1f0612",
    rightBg: "radial-gradient(ellipse at 100% 50%, #3e0a1f 0%, #160510 55%, #0a0306 100%)",
  },
  blueOrange: {
    name: "Blue / Orange",
    left: "#3ea6ff", leftGlow: "#7fc7ff", leftDeep: "#06121f",
    leftBg: "radial-gradient(ellipse at 0% 50%, #0a2745 0%, #06121f 55%, #02060a 100%)",
    right: "#ff7a3c", rightGlow: "#ffaa70", rightDeep: "#1f0e06",
    rightBg: "radial-gradient(ellipse at 100% 50%, #45200a 0%, #1f0e06 55%, #0a0603 100%)",
  },
  goldCrimson: {
    name: "Gold / Crimson",
    left: "#ffc94a", leftGlow: "#ffe080", leftDeep: "#201a04",
    leftBg: "radial-gradient(ellipse at 0% 50%, #3a2e0e 0%, #14100f 55%, #08070a 100%)",
    right: "#ff3b3b", rightGlow: "#ff7a7a", rightDeep: "#1f0608",
    rightBg: "radial-gradient(ellipse at 100% 50%, #4a0a14 0%, #1a0508 55%, #0a0306 100%)",
  },
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

// ─── Pitch Hero Screen ──────────────────────────────────────
function PitchHero({ onStart }) {
  return (
    <div className="pitch-hero" style={{
      background: "var(--c-left-bg)",
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
    }}>
      <img src="title.svg" alt="ANOMALY" style={{
        width: "400px",
        height: "auto",
        filter: "drop-shadow(0 0 20px rgba(25, 230, 196, 0.3))",
      }} />
      <div className="pitch-hero-sub">Reddit Updates</div>
      <button className="pitch-hero-cta" onClick={onStart}>
        ENTER PITCH
      </button>
    </div>
  );
}

// ─── Section order + shared header ────────────────────────
const SECTION_ORDER = [
  "pitch-vision",         // Vision
  "pitch-coreloop",       // Farnsworth
  "pitch-monetization",   // Catalog Economics
  "pitch-living-economy", // Living Worlds
];
// Hidden: pitch-founder (The Team), pitch-market, pitch-reddit-strategy, pitch-roadmap —
// their pages remain in source but nothing navigates to them.

function PitchHeader({ titleBig, titleSub, onBack, onOverview, onNext }) {
  return (
    <div className="pitch-header">
      {onOverview && (
        <button className="pitch-close-x" onClick={onOverview} aria-label="Back to overview">×</button>
      )}
      {onOverview && (
        <button className="pitch-overview-btn" onClick={onOverview}>BACK TO OVERVIEW</button>
      )}
      <div className="pitch-header-row">
        <button className="pitch-back-btn" onClick={onBack}>
          <span>◀</span>
          <span>BACK</span>
        </button>
        <div className="pitch-title">
          <span className="pitch-title-big">{titleBig}</span>
          <span className="pitch-title-sub">{titleSub}</span>
        </div>
        {onNext ? (
          <button className="pitch-back-btn" onClick={onNext}>
            <span>NEXT</span>
            <span>▶</span>
          </button>
        ) : (
          <div style={{ width: "140px" }}></div>
        )}
      </div>
    </div>
  );
}

function PitchFooterNav({ onBack, onNext, nextTitle }) {
  // Landing has no nav callbacks → render nothing.
  if (!onBack && !onNext) return null;
  return (
    <div className="pitch-footer-nav">
      {onBack ? (
        <button className="pitch-back-btn" onClick={onBack}>
          <span>◀</span>
          <span>BACK</span>
        </button>
      ) : <div></div>}
      {onNext ? (
        <button className="pitch-back-btn pitch-next-btn" onClick={onNext}>
          <span>NEXT{nextTitle ? `: ${nextTitle}` : ""}</span>
          <span>▶</span>
        </button>
      ) : <div></div>}
    </div>
  );
}

// ─── Catalog Page ──────────────────────────────────────────
function CatalogPage({ onBack, onOverview, onNext, nextTitle }) {
  return (
    <div className="pitch-details">
      <PitchHeader titleBig="VISION" titleSub="GAMING ON REDDIT" onBack={onBack} onOverview={onOverview} onNext={onNext} />

      <div className="pitch-content" style={{ gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" }}>
        {/* Left column: distribution proof */}
        <div style={{ display: "grid", gap: "24px" }}>
          <div>
            <div className="pitch-media">
              <img src="GamesOnReddit.png" alt="r/GamesOnReddit" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div className="pitch-caption">
              r/GamesOnReddit is free distribution for new Reddit games — top titles clear 50K weekly users with no paid marketing.
            </div>
          </div>
        </div>

        {/* Right column: content cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          <div className="pitch-card">
            <div className="pitch-card-title">📊 STATE OF PLAY</div>
            <div className="pitch-card-body">
              <strong>Anomaly is building a revenue-bearing catalog, not betting on one hit.</strong> We launch three games per month.
              Each qualified title receives a one-time payment and contributes recurring Reddit revenue, while the strongest games layer
              in-app purchases on top.
            </div>

            <div className="pitch-metrics" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className="pitch-metric">
                <div className="pitch-metric-value">3</div>
                <div className="pitch-metric-label">Games launched / month</div>
              </div>
              <div className="pitch-metric">
                <div className="pitch-metric-value">50K</div>
                <div className="pitch-metric-label">Average DQE per title</div>
              </div>
              <div className="pitch-metric">
                <div className="pitch-metric-value">36</div>
                <div className="pitch-metric-label">Qualified titles in catalog</div>
              </div>
            </div>

            <div className="pitch-metrics" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className="pitch-metric">
                <div className="pitch-metric-value">$180K</div>
                <div className="pitch-metric-label">Exit MRR</div>
              </div>
              <div className="pitch-metric">
                <div className="pitch-metric-value">$2.16M</div>
                <div className="pitch-metric-label">Annualized run-rate, before IAP</div>
              </div>
            </div>

            <div className="pitch-note">DQE = Daily Qualified Engager, the unit Reddit pays platform revenue against.</div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">🧮 THE BASE MODEL</div>
            <div className="pitch-card-body">
              At a scenario average of 50K DQE across 36 qualified titles, the catalog reaches:
              <br /><br />
              • <strong>$180K</strong> exit MRR
              <br />
              • <strong>$2.16M</strong> annualized exit run-rate before IAP
              <br />
              • <strong>$144K</strong> in cumulative one-time payments, assuming $4K per qualified title
              <br />
              • <strong>$90K</strong> exit MRR if only half the titles qualify at that level
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">🔁 THE ANOMALY ADVANTAGE</div>
            <div className="pitch-card-body">
              Three games a month. Each launch adds revenue to the catalog <em>and</em> production intelligence to Farnsworth.
            </div>

            <div className="pitch-steps">
              <div className="pitch-step">
                <div className="pitch-step-title">CATALOG REVENUE</div>
                <div className="pitch-step-body">
                  Every qualified title adds a one-time payment plus recurring Reddit revenue, with IAP layered onto the strongest games.
                </div>
              </div>
              <div className="pitch-step">
                <div className="pitch-step-title">PRODUCTION INTELLIGENCE</div>
                <div className="pitch-step-body">
                  Every title leaves behind reusable code, tests, workflows, and player learnings, so the next one starts further ahead.
                </div>
              </div>
            </div>

            {/* Two of the titles already in the catalog. Both source clips are
                640x360; the crop shows the middle 60% (384x360). */}
            <div className="pitch-steps" style={{ marginTop: "4px" }}>
              {[
                { src: "assets/dailyrun.mov", label: "Don't Die — Daily Run" },
                { src: "assets/MBAClip.mov", label: "Multiverse Basketball Association" },
              ].map((clip) => (
                <div key={clip.src} style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid rgba(25, 230, 196, 0.2)",
                  background: "#02060a",
                }}>
                  <div className="pitch-video-crop" style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "384 / 360",
                    overflow: "hidden",
                  }}>
                    <video
                      src={clip.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: "-33.3333%",
                        width: "166.6667%",
                        height: "100%",
                        display: "block",
                      }}
                    />
                  </div>
                  <div className="pitch-media-label">{clip.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PitchFooterNav onBack={onBack} onNext={onNext} nextTitle={nextTitle} />

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}

// ─── Reddit Strategy Page ─────────────────────────────────
function RedditStrategyPage({ onBack, onOverview, onNext, nextTitle }) {
  return (
    <div className="pitch-details">
      <PitchHeader titleBig="REDDIT STRATEGY" titleSub="GAMEPLAY × PLATFORM" onBack={onBack} onOverview={onOverview} onNext={onNext} />

      <div className="pitch-content" style={{ gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" }}>
        <div style={{
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid rgba(25, 230, 196, 0.2)",
          height: "600px",
          background: "#02060a",
          position: "sticky",
          top: "20px",
        }}>
          <video
            src="reddit-strategy-demo.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        <div style={{ display: "grid", gap: "16px" }}>
        <div className="pitch-card">
          <div className="pitch-card-title">🎮 MATCH GAMEPLAY</div>
          <div className="pitch-card-body">
            A match plays out like a <strong>televised broadcast</strong>. You're the head coach: call plays between possessions, watch your pixel squad execute like TFT units.
            <br /><br />
            <strong>Possession-based tactics.</strong> Real-time 5v5 basketball with auto-playing units. You make strategic decisions: steal the ball, press defense, or let the opponent score to reset momentum.
            <br /><br />
            <strong>Pixel-art spectacle.</strong> Slow-mo replays, crowd reactions, scoreboard drama. Every basket feels earned.
          </div>
        </div>

        <div className="pitch-card">
          <div className="pitch-card-title">🌐 PLATFORM</div>
          <div className="pitch-card-body">
            <strong>Anomaly lives inside a Reddit post.</strong> Open a post, the game loads. No install, no app store, no friction.
            <br /><br />
            <strong>Reddit is the delivery mechanism:</strong>
            <br />
            • Identity (login with your Reddit account)
            <br />
            • Payments (Reddit Coins)
            <br />
            • Distribution (front page, subreddit leagues, cross-posts)
            <br />
            • Social (upvotes, comments, shares)
          </div>
        </div>

        <div className="pitch-card">
          <div className="pitch-card-title">⚡ THE INTEGRATION</div>
          <div className="pitch-card-body">
            <strong>Posts ARE matches.</strong> Create a post to start a ranked match. Play in real-time. Other Redditors watch live in the comments.
            <br /><br />
            <strong>Comments ARE comms.</strong> Teammates coordinate in real-time. Opponents trash-talk. Crowd votes on bold plays.
            <br /><br />
            <strong>Upvotes ARE discovery.</strong> Epic matches bubble up to the front page. New players find the game organically.
          </div>
        </div>

        <div className="pitch-card">
          <div className="pitch-card-title">🏆 REDDIT LEAGUES</div>
          <div className="pitch-card-body">
            <strong>Build community tournaments inside subreddits.</strong> Create seasonal leagues where players compete for rank and reddit-wide leaderboards.
            <br /><br />
            <strong>Subreddit-native leagues:</strong>
            <br />
            • r/AnomalyLeague (flagship competitive)
            <br />
            • r/CasualBall (pickup games)
            <br />
            • r/NBA2026 (themed tournament)
            <br /><br />
            Reddit's infrastructure becomes the league infrastructure.
          </div>
        </div>

        <div className="pitch-card">
          <div className="pitch-card-title">📊 VIRALITY</div>
          <div className="pitch-card-body">
            <strong>Games go viral on Reddit.</strong> A player hits a clutch shot, the clip gets upvoted 50k times, front page, new players download the game.
            <br /><br />
            <strong>Built-in amplification:</strong> Every match is shareable. Every win is a moment to post. Every loss is a meme template.
            <br /><br />
            <strong>Reddit's own games feed the platform.</strong> We're not competing for space; we're native to the feed.
          </div>
        </div>

        <div className="pitch-card">
          <div className="pitch-card-title">💰 MONETIZATION</div>
          <div className="pitch-card-body">
            
            Reddit monetization is still early, which creates the opportunity. Anomaly will begin with proven, 
            low-friction revenue loops: non-pay-to-win cosmetics, premium currency, seasonal passes, grants, and sponsored collaborations.
          </div>
        </div>
        </div>
      </div>

      <PitchFooterNav onBack={onBack} onNext={onNext} nextTitle={nextTitle} />

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}

// ─── Roadmap Page ───────────────────────────────────────
function RoadmapPage({ onBack, onOverview, onNext, nextTitle }) {
  return (
    <div className="pitch-details">
      <PitchHeader titleBig="ROADMAP" titleSub="18-MONTH EXECUTION" onBack={onBack} onOverview={onOverview} onNext={onNext} />

      <div className="pitch-content" style={{ gridTemplateColumns: "1fr", gap: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          <div className="pitch-card">
            <div className="pitch-card-title">📅 Q3 2026 — Build the Rails</div>
            <div className="pitch-card-body">
              <strong style={{ color: "var(--c-ink)" }}>Ship the tooling, analytics, and ingestion layer that turns Reddit into a measurable platform.</strong>
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>Track every popular game, every weekly metric, every breakout signal. Already live: 48 games tracked, 1.4M weekly users measured, daily growth analytics.</span>
              <br /><br />
              <strong style={{ color: "var(--c-ink)" }}>Launch closed beta testing of Multiverse Basketball Association and Don't Die.</strong>
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">🎮 Q4 2026 — Launch First Titles</div>
            <div className="pitch-card-body">
              <strong style={{ color: "var(--c-ink)" }}>Full launch of Multiverse Basketball Association and Don't Die through Devvit.</strong>
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>Use the data layer to A/B test mechanics, monetization, and viral hooks in real time. Goals: hit <span style={{ fontSize: "18px", fontWeight: "900", color: "var(--c-left)" }}>50K WAU</span> per title and <span style={{ fontSize: "18px", fontWeight: "900", color: "var(--c-left)" }}>$10K</span> monthly revenue per title.</span>
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">🚀 Q1 2027 — Compound the Hits</div>
            <div className="pitch-card-body">
              <strong style={{ color: "var(--c-ink)" }}>Ship <span style={{ fontSize: "18px", fontWeight: "900", color: "var(--c-left)" }}>10 games</span> in parallel.</strong>
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>AI-accelerated production means a Q1 launch slate, not a Q1 launch. Iterate from real data, leverage the tools to rapidly test and ship at scale.</span>
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">🔓 Q2 2027 — Open the Platform</div>
            <div className="pitch-card-body">
              <strong style={{ color: "var(--c-ink)" }}>License the tooling, run growth services, and start publishing third-party titles under the Anomaly banner.</strong>
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>The catalog and the data layer become the moat.</span>
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">👑 Q3 2027 → Q2 2028 — Publisher of Record</div>
            <div className="pitch-card-body">
              <strong style={{ color: "var(--c-ink)" }}>By the time competitors realize Reddit is a games category, we own the analytics, the catalog, and the developer relationships.</strong>
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>Anomaly is the publisher for native Reddit games.</span>
            </div>
          </div>
        </div>
      </div>

      <PitchFooterNav onBack={onBack} onNext={onNext} nextTitle={nextTitle} />

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}

// ─── Team Page ─────────────────────────────────────────────
function TeamPage({ onBack, onOverview, onNext, nextTitle }) {
  return (
    <div className="pitch-details">
      <PitchHeader titleBig="THE TEAM" titleSub="TRACK RECORD" onBack={onBack} onOverview={onOverview} onNext={onNext} />

      <div className="pitch-content" style={{ gridTemplateColumns: "400px 1fr", gap: "24px", alignItems: "start" }}>
        {/* Left column: Photo */}
        <div>
          <div className="pitch-media">
            <img src="long-do-photo.jpg" alt="Long Do" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
          <div className="pitch-caption">Long Do — founder, Anomaly.</div>
        </div>

        {/* Right column: Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          <div className="pitch-card">
            <div className="pitch-card-title">📦 WHAT THE TEAM HAS SHIPPED</div>
            <div className="pitch-card-body">
              <strong>Over 12 titles in the last two years, averaging $50–100K in revenue per title shipped.</strong>
              {" "}Anomaly is a team of experts in emerging casual, bite-sized games — the exact shape of game that qualifies on Reddit.
            </div>

            <div className="pitch-metrics" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className="pitch-metric">
                <div className="pitch-metric-value">12+</div>
                <div className="pitch-metric-label">Titles shipped, 2 years</div>
              </div>
              <div className="pitch-metric">
                <div className="pitch-metric-value">$50–100K</div>
                <div className="pitch-metric-label">Average revenue per title</div>
              </div>
              <div className="pitch-metric">
                <div className="pitch-metric-value">500K</div>
                <div className="pitch-metric-label">Peak weekly users, Sword &amp; Supper</div>
              </div>
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">👤 LONG DO — FOUNDER</div>
            <div className="pitch-card-body">
              <strong>Repeat founder with multiple successful exits</strong> and investment from leading names including a16z and Kevin O'Leary.
              A decade of shipping as an indie developer: 10+ titles built without teams, without publishers, against 30% app store cuts.
              Dual degrees in Computer Science and Information Technology.
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">🗡️ MARGARET — LEAD GAME DESIGNER</div>
            <div className="pitch-card-body">
              <strong>Margaret concepted the first monetizable game built with Reddit directly: Sword &amp; Supper.</strong>
              {" "}500K peak weekly users, 82K weekly users as of July 2026, and proven IAP — the upper-tail case for what a qualified
              title on this platform can become.
            </div>
          </div>
        </div>
      </div>

      <PitchFooterNav onBack={onBack} onNext={onNext} nextTitle={nextTitle} />

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}
// ─── Living Worlds Page ────────────────────────────────────
function SubsectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
      <div style={{ height: "1px", flex: "0 0 40px", background: "var(--c-left)" }}></div>
      <span className="pitch-sublabel">{children}</span>
      <div style={{ height: "1px", flex: "1", background: "rgba(25, 230, 196, 0.2)" }}></div>
    </div>
  );
}

function LivingWorldsPage({ onBack, onOverview, onNext, nextTitle }) {
  return (
    <div className="pitch-details">
      <PitchHeader titleBig="AGENTIC LIVEOPS" titleSub="REUSABLE SYSTEMS, NOT ONE-OFF FEATURES" onBack={onBack} onOverview={onOverview} onNext={onNext} />

      <div className="pitch-content" style={{ gridTemplateColumns: "1fr", gap: "24px" }}>
        {/* Opening: agentic systems as gaming ops */}
        <div className="pitch-card">
          <div className="pitch-card-title">🤖 A SCALABLE GAMING OPS SYSTEM</div>
          <div className="pitch-card-body">
            <strong>Agentic systems built into Farnsworth, plus analytics add-ons, create a scalable gaming ops system</strong> —
            generating daily challenges and creating replayable content loops.
            <br /><br />
            These are Farnsworth systems, not per-game features: built once, hardened once, then reused across the catalog. A game world
            that never feels empty is a launch requirement, not a nice-to-have.
          </div>
        </div>

        <SubsectionLabel>IN PRACTICE</SubsectionLabel>

        {/* The three systems running inside shipped titles. */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", alignItems: "start" }}>
          <div className="pitch-media-cell">
            <div className="pitch-media-stage">
              <video
                src="living-economy-demo.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
                style={{ height: "100%", width: "auto", display: "block" }}
              />
            </div>
            <div className="pitch-media-label">Living economy — agent-run auctions</div>
          </div>

          <div className="pitch-media-cell">
            {/* Tall capture — anchored to the top so the headline metrics and the
                activity chart stay legible at column width. */}
            <div className="pitch-media-stage" style={{ width: "100%" }}>
              <img
                src="liveops-live.png"
                alt="Farnsworth Live — weekly users, contributions, activity over time, and community insights for The Last Draft"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
              />
            </div>
            <div className="pitch-media-label">Farnsworth Live — analytics &amp; community insights</div>
          </div>

          <div className="pitch-media-cell">
            <div className="pitch-media-stage">
              <video
                src="assets/scoopcity.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                style={{ height: "100%", width: "auto", display: "block" }}
              />
            </div>
            <div className="pitch-media-label">Scoop City — real-world data feeds</div>
          </div>
        </div>

      </div>

      <PitchFooterNav onBack={onBack} onNext={onNext} nextTitle={nextTitle} />

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}
function MarketOpportunityPage({ onBack, onOverview, onNext, nextTitle }) {
  return (
    <div className="pitch-details">
      <PitchHeader titleBig="MARKET OPPORTUNITY" titleSub="REDDIT'S GAMING ECOSYSTEM" onBack={onBack} onOverview={onOverview} onNext={onNext} />

      <div className="pitch-content" style={{ gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" }}>
        {/* Left column: Image */}
        <div>
          <div style={{
            background: "rgba(0,0,0,0.3)",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(25, 230, 196, 0.2)",
            maxHeight: "700px",
          }}>
            <img src="ExampleWeekly.png" alt="Element Synergy Puzzle" style={{
              width: "100%",
              height: "auto",
              display: "block",
            }} />
          </div>
          <div style={{
            marginTop: "12px",
            fontSize: "13px",
            color: "rgba(234, 246, 243, 0.7)",
            lineHeight: "1.5",
            fontStyle: "italic",
          }}>
            Element Synergy Puzzle by u/Runaider — 107k weekly visitors. Solo developer, Reddit-native game.
          </div>
        </div>

        {/* Right column: Content cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          <div className="pitch-card">
            <div className="pitch-card-title">🎯 THE PROOF POINT</div>
            <div className="pitch-card-body">
              <strong style={{ color: "var(--c-ink)" }}>We're tracking 48 active games on Reddit. Just the popular tier alone:</strong>
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>
                <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>1,397,209</span> weekly active users across tracked titles
                <br />
                <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>531,931</span> weekly contributions (votes, posts, plays — not passive scrolling)
                <br />
                <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>38.1%</span> platform-wide engagement rate (contributions ÷ WAU). On mobile F2P, 5–10% is industry standard. This is 4–8x higher.
              </span>
              <br /><br />
              <strong style={{ color: "var(--c-ink)" }}>Individual breakouts:</strong>
              <br />
              <span style={{ color: "var(--c-ink)" }}>
                • <strong>Bunny Trials:</strong> <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>414K</span> WAU in 8 months. Single-developer game.
                <br />
                • <strong>Element Synergy Puzzle:</strong> <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>129K</span> WAU — solo dev again
                <br />
                • <strong>Pixelary:</strong> <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>67K</span> WAU and <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>64K</span> weekly contributions — near 1:1 player-to-action ratio, a metric most F2P titles would kill for
              </span>
              <br /><br />
              <strong style={{ color: "var(--c-ink)" }}>The breakout case — Bunny Trials:</strong> <span style={{ color: "var(--c-ink)" }}>Launched September 2025. Eight months later, 414k weekly active users — a number a small indie studio would normally need a multi-million dollar UA budget to reach. Distribution cost: $0.</span>
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">📈 MARKET SIZE</div>
            <div className="pitch-card-body">
              <strong>Total Addressable Market:</strong> $12B+ digital collectibles
              <br /><br />
              <strong>Serviceable Market:</strong> Reddit's 420M monthly active users, gaming audience estimated at 50M+
              <br /><br />
              <strong>Serviceable Obtainable Market:</strong> 2.5M active monthly players in similar titles on Reddit alone
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">💡 WHY NOW?</div>
            <div className="pitch-card-body">
              <strong style={{ color: "var(--c-ink)" }}>The ecosystem is bootstrapping in real time:</strong>
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>
                • <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>50%</span> of the 48 tracked games launched in 2026 alone (24 of 48, in just five months)
                <br />
                • <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>73%</span> launched in the last 9 months (35 of 48 since September 2025)
                <br />
                • Newest tracked game: launched 2026-05-16 — ten days ago
                <br />
                • The oldest tracked breakout (Pixelary) is only 18 months old, already at 67K WAU with 95.5% engagement
              </span>
              <br /><br />
              <strong style={{ color: "var(--c-ink)" }}>We are at the very start of a platform shift.</strong> <span style={{ color: "var(--c-ink)" }}>Roblox at 18 months: ~100K MAU. Devvit games at 18 months: <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>1.4M</span> weekly active users across just 48 titles tracked. <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>~14x</span> ahead of where Roblox was at the same stage of its lifecycle.</span>
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">🚀 OUR OPPORTUNITY</div>
            <div className="pitch-card-body">
              <strong style={{ color: "var(--c-ink)" }}>Build the publishing house Reddit doesn't have yet — and use the tools to power it before anyone else can.</strong>
              <br /><br />
              <strong style={{ color: "var(--c-ink)" }}>Year 1 — Build the infrastructure</strong>
              <br />
              <span style={{ color: "var(--c-ink)" }}>In our first year we've proven out several builds, experimented with changing code bases. Developed the tooling, tracking, and testing layer that no studio on Reddit currently owns: real-time WAU/contribution dashboards, growth analytics, A/B testing, screenshot pipelines, ingestion automation.</span>
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>While other devs ship one game at a time, we'll ship a system — one that surfaces what's working before the market notices.</span>
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>Internal proof point: we already track <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>48 games</span>, <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>1.4M</span> weekly users, daily measurement, growth analytics, and screenshot pipelines — the platform exists.</span>
              <br /><br />
              <strong style={{ color: "var(--c-ink)" }}>Year 2 — Ship the breakouts</strong>
              <br />
              <span style={{ color: "var(--c-ink)" }}>Use the data and tools to deliberately engineer hits. The platform has shown that solo developers can reach 100K+ weekly users in months. A team with infrastructure, capital, and the data layer has no excuse not to ship two or three of them.</span>
              <br /><br />
              <strong style={{ color: "var(--c-ink)" }}>Year 3 — Become the biggest publisher on Reddit</strong>
              <br />
              <span style={{ color: "var(--c-ink)" }}>By the time the rest of the industry realizes Reddit is a games platform, we own the catalog, the tools, the analytics, and the relationships with the developers building on it. Anomaly Studio becomes the publisher of record for native Reddit games — distribution, monetization, growth, and discoverability under one roof.</span>
            </div>
          </div>
        </div>
      </div>

      <PitchFooterNav onBack={onBack} onNext={onNext} nextTitle={nextTitle} />

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}
// ─── Catalog Economics Page ────────────────────────────────
const SCENARIOS = [
  { name: "50% qualify at 50K DQE", titles: "18", mrr: "$90K", arr: "$1.08M" },
  { name: "Base scenario", titles: "36", mrr: "$180K", arr: "$2.16M", base: true },
  { name: "Upper DQE scenarios", titles: "36", mrr: "Up to ~$445K", arr: "Up to ~$5.34M" },
];

function ScenarioTable() {
  return (
    <div className="pitch-table">
      <div className="pitch-table-row pitch-table-head">
        <div>Scenario</div>
        <div>Qualified titles</div>
        <div>Exit MRR</div>
        <div>Annualized exit run-rate</div>
      </div>
      {SCENARIOS.map((s) => (
        <div key={s.name} className={`pitch-table-row${s.base ? " is-base" : ""}`}>
          <div><span className="pitch-cell-label">Scenario</span>{s.name}</div>
          <div><span className="pitch-cell-label">Qualified titles</span>{s.titles}</div>
          <div><span className="pitch-cell-label">Exit MRR</span>{s.mrr}</div>
          <div><span className="pitch-cell-label">Annualized</span>{s.arr}</div>
        </div>
      ))}
    </div>
  );
}

function EconomicsPage({ onBack, onOverview, onNext, nextTitle }) {
  return (
    <div className="pitch-details">
      <PitchHeader titleBig="CATALOG ECONOMICS" titleSub="MULTIPLE WAYS TO WIN" onBack={onBack} onOverview={onOverview} onNext={onNext} />

      <div className="pitch-content" style={{ gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" }}>
        {/* Left column: media */}
        <div style={{ display: "grid", gap: "24px" }}>
          <div>
            <div className="pitch-media">
              <img src="Shop.png" alt="In-Game Shop" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div className="pitch-caption">
              IAP is layered onto the strongest titles — cosmetics, premium currency, and pass progression on top of platform revenue.
            </div>
          </div>

          <div>
            <div className="pitch-media">
              <img src="SwordAndSupper.png" alt="Sword & Supper" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div className="pitch-caption">
              Sword &amp; Supper — concepted by Margaret on our team, the first monetizable game built with Reddit directly.
            </div>
          </div>
        </div>

        {/* Right column: content cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          <div className="pitch-card">
            <div className="pitch-card-title">📊 A CATALOG WITH MULTIPLE WAYS TO WIN</div>
            <ScenarioTable />
            <div className="pitch-note">
              All scenarios before IAP. The base model assumes 50K average DQE across 36 qualified titles.
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">➕ ADDITIONAL UPSIDE</div>
            <div className="pitch-card-body">
              • Up to <strong>$7.5K</strong> in one-time program payments per game
              <br />
              • <strong>$4K</strong> per qualified title used in the base model
              <br />
              • <strong>$144K</strong> in cumulative one-time payments across 36 qualified titles
              <br />
              • IAP layered onto the strongest titles
              <br />
              • One or two breakout games can materially outperform the base catalog economics
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">♻️ RESHIPPABLE TITLES</div>
            <div className="pitch-card-body">
              <strong>Not every launch starts from zero.</strong> Anomaly already owns a back catalog of shipped titles — art, animation,
              audio, game systems, and validated designs that can be re-cut as Reddit-native games instead of rebuilt.
              <br /><br />
              A reship reuses proven assets and a loop players have already responded to, so it reaches the same qualification bar for a
              fraction of a ground-up build — and it enters the catalog on the same terms: one-time payment, recurring Reddit revenue,
              IAP where the title earns it.
            </div>

            <div className="pitch-steps">
              <div className="pitch-step">
                <div className="pitch-step-title">OWNED ASSETS</div>
                <div className="pitch-step-body">
                  Existing art, audio, and game systems carry over, so production spend goes to the Reddit layer, not to making a game from scratch.
                </div>
              </div>
              <div className="pitch-step">
                <div className="pitch-step-title">PROVEN LOOPS</div>
                <div className="pitch-step-body">
                  Reshipped titles arrive with real player data behind them — less design risk per slot in the launch calendar.
                </div>
              </div>
            </div>

            <div className="pitch-note">
              Reships and new builds fill the same three-a-month cadence; the mix is chosen on cost per qualified title.
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">🗡️ THE UPPER TAIL — SWORD &amp; SUPPER</div>
            <div className="pitch-card-body">
              <strong>Margaret, Anomaly's leading game designer, concepted the first monetizable game with Reddit directly.</strong>
              {" "}Sword &amp; Supper is the proof of the upper tail: a single qualified title can outrun the whole base scenario.
            </div>

            <div className="pitch-metrics" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className="pitch-metric">
                <div className="pitch-metric-value">500K</div>
                <div className="pitch-metric-label">Peak weekly users</div>
              </div>
              <div className="pitch-metric">
                <div className="pitch-metric-value">82K</div>
                <div className="pitch-metric-label">Weekly users, July 2026</div>
              </div>
              <div className="pitch-metric">
                <div className="pitch-metric-value">IAP</div>
                <div className="pitch-metric-label">Proven on platform</div>
              </div>
            </div>

            <div className="pitch-card-body">
              <a
                href="https://www.reddit.com/r/SwordAndSupperGame/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--c-left)", fontWeight: 600, textDecoration: "underline" }}
              >
                Play Sword &amp; Supper here →
              </a>
            </div>
          </div>
        </div>
      </div>

      <PitchFooterNav onBack={onBack} onNext={onNext} nextTitle={nextTitle} />

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}
function FarnsworthPage({ onBack, onOverview, onNext, nextTitle }) {
  return (
    <div className="pitch-details">
      <PitchHeader titleBig="FARNSWORTH" titleSub="THE PRODUCTION ENGINE BEHIND THE CATALOG" onBack={onBack} onOverview={onOverview} onNext={onNext} />

      <div className="pitch-content" style={{ gridTemplateColumns: "1fr", gap: "20px", alignItems: "start" }}>
        {/* Top row: the demo needs the width — it's a screen recording of the
            tooling, so it gets the larger column and its natural aspect ratio. */}
        <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: "20px", alignItems: "start" }}>
          <div style={{
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(25, 230, 196, 0.2)",
            background: "#02060a",
          }}>
            <video
              src="farnsworth.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
            <div className="pitch-media-label">Farnsworth — production system</div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">❓ WHY BELIEVE THE CADENCE</div>
            <div className="pitch-question">
              "Why should I believe this team can repeatedly ship three qualified games a month without costs rising at the same rate?"
            </div>
            <div className="pitch-card-body">
              <strong>Farnsworth is the proprietary production system behind that cadence.</strong> It standardizes the full Reddit game
              workflow — from reusable game systems and agent-assisted development to Devvit emulation, live preview, QA, launch, and
              production feedback. Each game leaves behind reusable code, tests, workflows, and player learnings, so the next title starts
              further ahead.
            </div>
            <div className="pitch-quote">
              "Farnsworth makes this volume possible without scaling headcount linearly."
            </div>
          </div>
        </div>

        {/* Full-width: the four stages */}
        <div className="pitch-card">
          <div className="pitch-card-title">⚙️ GAME CREATION AS A REPEATABLE SYSTEM</div>
          <div className="pitch-card-body">
            Most studios treat every game as a new production process. Anomaly uses Farnsworth to turn game creation into a repeatable one.
          </div>

          <div className="pitch-steps" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            <div className="pitch-step">
              <div className="pitch-step-title">BUILD</div>
              <div className="pitch-step-body">
                Reusable game primitives, persistent project knowledge, and AI-assisted implementation shorten the path from concept to playable build.
              </div>
            </div>
            <div className="pitch-step">
              <div className="pitch-step-title">VALIDATE</div>
              <div className="pitch-step-body">
                A Reddit-native emulator, multi-user simulation, live previews, and integrated QA let games be tested before launch.
              </div>
            </div>
            <div className="pitch-step">
              <div className="pitch-step-title">OPERATE</div>
              <div className="pitch-step-body">
                Production signals return to the same environment where the game was built, so the team can spot issues, create tasks, and iterate.
              </div>
            </div>
            <div className="pitch-step">
              <div className="pitch-step-title">COMPOUND</div>
              <div className="pitch-step-body">
                Every title adds reusable code, tests, workflows, and player learnings that improve the next title.
              </div>
            </div>
          </div>

          <div className="pitch-note">
            The result: Anomaly can grow launch volume without assembling a separate production team and toolchain for every game.
          </div>
        </div>

        {/* Bottom row: the two directional notes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "start" }}>
          <div className="pitch-card">
            <div className="pitch-card-title">🤝 OUTSIDE CREATIVE CAPACITY</div>
            <div className="pitch-card-body">
              <strong>Anomaly does not need to employ every team that produces the next hit.</strong> Farnsworth turns outside creative
              capacity into a standardized, testable, monetizable catalog.
              <br /><br />
              We begin with 36 internal attempts a year. Farnsworth gives us a path to hundreds of partner-powered attempts without
              hundreds of internal employees.
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">🧭 WHAT WE BUILD, AND WHAT WE DON'T</div>
            <div className="pitch-card-body">
              Anomaly only builds Farnsworth capabilities that increase launch velocity, improve qualification rates, reduce production
              costs, or improve portfolio revenue. Nothing else gets built.
            </div>
          </div>
        </div>
      </div>

      <PitchFooterNav onBack={onBack} onNext={onNext} nextTitle={nextTitle} />

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}

// ─── Pitch Details Screen ───────────────────────────────────
function PitchDetails({ onAuction, onVision, onCoreLoop, onMonetization, onMarketOpportunity, onLivingEconomy, onRedditStrategy, onRoadmap, onFounder }) {
  return (
    <div className="pitch-details">
      <div className="pitch-header">
        <div className="pitch-title">
          <span className="pitch-title-big">ANOMALY STUDIO</span>
          <span className="pitch-title-sub">THREE GAMES A MONTH · THE ANOMALY ADVANTAGE</span>
        </div>
      </div>

      <div className="pitch-content">
        {/* Card 1: The Catalog — CLICKABLE */}
        <div className="pitch-card" onClick={onVision} style={{ cursor: "pointer" }}>
          <div className="pitch-card-title">⚡ VISION</div>
          <div className="pitch-card-body">
            <strong>Anomaly is building a revenue-bearing catalog, not betting on one hit.</strong> We launch three games per month.
            Each qualified title receives a one-time payment and contributes recurring Reddit revenue, while the strongest games layer
            in-app purchases on top.
            <br /><br />
            At 50K average DQE per title, a 36-game catalog reaches <strong>$180K MRR</strong> and a <strong>$2.16M</strong> annualized
            platform-revenue run-rate before IAP.
          </div>
          <div className="pitch-cta">CLICK TO EXPLORE →</div>
        </div>

        {/* Card 2: Farnsworth — CLICKABLE */}
        <div className="pitch-card" onClick={onCoreLoop} style={{ cursor: "pointer" }}>
          <div className="pitch-card-title">🏭 FARNSWORTH</div>
          <div className="pitch-card-body">
            <strong>The proprietary production system behind the cadence.</strong> It standardizes the full Reddit game workflow — reusable
            game systems, agent-assisted development, Devvit emulation, live preview, QA, launch, and production feedback.
            <br /><br />
            Each game leaves behind reusable code, tests, workflows, and player learnings, so the next title starts further ahead.
            Farnsworth makes this volume possible without scaling headcount linearly.
          </div>
          <div className="pitch-cta">CLICK TO EXPLORE →</div>
        </div>

        {/* Card 3: Catalog Economics — CLICKABLE */}
        <div className="pitch-card" onClick={onMonetization} style={{ cursor: "pointer" }}>
          <div className="pitch-card-title">💰 CATALOG ECONOMICS</div>
          <div className="pitch-card-body">
            <strong>Multiple ways to win.</strong> $90K exit MRR if only half the titles qualify. $180K in the base scenario.
            Up to ~$445K in upper DQE scenarios.
            <br /><br />
            On top of that: up to $7.5K in one-time program payments per game, IAP on the strongest titles, and breakout upside that can
            outperform the whole base model.
          </div>
          <div className="pitch-cta">CLICK TO EXPLORE →</div>
        </div>

        {/* Card 4: Living Worlds — CLICKABLE */}
        <div className="pitch-card" onClick={onLivingEconomy} style={{ cursor: "pointer" }}>
          <div className="pitch-card-title">🌐 AGENTIC LIVEOPS</div>
          <div className="pitch-card-body">
            AI agents keep worlds active from day one — generating daily challenges, creating in-game economies.
            <br /><br />
            Built once inside Farnsworth, then reused across the catalog.
          </div>
          <div className="pitch-cta">CLICK TO EXPLORE →</div>
        </div>

        {/* The Team card and the "Three games a month" thesis card are hidden
            from the overview. TeamPage is still reachable via Living Worlds → Next. */}
      </div>

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>INTERACTIVE PITCH EXPERIENCE</span>
      </div>
    </div>
  );
}

// ─── Corner bracket SVG ────────────────────────────────────
const CornerBracket = () => (
  <svg viewBox="0 0 64 64">
    <path d="M2 22 L2 2 L22 2" fill="none" stroke="rgba(234,246,243,0.5)" strokeWidth="2"/>
    <path d="M8 16 L8 8 L16 8" fill="none" stroke="rgba(234,246,243,0.3)" strokeWidth="1"/>
  </svg>
);

// ─── Scaled stage wrapper ───────────────────────────────────
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
    return <div className="mobile-shell">{children}</div>;
  }
  return (
    <div ref={wrapRef} style={{
      width: 1920, height: 1080,
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: `translate(-50%, -50%) scale(${scale})`,
      transformOrigin: "center center",
      flex: "none",
    }}>
      {children}
    </div>
  );
}

// ─── Prototype controls ─────────────────────────────────────
function PrototypeControls({ state, goto }) {
  const [open, setOpen] = useState(false);
  const STATES = [
    ["pitch-hero", "Hero"],
    ["pitch-details", "Details"],
    ["pitch-vision", "Vision"],
    ["pitch-coreloop", "Farnsworth"],
    ["auction", "Live Auction"],
    ["post", "Shareable Post"],
  ];
  return (
    <>
      <button className={`controls-fab ${open ? "open" : ""}`}
              onClick={() => setOpen(o => !o)}
              aria-label={open ? "Hide controls" : "Show controls"}>
        {open ? "✕" : "≡"}
      </button>
      {open && (
        <div className="controls">
          <span className="label">PITCH</span>
          {STATES.map(([id, label]) => (
            <button key={id}
                    className={state === id ? "active" : ""}
                    onClick={() => { goto(id); setOpen(false); }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Main pitch app ────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cyanMagenta"
}/*EDITMODE-END*/;

function PitchApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [state, setState] = useState("pitch-hero");
  const [auctionPilotId, setAuctionPilotId] = useState("p01");

  // Apply palette
  useEffect(() => {
    applyPalette(PALETTES[t.palette] || PALETTES.cyanMagenta);
  }, [t.palette]);

  return (
    <div className="stage-wrap">
      <ScaledStage>
        <div className="stage" data-state={state}>
          {/* Only show backplate/starfield/planet on non-hero screens */}
          {state !== "pitch-hero" && (
            <>
              <div className="backplate"></div>
              <div className="starfield"></div>
              <div className="planet"></div>

              {/* Corner brackets */}
              <div className="corner-bracket cb-tl"><CornerBracket /></div>
              <div className="corner-bracket cb-tr"><CornerBracket /></div>
              <div className="corner-bracket cb-bl"><CornerBracket /></div>
              <div className="corner-bracket cb-br"><CornerBracket /></div>

              {/* Side slashes */}
              <div className="side-slashes left">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>
              <div className="side-slashes right">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>
            </>
          )}

          {/* Hero screen */}
          {state === "pitch-hero" && (
            <PitchHero onStart={() => setState("pitch-details")} />
          )}

          {/* Details screen */}
          {state === "pitch-details" && (
            <>
              <div className="backplate"></div>
              <div className="starfield"></div>
              <div className="planet"></div>

              {/* Corner brackets */}
              <div className="corner-bracket cb-tl"><CornerBracket /></div>
              <div className="corner-bracket cb-tr"><CornerBracket /></div>
              <div className="corner-bracket cb-bl"><CornerBracket /></div>
              <div className="corner-bracket cb-br"><CornerBracket /></div>

              {/* Side slashes */}
              <div className="side-slashes left">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>
              <div className="side-slashes right">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>

              <PitchDetails
                onAuction={() => setState("auction")}
                onVision={() => setState("pitch-vision")}
                onCoreLoop={() => setState("pitch-coreloop")}
                onMonetization={() => setState("pitch-monetization")}
                onMarketOpportunity={() => setState("pitch-market")}
                onLivingEconomy={() => setState("pitch-living-economy")}
                onRedditStrategy={() => setState("pitch-reddit-strategy")}
                onRoadmap={() => setState("pitch-roadmap")}
                onFounder={() => setState("pitch-founder")}
              />
            </>
          )}

          {/* Vision page */}
          {state === "pitch-vision" && (
            <>
              <div className="backplate"></div>
              <div className="starfield"></div>
              <div className="planet"></div>

              {/* Corner brackets */}
              <div className="corner-bracket cb-tl"><CornerBracket /></div>
              <div className="corner-bracket cb-tr"><CornerBracket /></div>
              <div className="corner-bracket cb-bl"><CornerBracket /></div>
              <div className="corner-bracket cb-br"><CornerBracket /></div>

              {/* Side slashes */}
              <div className="side-slashes left">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>
              <div className="side-slashes right">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>

              <CatalogPage onBack={() => setState("pitch-details")} onOverview={() => setState("pitch-details")} onNext={() => setState("pitch-coreloop")} nextTitle="FARNSWORTH" />
            </>
          )}

          {/* Core Loop page */}
          {state === "pitch-coreloop" && (
            <>
              <div className="backplate"></div>
              <div className="starfield"></div>
              <div className="planet"></div>

              {/* Corner brackets */}
              <div className="corner-bracket cb-tl"><CornerBracket /></div>
              <div className="corner-bracket cb-tr"><CornerBracket /></div>
              <div className="corner-bracket cb-bl"><CornerBracket /></div>
              <div className="corner-bracket cb-br"><CornerBracket /></div>

              {/* Side slashes */}
              <div className="side-slashes left">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>
              <div className="side-slashes right">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>

              <FarnsworthPage onBack={() => setState("pitch-vision")} onOverview={() => setState("pitch-details")} onNext={() => setState("pitch-monetization")} nextTitle="CATALOG ECONOMICS" />
            </>
          )}

          {/* Reddit Strategy page */}
          {state === "pitch-reddit-strategy" && (
            <>
              <div className="backplate"></div>
              <div className="starfield"></div>
              <div className="planet"></div>

              {/* Corner brackets */}
              <div className="corner-bracket cb-tl"><CornerBracket /></div>
              <div className="corner-bracket cb-tr"><CornerBracket /></div>
              <div className="corner-bracket cb-bl"><CornerBracket /></div>
              <div className="corner-bracket cb-br"><CornerBracket /></div>

              {/* Side slashes */}
              <div className="side-slashes left">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>
              <div className="side-slashes right">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>

              <RedditStrategyPage onBack={() => setState("pitch-details")} />
            </>
          )}

          {/* Roadmap page */}
          {state === "pitch-roadmap" && (
            <>
              <div className="backplate"></div>
              <div className="starfield"></div>
              <div className="planet"></div>

              {/* Corner brackets */}
              <div className="corner-bracket cb-tl"><CornerBracket /></div>
              <div className="corner-bracket cb-tr"><CornerBracket /></div>
              <div className="corner-bracket cb-bl"><CornerBracket /></div>
              <div className="corner-bracket cb-br"><CornerBracket /></div>

              {/* Side slashes */}
              <div className="side-slashes left">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>
              <div className="side-slashes right">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>

              <RoadmapPage onBack={() => setState("pitch-founder")} onOverview={() => setState("pitch-details")} />
            </>
          )}

          {/* Founder page */}
          {state === "pitch-founder" && (
            <>
              <div className="backplate"></div>
              <div className="starfield"></div>
              <div className="planet"></div>

              {/* Corner brackets */}
              <div className="corner-bracket cb-tl"><CornerBracket /></div>
              <div className="corner-bracket cb-tr"><CornerBracket /></div>
              <div className="corner-bracket cb-bl"><CornerBracket /></div>
              <div className="corner-bracket cb-br"><CornerBracket /></div>

              {/* Side slashes */}
              <div className="side-slashes left">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>
              <div className="side-slashes right">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>

              <TeamPage onBack={() => setState("pitch-living-economy")} onOverview={() => setState("pitch-details")} />
            </>
          )}

          {/* Living Economy page */}
          {state === "pitch-living-economy" && (
            <>
              <div className="backplate"></div>
              <div className="starfield"></div>
              <div className="planet"></div>

              {/* Corner brackets */}
              <div className="corner-bracket cb-tl"><CornerBracket /></div>
              <div className="corner-bracket cb-tr"><CornerBracket /></div>
              <div className="corner-bracket cb-bl"><CornerBracket /></div>
              <div className="corner-bracket cb-br"><CornerBracket /></div>

              {/* Side slashes */}
              <div className="side-slashes left">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>
              <div className="side-slashes right">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>

              {/* Last section — The Team is hidden, so there is no NEXT from here. */}
              <LivingWorldsPage onBack={() => setState("pitch-monetization")} onOverview={() => setState("pitch-details")} />
            </>
          )}

          {/* Market Opportunity page */}
          {state === "pitch-market" && (
            <>
              <div className="backplate"></div>
              <div className="starfield"></div>
              <div className="planet"></div>

              {/* Corner brackets */}
              <div className="corner-bracket cb-tl"><CornerBracket /></div>
              <div className="corner-bracket cb-tr"><CornerBracket /></div>
              <div className="corner-bracket cb-bl"><CornerBracket /></div>
              <div className="corner-bracket cb-br"><CornerBracket /></div>

              {/* Side slashes */}
              <div className="side-slashes left">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>
              <div className="side-slashes right">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>

              <MarketOpportunityPage onBack={() => setState("pitch-monetization")} onOverview={() => setState("pitch-details")} onNext={() => setState("pitch-living-economy")} nextTitle="LIVING WORLDS" />
            </>
          )}

          {/* Monetization page */}
          {state === "pitch-monetization" && (
            <>
              <div className="backplate"></div>
              <div className="starfield"></div>
              <div className="planet"></div>

              {/* Corner brackets */}
              <div className="corner-bracket cb-tl"><CornerBracket /></div>
              <div className="corner-bracket cb-tr"><CornerBracket /></div>
              <div className="corner-bracket cb-bl"><CornerBracket /></div>
              <div className="corner-bracket cb-br"><CornerBracket /></div>

              {/* Side slashes */}
              <div className="side-slashes left">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>
              <div className="side-slashes right">
                <div className="slash" style={{ left: 40 }}></div>
                <div className="slash" style={{ left: 80, opacity: 0.5 }}></div>
                <div className="slash" style={{ left: 160, opacity: 0.25 }}></div>
              </div>

              <EconomicsPage onBack={() => setState("pitch-coreloop")} onOverview={() => setState("pitch-details")} onNext={() => setState("pitch-living-economy")} nextTitle="AGENTIC LIVEOPS" />
            </>
          )}

          {/* Auction view */}
          {state === "auction" && (
            <AuctionView
              pilotId={auctionPilotId}
              onBack={() => setState("pitch-details")}
              onSharePost={() => setState("post")}
            />
          )}

          {/* Post view */}
          {state === "post" && (
            <PostView
              pilotId={auctionPilotId}
              onBack={() => setState("auction")}
              onBid={() => setState("auction")}
            />
          )}

          {/* CRT atmosphere */}
          <div className="scanlines"></div>
          <div className="crt-glow"></div>
        </div>
      </ScaledStage>

      {/* Tweaks panel */}
      <TweaksPanel>
        <TweakSection label="Aesthetic" />
        <TweakSelect label="Palette" value={t.palette}
                     options={[
                       { value: "cyanMagenta", label: "Cyan / Magenta" },
                       { value: "blueOrange", label: "Blue / Orange" },
                       { value: "goldCrimson", label: "Gold / Crimson" },
                     ]}
                     onChange={(v) => setTweak("palette", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PitchApp />);
/* hot-reload probe */
/* hot-reload probe 1780515122 */
console.log("hot reload probe " + Date.now());

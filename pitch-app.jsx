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
      <div className="pitch-hero-sub">Reddit Games Pipeline</div>
      <button className="pitch-hero-cta" onClick={onStart}>
        ENTER PITCH
      </button>
    </div>
  );
}

// ─── Vision Page ───────────────────────────────────────────
function VisionPage({ onBack, onNext }) {
  return (
    <div className="pitch-details">
      <div className="pitch-header">
        <button className="pitch-back-btn" onClick={onBack}>
          <span>◀</span>
          <span>HOME</span>
        </button>
        <div className="pitch-title">
          <span className="pitch-title-big">VISION</span>
          <span className="pitch-title-sub">GAMING ON REDDIT</span>
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

      <div className="pitch-content" style={{ gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" }}>
        {/* Left column: Image */}
        <div>
          <div style={{
            background: "rgba(0,0,0,0.3)",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(25, 230, 196, 0.2)",
            maxHeight: "800px",
          }}>
            <img src="GamesOnReddit.png" alt="r/GamesOnReddit" style={{
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
            r/GamesOnReddit is a free marketing sub for new Reddit games with top games easily topping 50k WAU
          </div>
        </div>

        {/* Right column: Content cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          <div className="pitch-card">
            <div className="pitch-card-title">⚡ THE OPPORTUNITY</div>
            <div className="pitch-card-body">
              <strong style={{ color: "var(--c-ink)" }}>Reddit has quietly become a native games platform. </strong>
                Devvit lets developers build interactive games that run directly inside Reddit posts, with Reddit-native identity, 
                distribution, payments, and community mechanics.
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>
                <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>48</span> tracked native games. <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>1.4M</span> weekly active users. <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>532K</span> weekly contributions. A solo developer just hit <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>414,000</span> weekly players in 8 months — without spending a dollar on marketing. The average game on the platform converts <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>38%</span> of its players into active contributors every week, four to eight times higher than mobile.
              </span>
              <br /><br />
              <a href="https://reddit.poweredbynova.ai" target="_blank" rel="noopener noreferrer" 
              style={{ color: "var(--c-left)", fontWeight: "600", marginLeft: "4px" }}>
                See our Reddit Games Dashboard, tracking the entire ecosystem in real time
              </a>
              <br /><br />
              <strong style={{ color: "var(--c-ink)" }}>The infrastructure is already there:</strong> <span style={{ color: "var(--c-ink)" }}>420M monthly Redditors. A developer platform (Devvit) that runs code natively inside posts. Identity, payments, and distribution built in. Zero app store friction.</span>
              <br /><br />
              <strong style={{ color: "var(--c-ink)" }}>Anomaly is building the Reddit Games Pipeline</strong> <span style={{ color: "var(--c-ink)" }}>— a framework, a data layer, and a first-party portfolio that turns this moment into a publishing house. Reddit's killer app is games. We're going to prove it, and we're going to own it.</span>
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">🎮 FIRST TITLES</div>
            <div className="pitch-card-body">
              <strong>Multiverse Basketball Association</strong> — Pixel-art esports. Collect pilots, build rosters, compete in 1v1 matches with live auctions.
              <br /><br />
              <strong>Don't Die</strong> — Arcade roguelike. Real-time survival gameplay, leaderboards, seasonal runs.
              <br /><br />
              <strong>Scoop City</strong> — Ice Cream Shop Sim. Time management meets Reddit virality. Create and share your wackiest sundaes. Real life geo features resembling Pokemon Go.
              <br /><br />
              Designed to be natively shareable, virally engaging, and monetizable through Reddit's existing systems.
            </div>

            <div style={{
              marginTop: "16px",
              width: "50%",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid rgba(25, 230, 196, 0.2)",
              background: "#02060a",
            }}>
              {/* Crop 20% off the left and right of the source video.
                  Source is 640x360; cropped frame is 384x360. */}
              <div style={{
                position: "relative",
                width: "100%",
                aspectRatio: "384 / 360",
                overflow: "hidden",
              }}>
                <video
                  src="assets/dailyrun.mov"
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
              <div style={{
                padding: "8px 12px",
                fontFamily: "var(--f-mono)",
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "var(--c-left)",
                borderTop: "1px solid rgba(25, 230, 196, 0.15)",
                textTransform: "uppercase",
              }}>
                Don't Die — Daily Run
              </div>
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">💡 WHY REDDIT WORKS FOR GAMES</div>
            <div className="pitch-card-body">
              <strong style={{ color: "var(--c-ink)" }}>Frictionless distribution:</strong> <span style={{ color: "var(--c-ink)" }}>A great game spawns a great post. A great post lands on r/all. r/all is free marketing.</span>
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>Bunny Trials hit <span style={{ fontSize: "24px", fontWeight: "900", color: "var(--c-left)" }}>414K</span> weekly users in 8 months. Color Puzzle: <span style={{ fontSize: "24px", fontWeight: "900", color: "var(--c-left)" }}>120K</span> in 4 months. Pixelary: <span style={{ fontSize: "24px", fontWeight: "900", color: "var(--c-left)" }}>67K</span> with 95.5% of players actively posting back into the feed. None of these games spent on user acquisition — the post is the game is the ad.</span>
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>Across 48 tracked Devvit games, average engagement is <span style={{ fontSize: "24px", fontWeight: "900", color: "var(--c-left)" }}>38.1%</span> (contributions ÷ WAU). Mobile F2P industry standard is 5–10%. Every player is also a content creator — every game session is itself a viral unit.</span>
              <br /><br />
              <strong style={{ color: "var(--c-ink)" }}>Cold-start solved:</strong> <span style={{ color: "var(--c-ink)" }}>24 of the 48 games we track launched in 2026 alone — half the ecosystem is less than 5 months old. There is no early-mover penalty here. Devvit is still bootstrapping its catalog. The studio that ships 2–3 hits in the next 12 months is locked in for the cycle.</span>
              <br /><br />
              <strong style={{ color: "var(--c-ink)" }}>Time-to-traction is collapsed:</strong> <span style={{ color: "var(--c-ink)" }}>On mobile, a new title typically needs $100K+ in UA to reach 50K MAU. On Reddit, Designer Eye reached 4.7K WAU in 57 days with no marketing. MiniGawf hit 49K WAU in 68 days. The dev cost is the only real cost.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}

// ─── Reddit Strategy Page ─────────────────────────────────
function RedditStrategyPage({ onBack, onNext }) {
  return (
    <div className="pitch-details">
      <div className="pitch-header">
        <button className="pitch-back-btn" onClick={onBack}>
          <span>◀</span>
          <span>HOME</span>
        </button>
        <div className="pitch-title">
          <span className="pitch-title-big">REDDIT STRATEGY</span>
          <span className="pitch-title-sub">GAMEPLAY × PLATFORM</span>
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

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}

// ─── Roadmap Page ───────────────────────────────────────
function RoadmapPage({ onBack, onNext }) {
  return (
    <div className="pitch-details">
      <div className="pitch-header">
        <button className="pitch-back-btn" onClick={onBack}>
          <span>◀</span>
          <span>HOME</span>
        </button>
        <div className="pitch-title">
          <span className="pitch-title-big">ROADMAP</span>
          <span className="pitch-title-sub">18-MONTH EXECUTION</span>
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

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}

// ─── Founder Page ──────────────────────────────────────────
function FounderPage({ onBack, onNext }) {
  return (
    <div className="pitch-details">
      <div className="pitch-header">
        <button className="pitch-back-btn" onClick={onBack}>
          <span>◀</span>
          <span>HOME</span>
        </button>
        <div className="pitch-title">
          <span className="pitch-title-big">THE FOUNDER</span>
          <span className="pitch-title-sub">LONG DO</span>
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

      <div className="pitch-content" style={{ gridTemplateColumns: "400px 1fr", gap: "24px", alignItems: "start" }}>
        {/* Left column: Photo */}
        <div>
          <div style={{
            background: "rgba(0,0,0,0.3)",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(25, 230, 196, 0.2)",
            maxHeight: "600px",
          }}>
            <img src="long-do-photo.jpg" alt="Long Do" style={{
              width: "100%",
              height: "auto",
              display: "block",
            }} />
          </div>
        </div>

        {/* Right column: Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          <div className="pitch-card">
            <div className="pitch-card-title">👤 LONG DO</div>
            <div className="pitch-card-body">
              <strong style={{ color: "var(--c-ink)" }}>A decade of shipping hits as an indie developer.</strong>
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>10+ shipped titles. $50K–$2M acquisitions. Built without teams, without publishers, against 30% app store cuts.</span>
              <br /><br />
              <strong style={{ color: "var(--c-ink)" }}>Long Do is a repeat founder with multiple successful exits</strong> <span style={{ color: "var(--c-ink)" }}>and investment from leading names including a16z and Kevin O'Leary. He brings deep technical expertise through dual degrees in Computer Science and Information Technology.</span>
              <br /><br />
              <strong style={{ color: "var(--c-ink)" }}>Two forces have just compressed the math:</strong>
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>
                • <strong>AI</strong> turns a 12-month build into a 3-month ship
                <br />
                • <strong>Reddit</strong> removes every distribution and monetization tax that used to slow indies down
              </span>
              <br /><br />
              <span style={{ color: "var(--c-ink)" }}>The model that worked for one developer building one game at a time now works for one developer building ten at a time, on the platform with the lowest friction in gaming history.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}
function AIDifferencePage({ onBack, onNext }) {
  return (
    <div className="pitch-details">
      <div className="pitch-header">
        <button className="pitch-back-btn" onClick={onBack}>
          <span>◀</span>
          <span>HOME</span>
        </button>
        <div className="pitch-title">
          <span className="pitch-title-big">ANOMALY'S LIVING WORLDS</span>
          <span className="pitch-title-sub">AI AGENTS NATIVE TO REDDIT</span>
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

      <div className="pitch-content" style={{ gridTemplateColumns: "1fr", gap: "24px" }}>
        {/* Opening: AI Agents embedded into Reddit */}
        <div className="pitch-card">
          <div className="pitch-card-title">🤖 AI AGENTS EMBEDDED INTO THE REDDIT ECOSYSTEM</div>
          <div className="pitch-card-body">
            <strong style={{ color: "var(--c-ink)" }}>Most studios bolt AI on as a feature. 
              Clearly labeled AI opponents and game agents keep worlds active from day one. They can generate daily challenges, fill matchmaking queues, participate in in-game auctions, 
              and create replayable content loops — without pretending to be human users or manipulating Reddit votes.</strong> <span style={{ color: "var(--c-ink)" }}>— autonomous participants embedded directly in the feed, the comments, and the game economy.</span>
            <br /><br />
            <span style={{ color: "var(--c-ink)" }}>
              Create content, posts, content — seeding activity, filling matchmaking, and keeping every community alive from day one.</span>
            <br /><br />
            <strong style={{ color: "var(--c-ink)" }}>The result:</strong> <span style={{ color: "var(--c-ink)" }}>a game world that never feels empty, and a content engine that runs itself. Our AI difference isn't a smarter NPC — it's an always-on population native to the platform.</span>
          </div>
        </div>

        {/* Living Economy subsection label */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "8px",
        }}>
          <div style={{ height: "1px", flex: "0 0 40px", background: "var(--c-left)" }}></div>
          <span style={{
            color: "var(--c-left)",
            fontSize: "14px",
            letterSpacing: "0.2em",
            fontWeight: "700",
          }}>IN PRACTICE — THE LIVING ECONOMY</span>
          <div style={{ height: "1px", flex: "1", background: "rgba(25, 230, 196, 0.2)" }}></div>
        </div>

        {/* Living Economy: video + content cards */}
        <div style={{ display: "grid", gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" }}>
          {/* Left column: Video */}
          <div>
            <div style={{
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid rgba(25, 230, 196, 0.2)",
              position: "relative",
              height: "600px",
            }}>
              <video
                src="living-economy-demo.mp4"
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
          </div>

          {/* Right column: Content cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
            <div className="pitch-card">
              <div className="pitch-card-title">🤖 WHAT IS A LIVING ECONOMY?</div>
              <div className="pitch-card-body">
                <strong>The hardest problem in games isn't building a world — it's keeping it alive after launch.</strong> Scripted economies go stale; players churn.
                <br /><br />
                <strong>Anomaly has a living economy:</strong> Admin AI Assisted controlled agents that think, bid, scout, and adapt in real time. They have unique rosters, bidding strategies, and personalities. They're not just opponents — they're market participants, price makers, and ecosystem participants.
                <br /><br />
                <strong>What this means:</strong> Every day the economy looks different. New meta emerges. New opportunities surface. The world feels alive.
              </div>
            </div>

            <div className="pitch-card">
              <div className="pitch-card-title">🏆 RANKED LADDER WITH AGENTS</div>
              <div className="pitch-card-body">
                <strong>Queue System:</strong> Players are matched against ranked opponents based on their player roster strength AND agent rosters.
                <br /><br />
                <strong>Agent Variety:</strong> Different agents have different strategies:
                <br />
                • Aggressive bidders who drive auction prices
                <br />
                • Scout agents who discover undervalued pilots
                <br /><br />
                <strong>Solving Cold Start:</strong> Day 1, new players draft a starter roster, queue matches against agents, win gold, bid in auctions, and climb the leaderboard — a thriving ecosystem with competitive matches, an active auction market, and meaningful progression from the very first session.
              </div>
            </div>

            <div className="pitch-card">
              <div className="pitch-card-title">💎 MARKET MAKING VIA AGENTS</div>
              <div className="pitch-card-body">
                <strong>Liquidity on demand:</strong> Agents always bid if prices drop too low
                <br />
                <strong>Price stability:</strong> Agents dampen extreme volatility
                <br />
                <strong>Player confidence:</strong> Market depth feels real
                <br />
                <strong>Natural progression:</strong> Agents sell inventory as players climb ranks
              </div>
            </div>
          </div>
        </div>

        {/* Don't Die — daily roguelike subsection label */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "8px",
        }}>
          <div style={{ height: "1px", flex: "0 0 40px", background: "var(--c-left)" }}></div>
          <span style={{
            color: "var(--c-left)",
            fontSize: "14px",
            letterSpacing: "0.2em",
            fontWeight: "700",
          }}>IN PRACTICE — DON'T DIE: DAILY ROGUELIKE</span>
          <div style={{ height: "1px", flex: "1", background: "rgba(25, 230, 196, 0.2)" }}></div>
        </div>

        {/* Don't Die: video + content card */}
        <div style={{ display: "grid", gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" }}>
          {/* Left column: Don't Die — Daily Run */}
          <div style={{
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(25, 230, 196, 0.2)",
            background: "#02060a",
          }}>
            {/* Crop 20% off the left and right of the source video (640x360 -> 384x360). */}
            <div style={{
              position: "relative",
              width: "100%",
              aspectRatio: "384 / 360",
              overflow: "hidden",
            }}>
              <video
                src="assets/dailyrun.mov"
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
            <div style={{
              padding: "8px 12px",
              fontFamily: "var(--f-mono)",
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "var(--c-left)",
              borderTop: "1px solid rgba(25, 230, 196, 0.15)",
              textTransform: "uppercase",
            }}>
              Don't Die — Daily Run
            </div>
          </div>

          {/* Right column: Content card */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
            <div className="pitch-card">
              <div className="pitch-card-title">🗡️ AGENT-GENERATED DAILY CHALLENGES</div>
              <div className="pitch-card-body">
                <strong style={{ color: "var(--c-ink)" }}>A deck-building roguelike in the Slay the Spire tradition — but the runs build themselves.</strong>
                <br /><br />
                <span style={{ color: "var(--c-ink)" }}>An AI agent auto-generates a fresh daily challenge — new map, enemies, relics, and modifiers — and posts it straight to Reddit as a playable post. Every day is a new seed, a new leaderboard, a new conversation.</span>
                <br /><br />
                <strong style={{ color: "var(--c-ink)" }}>Why it works:</strong> <span style={{ color: "var(--c-ink)" }}>The content engine never sleeps and never runs dry. Players return daily to chase the same seed, compare runs in the comments, and the post itself is the distribution.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic data game subsection label */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "8px",
        }}>
          <div style={{ height: "1px", flex: "0 0 40px", background: "var(--c-left)" }}></div>
          <span style={{
            color: "var(--c-left)",
            fontSize: "14px",
            letterSpacing: "0.2em",
            fontWeight: "700",
          }}>IN PRACTICE — REAL-WORLD DYNAMIC DATA</span>
          <div style={{ height: "1px", flex: "1", background: "rgba(25, 230, 196, 0.2)" }}></div>
        </div>

        {/* Dynamic data: video + content card */}
        <div style={{ display: "grid", gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" }}>
          {/* Left column: Scoop City */}
          <div style={{
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(25, 230, 196, 0.2)",
            background: "#02060a",
          }}>
            <video
              src="assets/scoopcity.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
            <div style={{
              padding: "8px 12px",
              fontFamily: "var(--f-mono)",
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "var(--c-left)",
              borderTop: "1px solid rgba(25, 230, 196, 0.15)",
              textTransform: "uppercase",
            }}>
              Scoop City
            </div>
          </div>

          {/* Right column: Content card */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
            <div className="pitch-card">
              <div className="pitch-card-title">🌎 REAL-WORLD DATA AS GAME FUEL</div>
              <div className="pitch-card-body">
                <strong style={{ color: "var(--c-ink)" }}>A game world wired directly into reality.</strong>
                <br /><br />
                <span style={{ color: "var(--c-ink)" }}>Real-life events, live weather, and real-time data feeds stream in, and an AI agent monitors them to generate dynamic game content — events, conditions, and challenges that mirror what's actually happening in the world.</span>
                <br /><br />
                <strong style={{ color: "var(--c-ink)" }}>Why it works:</strong> <span style={{ color: "var(--c-ink)" }}>The game is never the same twice and is impossible to fully script around. A storm rolls through your city, the world reacts. The agent turns the real world into an endless, self-refreshing content pipeline.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}
function MarketOpportunityPage({ onBack, onNext }) {
  return (
    <div className="pitch-details">
      <div className="pitch-header">
        <button className="pitch-back-btn" onClick={onBack}>
          <span>◀</span>
          <span>HOME</span>
        </button>
        <div className="pitch-title">
          <span className="pitch-title-big">MARKET OPPORTUNITY</span>
          <span className="pitch-title-sub">REDDIT'S GAMING ECOSYSTEM</span>
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
              <strong>Total Addressable Market:</strong> $12B+ digital collectibles + esports
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

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}
function MonetizationPage({ onBack, onNext }) {
  return (
    <div className="pitch-details">
      <div className="pitch-header">
        <button className="pitch-back-btn" onClick={onBack}>
          <span>◀</span>
          <span>HOME</span>
        </button>
        <div className="pitch-title">
          <span className="pitch-title-big">MONETIZATION</span>
          <span className="pitch-title-sub">SUSTAINABLE REVENUE</span>
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
            <img src="Shop.png" alt="In-Game Shop" style={{
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
            Our gem shop allows players to purchase cosmetics and battle pass progression
          </div>
        </div>

        {/* Right column: Content cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          <div className="pitch-card">
            <div className="pitch-card-title">💎 PREMIUM CURRENCY MONETIZATION</div>
            <div className="pitch-card-body">
              Initial monetization will focus on non-pay-to-win cosmetics, seasonal passes, Reddit Gold purchases, and sponsored collaborations. 
              We will validate ARPU, conversion, and retention across first-party titles before expanding into third-party publishing.
              <br /><br />
            </div>
          </div>
          <div className="pitch-card">
            <div className="pitch-card-title">🤝 GRANTS & COLLABORATIONS</div>
            <div className="pitch-card-body">
              Reddit's Fund supports virality of games with up to $200k in grants for creating played games. Monetization is early, 
              but we can start with revenue share on Fund-supported titles and expand into sponsored collaborations with brands and IP holders.

              <br /><br />
              Reddit is also early in exploring paid attention and analytics services for game developers. We can position Anomaly as a 
              growth partner for Fund-supported titles, offering paid services to help them optimize their games and scale their audiences.
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">📊 REVENUE PROJECTIONS</div>
            <div className="pitch-card-body">
              <strong>Y1:</strong> 10 Games, 50k players each, $400k–600k MRR (Reddit Gold)
              <br />
              <strong>Y2+:</strong> 20 Games, 500k players each, $400k–600k MRR (Reddit Gold, Revenue Share with Reddit Attention)
            </div>
          </div>
        </div>
      </div>

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}
function CoreLoopPage({ onBack, onNext }) {
  return (
    <div className="pitch-details">
      <div className="pitch-header">
        <button className="pitch-back-btn" onClick={onBack}>
          <span>◀</span>
          <span>HOME</span>
        </button>
        <div className="pitch-title">
          <span className="pitch-title-big">REDDIT MECHANICS</span>
          <span className="pitch-title-sub">POSTS ARE GAMES</span>
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

      <div className="pitch-content" style={{ gridTemplateColumns: "500px 1fr", gap: "24px", alignItems: "start" }}>
        {/* Left column: Image */}
        <div>
          <div style={{
            background: "rgba(0,0,0,0.3)",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(25, 230, 196, 0.2)",
            maxHeight: "800px",
          }}>
            <img src="SwordAndSupper.png" alt="Sword & Supper Game" style={{
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
            Margaret on our team created Sword & Supper, the first monetized game on Reddit
          </div>
        </div>

        {/* Right column: Content cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          <div className="pitch-card">
            <div className="pitch-card-title">📮 POSTS ARE GAMES</div>
            <div className="pitch-card-body">
              A Reddit post hosts the entire match. Open a post, the game loads. One click. No friction.
              <br /><br />
              <strong>What it means:</strong> Every match is a persistent container with its own URL and thread. Players can share, spectate, and comment on live games. A great match becomes a shareable moment that lands on r/all.
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">🏀 MULTIVERSE BASKETBALL ASSOCIATION — IN ACTION</div>
            <div style={{
              marginTop: "12px",
              width: "50%",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid rgba(25, 230, 196, 0.2)",
              background: "#02060a",
            }}>
              {/* Crop 20% off the left and right of the source video (640x360 -> 384x360). */}
              <div style={{
                position: "relative",
                width: "100%",
                aspectRatio: "384 / 360",
                overflow: "hidden",
              }}>
                <video
                  src="assets/MBAClip.mov"
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
              <div style={{
                padding: "8px 12px",
                fontFamily: "var(--f-mono)",
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "var(--c-left)",
                borderTop: "1px solid rgba(25, 230, 196, 0.15)",
                textTransform: "uppercase",
              }}>
                Multiverse Basketball Association
              </div>
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">💬 COMMENTS = GUILD COMMS</div>
            <div className="pitch-card-body">
              The comment thread is where the community lives. Players trash talk, celebrate, and strategize in real time.
              <br /><br />
              <strong>Post-game:</strong> Commentary, GIFs, replays, and leaderboard updates thread together naturally. No separate discord, no fragmentation.
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">⬆️ UPVOTES = DISCOVERY</div>
            <div className="pitch-card-body">
              Upvotes signal quality and drive the feed algorithm. A close match, a rare auction upset, a legendary play — these become viral posts.
              <br /><br />
              <strong>What we get:</strong> Free distribution. Organic marketing. The algorithm does the work.
            </div>
          </div>

          <div className="pitch-card">
            <div className="pitch-card-title">👥 SUBREDDITS = GUILDS</div>
            <div className="pitch-card-body">
              r/MultiverseBA is the tribe. Weekly tournaments, seasonal leagues, collaborative bosses.
              <br /><br />
              <strong>Retention:</strong> Your friends ARE your league. Reddit's tribal structure becomes progression infrastructure.
            </div>
          </div>
        </div>
      </div>

      <div className="pitch-footer">
        <span>ANOMALY STUDIO © 2026</span>
        <span>REDDIT GAMES PIPELINE</span>
      </div>
    </div>
  );
}

// ─── Pitch Details Screen ───────────────────────────────────
function PitchDetails({ onBack, onAuction, onVision, onCoreLoop, onMonetization, onMarketOpportunity, onLivingEconomy, onRedditStrategy, onRoadmap, onFounder }) {
  return (
    <div className="pitch-details">
      <div className="pitch-header">
        <button className="pitch-back-btn" onClick={onBack}>
          <span>◀</span>
          <span>BACK</span>
        </button>
        <div className="pitch-title">
          <span className="pitch-title-big">ANOMALY STUDIO</span>
          <span className="pitch-title-sub">INTERACTIVE PITCH DECK</span>
        </div>
        <div style={{ width: "140px" }}></div>
      </div>

      <div className="pitch-content">
        {/* Card 1: Vision — CLICKABLE */}
        <div className="pitch-card" onClick={onVision} style={{ cursor: "pointer" }}>
          <div className="pitch-card-title">⚡ VISION</div>
          <div className="pitch-card-body">
            <strong>Reddit has quietly become a native games platform.</strong> Anomaly has the data, tooling, AI systems, and game production engine to become the first major Reddit-native games publisher.
            <br /><br />
             420M monthly active users. A developer platform that runs code in posts. Built-in identity, payments, and distribution.
            <br /><br />
            <strong>Anomaly</strong> is building the <strong>Reddit Games Pipeline</strong> — flagship games that prove games are Reddit's killer app.
          </div>
          <div style={{ marginTop: "8px", color: "var(--c-left)", fontSize: "12px", letterSpacing: "0.1em" }}>
            CLICK TO EXPLORE →
          </div>
        </div>

        {/* Card 2: Core Loop — CLICKABLE */}
        <div className="pitch-card" onClick={onCoreLoop} style={{ cursor: "pointer" }}>
          <div className="pitch-card-title">🎮 NEW INNOVATIVE LOOPS</div>
          <div className="pitch-card-body">
            <strong>Collect, Customize, Compete, and Trade</strong> — Draft legendary pixel athletes, Build lineups around playstyles, Bid, auction, and upgrade your roster through a player-driven market
            <br />
            <strong>Casual Evergreen Games</strong> —  Automated engagement loops, live events, and dynamic content keep the world fresh and players coming back for more
            <br />
            <strong>Virality in Mind</strong> — Share simple things like Ice Cream cones in shareable Reddit post, with built-in commenting to drive community and discovery
            
          </div>
          <div style={{ marginTop: "8px", color: "var(--c-left)", fontSize: "12px", letterSpacing: "0.1em" }}>
            CLICK TO EXPLORE →
          </div>
        </div>

        {/* Card 3: Monetization — CLICKABLE */}
        <div className="pitch-card" onClick={onMonetization} style={{ cursor: "pointer" }}>
          <div className="pitch-card-title">💰 MONETIZATION</div>
          <div className="pitch-card-body">
            
            Reddit monetization is still early, which creates the opportunity. Anomaly will begin with proven, 
            low-friction revenue loops: non-pay-to-win cosmetics, premium currency, seasonal passes, grants, and sponsored collaborations.
          </div>
          <div style={{ marginTop: "8px", color: "var(--c-left)", fontSize: "12px", letterSpacing: "0.1em" }}>
            CLICK TO EXPLORE →
          </div>
        </div>

        {/* Card 4: Market Opportunity — CLICKABLE */}
        <div className="pitch-card" onClick={onMarketOpportunity} style={{ cursor: "pointer" }}>
          <div className="pitch-card-title">📊 MARKET OPPORTUNITY</div>
          <div className="pitch-card-body">
            <span style={{ color: "var(--c-ink)" }}>We're tracking <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>48</span> active games on Reddit. Just the popular tier alone:</span>
            <br /><br />
            <span style={{ color: "var(--c-ink)" }}>
              <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>1,397,209</span> weekly active users across tracked titles
              <br />
              <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>531,931</span> weekly contributions (votes, posts, plays — not passive scrolling)
              <br />
              <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>38.1%</span> platform-wide engagement rate (contributions ÷ WAU). On mobile F2P, 5–10% is industry standard. This is <span style={{ fontSize: "20px", fontWeight: "900", color: "var(--c-left)" }}>4–8x</span> higher.
            </span>
          </div>
          <div style={{ marginTop: "8px", color: "var(--c-left)", fontSize: "12px", letterSpacing: "0.1em" }}>
            CLICK TO EXPLORE →
          </div>
        </div>

        {/* Card 5: AI Difference — CLICKABLE */}
        <div className="pitch-card" onClick={onLivingEconomy} style={{ cursor: "pointer" }}>
          <div className="pitch-card-title">🌐 ANOMALY'S LIVING WORLDS</div>
          <div className="pitch-card-body">
            AI agents embedded natively into the Reddit ecosystem — they post, comment, bid, and compete like real Redditors, seeding activity and keeping every community alive from day one.
            <br /><br />
            In practice, this powers a living economy: no cold start, no empty leaderboards, no churn from stale endgame. A world that feels alive.
          </div>
          <div style={{ marginTop: "8px", color: "var(--c-left)", fontSize: "12px", letterSpacing: "0.1em" }}>
            CLICK TO EXPLORE →
          </div>
        </div>

        {/* Card 6: Founder & Plan */}
        <div className="pitch-card" onClick={onFounder} style={{ cursor: "pointer" }}>
          <div className="pitch-card-title">👤 THE FOUNDER</div>
          <div className="pitch-card-body">
            <strong style={{ color: "var(--c-ink)" }}>Long Do</strong> <span style={{ color: "var(--c-ink)" }}>— solo developer, in the last 3 years, 10+ shipped titles each successfully brought in revenue $50K–$2M.</span>
            <br /><br />
            <span style={{ color: "var(--c-ink)" }}>A decade of shipping hits as an indie — built without teams, without publishers, against 30% app store cuts.</span>
            <br /><br />
            <strong style={{ color: "var(--c-ink)" }}>Two forces have just compressed the math:</strong>
            <br /><br />
            <span style={{ color: "var(--c-ink)" }}>
              • AI turns a 12-month build into a 1-month ship
              <br />
              • Reddit removes every distribution and monetization tax that used to slow indies down
            </span>
          </div>
          <div style={{ marginTop: "8px", color: "var(--c-left)", fontSize: "12px", letterSpacing: "0.1em" }}>
            CLICK TO EXPLORE →
          </div>
        </div>

        {/* Card 7: The Roadmap — CLICKABLE */}
        <div className="pitch-card" onClick={onRoadmap} style={{ cursor: "pointer" }}>
          <div className="pitch-card-title">📅 THE ROADMAP</div>
          <div className="pitch-card-body">
            <strong style={{ color: "var(--c-ink)" }}>Five quarters to category leadership.</strong> Build the infrastructure and tools (Q3 2026), launch flagship titles (Q4 2026), compound with a portfolio of hits (Q1 2027), open to third-party studios (Q2 2027), and become Reddit's publisher of record by Q2 2028.
          </div>
          <div style={{ marginTop: "8px", color: "var(--c-left)", fontSize: "12px", letterSpacing: "0.1em" }}>
            CLICK TO EXPLORE →
          </div>
        </div>

        {/* Card 8: Live Demo */}
        <div className="pitch-card">
          <div className="pitch-card-title">👾 LIVE DEMO</div>
          <div className="pitch-card-body">
            Experience the <strong>auction house in action</strong>. See how players bid on legendary pilots in real time with our live bidding interface.
            <br /><br />
            <button onClick={onAuction} style={{
              appearance: "none",
              border: "1px solid var(--c-left)",
              background: "rgba(25, 230, 196, 0.1)",
              color: "var(--c-left)",
              padding: "10px 20px",
              cursor: "pointer",
              font: "700 14px var(--f-head)",
              letterSpacing: "0.1em",
              marginTop: "8px",
            }}>
              ENTER AUCTION HOUSE →
            </button>
          </div>
        </div>
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
    ["pitch-coreloop", "Core Loop"],
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
                onBack={() => setState("pitch-hero")}
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

              <VisionPage onBack={() => setState("pitch-details")} onNext={() => setState("pitch-coreloop")} />
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

              <CoreLoopPage onBack={() => setState("pitch-details")} onNext={() => setState("pitch-monetization")} />
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

              <RoadmapPage onBack={() => setState("pitch-details")} />
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

              <FounderPage onBack={() => setState("pitch-details")} onNext={() => setState("pitch-roadmap")} />
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

              <AIDifferencePage onBack={() => setState("pitch-details")} onNext={() => setState("pitch-founder")} />
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

              <MarketOpportunityPage onBack={() => setState("pitch-details")} onNext={() => setState("pitch-living-economy")} />
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

              <MonetizationPage onBack={() => setState("pitch-details")} onNext={() => setState("pitch-market")} />
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

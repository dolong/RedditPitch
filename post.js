const { useState: useStateP, useEffect: useEffectP } = React;
function fmtPostTime(s) {
  const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}
const TOP_BIDDERS = [
  { rank: 1, user: "u/TokyoSlam_42", bid: 18450, medal: "#ffd97a" },
  { rank: 2, user: "u/PixelPunk_99", bid: 17200, medal: "#cbd5e1" },
  { rank: 3, user: "u/HoopLord_TT", bid: 16800, medal: "#cd7f32" }
];
const POS_COLORS_PT = {
  PG: "#3ea6ff",
  SG: "#a855f7",
  SF: "#19e6c4",
  PF: "#ff7a3c",
  C: "#ffc94a",
  "?": "#475569"
};
function PostView({ pilotId, onBack, onBid }) {
  var _a;
  const pilots = window.PILOTS || [];
  const pilot = pilots.find((p) => p.id === pilotId) || pilots[0];
  const posColor = POS_COLORS_PT[pilot.position] || "#19e6c4";
  const [timeLeft, setTimeLeft] = useStateP(2 * 3600 + 14 * 60 + 23);
  const date = new Date(2026, 4, 16);
  const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()];
  const dateLine = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase();
  useEffectP(() => {
    const id = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1e3);
    return () => clearInterval(id);
  }, []);
  const heatPct = Math.min(100, Math.round(TOP_BIDDERS[0].bid / 25e3 * 100));
  return /* @__PURE__ */ React.createElement("div", { className: "post-state" }, /* @__PURE__ */ React.createElement("button", { className: "post-back", onClick: onBack }, /* @__PURE__ */ React.createElement("span", null, "\u25C0"), /* @__PURE__ */ React.createElement("span", null, "BACK")), /* @__PURE__ */ React.createElement("div", { className: "post-card", style: { "--pos-c": posColor, "--tier-c": pilot.color } }, /* @__PURE__ */ React.createElement("div", { className: "ps-sash" }, /* @__PURE__ */ React.createElement("div", { className: "ps-sash-day" }, day), /* @__PURE__ */ React.createElement("div", { className: "ps-sash-date" }, dateLine)), /* @__PURE__ */ React.createElement("div", { className: "ps-bg" }, /* @__PURE__ */ React.createElement("div", { className: "ps-bg-tint" }), /* @__PURE__ */ React.createElement("div", { className: "ps-bg-grid" }), /* @__PURE__ */ React.createElement("div", { className: "ps-bg-rays" })), /* @__PURE__ */ React.createElement("div", { className: "ps-logo" }, /* @__PURE__ */ React.createElement("div", { className: "ps-logo-flair" }, /* @__PURE__ */ React.createElement("span", { className: "ps-coin" }, "\u25C9"), /* @__PURE__ */ React.createElement("span", { className: "ps-logo-pre" }, "THE")), /* @__PURE__ */ React.createElement("div", { className: "ps-logo-big" }, "MBA"), /* @__PURE__ */ React.createElement("div", { className: "ps-logo-sub" }, "MOON BASKETBALL ASSOCIATION")), /* @__PURE__ */ React.createElement("div", { className: "ps-aucbadge" }, /* @__PURE__ */ React.createElement("span", { className: "ps-aucbadge-dot" }), "AUCTION LIVE"), /* @__PURE__ */ React.createElement("div", { className: "ps-char" }, /* @__PURE__ */ React.createElement("div", { className: "ps-char-glow" }), /* @__PURE__ */ React.createElement("div", { className: "ps-char-tier" }, /* @__PURE__ */ React.createElement("span", { className: "ps-tier-pill" }, (_a = pilot.tier) == null ? void 0 : _a.toUpperCase(), " TIER")), /* @__PURE__ */ React.createElement("img", { src: "assets/idle.gif", className: "ps-char-sprite", alt: "" }), /* @__PURE__ */ React.createElement("div", { className: "ps-char-floor" }), /* @__PURE__ */ React.createElement("div", { className: "ps-char-shadow" }), /* @__PURE__ */ React.createElement("div", { className: "ps-char-meta" }, /* @__PURE__ */ React.createElement("div", { className: "ps-char-pos", style: { background: posColor } }, pilot.position), /* @__PURE__ */ React.createElement("div", { className: "ps-char-name" }, /* @__PURE__ */ React.createElement("span", { className: "ps-char-name-big" }, pilot.name), /* @__PURE__ */ React.createElement("span", { className: "ps-char-name-call" }, "\u300C", pilot.callsign, "\u300D")), /* @__PURE__ */ React.createElement("div", { className: "ps-char-ovr" }, /* @__PURE__ */ React.createElement("span", null, pilot.overall), /* @__PURE__ */ React.createElement("em", null, "OVR")))), /* @__PURE__ */ React.createElement("div", { className: "ps-board" }, /* @__PURE__ */ React.createElement("div", { className: "ps-board-h" }, /* @__PURE__ */ React.createElement("span", { className: "ps-board-glyph" }, "\u25C6"), "Top Bidders"), TOP_BIDDERS.map((b) => /* @__PURE__ */ React.createElement("div", { key: b.rank, className: "ps-board-row" }, /* @__PURE__ */ React.createElement("div", { className: "ps-medal", style: { "--medal-c": b.medal } }, /* @__PURE__ */ React.createElement("span", { className: "ps-medal-num" }, b.rank), /* @__PURE__ */ React.createElement("span", { className: "ps-medal-tail" })), /* @__PURE__ */ React.createElement("div", { className: "ps-board-info" }, /* @__PURE__ */ React.createElement("div", { className: "ps-board-user" }, b.user), /* @__PURE__ */ React.createElement("div", { className: "ps-board-bid" }, /* @__PURE__ */ React.createElement("span", { className: "ps-coin-sm" }, "\u25C9"), b.bid.toLocaleString(), " ", /* @__PURE__ */ React.createElement("em", null, "CREDITS")))))), /* @__PURE__ */ React.createElement("button", { className: "ps-cta", onClick: () => onBid && onBid(pilot.id) }, /* @__PURE__ */ React.createElement("span", { className: "ps-cta-label" }, "BID NOW"), /* @__PURE__ */ React.createElement("span", { className: "ps-cta-arrow" }, "\u25B6")), /* @__PURE__ */ React.createElement("div", { className: "ps-foot" }, /* @__PURE__ */ React.createElement("span", { className: "ps-foot-lbl" }, "ENDS IN: ", fmtPostTime(timeLeft)), /* @__PURE__ */ React.createElement("div", { className: "ps-foot-bar" }, Array.from({ length: 16 }).map((_, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: `ps-foot-cell ${i < Math.floor(heatPct / 6.25) ? "on" : ""}` })))), /* @__PURE__ */ React.createElement("div", { className: "ps-substrip" }, /* @__PURE__ */ React.createElement("div", { className: "ps-sub" }, "r/TheMBA"), /* @__PURE__ */ React.createElement("div", { className: "ps-sub-meta" }, /* @__PURE__ */ React.createElement("span", null, "\u25B2 14.2k"), /* @__PURE__ */ React.createElement("span", null, "\u{1F4AC} 482"), /* @__PURE__ */ React.createElement("span", null, "\u2197 1.2k")))));
}
window.PostView = PostView;

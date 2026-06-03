const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;
const BIDDERS = [
  { user: "u/TokyoSlam_42", credits: 18450 },
  { user: "u/PixelPunk_99", credits: 17200 },
  { user: "u/HoopLord_TT", credits: 16800 },
  { user: "u/CryptoBaller", credits: 15500 },
  { user: "u/ZeroGravity", credits: 14250 },
  { user: "u/PointGuardKing", credits: 13800 },
  { user: "u/SneakerSlam", credits: 12500 },
  { user: "u/DunkMaster99", credits: 11900 },
  { user: "u/NeonHoops", credits: 10750 },
  { user: "u/ShotClock_TT", credits: 9800 },
  { user: "u/MoonBaseFan", credits: 8500 },
  { user: "u/RookieRiser", credits: 7250 },
  { user: "u/peetan_42", credits: 6800, you: true },
  { user: "u/CourtVisionX", credits: 5400 }
];
const POS_COLORS_A = {
  PG: "#3ea6ff",
  SG: "#a855f7",
  SF: "#19e6c4",
  PF: "#ff7a3c",
  C: "#ffc94a",
  "?": "#475569"
};
function StarsA({ count, max = 5, size = 14 }) {
  return /* @__PURE__ */ React.createElement("div", { className: "stars", style: { "--star-size": `${size}px` } }, Array.from({ length: max }).map((_, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: `star ${i < count ? "on" : ""}` }, "\u2605")));
}
function AuctionStat({ lbl, val, color }) {
  return /* @__PURE__ */ React.createElement("div", { className: "auc-stat" }, /* @__PURE__ */ React.createElement("span", { className: "auc-stat-lbl" }, lbl), /* @__PURE__ */ React.createElement("span", { className: "auc-stat-bar" }, /* @__PURE__ */ React.createElement("span", { className: "auc-stat-fill", style: { width: `${val}%`, background: color, boxShadow: `0 0 8px ${color}90` } })), /* @__PURE__ */ React.createElement("span", { className: "auc-stat-val" }, val));
}
function BidRow({ idx, bid, isLeader }) {
  return /* @__PURE__ */ React.createElement("div", { className: `bid-row ${isLeader ? "leader" : ""} ${bid.you ? "you" : ""}` }, /* @__PURE__ */ React.createElement("span", { className: "br-rank" }, "#", idx + 1), /* @__PURE__ */ React.createElement("span", { className: "br-user" }, bid.user, bid.you && /* @__PURE__ */ React.createElement("span", { className: "br-you-chip" }, "YOU")), /* @__PURE__ */ React.createElement("span", { className: "br-bid" }, /* @__PURE__ */ React.createElement("span", { className: "br-coin" }, "\u25C9"), bid.credits.toLocaleString()), isLeader && /* @__PURE__ */ React.createElement("span", { className: "br-crown" }, "\u2605"));
}
function fmtTime(totalSec) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor(totalSec % 3600 / 60);
  const s = totalSec % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
function AuctionView({ pilotId, onBack, onSharePost }) {
  var _a, _b, _c;
  const pilots = window.PILOTS || [];
  const pilot = pilots.find((p) => p.id === pilotId) || pilots[0];
  const posColor = POS_COLORS_A[pilot.position] || "#19e6c4";
  const [bids, setBids] = useStateA(BIDDERS);
  const [myBid, setMyBid] = useStateA("");
  const [highlight, setHighlight] = useStateA(null);
  const [timeLeft, setTimeLeft] = useStateA(2 * 3600 + 14 * 60 + 23);
  const [feed, setFeed] = useStateA([]);
  const sorted = [...bids].sort((a, b) => b.credits - a.credits);
  const top = sorted[0];
  useEffectA(() => {
    const id = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1e3);
    return () => clearInterval(id);
  }, []);
  useEffectA(() => {
    const id = setInterval(() => {
      var _a2;
      const nyms = ["u/HoopOracle", "u/NyxFan", "u/SlamPoet", "u/CapKaze", "u/BlinkPG", "u/CrossOverKing", "u/StreetGoat", "u/SplashBro"];
      const user = nyms[Math.floor(Math.random() * nyms.length)];
      const delta = Math.floor(500 + Math.random() * 2500);
      const newBid = (((_a2 = sorted[0]) == null ? void 0 : _a2.credits) || 1e4) + delta;
      setBids((prev) => [...prev, { user, credits: newBid }]);
      setFeed((prev) => [{ user, credits: newBid, t: Date.now() }, ...prev].slice(0, 6));
      setHighlight(user);
      setTimeout(() => setHighlight(null), 1200);
    }, 4200);
    return () => clearInterval(id);
  }, [(_a = sorted[0]) == null ? void 0 : _a.credits]);
  const placeBid = () => {
    const amount = parseInt(myBid.replace(/[^\d]/g, ""), 10);
    if (!amount || amount <= ((top == null ? void 0 : top.credits) || 0)) return;
    setBids((prev) => [...prev.filter((b) => !b.you), { user: "u/peetan_42", credits: amount, you: true }]);
    setFeed((prev) => [{ user: "u/peetan_42", credits: amount, t: Date.now(), you: true }, ...prev].slice(0, 6));
    setMyBid("");
  };
  const minNext = ((top == null ? void 0 : top.credits) || 0) + 500;
  return /* @__PURE__ */ React.createElement("div", { className: "auction" }, /* @__PURE__ */ React.createElement("div", { className: "auc-topnav" }, /* @__PURE__ */ React.createElement("button", { className: "back-btn", onClick: onBack }, /* @__PURE__ */ React.createElement("span", { className: "bk-glyph" }, "\u25C0"), /* @__PURE__ */ React.createElement("span", null, "COLLECTION")), /* @__PURE__ */ React.createElement("div", { className: "auc-title" }, /* @__PURE__ */ React.createElement("span", { className: "at-big" }, "AUCTION HOUSE"), /* @__PURE__ */ React.createElement("span", { className: "at-sub" }, "LOT 0451 \xB7 LIVE BIDDING")), /* @__PURE__ */ React.createElement("div", { className: "auc-topright" }, /* @__PURE__ */ React.createElement("button", { className: "auc-share", onClick: onSharePost }, /* @__PURE__ */ React.createElement("span", null, "\u2197"), /* @__PURE__ */ React.createElement("span", null, "SHARE POST")), /* @__PURE__ */ React.createElement("div", { className: "auc-timer" }, /* @__PURE__ */ React.createElement("span", { className: "aut-lbl" }, "CLOSES IN"), /* @__PURE__ */ React.createElement("span", { className: "aut-val" }, fmtTime(timeLeft))))), /* @__PURE__ */ React.createElement("div", { className: "auc-grid" }, /* @__PURE__ */ React.createElement("div", { className: "auc-feature", style: {
    "--pos-c": posColor,
    "--tier-c": pilot.color
  } }, /* @__PURE__ */ React.createElement("div", { className: "afeat-tier" }, /* @__PURE__ */ React.createElement("span", { className: "aft-pill" }, (_b = pilot.tier) == null ? void 0 : _b.toUpperCase(), " TIER"), /* @__PURE__ */ React.createElement(StarsA, { count: pilot.rarity, size: 18 })), /* @__PURE__ */ React.createElement("div", { className: "afeat-stage" }, /* @__PURE__ */ React.createElement("div", { className: "afeat-spotlight" }), /* @__PURE__ */ React.createElement("div", { className: "afeat-scan" }), /* @__PURE__ */ React.createElement("div", { className: "afeat-pos", style: { background: posColor } }, pilot.position), /* @__PURE__ */ React.createElement("div", { className: "afeat-ovr" }, /* @__PURE__ */ React.createElement("span", null, pilot.overall), /* @__PURE__ */ React.createElement("em", null, "OVR")), /* @__PURE__ */ React.createElement("img", { src: "assets/idle.gif", className: "afeat-sprite", alt: "" }), /* @__PURE__ */ React.createElement("div", { className: "afeat-floor" }), /* @__PURE__ */ React.createElement("div", { className: "afeat-shadow" })), /* @__PURE__ */ React.createElement("div", { className: "afeat-name" }, /* @__PURE__ */ React.createElement("span", { className: "afn-big" }, pilot.name), /* @__PURE__ */ React.createElement("span", { className: "afn-call" }, "\u300C", pilot.callsign, "\u300D \xB7 ", pilot.jp)), /* @__PURE__ */ React.createElement("div", { className: "afeat-stats" }, /* @__PURE__ */ React.createElement(AuctionStat, { lbl: "SPD", val: pilot.spd, color: "#22d3ee" }), /* @__PURE__ */ React.createElement(AuctionStat, { lbl: "DEX", val: pilot.dex, color: "#a855f7" }), /* @__PURE__ */ React.createElement(AuctionStat, { lbl: "JMP", val: pilot.jmp, color: "#22c55e" }), /* @__PURE__ */ React.createElement(AuctionStat, { lbl: "ACC", val: pilot.acc, color: "#fb923c" })), /* @__PURE__ */ React.createElement("div", { className: `afeat-ability ${pilot.ability ? "has" : "none"}` }, /* @__PURE__ */ React.createElement("span", { className: "afa-lbl" }, "ABILITY"), /* @__PURE__ */ React.createElement("span", { className: "afa-val" }, pilot.ability || "NO ABILITY")), /* @__PURE__ */ React.createElement("div", { className: "afeat-meta" }, /* @__PURE__ */ React.createElement("div", { className: "afm-cell" }, /* @__PURE__ */ React.createElement("span", { className: "afm-lbl" }, "Lv"), /* @__PURE__ */ React.createElement("span", { className: "afm-val" }, pilot.level, /* @__PURE__ */ React.createElement("em", null, "/", pilot.maxLevel))), /* @__PURE__ */ React.createElement("div", { className: "afm-cell" }, /* @__PURE__ */ React.createElement("span", { className: "afm-lbl" }, "TIER"), /* @__PURE__ */ React.createElement("span", { className: "afm-val" }, (_c = pilot.tier) == null ? void 0 : _c.toUpperCase())), /* @__PURE__ */ React.createElement("div", { className: "afm-cell" }, /* @__PURE__ */ React.createElement("span", { className: "afm-lbl" }, "ROLE"), /* @__PURE__ */ React.createElement("span", { className: "afm-val" }, pilot.role)), /* @__PURE__ */ React.createElement("div", { className: "afm-cell" }, /* @__PURE__ */ React.createElement("span", { className: "afm-lbl" }, "LISTED BY"), /* @__PURE__ */ React.createElement("span", { className: "afm-val small" }, "u/HangarBot")))), /* @__PURE__ */ React.createElement("div", { className: "auc-bidpanel" }, /* @__PURE__ */ React.createElement("div", { className: "ab-current" }, /* @__PURE__ */ React.createElement("span", { className: "abc-lbl" }, "CURRENT HIGH BID"), /* @__PURE__ */ React.createElement("span", { className: "abc-val" }, /* @__PURE__ */ React.createElement("span", { className: "coin" }, "\u25C9"), top == null ? void 0 : top.credits.toLocaleString()), /* @__PURE__ */ React.createElement("span", { className: "abc-by" }, "by ", /* @__PURE__ */ React.createElement("b", null, top == null ? void 0 : top.user))), /* @__PURE__ */ React.createElement("div", { className: "ab-place" }, /* @__PURE__ */ React.createElement("div", { className: "abp-row" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      className: "abp-input",
      placeholder: `MIN ${minNext.toLocaleString()}`,
      value: myBid,
      onChange: (e) => setMyBid(e.target.value)
    }
  ), /* @__PURE__ */ React.createElement("button", { className: "abp-btn", onClick: placeBid }, /* @__PURE__ */ React.createElement("span", null, "\u26A1"), /* @__PURE__ */ React.createElement("span", null, "PLACE BID"))), /* @__PURE__ */ React.createElement("div", { className: "abp-shortcuts" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setMyBid(String(minNext)) }, "+500"), /* @__PURE__ */ React.createElement("button", { onClick: () => setMyBid(String(minNext + 1500)) }, "+2k"), /* @__PURE__ */ React.createElement("button", { onClick: () => setMyBid(String(minNext + 4500)) }, "+5k"), /* @__PURE__ */ React.createElement("button", { onClick: () => setMyBid(String(Math.max(minNext, ((top == null ? void 0 : top.credits) || 0) + 1e4))) }, "+10k")), /* @__PURE__ */ React.createElement("div", { className: "abp-bal" }, /* @__PURE__ */ React.createElement("span", null, "YOUR BALANCE"), /* @__PURE__ */ React.createElement("b", null, /* @__PURE__ */ React.createElement("span", { className: "coin" }, "\u25C9"), " 24,800"))), /* @__PURE__ */ React.createElement("div", { className: "ab-feed" }, /* @__PURE__ */ React.createElement("div", { className: "abf-h" }, /* @__PURE__ */ React.createElement("span", { className: "abf-pulse" }), /* @__PURE__ */ React.createElement("span", null, "LIVE FEED")), feed.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "abf-empty" }, "WAITING FOR NEXT BID...") : feed.map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: `abf-row ${f.you ? "you" : ""} ${i === 0 ? "newest" : ""}` }, /* @__PURE__ */ React.createElement("span", { className: "abf-user" }, f.user), /* @__PURE__ */ React.createElement("span", { className: "abf-bid" }, "+", /* @__PURE__ */ React.createElement("span", { className: "coin" }, "\u25C9"), f.credits.toLocaleString())))), /* @__PURE__ */ React.createElement("div", { className: "ab-history" }, /* @__PURE__ */ React.createElement("div", { className: "abh-h" }, /* @__PURE__ */ React.createElement("span", null, "BID HISTORY \xB7 ", bids.length, " BIDS"), /* @__PURE__ */ React.createElement("span", { className: "abh-sort" }, "SORT BY HIGH \u25BE")), /* @__PURE__ */ React.createElement("div", { className: "abh-list" }, sorted.map((b, i) => /* @__PURE__ */ React.createElement(BidRow, { key: `${b.user}-${i}`, idx: i, bid: b, isLeader: i === 0 })))))));
}
window.AuctionView = AuctionView;

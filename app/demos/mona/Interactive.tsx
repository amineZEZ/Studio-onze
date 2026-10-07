"use client";

import { useEffect, useState } from "react";
import s from "./mona.module.css";
import { CONE, MONA, SCOOP } from "./Logo";

/** Construction du logo : grille, cercles et tracés apparaissent, puis les couleurs remplissent la forme. */
export function Construction() {
  const [run, setRun] = useState(0);
  const [guides, setGuides] = useState(true);
  return (
    <div className={s.build}>
      <svg key={run} viewBox="0 0 100 120" className={s.buildSvg} role="img" aria-label="Construction du logo Mona : un cercle pour la boule, un triangle pour le cornet">
        <defs><clipPath id="c-build"><path d={CONE} /></clipPath></defs>
        {guides && (
          <g className={s.guides}>
            {[10, 30, 50, 70, 90].map((x) => <line key={`v${x}`} x1={x} y1="2" x2={x} y2="118" />)}
            {[12, 37, 62, 87, 112].map((y) => <line key={`h${y}`} x1="2" y1={y} x2="98" y2={y} />)}
            <circle cx="50" cy="46" r="36" className={s.gMain} />
            <circle cx="50" cy="46" r="18" />
            <circle cx="36" cy="30" r="8" />
            <path d={CONE} className={s.gMain} fill="none" />
            <line x1="50" y1="2" x2="50" y2="118" className={s.gAxis} />
          </g>
        )}
        <g className={s.fills}>
          <path d={CONE} fill={MONA.caramel} />
          <g clipPath="url(#c-build)" stroke={MONA.chocolat} strokeWidth="2.4" opacity=".55">
            {[-30, -15, 0, 15, 30, 45].map((o) => <line key={`a${o}`} x1={20 + o} y1="60" x2={60 + o} y2="120" />)}
            {[-30, -15, 0, 15, 30, 45].map((o) => <line key={`b${o}`} x1={80 - o} y1="60" x2={40 - o} y2="120" />)}
          </g>
          <path d={SCOOP} fill={MONA.fraise} className={s.scoopFill} />
          <ellipse cx="36" cy="30" rx="7" ry="4.5" fill="#fff" opacity=".55" transform="rotate(-30 36 30)" />
        </g>
        <path d={SCOOP} className={s.trace} />
      </svg>
      <div className={s.buildCtl}>
        <button onClick={() => setRun((r) => r + 1)}>↻ Rejouer la construction</button>
        <label><input type="checkbox" checked={guides} onChange={(e) => setGuides(e.target.checked)} /> Afficher la grille</label>
      </div>
    </div>
  );
}

const PALETTE = [
  { name: "Fraise", hex: MONA.fraise, use: "Couleur signature", dark: false },
  { name: "Chocolat", hex: MONA.chocolat, use: "Textes et logo", dark: true },
  { name: "Pistache", hex: MONA.pistache, use: "Parfums du moment", dark: false },
  { name: "Caramel", hex: MONA.caramel, use: "Cornet, accents", dark: false },
  { name: "Vanille", hex: MONA.vanille, use: "Fonds", dark: false },
];

/** Palette : un clic copie le code couleur. */
export function Palette() {
  const [copied, setCopied] = useState("");
  useEffect(() => { if (!copied) return; const id = setTimeout(() => setCopied(""), 1600); return () => clearTimeout(id); }, [copied]);
  const copy = async (hex: string) => { try { await navigator.clipboard.writeText(hex); } catch {} setCopied(hex); };
  return (
    <div className={s.palette}>
      {PALETTE.map((c, i) => (
        <button key={c.hex} className={s.swatch} style={{ background: c.hex, color: c.dark ? MONA.vanille : MONA.chocolat, ["--d" as string]: `${i * 0.07}s` }} onClick={() => copy(c.hex)} data-r aria-label={`Copier ${c.name} ${c.hex}`}>
          <b>{c.name}</b>
          <span>{copied === c.hex ? "Copié ✓" : c.hex}</span>
          <small>{c.use}</small>
        </button>
      ))}
    </div>
  );
}

/** Spécimen typographique modifiable. */
export function Specimen() {
  const [t, setT] = useState("Fraise des bois & basilic");
  return (
    <div className={s.specimen}>
      <label className={s.specLabel}>Écris un parfum pour tester la typo<input value={t} maxLength={40} onChange={(e) => setT(e.target.value)} /></label>
      <p className={s.specBig}>{t || "Ton parfum ici"}</p>
      <div className={s.specRow}>
        <div><small>Titres · Bagel Fat One</small><p className={s.specD}>Aa Bb Cc 123</p></div>
        <div><small>Textes · Bricolage Grotesque</small><p className={s.specB}>Des glaces faites chaque matin avec des fruits de saison, du lait entier et beaucoup de patience.</p></div>
      </div>
    </div>
  );
}

/** Carte de fidélité : chaque clic tamponne une case, la 10e glace est offerte. */
export function LoyaltyCard() {
  const [n, setN] = useState(3);
  return (
    <div className={s.loyal}>
      <div className={s.loyalHead}><b>Carte gourmande</b><small>La 10e glace est offerte</small></div>
      <div className={s.stamps}>
        {Array.from({ length: 10 }, (_, i) => (
          <button key={i} className={i < n ? `${s.stamp} ${s.stampOn}` : s.stamp} onClick={() => setN(i < n ? i : i + 1)} aria-label={`Case ${i + 1}${i < n ? " tamponnée" : ""}`}>
            {i === 9 ? "🎁" : i < n ? "♥" : ""}
          </button>
        ))}
      </div>
      <p className={s.loyalFoot}>{n >= 10 ? "Bravo, ta glace est offerte !" : `Encore ${10 - n} glace${10 - n > 1 ? "s" : ""} avant la tienne offerte · clique pour tamponner`}</p>
    </div>
  );
}

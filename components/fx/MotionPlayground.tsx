"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mini logiciel d'animation jouable : un pixel traverse la scène entre deux images-clés.
 * Le visiteur glisse la tête de lecture, change la courbe d'accélération et active la « pelure d'oignon »
 * (les positions fantômes, comme dans After Effects). C'est exactement ce qu'on règle pour ses vidéos.
 */

const EASES = {
  "Linéaire": (x: number) => x,
  "Douce": (x: number) => 1 - Math.pow(1 - x, 3),
  "Rebond": (x: number) => {
    const n = 7.5625, d = 2.75;
    if (x < 1 / d) return n * x * x;
    if (x < 2 / d) return n * (x -= 1.5 / d) * x + 0.75;
    if (x < 2.5 / d) return n * (x -= 2.25 / d) * x + 0.9375;
    return n * (x -= 2.625 / d) * x + 0.984375;
  },
  "Élastique": (x: number) => (x === 0 || x === 1 ? x : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1),
} as const;
type EaseName = keyof typeof EASES;
const FRAMES = 60, DUR = 1.6;

export function MotionPlayground() {
  const [ease, setEase] = useState<EaseName>("Rebond");
  const [onion, setOnion] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [t, setT] = useState(0);
  const tl = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const tRef = useRef(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setPlaying(false); setT(1); tRef.current = 1; }
  }, []);

  useEffect(() => {
    if (!playing) return;
    let raf = 0, last = performance.now(), hold = 0;
    const loop = (now: number) => {
      const dt = (now - last) / 1000; last = now;
      if (!drag.current) {
        if (tRef.current >= 1) { hold += dt; if (hold > 0.7) { tRef.current = 0; hold = 0; } }
        else tRef.current = Math.min(1, tRef.current + dt / DUR);
        setT(tRef.current);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const seek = (clientX: number) => {
    const r = tl.current!.getBoundingClientRect();
    tRef.current = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    setT(tRef.current);
  };

  const f = EASES[ease];
  const at = (x: number) => {
    const v = f(x);
    return { left: 6 + v * 76, rot: v * 180, sq: 1 + Math.sin(Math.min(1, x) * Math.PI) * 0.25 };
  };
  const cur = at(t);
  const ghosts = onion ? Array.from({ length: 9 }, (_, i) => at(i / 8)) : [];
  // Courbe d'accélération dessinée dans un carré 100 × 100 (le haut = arrivée).
  const curve = Array.from({ length: 61 }, (_, i) => { const x = i / 60; return `${x * 100},${100 - f(x) * 70 - 15}`; }).join(" ");

  return (
    <div className="pg">
      <div className="pg-stage" data-cursor="Regarde">
        <span className="pg-meta tl">Composition 1 · 1080 × 1080</span>
        <span className="pg-meta tr">Image {String(Math.round(t * FRAMES)).padStart(3, "0")} / {FRAMES}</span>
        {ghosts.map((g, i) => <i key={i} className="pg-ghost" style={{ left: `${g.left}%`, transform: `translate(-50%,-50%) rotate(${g.rot}deg)` }} />)}
        <i className="pg-pixel" style={{ left: `${cur.left}%`, transform: `translate(-50%,-50%) rotate(${cur.rot}deg) scale(${cur.sq},${2 - cur.sq})` }} />
        <span className="pg-meta bl">Position X : {Math.round(cur.left * 10.8)} px</span>
        <span className="pg-meta br">Rotation : {Math.round(cur.rot)}°</span>
      </div>

      <div className="pg-panel">
        <div className="pg-controls">
          <button type="button" className="pg-btn" onClick={() => setPlaying((p) => !p)} data-cursor={playing ? "Pause" : "Lecture"} aria-label={playing ? "Mettre en pause" : "Lire l'animation"}>
            {playing ? "❚❚" : "▶"}
          </button>
          <div className="pg-eases" role="radiogroup" aria-label="Courbe d'accélération">
            {(Object.keys(EASES) as EaseName[]).map((k) => (
              <button key={k} type="button" role="radio" aria-checked={ease === k} className={ease === k ? "chip on" : "chip"} onClick={() => { setEase(k); tRef.current = 0; setPlaying(true); }}>{k}</button>
            ))}
          </div>
          <label className="pg-onion"><input type="checkbox" checked={onion} onChange={(e) => setOnion(e.target.checked)} /> Pelure d&apos;oignon</label>
        </div>

        <div className="pg-bottom">
          <div
            ref={tl}
            className="pg-tl"
            role="slider"
            tabIndex={0}
            aria-label="Tête de lecture"
            aria-valuemin={0}
            aria-valuemax={FRAMES}
            aria-valuenow={Math.round(t * FRAMES)}
            data-cursor="Glisse"
            onPointerDown={(e) => { drag.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); seek(e.clientX); }}
            onPointerMove={(e) => drag.current && seek(e.clientX)}
            onPointerUp={() => { drag.current = false; }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") { setPlaying(false); tRef.current = Math.min(1, Math.max(0, tRef.current + (e.key === "ArrowRight" ? 1 : -1) / FRAMES)); setT(tRef.current); }
            }}
          >
            <div className="pg-ruler">{Array.from({ length: 13 }, (_, i) => <span key={i}>{i * 5}</span>)}</div>
            <div className="pg-track"><b className="kf" style={{ left: "0%" }} /><b className="kf" style={{ left: "100%" }} /></div>
            <div className="pg-head" style={{ left: `${t * 100}%` }} />
          </div>
          <svg className="pg-graph" viewBox="0 0 100 100" aria-label={`Courbe ${ease}`} role="img">
            <path d="M0 85 H100 M0 15 H100" className="g-grid" />
            <polyline points={curve} className="g-curve" />
            <circle cx={t * 100} cy={100 - f(t) * 70 - 15} r="4" className="g-dot" />
          </svg>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

/** Animation du haut de page : un logo qui se construit sur une timeline de montage, avec le compteur de temps. */
export function Timeline() {
  const tc = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t0 = performance.now(); let raf = 0;
    const tick = () => {
      const s = ((performance.now() - t0) / 1000) % 4, f = Math.floor((s % 1) * 30);
      if (tc.current) tc.current.textContent = `00:00:0${Math.floor(s)}:${String(f).padStart(2, "0")}`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const track = (label: string, clip: [number, number], keys: number[], sound = false) => (
    <div className="trk">
      <span>{label}</span>
      <div className="lane">
        <div className={sound ? "clip sound" : "clip"} style={{ left: `${clip[0]}%`, width: `${clip[1]}%` }} />
        {keys.map((k) => <b key={k} className="kf" style={{ left: `${k}%` }} />)}
      </div>
    </div>
  );

  return (
    <div className="edit" role="img" aria-label="Animation : le logo Au Pixel Près se construit sur une timeline de montage">
      <div className="stage">
        <span className="tc" ref={tc}>00:00:00:00</span>
        <span className="res">1080 × 1920 · 30 i/s</span>
        <div className="safe" />
        <div className="logo"><div className="shape" /><div className="word">au pixel près<i className="kd" aria-hidden="true" /></div></div>
      </div>
      <div className="tl">
        {track("Forme", [0, 96], [4, 15, 55, 80])}
        {track("Texte", [18, 70], [20, 45, 86])}
        {track("Son", [0, 100], [], true)}
        <div className="head" />
      </div>
    </div>
  );
}

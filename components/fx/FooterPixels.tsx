"use client";

import { useEffect, useRef } from "react";

/** Grand logo de bas de page dessiné en grille de pixels : ceux qui sont près de la souris s'allument en rouge. */
export function FooterPixels({ fontFamily }: { fontFamily: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!, ctx = cv.getContext("2d")!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pts: { x: number; y: number; red: boolean; heat: number }[] = [], cell = 8, raf = 0, mx = -999, my = -999, visible = false;

    const build = async () => {
      await document.fonts.load(`900 100px ${fontFamily}`).catch(() => {});
      const W = cv.clientWidth, dpr = Math.min(devicePixelRatio, 2);
      cell = Math.max(5, Math.round(W / 150));
      const off = document.createElement("canvas"), g = off.getContext("2d", { willReadFrequently: true })!;
      const fs = 100; g.font = `900 ${fs}px ${fontFamily}`;
      const tw = g.measureText("au pixel près").width + fs * 0.4;
      const cols = Math.floor(W / cell), scale = cols / tw, rows = Math.ceil(fs * 1.0 * scale);
      off.width = cols; off.height = rows;
      g.font = `900 ${fs * scale}px ${fontFamily}`; g.fillStyle = "#000"; g.fillText("au pixel près", 0, fs * 0.82 * scale);
      const lw = g.measureText("au pixel près").width, d = fs * 0.22 * scale;
      g.fillStyle = "#f00"; g.fillRect(lw + fs * 0.05 * scale, fs * 0.82 * scale - d, d, d);
      const data = g.getImageData(0, 0, cols, rows).data;
      pts = [];
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) { const i = (y * cols + x) * 4; if (data[i + 3] > 120) pts.push({ x, y, red: data[i] > 200 && data[i + 1] < 80, heat: 0 }); }
      cv.width = W * dpr; cv.height = rows * cell * dpr; cv.style.height = `${rows * cell}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      raf = 0;
      ctx.clearRect(0, 0, cv.width, cv.height);
      let hot = false;
      for (const p of pts) {
        const cx = p.x * cell + cell / 2, cy = p.y * cell + cell / 2;
        const target = Math.max(0, 1 - Math.hypot(cx - mx, cy - my) / 110);
        p.heat += (target - p.heat) * 0.18;
        if (p.heat > 0.01) hot = true;
        const s = (cell - 1.5) * (1 - p.heat * 0.45);
        ctx.fillStyle = p.red || p.heat > 0.35 ? "#FF3D17" : "#F2F2EF";
        ctx.globalAlpha = p.red ? 1 : 0.9 - p.heat * 0.2;
        ctx.fillRect(cx - s / 2, cy - s / 2 - p.heat * 6, s, s);
      }
      ctx.globalAlpha = 1;
      if (visible && hot && !reduced) raf = requestAnimationFrame(draw);
    };

    const mv = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; if (!raf && visible && !reduced) raf = requestAnimationFrame(draw); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(cv);
    addEventListener("pointermove", mv, { passive: true });
    build();
    const ro = new ResizeObserver(() => build()); ro.observe(cv.parentElement!);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); removeEventListener("pointermove", mv); };
  }, [fontFamily]);

  return <canvas ref={ref} className="foot-pixels" aria-hidden="true" />;
}

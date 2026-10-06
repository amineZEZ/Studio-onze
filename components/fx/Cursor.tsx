"use client";

import { useEffect, useRef } from "react";

/**
 * Curseur « réticule » : un pixel rouge, deux lignes de visée et la position en pixels.
 * Sur un lien ou un bouton, il s'agrandit et affiche une étiquette (data-cursor="Voir").
 * Uniquement avec une souris ; sur écran tactile, rien ne change.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!, label = el.querySelector<HTMLSpanElement>(".cur-label")!, xy = el.querySelector<HTMLSpanElement>(".cur-xy")!;
    document.documentElement.classList.add("has-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = (e.target as Element).closest?.("a,button,summary,[data-cursor],input,select,textarea,label");
      el.classList.toggle("is-hover", !!t);
      el.classList.toggle("is-text", !!t && /INPUT|SELECT|TEXTAREA/.test(t.tagName));
      label.textContent = t?.getAttribute("data-cursor") ?? "";
    };
    const loop = () => {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
      el.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      xy.textContent = `${String(Math.round(x)).padStart(4, "0")} · ${String(Math.round(y)).padStart(4, "0")}`;
      raf = requestAnimationFrame(loop);
    };
    const leave = () => el.classList.add("is-out"), enter = () => el.classList.remove("is-out");
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);
  return (
    <div ref={ref} className="cur" aria-hidden="true">
      <i className="cur-dot" />
      <span className="cur-label" />
      <span className="cur-xy" />
    </div>
  );
}

"use client";

import { useEffect } from "react";

/**
 * Fait apparaître en douceur les éléments marqués data-r quand ils entrent à l'écran
 * (ajoute l'attribut data-in). Sans JavaScript, ils restent visibles : le style caché
 * ne s'applique qu'une fois la classe « js-r » posée sur la page.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("js-r");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).dataset.in = ""; io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    const scan = () => document.querySelectorAll("[data-r]:not([data-in])").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan); mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); root.classList.remove("js-r"); };
  }, []);
  return null;
}

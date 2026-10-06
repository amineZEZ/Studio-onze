"use client";

import { useEffect } from "react";

/**
 * Défilement fluide (Lenis) synchronisé avec les animations au défilement (GSAP ScrollTrigger).
 * La vitesse de défilement est exposée en CSS (--v) pour faire pencher le bandeau défilant.
 * Désactivé si l'utilisateur a demandé moins d'animations.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop = () => {};
    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -20 } });
      const root = document.documentElement;
      lenis.on("scroll", (l: { velocity: number }) => {
        ScrollTrigger.update();
        root.style.setProperty("--v", String(Math.max(-30, Math.min(30, l.velocity))));
      });
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      stop = () => { gsap.ticker.remove(tick); lenis.destroy(); };
    })();
    return () => stop();
  }, []);
  return null;
}

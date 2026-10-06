"use client";

import { useEffect } from "react";

/**
 * Toutes les animations au défilement de la page, déclarées dans le HTML par des attributs :
 * - data-split : le titre monte mot par mot ;
 * - data-reveal : le bloc apparaît en glissant ;
 * - data-count : le nombre compte jusqu'à sa valeur ;
 * - data-parallax="0.2" : l'élément bouge plus ou moins vite que la page ;
 * - data-hscroll : la section se bloque et défile à l'horizontale (ordinateur seulement) ;
 * - data-magnetic : le bouton est attiré par la souris.
 * Sans JavaScript, ou avec « moins d'animations », tout reste simplement visible.
 */
export function Motion() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let revert = () => {};
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);

      // Découpe les textes en mots (en gardant les balises comme <em>).
      const split = (el: Element) => {
        const walk = (node: Node) => {
          [...node.childNodes].forEach((ch) => {
            if (ch.nodeType === 3) {
              const frag = document.createDocumentFragment();
              (ch.textContent ?? "").split(/(\s+)/).forEach((part) => {
                if (!part) return;
                if (/^\s+$/.test(part)) frag.append(part);
                else { const o = document.createElement("span"); o.className = "w"; const i = document.createElement("span"); i.className = "wi"; i.textContent = part; o.append(i); frag.append(o); }
              });
              ch.replaceWith(frag);
            } else if (ch.nodeType === 1 && !(ch as Element).classList.contains("w")) walk(ch);
          });
        };
        walk(el);
        return el.querySelectorAll(".wi");
      };

      const ctx = gsap.context(() => {
        document.querySelectorAll("[data-split]").forEach((el) => {
          const words = split(el);
          gsap.from(words, { yPercent: 115, rotate: 4, duration: 1.1, ease: "expo.out", stagger: 0.045, scrollTrigger: { trigger: el, start: "top 88%" } });
        });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, { y: 50, autoAlpha: 0, duration: 1.1, ease: "expo.out", delay: Number(el.dataset.reveal) || 0, scrollTrigger: { trigger: el, start: "top 90%" } });
        });
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count), fmt = new Intl.NumberFormat("fr-FR"), o = { v: 0 };
          gsap.to(o, { v: end, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 92%" }, onUpdate: () => { el.textContent = fmt.format(Math.round(o.v)).replace(/ | /g, " "); } });
        });
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.to(el, { yPercent: Number(el.dataset.parallax) * -100, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
        });
        const mm = gsap.matchMedia();
        mm.add("(min-width: 900px)", () => {
          gsap.utils.toArray<HTMLElement>("[data-hscroll]").forEach((sec) => {
            const track = sec.querySelector<HTMLElement>(".htrack")!;
            const dist = () => track.scrollWidth - sec.clientWidth;
            gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true } });
          });
        });
      });

      // Boutons magnétiques.
      const mags = [...document.querySelectorAll<HTMLElement>("[data-magnetic]")];
      const offs = mags.map((el) => {
        const mv = (e: PointerEvent) => { const r = el.getBoundingClientRect(); gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.5, ease: "power3.out" }); };
        const lv = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,0.4)" });
        el.addEventListener("pointermove", mv); el.addEventListener("pointerleave", lv);
        return () => { el.removeEventListener("pointermove", mv); el.removeEventListener("pointerleave", lv); };
      });

      // Les polices et images peuvent changer les hauteurs : on recalcule une fois tout chargé.
      document.fonts.ready.then(() => ScrollTrigger.refresh());
      revert = () => { ctx.revert(); offs.forEach((f) => f()); };
    })();
    return () => revert();
  }, []);
  return null;
}

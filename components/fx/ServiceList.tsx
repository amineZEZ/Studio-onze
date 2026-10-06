"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/site";

/** Mini animations qui illustrent chaque service (dans l'aperçu qui suit la souris, ou sous le titre sur mobile). */
function Preview({ kind }: { kind: string }) {
  if (kind === "logo")
    return (
      <div className="pv pv-logo" aria-hidden="true">
        {Array.from({ length: 25 }, (_, i) => {
          const on = [0, 1, 2, 5, 7, 10, 11, 12, 15, 20].includes(i);
          return <i key={i} className={on ? "on" : ""} style={{ animationDelay: `${(i % 5) * 0.08 + Math.floor(i / 5) * 0.06}s` }} />;
        })}
        <i className="dot" />
      </div>
    );
  if (kind === "motion") return <div className="pv pv-video" aria-hidden="true"><video src="/video/motion.mp4" poster="/video/motion.jpg" muted loop playsInline autoPlay preload="metadata" /></div>;
  if (kind === "web")
    return (
      <div className="pv pv-web" aria-hidden="true">
        <div className="bar"><i /><i /><i /></div>
        <div className="scroll"><b className="h" /><b /><b className="s" /><b /><b className="img" /><b /><b className="s" /><b className="h" /><b /><b className="img" /></div>
      </div>
    );
  return (
    <div className="pv pv-saas" aria-hidden="true">
      <span>Ventes</span>
      <div className="bars">{[38, 62, 45, 80, 58, 92, 70].map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />)}</div>
    </div>
  );
}

const KINDS = ["logo", "motion", "web", "saas"];

export function ServiceList() {
  const [active, setActive] = useState<number | null>(null);
  const pv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const mv = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      cx += (x - cx) * 0.14; cy += (y - cy) * 0.14;
      if (pv.current) pv.current.style.transform = `translate3d(${cx + 28}px,${cy - 110}px,0) rotate(${(x - cx) * 0.04}deg)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", mv, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", mv); };
  }, []);

  return (
    <div className="svc-list" onPointerLeave={() => setActive(null)}>
      {services.map((s, i) => (
        <article key={s.title} className={active === i ? "svc-row on" : "svc-row"} onPointerEnter={() => setActive(i)} data-cursor="Voir">
          <span className="svc-n">0{i + 1}</span>
          <h3 className="svc-t">{s.title}</h3>
          <p className="svc-d">{s.text}</p>
          <ul className="svc-tags">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
          <div className="svc-inline"><Preview kind={KINDS[i]} /></div>
        </article>
      ))}
      <div ref={pv} className={active === null ? "svc-float" : "svc-float show"} aria-hidden="true">
        {active !== null && <Preview kind={KINDS[active]} />}
      </div>
    </div>
  );
}

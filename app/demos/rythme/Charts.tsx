"use client";

import { useEffect, useRef, useState } from "react";
import s from "./rythme.module.css";
import { eur } from "./data";

/** Largeur réelle d'un conteneur (les graphiques sont dessinés en pixels, sans déformer le texte). */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(600);
  useEffect(() => {
    const el = ref.current!; const ro = new ResizeObserver(([e]) => setW(Math.max(260, e.contentRect.width)));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

const niceMax = (v: number) => { const step = v > 4000 ? 1000 : 500; return Math.ceil(v / step) * step; };

/** Courbe du chiffre d'affaires : cette année (corail) et l'an dernier (bleu), avec réticule et infobulle au survol. */
export function RevenueChart({ labels, current, previous }: { labels: string[]; current: number[]; previous: number[] }) {
  const [box, W] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const H = 260, m = { l: 56, r: 20, t: 16, b: 30 };
  const max = niceMax(Math.max(...current, ...previous));
  const x = (i: number) => m.l + (i / (labels.length - 1)) * (W - m.l - m.r);
  const y = (v: number) => m.t + (1 - v / max) * (H - m.t - m.b);
  const path = (d: number[]) => d.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join("");
  const ticks = Array.from({ length: 6 }, (_, i) => (max / 5) * i);
  const last = current.length - 1;

  const onMove = (e: React.PointerEvent) => {
    const r = (e.currentTarget as SVGElement).getBoundingClientRect();
    const i = Math.round(((e.clientX - r.left - m.l) / (W - m.l - m.r)) * (labels.length - 1));
    setHover(Math.max(0, Math.min(labels.length - 1, i)));
  };

  return (
    <div ref={box} className={s.chartBox}>
      <svg width={W} height={H} onPointerMove={onMove} onPointerLeave={() => setHover(null)} role="img" aria-label={`Chiffre d'affaires mensuel sur 12 mois, de ${eur(current[0])} à ${eur(current[last])}`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} className={s.grid} />
            <text x={m.l - 10} y={y(t) + 4} textAnchor="end" className={s.axis}>{t ? `${t / 1000} k€` : "0"}</text>
          </g>
        ))}
        {labels.map((l, i) => (W >= 520 || (last - i) % 2 === 0) && <text key={l} x={x(i)} y={H - 8} textAnchor="middle" className={s.axis}>{l}</text>)}
        <path d={`${path(current)}L${x(last)},${y(0)}L${x(0)},${y(0)}Z`} className={s.area} />
        <path d={path(previous)} className={s.linePrev} />
        <path d={path(current)} className={s.lineCur} />
        <circle cx={x(last)} cy={y(current[last])} r={5} className={s.endDot} />
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={m.t} y2={H - m.b} className={s.cross} />
            <circle cx={x(hover)} cy={y(previous[hover])} r={4.5} className={s.dotPrev} />
            <circle cx={x(hover)} cy={y(current[hover])} r={5} className={s.dotCur} />
          </g>
        )}
        <rect x={m.l} y={m.t} width={W - m.l - m.r} height={H - m.t - m.b} fill="transparent" />
      </svg>
      {hover !== null && (
        <div className={s.tip} style={{ left: Math.min(W - 170, Math.max(0, x(hover) - 85)), top: Math.max(0, y(current[hover]) - 96) }}>
          <b>{labels[hover]}</b>
          <span><i className={s.kCur} />Cette année <b>{eur(current[hover])}</b></span>
          <span><i className={s.kPrev} />L&apos;an dernier <b>{eur(previous[hover])}</b></span>
        </div>
      )}
    </div>
  );
}

/** Colonnes : séances par jour de la semaine (le jour le plus chargé est étiqueté, les autres au survol). */
export function WeekBars({ labels, values, today }: { labels: string[]; values: number[]; today: number | null }) {
  const [box, W] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const H = 190, m = { l: 8, r: 8, t: 24, b: 28 };
  const max = Math.max(4, ...values), band = (W - m.l - m.r) / labels.length, bw = Math.min(24, band * 0.5);
  const top = values.indexOf(Math.max(...values));
  const y = (v: number) => m.t + (1 - v / max) * (H - m.t - m.b);
  return (
    <div ref={box} className={s.chartBox}>
      <svg width={W} height={H} role="img" aria-label={`Séances par jour : ${labels.map((l, i) => `${l} ${values[i]}`).join(", ")}`}>
        <line x1={m.l} x2={W - m.r} y1={y(0)} y2={y(0)} className={s.grid} />
        {values.map((v, i) => {
          const cx = m.l + band * i + band / 2, h = y(0) - y(v), r = Math.min(4, h);
          return (
            <g key={i} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}>
              <rect x={cx - band / 2} y={m.t} width={band} height={H - m.t - m.b} fill="transparent" />
              {v > 0 && <path d={`M${cx - bw / 2},${y(0)}V${y(v) + r}Q${cx - bw / 2},${y(v)} ${cx - bw / 2 + r},${y(v)}H${cx + bw / 2 - r}Q${cx + bw / 2},${y(v)} ${cx + bw / 2},${y(v) + r}V${y(0)}Z`} className={i === today ? s.barToday : hover === i ? s.barHover : s.bar} style={{ ["--h" as string]: `${h}px` }} />}
              {(i === top || hover === i) && <text x={cx} y={y(v) - 8} textAnchor="middle" className={s.val}>{v}</text>}
              <text x={cx} y={H - 8} textAnchor="middle" className={i === today ? s.axisStrong : s.axis}>{labels[i]}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Mini courbe de tendance pour les tuiles (gris, dernier point en couleur). */
export function Spark({ data }: { data: number[] }) {
  const W = 96, H = 30, max = Math.max(...data), min = Math.min(...data);
  const x = (i: number) => 2 + (i / (data.length - 1)) * (W - 6), y = (v: number) => 3 + (1 - (v - min) / (max - min || 1)) * (H - 6);
  return (
    <svg width={W} height={H} aria-hidden="true" className={s.spark}>
      <path d={data.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join("")} />
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r={3.5} />
    </svg>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import s from "./odette.module.css";
import { batches, dayNames, euro, fmtH, hours, parisNow, products, type Product } from "./data";

/** Heure de Paris, rafraîchie toutes les 30 s (null avant le premier rendu côté navigateur). */
function useNow() {
  const [now, setNow] = useState<{ h: number; day: number } | null>(null);
  useEffect(() => { const up = () => setNow(parisNow()); up(); const id = setInterval(up, 30000); return () => clearInterval(id); }, []);
  return now;
}

/** Pastille « Ouvert · ferme à 19 h 30 » calculée en direct. */
export function OpenPill() {
  const now = useNow();
  if (!now) return <span className={s.pill}>Horaires</span>;
  const today = hours[now.day];
  const open = !!today && now.h >= today[0] && now.h < today[1];
  let text: string;
  if (open) text = `Ouvert · ferme à ${fmtH(today![1])}`;
  else {
    let d = now.day, first = true;
    for (let i = 0; i < 8; i++) {
      const hh = hours[d];
      if (hh && (!first || now.h < hh[0])) { text = `Fermé · ouvre ${i === 0 ? "à" : i === 1 ? "demain à" : `${dayNames[d].toLowerCase()} à`} ${fmtH(hh[0])}`; break; }
      d = (d + 1) % 7; first = false;
    }
    text ??= "Fermé";
  }
  return <span className={open ? `${s.pill} ${s.open}` : s.pill}><i />{text}</span>;
}

/** Bandeau du hero : la prochaine fournée et le temps restant. */
export function NextBatch() {
  const now = useNow();
  if (!now) return <p className={s.next}>Fournées toute la journée, de 6 h 30 à 17 h 15.</p>;
  const nb = batches.find((b) => b.h > now.h);
  if (!nb || !hours[now.day]) return <p className={s.next}>Première fournée demain à {fmtH(batches[0].h)} : {batches[0].label.toLowerCase()}.</p>;
  const mins = Math.round((nb.h - now.h) * 60);
  return (
    <p className={s.next}>
      <span className={s.oven} aria-hidden="true" />
      Prochaine fournée : <b>{nb.label}</b> à {fmtH(nb.h)} <span className={s.soon}>dans {mins >= 60 ? `${Math.floor(mins / 60)} h ${String(mins % 60).padStart(2, "0")}` : `${mins} min`}</span>
    </p>
  );
}

/** Frise des fournées : celles déjà sorties, la prochaine mise en avant, et l'heure actuelle.
 *  Les fournées sont espacées régulièrement ; la barre avance entre deux fournées selon l'heure. */
export function Timeline() {
  const now = useNow();
  const n = batches.length, pos = (i: number) => (i / (n - 1)) * 100;
  let fill: number | null = null;
  if (now) {
    if (now.h <= batches[0].h) fill = 0;
    else if (now.h >= batches[n - 1].h) fill = 100;
    else {
      const i = batches.findIndex((b) => b.h > now.h) - 1;
      fill = pos(i) + ((now.h - batches[i].h) / (batches[i + 1].h - batches[i].h)) * (pos(i + 1) - pos(i));
    }
  }
  const nextIdx = now ? batches.findIndex((b) => b.h > now.h) : -1;
  return (
    <div className={s.tl}>
      <div className={s.tlLine}>
        {fill !== null && <div className={s.tlFill} style={{ width: `${fill}%` }} />}
        {fill !== null && fill > 0 && fill < 100 && <span className={s.tlNow} style={{ left: `${fill}%` }}>Maintenant</span>}
      </div>
      <ol className={s.tlList}>
        {batches.map((b, i) => {
          const state = !now ? "" : b.h <= now.h ? s.done : i === nextIdx ? s.nextB : "";
          return (
            <li key={b.h} className={state} style={{ left: `${pos(i)}%`, ["--d" as string]: `${i * 0.08}s` }} data-r>
              <span className={s.tlDot} />
              <b>{fmtH(b.h)}</b>
              <span>{b.label}</span>
              {state === s.done && <em>Sorti du four</em>}
              {state === s.nextB && <em>Prochaine</em>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

type Line = { p: Product; q: number };

/** Carte + panier « click & collect » (commande fictive : rien n'est envoyé). */
export function Shop() {
  const cats = ["Pains", "Viennoiseries", "Douceurs"] as const;
  const [cat, setCat] = useState<(typeof cats)[number]>("Pains");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"cart" | "done">("cart");
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [bump, setBump] = useState(0);
  const now = useNow();

  const lines: Line[] = useMemo(() => Object.entries(cart).filter(([, q]) => q > 0).map(([id, q]) => ({ p: products.find((p) => p.id === id)!, q })), [cart]);
  const count = lines.reduce((a, l) => a + l.q, 0), total = lines.reduce((a, l) => a + l.q * l.p.price, 0);
  const add = (id: string, d = 1) => { setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) })); if (d > 0) setBump((b) => b + 1); };

  // Créneaux de retrait : toutes les 30 min, à partir de 30 min après maintenant, dans les horaires du jour.
  const slots = useMemo(() => {
    if (!now) return [];
    const hh = hours[now.day]; if (!hh) return [];
    const out: string[] = [];
    for (let h = Math.ceil((now.h + 0.5) * 2) / 2; h <= hh[1] - 0.5; h += 0.5) out.push(fmtH(h));
    return out.slice(0, 10);
  }, [now]);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  return (
    <>
      <div className={s.tabs} role="tablist" aria-label="Catégories">
        {cats.map((c) => <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? s.tabOn : s.tab} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <div className={s.grid}>
        {products.filter((p) => p.cat === cat).map((p, i) => (
          <article key={p.id} className={s.card} data-r style={{ ["--d" as string]: `${i * 0.08}s` }}>
            <div className={s.cardImg}>
              <Image src={p.img} alt="" fill sizes="(max-width:700px) 90vw, 30vw" />
              {p.tag && <span className={s.tag}>{p.tag}</span>}
            </div>
            <div className={s.cardBody}>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className={s.cardFoot}>
                <span className={s.price}>{euro(p.price)}</span>
                {cart[p.id] ? (
                  <span className={s.qty}>
                    <button onClick={() => add(p.id, -1)} aria-label={`Retirer un ${p.name}`}>−</button>
                    <b aria-live="polite">{cart[p.id]}</b>
                    <button onClick={() => add(p.id)} aria-label={`Ajouter un ${p.name}`}>+</button>
                  </span>
                ) : (
                  <button className={s.add} onClick={() => add(p.id)}>Ajouter</button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {count > 0 && !open && (
        <button key={bump} className={s.fab} onClick={() => { setOpen(true); setStep("cart"); }}>
          <span>Mon panier · {count} article{count > 1 ? "s" : ""}</span><b>{euro(total)}</b>
        </button>
      )}

      {open && (
        <div className={s.drawerWrap} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <aside className={s.drawer} role="dialog" aria-modal="true" aria-label="Panier">
            <div className={s.dHead}>
              <h3>{step === "cart" ? "À emporter" : "C'est commandé"}</h3>
              <button onClick={() => setOpen(false)} aria-label="Fermer">✕</button>
            </div>
            {step === "cart" ? (
              <form className={s.dBody} onSubmit={(e) => { e.preventDefault(); if (slot && name.trim()) setStep("done"); }}>
                <ul className={s.lines}>
                  {lines.map((l) => (
                    <li key={l.p.id}>
                      <span>{l.p.name}</span>
                      <span className={s.qty}><button type="button" onClick={() => add(l.p.id, -1)} aria-label="Retirer">−</button><b>{l.q}</b><button type="button" onClick={() => add(l.p.id)} aria-label="Ajouter">+</button></span>
                      <b>{euro(l.q * l.p.price)}</b>
                    </li>
                  ))}
                </ul>
                <p className={s.total}><span>Total</span><b>{euro(total)}</b></p>
                <fieldset className={s.slots}>
                  <legend>Heure de retrait (aujourd&apos;hui)</legend>
                  {slots.length ? slots.map((t) => (
                    <label key={t} className={slot === t ? s.slotOn : s.slot}><input type="radio" name="slot" value={t} checked={slot === t} onChange={() => setSlot(t)} />{t}</label>
                  )) : <p className={s.muted}>La boutique est fermée : dans la vraie version, on proposerait les créneaux de demain.</p>}
                </fieldset>
                <label className={s.field}>Prénom<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Camille" autoComplete="given-name" /></label>
                <button className={s.pay} disabled={!slot || !name.trim()}>Réserver · paiement sur place</button>
                <p className={s.muted}>Démo : aucune commande n&apos;est réellement envoyée.</p>
              </form>
            ) : (
              <div className={s.dBody}>
                <div className={s.ok} aria-hidden="true">✓</div>
                <p className={s.okT}>Merci {name.trim()} !</p>
                <p className={s.muted}>Ta commande n° {String(1000 + count * 37 + Math.round(total * 10)).slice(-4)} t&apos;attend à <b>{slot}</b>. Tu paies sur place.</p>
                <ul className={s.lines}>{lines.map((l) => <li key={l.p.id}><span>{l.q} × {l.p.name}</span><b>{euro(l.q * l.p.price)}</b></li>)}</ul>
                <button className={s.pay} onClick={() => { setCart({}); setOpen(false); setSlot(""); }}>Terminer</button>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}

/** Tableau des horaires avec le jour actuel mis en avant. */
export function Hours() {
  const now = useNow();
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <ul className={s.hours}>
      {order.map((d) => (
        <li key={d} className={now?.day === d ? s.today : ""}>
          <span>{dayNames[d]}</span>
          <span>{hours[d] ? `${fmtH(hours[d]![0])} – ${fmtH(hours[d]![1])}` : "Fermé"}</span>
        </li>
      ))}
    </ul>
  );
}

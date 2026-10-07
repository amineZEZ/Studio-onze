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

const dur = (h: number) => { const m = Math.round(h * 60); return m >= 60 ? `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}` : `${m} min`; };

/** « Ouvert jusqu'à 19 h 30 » / « Fermé · ouvre demain à 6 h 30 », calculé en direct. */
export function OpenStatus() {
  const now = useNow();
  if (!now) return <span className={s.open}>Du mardi au dimanche</span>;
  const today = hours[now.day];
  if (today && now.h >= today[0] && now.h < today[1]) return <span className={s.open}><i className={s.on} />Ouvert jusqu&apos;à {fmtH(today[1])}</span>;
  let d = now.day, first = true;
  for (let i = 0; i < 8; i++) {
    const hh = hours[d];
    if (hh && (!first || now.h < hh[0])) return <span className={s.open}><i />Fermé · ouvre {i === 0 ? "à" : i === 1 ? "demain à" : `${dayNames[d].toLowerCase()} à`} {fmtH(hh[0])}</span>;
    d = (d + 1) % 7; first = false;
  }
  return <span className={s.open}>Fermé</span>;
}

/** Bandeau défilant : le programme du four aujourd'hui, avec ce qui est déjà sorti et la prochaine fournée. */
export function OvenTicker() {
  const now = useNow();
  const next = now && hours[now.day] ? batches.find((b) => b.h > now.h) : null;
  const lead = next && now ? `Prochaine fournée dans ${dur(next.h - now.h)} : ${next.label.toLowerCase()}` : "Le four tourne de 6 h 30 à 17 h 15";
  const line = [lead, ...batches.map((b) => `${fmtH(b.h)} · ${b.label.toLowerCase()}${now && b.h <= now.h ? " (sorti)" : ""}`)];
  return (
    <div className={s.ticker} role="marquee" aria-label={line.join(", ")}>
      <div className={s.tickerIn} aria-hidden="true">
        {[0, 1].map((k) => <span key={k}>{line.map((x, i) => <b key={i} className={i === 0 ? s.tickLead : ""}>{x}</b>)}</span>)}
      </div>
    </div>
  );
}

/** Programme du four sous forme de liste (horaires de la journée). */
export function OvenList() {
  const now = useNow();
  const nextIdx = now ? batches.findIndex((b) => b.h > now.h) : -1;
  return (
    <ol className={s.oven}>
      {batches.map((b, i) => {
        const done = now ? b.h <= now.h : false;
        return (
          <li key={b.h} className={done ? s.ovenDone : i === nextIdx ? s.ovenNext : ""} data-r style={{ ["--d" as string]: `${i * 0.06}s` }}>
            <time>{fmtH(b.h)}</time>
            <span>{b.label}</span>
            <em>{done ? "sorti du four" : i === nextIdx ? `dans ${dur(b.h - now!.h)}` : ""}</em>
          </li>
        );
      })}
    </ol>
  );
}

type Line = { p: Product; q: number };

/** Le comptoir + le sac « à emporter » (commande fictive : rien n'est envoyé). */
export function Shop() {
  const cats = ["Pains", "Viennoiseries", "Douceurs"] as const;
  const [cat, setCat] = useState<(typeof cats)[number] | "Tout">("Tout");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"cart" | "done">("cart");
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const now = useNow();

  const lines: Line[] = useMemo(() => Object.entries(cart).filter(([, q]) => q > 0).map(([id, q]) => ({ p: products.find((p) => p.id === id)!, q })), [cart]);
  const count = lines.reduce((a, l) => a + l.q, 0), total = lines.reduce((a, l) => a + l.q * l.p.price, 0);
  const add = (id: string, d = 1) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }));

  // Créneaux de retrait : toutes les 30 min, au plus tôt 30 min après maintenant, dans les horaires du jour.
  const slots = useMemo(() => {
    if (!now) return [];
    const hh = hours[now.day]; if (!hh) return [];
    const out: string[] = [];
    for (let h = Math.ceil((Math.max(now.h, hh[0]) + 0.5) * 2) / 2; h <= hh[1] - 0.5; h += 0.5) out.push(fmtH(h));
    return out.slice(0, 12);
  }, [now]);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  const list = products.filter((p) => cat === "Tout" || p.cat === cat);

  return (
    <>
      <div className={s.filters} role="tablist" aria-label="Catégories">
        {(["Tout", ...cats] as const).map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? s.fOn : s.f} onClick={() => setCat(c)}>
            {c}<sup>{c === "Tout" ? products.length : products.filter((p) => p.cat === c).length}</sup>
          </button>
        ))}
      </div>
      <div className={s.grid}>
        {list.map((p, i) => (
          <article key={p.id} className={s.item} data-r style={{ ["--d" as string]: `${(i % 4) * 0.06}s` }}>
            <div className={s.itemImg}>
              <Image src={p.img} alt={p.name} fill sizes="(max-width:700px) 90vw, (max-width:1100px) 45vw, 24vw" />
              {p.tag && <span className={s.itemTag}>{p.tag}</span>}
            </div>
            <div className={s.itemRow}><h3>{p.name}</h3><span className={s.price}>{euro(p.price)}</span></div>
            <p>{p.desc}</p>
            {cart[p.id] ? (
              <span className={s.qty}>
                <button onClick={() => add(p.id, -1)} aria-label={`Retirer : ${p.name}`}>−</button>
                <b aria-live="polite">{cart[p.id]} dans le sac</b>
                <button onClick={() => add(p.id)} aria-label={`Ajouter : ${p.name}`}>+</button>
              </span>
            ) : (
              <button className={s.add} onClick={() => add(p.id)}>Ajouter au sac</button>
            )}
          </article>
        ))}
      </div>

      {count > 0 && !open && (
        <button className={s.bag} onClick={() => { setOpen(true); setStep("cart"); }}>
          <span>Mon sac · {count}</span><b>{euro(total)}</b>
        </button>
      )}

      {open && (
        <div className={s.drawerWrap} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <aside className={s.drawer} role="dialog" aria-modal="true" aria-label="Commande à emporter">
            <div className={s.dHead}>
              <h3>{step === "cart" ? "À emporter" : "C'est noté"}</h3>
              <button onClick={() => setOpen(false)}>Fermer</button>
            </div>
            {step === "cart" ? (
              <form className={s.dBody} onSubmit={(e) => { e.preventDefault(); if (slot && name.trim()) setStep("done"); }}>
                <ul className={s.lines}>
                  {lines.map((l) => (
                    <li key={l.p.id}>
                      <span>{l.p.name}</span>
                      <span className={s.qtyS}><button type="button" onClick={() => add(l.p.id, -1)} aria-label="Retirer">−</button><b>{l.q}</b><button type="button" onClick={() => add(l.p.id)} aria-label="Ajouter">+</button></span>
                      <b>{euro(l.q * l.p.price)}</b>
                    </li>
                  ))}
                </ul>
                <p className={s.total}><span>Total</span><b>{euro(total)}</b></p>
                <fieldset className={s.slots}>
                  <legend>Je passe le chercher à</legend>
                  {slots.length ? slots.map((t) => (
                    <label key={t} className={slot === t ? s.slotOn : s.slot}><input type="radio" name="slot" value={t} checked={slot === t} onChange={() => setSlot(t)} />{t}</label>
                  )) : <p className={s.muted}>La boutique est fermée. Dans la version en ligne, on propose les créneaux du lendemain.</p>}
                </fieldset>
                <label className={s.field}>Au nom de<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Prénom" autoComplete="given-name" /></label>
                <button className={s.pay} disabled={!slot || !name.trim()}>Réserver · je paie sur place</button>
                <p className={s.muted}>Démo : la commande n&apos;est envoyée à personne.</p>
              </form>
            ) : (
              <div className={s.dBody}>
                <p className={s.okT}>Merci {name.trim()}.</p>
                <p>Votre sac sera prêt à <b>{slot}</b>. Vous réglez au comptoir.</p>
                <ul className={s.lines}>{lines.map((l) => <li key={l.p.id}><span>{l.q} × {l.p.name}</span><b>{euro(l.q * l.p.price)}</b></li>)}</ul>
                <p className={s.total}><span>À régler</span><b>{euro(total)}</b></p>
                <button className={s.pay} onClick={() => { setCart({}); setOpen(false); setSlot(""); }}>Fermer</button>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}

/** Horaires, jour actuel mis en avant. */
export function Hours() {
  const now = useNow();
  return (
    <table className={s.hours}>
      <tbody>
        {[1, 2, 3, 4, 5, 6, 0].map((d) => (
          <tr key={d} className={now?.day === d ? s.today : ""}>
            <th scope="row">{dayNames[d]}</th>
            <td>{hours[d] ? `${fmtH(hours[d]![0])} – ${fmtH(hours[d]![1])}` : "Fermé"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

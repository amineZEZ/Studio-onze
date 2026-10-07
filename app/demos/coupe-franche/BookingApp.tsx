"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import s from "./coupe.module.css";
import { barbers, isClosed, services, slotsFor } from "./data";

type Step = 0 | 1 | 2 | 3 | 4 | 5;
const TITLES = ["", "Prestation", "Barbier", "Date & heure", "Tes infos", ""];
const days = (n: number) => {
  const out: Date[] = [], d = new Date(); d.setHours(12, 0, 0, 0);
  for (let i = 0; i < n; i++) { out.push(new Date(d)); d.setDate(d.getDate() + 1); }
  return out;
};
const fmtDay = (d: Date) => { const t = d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }); return t[0].toUpperCase() + t.slice(1); };

/** Application de réservation, écran par écran (tout se passe dans le navigateur, rien n'est envoyé). */
export function BookingApp() {
  const [step, setStep] = useState<Step>(0);
  const [dir, setDir] = useState(1);
  const [svc, setSvc] = useState<string | null>(null);
  const [barber, setBarber] = useState<string | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [toast, setToast] = useState("");
  const [week, setWeek] = useState<Date[]>([]);
  useEffect(() => setWeek(days(14)), []);

  const go = (n: Step) => { setDir(n > step ? 1 : -1); setStep(n); };
  const S = services.find((x) => x.id === svc), B = barbers.find((x) => x.id === barber);
  const D = day !== null ? week[day] : null;
  const slots = useMemo(() => {
    if (!D || !barber) return [];
    const all = slotsFor(D, barber);
    // Aujourd'hui : les créneaux déjà passés (ou dans moins de 30 min) ne sont plus réservables.
    if (D.toDateString() !== new Date().toDateString()) return all;
    const n = new Date(), limit = n.getHours() + n.getMinutes() / 60 + 0.5;
    return all.map((x) => { const [h, m] = x.t.split(":").map(Number); return h + m / 60 < limit ? { ...x, free: false } : x; });
  }, [D, barber]);
  const phoneOk = phone.replace(/\D/g, "").length >= 10;
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(""), 2200); return () => clearTimeout(id); }, [toast]);

  const reset = () => { setSvc(null); setBarber(null); setDay(null); setSlot(null); setName(""); setPhone(""); go(0); };

  return (
    <div className={s.app}>
      <div className={step === 0 ? `${s.status} ${s.statusDark}` : s.status} aria-hidden="true"><span>9:41</span><span className={s.notch} /><span>●●● 5G ▮</span></div>

      {step > 0 && step < 5 && (
        <div className={s.top}>
          <button className={s.back} onClick={() => go((step - 1) as Step)} aria-label="Retour">←</button>
          <div className={s.topT}><small>Étape {step} sur 4</small><b>{TITLES[step]}</b></div>
          <div className={s.prog}><i style={{ width: `${(step / 4) * 100}%` }} /></div>
        </div>
      )}

      <div className={s.screens}>
        <div key={step} className={s.screen} style={{ ["--dir" as string]: dir }}>
          {step === 0 && (
            <div className={s.home}>
              <div className={s.homeImg}><Image src="/d/coupe-franche/salon.jpg" alt="Intérieur du salon de barbier, fauteuils et briques" fill sizes="400px" priority /></div>
              <div className={s.homeIn}>
                <div className={s.pole} aria-hidden="true" />
                <h2 className={s.brand}>Coupe<br />Franche</h2>
                <p className={s.homeSub}>Barbier · Paris 11e</p>
                <ul className={s.chips}><li>Ouvert jusqu&apos;à 20 h</li><li>Sans attente</li><li>Paiement sur place</li></ul>
                <button className={s.main} onClick={() => go(1)}>Réserver un créneau</button>
                <p className={s.small}>Des créneaux libres chaque jour, du mardi au samedi</p>
              </div>
            </div>
          )}

          {step === 1 && (
            <ul className={s.list}>
              {services.map((x, i) => (
                <li key={x.id} style={{ ["--i" as string]: i }}>
                  <button className={svc === x.id ? `${s.row} ${s.on}` : s.row} onClick={() => { setSvc(x.id); setTimeout(() => go(2), 220); }}>
                    <span className={s.rowMain}>
                      <b>{x.name} {x.best && <em className={s.best}>Populaire</em>}</b>
                      <span>{x.desc}</span>
                      <small>{x.min} min</small>
                    </span>
                    <span className={s.rowPrice}>{x.price} €</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {step === 2 && (
            <ul className={s.barbers}>
              {barbers.map((x, i) => (
                <li key={x.id} style={{ ["--i" as string]: i }}>
                  <button className={barber === x.id ? `${s.bcard} ${s.on}` : s.bcard} onClick={() => { setBarber(x.id); setSlot(null); setTimeout(() => go(3), 220); }}>
                    <span className={s.avatar} style={{ background: x.color, color: x.id === "any" ? "#0C0C0C" : "#fff" }}>{x.id === "any" ? "✶" : x.name[0]}</span>
                    <b>{x.name}</b>
                    <small>{x.role}</small>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {step === 3 && (
            <div className={s.when}>
              <div className={s.days} role="listbox" aria-label="Jour">
                {week.map((d, i) => {
                  const closed = isClosed(d);
                  return (
                    <button key={i} role="option" aria-selected={day === i} disabled={closed} className={day === i ? `${s.day} ${s.on}` : s.day} onClick={() => { setDay(i); setSlot(null); }}>
                      <small>{d.toLocaleDateString("fr-FR", { weekday: "short" }).replace(".", "")}</small>
                      <b>{d.getDate()}</b>
                      <small>{closed ? "fermé" : d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "")}</small>
                    </button>
                  );
                })}
              </div>
              {D ? (
                <>
                  <p className={s.whenT}>{fmtDay(D)}</p>
                  <div className={s.slots}>
                    {slots.map((x, i) => (
                      <button key={x.t} disabled={!x.free} className={slot === x.t ? `${s.slot} ${s.on}` : s.slot} style={{ ["--i" as string]: i }} onClick={() => setSlot(x.t)}>{x.t}</button>
                    ))}
                  </div>
                </>
              ) : <p className={s.hint}>Choisis un jour pour voir les créneaux libres.</p>}
              <button className={s.main} disabled={!slot} onClick={() => go(4)}>Continuer</button>
            </div>
          )}

          {step === 4 && (
            <form className={s.form} onSubmit={(e) => { e.preventDefault(); if (name.trim() && phoneOk) go(5); }}>
              <div className={s.recap}>
                <b>{S?.name}</b>
                <span>{B?.name === "Peu importe" ? "Premier barbier disponible" : `avec ${B?.name}`}</span>
                <span>{D && fmtDay(D)} · {slot}</span>
                <span className={s.recapP}>{S?.price} € · {S?.min} min</span>
              </div>
              <label>Prénom<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Yanis" autoComplete="given-name" /></label>
              <label>Téléphone<input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06 12 34 56 78" inputMode="tel" autoComplete="tel" /></label>
              <p className={s.small}>On t&apos;envoie un rappel par SMS la veille. (Démo : rien n&apos;est envoyé.)</p>
              <button className={s.main} disabled={!name.trim() || !phoneOk}>Confirmer la réservation</button>
            </form>
          )}

          {step === 5 && (
            <div className={s.done}>
              <svg className={s.check} viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-15" /></svg>
              <h3>C&apos;est réservé, {name.trim()} !</h3>
              <div className={s.ticket}>
                <div><small>Prestation</small><b>{S?.name}</b></div>
                <div><small>Quand</small><b>{D && fmtDay(D)} à {slot}</b></div>
                <div><small>Barbier</small><b>{B?.id === "any" ? "Premier disponible" : B?.name}</b></div>
                <div><small>À payer sur place</small><b>{S?.price} €</b></div>
              </div>
              <button className={s.main} onClick={() => setToast("Ajouté à ton calendrier ✓")}>Ajouter au calendrier</button>
              <button className={s.ghost} onClick={reset}>Nouvelle réservation</button>
            </div>
          )}
        </div>
      </div>
      {toast && <div className={s.toast} role="status">{toast}</div>}
    </div>
  );
}

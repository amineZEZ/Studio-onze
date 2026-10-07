"use client";

import { useEffect, useMemo, useState } from "react";
import s from "./rythme.module.css";
import { RevenueChart, Spark, WeekBars } from "./Charts";
import { clients, eur, hhmm, initialSessions, months, revenue, types, weekdays, type Session, type Status } from "./data";

type View = "dash" | "planning" | "clients";
const STATUS: Record<Status, { label: string; icon: string; cls: string }> = {
  ok: { label: "Confirmée", icon: "✓", cls: s.stOk },
  wait: { label: "À confirmer", icon: "!", cls: s.stWait },
  cancel: { label: "Annulée", icon: "✕", cls: s.stCancel },
};
const NAV: { id: View; label: string; icon: string }[] = [
  { id: "dash", label: "Tableau de bord", icon: "M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 3v6h8V3z" },
  { id: "planning", label: "Planning", icon: "M7 2v3M17 2v3M3 8h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" },
  { id: "clients", label: "Clients", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" },
];
const Icon = ({ d }: { d: string }) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;

export function Dashboard() {
  const [view, setView] = useState<View>("dash");
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [today, setToday] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"Tous" | "Actif" | "À relancer" | "En pause">("Tous");
  const [nextId, setNextId] = useState(100);

  useEffect(() => setToday((new Date().getDay() + 6) % 7), []);
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(""), 2600); return () => clearTimeout(id); }, [toast]);

  const live = sessions.filter((x) => x.status !== "cancel");
  const perDay = weekdays.map((_, d) => live.filter((x) => x.day === d).length);
  const agenda = today === null ? [] : sessions.filter((x) => x.day === today).sort((a, b) => a.start - b.start);
  const shown = useMemo(() => clients.filter((c) => (filter === "Tous" || c.state === filter) && c.name.toLowerCase().includes(q.trim().toLowerCase())), [q, filter]);
  const toFollow = clients.filter((c) => c.state === "À relancer").length;

  const addSession = (f: FormData) => {
    const sNew: Session = { id: nextId, day: Number(f.get("day")), start: Number(f.get("start")), dur: 1, client: String(f.get("client")), type: String(f.get("type")), status: "ok" };
    setSessions((x) => [...x, sNew]); setNextId((n) => n + 1); setModal(false);
    setToast(`Séance ajoutée : ${sNew.client}, ${weekdays[sNew.day].toLowerCase()} à ${hhmm(sNew.start)}`);
  };
  const confirm = (id: number) => { setSessions((x) => x.map((y) => (y.id === id ? { ...y, status: "ok" } : y))); setToast("Séance confirmée, le client a reçu un SMS (démo)"); };

  const date = useMemo(() => { const t = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }); return t[0].toUpperCase() + t.slice(1); }, []);

  return (
    <div className={s.app}>
      <aside className={s.side}>
        <div className={s.logo}><svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#E8492A" /><path d="M5 17h5l3-7 5 13 3-6h6" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>rythme</div>
        <nav className={s.nav} aria-label="Navigation">
          {NAV.map((n) => (
            <button key={n.id} className={view === n.id ? `${s.navI} ${s.navOn}` : s.navI} onClick={() => setView(n.id)} aria-current={view === n.id ? "page" : undefined}>
              <Icon d={n.icon} /><span>{n.label}</span>
              {n.id === "clients" && toFollow > 0 && <em className={s.badge}>{toFollow}</em>}
            </button>
          ))}
        </nav>
        <div className={s.me}><span className={s.av}>IM</span><div><b>Inès Moreau</b><small>Coach · Lyon</small></div></div>
      </aside>

      <main className={s.main}>
        <header className={s.topbar}>
          <div>
            <h1 className={s.hello}>{view === "dash" ? "Bonjour Inès" : view === "planning" ? "Planning de la semaine" : "Clients"}</h1>
            <p className={s.date} suppressHydrationWarning>{date}</p>
          </div>
          <button className={s.primary} onClick={() => setModal(true)}>+ Nouvelle séance</button>
        </header>

        {view === "dash" && (
          <>
            <section className={s.kpis} aria-label="Chiffres clés">
              <article className={s.kpi}><span className={s.kLabel}>Chiffre d&apos;affaires d&apos;octobre</span><b className={s.hero}>{eur(revenue.current[11])}</b><span className={s.up}>▲ 12 % vs septembre</span><Spark data={revenue.current} /></article>
              <article className={s.kpi}><span className={s.kLabel}>Séances cette semaine</span><b className={s.kVal}>{live.length}</b><span className={s.muted}>sur {sessions.length} prévues</span><Spark data={[14, 17, 16, 19, 18, 21, 20, 22, 19, 21, 22, live.length]} /></article>
              <article className={s.kpi}><span className={s.kLabel}>Clients actifs</span><b className={s.kVal}>{clients.filter((c) => c.state === "Actif").length}</b><span className={s.up}>▲ 2 ce mois-ci</span><Spark data={[4, 4, 5, 5, 6, 6, 6, 7, 6, 6, 7, 7]} /></article>
              <article className={s.kpi}><span className={s.kLabel}>Taux de présence</span><b className={s.kVal}>94 %</b><span className={s.muted}>1 annulation cette semaine</span><Spark data={[88, 90, 89, 91, 92, 90, 93, 92, 94, 93, 95, 94]} /></article>
            </section>

            <section className={s.row2}>
              <article className={s.card}>
                <div className={s.cardHead}>
                  <div><h2>Chiffre d&apos;affaires</h2><p className={s.muted}>12 derniers mois</p></div>
                  <ul className={s.legend}><li><i className={s.kCur} />Cette année</li><li><i className={s.kPrev} />L&apos;an dernier</li></ul>
                </div>
                <RevenueChart labels={months} current={revenue.current} previous={revenue.previous} />
              </article>
              <article className={s.card}>
                <div className={s.cardHead}><div><h2>Aujourd&apos;hui</h2><p className={s.muted}>{agenda.length} séance{agenda.length > 1 ? "s" : ""}</p></div></div>
                {agenda.length === 0 ? <p className={s.empty}>Pas de séance aujourd&apos;hui.</p> : (
                  <ul className={s.agenda}>
                    {agenda.map((x) => (
                      <li key={x.id} className={x.status === "cancel" ? s.cancelled : ""}>
                        <time>{hhmm(x.start)}</time>
                        <div><b>{x.client}</b><small>{x.type} · {x.dur * 60} min</small></div>
                        {x.status === "wait" ? <button className={s.confirmBtn} onClick={() => confirm(x.id)}>Confirmer</button> : <span className={`${s.status} ${STATUS[x.status].cls}`}><i aria-hidden="true">{STATUS[x.status].icon}</i>{STATUS[x.status].label}</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </section>

            <section className={s.row3}>
              <article className={s.card}>
                <div className={s.cardHead}><div><h2>Séances par jour</h2><p className={s.muted}>Cette semaine</p></div></div>
                <WeekBars labels={weekdays} values={perDay} today={today} />
              </article>
              <article className={s.card}>
                <div className={s.cardHead}><div><h2>À relancer</h2><p className={s.muted}>Carnets presque finis ou inactifs</p></div></div>
                <ul className={s.follow}>
                  {clients.filter((c) => c.left <= 1 || c.state !== "Actif").map((c) => (
                    <li key={c.name}><span className={s.avS}>{c.name.split(" ").map((p) => p[0]).join("")}</span><div><b>{c.name}</b><small>{c.left === 0 ? "Carnet terminé" : `${c.left} séance restante`} · {c.last}</small></div><button className={s.ghostBtn} onClick={() => setToast(`Message de relance envoyé à ${c.name} (démo)`)}>Relancer</button></li>
                  ))}
                </ul>
              </article>
            </section>
          </>
        )}

        {view === "planning" && (
          <section className={`${s.card} ${s.planCard}`}>
            <div className={s.plan} style={{ ["--rows" as string]: 14 }}>
              <div className={s.planCorner} />
              {weekdays.map((d, i) => <div key={d} className={i === today ? `${s.planDay} ${s.planToday}` : s.planDay}>{d}</div>)}
              {Array.from({ length: 14 }, (_, i) => <div key={i} className={s.planHour} style={{ gridRow: i + 2 }}>{7 + i}h</div>)}
              {weekdays.map((_, d) => (
                <div key={d} className={s.planCol} style={{ gridColumn: d + 2 }}>
                  {sessions.filter((x) => x.day === d).map((x) => (
                    <div key={x.id} className={`${s.ev} ${x.status === "cancel" ? s.evCancel : x.status === "wait" ? s.evWait : ""}`} style={{ top: `${((x.start - 7) / 14) * 100}%`, height: `${(x.dur / 14) * 100}%` }} title={`${x.client} · ${x.type} · ${hhmm(x.start)}`}>
                      <b>{hhmm(x.start)}</b><span>{x.client}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {view === "clients" && (
          <section className={s.card}>
            <div className={s.filters}>
              <input className={s.search} placeholder="Rechercher un client" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Rechercher un client" />
              <div className={s.chips}>{(["Tous", "Actif", "À relancer", "En pause"] as const).map((f) => <button key={f} className={filter === f ? `${s.chip} ${s.chipOn}` : s.chip} onClick={() => setFilter(f)}>{f}</button>)}</div>
            </div>
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead><tr><th>Client</th><th>Formule</th><th>Séances restantes</th><th>Dernière séance</th><th>Statut</th><th className={s.num}>Total payé</th></tr></thead>
                <tbody>
                  {shown.map((c) => (
                    <tr key={c.name}>
                      <td><span className={s.avS}>{c.name.split(" ").map((p) => p[0]).join("")}</span><b>{c.name}</b></td>
                      <td>{c.plan}</td>
                      <td><span className={s.meter} aria-label={`${c.left} sur ${c.total}`}><i style={{ width: `${(c.left / c.total) * 100}%` }} className={c.left / c.total <= 0.2 ? s.meterLow : ""} /></span><small>{c.left}/{c.total}</small></td>
                      <td>{c.last}</td>
                      <td><span className={`${s.status} ${c.state === "Actif" ? s.stOk : c.state === "À relancer" ? s.stWait : s.stPause}`}><i aria-hidden="true">{c.state === "Actif" ? "✓" : c.state === "À relancer" ? "!" : "‖"}</i>{c.state}</span></td>
                      <td className={s.num}>{eur(c.spent)}</td>
                    </tr>
                  ))}
                  {shown.length === 0 && <tr><td colSpan={6} className={s.empty}>Aucun client ne correspond.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      <nav className={s.tabbar} aria-label="Navigation mobile">
        {NAV.map((n) => <button key={n.id} className={view === n.id ? s.tabOn : ""} onClick={() => setView(n.id)}><Icon d={n.icon} /><span>{n.label === "Tableau de bord" ? "Accueil" : n.label}</span></button>)}
      </nav>

      {modal && (
        <div className={s.modalWrap} onClick={(e) => e.target === e.currentTarget && setModal(false)}>
          <form className={s.modal} role="dialog" aria-modal="true" aria-label="Nouvelle séance" onSubmit={(e) => { e.preventDefault(); addSession(new FormData(e.currentTarget)); }}>
            <h3>Nouvelle séance</h3>
            <label>Client<select name="client" defaultValue={clients[0].name}>{clients.map((c) => <option key={c.name}>{c.name}</option>)}<option>Cours collectif</option></select></label>
            <label>Type<select name="type">{types.map((t) => <option key={t}>{t}</option>)}</select></label>
            <div className={s.two}>
              <label>Jour<select name="day" defaultValue={today ?? 0}>{weekdays.map((d, i) => <option key={d} value={i}>{d}</option>)}</select></label>
              <label>Heure<select name="start" defaultValue={18}>{Array.from({ length: 27 }, (_, i) => 7 + i * 0.5).map((h) => <option key={h} value={h}>{hhmm(h)}</option>)}</select></label>
            </div>
            <div className={s.modalActions}><button type="button" className={s.ghostBtn} onClick={() => setModal(false)}>Annuler</button><button className={s.primary}>Ajouter la séance</button></div>
          </form>
        </div>
      )}
      {toast && <div className={s.toast} role="status">{toast}</div>}
    </div>
  );
}

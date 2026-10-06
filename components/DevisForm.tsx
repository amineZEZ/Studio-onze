"use client";

import { useState } from "react";
import { BUDGETS, NEEDS, type Devis } from "@/lib/devis";

type Errors = Partial<Record<keyof Devis, string>>;

export function DevisForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending"); setError(""); setErrors({});
    const body = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/devis", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) return setState("sent");
      if (json.errors) setErrors(json.errors);
      setError(json.error || (json.errors ? "Vérifie les champs en rouge." : "L'envoi a échoué. Réessaie dans un instant."));
    } catch {
      setError("Pas de connexion. Réessaie dans un instant.");
    }
    setState("idle");
  }

  if (state === "sent")
    return (
      <div className="form sent" role="status">
        <p className="sent-title">Demande envoyée ✓</p>
        <p>Merci ! On te répond sous 48 h avec un devis gratuit. Pense à regarder tes spams.</p>
      </div>
    );

  const err = (k: keyof Devis) => errors[k] && <span className="err" id={`${k}-err`}>{errors[k]}</span>;
  const aria = (k: keyof Devis) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `${k}-err` } : {});

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="row">
        <label htmlFor="name">Prénom<input id="name" name="name" autoComplete="given-name" placeholder="Sarah" maxLength={60} required {...aria("name")} />{err("name")}</label>
        <label htmlFor="email">Email<input id="email" name="email" type="email" autoComplete="email" placeholder="sarah@exemple.fr" maxLength={120} required {...aria("email")} />{err("email")}</label>
      </div>
      <div className="row">
        <label htmlFor="need">Ce dont tu as besoin<select id="need" name="need" defaultValue={NEEDS[0]} {...aria("need")}>{NEEDS.map((n) => <option key={n}>{n}</option>)}</select>{err("need")}</label>
        <label htmlFor="budget">Budget<select id="budget" name="budget" defaultValue={BUDGETS[1]} {...aria("budget")}>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select>{err("budget")}</label>
      </div>
      <label htmlFor="message">Ton projet en quelques lignes<textarea id="message" name="message" maxLength={2000} placeholder="J'ouvre un salon de coiffure à Lyon et j'ai besoin d'un logo et d'un site…" required {...aria("message")} />{err("message")}</label>
      <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {error && <p className="err" role="alert">{error}</p>}
      <button className="btn primary" type="submit" disabled={state === "sending"}>{state === "sending" ? "Envoi…" : "Envoyer ma demande"}</button>
      <p className="small">Tes informations servent uniquement à te répondre. <a href="/confidentialite">Confidentialité</a></p>
    </form>
  );
}

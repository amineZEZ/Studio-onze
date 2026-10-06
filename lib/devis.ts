/** Validation d'une demande de devis (partagée entre le formulaire et l'API). Aucune donnée n'est stockée. */

export const NEEDS = ["Logo & identité", "Vidéo motion design", "Site internet", "Pack lancement", "SaaS / application", "Autre"] as const;
export const BUDGETS = ["Moins de 300 €", "300 – 1 000 €", "1 000 – 3 000 €", "Plus de 3 000 €", "Je ne sais pas encore"] as const;

export type Devis = { name: string; email: string; need: string; budget: string; message: string };
export type DevisResult = { ok: true; data: Devis } | { ok: false; errors: Partial<Record<keyof Devis, string>> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, (s) => (s.includes("\n") ? "\n" : " ")).trim().slice(0, max) : "");

export function parseDevis(input: Record<string, unknown>): DevisResult {
  const data: Devis = {
    name: clean(input.name, 60),
    email: clean(input.email, 120).toLowerCase(),
    need: clean(input.need, 40),
    budget: clean(input.budget, 40),
    message: clean(input.message, 2000),
  };
  const errors: Partial<Record<keyof Devis, string>> = {};
  if (data.name.length < 2) errors.name = "Indique ton prénom.";
  if (!EMAIL.test(data.email)) errors.email = "Cet email ne semble pas valide.";
  if (!(NEEDS as readonly string[]).includes(data.need)) errors.need = "Choisis ce dont tu as besoin.";
  if (!(BUDGETS as readonly string[]).includes(data.budget)) errors.budget = "Choisis un budget.";
  if (data.message.length < 10) errors.message = "Décris ton projet en quelques mots (10 caractères minimum).";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Email reçu par le studio pour chaque demande. */
export function devisEmail(d: Devis) {
  const rows: [string, string][] = [["Prénom", d.name], ["Email", d.email], ["Besoin", d.need], ["Budget", d.budget]];
  return {
    subject: `Nouvelle demande de devis : ${d.need} (${d.name})`,
    text: `${rows.map(([k, v]) => `${k} : ${v}`).join("\n")}\n\nProjet :\n${d.message}\n\nRéponds directement à cet email pour écrire à ${d.name}.`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#121426;max-width:560px">
<h2 style="margin:0 0 16px">Nouvelle demande de devis</h2>
<table style="border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#5B5F78">${k}</td><td style="padding:4px 0;font-weight:600">${esc(v)}</td></tr>`).join("")}</table>
<p style="margin:20px 0 6px;color:#5B5F78">Projet</p><p style="margin:0;white-space:pre-wrap">${esc(d.message)}</p>
<p style="margin:24px 0 0;color:#5B5F78;font-size:13px">Réponds directement à cet email pour écrire à ${esc(d.name)}.</p></div>`,
  };
}

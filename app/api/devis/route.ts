import { NextResponse } from "next/server";
import { devisEmail, parseDevis } from "@/lib/devis";

/**
 * Reçoit une demande de devis et l'envoie par email au studio (Resend).
 * Rien n'est stocké. Clés à mettre dans Vercel (jamais sur GitHub) :
 * RESEND_API_KEY, DEVIS_TO (ton email), DEVIS_FROM (facultatif, ex. « Studio Onze <devis@ton-domaine.fr> »).
 */

// Limite simple contre les abus : 5 demandes par adresse IP et par heure (par instance du serveur).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now(), recent = (hits.get(ip) ?? []).filter((t) => now - t < 3600_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "inconnu";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Trop de demandes. Réessaie dans une heure." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Demande illisible." }, { status: 400 });
  }
  // Champ caché : rempli seulement par les robots.
  if (typeof body.website === "string" && body.website) return NextResponse.json({ ok: true });

  const parsed = parseDevis(body);
  if (!parsed.ok) return NextResponse.json({ ok: false, errors: parsed.errors }, { status: 422 });

  const key = process.env.RESEND_API_KEY?.trim(), to = process.env.DEVIS_TO?.trim();
  if (!key || !to) {
    console.error("Devis : RESEND_API_KEY ou DEVIS_TO manquant dans Vercel.");
    return NextResponse.json({ ok: false, error: "Le formulaire n'est pas encore activé. Réessaie un peu plus tard." }, { status: 503 });
  }

  const mail = devisEmail(parsed.data);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.DEVIS_FROM?.trim() || "Studio Onze <onboarding@resend.dev>",
      to: [to],
      reply_to: parsed.data.email,
      ...mail,
    }),
  });
  if (!res.ok) {
    console.error("Devis : échec Resend", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ ok: false, error: "L'envoi a échoué. Réessaie dans un instant." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

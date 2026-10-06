import { describe, expect, it } from "vitest";
import { devisEmail, parseDevis } from "../lib/devis";

const good = { name: "Sarah", email: "Sarah@Exemple.fr ", need: "Site internet", budget: "300 – 1 000 €", message: "J'ouvre un salon et j'ai besoin d'un site." };

describe("parseDevis", () => {
  it("accepte une demande complète et nettoie les champs", () => {
    const r = parseDevis(good);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.email).toBe("sarah@exemple.fr");
  });
  it("refuse les champs manquants ou invalides", () => {
    const r = parseDevis({ ...good, name: "", email: "pas-un-email", need: "Piratage", message: "court" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errors).sort()).toEqual(["email", "message", "name", "need"]);
  });
  it("limite la longueur du message", () => {
    const r = parseDevis({ ...good, message: "a".repeat(5000) });
    expect(r.ok && r.data.message.length).toBe(2000);
  });
});

describe("devisEmail", () => {
  it("échappe le HTML envoyé par le visiteur", () => {
    const r = parseDevis({ ...good, message: "<script>alert(1)</script> mon projet" });
    if (!r.ok) throw new Error("invalide");
    const mail = devisEmail(r.data);
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).toContain("&lt;script&gt;");
  });
});

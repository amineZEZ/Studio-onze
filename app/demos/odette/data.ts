/** Données de la démo « Fournil Odette » (boulangerie imaginaire). */

export type Product = { id: string; name: string; desc: string; price: number; cat: "Pains" | "Viennoiseries" | "Douceurs"; img: string; tag?: string };

export const products: Product[] = [
  { id: "trad", name: "Baguette de tradition", desc: "Farine Label Rouge, pétrie lentement, croûte fine qui craque.", price: 1.3, cat: "Pains", img: "/d/odette/assortiment.jpg", tag: "Toute la journée" },
  { id: "campagne", name: "Pain de campagne", desc: "Blé et un peu de seigle, levain naturel, mie souple.", price: 4.2, cat: "Pains", img: "/d/odette/campagne.jpg" },
  { id: "miche", name: "Grande miche au levain", desc: "1,2 kg, 36 h de fermentation. Se garde une semaine.", price: 9.8, cat: "Pains", img: "/d/odette/miche.jpg" },
  { id: "seigle", name: "Pain de seigle", desc: "Seigle à 80 %, dense et légèrement acidulé.", price: 4.6, cat: "Pains", img: "/d/odette/seigle.jpg" },
  { id: "croissant", name: "Croissant", desc: "Beurre AOP Charentes-Poitou, feuilletage sur trois jours.", price: 1.4, cat: "Viennoiseries", img: "/d/odette/croissant.jpg", tag: "6 h 30" },
  { id: "pac", name: "Pain au chocolat", desc: "Deux barres de chocolat noir 64 %.", price: 1.6, cat: "Viennoiseries", img: "/d/odette/pains-choco.jpg" },
  { id: "brioche", name: "Brioche Nanterre", desc: "Pur beurre, œufs plein air, à partager le dimanche.", price: 8.5, cat: "Viennoiseries", img: "/d/odette/brioche.jpg" },
  { id: "graines", name: "Pain aux graines", desc: "Lin, tournesol, courge et sésame torréfiés.", price: 3.9, cat: "Pains", img: "/d/odette/graines.jpg" },
  { id: "cookie", name: "Cookie chocolat noir", desc: "Gros morceaux de chocolat, fleur de sel.", price: 2.8, cat: "Douceurs", img: "/d/odette/cookies.jpg" },
  { id: "cake", name: "Cake banane et noix de pécan", desc: "Bananes bien mûres, cassonade, en tranche ou entier.", price: 3.5, cat: "Douceurs", img: "/d/odette/cake-banane.jpg" },
];

/** Fournées de la journée (heures de sortie du four). */
export const batches = [
  { h: 6.5, label: "Croissants & pains au chocolat" },
  { h: 7, label: "Tradition" },
  { h: 9.5, label: "Pains aux graines" },
  { h: 11, label: "Grande miche au levain" },
  { h: 16.5, label: "Tradition, 2e fournée" },
  { h: 17.25, label: "Viennoiseries du goûter" },
];

/** Horaires : [ouverture, fermeture] en heures décimales, null = fermé. Index 0 = dimanche. */
export const hours: ([number, number] | null)[] = [[7, 13], null, [6.5, 19.5], [6.5, 19.5], [6.5, 19.5], [6.5, 19.5], [7, 19]];
export const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

export const fmtH = (h: number) => `${Math.floor(h)} h${h % 1 ? String(Math.round((h % 1) * 60)).padStart(2, "0") : ""}`;
export const euro = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

/** Heure de Paris en heures décimales + jour de la semaine. */
export function parisNow(d = new Date()) {
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit", weekday: "short", hour12: false }).formatToParts(d);
  const get = (t: string) => p.find((x) => x.type === t)?.value ?? "0";
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { h: Number(get("hour")) % 24 + Number(get("minute")) / 60, day: wd };
}

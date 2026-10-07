/** Données de la démo « Fournil Odette » (boulangerie imaginaire). */

export type Product = { id: string; name: string; desc: string; price: number; cat: "Pains" | "Viennoiseries" | "Douceurs"; img: string; tag?: string };

export const products: Product[] = [
  { id: "trad", name: "Tradition", desc: "Farine T65, 24 h de pousse, croûte qui chante.", price: 1.3, cat: "Pains", img: "/demos/odette/tranche.jpg", tag: "La plus vendue" },
  { id: "miche", name: "Grande miche au levain", desc: "Seigle et blé, levain naturel. Se garde 5 jours.", price: 6.9, cat: "Pains", img: "/demos/odette/miche.jpg" },
  { id: "cereales", name: "Pain aux graines", desc: "Lin, tournesol, courge et sésame torréfiés.", price: 3.4, cat: "Pains", img: "/demos/odette/pains.jpg" },
  { id: "croissant", name: "Croissant au beurre", desc: "Beurre AOP Charentes-Poitou, feuilletage sur 3 jours.", price: 1.4, cat: "Viennoiseries", img: "/demos/odette/croissants.jpg", tag: "Sort à 7 h" },
  { id: "pac", name: "Pain au chocolat", desc: "Deux barres de chocolat noir 64 %.", price: 1.6, cat: "Viennoiseries", img: "/demos/odette/vitrine.jpg" },
  { id: "brioche", name: "Brioche tressée", desc: "Pur beurre, sucre perlé, à partager.", price: 7.5, cat: "Viennoiseries", img: "/demos/odette/boutique.jpg" },
  { id: "flan", name: "Flan pâtissier", desc: "Vanille de Madagascar, pâte brisée maison.", price: 3.9, cat: "Douceurs", img: "/demos/odette/vitrine.jpg" },
  { id: "tarte", name: "Tarte fine aux pommes", desc: "Pâte feuilletée, pommes du Pilat, caramel au beurre salé.", price: 4.2, cat: "Douceurs", img: "/demos/odette/croissants.jpg" },
  { id: "cookie", name: "Cookie au sarrasin", desc: "Chocolat au lait et fleur de sel.", price: 2.8, cat: "Douceurs", img: "/demos/odette/boutique.jpg" },
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

/** Données de la démo « Coupe Franche » (barbier imaginaire). */
export const services = [
  { id: "coupe", name: "Coupe homme", desc: "Shampoing, coupe aux ciseaux ou tondeuse, coiffage.", min: 30, price: 28 },
  { id: "combo", name: "Coupe + barbe", desc: "La totale : coupe, taille de barbe, serviette chaude.", min: 50, price: 42, best: true },
  { id: "degrade", name: "Dégradé américain", desc: "Dégradé net à la tondeuse, finitions au rasoir.", min: 40, price: 32 },
  { id: "barbe", name: "Taille de barbe", desc: "Traçage des contours, huile et baume.", min: 20, price: 18 },
  { id: "rasage", name: "Rasage à l'ancienne", desc: "Coupe-chou, serviettes chaudes, soin apaisant.", min: 30, price: 30 },
  { id: "enfant", name: "Coupe enfant", desc: "Jusqu'à 12 ans.", min: 25, price: 20 },
];
export const barbers = [
  { id: "any", name: "Peu importe", role: "Le premier disponible", color: "#EDE8DF" },
  { id: "karim", name: "Karim", role: "Fondateur · dégradés", color: "#C8102E" },
  { id: "leo", name: "Léo", role: "Barbe & rasage", color: "#1F3A93" },
  { id: "sami", name: "Sami", role: "Coupes aux ciseaux", color: "#D9A441" },
];

/** Créneaux d'une journée (10 h – 19 h 30), certains déjà pris (pseudo-aléatoire stable selon la date et le barbier). */
export function slotsFor(date: Date, barber: string) {
  const seed = date.getFullYear() * 400 + date.getMonth() * 31 + date.getDate() + barber.length * 7;
  const out: { t: string; free: boolean }[] = [];
  let x = seed;
  for (let h = 10; h < 19.5; h += 0.5) {
    x = (x * 9301 + 49297) % 233280;
    out.push({ t: `${Math.floor(h)}:${h % 1 ? "30" : "00"}`, free: x / 233280 > 0.42 });
  }
  return out;
}
export const isClosed = (d: Date) => d.getDay() === 1 || d.getDay() === 0; // fermé dimanche et lundi

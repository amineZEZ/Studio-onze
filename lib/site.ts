/** Contenus du site Au Pixel Près : tout le texte modifiable est ici. */

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "";

export const site = {
  name: "Au Pixel Près",
  /** Adresse du site : NEXT_PUBLIC_SITE_URL quand le nom de domaine sera branché, sinon l'adresse Vercel. */
  url: (process.env.NEXT_PUBLIC_SITE_URL?.trim() || vercelUrl || "http://localhost:3000").replace(/\/$/, ""),
  title: "Au Pixel Près · Logo, motion design et sites internet",
  description:
    "Studio créatif : logo, vidéos animées pour TikTok et Reels, sites internet et SaaS sur mesure. Devis gratuit sous 48 h.",
};

export const services = [
  { glyph: "L", title: "Logo & identité", text: "Un logo simple, lisible en petit sur une photo de profil comme en grand sur une vitrine.", tags: ["Logo", "Couleurs", "Polices", "Fichiers SVG + PNG"] },
  { glyph: "M", title: "Motion design", text: "Des vidéos courtes et rythmées, pensées pour arrêter le scroll dès la première seconde.", tags: ["TikTok", "Reels", "Pubs", "Logo animé"] },
  { glyph: "W", title: "Sites internet", text: "Un site rapide, beau sur téléphone, bien référencé sur Google, que tu peux faire évoluer.", tags: ["Site vitrine", "Landing page", "SEO", "Formulaire"] },
  { glyph: "S", title: "SaaS & applis", text: "Ton idée transformée en vrai produit : comptes, paiements en ligne, emails automatiques.", tags: ["Comptes", "Paiements", "Tableau de bord", "Emails"] },
];

export const offers = [
  { delay: "Livré en 5 jours", title: "Logo & mini-charte", price: 150, items: ["3 pistes de logo", "Couleurs et polices", "Tous les formats de fichiers"] },
  { delay: "Livré en 5 à 7 jours", title: "Vidéo motion design", price: 200, items: ["15 à 30 secondes", "Musique et bruitages", "Format TikTok, Reels et pub"] },
  { delay: "Livré en 2 semaines", title: "Site vitrine", price: 600, items: ["1 à 5 pages", "Adapté au téléphone", "Référencement Google de base"] },
  { delay: "Livré en 3 semaines", title: "Pack lancement", price: 1500, items: ["Logo + site + 2 vidéos", "Tout est cohérent dès le départ", "Moins cher que les 3 séparément"], star: true },
];

export const steps = [
  { title: "On en parle", text: "Un appel de 15 minutes pour comprendre ce dont tu as besoin. Tu reçois un devis sous 48 h." },
  { title: "Acompte", text: "Tu valides le devis et verses 40 % pour lancer le travail. Le reste à la livraison." },
  { title: "Création", text: "Une première version, puis deux séries de retouches incluses jusqu'à ce que ça te plaise." },
  { title: "Livraison", text: "Tu reçois tous les fichiers, et les droits d'utilisation t'appartiennent une fois le solde payé." },
];

export const faq = [
  { q: "Combien de temps pour un logo ou une vidéo ?", a: "En général 5 jours pour un logo, 5 à 7 jours pour une vidéo. Le délai exact est écrit dans ton devis." },
  { q: "Et si le résultat ne me plaît pas ?", a: "Deux séries de retouches sont incluses. On part de tes retours précis pour ajuster." },
  { q: "Je serai propriétaire de mon logo ?", a: "Oui. Une fois le solde payé, les droits d'utilisation te sont cédés et tu reçois les fichiers sources." },
  { q: "Je peux modifier mon site moi-même ensuite ?", a: "Oui. On te montre comment changer tes textes et tes images, ou on s'en occupe pour toi." },
  { q: "Comment se passe le paiement ?", a: "Un acompte de 40 % à la signature du devis, le solde à la livraison, par virement." },
];

/**
 * Mentions légales (obligatoires pour une micro-entreprise) : à remplir dans Vercel
 * (LEGAL_NAME, LEGAL_ADDRESS, LEGAL_SIRET). Tant que c'est vide, la page affiche « à compléter ».
 */
export const legal = {
  name: process.env.LEGAL_NAME?.trim() || "",
  address: process.env.LEGAL_ADDRESS?.trim() || "",
  siret: process.env.LEGAL_SIRET?.trim() || "",
  updated: "6 octobre 2026",
};

export const formatPrice = (n: number) => `${new Intl.NumberFormat("fr-FR").format(n).replace(/ | /g, " ")} €`;

/** Projets de démonstration (marques imaginaires) : de vrais sites et applications qui fonctionnent. */
export const demos = [
  { slug: "odette", name: "Fournil Odette", kind: "Site vitrine", text: "Boulangerie : fournées du jour en direct, carte, commande à emporter avec choix de l'heure.", video: "/video/demos/odette.mp4", poster: "/video/demos/odette.jpg", color: "#E9B44C" },
  { slug: "coupe-franche", name: "Coupe Franche", kind: "Application", text: "Barbier : réservation en 4 étapes, créneaux libres en temps réel, confirmation.", video: "/video/demos/coupe.mp4", poster: "/video/demos/coupe.jpg", color: "#C8102E" },
  { slug: "rythme", name: "Rythme", kind: "SaaS", text: "Logiciel pour coachs sportifs : chiffre d'affaires, planning, clients, ajout de séances.", image: "/demos/rythme/apercu.jpg", color: "#E8492A" },
  { slug: "mona", name: "Glaces Mona", kind: "Identité visuelle", text: "Glacier : logo, déclinaisons, couleurs, typographies, packaging et animation du logo.", video: "/video/demos/mona.mp4", poster: "/video/demos/mona.jpg", color: "#FF8FAB" },
];

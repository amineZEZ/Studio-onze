/** Données fictives de la démo « Rythme » (logiciel pour coachs sportifs). */

export const months = ["Nov", "Déc", "Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct"];
export const revenue = { current: [2980, 3120, 3350, 3010, 3480, 3720, 3900, 4100, 3650, 3420, 4340, 4860], previous: [2400, 2550, 2700, 2600, 2850, 3000, 3150, 3300, 2900, 2750, 3500, 3900] };

export const weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
export const types = ["Renforcement", "Cardio", "Pilates", "Prépa trail", "Mobilité"] as const;

export type Status = "ok" | "wait" | "cancel";
export type Session = { id: number; day: number; start: number; dur: number; client: string; type: string; status: Status };

/** Séances de la semaine (day : 0 = lundi). */
export const initialSessions: Session[] = [
  { id: 1, day: 0, start: 8, dur: 1, client: "Camille R.", type: "Renforcement", status: "ok" },
  { id: 2, day: 0, start: 12.25, dur: 1, client: "Julien M.", type: "Cardio", status: "ok" },
  { id: 3, day: 0, start: 18, dur: 1, client: "Nadia K.", type: "Mobilité", status: "ok" },
  { id: 4, day: 0, start: 19.5, dur: 1, client: "Cours collectif", type: "Cardio", status: "ok" },
  { id: 5, day: 0, start: 7, dur: 1, client: "Hugo P.", type: "Prépa trail", status: "cancel" },
  { id: 6, day: 1, start: 9, dur: 1, client: "Sofia B.", type: "Pilates", status: "ok" },
  { id: 7, day: 1, start: 12.5, dur: 1, client: "Thomas L.", type: "Prépa trail", status: "ok" },
  { id: 8, day: 1, start: 17.5, dur: 1, client: "Léa D.", type: "Pilates", status: "ok" },
  { id: 9, day: 1, start: 19, dur: 1, client: "Mehdi A.", type: "Renforcement", status: "ok" },
  { id: 10, day: 2, start: 8, dur: 1, client: "Camille R.", type: "Renforcement", status: "ok" },
  { id: 11, day: 2, start: 12.25, dur: 1, client: "Duo Sofia & Léa", type: "Pilates", status: "wait" },
  { id: 12, day: 2, start: 17.5, dur: 1.5, client: "Thomas L.", type: "Prépa trail", status: "ok" },
  { id: 13, day: 3, start: 9.5, dur: 1, client: "Julien M.", type: "Cardio", status: "ok" },
  { id: 14, day: 3, start: 12, dur: 1, client: "Clara V.", type: "Mobilité", status: "ok" },
  { id: 15, day: 3, start: 18, dur: 1, client: "Antoine G.", type: "Renforcement", status: "wait" },
  { id: 16, day: 3, start: 19.5, dur: 1, client: "Cours collectif", type: "Cardio", status: "ok" },
  { id: 17, day: 4, start: 8, dur: 1, client: "Nadia K.", type: "Mobilité", status: "ok" },
  { id: 18, day: 4, start: 17, dur: 1, client: "Mehdi A.", type: "Renforcement", status: "ok" },
  { id: 19, day: 5, start: 9, dur: 1.5, client: "Trail du samedi", type: "Prépa trail", status: "ok" },
  { id: 20, day: 5, start: 10.75, dur: 1, client: "Camille R.", type: "Renforcement", status: "ok" },
  { id: 21, day: 5, start: 11.75, dur: 1, client: "Clara V.", type: "Pilates", status: "ok" },
  { id: 22, day: 5, start: 14, dur: 1, client: "Hugo P.", type: "Cardio", status: "ok" },
  { id: 23, day: 5, start: 15.25, dur: 1, client: "Antoine G.", type: "Mobilité", status: "wait" },
];

export type Client = { name: string; plan: string; left: number; total: number; last: string; state: "Actif" | "À relancer" | "En pause"; spent: number };
export const clients: Client[] = [
  { name: "Camille R.", plan: "Carnet 10 séances", left: 3, total: 10, last: "Aujourd'hui", state: "Actif", spent: 590 },
  { name: "Julien M.", plan: "Abonnement mensuel", left: 6, total: 8, last: "Hier", state: "Actif", spent: 1240 },
  { name: "Sofia B.", plan: "Carnet 10 séances", left: 8, total: 10, last: "Il y a 2 j", state: "Actif", spent: 295 },
  { name: "Thomas L.", plan: "Prépa trail 12 sem.", left: 9, total: 24, last: "Il y a 2 j", state: "Actif", spent: 960 },
  { name: "Nadia K.", plan: "Abonnement mensuel", left: 4, total: 8, last: "Il y a 3 j", state: "Actif", spent: 880 },
  { name: "Hugo P.", plan: "Carnet 10 séances", left: 1, total: 10, last: "Il y a 9 j", state: "À relancer", spent: 590 },
  { name: "Léa D.", plan: "Carnet 5 séances", left: 2, total: 5, last: "Il y a 4 j", state: "Actif", spent: 310 },
  { name: "Mehdi A.", plan: "Abonnement mensuel", left: 7, total: 8, last: "Hier", state: "Actif", spent: 720 },
  { name: "Clara V.", plan: "Carnet 10 séances", left: 0, total: 10, last: "Il y a 15 j", state: "À relancer", spent: 590 },
  { name: "Antoine G.", plan: "Séance à l'unité", left: 0, total: 1, last: "Il y a 31 j", state: "En pause", spent: 65 },
];

export const eur = (n: number) => `${new Intl.NumberFormat("fr-FR").format(Math.round(n)).replace(/ | /g, " ")} €`;
export const hhmm = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;

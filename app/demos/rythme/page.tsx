import s from "./rythme.module.css";
import { Dashboard } from "./Dashboard";

export default function Rythme() {
  return (
    <div className={s.root}>
      <Dashboard />
      <p className={s.note}>Rythme est une marque imaginaire : toutes les données sont fictives. Clique partout, tout fonctionne (navigation, ajout de séance, filtres, graphiques).</p>
    </div>
  );
}

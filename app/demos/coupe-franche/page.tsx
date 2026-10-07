import Image from "next/image";
import s from "./coupe.module.css";
import { BookingApp } from "./BookingApp";

const features = [
  ["Créneaux en temps réel", "Le client voit les places libres de chaque barbier, jour par jour."],
  ["4 étapes, 30 secondes", "Prestation, barbier, heure, prénom. Pas de compte à créer."],
  ["Rappel la veille", "Un SMS automatique : moins de rendez-vous oubliés."],
  ["Installable", "S'ajoute à l'écran d'accueil du téléphone comme une vraie application."],
];

export default function CoupeFranche() {
  return (
    <div className={s.root}>
      <div className={s.layout}>
        <section className={s.pitch}>
          <div className={s.stripes} aria-hidden="true" />
          <p className={s.kicker} data-r>Application de réservation</p>
          <h1 className={s.h1} data-r style={{ ["--d" as string]: ".1s" }}>Ta coupe.<br />Réservée en<br /><span>30 secondes.</span></h1>
          <p className={s.lead} data-r style={{ ["--d" as string]: ".2s" }}>
            Coupe Franche voulait arrêter de répondre au téléphone pendant les coupes. On a créé une application de réservation simple, aux couleurs du salon.
          </p>
          <ul className={s.feats}>
            {features.map(([t, d], i) => (
              <li key={t} data-r style={{ ["--d" as string]: `${0.25 + i * 0.08}s` }}><b>{t}</b><span>{d}</span></li>
            ))}
          </ul>
          <p className={s.note} data-r>Dans cette démo, rien n&apos;est envoyé : les SMS de rappel sont activés dans la version livrée au salon.</p>
          <p className={s.tryIt} data-r>👉 Essaie l&apos;application : elle fonctionne vraiment.</p>
          <div className={s.photos} aria-hidden="true">
            <div className={s.ph1}><Image src="/demos/coupe-franche/coupe.jpg" alt="" fill sizes="240px" /></div>
            <div className={s.ph2}><Image src="/demos/coupe-franche/outils.jpg" alt="" fill sizes="200px" /></div>
            <div className={s.ph3}><Image src="/demos/coupe-franche/degrade.jpg" alt="" fill sizes="200px" /></div>
          </div>
        </section>

        <section className={s.device} aria-label="Application de réservation (démo interactive)">
          <div className={s.phone}>
            <BookingApp />
          </div>
        </section>
      </div>
      <footer className={s.foot}>Photos : Unsplash · Démo réalisée par Au Pixel Près · Coupe Franche est une marque imaginaire</footer>
    </div>
  );
}

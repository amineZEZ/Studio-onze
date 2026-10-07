import Image from "next/image";
import s from "./coupe.module.css";
import { BookingApp } from "./BookingApp";
import { services } from "./data";

export default function CoupeFranche() {
  return (
    <div className={s.root}>
      <section className={s.mosaic} aria-label="Le salon en images">
        <figure className={s.m1}><Image src="/d/coupe-franche/classique.jpg" alt="Un barbier coiffe un client dans le salon" fill priority sizes="(max-width:900px) 100vw, 50vw" /></figure>
        <figure className={s.m2}><Image src="/d/coupe-franche/tondeuse.jpg" alt="Finitions à la tondeuse sur un dégradé" fill sizes="(max-width:900px) 50vw, 25vw" /></figure>
        <figure className={s.m3}><Image src="/d/coupe-franche/barbe-blaireau.jpg" alt="Mousse appliquée au blaireau avant un rasage" fill sizes="(max-width:900px) 50vw, 25vw" /></figure>
      </section>
      <h1 className={s.title}>Coupe <span>Franche</span></h1>

      <div className={s.layout}>
        <div className={s.col}>
          <section className={s.intro}>
            <p className={s.lead} data-r>Barbier à Paris 11e. Coupes aux ciseaux, dégradés, barbe et rasage à l&apos;ancienne. Sans attente : on réserve son créneau en ligne et on arrive à l&apos;heure.</p>
            <dl className={s.facts} data-r>
              <div><dt>Adresse</dt><dd>8 passage Imaginaire, 75011 Paris</dd></div>
              <div><dt>Horaires</dt><dd>Mardi au samedi, 10 h – 20 h</dd></div>
              <div><dt>Paiement</dt><dd>Sur place, carte ou espèces</dd></div>
            </dl>
          </section>

          <section className={s.carte} aria-labelledby="carte-t">
            <h2 id="carte-t" className={s.h2} data-r>La carte</h2>
            <ul className={s.prices}>
              {services.map((x, i) => (
                <li key={x.id} data-r style={{ ["--d" as string]: `${i * 0.05}s` }}>
                  <div><b>{x.name}</b><span>{x.desc}</span></div>
                  <span className={s.dur}>{x.min} min</span>
                  <span className={s.eur}>{x.price} €</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={s.salon} aria-labelledby="salon-t">
            <h2 id="salon-t" className={s.h2} data-r>Le salon</h2>
            <div className={s.salonGrid}>
              <figure data-r><Image src="/d/coupe-franche/salon.jpg" alt="Fauteuils et miroirs du salon, murs de briques" fill sizes="(max-width:900px) 100vw, 40vw" /></figure>
              <figure data-r style={{ ["--d" as string]: ".08s" }}><Image src="/d/coupe-franche/outils.jpg" alt="Tondeuses, ciseaux et peigne posés sur le comptoir" fill sizes="(max-width:900px) 50vw, 20vw" /></figure>
              <figure data-r style={{ ["--d" as string]: ".16s" }}><Image src="/d/coupe-franche/fauteuil.jpg" alt="Fauteuil de barbier en cuir" fill sizes="(max-width:900px) 50vw, 20vw" /></figure>
            </div>
          </section>
        </div>

        <aside className={s.device} aria-label="Réserver un créneau (application de démonstration)">
          <div className={s.sticky}>
            <p className={s.devTitle}>Réserver un créneau</p>
            <div className={s.phone}><BookingApp /></div>
            <p className={s.note}>L&apos;application fonctionne : choisis une prestation et va jusqu&apos;au bout. Démo, aucune réservation n&apos;est envoyée.</p>
          </div>
        </aside>
      </div>

      <footer className={s.foot}>Coupe Franche est une marque imaginaire · photos Unsplash · site et application conçus par Au Pixel Près</footer>
    </div>
  );
}

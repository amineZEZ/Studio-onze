import Image from "next/image";
import s from "./odette.module.css";
import { Hours, OpenStatus, OvenList, OvenTicker, Shop } from "./Live";

const insta = ["comptoir", "croissants-four", "brioche", "seigle", "cookies", "graines"];

export default function Odette() {
  return (
    <div className={s.root}>
      <header className={s.head}>
        <nav className={s.navL} aria-label="Menu">
          <a href="#comptoir">Le comptoir</a><a href="#fournil">Le fournil</a><a href="#infos">Venir</a>
        </nav>
        <a href="#" className={s.mark} aria-label="Odette, boulangerie">Odette<small>boulangerie · Lyon</small></a>
        <div className={s.navR}><OpenStatus /><a href="#comptoir" className={s.btnSm}>Commander</a></div>
      </header>

      <section className={s.hero}>
        <div className={s.heroTxt}>
          <h1 className={s.h1} data-r>Du pain au levain, cuit toute la journée rue Imaginaire.</h1>
          <p className={s.heroP} data-r style={{ ["--d" as string]: ".1s" }}>Six fournées par jour, des farines bio d&apos;un moulin de l&apos;Ain et du beurre AOP. Commandez avant de venir, votre sac vous attend.</p>
          <div className={s.heroCta} data-r style={{ ["--d" as string]: ".2s" }}>
            <a href="#comptoir" className={s.btn}>Commander pour aujourd&apos;hui</a>
            <a href="#fournil" className={s.link}>Le programme du four</a>
          </div>
        </div>
        <figure className={s.heroImg} data-r style={{ ["--d" as string]: ".05s" }}>
          <Image src="/d/odette/petrir.jpg" alt="Mains qui pétrissent une pâte sur un plan de travail fariné" fill priority sizes="(max-width:900px) 100vw, 50vw" />
          <figcaption>Pâte de campagne, 5 h 40</figcaption>
        </figure>
      </section>

      <OvenTicker />

      <section id="comptoir" className={s.sec}>
        <div className={s.secHead}>
          <h2 className={s.h2} data-r>Sur le comptoir aujourd&apos;hui</h2>
          <p className={s.secP} data-r>Ajoutez ce qui vous fait envie, choisissez l&apos;heure, payez sur place.</p>
        </div>
        <Shop />
      </section>

      <section id="fournil" className={s.fournil}>
        <figure className={s.fImg} data-r><Image src="/d/odette/croissants-four.jpg" alt="Plaque de croissants à la sortie du four" fill sizes="(max-width:900px) 100vw, 55vw" /></figure>
        <div className={s.fTxt}>
          <h2 className={s.h2} data-r>Le programme du four</h2>
          <p className={s.secP} data-r>Le pain est meilleur une heure après la sortie du four. Voici quand passer.</p>
          <OvenList />
        </div>
      </section>

      <section className={s.manifest}>
        <p className={s.big} data-r>Notre levain est nourri tous les matins depuis 2019. Il demande du temps, alors on lui en laisse&nbsp;: 24 à 36 heures avant chaque cuisson.</p>
        <ol className={s.rules}>
          <li data-r><b>Farines</b><span>Blé, seigle et petit épeautre bio, moulus à la meule dans l&apos;Ain.</span></li>
          <li data-r style={{ ["--d" as string]: ".08s" }}><b>Fermentation</b><span>Pas de levure ajoutée dans nos pains, seulement du levain.</span></li>
          <li data-r style={{ ["--d" as string]: ".16s" }}><b>Beurre</b><span>AOP Charentes-Poitou pour toutes les viennoiseries.</span></li>
        </ol>
      </section>

      <section id="infos" className={s.infos}>
        <div>
          <h2 className={s.h3}>Adresse</h2>
          <p>12 rue Imaginaire<br />69004 Lyon<br />Métro Croix-Rousse</p>
          <p className={s.muted}>Adresse fictive, c&apos;est une démo.</p>
        </div>
        <div><h2 className={s.h3}>Horaires</h2><Hours /></div>
        <div>
          <h2 className={s.h3}>Sur Instagram</h2>
          <div className={s.insta}>
            {insta.map((n) => <div key={n}><Image src={`/d/odette/${n}.jpg`} alt="" fill sizes="120px" /></div>)}
          </div>
          <p className={s.muted}>@odette.boulangerie</p>
        </div>
      </section>

      <footer className={s.foot}>
        <span className={s.markSm}>Odette</span>
        <span className={s.muted}>Marque imaginaire · photos Unsplash · site conçu par Au Pixel Près</span>
      </footer>
    </div>
  );
}

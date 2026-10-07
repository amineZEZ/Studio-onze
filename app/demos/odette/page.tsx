import Image from "next/image";
import s from "./odette.module.css";
import { Hours, NextBatch, OpenPill, Shop, Timeline } from "./Live";

export default function Odette() {
  return (
    <div className={s.root}>
      <header className={s.head}>
        <a href="#" className={s.logo}>Odette<small>fournil</small></a>
        <nav className={s.nav} aria-label="Menu">
          <a href="#fournees">Fournées</a><a href="#carte">La carte</a><a href="#maison">La maison</a><a href="#infos">Infos</a>
        </nav>
        <OpenPill />
      </header>

      <section className={s.hero}>
        <Image src="/demos/odette/pains.jpg" alt="Pains au levain et épis de blé sur un plan de travail fariné" fill priority sizes="100vw" className={s.heroImg} />
        <div className={s.heroShade} />
        <div className={s.heroIn}>
          <p className={s.kicker} data-r>Boulangerie au levain · Lyon</p>
          <h1 className={s.h1} data-r style={{ ["--d" as string]: ".1s" }}>Le pain se lève tôt.<br /><em>Nous aussi.</em></h1>
          <div data-r style={{ ["--d" as string]: ".25s" }}><NextBatch /></div>
          <div className={s.heroCta} data-r style={{ ["--d" as string]: ".35s" }}>
            <a href="#carte" className={s.btn}>Commander à emporter</a>
            <a href="#fournees" className={s.btnGhost}>Voir les fournées du jour</a>
          </div>
        </div>
      </section>

      <section id="fournees" className={s.sec}>
        <div className={s.secHead}>
          <p className={s.kicker} data-r>En direct du fournil</p>
          <h2 className={s.h2} data-r>Ce qui sort du four aujourd&apos;hui</h2>
          <p className={s.lead} data-r>Six fournées par jour. Viens à la bonne heure : le pain est encore tiède.</p>
        </div>
        <Timeline />
      </section>

      <section id="carte" className={`${s.sec} ${s.light}`}>
        <div className={s.secHead}>
          <p className={s.kicker} data-r>La carte</p>
          <h2 className={s.h2} data-r>Commande, on prépare, tu passes</h2>
          <p className={s.lead} data-r>Choisis ton heure de retrait. Ta commande est mise de côté, tu paies sur place.</p>
        </div>
        <Shop />
      </section>

      <section id="maison" className={s.story}>
        <div className={s.storyImgs}>
          <div className={s.si1} data-r><Image src="/demos/odette/boutique.jpg" alt="Comptoir de la boulangerie avec baguettes et viennoiseries" fill sizes="(max-width:900px) 60vw, 30vw" /></div>
          <div className={s.si2} data-r style={{ ["--d" as string]: ".15s" }}><Image src="/demos/odette/croissants.jpg" alt="Croissants dorés saupoudrés de farine" fill sizes="(max-width:900px) 50vw, 24vw" /></div>
        </div>
        <div className={s.storyTxt}>
          <p className={s.kicker} data-r>La maison</p>
          <h2 className={s.h2} data-r>Du levain, de la patience, et rien d&apos;autre.</h2>
          <p data-r>Nos pains poussent lentement, 24 à 48 heures, avec un levain nourri chaque matin. Les farines viennent de moulins à moins de 200 km. Le beurre des viennoiseries est AOP.</p>
          <dl className={s.stats}>
            <div data-r><dt>Heures de pousse</dt><dd>24 à 48</dd></div>
            <div data-r style={{ ["--d" as string]: ".1s" }}><dt>Fournées par jour</dt><dd>6</dd></div>
            <div data-r style={{ ["--d" as string]: ".2s" }}><dt>Additifs</dt><dd>0</dd></div>
          </dl>
        </div>
      </section>

      <section id="infos" className={`${s.sec} ${s.infos}`}>
        <div>
          <p className={s.kicker} data-r>Infos pratiques</p>
          <h2 className={s.h2} data-r>Passe nous voir</h2>
          <p className={s.addr} data-r>12 rue Imaginaire<br />69004 Lyon<br /><span className={s.muted}>Adresse fictive (démo)</span></p>
        </div>
        <div data-r><Hours /></div>
        <div className={s.map} data-r aria-label="Plan schématique du quartier" role="img">
          <span className={s.street} style={{ top: "30%" }} /><span className={s.street} style={{ top: "68%" }} />
          <span className={s.streetV} style={{ left: "38%" }} /><span className={s.streetV} style={{ left: "74%" }} />
          <span className={s.pin}>Odette</span>
        </div>
      </section>

      <footer className={s.foot}>
        <span className={s.logo}>Odette<small>fournil</small></span>
        <span className={s.muted}>Photos : Unsplash · Démo réalisée par Au Pixel Près</span>
      </footer>
    </div>
  );
}

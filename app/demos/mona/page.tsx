import Image from "next/image";
import s from "./mona.module.css";
import { Construction, LoyaltyCard, Palette, Specimen } from "./Interactive";
import { Lockup, MONA, Symbol } from "./Logo";

export default function Mona() {
  return (
    <div className={s.root}>
      <section className={s.hero}>
        <div className={s.heroTxt}>
          <p className={s.kicker} data-r>Identité visuelle · Glacier artisanal</p>
          <h1 className={s.h1} data-r style={{ ["--d" as string]: ".1s" }}>Une marque<br />qui donne<br /><span>envie de lécher l&apos;écran.</span></h1>
          <p className={s.lead} data-r style={{ ["--d" as string]: ".2s" }}>Mona ouvre son premier glacier. Il lui fallait un nom qui sonne, un logo reconnaissable de loin et un univers joyeux, sur le pot comme sur Instagram.</p>
        </div>
        <div className={s.heroLogo} data-r style={{ ["--d" as string]: ".15s" }}>
          <div className={s.bigMark}><Symbol size={260} id="hero" /></div>
          <Lockup size={64} id="hero-l" />
        </div>
      </section>

      <section className={s.sec}>
        <div className={s.secHead}><p className={s.kicker} data-r>01 · Le logo</p><h2 className={s.h2} data-r>Un cercle, un triangle, une goutte.</h2><p className={s.lead} data-r>Le logo est construit sur une grille simple : il reste lisible en tout petit (icône d&apos;application) comme sur une enseigne de 3 mètres.</p></div>
        <div data-r><Construction /></div>
      </section>

      <section className={`${s.sec} ${s.cream}`}>
        <div className={s.secHead}><p className={s.kicker} data-r>02 · Déclinaisons</p><h2 className={s.h2} data-r>Un logo, toutes les situations.</h2></div>
        <div className={s.variants}>
          <figure data-r className={s.v1}><Lockup size={56} id="v1" /><figcaption>Principal</figcaption></figure>
          <figure data-r style={{ ["--d" as string]: ".06s" }} className={s.v2}><Lockup size={56} color={MONA.vanille} id="v2" /><figcaption>Sur fond sombre</figcaption></figure>
          <figure data-r style={{ ["--d" as string]: ".12s" }} className={s.v3}><Lockup size={56} color={MONA.chocolat} scoop={MONA.chocolat} cone={MONA.chocolat} id="v3" /><figcaption>Une couleur (tampon, gravure)</figcaption></figure>
          <figure data-r style={{ ["--d" as string]: ".18s" }} className={s.v4}><span className={s.appIcon}><Symbol size={74} scoop={MONA.vanille} id="v4" /></span><figcaption>Icône d&apos;application</figcaption></figure>
          <figure data-r style={{ ["--d" as string]: ".24s" }} className={s.v5}>
            <svg viewBox="0 0 200 200" className={s.badge} aria-label="Badge rond Mona, glaces artisanales" role="img">
              <defs><path id="circ" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0" /></defs>
              <text className={s.badgeTxt}><textPath href="#circ">GLACES ARTISANALES · FAITES CHAQUE MATIN · </textPath></text>
            </svg>
            <span className={s.badgeMark}><Symbol size={70} id="v5" /></span>
            <figcaption>Badge (autocollant, vitrine)</figcaption>
          </figure>
          <figure data-r style={{ ["--d" as string]: ".3s" }} className={s.v6}><Symbol size={70} scoop={MONA.pistache} id="v6a" /><Symbol size={70} scoop={MONA.vanille} id="v6b" /><Symbol size={70} scoop={MONA.myrtille} id="v6c" /><figcaption>La boule change selon le parfum</figcaption></figure>
        </div>
      </section>

      <section className={s.sec}>
        <div className={s.secHead}><p className={s.kicker} data-r>03 · Couleurs</p><h2 className={s.h2} data-r>Cinq parfums, cinq couleurs.</h2><p className={s.lead} data-r>Clique sur une couleur pour copier son code.</p></div>
        <Palette />
      </section>

      <section className={`${s.sec} ${s.cream}`}>
        <div className={s.secHead}><p className={s.kicker} data-r>04 · Typographies</p><h2 className={s.h2} data-r>Une typo ronde comme une boule de glace.</h2></div>
        <div data-r><Specimen /></div>
      </section>

      <section className={s.sec}>
        <div className={s.secHead}><p className={s.kicker} data-r>05 · Applications</p><h2 className={s.h2} data-r>La marque dans la vraie vie.</h2></div>
        <div className={s.apps}>
          <figure className={s.cup} data-r>
            <div className={s.cupBody}><Lockup size={36} id="cup" /><small>Fraise · basilic</small></div>
            <div className={s.cupLid} />
            <figcaption>Pot 500 ml</figcaption>
          </figure>
          <figure className={s.shop} data-r style={{ ["--d" as string]: ".1s" }}>
            <div className={s.awning} />
            <div className={s.facade}><Lockup size={44} color={MONA.vanille} scoop={MONA.fraise} id="shop" /><div className={s.window}><Image src="/demos/mona/cornets.jpg" alt="" fill sizes="300px" /></div></div>
            <figcaption>Devanture</figcaption>
          </figure>
          <figure className={s.post} data-r style={{ ["--d" as string]: ".2s" }}>
            <div className={s.postImg}><Image src="/demos/mona/cornet.jpg" alt="Cornet de glace rose tenu devant un mur jaune" fill sizes="300px" /><span className={s.postTag}>Nouveau parfum</span></div>
            <div className={s.postBar}><Symbol size={26} id="post" /><b>glaces.mona</b><span>♥ Rose litchi, dispo ce week-end</span></div>
            <figcaption>Publication Instagram</figcaption>
          </figure>
          <figure className={s.loyalFig} data-r style={{ ["--d" as string]: ".3s" }}><LoyaltyCard /><figcaption>Carte de fidélité (clique dessus)</figcaption></figure>
        </div>
      </section>

      <section className={`${s.sec} ${s.cream} ${s.motion}`}>
        <div className={s.secHead}><p className={s.kicker} data-r>06 · En mouvement</p><h2 className={s.h2} data-r>Le logo s&apos;anime pour les réseaux.</h2><p className={s.lead} data-r>Une animation de 10 secondes, livrée au format TikTok et Reels, pour annoncer l&apos;ouverture et chaque nouveau parfum.</p></div>
        <video className={s.motionVid} src="/video/demos/mona.mp4" poster="/video/demos/mona.jpg" autoPlay muted loop playsInline preload="metadata" aria-label="Animation du logo Mona" data-r />
      </section>

      <section className={s.photoBand} aria-hidden="true">
        <div><Image src="/demos/mona/coupe.jpg" alt="" fill sizes="33vw" /></div>
        <div className={s.bandLogo}><Lockup size={70} color={MONA.chocolat} id="band" /></div>
        <div><Image src="/demos/mona/cornets.jpg" alt="" fill sizes="33vw" /></div>
      </section>

      <footer className={s.foot}>Glaces Mona est une marque imaginaire · Photos : Unsplash · Identité réalisée par Au Pixel Près</footer>
    </div>
  );
}

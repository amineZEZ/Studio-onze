import Image from "next/image";
import s from "./mona.module.css";
import { Construction, LoyaltyCard, Palette, Specimen } from "./Interactive";
import { Lockup, MONA, Symbol } from "./Logo";

export default function Mona() {
  return (
    <div className={s.root}>
      <section className={s.hero}>
        <div className={s.heroTxt}>
          <p className={s.client} data-r>Glaces Mona · Marseille</p>
          <h1 className={s.h1} data-r style={{ ["--d" as string]: ".1s" }}>Identité visuelle d&apos;un glacier de quartier.</h1>
          <p className={s.lead} data-r style={{ ["--d" as string]: ".2s" }}>Mona change de parfums chaque semaine. Il lui fallait un logo qui se reconnaît de loin, des couleurs gourmandes et des modèles prêts à l&apos;emploi pour la boutique et Instagram.</p>
          <ul className={s.deliv} data-r style={{ ["--d" as string]: ".3s" }}><li>Logo et déclinaisons</li><li>Couleurs et typographies</li><li>Modèles Instagram</li><li>Étiquettes et carte de fidélité</li><li>Logo animé</li></ul>
        </div>
        <div className={s.heroVisual} data-r style={{ ["--d" as string]: ".15s" }}>
          <div className={s.heroPhoto}><Image src="/d/mona/cornet-jaune.jpg" alt="Cornet de glace à la fraise tenu devant un mur jaune" fill priority sizes="(max-width:980px) 100vw, 45vw" /></div>
          <div className={s.heroSticker}><Symbol size={120} id="hero" /></div>
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
        <div className={s.secHead}><p className={s.kicker} data-r>05 · Instagram</p><h2 className={s.h2} data-r>Des modèles prêts à publier.</h2><p className={s.lead} data-r>Photos de la boutique et publications aux couleurs de Mona, pour annoncer les parfums de la semaine sans repartir de zéro.</p></div>
        <div className={s.feed}>
          <div className={s.post} data-r><Image src="/d/mona/vitrine.jpg" alt="Vitrine de glaces en bacs" fill sizes="(max-width:700px) 33vw, 260px" /></div>
          <div className={`${s.post} ${s.tPink}`} data-r style={{ ["--d" as string]: ".05s" }}><small>Parfum de la semaine</small><b>Fraise<br />&amp; basilic</b><Symbol size={54} id="p1" /></div>
          <div className={s.post} data-r style={{ ["--d" as string]: ".1s" }}><Image src="/d/mona/cornet-rue.jpg" alt="Cornet double boule tenu dans la rue" fill sizes="(max-width:700px) 33vw, 260px" /></div>
          <div className={`${s.post} ${s.tChoc}`} data-r style={{ ["--d" as string]: ".15s" }}><small>Ouvert dès</small><b>samedi<br />14 h</b><span>Glaces Mona</span></div>
          <div className={s.post} data-r style={{ ["--d" as string]: ".2s" }}><Image src="/d/mona/boules.jpg" alt="Trois boules de glace abricot" fill sizes="(max-width:700px) 33vw, 260px" /></div>
          <div className={`${s.post} ${s.tGreen}`} data-r style={{ ["--d" as string]: ".25s" }}><small>Nouveau</small><b>Pistache<br />de Sicile</b><Symbol size={54} scoop="#A8D5A2" id="p2" /></div>
          <div className={`${s.post} ${s.tCream}`} data-r style={{ ["--d" as string]: ".3s" }}><small>Cette semaine</small><ol><li>Fraise &amp; basilic</li><li>Pistache</li><li>Chocolat noir</li><li>Abricot</li><li>Vanille</li></ol></div>
          <div className={s.post} data-r style={{ ["--d" as string]: ".35s" }}><Image src="/d/mona/chocolat.jpg" alt="Cornets au chocolat sur une assiette noire" fill sizes="(max-width:700px) 33vw, 260px" /></div>
          <div className={s.post} data-r style={{ ["--d" as string]: ".4s" }}><Image src="/d/mona/paillettes.jpg" alt="Cornets colorés et vermicelles" fill sizes="(max-width:700px) 33vw, 260px" /></div>
        </div>
      </section>

      <section className={`${s.sec} ${s.cream}`}>
        <div className={s.secHead}><p className={s.kicker} data-r>06 · En boutique</p><h2 className={s.h2} data-r>Étiquettes et fidélité.</h2></div>
        <div className={s.shopRow}>
          <figure className={s.lids} data-r>
            {[["Fraise", "#FF8FAB"], ["Pistache", "#A8D5A2"], ["Chocolat", "#4A2C21"]].map(([n, c], i) => (
              <div key={n} className={s.lid} style={{ background: c, color: n === "Chocolat" ? "#FFF4DC" : "#4A2C21", ["--r" as string]: `${(i - 1) * 6}deg` }}>
                <span className={s.lidName}>{n}</span><span className={s.lidMona}>mona</span><span className={s.lidSize}>500 ml</span>
              </div>
            ))}
            <figcaption>Couvercles des pots, une couleur par parfum</figcaption>
          </figure>
          <figure className={s.loyalFig} data-r style={{ ["--d" as string]: ".1s" }}><LoyaltyCard /><figcaption>Carte de fidélité (clique pour tamponner)</figcaption></figure>
        </div>
      </section>

      <section className={`${s.sec} ${s.cream} ${s.motion}`}>
        <div className={s.secHead}><p className={s.kicker} data-r>07 · En mouvement</p><h2 className={s.h2} data-r>Le logo s&apos;anime pour les réseaux.</h2><p className={s.lead} data-r>Une animation de 10 secondes, livrée au format TikTok et Reels, pour annoncer l&apos;ouverture et chaque nouveau parfum.</p></div>
        <video className={s.motionVid} src="/video/demos/mona.mp4" poster="/video/demos/mona.jpg" autoPlay muted loop playsInline preload="metadata" aria-label="Animation du logo Mona" data-r />
      </section>

      <section className={s.photoBand} aria-hidden="true">
        <div><Image src="/d/mona/cornets.jpg" alt="" fill sizes="33vw" /></div>
        <div className={s.bandLogo}><Lockup size={70} color={MONA.chocolat} id="band" /></div>
        <div><Image src="/d/mona/batonnets.jpg" alt="" fill sizes="33vw" /></div>
      </section>

      <footer className={s.foot}>Glaces Mona est une marque imaginaire · Photos : Unsplash · Identité réalisée par Au Pixel Près</footer>
    </div>
  );
}

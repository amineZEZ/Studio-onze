import { Footer, Nav } from "@/components/Chrome";
import { DevisForm } from "@/components/DevisForm";
import { InViewVideo } from "@/components/fx/InViewVideo";
import { Motion } from "@/components/fx/Motion";
import { MotionPlayground } from "@/components/fx/MotionPlayground";
import { PixelHero } from "@/components/fx/PixelHero";
import { ServiceList } from "@/components/fx/ServiceList";
import { archivo } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import { demos, faq, offers, site, steps } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "ProfessionalService", name: site.name, url: site.url, description: site.description, areaServed: "FR", priceRange: "150 € – 3 000 €+" },
    { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

const marquee = ["Logo", "Motion design", "Sites internet", "SaaS", "TikTok & Reels", "Identité visuelle"];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Motion />
      <Nav />
      <main>
        {/* HERO : le logo en pixels 3D */}
        <section className="hero" aria-labelledby="hero-t">
          <div className="hero-meta pixel">
            <span>Studio créatif indépendant</span>
            <span>Logo · Motion · Web · SaaS</span>
            <span className="fine-only">Bouge la souris sur les pixels</span><span className="touch-only">Touche les pixels</span>
          </div>
          <PixelHero fontFamily={archivo.style.fontFamily} />
          <div className="hero-foot">
            <h1 id="hero-t" className="display" data-split>Des marques réglées <em>au pixel près.</em></h1>
            <div className="hero-side" data-reveal="0.3">
              <p>Logo, vidéos animées pour TikTok et Reels, sites internet et applications. Tout ce qu&apos;il faut pour que ta marque se voie, bouge et se retienne.</p>
              <div className="cta">
                <a className="btn btn-red" href="#devis" data-magnetic data-cursor="Go">Demander un devis gratuit</a>
                <a className="btn btn-line" href="#travaux" data-cursor="Voir">Voir les travaux</a>
              </div>
            </div>
          </div>
        </section>

        {/* BANDEAU DÉFILANT (penche avec la vitesse de défilement) */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-in">
            {[0, 1].map((k) => <span key={k}>{marquee.map((m) => <b key={m}>{m}<i className="px" /></b>)}</span>)}
          </div>
        </div>

        {/* SERVICES */}
        <section id="services" className="sec" aria-labelledby="services-t">
          <div className="sec-head">
            <p className="label pixel">01 · Services</p>
            <h2 id="services-t" className="h2" data-split>Ce qu&apos;on fabrique pour toi</h2>
          </div>
          <ServiceList />
        </section>

        {/* TRAVAUX */}
        <section id="travaux" className="sec dark work" aria-labelledby="travaux-t">
          <div className="sec-head">
            <p className="label pixel">02 · Travaux</p>
            <p className="tag-red pixel">Projet maison</p>
          </div>
          <div className="work-grid">
            <div className="work-txt">
              <h2 id="travaux-t" className="mega" data-split>Collabz</h2>
              <p data-reveal>Un SaaS qui aide les créateurs de contenu à trouver les marques qui paient. Nom, logo, site, application, paiement en ligne, emails et vidéos de lancement : tout a été fait par le studio.</p>
              <dl className="facts">
                <div><dt>Vidéos TikTok / Reels</dt><dd data-count="6">6</dd></div>
                <div><dt>Guides pour Google</dt><dd data-count="22">22</dd></div>
                <div><dt>Site + application</dt><dd>1</dd></div>
              </dl>
              <a className="btn btn-paper" href="https://joincollabz.com" target="_blank" rel="noopener" data-cursor="Ouvrir">Voir le site en ligne ↗</a>
            </div>
            <div className="phones">
              <figure className="phone p1" data-parallax="0.12"><InViewVideo src="/video/pub.mp4" poster="/video/pub.jpg" label="Vidéo publicitaire Collabz, 17 secondes" /><figcaption className="pixel">Pub · 17 s</figcaption></figure>
              <figure className="phone p2" data-parallax="-0.08"><InViewVideo src="/video/motion.mp4" poster="/video/motion.jpg" label="Vidéo motion design Collabz" /><figcaption className="pixel">Motion design</figcaption></figure>
              <figure className="phone p3" data-parallax="0.2"><InViewVideo src="/video/reel.mp4" poster="/video/reel.jpg" label="Reel Instagram Collabz" /><figcaption className="pixel">Reel · 4K</figcaption></figure>
            </div>
          </div>
        </section>


        {/* DÉMOS : de vrais projets qui fonctionnent, pour des marques imaginaires */}
        <section id="demos" className="sec" aria-labelledby="demos-t">
          <div className="sec-head split">
            <div>
              <p className="label pixel">03 · Démos</p>
              <h2 id="demos-t" className="h2" data-split>Clique, teste, c&apos;est réel.</h2>
            </div>
            <p className="lead" data-reveal>Quatre projets complets pour des marques imaginaires : un site, une application, un logiciel et une identité visuelle. Ils fonctionnent vraiment, essaie-les comme le ferait ton client.</p>
          </div>
          <div className="demos">
            {demos.map((d, i) => (
              <Link key={d.slug} href={`/demos/${d.slug}`} className="demo-card" data-reveal={i * 0.08} data-cursor="Tester" style={{ ["--c" as string]: d.color }}>
                <div className="demo-media">
                  {"video" in d && d.video ? <InViewVideo src={d.video} poster={d.poster!} label={`Vidéo de la démo ${d.name}`} /> : <Image src={d.image!} alt={`Aperçu du logiciel ${d.name}`} fill sizes="(max-width:900px) 92vw, 25vw" />}
                  <span className="demo-kind pixel">{d.kind}</span>
                </div>
                <h3>{d.name}</h3>
                <p>{d.text}</p>
                <span className="demo-go">Ouvrir la démo <i aria-hidden="true">→</i></span>
              </Link>
            ))}
          </div>
          <p className="after pixel">Marques imaginaires · photos Unsplash · tout le reste est fait par le studio</p>
        </section>

        {/* MOTION DESIGN EN DIRECT */}
        <section id="motion" className="sec" aria-labelledby="motion-t">
          <div className="sec-head split">
            <div>
              <p className="label pixel">04 · En direct</p>
              <h2 id="motion-t" className="h2" data-split>Le motion design, c&apos;est ça. Essaie.</h2>
            </div>
            <p className="lead" data-reveal>Une animation qui accroche, c&apos;est une question de rythme. Glisse la tête de lecture, change la courbe, regarde le pixel réagir. On règle chaque image de tes vidéos avec ce soin.</p>
          </div>
          <div data-reveal><MotionPlayground /></div>
        </section>

        {/* PRIX */}
        <section id="offres" className="sec" aria-labelledby="offres-t">
          <div className="sec-head split">
            <div>
              <p className="label pixel">05 · Prix</p>
              <h2 id="offres-t" className="h2" data-split>Des prix clairs, dès le départ</h2>
            </div>
            <p className="lead" data-reveal>Prix de départ, ajustés selon ton projet. Le devis est gratuit et sans engagement.</p>
          </div>
          <ul className="offers">
            {offers.map((o) => (
              <li key={o.title} className={o.star ? "offer star" : "offer"} data-reveal>
                <span className="o-delay pixel">{o.delay}</span>
                <h3 className="o-title">{o.title}</h3>
                <ul className="o-items">{o.items.map((i) => <li key={i}>{i}</li>)}</ul>
                <p className="o-price"><span data-count={o.price}>{new Intl.NumberFormat("fr-FR").format(o.price).replace(/ | /g, " ")}</span> €<small>et +</small></p>
              </li>
            ))}
          </ul>
          <p className="after pixel">SaaS et applications sur mesure : sur devis, à partir de 3 000 €</p>
        </section>

        {/* MÉTHODE : défilement horizontal */}
        <section id="methode" className="sec hsec" data-hscroll aria-labelledby="methode-t">
          <div className="htrack">
            <div className="hpanel intro">
              <p className="label pixel">06 · Méthode</p>
              <h2 id="methode-t" className="h2">Comment ça se passe</h2>
              <p className="pixel hint">Défile →</p>
            </div>
            {steps.map((s, i) => (
              <article key={s.title} className="hpanel step">
                <span className="step-n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="sec" aria-labelledby="faq-t">
          <div className="sec-head">
            <p className="label pixel">07 · Questions</p>
            <h2 id="faq-t" className="h2" data-split>Tu te demandes peut-être…</h2>
          </div>
          <div className="faq">
            {faq.map((f) => <details key={f.q} data-reveal><summary data-cursor="Ouvrir">{f.q}<i aria-hidden="true" /></summary><p>{f.a}</p></details>)}
          </div>
        </section>

        {/* DEVIS */}
        <section id="devis" className="sec dark devis" aria-labelledby="devis-t">
          <div className="devis-grid">
            <div>
              <p className="label pixel">08 · Devis</p>
              <h2 id="devis-t" className="mega" data-split>Parlons-en.</h2>
              <p className="lead" data-reveal>Réponse sous 48 h avec un devis gratuit. Pas besoin d&apos;avoir tout prévu : quelques lignes suffisent.</p>
              <p className="pixel small-note">Pas d&apos;engagement · Acompte seulement si tu valides</p>
            </div>
            <div data-reveal><DevisForm /></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

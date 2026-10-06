import Image from "next/image";
import { Footer, Nav } from "@/components/Chrome";
import { DevisForm } from "@/components/DevisForm";
import { Timeline } from "@/components/Timeline";
import { faq, formatPrice, offers, services, site, steps } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "ProfessionalService", name: site.name, url: site.url, description: site.description, areaServed: "FR", priceRange: "150 € – 3 000 €+" },
    { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Nav />
      <main>
        <div className="wrap">
          <header className="hero" id="top">
            <div>
              <p className="mono">Studio créatif · Logo · Motion design · Sites &amp; SaaS</p>
              <h1>On donne du <em>mouvement</em> à ta marque.</h1>
              <p className="lead">Logo, vidéos animées pour TikTok et Reels, site internet ou application : on crée tout ce qu&apos;il faut pour que ta marque se voie et se retienne.</p>
              <div className="cta">
                <a className="btn primary" href="#devis">Demander un devis gratuit →</a>
                <a className="btn" href="#travaux">Voir les réalisations</a>
              </div>
            </div>
            <Timeline />
          </header>
        </div>

        <section id="services" aria-labelledby="services-t">
          <div className="wrap">
            <div className="sh"><h2 id="services-t">Ce qu&apos;on fait pour toi</h2><p>Une seule personne pour ton image, tes vidéos et ton site : tout reste cohérent, et tu n&apos;as qu&apos;un interlocuteur.</p></div>
            <div className="services">
              {services.map((s) => (
                <article className="svc" key={s.title}>
                  <div className="glyph" aria-hidden="true">{s.glyph}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul>{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="travaux" aria-labelledby="travaux-t">
          <div className="wrap">
            <div className="sh"><h2 id="travaux-t">Réalisations</h2><p>Un exemple complet, du logo au produit en ligne. Les prochains projets clients s&apos;ajouteront ici.</p></div>
            <div className="case">
              <div className="case-info">
                <span className="tag">Projet maison</span>
                <h3>Collabz</h3>
                <p>Un SaaS qui aide les créateurs de contenu à trouver les marques qui paient. Nom, logo, site, application, paiement en ligne, emails et vidéos de lancement : tout a été fait par le studio.</p>
                <div className="facts">
                  <div><b>1</b><span>logo &amp; identité</span></div>
                  <div><b>1</b><span>site + application</span></div>
                  <div><b>6</b><span>vidéos TikTok / Reels</span></div>
                  <div><b>22</b><span>guides pour Google</span></div>
                </div>
                <a className="btn" href="https://joincollabz.com" target="_blank" rel="noopener" style={{ width: "max-content" }}>Voir le site en ligne ↗</a>
              </div>
              <div className="shots">
                <figure className="web"><Image src="/img/site.jpg" width={720} height={900} sizes="(max-width:560px) 92vw, 30vw" alt="Page d'accueil de Collabz sur téléphone : fond vert citron, titre « Trouve les marques qui paient les créateurs comme toi »" /><figcaption>Site · joincollabz.com</figcaption></figure>
                <figure className="phone"><Image src="/img/collabz-video-06-couverture.jpg" width={540} height={960} sizes="(max-width:560px) 45vw, 20vw" alt="Image de fin de la vidéo publicitaire Collabz" /><figcaption>Pub · 17 s</figcaption></figure>
                <figure className="phone"><Image src="/img/collabz-reel-01-couverture.jpg" width={540} height={960} sizes="(max-width:560px) 45vw, 20vw" alt="Couverture du Reel Collabz « Pas besoin d'avoir 1 000 000 d'abonnés »" /><figcaption>Reel · 4K</figcaption></figure>
              </div>
            </div>
          </div>
        </section>

        <section id="offres" aria-labelledby="offres-t">
          <div className="wrap">
            <div className="sh"><h2 id="offres-t">Offres &amp; prix</h2><p>Prix de départ, ajustés selon ton projet. Le devis est gratuit et sans engagement.</p></div>
            <div className="offers">
              {offers.map((o) => (
                <article className={o.star ? "offer star" : "offer"} key={o.title}>
                  <span className="mono">{o.delay}</span>
                  <h3>{o.title}</h3>
                  <div className="price">{formatPrice(o.price)} <small>et +</small></div>
                  <ul>{o.items.map((i) => <li key={i}>{i}</li>)}</ul>
                </article>
              ))}
            </div>
            <p style={{ color: "var(--muted)", marginTop: 18 }}>SaaS et applications sur mesure : sur devis, à partir de 3 000 €.</p>
          </div>
        </section>

        <section id="methode" aria-labelledby="methode-t">
          <div className="wrap">
            <div className="sh"><h2 id="methode-t">Comment ça se passe</h2><p>Des étapes claires, pour savoir à tout moment où en est ton projet.</p></div>
            <ol className="steps" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {steps.map((s) => <li className="step" key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>)}
            </ol>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-t">
          <div className="wrap">
            <div className="sh"><h2 id="faq-t">Questions fréquentes</h2></div>
            <div className="faq">
              {faq.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
            </div>
          </div>
        </section>

        <section id="devis" aria-labelledby="devis-t">
          <div className="wrap quote">
            <div>
              <div className="sh" style={{ marginBottom: 0 }}><h2 id="devis-t">Parle-nous de ton projet</h2></div>
              <p style={{ color: "var(--muted)", marginTop: 16, maxWidth: "40ch" }}>Réponse sous 48 h avec un devis gratuit. Pas besoin d&apos;avoir tout prévu : quelques lignes suffisent.</p>
            </div>
            <DevisForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

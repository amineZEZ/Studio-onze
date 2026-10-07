import Link from "next/link";
import { Clock } from "@/components/fx/Clock";
import { FooterPixels } from "@/components/fx/FooterPixels";
import { archivo } from "@/lib/fonts";
import { site } from "@/lib/site";

export function Logo() {
  return <>au pixel près<i className="px" aria-hidden="true" /></>;
}

export function Nav() {
  return (
    <header className="nav">
      <Link className="brand" href="/" aria-label={`${site.name}, accueil`} data-cursor="Accueil"><Logo /></Link>
      <span className="nav-clock pixel"><Clock /></span>
      <nav className="links" aria-label="Navigation principale">
        <Link href="/#services">Services</Link>
        <Link href="/#travaux">Travaux</Link>
        <Link href="/#demos">Démos</Link>
        <Link href="/#offres">Prix</Link>
        <Link className="btn btn-ink" href="/#devis" data-magnetic data-cursor="Go"><span className="hide-s">Demander un devis</span><span className="show-s">Devis</span></Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="foot-top">
        <p className="foot-cta">Un projet ? <Link href="/#devis" data-cursor="Écris">Parlons-en →</Link></p>
        <ul className="foot-links">
          <li><Link href="/#services">Services</Link></li>
          <li><Link href="/#travaux">Travaux</Link></li>
          <li><Link href="/#demos">Démos</Link></li>
          <li><Link href="/#offres">Prix</Link></li>
          <li><Link href="/mentions-legales">Mentions légales</Link></li>
          <li><Link href="/confidentialite">Confidentialité</Link></li>
        </ul>
      </div>
      <FooterPixels fontFamily={archivo.style.fontFamily} />
      <div className="foot-bottom pixel">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Logo · Motion design · Sites · SaaS</span>
        <Clock />
      </div>
    </footer>
  );
}

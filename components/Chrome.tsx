import Link from "next/link";
import { site } from "@/lib/site";

export function Nav() {
  return (
    <div className="wrap">
      <nav aria-label="Navigation principale">
        <Link className="brand" href="/" aria-label={`${site.name}, accueil`}>onze<i>.</i></Link>
        <div className="links">
          <Link href="/#travaux">Réalisations</Link>
          <Link href="/#offres">Offres</Link>
          <Link href="/#methode">Méthode</Link>
          <Link className="btn primary" href="/#devis">Demander un devis</Link>
        </div>
      </nav>
    </div>
  );
}

export function Footer() {
  return (
    <div className="wrap">
      <footer>
        <span>© {new Date().getFullYear()} {site.name} · Logo, motion design, sites et SaaS</span>
        <span className="socials">
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/confidentialite">Confidentialité</Link>
        </span>
      </footer>
    </div>
  );
}

import type { Metadata } from "next";
import { Footer, Nav } from "@/components/Chrome";
import { legal, site } from "@/lib/site";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" } };

const Todo = ({ v, label }: { v: string; label: string }) => (v ? <>{v}</> : <span className="todo">{label} à compléter</span>);

export default function MentionsLegales() {
  return (
    <>
      <Nav />
      <main className="wrap legal">
        <h1>Mentions légales</h1>
        <p>Dernière mise à jour : {legal.updated}</p>
        <h2>Éditeur du site</h2>
        <p>
          {site.name}, micro-entreprise de <Todo v={legal.name} label="Nom et prénom" /><br />
          Adresse : <Todo v={legal.address} label="Adresse" /><br />
          SIRET : <Todo v={legal.siret} label="SIRET" /><br />
          Contact : via le <a href="/#devis">formulaire du site</a>.<br />
          Directeur de la publication : <Todo v={legal.name} label="Nom et prénom" />
        </p>
        <h2>Hébergeur</h2>
        <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. vercel.com</p>
        <h2>Propriété intellectuelle</h2>
        <p>Les textes, logos, vidéos et images de ce site appartiennent à {site.name} ou à ses clients, qui ont autorisé leur présentation. Toute reproduction sans accord écrit est interdite.</p>
      </main>
      <Footer />
    </>
  );
}

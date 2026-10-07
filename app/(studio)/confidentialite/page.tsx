import type { Metadata } from "next";
import { Footer, Nav } from "@/components/Chrome";
import { legal, site } from "@/lib/site";

export const metadata: Metadata = { title: "Confidentialité", alternates: { canonical: "/confidentialite" } };

export default function Confidentialite() {
  return (
    <>
      <Nav />
      <main className="wrap legal">
        <h1>Confidentialité</h1>
        <p>Dernière mise à jour : {legal.updated}</p>
        <h2>Ce que nous recevons</h2>
        <p>Quand tu remplis le formulaire de devis, nous recevons ton prénom, ton email, ton besoin, ton budget et la description de ton projet. Ces informations nous sont envoyées par email (service Resend) et ne sont pas enregistrées sur le site.</p>
        <h2>Pourquoi</h2>
        <p>Uniquement pour te répondre et préparer ton devis. Elles ne sont ni vendues, ni partagées, ni utilisées pour de la publicité.</p>
        <h2>Combien de temps</h2>
        <p>Nous gardons l&apos;échange 3 ans au maximum après notre dernier contact, sauf si tu deviens client (les factures sont conservées 10 ans, comme la loi l&apos;exige).</p>
        <h2>Statistiques de visite</h2>
        <p>Le site mesure le nombre de visites avec Vercel Analytics, sans cookie et sans t&apos;identifier. Aucun cookie publicitaire n&apos;est utilisé, c&apos;est pourquoi aucun bandeau cookies ne s&apos;affiche.</p>
        <h2>Tes droits</h2>
        <p>Tu peux demander à consulter, corriger ou supprimer tes informations via le <a href="/#devis">formulaire du site</a>. Tu peux aussi contacter la CNIL (cnil.fr).</p>
        <p>Responsable : {site.name}.</p>
      </main>
      <Footer />
    </>
  );
}

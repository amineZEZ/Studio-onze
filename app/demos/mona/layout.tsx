import type { Metadata } from "next";
import { Bagel_Fat_One, Bricolage_Grotesque } from "next/font/google";
import { DemoBar } from "@/components/demo/DemoBar";
import { Reveal } from "@/components/demo/Reveal";

const bagel = Bagel_Fat_One({ subsets: ["latin"], weight: "400", variable: "--m-display", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--m-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Démo · Glaces Mona, identité visuelle",
  description: "Démo d'identité visuelle (marque imaginaire) : construction du logo, déclinaisons, couleurs, typographies et applications.",
  alternates: { canonical: "/demos/mona" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${bagel.variable} ${bricolage.variable}`}>
      <DemoBar kind="identité visuelle" />
      <Reveal />
      {children}
    </div>
  );
}

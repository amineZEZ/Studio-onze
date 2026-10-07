import type { Metadata } from "next";
import { Instrument_Sans, Young_Serif } from "next/font/google";
import { DemoBar } from "@/components/demo/DemoBar";
import { Reveal } from "@/components/demo/Reveal";

const serif = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--o-serif", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--o-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Démo · Fournil Odette, boulangerie",
  description: "Démo de site vitrine pour une boulangerie (marque imaginaire) : fournées du jour en direct, carte, commande à emporter.",
  alternates: { canonical: "/demos/odette" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${serif.variable} ${sans.variable}`}>
      <DemoBar kind="site vitrine" />
      <Reveal />
      {children}
    </div>
  );
}

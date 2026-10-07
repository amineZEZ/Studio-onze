import type { Metadata } from "next";
import { Barlow, Big_Shoulders } from "next/font/google";
import { DemoBar } from "@/components/demo/DemoBar";
import { Reveal } from "@/components/demo/Reveal";

const display = Big_Shoulders({ subsets: ["latin"], weight: ["700", "900"], variable: "--c-display", display: "swap" });
const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--c-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Démo · Coupe Franche, application de réservation",
  description: "Démo d'application de réservation pour un barbier (marque imaginaire) : prestation, barbier, créneau, confirmation.",
  alternates: { canonical: "/demos/coupe-franche" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${barlow.variable}`}>
      <DemoBar kind="application" />
      <Reveal />
      {children}
    </div>
  );
}

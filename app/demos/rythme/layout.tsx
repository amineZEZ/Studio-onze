import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { DemoBar } from "@/components/demo/DemoBar";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--r-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Démo · Rythme, logiciel pour coachs sportifs",
  description: "Démo de SaaS (marque imaginaire) : tableau de bord, chiffre d'affaires, planning, clients et ajout de séances.",
  alternates: { canonical: "/demos/rythme" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={jakarta.variable}>
      <DemoBar kind="SaaS" />
      {children}
    </div>
  );
}

import { Archivo, Silkscreen } from "next/font/google";

/** Archivo variable (graisse + largeur) : la largeur s'anime au survol. Silkscreen : police « pixel » pour les petits repères. */
export const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
export const silkscreen = Silkscreen({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-pixel", display: "swap" });

import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { archivo, silkscreen } from "@/lib/fonts";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "fr_FR", url: "/", siteName: site.name, title: site.title, description: site.description },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  verification: process.env.GOOGLE_SITE_VERIFICATION?.trim() ? { google: process.env.GOOGLE_SITE_VERIFICATION.trim() } : undefined,
};

export const viewport: Viewport = { themeColor: "#F2F2EF", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${archivo.variable} ${silkscreen.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

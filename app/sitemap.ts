import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/demos/odette", "/demos/coupe-franche", "/demos/rythme", "/demos/mona", "/mentions-legales", "/confidentialite"].map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: !p ? 1 : p.startsWith("/demos") ? 0.6 : 0.3 }));
}

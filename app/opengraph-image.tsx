import { ImageResponse } from "next/og";

export const alt = "Au Pixel Près · Logo, motion design et sites internet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  // Grille de pixels en fond, logo et accroche.
  const cells = Array.from({ length: 12 * 6 }, (_, i) => i);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0E0E10", color: "#F2F2EF", fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ position: "absolute", right: 60, top: 60, display: "flex", flexWrap: "wrap", width: 12 * 22, gap: 6 }}>
          {cells.map((i) => <div key={i} style={{ width: 16, height: 16, background: i === 29 ? "#FF3D17" : i % 7 === 0 ? "#26262c" : "#1A1A1E" }} />)}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", fontSize: 60, fontWeight: 800, letterSpacing: -2 }}>
          au pixel près<div style={{ width: 16, height: 16, background: "#FF3D17", marginLeft: 6, marginBottom: 14 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4, display: "flex", flexWrap: "wrap" }}>
            Des marques réglées&nbsp;<span style={{ color: "#FF3D17" }}>au pixel près.</span>
          </div>
          <div style={{ fontSize: 30, color: "#9C9CA5" }}>Logo · Motion design · Sites internet · SaaS</div>
        </div>
      </div>
    ),
    size,
  );
}

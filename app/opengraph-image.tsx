import { ImageResponse } from "next/og";

export const alt = "Au Pixel Près · Logo, motion design et sites internet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#121426", color: "#F1F2F6", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "#3340F5" }} />
          <div style={{ fontSize: 56, fontWeight: 800, display: "flex" }}>au pixel près<span style={{ width: 18, height: 18, background: "#FF6A3D", marginLeft: 6, marginTop: 34 }} /></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1, display: "flex", flexWrap: "wrap" }}>
            On donne du&nbsp;<span style={{ color: "#7C86FF" }}>mouvement</span>&nbsp;à ta marque.
          </div>
          <div style={{ fontSize: 32, color: "#A3A7C2" }}>Logo · Motion design · Sites internet · SaaS</div>
        </div>
      </div>
    ),
    size,
  );
}

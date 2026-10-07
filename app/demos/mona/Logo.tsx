/** Logo Glaces Mona : une boule de glace qui coule sur un cornet gaufré. Couleurs paramétrables pour les déclinaisons. */
export const MONA = { fraise: "#FF8FAB", pistache: "#A8D5A2", vanille: "#FFF4DC", chocolat: "#4A2C21", caramel: "#E8A04C", myrtille: "#5B5BD6" };

export const SCOOP = "M14 58C14 30 30 12 50 12C70 12 86 30 86 58C82 66 76 60 72 66C68 74 62 64 58 70C54 79 46 79 43 70C39 62 34 72 29 66C25 60 18 66 14 58Z";
export const CONE = "M22 62L78 62L50 116Z";

export function Symbol({ scoop = MONA.fraise, cone = MONA.caramel, line = MONA.chocolat, size = 120, id = "s" }: { scoop?: string; cone?: string; line?: string; size?: number; id?: string }) {
  return (
    <svg viewBox="0 0 100 120" width={size * 0.833} height={size} aria-hidden="true">
      <defs><clipPath id={`cone-${id}`}><path d={CONE} /></clipPath></defs>
      <path d={CONE} fill={cone} />
      <g clipPath={`url(#cone-${id})`} stroke={line} strokeWidth="2.4" opacity=".55">
        {[-30, -15, 0, 15, 30, 45].map((o) => <line key={`a${o}`} x1={20 + o} y1="60" x2={60 + o} y2="120" />)}
        {[-30, -15, 0, 15, 30, 45].map((o) => <line key={`b${o}`} x1={80 - o} y1="60" x2={40 - o} y2="120" />)}
      </g>
      <path d={SCOOP} fill={scoop} />
      <ellipse cx="36" cy="30" rx="7" ry="4.5" fill="#fff" opacity=".55" transform="rotate(-30 36 30)" />
    </svg>
  );
}

export function Lockup({ color = MONA.chocolat, scoop, cone, size = 80, id = "l" }: { color?: string; scoop?: string; cone?: string; size?: number; id?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.12, color }}>
      <Symbol size={size} scoop={scoop} cone={cone} line={color} id={id} />
      <span style={{ fontFamily: "var(--m-display), sans-serif", fontSize: size * 0.78, lineHeight: 1, letterSpacing: "-.02em" }}>mona</span>
    </span>
  );
}

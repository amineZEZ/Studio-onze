"use client";

import { useEffect, useState } from "react";

/** Heure de Paris en direct (le studio est en France). */
export function Clock() {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" });
    const up = () => setT(f.format(new Date()));
    up(); const id = setInterval(up, 15000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>France · {t}</span>;
}

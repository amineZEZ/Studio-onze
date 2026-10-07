import Link from "next/link";
import s from "./demo.module.css";

/**
 * Bandeau en haut de chaque démo : on dit clairement que la marque est imaginaire
 * (projet de démonstration du studio), et on propose de revenir ou de demander la même chose.
 */
export function DemoBar({ kind }: { kind: string }) {
  return (
    <div className={s.bar} role="note">
      <span className={s.dot} aria-hidden="true" />
      <span className={s.txt}><b>Démo {kind}</b> · marque imaginaire créée par Au Pixel Près</span>
      <span className={s.actions}>
        <Link href="/#demos">← Studio</Link>
        <Link href="/#devis" className={s.cta}>Je veux le même</Link>
      </span>
    </div>
  );
}

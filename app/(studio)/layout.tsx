import { Cursor } from "@/components/fx/Cursor";
import { SmoothScroll } from "@/components/fx/SmoothScroll";

/** Pages du studio : défilement fluide, curseur réticule et style « Au Pixel Près ». */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="studio">
      <SmoothScroll />
      <Cursor />
      {children}
    </div>
  );
}

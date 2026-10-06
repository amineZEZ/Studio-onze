"use client";

import { useEffect, useRef } from "react";

/**
 * Le logo « au pixel près. » construit avec de vrais cubes 3D (Three.js).
 * - À l'arrivée, les cubes volent depuis tous les coins et se rangent à leur place.
 * - La souris (ou le doigt) soulève les pixels comme une vague.
 * - En descendant la page, ils se dispersent.
 * Sans WebGL ou avec « moins d'animations », le texte normal de la page suffit (le canvas est décoratif).
 */
export function PixelHero({ fontFamily }: { fontFamily: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = box.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dispose = () => {};
    let cancelled = false;

    (async () => {
      const THREE = await import("three");
      await document.fonts.load(`900 120px ${fontFamily}`).catch(() => {});
      if (cancelled) return;

      // 1. Dessine le logo dans un petit canvas invisible et récupère un point par « pixel » plein.
      const narrow = host.clientWidth < 700;
      const lines = narrow ? ["au pixel", "près"] : ["au pixel près"];
      const fs = 120, step = narrow ? 7 : 8;
      const c = document.createElement("canvas"), g = c.getContext("2d", { willReadFrequently: true })!;
      g.font = `900 ${fs}px ${fontFamily}`;
      const w = Math.ceil(Math.max(...lines.map((l) => g.measureText(l).width)) + fs * 0.55);
      const h = Math.ceil(fs * 1.02 * lines.length + fs * 0.1);
      c.width = w; c.height = h;
      g.font = `900 ${fs}px ${fontFamily}`; g.textBaseline = "alphabetic"; g.fillStyle = "#000";
      lines.forEach((l, i) => g.fillText(l, 0, fs * 0.86 + i * fs * 1.0));
      // Le point final est un pixel rouge, posé après le dernier mot.
      const last = lines[lines.length - 1], lw = g.measureText(last).width, dot = fs * 0.24;
      g.fillStyle = "#f00"; g.fillRect(lw + fs * 0.06, fs * 0.86 + (lines.length - 1) * fs - dot, dot, dot);
      const data = g.getImageData(0, 0, w, h).data;

      type P = { x: number; y: number; red: boolean };
      const pts: P[] = [];
      for (let y = 0; y < h; y += step)
        for (let x = 0; x < w; x += step) {
          const i = (y * w + x) * 4;
          if (data[i + 3] > 140) pts.push({ x: x / step, y: y / step, red: data[i] > 200 && data[i + 1] < 60 });
        }
      const cols = w / step, rows = h / step;

      // 2. Scène 3D.
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      host.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 2000);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x9a9a9a, 2.1));
      const sun = new THREE.DirectionalLight(0xffffff, 2.4); sun.position.set(-30, 60, 90); scene.add(sun);
      const rim = new THREE.DirectionalLight(0xff6a4d, 1.2); rim.position.set(60, -20, 40); scene.add(rim);

      const n = pts.length;
      const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.84, 0.84, 0.84), new THREE.MeshStandardMaterial({ roughness: 0.42, metalness: 0.08 }), n);
      const group = new THREE.Group(); group.add(mesh); scene.add(group);

      const ink = new THREE.Color("#0E0E10"), ink2 = new THREE.Color("#26262c");
      const red = new THREE.Color("#FF3D17"), green = new THREE.Color("#18C46A"), blue = new THREE.Color("#2E5BFF");
      const T = new Float32Array(n * 3), S = new Float32Array(n * 3), D = new Float32Array(n * 3), delay = new Float32Array(n), spin = new Float32Array(n * 3), lift = new Float32Array(n);
      pts.forEach((p, i) => {
        T[i * 3] = p.x - cols / 2; T[i * 3 + 1] = rows / 2 - p.y; T[i * 3 + 2] = 0;
        const a = Math.random() * Math.PI * 2, r = 60 + Math.random() * 80;
        S[i * 3] = Math.cos(a) * r; S[i * 3 + 1] = Math.sin(a) * r * 0.7; S[i * 3 + 2] = -40 + Math.random() * 120;
        const len = Math.hypot(T[i * 3], T[i * 3 + 1]) || 1;
        D[i * 3] = T[i * 3] / len + (Math.random() - 0.5); D[i * 3 + 1] = T[i * 3 + 1] / len + (Math.random() - 0.5); D[i * 3 + 2] = Math.random() * 1.5;
        delay[i] = (p.x / cols) * 0.55 + Math.random() * 0.35;
        spin[i * 3] = (Math.random() - 0.5) * 8; spin[i * 3 + 1] = (Math.random() - 0.5) * 8; spin[i * 3 + 2] = (Math.random() - 0.5) * 8;
        const roll = Math.random();
        mesh.setColorAt(i, p.red ? red : roll < 0.012 ? red : roll < 0.022 ? green : roll < 0.032 ? blue : roll < 0.4 ? ink2 : ink);
      });
      mesh.instanceColor!.needsUpdate = true;

      // Cadre : le logo occupe ~88 % de la largeur (et tient en hauteur).
      const fit = () => {
        const W = host.clientWidth, H = host.clientHeight;
        renderer.setSize(W, H, false);
        renderer.domElement.style.width = "100%"; renderer.domElement.style.height = "100%";
        camera.aspect = W / H;
        const v = THREE.MathUtils.degToRad(camera.fov) / 2, hz = Math.atan(Math.tan(v) * camera.aspect);
        camera.position.set(0, 0, Math.max((cols * 0.56) / Math.tan(hz), (rows * 0.62) / Math.tan(v)));
        camera.updateProjectionMatrix();
      };
      fit();
      const ro = new ResizeObserver(fit); ro.observe(host);

      // 3. Souris / doigt → point sur le plan du logo.
      const ray = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), ndc = new THREE.Vector2(9, 9), hit = new THREE.Vector3(999, 999, 0);
      let tx = 0, ty = 0, gx = 0, gy = 0, active = false;
      const onMove = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        tx = ndc.x; ty = ndc.y; active = true;
      };
      const onLeave = () => { active = false; tx = 0; ty = 0; };
      addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);

      // 4. Animation.
      const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), pos = new THREE.Vector3(), one = new THREE.Vector3(1, 1, 1);
      const easeOut = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
      let t0 = performance.now(), raf = 0, visible = true;
      if (reduced) t0 -= 10000;
      const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); });
      io.observe(host);

      function frame(now: number) {
        raf = 0;
        const t = (now - t0) / 1000;
        const sc = Math.min(1, Math.max(0, scrollY / (host.offsetHeight * 1.1)));
        if (active) { ray.setFromCamera(ndc, camera); ray.ray.intersectPlane(plane, hit); } else hit.set(999, 999, 0);
        gx += (ty * 0.18 - gx) * 0.06; gy += (tx * 0.32 - gy) * 0.06;
        group.rotation.set(-gx + sc * 0.6, gy + sc * 0.4, 0);
        for (let i = 0; i < n; i++) {
          const k = easeOut(Math.min(1, Math.max(0, (t - delay[i]) / 1.25)));
          const bx = T[i * 3], by = T[i * 3 + 1];
          const d = Math.hypot(bx - hit.x, by - hit.y), f = Math.max(0, 1 - d / 9);
          lift[i] += (f * f * 6 - lift[i]) * 0.14;
          const wave = reduced ? 0 : Math.sin(t * 1.6 + bx * 0.12 + by * 0.2) * 0.18 * k;
          const s2 = sc * sc * 70;
          pos.set(
            S[i * 3] + (bx - S[i * 3]) * k + D[i * 3] * s2,
            S[i * 3 + 1] + (by - S[i * 3 + 1]) * k + D[i * 3 + 1] * s2,
            S[i * 3 + 2] * (1 - k) + lift[i] + wave + D[i * 3 + 2] * s2,
          );
          const spinK = (1 - k) + sc * 1.5 + lift[i] * 0.08;
          e.set(spin[i * 3] * spinK, spin[i * 3 + 1] * spinK, spin[i * 3 + 2] * spinK);
          q.setFromEuler(e);
          m.compose(pos, q, one);
          mesh.setMatrixAt(i, m);
        }
        mesh.instanceMatrix.needsUpdate = true;
        renderer.render(scene, camera);
        host.dataset.ready = "1";
        if (visible && !reduced) raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);

      dispose = () => {
        cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
        removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave);
        mesh.geometry.dispose(); (mesh.material as { dispose(): void }).dispose(); renderer.dispose();
        renderer.domElement.remove();
      };
    })().catch(() => {});

    return () => { cancelled = true; dispose(); };
  }, [fontFamily]);

  return <div ref={box} className="pixel-hero" aria-hidden="true" data-cursor="Touche" />;
}

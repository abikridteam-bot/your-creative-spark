import { useEffect, useState } from "react";
import logo from "@/assets/logo.asset.json";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [wipe, setWipe] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setPct(Math.round(t * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setWipe(true);
        onDone();
        window.setTimeout(() => setGone(true), 900);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  if (gone) return null;

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden" aria-hidden>
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-background transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)]"
        style={{ transform: wipe ? "translateY(-101%)" : "none" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-background transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)]"
        style={{ transform: wipe ? "translateY(101%)" : "none" }}
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-8 transition-opacity duration-300"
        style={{ opacity: wipe ? 0 : 1 }}
      >
        <img
          src={logo.url}
          alt="110 Events"
          width={180}
          height={180}
          className="glow-lime h-36 w-36 rounded-full object-cover md:h-44 md:w-44"
          style={{
            transform: `scale(${0.9 + pct / 400}) rotate(${-6 + pct * 0.06}deg)`,
            opacity: 0.35 + pct / 155,
          }}
        />
        <div className="display text-lime text-[clamp(3rem,10vw,7rem)] tabular-nums">
          {String(pct).padStart(2, "0")}%
        </div>
        <div className="text-[11px] uppercase tracking-[0.5em] text-muted-foreground">
          Loading Experience
        </div>
      </div>
    </div>
  );
}

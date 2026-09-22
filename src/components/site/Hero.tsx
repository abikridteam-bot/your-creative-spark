import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projects } from "./data";

const slides = projects.map((p) => ({
  title: p.title,
  tag: p.category,
  copy: p.copy,
  image: p.image,
}));

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => go(1), 6500);
    return () => clearInterval(id);
  }, [go]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-fade", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 2.1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".slide-active",
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" },
      );
      gsap.fromTo(
        ".slide-copy > *",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
      );
    }, root);
    return () => ctx.revert();
  }, [index]);

  const active = slides[index]!;

  return (
    <section
      ref={root}
      id="top"
      className="relative flex h-[100svh] w-full flex-col overflow-hidden"
    >
      {/* ambient contour background */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.15]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 12% 40%, hsl(0 0% 100% / 0.2) 0 1px, transparent 1px 46px)",
        }}
      />
      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[620px] w-[620px] rounded-full bg-lime opacity-[0.12] blur-[200px]" />

      {/* slider stage */}
      <div className="relative flex flex-1 items-center justify-center px-4 pt-24 md:px-10">
        <div className="relative w-full max-w-[1400px]">
          {/* side peeks */}
          <div className="pointer-events-none absolute inset-y-10 -left-16 hidden w-40 overflow-hidden opacity-30 [transform:skewY(4deg)] lg:block">
            <img
              src={slides[(index - 1 + slides.length) % slides.length]!.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="pointer-events-none absolute inset-y-10 -right-16 hidden w-40 overflow-hidden opacity-30 [transform:skewY(-4deg)] lg:block">
            <img
              src={slides[(index + 1) % slides.length]!.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          {/* main card */}
          <div className="relative aspect-16/9 max-h-[68svh] w-full overflow-hidden border border-border">
            <img
              key={active.image}
              src={active.image}
              alt={active.title}
              className="slide-active h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

            <div className="slide-copy absolute bottom-6 left-6 max-w-xl md:bottom-10 md:left-10">
              <div className="mb-4 flex items-center gap-3">
                <span className="border border-lime px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-lime">
                  Featured
                </span>
                <span className="border border-border px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {active.tag}
                </span>
              </div>
              <h1 className="display text-[13vw] uppercase leading-[0.85] md:text-[6vw]">
                {active.title}
              </h1>
              <p className="mt-3 max-w-md text-xs uppercase tracking-[0.2em] text-muted-foreground md:text-sm">
                {active.copy}
              </p>
              <a
                href="#work"
                className="mt-7 inline-block rounded-full border border-lime px-10 py-3 text-xs font-bold uppercase tracking-[0.25em] text-lime transition-all duration-300 hover:bg-lime hover:text-background"
              >
                View Portfolio
              </a>
            </div>

            {/* arrows */}
            <div className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col gap-3">
              <button
                aria-label="Previous slide"
                onClick={() => go(-1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-lime/60 text-lime transition hover:bg-lime hover:text-background"
              >
                ▲
              </button>
              <button
                aria-label="Next slide"
                onClick={() => go(1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-lime/60 text-lime transition hover:bg-lime hover:text-background"
              >
                ▼
              </button>
            </div>
          </div>

          {/* thumbnails */}
          <div className="hero-fade mt-6 flex items-center justify-between gap-6">
            <div className="flex gap-8 font-mono text-[10px] uppercase text-muted-foreground">
              <span>Coord / 25.2048 N, 55.2708 E</span>
              <span className="hidden md:inline">Base / Dubai UAE</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:inline">
                See all work ▸
              </span>
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setIndex(i)}
                  aria-label={s.title}
                  className={`h-12 w-16 overflow-hidden border transition ${
                    i === index ? "border-lime opacity-100" : "border-border opacity-50 hover:opacity-90"
                  }`}
                >
                  <img src={s.image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

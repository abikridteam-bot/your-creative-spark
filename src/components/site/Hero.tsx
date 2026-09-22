import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "./data";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        delay: 1.9,
      });

      gsap.from(".hero-fade", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 2.4,
      });

      gsap.to(".hero-type", {
        yPercent: -10,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      gsap.to(".hero-bg", {
        yPercent: 15,
        scale: 1.1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative flex h-[100svh] w-full flex-col overflow-hidden">
      {/* image + glow backdrop */}
      <div className="hero-bg absolute inset-0 -z-20 will-change-transform">
        <img
          src={images.stage}
          alt="110 Events stage production"
          width={1600}
          height={1008}
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      </div>

      {/* blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100% / 0.12) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.12) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[620px] w-[620px] rounded-full bg-lime opacity-[0.12] blur-[200px]" />

      {/* content */}
      <div className="hero-type relative z-10 flex flex-1 flex-col justify-center px-5 will-change-transform md:px-10">
        <div className="max-w-7xl">
          <div className="hero-fade mb-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-lime">
            <span className="h-px w-12 bg-lime" /> Dubai Based · Global Reach
          </div>

          <h1 className="display text-[15vw] uppercase leading-[0.85] tracking-tight md:text-[12vw] lg:text-[9.5vw]">
            <span className="block overflow-hidden">
              <span className="hero-line block">We Build</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1.5px var(--foreground)" }}
                >
                  The
                </span>{" "}
                <span className="text-lime">Extra</span>
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">Ordinary</span>
            </span>
          </h1>

          <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p className="hero-fade max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Event management, exhibition design, production and fabrication — engineered end to
              end, in-house.
            </p>

            <div className="hero-fade relative group w-fit">
              <div className="absolute -inset-2 bg-lime opacity-20 blur transition duration-500 group-hover:opacity-40" />
              <a
                href="#work"
                className="relative inline-block border border-lime px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-lime transition-all duration-300 hover:bg-lime hover:text-background"
              >
                View Portfolio
              </a>
            </div>
          </div>

          <div className="hero-fade mt-10 hidden max-w-2xl grid-cols-4 gap-px border border-border bg-border md:grid">
            {[images.exhibition, images.stage, images.activation, images.fabrication].map(
              (src, i) => (
                <div key={i} className="relative aspect-4/3 overflow-hidden bg-background">
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover opacity-50 transition-all duration-700 hover:scale-110 hover:opacity-100"
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* technical footer */}
      <div className="relative z-10 flex items-end justify-between px-5 pb-10 md:px-10">
        <div className="flex gap-8 font-mono text-[10px] uppercase text-muted-foreground">
          <span>Coord / 25.2048 N, 55.2708 E</span>
          <span className="hidden sm:block">Type / Fabrication House</span>
          <span className="hidden sm:block">Base / Dubai UAE</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="mb-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll to explore
          </span>
          <span className="h-16 w-px bg-gradient-to-b from-lime to-transparent" />
        </div>
      </div>

      {/* structural corner frame */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-2/3 w-1/3 border-l border-t border-foreground/5">
        <span className="absolute -ml-2 -mt-2 left-0 top-0 h-4 w-4 border border-lime" />
        <span className="absolute -mb-2 -mr-2 bottom-0 right-0 h-4 w-4 border border-lime" />
      </div>
    </section>
  );
}

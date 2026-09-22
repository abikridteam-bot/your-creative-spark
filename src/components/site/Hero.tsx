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

      gsap.to(".hero-type", {
        scale: 0.82,
        yPercent: -12,
        rotate: -1.5,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      gsap.to(".hero-bg", {
        yPercent: 18,
        scale: 1.12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative h-[100svh] w-full overflow-hidden">
      <div className="hero-bg absolute inset-0 -z-10 will-change-transform">
        <img
          src={images.stage}
          alt="110 Events stage production"
          width={1600}
          height={1008}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(199,255,0,0.10),transparent_45%)]" />
      </div>

      <div className="hero-type relative flex h-full flex-col justify-center px-5 will-change-transform md:px-10">
        <div className="mb-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-lime">
          <span className="h-px w-12 bg-lime" /> Dubai · UAE
        </div>
        <h1 className="display text-hero">
          <span className="block overflow-hidden">
            <span className="hero-line block">We Create</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block text-lime">Experiences.</span>
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
          Event management, exhibition design, production and fabrication — engineered end to end,
          in-house.
        </p>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-5 text-[10px] uppercase tracking-[0.4em] text-muted-foreground md:px-10">
        <span className="animate-pulse text-lime">Scroll to explore ↓</span>
        <span className="display text-3xl text-foreground/20">110</span>
      </div>
    </section>
  );
}

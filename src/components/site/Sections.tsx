import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "@/assets/logo.asset.json";
import {
  certifications,
  images,
  materials,
  process,
  projects,
  serviceImages,
  services,
} from "./data";

gsap.registerPlugin(ScrollTrigger);

/** Runs a gsap context scoped to the returned ref. */
function useGsap<T extends HTMLElement>(fn: (el: T) => void, deps: unknown[] = []) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => fn(el), el);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

/** Words that slide up from a mask. Animated by parent via `.sw-word`. */
function SplitWords({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className={`sw-word inline-block ${className}`}>{w}&nbsp;</span>
        </span>
      ))}
    </>
  );
}

function animateWords(scope: HTMLElement, trigger?: Element) {
  gsap.from(scope.querySelectorAll(".sw-word"), {
    yPercent: 110,
    rotate: 6,
    duration: 1.1,
    ease: "expo.out",
    stagger: 0.06,
    scrollTrigger: { trigger: trigger ?? scope, start: "top 82%" },
  });
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow mb-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-lime">
      <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-lime" />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function Intro() {
  const text =
    "We design, build and deliver experiences that people remember — events, exhibitions, interiors and fabrication, all engineered in-house in the UAE.";
  const ref = useGsap<HTMLElement>((el) => {
    gsap.to(el.querySelectorAll(".fill-word"), {
      opacity: 1,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: { trigger: el.querySelector(".fill-text"), start: "top 80%", end: "bottom 45%", scrub: true },
    });
    gsap.from(el.querySelector(".badge"), {
      scale: 0,
      rotate: -180,
      duration: 1.4,
      ease: "back.out(1.6)",
      scrollTrigger: { trigger: el, start: "top 70%" },
    });
  });
  return (
    <section ref={ref} className="relative border-t border-border px-6 py-36 md:px-16 md:py-52">
      <Eyebrow>01 / Who We Are</Eyebrow>
      <p className="fill-text display max-w-[22ch] text-[clamp(2rem,5.2vw,5rem)] leading-[1.02]">
        {text.split(" ").map((w, i) => (
          <span key={i} className={`fill-word opacity-15 ${/remember|in-house/.test(w) ? "text-lime" : ""}`}>
            {w}{" "}
          </span>
        ))}
      </p>
      <div className="badge absolute right-6 top-24 hidden h-36 w-36 md:right-16 md:block lg:h-44 lg:w-44">
        <svg viewBox="0 0 200 200" className="spin-slow h-full w-full">
          <defs>
            <path id="circ" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
          </defs>
          <text className="fill-lime text-[15px] font-bold uppercase tracking-[0.35em]">
            <textPath href="#circ">110 Events • We Create Experiences •</textPath>
          </text>
        </svg>
        <img src={logo.url} alt="" className="absolute inset-0 m-auto h-14 w-14 rounded-full" />
      </div>
    </section>
  );
}

export function Marquee() {
  const ref = useGsap<HTMLElement>((el) => {
    const rows = el.querySelectorAll(".mq-row");
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (s) => {
        const skew = gsap.utils.clamp(-12, 12, s.getVelocity() / -250);
        gsap.to(rows, { skewX: skew, duration: 0.4, ease: "power3", overwrite: true });
      },
    });
  });
  const row = [...services, ...services];
  return (
    <section ref={ref} className="overflow-hidden border-t border-border py-10 md:py-14">
      <div className="mq-row flex w-max marquee-track">
        {row.map((s, i) => (
          <span key={i} className="display flex items-center gap-8 px-8 text-[clamp(2.5rem,6vw,5.5rem)]">
            {s}
            <span className="text-lime">✦</span>
          </span>
        ))}
      </div>
      <div className="mq-row mt-4 flex w-max marquee-reverse">
        {row.map((s, i) => (
          <span key={i} className="display text-outline flex items-center gap-8 px-8 text-[clamp(2.5rem,6vw,5.5rem)]">
            {s}
            <span className="text-lime">/</span>
          </span>
        ))}
      </div>
    </section>
  );
}

export function ServicesList() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useGsap<HTMLElement>((el) => {
    animateWords(el);
    gsap.utils.toArray<HTMLElement>(el.querySelectorAll(".svc-card")).forEach((card, i) => {
      gsap.fromTo(
        card,
        { clipPath: "inset(100% 0 0 0)", y: 60 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          delay: (i % 4) * 0.08,
          scrollTrigger: { trigger: card, start: "top 92%" },
        },
      );
      const img = card.querySelector("img");
      if (img)
        gsap.fromTo(img, { yPercent: -8 }, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
    });
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (open === null) return;
      if (e.key === "ArrowRight") setOpen((i) => ((i ?? 0) + 1) % services.length);
      if (e.key === "ArrowLeft") setOpen((i) => ((i ?? 0) - 1 + services.length) % services.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="services" ref={ref} className="border-t border-border px-6 py-36 md:px-16 md:py-52">
      <Eyebrow>02 / Capabilities</Eyebrow>
      <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <h2 className="display text-section">
          <SplitWords text="What We" />
          <br />
          <SplitWords text="Do" className="text-lime" />
        </h2>
        <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
          {services.length} Capabilities — tap to enlarge
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setOpen(i)}
            data-cursor="Enlarge"
            className="svc-card group relative block w-full overflow-hidden rounded-sm border border-border bg-card text-left transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <img
                src={serviceImages[i]}
                alt={s}
                loading="lazy"
                className="h-[116%] w-full scale-105 object-cover opacity-70 grayscale transition-all duration-[900ms] ease-out group-hover:scale-115 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-lime/40 bg-background/60 px-2.5 py-1 font-sans text-[10px] tracking-[0.3em] text-lime backdrop-blur">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="absolute right-4 top-4 flex h-9 w-9 scale-0 items-center justify-center rounded-full bg-lime text-background transition-transform duration-500 group-hover:scale-100">
                ↗
              </span>
            </div>
            <div className="relative px-4 pb-6 pt-4">
              <span className="display text-2xl leading-none transition-colors duration-500 group-hover:text-lime md:text-[1.6rem]">
                {s}
              </span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-lime transition-all duration-700 group-hover:w-full" />
            </div>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={services[open]}
          onClick={() => setOpen(null)}
          className="animate-fade-in fixed inset-0 z-[80] flex items-center justify-center bg-background/95 p-5 backdrop-blur-sm md:p-10"
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute right-5 top-5 text-xs uppercase tracking-[0.3em] text-lime md:right-10 md:top-10"
          >
            Close ✕
          </button>
          <figure key={open} onClick={(e) => e.stopPropagation()} className="animate-scale-in max-h-full w-full max-w-5xl border border-border">
            <img src={serviceImages[open]} alt={services[open]} className="max-h-[72svh] w-full object-cover" />
            <figcaption className="flex items-baseline justify-between gap-4 bg-background px-5 py-4">
              <span className="display text-2xl md:text-4xl">{services[open]}</span>
              <span className="font-sans text-[10px] tracking-[0.4em] text-lime">
                {String(open + 1).padStart(2, "0")} / {services.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

export function Work() {
  const ref = useGsap<HTMLElement>((el) => {
    animateWords(el);
    el.querySelectorAll<HTMLElement>(".work-item").forEach((card, i) => {
      gsap.fromTo(
        card,
        { clipPath: "inset(12% 12% 12% 12%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.4,
          delay: (i % 2) * 0.15,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        },
      );
      const img = card.querySelector("img");
      if (img)
        gsap.fromTo(img, { scale: 1.3 }, {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
    });
  });
  return (
    <section id="work" ref={ref} className="border-t border-border px-6 py-36 md:px-16 md:py-52">
      <Eyebrow>03 / Portfolio</Eyebrow>
      <h2 className="display text-section mb-16">
        <SplitWords text="Selected" />
        <br />
        <SplitWords text="Work" className="text-lime" />
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <article
            key={p.title}
            data-cursor="View Project"
            className="work-item group relative overflow-hidden rounded-sm border border-border"
          >
            <div className="aspect-4/3 overflow-hidden">
              <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
            <span className="absolute right-6 top-6 display text-6xl text-outline opacity-60 transition-all duration-700 group-hover:rotate-[-8deg] group-hover:opacity-100">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <span className="text-[10px] uppercase tracking-[0.4em] text-lime">{p.category}</span>
              <h3 className="display mt-3 text-[clamp(1.75rem,4vw,3rem)] break-words hyphens-auto transition-transform duration-500 group-hover:-translate-y-2">
                {p.title}
              </h3>
              <p className="mt-3 max-h-0 max-w-md overflow-hidden text-sm text-muted-foreground opacity-0 transition-all duration-700 group-hover:max-h-24 group-hover:opacity-100">
                {p.copy}
              </p>
            </div>
            <span className="absolute left-5 top-5 h-8 w-8 border-l-2 border-t-2 border-lime opacity-0 transition-all duration-500 group-hover:left-4 group-hover:top-4 group-hover:opacity-100" />
          </article>
        ))}
      </div>
    </section>
  );
}

export function Stats() {
  const stats = [
    { v: 110, suffix: "", l: "The Standard", c: "Beyond one hundred percent on every build." },
    { v: 360, suffix: "°", l: "In-House", c: "Design, production and install under one roof." },
    { v: 1, suffix: "", pad: 2, l: "Partner", c: "A single team accountable end to end." },
    { v: 24, suffix: "/7", l: "Production", c: "Workshop and crews running around the clock." },
  ];
  const ref = useGsap<HTMLElement>((el) => {
    animateWords(el);
    gsap.from(el.querySelectorAll(".stat"), {
      y: 80,
      opacity: 0,
      rotateX: -30,
      stagger: 0.12,
      duration: 1.1,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 75%" },
    });
    el.querySelectorAll<HTMLElement>(".count").forEach((n) => {
      const target = Number(n.dataset['v']);
      const pad = Number(n.dataset['pad'] ?? 0);
      const o = { v: 0 };
      gsap.to(o, {
        v: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: n, start: "top 88%" },
        onUpdate: () => {
          n.textContent = String(Math.round(o.v)).padStart(pad, "0");
        },
      });
    });
  });

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-border px-6 py-28 md:px-16 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--lime)_10%,transparent),transparent_60%)]" />
      <div className="relative mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
        <div>
          <Eyebrow>By The Numbers</Eyebrow>
          <h2 className="display text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] max-w-[14ch]">
            <SplitWords text="Built on a" /> <SplitWords text="higher" className="text-lime" />{" "}
            <SplitWords text="standard." />
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          110 is not a name, it is a benchmark — the margin we add to every brief, every deadline and every finish.
        </p>
      </div>
      <div className="relative grid gap-px border border-border bg-border [perspective:1000px] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.l} className="stat group relative overflow-hidden bg-background p-7 transition-colors duration-500 hover:bg-lime md:p-9">
            <span className="font-sans text-[10px] tracking-[0.4em] text-muted-foreground transition-colors duration-500 group-hover:text-background/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="display mt-10 text-[clamp(3.25rem,6vw,5rem)] leading-none text-lime transition-colors duration-500 group-hover:text-background md:mt-16">
              <span className="count" data-v={s.v} data-pad={s.pad ?? 0}>
                {String(s.v).padStart(s.pad ?? 0, "0")}
              </span>
              {s.suffix}
            </div>
            <div className="mt-4 text-[10px] uppercase tracking-[0.4em] text-foreground transition-colors duration-500 group-hover:text-background">
              {s.l}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-background/80">
              {s.c}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function About() {
  const pillars = [
    { t: "Expertise", c: "Seasoned crews across every discipline." },
    { t: "Custom Solutions", c: "Every build engineered for its brief." },
    { t: "Technology", c: "CNC, LED and AV integrated from day one." },
    { t: "Quality", c: "ISO certified processes, start to finish." },
  ];
  const ref = useGsap<HTMLElement>((el) => {
    animateWords(el);
    gsap.fromTo(el.querySelector(".about-img"), { clipPath: "inset(0 100% 0 0)" }, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.6,
      ease: "expo.inOut",
      scrollTrigger: { trigger: el, start: "top 70%" },
    });
    gsap.fromTo(el.querySelector(".about-img img"), { scale: 1.4 }, {
      scale: 1,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });
    gsap.from(el.querySelectorAll(".pillar"), {
      x: 60,
      opacity: 0,
      stagger: 0.12,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 40%" },
    });
  });
  return (
    <section id="about" ref={ref} className="border-t border-border px-6 py-36 md:px-16 md:py-52">
      <Eyebrow>04 / About</Eyebrow>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="display text-section leading-[0.85]">
            <SplitWords text="About" />
            <br />
            <SplitWords text="110" className="text-lime" />
          </h2>
          <div className="about-img relative mt-12 aspect-4/5 overflow-hidden rounded-sm border border-border">
            <img src={images.fabrication} alt="110 Events workshop" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute bottom-0 left-0 bg-lime px-5 py-3 text-[10px] font-bold uppercase tracking-[0.4em] text-background">
              ISO Certified
            </div>
          </div>
        </div>
        <div className="lg:pt-40">
          <p className="display text-[clamp(1.6rem,3.2vw,2.8rem)] leading-[1.05]">
            <SplitWords text="Unparalleled expertise, tailored for" /> <SplitWords text="perfection." className="text-lime" />
          </p>
          <p className="mt-8 text-lg text-muted-foreground">
            110 EVENTS delivers expertise across industries with comprehensive services, custom solutions and
            cutting-edge technology. From first concept to final installation, everything is engineered and
            produced in-house.
          </p>
          <div className="pillars mt-12 border-t border-border">
            {pillars.map((p, i) => (
              <div key={p.t} className="pillar group flex items-baseline gap-6 border-b border-border py-6 transition-[padding] duration-500 hover:pl-4">
                <span className="font-sans text-[10px] tracking-[0.4em] text-lime">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1">
                  <span className="display text-2xl transition-colors duration-500 group-hover:text-lime md:text-3xl">{p.t}</span>
                  <p className="mt-1 text-sm text-muted-foreground">{p.c}</p>
                </div>
                <span className="text-lime opacity-0 transition-all duration-500 group-hover:opacity-100">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Certifications() {
  const ref = useGsap<HTMLElement>((el) => {
    gsap.from(el.querySelectorAll(".cert"), {
      yPercent: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 1.1,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 80%" },
    });
    gsap.from(el.querySelectorAll(".cert-line"), {
      scaleX: 0,
      transformOrigin: "left",
      stagger: 0.15,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 80%" },
    });
  });
  const bg = [images.exhibition, images.fabrication, images.activation];
  return (
    <section ref={ref} className="border-t border-border">
      <div className="grid md:grid-cols-3">
        {certifications.map((c, i) => (
          <div key={c.code} data-cursor className="cert group relative overflow-hidden border-b border-border p-8 py-20 md:border-b-0 md:border-r md:py-32">
            <img src={bg[i]} alt="" loading="lazy" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-25" />
            <div className="relative">
              <div className="cert-line mb-8 h-0.5 w-16 bg-lime" />
              <div className="display text-[clamp(2.5rem,5vw,4.5rem)] transition-colors duration-500 group-hover:text-lime">{c.code}</div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">{c.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Production() {
  const [active, setActive] = useState(0);
  const material = materials[active] ?? materials[0]!;
  const ref = useGsap<HTMLElement>((el) => {
    animateWords(el);
    gsap.from(el.querySelectorAll(".mat-btn"), {
      y: 30,
      opacity: 0,
      stagger: 0.05,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 70%" },
    });
    gsap.fromTo(el.querySelector(".prod-panel"), { clipPath: "inset(100% 0 0 0)" }, {
      clipPath: "inset(0% 0 0 0)",
      duration: 1.5,
      ease: "expo.inOut",
      scrollTrigger: { trigger: el, start: "top 70%" },
    });
  });
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % materials.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <section ref={ref} className="border-t border-border px-5 py-24 md:px-16 md:py-52">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
        <div className="order-1 min-w-0">
          <Eyebrow>05 / In-House Production</Eyebrow>
          <h2 className="display text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.9] break-words">
            <SplitWords text="From idea" />
            <br />
            <SplitWords text="to" /> <SplitWords text="installation." className="text-lime" />
          </h2>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:mt-8 md:text-lg">
            A full production facility: joinery, metal, acrylic, CNC, fiberglass, styrofoam and specialized paint —
            delivered by one team.
          </p>
          <div className="mt-8 hidden gap-px border border-border bg-border sm:grid sm:grid-cols-2 md:mt-12">
            {materials.map((m, i) => (
              <button
                key={m.name}
                data-cursor
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`mat-btn display flex min-w-0 items-center justify-between gap-2 px-5 py-4 text-left text-xl uppercase transition-colors duration-300 md:text-2xl ${
                  active === i ? "bg-lime text-background" : "bg-background text-foreground hover:text-lime"
                }`}
              >
                <span className="truncate">{m.name}</span>
                <span className="shrink-0 font-sans text-[10px] tracking-[0.3em] opacity-60">{String(i + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="no-scrollbar order-2 -mx-5 mt-2 flex snap-x gap-2 overflow-x-auto px-5 sm:hidden">
          {materials.map((m, i) => (
            <button
              key={m.name}
              onClick={() => setActive(i)}
              className={`shrink-0 snap-start border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                active === i ? "border-lime bg-lime text-background" : "border-border text-muted-foreground"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
        <div className="prod-panel relative order-3 aspect-4/3 overflow-hidden rounded-sm border border-border sm:aspect-4/5 lg:order-2 lg:aspect-square">
          {materials.map((m, i) => (
            <img
              key={m.name}
              src={m.image}
              alt={m.name}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-out ${
                active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 top-0 h-0.5 bg-border">
            <div key={active} className="h-full bg-lime" style={{ animation: "progress-bar 3.5s linear forwards" }} />
          </div>
          <div className="absolute bottom-4 left-4 flex min-w-0 items-baseline gap-3 md:bottom-6 md:left-6 md:gap-4">
            <span key={material.name} className="display animate-fade-in truncate text-3xl text-lime md:text-6xl">
              {material.name}
            </span>
            <span className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Workshop</span>
          </div>
        </div>
      </div>
      <style>{`@keyframes progress-bar{from{width:0}to{width:100%}}`}</style>
    </section>
  );
}

export function Process() {
  const ref = useGsap<HTMLElement>((el) => {
    animateWords(el);
    gsap.fromTo(el.querySelector(".proc-line"), { scaleY: 0 }, {
      scaleY: 1,
      ease: "none",
      transformOrigin: "top",
      scrollTrigger: { trigger: el.querySelector(".proc-list"), start: "top 60%", end: "bottom 60%", scrub: true },
    });
    el.querySelectorAll<HTMLElement>(".step").forEach((step) => {
      gsap.from(step.querySelectorAll(".step-anim"), {
        x: -40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: step, start: "top 80%" },
      });
      ScrollTrigger.create({
        trigger: step,
        start: "top 60%",
        end: "bottom 60%",
        toggleClass: { targets: step, className: "is-active" },
      });
    });
  });
  return (
    <section ref={ref} className="border-t border-border px-6 py-36 md:px-16 md:py-52">
      <Eyebrow>06 / Process</Eyebrow>
      <h2 className="display text-section mb-16">
        <SplitWords text="Why" /> <SplitWords text="110?" className="text-lime" />
      </h2>
      <div className="proc-list relative pl-8 md:pl-14">
        <span className="absolute left-0 top-0 h-full w-px bg-border" />
        <span className="proc-line absolute left-0 top-0 h-full w-px bg-lime" />
        {process.map((p) => (
          <div
            key={p.n}
            className="step group grid gap-4 border-b border-border py-10 opacity-40 transition-opacity duration-500 md:grid-cols-[120px_1fr_1fr] md:items-baseline [&.is-active]:opacity-100"
          >
            <span className="step-anim display text-3xl text-lime">{p.n}</span>
            <span className="step-anim display text-[clamp(2rem,5vw,4rem)] transition-transform duration-500 group-[.is-active]:translate-x-3">
              {p.title}
            </span>
            <p className="step-anim text-muted-foreground">{p.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CTA() {
  const btn = useRef<HTMLAnchorElement>(null);
  const ref = useGsap<HTMLElement>((el) => {
    gsap.fromTo(el.querySelectorAll(".cta-line"), { scale: 0.6, opacity: 0.1 }, {
      scale: 1,
      opacity: 1,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top 90%", end: "center 55%", scrub: true },
    });
  });
  useEffect(() => {
    const el = btn.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-border px-6 py-40 text-center md:px-16 md:py-60">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--lime)_14%,transparent),transparent_65%)]" />
      <h2 className="display text-section relative">
        <span className="cta-line block">Let's build</span>
        <span className="cta-line block text-outline">something</span>
        <span className="cta-line block text-lime">unforgettable.</span>
      </h2>
      <a
        ref={btn}
        href="#contact"
        data-cursor
        className="group relative mt-16 inline-flex h-40 w-40 items-center justify-center rounded-full bg-lime text-xs font-bold uppercase tracking-[0.3em] text-background transition-transform duration-500 hover:scale-110"
      >
        Start a<br />project →
      </a>
    </section>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const ref = useGsap<HTMLElement>((el) => {
    animateWords(el);
    gsap.from(el.querySelectorAll(".field"), {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el.querySelector("form"), start: "top 85%" },
    });
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };
  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "company", label: "Company", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "project", label: "Project Type", type: "text" },
  ];

  return (
    <section id="contact" ref={ref} className="border-t border-border px-6 py-36 md:px-16 md:py-52">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow>07 / Contact</Eyebrow>
          <h2 className="display text-section">
            <SplitWords text="Let's" />
            <br />
            <SplitWords text="Create." className="text-lime" />
          </h2>
          <a href="mailto:info@110uae.com" data-cursor className="story-link mt-10 inline-block text-lg tracking-widest text-muted-foreground hover:text-lime">
            <span>info@110uae.com</span>
          </a>
        </div>
        <form onSubmit={onSubmit} className="grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {fields.map((f) => (
              <label key={f.name} className="field group block">
                <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground transition-colors group-focus-within:text-lime">
                  {f.label}
                </span>
                <input
                  required={f.name !== "company" && f.name !== "phone"}
                  type={f.type}
                  name={f.name}
                  className="mt-2 w-full border-b border-border bg-transparent py-3 text-lg outline-none transition-colors focus:border-lime"
                />
              </label>
            ))}
          </div>
          <label className="field group block">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground transition-colors group-focus-within:text-lime">
              Message
            </span>
            <textarea
              required
              name="message"
              rows={4}
              className="mt-2 w-full resize-none border-b border-border bg-transparent py-3 text-lg outline-none transition-colors focus:border-lime"
            />
          </label>
          <button
            type="submit"
            data-cursor
            className="field group relative justify-self-start overflow-hidden bg-lime px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-background"
          >
            <span className="relative z-10">{sent ? "Enquiry Sent ✓" : "Send Enquiry →"}</span>
            <span className="absolute inset-0 -translate-x-full bg-foreground transition-transform duration-500 group-hover:translate-x-0" />
          </button>
          {sent && (
            <p className="animate-fade-in text-sm text-muted-foreground" role="status">
              Thanks — we'll be in touch from info@110uae.com.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  const ref = useGsap<HTMLElement>((el) => {
    gsap.fromTo(el.querySelector(".foot-big"), { yPercent: 60 }, {
      yPercent: 0,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true },
    });
  });
  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-border px-5 pb-10 pt-24 md:px-10">
      <span className="foot-big display pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 text-[38vw] leading-none text-foreground/[0.04]">
        110
      </span>
      <div className="relative grid gap-12 md:grid-cols-3">
        <div>
          <img src={logo.url} alt="110 Events" width={72} height={72} className="h-16 w-16 rounded-full transition-transform duration-700 hover:rotate-[360deg]" />
          <p className="mt-6 max-w-xs text-sm text-muted-foreground">
            Event management, exhibition design, production and fabrication. United Arab Emirates.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {["Work", "Services", "About", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-xs uppercase tracking-[0.3em] text-muted-foreground transition-all hover:translate-x-2 hover:text-lime">
              {l}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {services.slice(0, 6).map((s) => (
            <a key={s} href="#services" className="text-xs uppercase tracking-[0.3em] text-muted-foreground transition-all hover:translate-x-2 hover:text-lime">
              {s}
            </a>
          ))}
        </div>
      </div>
      <div className="relative mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        <span>© 110 Events</span>
        <a href="mailto:info@110uae.com" className="hover:text-lime">info@110uae.com</a>
      </div>
    </footer>
  );
}

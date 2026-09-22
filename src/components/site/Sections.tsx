import { useEffect, useRef, useState, type FormEvent } from "react";
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

function useReveal<T extends HTMLElement>(selector = ".reveal") {
  const ref = useRef<T>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        gsap.from(el, {
          yPercent: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [selector]);
  return ref;
}

export function Intro() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="border-t border-border px-5 py-28 md:px-10 md:py-40">
      <div className="mb-14 text-[10px] uppercase tracking-[0.5em] text-lime">01 / Who We Are</div>
      <h2 className="display text-section max-w-[18ch]">
        <span className="reveal block">Transforming ideas</span>
        <span className="reveal block">into <span className="text-lime">reality</span></span>
        <span className="reveal block">with precision.</span>
      </h2>
      <p className="reveal mt-12 max-w-2xl text-lg text-muted-foreground md:text-xl">
        At 110 EVENTS we specialize in crafting unforgettable experiences that leave a lasting
        impact — one-stop solutions across events, exhibitions, branding, interiors, AV and
        specialized fabrication.
      </p>
    </section>
  );
}

export function ServicesList() {
  const ref = useReveal<HTMLElement>(".svc-card");

  return (
    <section id="services" ref={ref} className="border-t border-border px-5 py-28 md:px-10 md:py-40">
      <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <h2 className="display text-section">
          What
          <br />
          We <span className="text-lime">Do</span>
        </h2>
        <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
          {services.length} Capabilities
        </span>
      </div>

      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <a
            key={s}
            href="#contact"
            data-cursor="Enquire"
            className="svc-card group relative block overflow-hidden bg-background"
          >
            <div className="relative h-56 overflow-hidden md:h-64">
              <img
                src={serviceImages[i]}
                alt={s}
                loading="lazy"
                className="h-full w-full object-cover opacity-60 transition-all duration-[900ms] ease-out group-hover:scale-110 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <span className="absolute left-4 top-4 font-sans text-[10px] tracking-[0.4em] text-lime">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-3 px-4 pb-6 pt-4">
              <span className="display text-2xl leading-none transition-colors duration-500 group-hover:text-lime md:text-[1.75rem]">
                {s}
              </span>
              <span className="text-lime opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}


export function Work() {
  const ref = useReveal<HTMLElement>(".work-item");
  return (
    <section id="work" ref={ref} className="border-t border-border px-5 py-28 md:px-10 md:py-40">
      <h2 className="display text-section mb-16">
        Selected
        <br />
        <span className="text-lime">Work</span>
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.title}
            data-cursor="View Project"
            className={`work-item group relative overflow-hidden border border-border ${
              p.tall ? "md:row-span-2" : ""
            }`}
          >
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              className={`w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 ${
                p.tall ? "h-[520px] md:h-[820px]" : "h-[360px] md:h-[400px]"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <span className="text-[10px] uppercase tracking-[0.4em] text-lime">{p.category}</span>
              <h3 className="display mt-3 text-4xl transition-transform duration-500 group-hover:-translate-y-1 md:text-6xl">
                {p.title}
              </h3>
              <p className="mt-3 max-w-md text-sm text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {p.copy}
              </p>
              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.3em] text-lime opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                View Project →
              </span>
            </div>
            <span className="absolute left-5 top-5 h-8 w-8 border-l border-t border-lime opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </article>
        ))}
      </div>
    </section>
  );
}

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat", {
        yPercent: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const stats = [
    { v: "110", l: "The Standard" },
    { v: "360°", l: "In-House" },
    { v: "01", l: "Partner" },
    { v: "24/7", l: "Production" },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-border px-5 py-24 md:px-10 md:py-32">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="display text-[40vw] leading-none text-foreground/[0.03]">110</span>
      </div>
      <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="stat border-t border-lime/40 pt-5">
            <div className="display text-[clamp(3rem,7vw,6rem)] text-lime">{s.v}</div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function About() {
  const ref = useReveal<HTMLElement>(".reveal-about");
  const pillars = ["Expertise", "Custom Solutions", "Technology", "Quality"];
  return (
    <section id="about" ref={ref} className="border-t border-border px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <h2 className="display text-section leading-[0.85]">
          About
          <br />
          <span className="text-lime">110</span>
        </h2>
        <div className="max-w-2xl">
          <p className="reveal-about display text-[clamp(1.6rem,3.2vw,2.8rem)] leading-[1.05]">
            Unparalleled expertise, tailored for perfection.
          </p>
          <p className="reveal-about mt-8 text-lg text-muted-foreground">
            110 EVENTS delivers expertise across industries with comprehensive services, custom
            solutions and cutting-edge technology. From first concept to final installation,
            everything is engineered and produced in-house — and the company is ISO certified.
          </p>
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
            {pillars.map((p) => (
              <div key={p} className="reveal-about bg-background p-8">
                <span className="display text-2xl md:text-3xl">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Certifications() {
  return (
    <section className="border-t border-border">
      <div className="grid md:grid-cols-3">
        {certifications.map((c, i) => (
          <div
            key={c.code}
            data-cursor
            className="group relative overflow-hidden border-b border-border p-8 py-20 transition-colors md:border-b-0 md:border-r md:py-32"
          >
            <img
              src={i === 0 ? images.exhibition : i === 1 ? images.fabrication : images.activation}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-25"
            />
            <div className="relative">
              <div className="display text-[clamp(2.5rem,5vw,4.5rem)] transition-colors duration-500 group-hover:text-lime">
                {c.code}
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                {c.title}
              </div>
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
  return (
    <section className="border-t border-border px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <div className="mb-8 text-[10px] uppercase tracking-[0.5em] text-lime">
            In-House Production
          </div>
          <h2 className="display text-section leading-[0.85]">
            From idea
            <br />
            to <span className="text-lime">installation.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            A full production facility: joinery, metal, acrylic, CNC, fiberglass, styrofoam and
            specialized paint — delivered by one team.
          </p>

          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
            {materials.map((m, i) => (
              <button
                key={m.name}
                data-cursor
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`display flex items-center justify-between px-5 py-4 text-left text-xl uppercase transition-colors md:text-2xl ${
                  active === i
                    ? "bg-lime text-background"
                    : "bg-background text-foreground hover:text-lime"
                }`}
              >
                {m.name}
                <span className="font-sans text-[10px] tracking-[0.3em] opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative aspect-4/5 overflow-hidden border border-border lg:aspect-square">
          {materials.map((m, i) => (
            <img
              key={m.name}
              src={m.image}
              alt={m.name}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 flex items-baseline gap-4">
            <span className="display text-4xl text-lime md:text-6xl">{material.name}</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Workshop
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


export function Process() {
  const ref = useReveal<HTMLElement>(".step");
  return (
    <section ref={ref} className="border-t border-border px-5 py-28 md:px-10 md:py-40">
      <h2 className="display text-section mb-16">
        Why <span className="text-lime">110?</span>
      </h2>
      <div className="border-t border-border">
        {process.map((p) => (
          <div
            key={p.n}
            className="step grid gap-4 border-b border-border py-10 md:grid-cols-[120px_1fr_1fr] md:items-baseline"
          >
            <span className="display text-3xl text-lime">{p.n}</span>
            <span className="display text-[clamp(2rem,5vw,4rem)]">{p.title}</span>
            <p className="text-muted-foreground">{p.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CTA() {
  const btn = useRef<HTMLAnchorElement>(null);
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
    <section className="border-t border-border px-5 py-32 text-center md:px-10 md:py-48">
      <h2 className="display text-section">
        Let's build
        <br />
        something
        <br />
        <span className="text-lime">unforgettable.</span>
      </h2>
      <a
        ref={btn}
        href="#contact"
        data-cursor
        className="mt-16 inline-block bg-lime px-10 py-5 text-sm font-bold uppercase tracking-[0.3em] text-background"
      >
        Start a project →
      </a>
    </section>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
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
    <section id="contact" className="border-t border-border px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <h2 className="display text-section">
            Let's
            <br />
            <span className="text-lime">Create.</span>
          </h2>
          <a
            href="mailto:info@110uae.com"
            data-cursor
            className="mt-10 inline-block text-lg tracking-widest text-muted-foreground hover:text-lime"
          >
            info@110uae.com
          </a>
        </div>

        <form onSubmit={onSubmit} className="grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {fields.map((f) => (
              <label key={f.name} className="block">
                <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
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
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
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
            className="justify-self-start bg-lime px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-background transition-opacity hover:opacity-90"
          >
            {sent ? "Enquiry Sent ✓" : "Send Enquiry →"}
          </button>
          {sent && (
            <p className="text-sm text-muted-foreground" role="status">
              Thanks — we'll be in touch from info@110uae.com.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border px-5 pb-10 pt-24 md:px-10">
      <span className="display pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 text-[38vw] leading-none text-foreground/[0.035]">
        110
      </span>
      <div className="relative grid gap-12 md:grid-cols-3">
        <div>
          <img src={logo.url} alt="110 Events" width={72} height={72} className="h-16 w-16 rounded-full" />
          <p className="mt-6 max-w-xs text-sm text-muted-foreground">
            Event management, exhibition design, production and fabrication. United Arab Emirates.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {["Work", "Services", "About", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-lime"
            >
              {l}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {services.slice(0, 6).map((s) => (
            <a key={s} href="#services" className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-lime">
              {s}
            </a>
          ))}
        </div>
      </div>
      <div className="relative mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        <span>© 110 Events</span>
        <a href="mailto:info@110uae.com" className="hover:text-lime">
          info@110uae.com
        </a>
      </div>
    </footer>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cursor } from "@/components/site/Cursor";
import { Preloader } from "@/components/site/Preloader";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import {
  About,
  CTA,
  Certifications,
  Contact,
  Footer,
  Intro,
  Marquee,
  Process,
  Production,
  ServicesList,
  Stats,
  Work,
} from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "110 EVENTS — Event Management, Exhibitions & Fabrication in the UAE" },
      {
        name: "description",
        content:
          "110 EVENTS is a UAE creative production company: event management, exhibition design, activations, AV, interiors and in-house fabrication.",
      },
      { property: "og:title", content: "110 EVENTS — We Create Experiences" },
      {
        property: "og:description",
        content:
          "Event management, exhibition design, production and specialized fabrication, engineered end to end in the UAE.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);

  return (
    <div className="bg-background">
      <div className="grain-overlay" />
      <Preloader onDone={onDone} />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Marquee />
        <ServicesList />
        <Work />
        <Stats />
        <About />
        <Certifications />
        <Production />
        <Process />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

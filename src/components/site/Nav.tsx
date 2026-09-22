import { useEffect, useState } from "react";
import logo from "@/assets/logo.asset.json";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-lime/25 bg-[rgba(5,5,5,0.75)] py-3 backdrop-blur-xl"
            : "border-transparent py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
          <a href="#top" data-cursor className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="110 Events"
              width={44}
              height={44}
              className={`rounded-full transition-all duration-500 ${scrolled ? "h-9 w-9" : "h-11 w-11"}`}
            />
            <span className="display hidden text-lg tracking-wide sm:block">110 Events</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-cursor
                className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-lime"
              >
                {l.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            data-cursor
            className="border border-lime/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-lime transition-colors hover:bg-lime hover:text-background"
          >
            Menu
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[65] bg-background transition-[clip-path] duration-700 ease-[cubic-bezier(.76,0,.24,1)] ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
      >
        <div className="flex h-full flex-col justify-between p-6 md:p-12">
          <div className="flex justify-end">
            <button
              onClick={() => setOpen(false)}
              data-cursor
              className="text-xs font-bold uppercase tracking-[0.3em] text-lime"
            >
              Close
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {links.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                data-cursor="Open"
                className="display text-[clamp(3rem,12vw,9rem)] text-foreground transition-colors hover:text-lime"
              >
                <span className="mr-4 align-top font-sans text-xs tracking-widest text-lime">
                  0{i + 1}
                </span>
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="mailto:info@110uae.com"
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground hover:text-lime"
          >
            info@110uae.com
          </a>
        </div>
      </div>
    </>
  );
}

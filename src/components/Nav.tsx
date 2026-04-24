/** Nav: sticky header with smooth-scroll links + CTA buttons. */
"use client";

import React, { useMemo, useState } from "react";
import { PhoneCall, MapPin, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useSmoothScroll } from "@/app/providers";

const LINKS = [
  { id: "about", label: "About" },
  { id: "doctors", label: "Doctors" },
  { id: "treatments", label: "Treatments" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
] as const;

export function Nav() {
  const { scrollTo } = useSmoothScroll();
  const [open, setOpen] = useState(false);

  const directionsHref = useMemo(() => {
    // Why: Google Maps query link works on mobile + desktop reliably.
    const q = encodeURIComponent(
      "Modi Hospital, Near Aroma Circle, Highway, Palanpur, Gujarat 385001, India",
    );
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) scrollTo(el);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-3 rounded-2xl border border-white/10 bg-black/55 backdrop-blur supports-[backdrop-filter]:bg-black/35">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <button
              onClick={() => go("top")}
              className="group inline-flex items-center gap-2"
              aria-label="Go to top"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
              <span className="text-sm font-semibold tracking-wide text-white/90 group-hover:text-white">
                Modi Hospital
              </span>
            </button>

            <nav className="hidden items-center gap-6 md:flex">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {l.label}
                </button>
              ))}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 transition hover:bg-white/10"
                href="tel:+919825965458"
              >
                <PhoneCall className="h-4 w-4" />
                +91 98259 65458
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-3 py-2 text-sm font-semibold text-black transition hover:bg-cyan-200"
                href={directionsHref}
                target="_blank"
                rel="noreferrer"
              >
                <MapPin className="h-4 w-4" />
                Directions
              </a>
            </div>

            <button
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 transition hover:bg-white/10 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div className={cn("grid overflow-hidden md:hidden", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
            <div className="min-h-0">
              <div className="border-t border-white/10 px-4 py-4">
                <div className="flex flex-col gap-3">
                  {LINKS.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => go(l.id)}
                      className="text-left text-base font-medium text-white/80 transition hover:text-white"
                    >
                      {l.label}
                    </button>
                  ))}
                  <div className="pt-2" />
                  <a
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white/85"
                    href="tel:+919825965458"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Call +91 98259 65458
                  </a>
                  <a
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-3 py-3 font-semibold text-black"
                    href={directionsHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MapPin className="h-4 w-4" />
                    Open Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


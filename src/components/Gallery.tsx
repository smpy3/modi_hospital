/** Facilities: parallax “feature rail” (no photos) with interactive modal details. */
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Activity,
  BedDouble,
  ClipboardList,
  Monitor,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Item = {
  title: string;
  subtitle: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  pill: string;
  imageSrc?: string;
  imagePosition?: string;
};

export function Gallery() {
  // Why: you added facility photos; we use a few as subtle background layers (still keeping the premium motion).
  const items = useMemo<Item[]>(
    () => [
      {
        title: "Operation Theatre Readiness",
        subtitle: "Safety-first peri-operative workflow",
        body: "Sterile protocols, team coordination, and monitoring built into every surgical step — from pre-op planning to post-op handoff.",
        icon: ShieldCheck,
        gradient:
          "bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.28),transparent_55%),radial-gradient(circle_at_75%_65%,rgba(99,102,241,0.25),transparent_55%)]",
        pill: "Surgery",
        imageSrc: "/facilities/4.png",
        imagePosition: "55% 45%",
      },
      {
        title: "Anaesthesia + Monitoring",
        subtitle: "Comfort and vital safety",
        body: "General and regional anaesthesia options with continuous monitoring of vital signs during procedures for safe outcomes.",
        icon: Syringe,
        gradient:
          "bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.22),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.22),transparent_60%)]",
        pill: "Anaesthesia",
        imageSrc: "/facilities/2.png",
        imagePosition: "35% 55%",
      },
      {
        title: "Patient Rooms",
        subtitle: "Calm recovery environment",
        body: "A clean, comfortable space designed to reduce stress and help patients rest and recover with dignity.",
        icon: BedDouble,
        gradient:
          "bg-[radial-gradient(circle_at_25%_35%,rgba(99,102,241,0.22),transparent_60%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.22),transparent_60%)]",
        pill: "Inpatient",
        imageSrc: "/facilities/5.png",
        imagePosition: "60% 50%",
      },
      {
        title: "Critical Care Support",
        subtitle: "When monitoring matters most",
        body: "Focused monitoring and rapid response readiness for higher-risk cases and post-procedure observation.",
        icon: Monitor,
        gradient:
          "bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,0.22),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.18),transparent_60%)]",
        pill: "Critical care",
        imageSrc: "/facilities/6.png",
        imagePosition: "75% 45%",
      },
      {
        title: "Orthopaedics Pathway",
        subtitle: "Diagnosis → Surgery → Rehab",
        body: "A structured plan for fractures, arthroscopy, joint replacement, and spine conditions — with measurable recovery steps.",
        icon: Stethoscope,
        gradient:
          "bg-[radial-gradient(circle_at_18%_22%,rgba(34,197,94,0.18),transparent_60%),radial-gradient(circle_at_75%_55%,rgba(99,102,241,0.22),transparent_60%)]",
        pill: "Orthopaedics",
        imageSrc: "/facilities/3.png",
        imagePosition: "60% 45%",
      },
      {
        title: "Transparent Planning",
        subtitle: "Clear options, clear costs, clear next steps",
        body: "We explain your diagnosis and treatment options in a straightforward way so families can decide confidently.",
        icon: ClipboardList,
        gradient:
          "bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.20),transparent_60%),radial-gradient(circle_at_78%_45%,rgba(34,211,238,0.18),transparent_60%)]",
        pill: "Patient-first",
        imageSrc: "/facilities/1.png",
        imagePosition: "50% 45%",
      },
      {
        title: "Pain Management",
        subtitle: "Comfort before and after procedures",
        body: "Pain control plans tailored to each patient, with emphasis on safe recovery and mobility.",
        icon: Activity,
        gradient:
          "bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,0.20),transparent_60%),radial-gradient(circle_at_75%_65%,rgba(34,197,94,0.16),transparent_60%)]",
        pill: "Recovery",
        // Why: we reuse a facility photo with a different crop to keep consistency across cards.
        imageSrc: "/facilities/2.png",
        imagePosition: "75% 35%",
      },
      {
        title: "24/7 Availability",
        subtitle: "Always open, always responsive",
        body: "Open 24 hours for urgent needs, follow-ups, and ongoing care. Call anytime: +91 98259 65458.",
        icon: Sparkles,
        gradient:
          "bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,0.22),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.22),transparent_60%)]",
        pill: "Always open",
        // Why: reusing a facility shot keeps the section cohesive without adding more assets.
        imageSrc: "/facilities/1.png",
        imagePosition: "55% 55%",
      },
    ],
    [],
  );

  const [active, setActive] = useState<Item | null>(null);
  const { scrollYProgress } = useScroll();

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-8%", "14%"]);

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="text-xs font-semibold tracking-[0.2em] text-cyan-200/80">
          FACILITIES
        </div>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Modern workflow, calm experience, safer outcomes.
        </h2>
        <p className="mt-3 text-pretty text-base leading-7 text-white/65 md:text-lg">
          Scroll to see the parallax rails. Tap any card for details.
        </p>
      </div>

      <div className="mt-10 grid gap-4">
        <motion.div style={{ x: x1 }} className="flex gap-4">
          {items.slice(0, 4).map((it) => (
            <FacilityCard key={it.title} item={it} onClick={() => setActive(it)} />
          ))}
        </motion.div>

        <motion.div style={{ x: x2 }} className="flex gap-4">
          {items.slice(4).map((it) => (
            <FacilityCard key={it.title} item={it} onClick={() => setActive(it)} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.98, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 10, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#070810]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full border border-white/10 bg-black/60 p-2 text-white/80 hover:bg-black/80"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className={cn("relative p-6 md:p-8", active.gradient)}>
                {active.imageSrc ? (
                  <Image
                    // Why: modal gets a larger facility preview while keeping the motion-heavy aesthetic.
                    src={active.imageSrc}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover opacity-30"
                    style={{ objectPosition: active.imagePosition ?? "center" }}
                    priority={false}
                  />
                ) : null}
                <div aria-hidden className="absolute inset-0 bg-black/35" />
                <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/75 backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
                  {active.pill}
                </div>
                <div className="mt-4 flex items-start gap-4">
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur">
                    <active.icon className="h-5 w-5 text-cyan-200" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-white">{active.title}</div>
                    <div className="mt-1 text-sm text-white/70">{active.subtitle}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/75">{active.body}</p>
                </div>
              </div>

              <div className="border-t border-white/10 bg-black/60 px-6 py-4 text-sm text-white/65 md:px-8">
                Want to discuss this? Fill the form in Contact or call{" "}
                <a className="text-cyan-200 hover:text-cyan-100" href="tel:+919825965458">
                  +91 98259 65458
                </a>
                .
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function FacilityCard(props: { item: Item; onClick: () => void }) {
  const Icon = props.item.icon;
  return (
    <button
      onClick={props.onClick}
      className={cn(
        "group relative h-56 w-[340px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-6 text-left",
        "transition hover:bg-white/5",
      )}
    >
      {props.item.imageSrc ? (
        <Image
          // Why: background photo adds credibility; overlays keep the UI text readable.
          src={props.item.imageSrc}
          alt=""
          fill
          sizes="340px"
          className="object-cover opacity-35 transition duration-500 group-hover:scale-[1.03]"
          style={{ objectPosition: props.item.imagePosition ?? "center" }}
          priority={false}
        />
      ) : null}
      <div aria-hidden className={cn("absolute inset-0 opacity-70", props.item.gradient)} />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <motion.div
        aria-hidden
        className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl"
        animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur">
            <Icon className="h-5 w-5 text-cyan-200" />
          </div>
          <span className="rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-xs text-white/70 backdrop-blur">
            {props.item.pill}
          </span>
        </div>
        <div className="mt-4 text-base font-semibold text-white/90">{props.item.title}</div>
        <div className="mt-2 text-sm leading-6 text-white/70">{props.item.subtitle}</div>
        <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white/75">
          <Sparkles className="h-3.5 w-3.5 text-cyan-200/90" />
          Tap for details
        </div>
      </div>
    </button>
  );
}

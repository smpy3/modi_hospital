/** Treatments: interactive grid (filter + search) covering Orthopaedics + Anaesthesia services. */
"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Bone,
  Hand,
  HeartPulse,
  PersonStanding,
  Search,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Tag = "Surgery" | "Arthroscopy" | "Spine" | "Joint" | "Rehab" | "Anaesthesia";

type Treatment = {
  title: string;
  desc: string;
  // Why: tags drive the filter UI (and match what patients search for).
  tag: Tag;
  icon: React.ComponentType<{ className?: string }>;
};

export function Treatments() {
  const all = useMemo<Treatment[]>(
    () => [
      {
        title: "Knee Arthroscopy",
        desc: "Minimally invasive diagnosis and repair for knee injuries.",
        tag: "Arthroscopy",
        icon: Activity,
      },
      {
        title: "Shoulder Arthroscopy",
        desc: "Targeted repair for rotator cuff injuries and shoulder pain.",
        tag: "Arthroscopy",
        icon: Activity,
      },
      {
        title: "Total Knee Replacement",
        desc: "A modern pathway for mobility, pain relief, and confidence.",
        tag: "Joint",
        icon: PersonStanding,
      },
      {
        title: "Total Hip Replacement",
        desc: "Durable joint solutions designed for long-term movement.",
        tag: "Joint",
        icon: PersonStanding,
      },
      {
        title: "Laminectomy",
        desc: "Spine decompression to relieve pressure and reduce pain.",
        tag: "Spine",
        icon: Bone,
      },
      {
        title: "Carpal Tunnel Release",
        desc: "Hand and wrist nerve relief with a focused procedure plan.",
        tag: "Surgery",
        icon: Hand,
      },
      {
        title: "Fracture Care",
        desc: "Accurate assessment, fixation options, and recovery roadmap.",
        tag: "Rehab",
        icon: HeartPulse,
      },
      {
        title: "Sports Injury Rehab",
        desc: "Return-to-sport programs guided by measurable progress.",
        tag: "Rehab",
        icon: HeartPulse,
      },
      {
        title: "General Anaesthesia",
        desc: "Safe anaesthesia plans with continuous monitoring during procedures.",
        tag: "Anaesthesia",
        icon: Activity,
      },
      {
        title: "Regional / Spinal Anaesthesia",
        desc: "Targeted anaesthesia options for comfort and controlled recovery.",
        tag: "Anaesthesia",
        icon: Activity,
      },
      {
        title: "Critical Care Monitoring",
        desc: "Focused monitoring support for higher-risk cases and post-procedure observation.",
        tag: "Anaesthesia",
        icon: HeartPulse,
      },
      {
        title: "Pain Management",
        desc: "Post-operative and condition-based pain control tailored to each patient.",
        tag: "Anaesthesia",
        icon: HeartPulse,
      },
    ],
    [],
  );

  const tags = useMemo(
    () => ["All", "Surgery", "Arthroscopy", "Spine", "Joint", "Rehab", "Anaesthesia"] as const,
    [],
  );

  const [active, setActive] = useState<(typeof tags)[number]>("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return all.filter((t) => {
      const tagOk = active === "All" ? true : t.tag === active;
      const qOk = query ? `${t.title} ${t.desc} ${t.tag}`.toLowerCase().includes(query) : true;
      return tagOk && qOk;
    });
  }, [active, all, q]);

  return (
    <section id="treatments" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold tracking-[0.2em] text-cyan-200/80">
            TREATMENTS
          </div>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            From diagnosis to recovery — we cover the full journey.
          </h2>
          <p className="mt-3 text-pretty text-base leading-7 text-white/65 md:text-lg">
            Tap a category, search a procedure, and explore what Modi Hospital offers.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search (e.g., knee, spine, anaesthesia, arthroscopy)"
              className="w-full rounded-2xl border border-white/10 bg-black/35 py-3 pl-10 pr-4 text-sm text-white/90 placeholder:text-white/35 outline-none transition focus:border-cyan-200/60"
            />
          </div>
          <div className="flex flex-wrap justify-start gap-2 md:justify-end">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-semibold transition",
                  active === t
                    ? "border-cyan-200/40 bg-cyan-200/15 text-cyan-100"
                    : "border-white/10 bg-black/30 text-white/70 hover:bg-white/10",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-8 grid gap-4 md:grid-cols-2">
          {filtered.map((t, idx) => {
            const Icon = t.icon;
            return (
              <motion.div
                layout
                key={t.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.02,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-6"
              >
                <div
                  aria-hidden
                  className="absolute -inset-24 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.25),transparent_60%),radial-gradient(circle_at_75%_65%,rgba(99,102,241,0.25),transparent_60%)]"
                />
                <div className="relative flex items-start gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <Icon className="h-5 w-5 text-cyan-200" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-base font-semibold text-white/90">{t.title}</div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/65">
                        {t.tag}
                      </span>
                    </div>
                    <div className="mt-2 text-sm leading-6 text-white/65">{t.desc}</div>
                    <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-cyan-200/80">
                      <Sparkles className="h-3.5 w-3.5" />
                      Personalized plan available
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


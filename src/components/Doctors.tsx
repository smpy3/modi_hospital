/** Doctors: detailed profiles for Dr. Milan Modi (Orthopaedics) and Dr. Nilam Modi (Anaesthesia). */
"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BadgeCheck,
  GraduationCap,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Profile = {
  key: "milan" | "nilam";
  name: string;
  title: string;
  credentials: string[];
  association: string;
  summary: string;
  highlights: string[];
  interests: string[];
  procedures: string[];
};

export function Doctors() {
  // Why: structured data makes it easy to reorder or reuse (cards, modal, etc).
  const profiles = useMemo<Profile[]>(
    () => [
      {
        key: "milan",
        name: "Dr. Milankumar Ratilal Modi",
        title: "Orthopedic Doctor",
        credentials: ["MBBS", "MS Orthopaedics", "DNB Orthopaedics"],
        association: "Banas Medical College & Research Institute, Moriya (Orthopaedics)",
        summary:
          "A well known Orthopaedician with 10 years of experience, recognized for accurate diagnosis and empathetic treatment.",
        highlights: [
          "Handled numerous complex orthopaedic cases across multiple hospitals.",
          "Known for patient-first communication and clear recovery plans.",
          "Research, workshops, and publications under the Orthopaedics department.",
        ],
        interests: [
          "Fractures",
          "Meniscus tears",
          "Rotator cuff injuries",
          "Herniated discs",
          "Sciatica",
          "Scoliosis",
        ],
        procedures: [
          "Diagnostic Arthroscopy",
          "Total Hip Replacement",
          "Total Knee Replacement",
          "Carpal Tunnel Release",
          "Shoulder Replacement Surgery",
          "Laminectomy",
          "Hip Arthroscopy",
          "Ankle Arthroscopy",
          "Knee Arthroscopy",
          "Shoulder Arthroscopy",
        ],
      },
      {
        key: "nilam",
        name: "Dr. Nilam Milan Modi",
        title: "Anaesthesiologist",
        credentials: ["MBBS", "Diploma in Anaesthesia"],
        association: "Banas Medical College & Research Institute, Moriya (Anaesthesia)",
        summary:
          "A well known Anaesthesiologist with extensive experience in Anaesthesia, trusted for calm decision-making and empathetic patient care.",
        highlights: [
          "Handled numerous complex medical cases across several hospitals.",
          "Proficient in administering multiple types of anaesthesia.",
          "Monitors vital signs and safety throughout surgical procedures.",
          "Research, workshops, and publications under the Anaesthesia department.",
        ],
        interests: [
          "General anaesthesia",
          "Regional anaesthesia",
          "Critical care",
          "Pain management",
        ],
        procedures: [
          "Pre-anaesthesia evaluation",
          "General anaesthesia",
          "Regional / spinal anaesthesia",
          "Post-operative pain control",
          "Critical care monitoring",
        ],
      },
    ],
    [],
  );

  const [active, setActive] = useState<Profile | null>(null);

  return (
    <section id="doctors" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
        >
          <div className="text-xs font-semibold tracking-[0.2em] text-cyan-200/80">
            THE DOCTORS
          </div>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Dr. Milan Modi &amp; Dr. Nilam Modi
          </h2>
          <p className="mt-3 text-pretty text-base leading-7 text-white/65">
            Orthopaedics and Anaesthesia work together to deliver safer surgery and smoother
            recovery — from diagnosis to monitoring to rehabilitation.
          </p>

          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                  <Stethoscope className="h-5 w-5 text-cyan-200" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/90">
                    Orthopaedics (Dr. Milan Modi)
                  </div>
                  <div className="mt-1 text-sm text-white/65">
                    Fractures • Arthroscopy • Joint replacement • Spine
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                  <ShieldCheck className="h-5 w-5 text-cyan-200" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/90">
                    Anaesthesia (Dr. Nilam Modi)
                  </div>
                  <div className="mt-1 text-sm text-white/65">
                    General/Regional anaesthesia • Critical care • Pain management
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                <HeartPulse className="h-5 w-5 text-cyan-200" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white/90">Our promise</div>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  Accurate diagnosis, clear options, and comfort-first treatment — with
                  safety-focused monitoring around procedures.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {/* Why: removed personal photos per request and replaced with animated “signature” cards. */}
          <div className="grid gap-4 md:grid-cols-2">
            {profiles.map((p, idx) => (
              <motion.button
                key={p.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
                onClick={() => setActive(p)}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-6 text-left",
                  "transition hover:bg-white/5",
                )}
              >
                <div
                  aria-hidden
                  className="absolute -inset-24 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_60%),radial-gradient(circle_at_75%_65%,rgba(99,102,241,0.22),transparent_60%)]"
                />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white/90">{p.name}</div>
                      <div className="mt-1 text-sm text-white/65">{p.title}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      {p.key === "milan" ? (
                        <GraduationCap className="h-5 w-5 text-cyan-200" />
                      ) : (
                        <BadgeCheck className="h-5 w-5 text-cyan-200" />
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.credentials.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/75"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/65">{p.summary}</p>

                  <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-cyan-200/80">
                    <Activity className="h-3.5 w-3.5" />
                    Tap for full profile
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="text-sm font-semibold text-white">Quick highlights</div>
            <div className="mt-3 grid gap-2 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                Also associated with Banas Medical College &amp; Research Institute, Moriya.
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                Orthopaedics + Anaesthesia team approach for safer procedures.
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                Emergency support and ongoing care (Open 24 hours).
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.98, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 10, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#070810]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full border border-white/10 bg-black/60 p-2 text-white/80 hover:bg-black/80"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-6 md:p-8">
                <div className="text-xs font-semibold tracking-[0.2em] text-cyan-200/80">
                  FULL PROFILE
                </div>
                <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="text-2xl font-semibold text-white">{active.name}</div>
                    <div className="mt-1 text-sm text-white/70">
                      {active.title} • {active.association}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.credentials.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/70">{active.summary}</p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-black/35 p-5">
                    <div className="text-sm font-semibold text-white">What patients notice</div>
                    <ul className="mt-3 grid gap-2 text-sm text-white/70">
                      {active.highlights.map((h) => (
                        <li key={h} className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/35 p-5">
                    <div className="text-sm font-semibold text-white">Speciality interests</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {active.interests.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/75"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 text-sm font-semibold text-white">Common procedures</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {active.procedures.map((p) => (
                        <span
                          key={p}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 bg-black/60 px-6 py-4 text-sm text-white/65 md:px-8">
                For appointments, call{" "}
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


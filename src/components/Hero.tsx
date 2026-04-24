/** Hero: premium intro with smooth-scroll CTAs + parallax/tilt hospital-themed animated visual. */
"use client";

import React, { useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useSmoothScroll } from "@/app/providers";

export function Hero() {
  const { scrollTo } = useSmoothScroll();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

  // Why: mouse tilt adds an “interactive premium” feel without loading heavy 3D libs.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness: 180, damping: 22 });
  const tiltYSpring = useSpring(tiltY, { stiffness: 180, damping: 22 });

  const stats = useMemo(
    () => [
      { k: "Open", v: "24 Hours" },
      { k: "Location", v: "Palanpur, Gujarat" },
      { k: "Specialities", v: "Orthopaedics + Anaesthesia" },
    ],
    [],
  );

  return (
    <section id="top" ref={ref} className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-10 md:pt-16">
        <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
          <motion.div
            style={{ opacity: glowOpacity }}
            aria-hidden
            className="absolute -inset-10 bg-[radial-gradient(circle_at_35%_20%,rgba(34,211,238,0.55),transparent_45%),radial-gradient(circle_at_70%_55%,rgba(99,102,241,0.55),transparent_50%)] blur-2xl"
          />

          <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/75">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                World-class orthopaedic care and safe anaesthesia — with heart.
              </div>

              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Modi Hospital
                <span className="block text-white/60">Palanpur&apos;s patient-first care team.</span>
              </h1>

              <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-white/70 md:text-lg">
                Near Aroma Circle, Highway, Palanpur, Gujarat 385001 • Open 24 hours • Call{" "}
                <a className="text-cyan-200 hover:text-cyan-100" href="tel:+919825965458">
                  +91 98259 65458
                </a>
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) scrollTo(el);
                  }}
                  className="group inline-flex items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 font-semibold text-black transition hover:bg-cyan-200"
                >
                  Book an appointment
                  <span className="ml-2 inline-block transition group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("treatments");
                    if (el) scrollTo(el);
                  }}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white/90 transition hover:bg-white/10"
                >
                  Explore treatments
                </button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.k}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                  >
                    <div className="text-xs text-white/55">{s.k}</div>
                    <div className="mt-1 text-sm font-semibold text-white/90">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <motion.div
                style={{
                  scale: visualScale,
                  y: visualY,
                  rotateX: tiltXSpring,
                  rotateY: tiltYSpring,
                  transformPerspective: 900,
                }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40"
                onPointerMove={(e) => {
                  const el = e.currentTarget;
                  const rect = el.getBoundingClientRect();
                  const px = (e.clientX - rect.left) / rect.width;
                  const py = (e.clientY - rect.top) / rect.height;
                  const max = 7;
                  tiltY.set((px - 0.5) * max * 2);
                  tiltX.set((0.5 - py) * max * 2);
                }}
                onPointerLeave={() => {
                  tiltX.set(0);
                  tiltY.set(0);
                }}
              >
                {/* Why: you asked to remove the provided photos; this is a custom animated hospital visual instead. */}
                <div className="relative h-[420px] w-full md:h-[520px]">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.35),transparent_55%),radial-gradient(circle_at_70%_45%,rgba(99,102,241,0.35),transparent_55%),radial-gradient(circle_at_45%_85%,rgba(34,197,94,0.22),transparent_55%)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.25] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]"
                  />

                  <svg
                    viewBox="0 0 900 520"
                    className="absolute inset-0 h-full w-full"
                    role="img"
                    aria-label="Hospital care visual"
                  >
                    <defs>
                      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="rgba(34,211,238,0.95)" />
                        <stop offset="0.55" stopColor="rgba(99,102,241,0.9)" />
                        <stop offset="1" stopColor="rgba(34,197,94,0.65)" />
                      </linearGradient>
                      <filter id="blur">
                        <feGaussianBlur stdDeviation="18" />
                      </filter>
                    </defs>

                    {/* Soft glow blobs */}
                    <circle
                      cx="220"
                      cy="170"
                      r="120"
                      fill="rgba(34,211,238,0.28)"
                      filter="url(#blur)"
                    />
                    <circle
                      cx="660"
                      cy="210"
                      r="140"
                      fill="rgba(99,102,241,0.25)"
                      filter="url(#blur)"
                    />
                    <circle
                      cx="430"
                      cy="420"
                      r="120"
                      fill="rgba(34,197,94,0.18)"
                      filter="url(#blur)"
                    />

                    {/* Medical cross */}
                    <g transform="translate(365 120)">
                      <motion.rect
                        x="95"
                        y="0"
                        width="80"
                        height="260"
                        rx="22"
                        fill="url(#g)"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.rect
                        x="0"
                        y="90"
                        width="270"
                        height="80"
                        rx="22"
                        fill="url(#g)"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                      />
                    </g>

                    {/* ECG line animation */}
                    <motion.path
                      d="M80 350 L190 350 L220 310 L255 390 L285 250 L315 350 L430 350 L465 320 L505 380 L540 300 L575 350 L820 350"
                      fill="none"
                      stroke="rgba(255,255,255,0.85)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0.5 }}
                      animate={{ pathLength: [0, 1, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </svg>

                  <motion.div
                    aria-hidden
                    className="absolute left-6 top-6 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="text-xs text-white/60">Peri-operative safety</div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      Anaesthesia + Monitoring
                    </div>
                  </motion.div>

                  <motion.div
                    aria-hidden
                    className="absolute right-6 top-10 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.16 }}
                  >
                    <div className="text-xs text-white/60">Ortho expertise</div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      Diagnosis → Surgery → Rehab
                    </div>
                  </motion.div>
                </div>

                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.80),transparent_55%)]" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur">
                    <div className="text-xs text-white/60">
                      Orthopaedics • Anaesthesia • Surgery • Rehab
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      Trusted care, from diagnosis to recovery.
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById("about");
              if (el) scrollTo(el);
            }}
            className="group relative mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white/80 transition hover:bg-white/10"
          >
            Scroll to explore
            <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}


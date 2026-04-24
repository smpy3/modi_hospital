/** About: quick trust section (location, hours, mission) with animated cards. */
"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Building2, Clock, HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";

export function About() {
  const items = useMemo(
    () => [
      {
        icon: Building2,
        title: "Modi Hospital, Palanpur",
        body: "Near Aroma Circle, Highway, Palanpur, Gujarat 385001, India.",
      },
      { icon: Clock, title: "Open 24 Hours", body: "Emergency support and ongoing care." },
      {
        icon: Stethoscope,
        title: "Orthopaedics Focus",
        body: "Fractures, arthroscopy, joint replacement, and spine conditions.",
      },
      {
        icon: ShieldCheck,
        title: "Anaesthesia + Monitoring",
        body: "Safety-focused peri-operative monitoring and comfort-first care.",
      },
      {
        icon: HeartHandshake,
        title: "Empathy + Accuracy",
        body: "Clear diagnosis, transparent plans, and respectful care.",
      },
    ],
    [],
  );

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold tracking-[0.2em] text-cyan-200/80">
            TRUST, FIRST
          </div>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            A hospital experience that feels calm, modern, and human.
          </h2>
          <p className="mt-3 text-pretty text-base leading-7 text-white/65 md:text-lg">
            Modi Hospital brings orthopaedics and anaesthesia safety together — from first
            consultation to procedure monitoring and rehabilitation.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((it, idx) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.05,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-6"
              >
                <div
                  aria-hidden
                  className="absolute -inset-20 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.35),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.35),transparent_55%)]"
                />
                <div className="relative flex items-start gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <Icon className="h-5 w-5 text-cyan-200" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/90">{it.title}</div>
                    <div className="mt-2 text-sm leading-6 text-white/65">{it.body}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-black/35 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-sm font-semibold text-white">Academic association</div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Also associated with{" "}
                <span className="text-white/85">Banas Medical College &amp; Research Institute</span>
                , Palanpur — Orthopaedics and Anaesthesia departments.
              </p>
            </div>
            <a
              href="tel:+919825965458"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Call now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


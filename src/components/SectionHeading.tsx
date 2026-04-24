/** SectionHeading: consistent heading style + subtle reveal animation. */
"use client";

import React from "react";
import { motion } from "framer-motion";

export function SectionHeading(props: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  // Why: keeps typography consistent while still feeling animated.
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="mx-auto max-w-3xl text-center"
    >
      {props.eyebrow ? (
        <div className="text-xs font-semibold tracking-[0.2em] text-cyan-200/80">
          {props.eyebrow}
        </div>
      ) : null}
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {props.title}
      </h2>
      {props.subtitle ? (
        <p className="mt-3 text-pretty text-base leading-7 text-white/65 md:text-lg">
          {props.subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}


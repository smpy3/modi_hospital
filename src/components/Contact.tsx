/** Contact: appointment/request form that posts to /api/contact and shows success/fail states. */
"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Loader2, Mail } from "lucide-react";
import { contactSchema, type ContactPayload } from "@/lib/contactSchema";
import { cn } from "@/lib/cn";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [form, setForm] = useState<ContactPayload>(() => ({
    name: "",
    phone: "",
    email: "",
    subject: "Appointment Request",
    message: "",
    preferredTime: "",
    website: "",
  }));

  const fields = useMemo(
    () => [
      { k: "name", label: "Full name", placeholder: "Your name" },
      { k: "phone", label: "Phone", placeholder: "+91 ..." },
      { k: "email", label: "Email (optional)", placeholder: "you@email.com" },
      {
        k: "preferredTime",
        label: "Preferred time (optional)",
        placeholder: "Today 6pm / Tomorrow morning",
      },
      { k: "subject", label: "Subject", placeholder: "Appointment / Follow-up / Surgery consult" },
    ] satisfies Array<{ k: keyof ContactPayload; label: string; placeholder: string }>,
    [],
  );

  const set = (k: keyof ContactPayload, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ kind: "loading" });

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setStatus({ kind: "error", message: parsed.error.issues[0]?.message ?? "Invalid form." });
      return;
    }

    // Why: GitHub Pages is static hosting (no server), so we send via Formspree (or show a fallback).
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      const mailtoTo = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
      const mailto = new URL(`mailto:${mailtoTo}`);
      mailto.searchParams.set("subject", `Modi Hospital Website: ${parsed.data.subject}`);
      mailto.searchParams.set(
        "body",
        [
          `Name: ${parsed.data.name}`,
          `Phone: ${parsed.data.phone}`,
          `Email: ${parsed.data.email || "—"}`,
          `Preferred time: ${parsed.data.preferredTime || "—"}`,
          "",
          parsed.data.message,
        ].join("\n"),
      );

      setStatus({
        kind: "error",
        message:
          "Form is not configured yet. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT (recommended) or use the Call button.",
      });
      // Best-effort: open a mail draft so the message isn't lost.
      window.open(mailto.toString(), "_blank");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          name: parsed.data.name,
          phone: parsed.data.phone,
          email: parsed.data.email,
          subject: parsed.data.subject,
          message: parsed.data.message,
          preferredTime: parsed.data.preferredTime,
        }),
      });

      if (!res.ok) {
        setStatus({
          kind: "error",
          message: "Could not send your message. Please try again.",
        });
        return;
      }

      setStatus({ kind: "success", message: "Thanks — we’ll reach out soon." });
      setForm({
        name: "",
        phone: "",
        email: "",
        subject: "Appointment Request",
        message: "",
        preferredTime: "",
        website: "",
      });
    } catch {
      setStatus({ kind: "error", message: "Network error. Please try again." });
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-10 md:px-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="text-xs font-semibold tracking-[0.2em] text-cyan-200/80">
              CONTACT
            </div>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Tell us what you need — we’ll reach out quickly.
            </h2>
            <p className="mt-3 text-pretty text-base leading-7 text-white/65 md:text-lg">
              If you have any requirements, fill out the form and we’ll respond by phone (and
              email if provided).
            </p>

            <div className="mt-6 rounded-3xl border border-white/10 bg-black/35 p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <Mail className="h-5 w-5 text-cyan-200" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Notification email</div>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    Form submissions notify your email via Formspree (recommended for GitHub Pages).
                    (See `web/.env.example`.)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm text-white/60">
              Prefer calling?{" "}
              <a className="text-cyan-200 hover:text-cyan-100" href="tel:+919825965458">
                +91 98259 65458
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            className="rounded-3xl border border-white/10 bg-black/35 p-6"
          >
            <div className="grid gap-4">
              {/* Why: “honeypot” field blocks many bots with zero user friction. */}
              <input
                tabIndex={-1}
                autoComplete="off"
                value={form.website ?? ""}
                onChange={(e) => set("website", e.target.value)}
                className="hidden"
                aria-hidden
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {fields.slice(0, 2).map((f) => (
                  <label key={f.k} className="grid gap-2">
                    <span className="text-xs font-semibold text-white/70">{f.label}</span>
                    <input
                      value={(form[f.k] as string) ?? ""}
                      onChange={(e) => set(f.k as keyof ContactPayload, e.target.value)}
                      placeholder={f.placeholder}
                      className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 placeholder:text-white/35 outline-none transition focus:border-cyan-200/60"
                    />
                  </label>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {fields.slice(2, 4).map((f) => (
                  <label key={f.k} className="grid gap-2">
                    <span className="text-xs font-semibold text-white/70">{f.label}</span>
                    <input
                      value={(form[f.k] as string) ?? ""}
                      onChange={(e) => set(f.k as keyof ContactPayload, e.target.value)}
                      placeholder={f.placeholder}
                      className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 placeholder:text-white/35 outline-none transition focus:border-cyan-200/60"
                    />
                  </label>
                ))}
              </div>

              <label className="grid gap-2">
                <span className="text-xs font-semibold text-white/70">{fields[4].label}</span>
                <input
                  value={form.subject}
                  onChange={(e) => set("subject", e.target.value)}
                  placeholder={fields[4].placeholder}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 placeholder:text-white/35 outline-none transition focus:border-cyan-200/60"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold text-white/70">Message</span>
                <textarea
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="Tell us about symptoms, injury, pain duration, reports, etc."
                  rows={6}
                  className="resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 placeholder:text-white/35 outline-none transition focus:border-cyan-200/60"
                />
              </label>

              <button
                disabled={status.kind === "loading"}
                className={cn(
                  "inline-flex items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200",
                  status.kind === "loading" ? "opacity-80" : "",
                )}
              >
                {status.kind === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Send message"
                )}
              </button>

              {status.kind === "success" ? (
                <div className="flex items-start gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                  <CheckCircle2 className="mt-0.5 h-4 w-4" />
                  <div>{status.message}</div>
                </div>
              ) : null}

              {status.kind === "error" ? (
                <div className="flex items-start gap-2 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                  <AlertTriangle className="mt-0.5 h-4 w-4" />
                  <div>{status.message}</div>
                </div>
              ) : null}

              <div className="text-xs leading-5 text-white/45">
                By submitting, you agree to be contacted about your request.
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

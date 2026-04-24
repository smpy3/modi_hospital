/** Footer: simple closing with address + quick links. */
import React from "react";

export function Footer() {
  // Why: gives a clean ending and repeats the trust details (address/phone).
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold text-white">Modi Hospital</div>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Near Aroma Circle, Highway,
              <br />
              Palanpur, Gujarat 385001, India
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Contact</div>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Phone:{" "}
              <a className="text-cyan-200 hover:text-cyan-100" href="tel:+919825965458">
                +91 98259 65458
              </a>
              <br />
              Hours: Open 24 hours
            </p>
          </div>
          <div className="md:text-right">
            <div className="text-sm font-semibold text-white">Note</div>
            <p className="mt-2 text-sm leading-6 text-white/65">
              This website is for information only and does not replace medical advice.
            </p>
          </div>
        </div>
        <div className="mt-8 text-xs text-white/40">
          © {new Date().getFullYear()} Modi Hospital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


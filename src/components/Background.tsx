/** Background: renders the “premium” gradient grid + glow used across the page. */
import React from "react";

export function Background() {
  // Why: keeps the page feeling “alive” without heavy 3D libs.
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#05060a]" />
      <div className="absolute inset-0 opacity-[0.16] bg-[radial-gradient(circle_at_20%_10%,rgba(79,70,229,0.9),transparent_50%),radial-gradient(circle_at_80%_25%,rgba(56,189,248,0.9),transparent_45%),radial-gradient(circle_at_50%_85%,rgba(34,197,94,0.55),transparent_45%)]" />
      <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_60%)]" />
      <div className="absolute inset-0 noise" />
    </div>
  );
}


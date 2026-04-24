/** Providers: enables smooth scrolling (Lenis) and exposes a shared scrollTo helper. */
"use client";

import Lenis from "lenis";
import React, { createContext, useContext, useEffect, useMemo, useRef } from "react";

type SmoothScrollContextValue = {
  scrollTo: (target: string | HTMLElement, opts?: { offset?: number }) => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export function useSmoothScroll() {
  const value = useContext(SmoothScrollContext);
  if (!value) throw new Error("useSmoothScroll must be used within <Providers />");
  return value;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Why: Lenis gives the “premium” smooth scroll + momentum used in many award-style sites.
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value = useMemo<SmoothScrollContextValue>(() => {
    return {
      scrollTo: (target, opts) => {
        const lenis = lenisRef.current;
        if (!lenis) return;
        lenis.scrollTo(target, { offset: opts?.offset ?? -80, duration: 1.1 });
      },
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
  );
}

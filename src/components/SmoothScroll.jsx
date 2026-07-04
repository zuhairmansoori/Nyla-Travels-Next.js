"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export let lenisInstance = null;

export default function SmoothScroll() {
  useEffect(() => {
    lenisInstance = new Lenis();
    window.lenis = lenisInstance;
    function raf(time) {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
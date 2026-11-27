"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  target: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  decimals?: number;
}

export function CountUp({
  target,
  prefix = "",
  suffix = "",
  durationMs = 1200,
  decimals = 0,
}: CountUpProps) {
  const [value, setValue] = useState(target);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = performance.now();

            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / durationMs, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(target * eased);
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setValue(target);
              }
            };

            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, durationMs]);

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

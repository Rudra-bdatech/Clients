"use client";

import { useEffect, useRef, useState } from "react";

export interface ComparisonRow {
  metric: string;
  agency: string;
  affiliate: string;
  inHouse: string;
  clients: string;
  highlighted?: boolean;
}

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setVisible(true);
              });
            });
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-labelledby="comparison-heading"
      className={`glass-strong rounded-2xl overflow-x-auto focus-visible:outline-2 focus-visible:outline-mint transition-[opacity,transform] duration-600 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <table className="w-full min-w-[800px] text-left border-collapse">
        <thead>
          <tr className="border-b border-border/50">
            <th
              scope="col"
              className="py-5 px-6 text-left text-sm font-semibold text-muted-foreground uppercase tracking-wider"
            >
              Metric
            </th>
            <th
              scope="col"
              className="py-5 px-6 text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider"
            >
              Standard Agency
            </th>
            <th
              scope="col"
              className="py-5 px-6 text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider"
            >
              Affiliate Network
            </th>
            <th
              scope="col"
              className="py-5 px-6 text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider"
            >
              In-House Team
            </th>
            <th
              scope="col"
              className="py-5 px-6 text-center text-sm font-bold text-mint uppercase tracking-wider"
            >
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full bg-mint animate-dot-pulse"
                />
                Clients.co.in
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30 text-sm">
          {rows.map((row, idx) => (
            <tr
              key={row.metric}
              style={{
                transitionDelay: visible ? `${120 + idx * 90}ms` : "0ms",
              }}
              className={`transition-[opacity,transform,background-color] duration-500 ease-out hover:bg-secondary/30 ${
                row.highlighted ? "bg-secondary/20" : ""
              } ${
                visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <th scope="row" className="py-5 px-6 font-semibold text-foreground">
                {row.metric}
              </th>
              <td className="py-5 px-6 font-mono text-muted-foreground text-center">
                {row.agency}
              </td>
              <td className="py-5 px-6 font-mono text-muted-foreground text-center">
                {row.affiliate}
              </td>
              <td className="py-5 px-6 font-mono text-muted-foreground text-center">
                {row.inHouse}
              </td>
              <td className="py-5 px-6 font-mono font-bold text-mint text-center">
                {row.clients}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

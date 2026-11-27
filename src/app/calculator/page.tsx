"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type KnowMode = "budget" | "target";
type ChannelMode = "google" | "meta" | "both";
type PeriodMode = "day" | "month";

interface ChannelInputs {
  cpl: number;
  completedPct: number;
  approvedPct: number;
  disbursedPct: number;
}

interface Benchmarks {
  completedPct: number;
  approvedPct: number;
  disbursedPct: number;
  disbursementPct: number;
}

const DEFAULT_GOOGLE: ChannelInputs = {
  cpl: 135,
  completedPct: 70,
  approvedPct: 20,
  disbursedPct: 12,
};

const DEFAULT_META: ChannelInputs = {
  cpl: 68,
  completedPct: 55,
  approvedPct: 10,
  disbursedPct: 5,
};

const DEFAULT_BENCHMARKS: Benchmarks = {
  completedPct: 65,
  approvedPct: 15,
  disbursedPct: 8,
  disbursementPct: 9,
};

const DAYS_PER_MONTH = 30;

function formatIN(num: number, decimals = 0): string {
  if (!Number.isFinite(num)) return "0";
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatINRCompact(amount: number): string {
  if (!Number.isFinite(amount) || amount <= 0) return "₹0";
  if (amount >= 1e7) {
    return `₹${(amount / 1e7).toFixed(2)} Cr`;
  }
  if (amount >= 1e5) {
    return `₹${(amount / 1e5).toFixed(2)} L`;
  }
  return `₹${formatIN(Math.round(amount))}`;
}

function formatCurrency(amount: number, decimals = 0): string {
  if (!Number.isFinite(amount)) return "₹0";
  return `₹${formatIN(amount, decimals)}`;
}

function computeChannelMetrics(
  channelBudgetMonth: number,
  ch: ChannelInputs,
  ticketSize: number,
  channelSplit: number,
  isBothChannels: boolean
) {
  const safeCpl = Math.max(1, ch.cpl);
  // Spend saturation (e = 0.2, reference spend at 50% split)
  // Only applies when both channels run and split > 0 (matching Claude Artifact specification)
  const saturationFactor =
    isBothChannels && channelSplit > 0
      ? Math.pow(channelSplit / 50, 0.2)
      : 1;
  const effectiveCpl = safeCpl * saturationFactor;

  const leadsMonth = channelBudgetMonth / effectiveCpl;
  const leadsDay = leadsMonth / DAYS_PER_MONTH;
  const completedApps = leadsMonth * (ch.completedPct / 100);
  const approvedLeads = leadsMonth * (ch.approvedPct / 100);
  const loansDisbursed = leadsMonth * (ch.disbursedPct / 100);
  const amountDisbursedMonth = loansDisbursed * ticketSize;
  const amountDisbursedDay = amountDisbursedMonth / DAYS_PER_MONTH;
  const costPerQualifiedLead =
    approvedLeads > 0 ? channelBudgetMonth / approvedLeads : 0;
  const costPerDisbursedLoan =
    loansDisbursed > 0 ? channelBudgetMonth / loansDisbursed : 0;
  const disbursementPct =
    amountDisbursedMonth > 0
      ? (channelBudgetMonth * 100) / amountDisbursedMonth
      : 0;

  return {
    budgetMonth: channelBudgetMonth,
    budgetDay: channelBudgetMonth / DAYS_PER_MONTH,
    cpl: ch.cpl,
    effectiveCpl,
    leadsMonth,
    leadsDay,
    completedApps,
    approvedLeads,
    loansDisbursed,
    amountDisbursedMonth,
    amountDisbursedDay,
    costPerQualifiedLead,
    costPerDisbursedLoan,
    disbursementPct,
  };
}

export default function CalculatorPage() {
  const [knowMode, setKnowMode] = useState<KnowMode>("budget");
  const [channelMode, setChannelMode] = useState<ChannelMode>("both");
  const [periodMode, setPeriodMode] = useState<PeriodMode>("month");

  const [budgetMonth, setBudgetMonth] = useState(1500000);
  const [targetDisbursalMonth, setTargetDisbursalMonth] = useState(16346000);
  const [ticketSize, setTicketSize] = useState(13419);
  const [googleSplit, setGoogleSplit] = useState(50);

  const [google, setGoogle] = useState<ChannelInputs>(DEFAULT_GOOGLE);
  const [meta, setMeta] = useState<ChannelInputs>(DEFAULT_META);
  const [benchmarks, setBenchmarks] = useState<Benchmarks>(DEFAULT_BENCHMARKS);

  const effectiveGoogleSplit =
    channelMode === "google" ? 100 : channelMode === "meta" ? 0 : googleSplit;
  const effectiveMetaSplit = 100 - effectiveGoogleSplit;
  const isBoth = channelMode === "both";

  // Determine total monthly budget based on knowMode
  const totalBudgetMonth = useMemo(() => {
    if (knowMode === "budget") return Math.max(0, budgetMonth);

    // Target mode with saturation:
    // Disbursal = totalBudget * sum(split_i * disbursedPct_i / (100 * cpl_eff_i)) * ticketSize
    const gSat = isBoth && effectiveGoogleSplit > 0 ? Math.pow(effectiveGoogleSplit / 50, 0.2) : 1;
    const mSat = isBoth && effectiveMetaSplit > 0 ? Math.pow(effectiveMetaSplit / 50, 0.2) : 1;
    const gEffCpl = Math.max(1, google.cpl) * gSat;
    const mEffCpl = Math.max(1, meta.cpl) * mSat;

    const gFactor =
      (effectiveGoogleSplit / 100) *
      (google.disbursedPct / 100 / gEffCpl);
    const mFactor =
      (effectiveMetaSplit / 100) *
      (meta.disbursedPct / 100 / mEffCpl);
    const totalLoansPerRupee = gFactor + mFactor;
    if (totalLoansPerRupee <= 0 || ticketSize <= 0) return 0;
    return targetDisbursalMonth / (totalLoansPerRupee * ticketSize);
  }, [
    knowMode,
    budgetMonth,
    targetDisbursalMonth,
    ticketSize,
    channelMode,
    isBoth,
    effectiveGoogleSplit,
    effectiveMetaSplit,
    google,
    meta,
  ]);

  const gMetrics = useMemo(
    () =>
      computeChannelMetrics(
        totalBudgetMonth * (effectiveGoogleSplit / 100),
        google,
        ticketSize,
        effectiveGoogleSplit,
        isBoth
      ),
    [totalBudgetMonth, effectiveGoogleSplit, google, ticketSize, isBoth]
  );

  const mMetrics = useMemo(
    () =>
      computeChannelMetrics(
        totalBudgetMonth * (effectiveMetaSplit / 100),
        meta,
        ticketSize,
        effectiveMetaSplit,
        isBoth
      ),
    [totalBudgetMonth, effectiveMetaSplit, meta, ticketSize, isBoth]
  );

  const totals = useMemo(() => {
    const leadsMonth = gMetrics.leadsMonth + mMetrics.leadsMonth;
    const leadsDay = leadsMonth / DAYS_PER_MONTH;
    const completedApps = gMetrics.completedApps + mMetrics.completedApps;
    const approvedLeads = gMetrics.approvedLeads + mMetrics.approvedLeads;
    const loansDisbursed = gMetrics.loansDisbursed + mMetrics.loansDisbursed;
    const amountDisbursedMonth =
      gMetrics.amountDisbursedMonth + mMetrics.amountDisbursedMonth;
    const amountDisbursedDay = amountDisbursedMonth / DAYS_PER_MONTH;
    const blendedCpl = leadsMonth > 0 ? totalBudgetMonth / leadsMonth : 0;
    const costPerQualifiedLead =
      approvedLeads > 0 ? totalBudgetMonth / approvedLeads : 0;
    const costPerDisbursedLoan =
      loansDisbursed > 0 ? totalBudgetMonth / loansDisbursed : 0;
    const disbursementPct =
      amountDisbursedMonth > 0
        ? (totalBudgetMonth * 100) / amountDisbursedMonth
        : 0;

    return {
      budgetMonth: totalBudgetMonth,
      budgetDay: totalBudgetMonth / DAYS_PER_MONTH,
      leadsMonth,
      leadsDay,
      completedApps,
      approvedLeads,
      loansDisbursed,
      amountDisbursedMonth,
      amountDisbursedDay,
      blendedCpl,
      costPerQualifiedLead,
      costPerDisbursedLoan,
      disbursementPct,
    };
  }, [gMetrics, mMetrics, totalBudgetMonth]);

  // Best mix optimizer: tries every split from 0% to 100% in 5% steps
  // (matching Claude Artifact specification)
  const bestMix = useMemo(() => {
    if (channelMode !== "both" || totalBudgetMonth <= 0) return null;
    let bestG = effectiveGoogleSplit;
    let bestCost = totals.costPerDisbursedLoan;

    for (let g = 0; g <= 100; g += 5) {
      const m = 100 - g;
      const gm = computeChannelMetrics(
        totalBudgetMonth * (g / 100),
        google,
        ticketSize,
        g,
        true
      );
      const mm = computeChannelMetrics(
        totalBudgetMonth * (m / 100),
        meta,
        ticketSize,
        m,
        true
      );
      const totalLoans = gm.loansDisbursed + mm.loansDisbursed;
      const cost = totalLoans > 0 ? totalBudgetMonth / totalLoans : Infinity;
      if (cost < bestCost) {
        bestCost = cost;
        bestG = g;
      }
    }

    const savings = Math.round(totals.costPerDisbursedLoan - bestCost);
    // Hidden when current split is within 1 point of the best (matching spec):
    if (Math.abs(bestG - effectiveGoogleSplit) <= 1 || savings <= 0) return null;

    return {
      googleSplit: bestG,
      metaSplit: 100 - bestG,
      bestCost,
      savings,
    };
  }, [
    channelMode,
    totalBudgetMonth,
    effectiveGoogleSplit,
    totals.costPerDisbursedLoan,
    google,
    meta,
    ticketSize,
  ]);

  const lowerCostChannel: "google" | "meta" | null =
    channelMode !== "both"
      ? null
      : gMetrics.costPerDisbursedLoan <= mMetrics.costPerDisbursedLoan
        ? "google"
        : "meta";

  const isAboveBenchmark = totals.disbursementPct > benchmarks.disbursementPct;


  const maxChartValue = Math.max(
    1,
    gMetrics.leadsMonth,
    mMetrics.leadsMonth,
    gMetrics.completedApps,
    mMetrics.completedApps
  );

  // Dynamic headroom / target helper for Summary
  const benchRatio = benchmarks.disbursementPct / 100;
  const gMaxCpl = ticketSize * (google.disbursedPct / 100) * benchRatio;
  const gMinDisbPct =
    ticketSize * benchRatio > 0
      ? (gMetrics.effectiveCpl * 100) / (ticketSize * benchRatio)
      : 0;
  const mMaxCpl = ticketSize * (meta.disbursedPct / 100) * benchRatio;
  const mMinDisbPct =
    ticketSize * benchRatio > 0
      ? (mMetrics.effectiveCpl * 100) / (ticketSize * benchRatio)
      : 0;
  const mTargetTicket =
    (meta.disbursedPct / 100) * benchRatio > 0
      ? meta.cpl / ((meta.disbursedPct / 100) * benchRatio)
      : 0;

  // Gauge reverse-calculation matching Claude Artifact:
  // sets disbursedPct on channels inversely proportional to target disbursement ratio
  const handleGaugeChange = (targetDisbPct: number) => {
    if (targetDisbPct <= 0 || ticketSize <= 0) return;
    const targetD = targetDisbPct / 100;
    const newG = parseFloat(
      ((gMetrics.effectiveCpl * 100) / (ticketSize * targetD)).toFixed(2)
    );
    const newM = parseFloat(
      ((mMetrics.effectiveCpl * 100) / (ticketSize * targetD)).toFixed(2)
    );
    setGoogle((prev) => ({ ...prev, disbursedPct: newG }));
    setMeta((prev) => ({ ...prev, disbursedPct: newM }));
  };

  // Theme classes — static design tokens (global theme handled by Navbar toggle)
  const pageBg = "bg-background text-foreground";
  const cardBg = "bg-card border-border";
  const inputBg = "calc-input-box";
  const mutedText = "text-muted-foreground";
  const subCardBg = "bg-secondary border-border";

  const displayBudgetValue =
    periodMode === "month"
      ? Math.round(budgetMonth)
      : Math.round(budgetMonth / DAYS_PER_MONTH);
  const displayTargetValue =
    periodMode === "month"
      ? Math.round(targetDisbursalMonth)
      : Math.round(targetDisbursalMonth / DAYS_PER_MONTH);

  return (
    <div className={`min-h-screen flex flex-col overflow-x-clip ${pageBg}`}>
      <Navbar />

      <main className="relative flex-1 pt-24 pb-20 px-4 sm:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[520px] h-[260px] bg-emerald-400/10 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="relative flex items-center justify-center pt-2 pb-1">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-center">
              NBFC Ads &amp; Disbursal Calculator
            </h1>
          </div>

          {/* Top Controls Row (Centered) */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <span className={`text-xs font-medium ${mutedText}`}>
                What do you know?
              </span>
              <div
                className={`inline-flex rounded-xl border p-1 ${cardBg}`}
              >
                <button
                  type="button"
                  onClick={() => setKnowMode("budget")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    knowMode === "budget"
                      ? "bg-[#4ade80] text-[#04101f]"
                      : `${mutedText} hover:text-emerald-400`
                  }`}
                >
                  Ad Budget
                </button>
                <button
                  type="button"
                  onClick={() => setKnowMode("target")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    knowMode === "target"
                      ? "bg-[#4ade80] text-[#04101f]"
                      : `${mutedText} hover:text-emerald-400`
                  }`}
                >
                  Disbursal Target
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className={`text-xs font-medium ${mutedText}`}>
                Where are the ads running?
              </span>
              <div
                className={`inline-flex rounded-xl border p-1 ${cardBg}`}
              >
                {(["google", "meta", "both"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setChannelMode(mode)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors cursor-pointer ${
                      channelMode === mode
                        ? "bg-[#4ade80] text-[#04101f]"
                        : `${mutedText} hover:text-emerald-400`
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main 2-Column Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-start">
            {/* LEFT COLUMN: Inputs */}
            <div className="space-y-4">
              {/* Ad budget & Ticket Size Card */}
              <section className={`rounded-2xl border p-5 space-y-4.5 ${cardBg}`}>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-bold">
                    {knowMode === "budget" ? "Ad budget" : "Disbursal target"}
                  </h2>

                  <div className={`inline-flex rounded-xl border p-1 ${subCardBg}`}>
                    <button
                      type="button"
                      onClick={() => setPeriodMode("day")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        periodMode === "day"
                          ? "bg-[#4ade80] text-[#04101f]"
                          : mutedText
                      }`}
                    >
                      Per day
                    </button>
                    <button
                      type="button"
                      onClick={() => setPeriodMode("month")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        periodMode === "month"
                          ? "bg-[#4ade80] text-[#04101f]"
                          : mutedText
                      }`}
                    >
                      Per month
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="primary-amount"
                    className={`block text-xs font-medium mb-2 ${mutedText}`}
                  >
                    {knowMode === "budget"
                      ? `Budget per ${periodMode}`
                      : `Target disbursal per ${periodMode}`}
                  </label>
                  <div
                    className={`flex items-center justify-between rounded-xl px-4 py-3 ${inputBg}`}
                  >
                    <span className={`text-sm font-mono ${mutedText}`}>₹</span>
                    <input
                      id="primary-amount"
                      type="text"
                      inputMode="numeric"
                      value={formatIN(
                        knowMode === "budget"
                          ? displayBudgetValue
                          : displayTargetValue
                      )}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, "");
                        const val = Math.max(0, Number(raw) || 0);
                        const monthly =
                          periodMode === "month" ? val : val * DAYS_PER_MONTH;
                        if (knowMode === "budget") {
                          setBudgetMonth(monthly);
                        } else {
                          setTargetDisbursalMonth(monthly);
                        }
                      }}
                      className="w-full bg-transparent text-right font-mono font-bold text-base focus:outline-none"
                    />
                  </div>
                  <p className="mt-2 text-xs font-bold">
                    {knowMode === "budget"
                      ? periodMode === "month"
                        ? `= ${formatCurrency(budgetMonth / DAYS_PER_MONTH)} per day`
                        : `= ${formatCurrency(budgetMonth)} per month`
                      : periodMode === "month"
                        ? `= ${formatINRCompact(targetDisbursalMonth / DAYS_PER_MONTH)} per day`
                        : `= ${formatINRCompact(targetDisbursalMonth)} per month`}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="ticket-size"
                    className={`block text-xs font-medium mb-2 ${mutedText}`}
                  >
                    Average ticket size per loan
                  </label>
                  <div
                    className={`flex items-center justify-between rounded-xl px-4 py-3 ${inputBg}`}
                  >
                    <span className={`text-sm font-mono ${mutedText}`}>₹</span>
                    <input
                      id="ticket-size"
                      type="text"
                      inputMode="numeric"
                      value={formatIN(ticketSize)}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, "");
                        setTicketSize(Math.max(0, Number(raw) || 0));
                      }}
                      className="w-full bg-transparent text-right font-mono font-bold text-base focus:outline-none"
                    />
                  </div>
                  <p className={`mt-1.5 text-xs ${mutedText}`}>
                    Amount of loan disbursed ÷ number of loans disbursed.
                  </p>
                </div>

                {channelMode === "both" && (
                  <div>
                    <label
                      htmlFor="channel-split"
                      className={`block text-xs font-medium mb-3 ${mutedText}`}
                    >
                      Budget split between channels
                    </label>
                    <input
                      id="channel-split"
                      type="range"
                      min={10}
                      max={90}
                      step={5}
                      value={googleSplit}
                      onChange={(e) => setGoogleSplit(Number(e.target.value))}
                      className="calc-slider w-full"
                      style={{ "--slider-pct": `${((googleSplit - 10) / 80) * 100}%` } as React.CSSProperties}
                    />
                    <div className="flex items-center justify-between text-xs font-bold mt-2">
                      <span>Google {googleSplit}%</span>
                      <span>Meta {100 - googleSplit}%</span>
                    </div>
                  </div>
                )}
              </section>

              {/* Channel Funnel Inputs */}
              <section
                className={`grid gap-4 ${
                  channelMode === "both"
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
            {(channelMode === "google" || channelMode === "both") && (
              <div className={`rounded-2xl border p-4 sm:p-5 space-y-3.5 ${cardBg}`}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80]" />
                  <h2 className="font-bold text-base">Google Ads</h2>
                </div>

                {[
                  {
                    id: "g-cpl",
                    label: "Cost per lead",
                    prefix: "₹",
                    value: google.cpl,
                    key: "cpl" as const,
                  },
                  {
                    id: "g-comp",
                    label: "Completed appl. % of leads",
                    suffix: "%",
                    value: google.completedPct,
                    key: "completedPct" as const,
                  },
                  {
                    id: "g-app",
                    label: "Approved % of leads",
                    suffix: "%",
                    value: google.approvedPct,
                    key: "approvedPct" as const,
                  },
                  {
                    id: "g-disb",
                    label: "Disbursed % of leads",
                    suffix: "%",
                    value: google.disbursedPct,
                    key: "disbursedPct" as const,
                  },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className={`block text-xs font-medium mb-1.5 ${mutedText}`}
                    >
                      {field.label}
                    </label>
                    <div
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 ${
                        field.key === "disbursedPct" &&
                        google.disbursedPct > google.approvedPct
                          ? "calc-input-box-error"
                          : inputBg
                      }`}
                    >
                      {field.prefix && (
                        <span className={`text-sm font-mono ${mutedText}`}>
                          {field.prefix}
                        </span>
                      )}
                      <input
                        id={field.id}
                        type="number"
                        min={0}
                        step={field.suffix === "%" ? 0.01 : 1}
                        value={field.value}
                        onChange={(e) =>
                          setGoogle((prev) => ({
                            ...prev,
                            [field.key]: Math.max(0, Number(e.target.value) || 0),
                          }))
                        }
                        className="w-full bg-transparent text-right font-mono font-bold text-sm focus:outline-none"
                      />
                      {field.suffix && (
                        <span className={`text-sm font-mono ml-2 ${mutedText}`}>
                          {field.suffix}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                <p className={`text-[11px] italic ${mutedText}`}>
                  Placeholder, replace with your last 30 to 90 days of CRM data.
                </p>
                {(google.disbursedPct > google.approvedPct ||
                  google.approvedPct > google.completedPct ||
                  google.completedPct > 100) && (
                  <p className="text-[11px] font-semibold text-red-400">
                    Check the funnel: disbursed ≤ approved ≤ completed ≤ 100%.
                  </p>
                )}
              </div>
            )}

            {(channelMode === "meta" || channelMode === "both") && (
              <div className={`rounded-2xl border p-4 sm:p-5 space-y-3.5 ${cardBg}`}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <h2 className="font-bold text-base">Meta Ads</h2>
                </div>

                {[
                  {
                    id: "m-cpl",
                    label: "Cost per lead",
                    prefix: "₹",
                    value: meta.cpl,
                    key: "cpl" as const,
                  },
                  {
                    id: "m-comp",
                    label: "Completed appl. % of leads",
                    suffix: "%",
                    value: meta.completedPct,
                    key: "completedPct" as const,
                  },
                  {
                    id: "m-app",
                    label: "Approved % of leads",
                    suffix: "%",
                    value: meta.approvedPct,
                    key: "approvedPct" as const,
                  },
                  {
                    id: "m-disb",
                    label: "Disbursed % of leads",
                    suffix: "%",
                    value: meta.disbursedPct,
                    key: "disbursedPct" as const,
                  },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className={`block text-xs font-medium mb-1.5 ${mutedText}`}
                    >
                      {field.label}
                    </label>
                    <div
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 ${
                        field.key === "disbursedPct" &&
                        meta.disbursedPct > meta.approvedPct
                          ? "calc-input-box-error"
                          : inputBg
                      }`}
                    >
                      {field.prefix && (
                        <span className={`text-sm font-mono ${mutedText}`}>
                          {field.prefix}
                        </span>
                      )}
                      <input
                        id={field.id}
                        type="number"
                        min={0}
                        step={field.suffix === "%" ? 0.01 : 1}
                        value={field.value}
                        onChange={(e) =>
                          setMeta((prev) => ({
                            ...prev,
                            [field.key]: Math.max(0, Number(e.target.value) || 0),
                          }))
                        }
                        className="w-full bg-transparent text-right font-mono font-bold text-sm focus:outline-none"
                      />
                      {field.suffix && (
                        <span className={`text-sm font-mono ml-2 ${mutedText}`}>
                          {field.suffix}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                <p className={`text-[11px] italic ${mutedText}`}>
                  Placeholder, replace with your last 30 to 90 days of CRM data.
                </p>
                {(meta.disbursedPct > meta.approvedPct ||
                  meta.approvedPct > meta.completedPct ||
                  meta.completedPct > 100) && (
                  <p className="text-[11px] font-semibold text-red-400">
                    Check the funnel: disbursed ≤ approved ≤ completed ≤ 100%.
                  </p>
                )}
              </div>
            )}
          </section>
          </div>

          {/* Right Column: Hero Output, Gauge, KPIs, Best Mix, Channel Comparison, Chart */}
          <div className="space-y-4">
          {/* Hero Output Card */}
          <section
            className="rounded-2xl border p-5 sm:p-6 bg-gradient-to-br from-card to-secondary/80 border-mint/25"
          >
            <p className={`text-xs sm:text-sm mb-1.5 ${mutedText}`}>
              {knowMode === "budget"
                ? `Disbursed per month on ${formatCurrency(totals.budgetDay)} a day`
                : `Required monthly ad budget for ${formatINRCompact(totals.amountDisbursedMonth)} disbursal`}
            </p>
            <div className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold font-mono text-[#4ade80] mb-2 leading-none">
              {knowMode === "budget"
                ? formatINRCompact(totals.amountDisbursedMonth)
                : formatINRCompact(totals.budgetMonth)}
            </div>
            <p className="text-xs sm:text-sm font-medium">
              {formatIN(Math.round(totals.loansDisbursed))} loans from{" "}
              {formatIN(Math.round(totals.leadsDay))} leads a day ·{" "}
              {formatCurrency(Math.round(totals.costPerDisbursedLoan))} per loan
            </p>
          </section>

          {/* Disbursement % Benchmark Gauge */}
          <section className={`rounded-2xl border p-4 sm:p-5 space-y-3.5 ${cardBg}`}>
            <p className={`text-xs sm:text-sm ${mutedText}`}>
              Disbursement % (ad spend × 100 ÷ amount disbursed)
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 font-mono font-bold text-base sm:text-lg ${inputBg}`}
              >
                <input
                  type="number"
                  min={1}
                  max={100}
                  step={0.1}
                  value={
                    totals.disbursementPct > 0
                      ? parseFloat(totals.disbursementPct.toFixed(2))
                      : ""
                  }
                  onChange={(e) => handleGaugeChange(Number(e.target.value))}
                  className="w-16 bg-transparent text-right font-mono font-bold text-base sm:text-lg focus:outline-none"
                />
                <span className={`text-xs sm:text-sm ${mutedText}`}>%</span>
              </div>

              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                  isAboveBenchmark
                    ? "border-red-500/40 bg-red-500/10 text-red-400"
                    : "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                }`}
              >
                {isAboveBenchmark
                  ? `Above ${benchmarks.disbursementPct}% benchmark`
                  : `Within ${benchmarks.disbursementPct}% benchmark`}
              </span>
            </div>

            <div className="relative flex items-center">
              <input
                type="range"
                min={1}
                max={20}
                step={0.1}
                value={Math.min(20, Math.max(1, totals.disbursementPct))}
                onChange={(e) => handleGaugeChange(Number(e.target.value))}
                aria-label="Disbursement % gauge"
                className="calc-gauge w-full"
                style={{
                  "--gauge-pct": `${Math.min(
                    100,
                    Math.max(
                      0,
                      ((Math.min(20, Math.max(1, totals.disbursementPct)) - 1) /
                        19) *
                        100
                    )
                  )}%`,
                  "--gauge-color": isAboveBenchmark ? "#ef4444" : "#4ade80",
                } as React.CSSProperties}
              />
              <div
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 w-0.5 h-3.5 bg-white/70 rounded-full"
                style={{
                  left: `${((benchmarks.disbursementPct - 1) / 19) * 100}%`,
                }}
              />
            </div>
          </section>

          {/* 6 KPI Stat Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                label: "Leads per day",
                value: formatIN(Math.round(totals.leadsDay)),
              },
              {
                label: "Loans per month",
                value: formatIN(Math.round(totals.loansDisbursed)),
              },
              {
                label: "Disbursed per day",
                value: formatINRCompact(totals.amountDisbursedDay),
              },
              {
                label: "Cost per disbursed loan",
                value: formatCurrency(Math.round(totals.costPerDisbursedLoan)),
              },
              {
                label: "Cost per qualified lead",
                value: formatCurrency(Math.round(totals.costPerQualifiedLead)),
              },
              {
                label: "Blended CPL",
                value: formatCurrency(totals.blendedCpl, 2),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-2xl border p-3.5 sm:p-4 ${cardBg}`}
              >
                <div className={`text-xs mb-1 ${mutedText}`}>{stat.label}</div>
                <div className="text-xl sm:text-2xl font-extrabold font-mono">
                  {stat.value}
                </div>
              </div>
            ))}
          </section>

          {/* Best Mix Optimization Banner */}
          {bestMix && (
            <section className="rounded-2xl border border-emerald-500/35 bg-emerald-500/5 p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm leading-relaxed">
                Best mix:{" "}
                <strong className="text-[#4ade80]">
                  Google {bestMix.googleSplit}% / Meta {bestMix.metaSplit}%
                </strong>
                , saves {formatCurrency(bestMix.savings)} per loan vs current
                split ({formatCurrency(Math.round(bestMix.bestCost))} instead of{" "}
                {formatCurrency(Math.round(totals.costPerDisbursedLoan))}).
              </p>
              <button
                type="button"
                onClick={() => setGoogleSplit(bestMix.googleSplit)}
                className={`shrink-0 px-4 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${cardBg} hover:border-emerald-400/60`}
              >
                Use this split
              </button>
            </section>
          )}

          {/* Channel Comparison Cards: Two separate cards side-by-side matching artifact */}
          {channelMode === "both" && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  key: "google" as const,
                  name: "Google Ads",
                  dot: "bg-[#4ade80]",
                  m: gMetrics,
                },
                {
                  key: "meta" as const,
                  name: "Meta Ads",
                  dot: "bg-blue-400",
                  m: mMetrics,
                },
              ].map((ch) => {
                const diff = Math.abs(
                  gMetrics.costPerDisbursedLoan - mMetrics.costPerDisbursedLoan
                );
                const isBest = lowerCostChannel === ch.key && diff > 5;
                return (
                  <div
                    key={ch.key}
                    className={`rounded-2xl border p-4 sm:p-5 space-y-2 ${cardBg} ${
                      isBest
                        ? "border-emerald-500/60 bg-emerald-500/5"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5 pb-1">
                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-0">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${ch.dot}`} />
                        <h3 className="font-bold text-sm sm:text-base whitespace-nowrap">{ch.name}</h3>
                      </div>
                      {isBest && (
                        <span className="shrink-0 whitespace-nowrap px-2 sm:px-2.5 py-0.5 rounded-full bg-[#4ade80] text-[#04101f] text-[10px] sm:text-[11px] font-bold">
                          Lower cost per loan
                        </span>
                      )}
                    </div>

                    {[
                      {
                        label: "CPL",
                        val: formatCurrency(
                          ch.m.effectiveCpl,
                          ch.m.effectiveCpl % 1 !== 0 ? 2 : 0
                        ),
                      },
                      {
                        label: "Cost per qualified lead",
                        val: formatCurrency(
                          Math.round(ch.m.costPerQualifiedLead)
                        ),
                      },
                      {
                        label: "Cost per disbursed loan",
                        val: formatCurrency(
                          Math.round(ch.m.costPerDisbursedLoan)
                        ),
                      },
                      {
                        label: "Loans",
                        val: formatIN(Math.round(ch.m.loansDisbursed)),
                      },
                      {
                        label: "Amount",
                        val: formatINRCompact(ch.m.amountDisbursedMonth),
                      },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between text-xs sm:text-sm"
                      >
                        <span className={mutedText}>{row.label}</span>
                        <span className="font-mono font-bold">{row.val}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </section>
          )}

          {/* Horizontal Grouped Bar Chart (directly on page background, no card box) */}
          <section className="pt-2 space-y-4">
            <div className="flex items-center gap-5 text-xs font-semibold">
              {(channelMode === "google" || channelMode === "both") && (
                <span className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80]" />
                  Google Ads
                </span>
              )}
              {(channelMode === "meta" || channelMode === "both") && (
                <span className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  Meta Ads
                </span>
              )}
            </div>

            <div className="space-y-3.5">
              {[
                {
                  stage: "Leads",
                  g: gMetrics.leadsMonth,
                  m: mMetrics.leadsMonth,
                },
                {
                  stage: "Completed",
                  g: gMetrics.completedApps,
                  m: mMetrics.completedApps,
                },
                {
                  stage: "Approved",
                  g: gMetrics.approvedLeads,
                  m: mMetrics.approvedLeads,
                },
                {
                  stage: "Disbursed",
                  g: gMetrics.loansDisbursed,
                  m: mMetrics.loansDisbursed,
                },
              ].map((row) => (
                <div
                  key={row.stage}
                  className="grid grid-cols-[80px_1fr] sm:grid-cols-[90px_1fr] items-center gap-3"
                >
                  <span className={`text-xs ${mutedText}`}>{row.stage}</span>
                  <div className="space-y-1.5">
                    {(channelMode === "google" || channelMode === "both") && (
                      <div
                        className="h-6 min-w-[52px] rounded-md bg-[#4ade80] text-[#04101f] text-xs font-mono font-bold flex items-center justify-end px-2.5 transition-all duration-300"
                        style={{
                          width: `${Math.max(8, (row.g / maxChartValue) * 100)}%`,
                        }}
                      >
                        {formatIN(Math.round(row.g))}
                      </div>
                    )}
                    {(channelMode === "meta" || channelMode === "both") && (
                      <div
                        className="h-6 min-w-[52px] rounded-md bg-blue-400 text-[#04101f] text-xs font-mono font-bold flex items-center justify-end px-2.5 transition-all duration-300"
                        style={{
                          width: `${Math.max(8, (row.m / maxChartValue) * 100)}%`,
                        }}
                      >
                        {formatIN(Math.round(row.m))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
          </div>
          </div>

          {/* Editable Benchmarks Card (Full Width) */}
          <section className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${cardBg}`}>
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base">Benchmarks</h2>
              <button
                type="button"
                onClick={() => {
                  setKnowMode("budget");
                  setChannelMode("both");
                  setPeriodMode("month");
                  setBudgetMonth(1500000);
                  setTicketSize(13419);
                  setGoogleSplit(50);
                  setGoogle(DEFAULT_GOOGLE);
                  setMeta(DEFAULT_META);
                  setBenchmarks(DEFAULT_BENCHMARKS);
                }}
                aria-label="Reset benchmarks"
                className="w-8 h-8 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[#4ade80] flex items-center justify-center hover:bg-emerald-500/20 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  id: "b-comp",
                  label: "Completed appl. % of leads",
                  val: benchmarks.completedPct,
                  key: "completedPct" as const,
                },
                {
                  id: "b-app",
                  label: "Approved % of leads",
                  val: benchmarks.approvedPct,
                  key: "approvedPct" as const,
                },
                {
                  id: "b-disb",
                  label: "Disbursed % of leads",
                  val: benchmarks.disbursedPct,
                  key: "disbursedPct" as const,
                },
                {
                  id: "b-cost",
                  label: "Disbursement % (ad cost)",
                  val: benchmarks.disbursementPct,
                  key: "disbursementPct" as const,
                },
              ].map((b) => (
                <div key={b.id}>
                  <label
                    htmlFor={b.id}
                    className={`block text-[11px] font-medium mb-1.5 ${mutedText}`}
                  >
                    {b.label}
                  </label>
                  <div
                    className={`flex items-center justify-between rounded-xl px-3 py-2 ${inputBg}`}
                  >
                    <input
                      id={b.id}
                      type="number"
                      min={1}
                      max={100}
                      value={b.val}
                      onChange={(e) =>
                        setBenchmarks((prev) => ({
                          ...prev,
                          [b.key]: Math.max(1, Number(e.target.value) || 1),
                        }))
                      }
                      className="w-full bg-transparent text-right font-mono font-bold text-sm focus:outline-none"
                    />
                    <span className={`text-xs font-mono ml-2 ${mutedText}`}>
                      %
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section (directly on page background, no card box) */}
          <section className="pt-4 space-y-5">
            <h2 className="text-lg font-bold">Summary</h2>

            <p className={`text-xs sm:text-sm leading-relaxed ${mutedText}`}>
              Spending{" "}
              <strong className="text-foreground">
                {formatCurrency(Math.round(totals.budgetDay))}
              </strong>{" "}
              a day ({formatINRCompact(totals.budgetMonth)} a month) disburses
              about{" "}
              <strong className="text-[#4ade80]">
                {formatINRCompact(totals.amountDisbursedMonth)}
              </strong>{" "}
              a month across{" "}
              <strong className="text-foreground">
                {formatIN(Math.round(totals.loansDisbursed))} loans
              </strong>{" "}
              at an average ticket of {formatCurrency(ticketSize)}.{" "}
              {channelMode === "both" &&
                `Split: Google ${effectiveGoogleSplit}% / Meta ${effectiveMetaSplit}%. `}
              Overall cost per disbursed loan is{" "}
              <strong className="text-foreground">
                {formatCurrency(Math.round(totals.costPerDisbursedLoan))}
              </strong>
              , disbursement %{" "}
              <strong
                className={
                  isAboveBenchmark ? "text-red-400" : "text-[#4ade80]"
                }
              >
                {totals.disbursementPct.toFixed(2)}%
              </strong>
              ,{" "}
              {isAboveBenchmark
                ? `above the ${benchmarks.disbursementPct}% benchmark by ${(
                    totals.disbursementPct - benchmarks.disbursementPct
                  ).toFixed(2)} points.`
                : `within the ${benchmarks.disbursementPct}% benchmark by ${(
                    benchmarks.disbursementPct - totals.disbursementPct
                  ).toFixed(2)} points.`}
            </p>

            {(channelMode === "google" || channelMode === "both") && (
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                  <span>Google Ads</span>
                  {lowerCostChannel === "google" &&
                    Math.abs(
                      gMetrics.costPerDisbursedLoan -
                        mMetrics.costPerDisbursedLoan
                    ) > 5 && (
                    <span className="shrink-0 whitespace-nowrap px-2 py-0.5 rounded-full bg-[#4ade80] text-[#04101f] text-[10px] font-bold">
                      Lower cost per loan
                    </span>
                  )}
                </div>
                <ul className={`space-y-1 pl-4 list-disc ${mutedText}`}>
                  <li>
                    <strong>Spend:</strong>{" "}
                    {formatCurrency(Math.round(gMetrics.budgetDay))} a day (
                    {formatINRCompact(gMetrics.budgetMonth)} a month) at{" "}
                    {formatCurrency(
                      gMetrics.effectiveCpl,
                      gMetrics.effectiveCpl % 1 !== 0 ? 2 : 0
                    )}{" "}
                    per lead, bringing{" "}
                    {formatIN(Math.round(gMetrics.leadsDay))} leads a day (
                    {formatIN(Math.round(gMetrics.leadsMonth))} a month).
                  </li>
                  <li>
                    <strong>Funnel:</strong>{" "}
                    {formatIN(Math.round(gMetrics.completedApps))} completed
                    applications ({google.completedPct}%),{" "}
                    {formatIN(Math.round(gMetrics.approvedLeads))} approved (
                    {google.approvedPct}%) and{" "}
                    {formatIN(Math.round(gMetrics.loansDisbursed))} loans
                    disbursed ({google.disbursedPct}% of leads) a month.
                  </li>
                  <li>
                    <strong>Cost:</strong>{" "}
                    {formatCurrency(Math.round(gMetrics.costPerQualifiedLead))}{" "}
                    per qualified lead and{" "}
                    {formatCurrency(Math.round(gMetrics.costPerDisbursedLoan))}{" "}
                    per disbursed loan.
                  </li>
                  <li>
                    <strong>Outcome:</strong>{" "}
                    {formatINRCompact(gMetrics.amountDisbursedMonth)} disbursed
                    a month ({formatINRCompact(gMetrics.amountDisbursedDay)} a
                    day).
                  </li>
                  <li>
                    <strong>Disbursement %:</strong>{" "}
                    {gMetrics.disbursementPct.toFixed(2)}%,{" "}
                    {gMetrics.disbursementPct <= benchmarks.disbursementPct
                      ? `within the ${benchmarks.disbursementPct}% benchmark by ${(
                          benchmarks.disbursementPct - gMetrics.disbursementPct
                        ).toFixed(2)} points.`
                      : `above the ${benchmarks.disbursementPct}% benchmark by ${(
                          gMetrics.disbursementPct - benchmarks.disbursementPct
                        ).toFixed(2)} points.`}
                  </li>
                  <li>
                    <strong>
                      {gMetrics.disbursementPct <= benchmarks.disbursementPct
                        ? "Headroom:"
                        : `To reach ${benchmarks.disbursementPct}%:`}
                    </strong>{" "}
                    cost per lead{" "}
                    {gMetrics.disbursementPct <= benchmarks.disbursementPct
                      ? `can rise to ${formatCurrency(gMaxCpl, 2)} (now ${formatCurrency(
                          gMetrics.effectiveCpl,
                          gMetrics.effectiveCpl % 1 !== 0 ? 2 : 0
                        )}), or disbursed % of leads can fall to ${gMinDisbPct.toFixed(2)}% (now ${google.disbursedPct}%), before crossing ${benchmarks.disbursementPct}%.`
                      : `needs to be ${formatCurrency(gMaxCpl, 2)} (now ${formatCurrency(
                          gMetrics.effectiveCpl,
                          gMetrics.effectiveCpl % 1 !== 0 ? 2 : 0
                        )}), or lift disbursed % of leads to ${gMinDisbPct.toFixed(2)}% (now ${google.disbursedPct}%).`}
                  </li>
                </ul>
              </div>
            )}

            {(channelMode === "meta" || channelMode === "both") && (
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Meta Ads</span>
                  {lowerCostChannel === "meta" &&
                    Math.abs(
                      gMetrics.costPerDisbursedLoan -
                        mMetrics.costPerDisbursedLoan
                    ) > 5 && (
                    <span className="shrink-0 whitespace-nowrap px-2 py-0.5 rounded-full bg-[#4ade80] text-[#04101f] text-[10px] font-bold">
                      Lower cost per loan
                    </span>
                  )}
                </div>
                <ul className={`space-y-1 pl-4 list-disc ${mutedText}`}>
                  <li>
                    <strong>Spend:</strong>{" "}
                    {formatCurrency(Math.round(mMetrics.budgetDay))} a day (
                    {formatINRCompact(mMetrics.budgetMonth)} a month) at{" "}
                    {formatCurrency(
                      mMetrics.effectiveCpl,
                      mMetrics.effectiveCpl % 1 !== 0 ? 2 : 0
                    )}{" "}
                    per lead, bringing{" "}
                    {formatIN(Math.round(mMetrics.leadsDay))} leads a day (
                    {formatIN(Math.round(mMetrics.leadsMonth))} a month).
                  </li>
                  <li>
                    <strong>Funnel:</strong>{" "}
                    {formatIN(Math.round(mMetrics.completedApps))} completed
                    applications ({meta.completedPct}%),{" "}
                    {formatIN(Math.round(mMetrics.approvedLeads))} approved (
                    {meta.approvedPct}%) and{" "}
                    {formatIN(Math.round(mMetrics.loansDisbursed))} loans
                    disbursed ({meta.disbursedPct}% of leads) a month.
                  </li>
                  <li>
                    <strong>Cost:</strong>{" "}
                    {formatCurrency(Math.round(mMetrics.costPerQualifiedLead))}{" "}
                    per qualified lead and{" "}
                    {formatCurrency(Math.round(mMetrics.costPerDisbursedLoan))}{" "}
                    per disbursed loan.
                  </li>
                  <li>
                    <strong>Outcome:</strong>{" "}
                    {formatINRCompact(mMetrics.amountDisbursedMonth)} disbursed
                    a month ({formatINRCompact(mMetrics.amountDisbursedDay)} a
                    day).
                  </li>
                  <li>
                    <strong>Disbursement %:</strong>{" "}
                    {mMetrics.disbursementPct.toFixed(2)}%,{" "}
                    {mMetrics.disbursementPct <= benchmarks.disbursementPct
                      ? `within the ${benchmarks.disbursementPct}% benchmark by ${(
                          benchmarks.disbursementPct - mMetrics.disbursementPct
                        ).toFixed(2)} points.`
                      : `above the ${benchmarks.disbursementPct}% benchmark by ${(
                          mMetrics.disbursementPct - benchmarks.disbursementPct
                        ).toFixed(2)} points.`}
                  </li>
                  <li>
                    <strong>
                      {mMetrics.disbursementPct <= benchmarks.disbursementPct
                        ? "Headroom:"
                        : `To reach ${benchmarks.disbursementPct}%:`}
                    </strong>{" "}
                    {mMetrics.disbursementPct <= benchmarks.disbursementPct
                      ? `cost per lead can rise to ${formatCurrency(
                          mMaxCpl,
                          2
                        )} (now ${formatCurrency(
                          mMetrics.effectiveCpl,
                          mMetrics.effectiveCpl % 1 !== 0 ? 2 : 0
                        )}), or disbursed % of leads can fall to ${mMinDisbPct.toFixed(
                          2
                        )}% (now ${meta.disbursedPct}%), before crossing ${
                          benchmarks.disbursementPct
                        }%.`
                      : `bring cost per lead down to ${formatCurrency(
                          mMaxCpl,
                          2
                        )} (now ${formatCurrency(
                          mMetrics.effectiveCpl,
                          mMetrics.effectiveCpl % 1 !== 0 ? 2 : 0
                        )}), or lift disbursed % of leads to ${mMinDisbPct.toFixed(
                          2
                        )}% (now ${meta.disbursedPct}%), or raise the average ticket to ${formatCurrency(
                          Math.round(mTargetTicket)
                        )} (now ${formatCurrency(ticketSize)}).`}
                  </li>
                </ul>
              </div>
            )}
          </section>

          {/* Monthly Breakdown Table (directly on page background, no card box) */}
          <section className="pt-4">
            <h2 className="text-lg font-bold mb-4">Monthly breakdown</h2>
            <div
              tabIndex={0}
              role="region"
              aria-label="Monthly breakdown table"
              className="overflow-x-auto"
            >
              <table className="w-full min-w-[540px] text-xs sm:text-sm">
                <thead>
                  <tr
                    className="border-b border-border"
                  >
                    <th className={`py-3 text-left font-medium ${mutedText}`}>
                      Metric
                    </th>
                    {(channelMode === "google" || channelMode === "both") && (
                      <th className={`py-3 text-right font-medium ${mutedText}`}>
                        Google Ads
                      </th>
                    )}
                    {(channelMode === "meta" || channelMode === "both") && (
                      <th className={`py-3 text-right font-medium ${mutedText}`}>
                        Meta Ads
                      </th>
                    )}
                    <th className="py-3 text-right font-bold">Total</th>
                  </tr>
                </thead>
                <tbody
                  className="divide-y divide-border/70"
                >
                  {[
                    {
                      label: "Ad budget per day",
                      g: formatCurrency(Math.round(gMetrics.budgetDay)),
                      m: formatCurrency(Math.round(mMetrics.budgetDay)),
                      t: formatCurrency(Math.round(totals.budgetDay)),
                    },
                    {
                      label: "Ad budget per month",
                      g: formatCurrency(Math.round(gMetrics.budgetMonth)),
                      m: formatCurrency(Math.round(mMetrics.budgetMonth)),
                      t: formatCurrency(Math.round(totals.budgetMonth)),
                    },
                    {
                      label: "Cost per lead (effective)",
                      g: formatCurrency(
                        gMetrics.effectiveCpl,
                        gMetrics.effectiveCpl % 1 !== 0 ? 2 : 0
                      ),
                      m: formatCurrency(
                        mMetrics.effectiveCpl,
                        mMetrics.effectiveCpl % 1 !== 0 ? 2 : 0
                      ),
                      t: `Blended CPL ${formatCurrency(totals.blendedCpl, 2)}`,
                    },
                    {
                      label: "Leads per day (lead required)",
                      g: formatIN(Math.round(gMetrics.leadsDay)),
                      m: formatIN(Math.round(mMetrics.leadsDay)),
                      t: formatIN(Math.round(totals.leadsDay)),
                    },
                    {
                      label: "Leads per month",
                      g: formatIN(Math.round(gMetrics.leadsMonth)),
                      m: formatIN(Math.round(mMetrics.leadsMonth)),
                      t: formatIN(Math.round(totals.leadsMonth)),
                    },
                    {
                      label: "Completed applications",
                      g: formatIN(Math.round(gMetrics.completedApps)),
                      m: formatIN(Math.round(mMetrics.completedApps)),
                      t: formatIN(Math.round(totals.completedApps)),
                    },
                    {
                      label: "Approved",
                      g: formatIN(Math.round(gMetrics.approvedLeads)),
                      m: formatIN(Math.round(mMetrics.approvedLeads)),
                      t: formatIN(Math.round(totals.approvedLeads)),
                    },
                    {
                      label: "Cost per qualified lead (approved)",
                      g: formatCurrency(
                        Math.round(gMetrics.costPerQualifiedLead)
                      ),
                      m: formatCurrency(
                        Math.round(mMetrics.costPerQualifiedLead)
                      ),
                      t: formatCurrency(
                        Math.round(totals.costPerQualifiedLead)
                      ),
                    },
                    {
                      label: "Loans disbursed",
                      g: formatIN(Math.round(gMetrics.loansDisbursed)),
                      m: formatIN(Math.round(mMetrics.loansDisbursed)),
                      t: formatIN(Math.round(totals.loansDisbursed)),
                    },
                    {
                      label: "Cost per disbursed loan",
                      g: formatCurrency(
                        Math.round(gMetrics.costPerDisbursedLoan)
                      ),
                      m: formatCurrency(
                        Math.round(mMetrics.costPerDisbursedLoan)
                      ),
                      t: formatCurrency(
                        Math.round(totals.costPerDisbursedLoan)
                      ),
                      highlightWinner: true,
                    },
                    {
                      label: "Amount disbursed per day",
                      g: formatINRCompact(gMetrics.amountDisbursedDay),
                      m: formatINRCompact(mMetrics.amountDisbursedDay),
                      t: formatINRCompact(totals.amountDisbursedDay),
                    },
                    {
                      label: "Amount disbursed per month",
                      g: formatINRCompact(gMetrics.amountDisbursedMonth),
                      m: formatINRCompact(mMetrics.amountDisbursedMonth),
                      t: formatINRCompact(totals.amountDisbursedMonth),
                    },
                    {
                      label: "Disbursement % (ad cost)",
                      g: `${gMetrics.disbursementPct.toFixed(
                        gMetrics.disbursementPct % 1 === 0 ? 0 : 2
                      )}%`,
                      m: `${mMetrics.disbursementPct.toFixed(
                        mMetrics.disbursementPct % 1 === 0 ? 0 : 2
                      )}%`,
                      t: `${totals.disbursementPct.toFixed(
                        totals.disbursementPct % 1 === 0 ? 0 : 2
                      )}%`,
                    },
                  ].map((row) => (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className={`py-3 text-left font-normal ${mutedText}`}
                      >
                        {row.label}
                      </th>
                      {(channelMode === "google" || channelMode === "both") && (
                        <td
                          className={`py-3 text-right font-mono ${
                            row.highlightWinner && lowerCostChannel === "google"
                              ? "text-[#4ade80] font-bold"
                              : ""
                          }`}
                        >
                          {row.g}
                        </td>
                      )}
                      {(channelMode === "meta" || channelMode === "both") && (
                        <td
                          className={`py-3 text-right font-mono ${
                            row.highlightWinner && lowerCostChannel === "meta"
                              ? "text-[#4ade80] font-bold"
                              : ""
                          }`}
                        >
                          {row.m}
                        </td>
                      )}
                      <td className="py-3 text-right font-mono font-bold">
                        {row.t}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Bottom CTA Card */}
          <section
            className="rounded-2xl border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-br from-card to-secondary/80 border-mint/25"
          >
            <div>
              <h2 className="text-lg sm:text-xl font-bold mb-1">
                Ready to scale your loan disbursals?
              </h2>
              <p className={`text-xs sm:text-sm ${mutedText}`}>
                Talk to us about hitting these numbers for your lending
                business.
              </p>
            </div>
            <Link
              href="/contact"
              className="cta-glow inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#4ade80] text-[#04101f] font-bold text-sm hover:bg-emerald-300 transition-colors shrink-0"
            >
              Book a Call
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </section>

          {/* Disclaimer */}
          <section
            className="pt-6 border-t border-border"
          >
            <h3 className="text-xs font-bold mb-2">Disclaimer</h3>
            <p className={`text-xs leading-relaxed ${mutedText}`}>
              All figures are illustrative estimates based on the inputs and
              assumptions entered, not forecasts or guarantees. Actual leads,
              costs, approvals and disbursals may vary due to ad-platform
              auctions, market conditions and other factors. Loan approval and
              disbursal are solely at the lender&apos;s discretion, subject to
              its credit policy and RBI regulations. This is not financial,
              legal or credit advice, and no liability is accepted for decisions
              made using it. Google and Meta are trademarks of their respective
              owners.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

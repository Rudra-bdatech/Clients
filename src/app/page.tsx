import Link from "next/link";
import {
  ArrowRight,
  Bot,
  ChartColumn,
  ChartLine,
  CircleCheckBig,
  CircleX,
  Database,
  Filter,
  Percent,
  RefreshCw,
  Rocket,
  Search,
  Shield,
  ShieldX,
  Target,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  UserX,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";
import { ComparisonTable } from "@/components/ComparisonTable";
import { SpotlightCard } from "@/components/SpotlightCard";

const comparisonRows = [
  {
    metric: "Primary KPI",
    agency: "Likes & Clicks",
    affiliate: "Bulk Volume",
    inHouse: "Stability",
    clients: "Disbursals",
  },
  {
    metric: "Data Control",
    agency: "Murky",
    affiliate: "Zero (Black Box)",
    inHouse: "High",
    clients: "100% Yours",
  },
  {
    metric: "Lead Quality",
    agency: "Low Intent",
    affiliate: "Mixed/Fraud Risk",
    inHouse: "Good",
    clients: "High Intent",
  },
  {
    metric: "Tech Stack",
    agency: "Basic Tools",
    affiliate: "None",
    inHouse: "Expensive to Build",
    clients: "AI Included",
  },
  {
    metric: "The Result",
    agency: '"Brand Awareness"',
    affiliate: '"Cheap Leads"',
    inHouse: '"Slow Growth"',
    clients: '"Loan Book Scale"',
    highlighted: true,
  },
];

const matrixPattern = [
  true, false, false, true,
  false, false, true, false,
  false, true, false, false,
  true, false, false, true,
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-clip">
      <main className="flex-1">
        {/* Section 1 — Hero */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-12 pb-20 overflow-hidden bg-background">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/4 left-1/4 w-96 h-96 bg-mint/5 rounded-full blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1/4 right-1/4 w-96 h-96 bg-mint/5 rounded-full blur-3xl"
          />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="mb-6 animate-fade-up">
              <span className="text-2xl font-extrabold tracking-tight text-foreground">
                CLIENTS<span className="text-mint">.</span>
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground leading-[1.05] mb-5 animate-fade-up-delay-1">
              We Scale Your
              <span className="block text-gradient">Loan Disbursals.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-up-delay-2">
              India&apos;s first Growth Partner dedicated to Lending &amp; NBFCs.
              Performance Marketing + AI Automation = High-intent borrowers.
            </p>

            <div className="flex flex-col items-center gap-4 animate-fade-up-delay-3">
              <Link
                href="/contact"
                className="cta-glow group inline-flex items-center justify-center gap-2 whitespace-nowrap bg-mint text-primary-foreground hover:bg-mint/90 font-bold h-14 rounded-xl px-10 text-base transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
              >
                Partner With Us
                <ArrowRight
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <p className="text-sm font-medium text-mint">
                Accepting <span className="font-mono font-bold">2</span> new
                Partners this quarter.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground animate-fade-up-delay-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-mint" aria-hidden="true" />
                <span className="text-sm font-mono">
                  <CountUp target={50} prefix="₹" suffix="Cr+" /> Disbursed
                </span>
              </div>
              <div aria-hidden="true" className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-mint" aria-hidden="true" />
                <span className="text-sm font-mono">
                  <CountUp target={3} suffix="x" /> Scale Efficiency
                </span>
              </div>
              <div aria-hidden="true" className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-mint" aria-hidden="true" />
                <span className="text-sm font-mono">
                  <CountUp target={100} suffix="%" /> Data Yours
                </span>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center"
          >
            <div className="w-6 h-10 border border-border rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-mint rounded-full animate-scroll-bounce" />
            </div>
          </div>
        </section>

        {/* Section 2 — The Problem */}
        <section className="py-24 px-6 bg-card">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <ScrollReveal delayMs={0}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-6">
                  <TriangleAlert
                    className="w-4 h-4 text-destructive"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-destructive">
                    The Problem
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delayMs={80}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
                  Likes Don&apos;t Pay The Bills
                  <span className="text-mint">.</span> Disbursals Do
                  <span className="text-mint">.</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delayMs={160}>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Most agencies celebrate &ldquo;Reach&rdquo; and
                  &ldquo;Impressions.&rdquo; We think that&apos;s garbage. As a
                  Fintech founder in India, you have three real problems:
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <ScrollReveal delayMs={0}>
                <SpotlightCard
                  spotlightColor="rgba(239, 68, 68, 0.12)"
                  className="h-full p-6 bg-secondary/50 backdrop-blur-sm rounded-xl border border-destructive/20 hover:border-destructive/40 transition-all duration-500"
                >
                  <div className="relative z-10">
                    <div className="mb-6">
                      <span className="text-3xl font-mono font-bold text-destructive">
                        <CountUp target={3.2} decimals={1} prefix="₹" suffix="K" />
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        Avg. CPA
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                      <TrendingDown
                        className="w-5 h-5 text-destructive"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      High CAC
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your acquisition cost is eating your margins.
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>

              <ScrollReveal delayMs={100}>
                <SpotlightCard
                  spotlightColor="rgba(239, 68, 68, 0.12)"
                  className="h-full p-6 bg-secondary/50 backdrop-blur-sm rounded-xl border border-destructive/20 hover:border-destructive/40 transition-all duration-500"
                >
                  <div className="relative z-10">
                    <div className="mb-6">
                      <span className="text-3xl font-mono font-bold text-destructive">
                        <CountUp target={85} suffix="%" />
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        Drop-off
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                      <ShieldX
                        className="w-5 h-5 text-destructive"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Low Trust
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Getting Indian users to complete KYC is a battlefield.
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>

              <ScrollReveal delayMs={200}>
                <SpotlightCard
                  spotlightColor="rgba(239, 68, 68, 0.12)"
                  className="h-full p-6 bg-secondary/50 backdrop-blur-sm rounded-xl border border-destructive/20 hover:border-destructive/40 transition-all duration-500"
                >
                  <div className="relative z-10">
                    <div className="mb-6">
                      <span className="text-3xl font-mono font-bold text-destructive">
                        <CountUp target={12} suffix="%" />
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        Conv. Rate
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                      <UserX
                        className="w-5 h-5 text-destructive"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Retention
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Acquiring a user is easy; getting them to transact is
                      hard.
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            </div>

            <ScrollReveal delayMs={250}>
              <div className="text-center p-8 rounded-xl glass">
                <p className="text-lg text-muted-foreground font-medium">
                  We don&apos;t sell &ldquo;Digital Marketing.&rdquo;
                  <span className="block text-mint font-bold text-xl">
                    We sell a predictable pipeline of qualified users.
                  </span>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Section 3 — Results vs. Leads */}
        <section className="relative py-24 px-6 bg-background overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-mint/5 rounded-full blur-3xl"
          />
          <div className="relative max-w-6xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Stop Paying For &ldquo;Leads.&rdquo;
                <span className="block text-gradient">
                  Start Paying For Results.
                </span>
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ScrollReveal delayMs={0}>
                <SpotlightCard
                  spotlightColor="rgba(239, 68, 68, 0.1)"
                  className="h-full p-6 rounded-xl transition-all duration-500 hover:-translate-y-1 bg-card border border-border hover:border-border/50"
                >
                  <div className="relative z-10">
                    <div className="mb-6">
                      <span className="text-4xl font-mono font-bold text-destructive/80">
                        <CountUp target={90} suffix="%" />
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        Time Wasted
                      </span>
                    </div>
                    <div className="mb-4 text-destructive/80">
                      <CircleX className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      High Rejection Rates
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Most agencies send you &ldquo;junk leads&rdquo; with low
                      CIBIL scores. Your call center wastes 90% of their day
                      filtering bad applications.
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>

              <ScrollReveal delayMs={100}>
                <SpotlightCard
                  spotlightColor="rgba(239, 68, 68, 0.1)"
                  className="h-full p-6 rounded-xl transition-all duration-500 hover:-translate-y-1 bg-card border border-border hover:border-border/50"
                >
                  <div className="relative z-10">
                    <div className="mb-6">
                      <span className="text-4xl font-mono font-bold text-destructive/80">
                        <CountUp target={0} suffix="%" />
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        Visibility
                      </span>
                    </div>
                    <div className="mb-4 text-destructive/80">
                      <CircleX className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      The Affiliate Black Box
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      You don&apos;t know where the user came from. Leads are
                      often shared with your competitors, driving up your CAC.
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>

              <ScrollReveal delayMs={200}>
                <SpotlightCard className="h-full p-6 rounded-xl transition-all duration-500 hover:-translate-y-1 bg-mint/5 border border-mint/30 hover:border-mint/50">
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="mb-6">
                        <span className="text-4xl font-mono font-bold text-mint">
                          <CountUp target={3} suffix="x" />
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">
                          Efficiency
                        </span>
                      </div>
                      <div className="mb-4 text-mint">
                        <CircleCheckBig
                          className="w-6 h-6"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Predictable Disbursals
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        We target creditworthy users who pass your policy
                        checks. We use AI to qualify them before they hit your
                        CRM.
                      </p>
                    </div>
                    <Link
                      href="/about"
                      className="mt-6 flex items-center gap-2 text-mint text-sm font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint rounded-sm w-fit"
                    >
                      <span>Our Approach</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Section 4 — Comparison Table */}
        <section className="py-24 px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <h2
                id="comparison-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4"
              >
                Choose Your Growth Engine
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Why Fintech Leaders Partner With Us Instead of Hiring Agencies.
              </p>
            </ScrollReveal>

            <ComparisonTable rows={comparisonRows} />

            <ScrollReveal delayMs={250} className="mt-12 text-center">
              <p className="text-lg text-muted-foreground">
                Want Likes?{" "}
                <span className="text-foreground font-medium">
                  Hire an Agency.
                </span>{" "}
                Want Disbursals?{" "}
                <span className="text-mint font-bold">Partner with Us.</span>
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Section 5 — The Clients.co.in Difference & Metrics */}
        <section className="relative py-24 px-6 bg-card">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal className="mb-16">
              <div className="glass-strong rounded-xl p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-destructive/10 flex items-center justify-center">
                      <TriangleAlert
                        className="w-8 h-8 text-destructive"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      The Problem with Generalist Agencies
                    </h3>
                    <p className="text-muted-foreground">
                      They target &ldquo;everyone.&rdquo; You get{" "}
                      <span className="text-foreground font-mono font-semibold">
                        1,000 leads
                      </span>
                      , but{" "}
                      <span className="text-destructive font-semibold">
                        900 have a CIBIL score below 600
                      </span>
                      . Your tele-calling team burns out, and your Cost Per
                      Disbursal skyrockets.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="text-center mb-12">
              <ScrollReveal delayMs={0}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  The Clients.co.in Difference
                </h2>
              </ScrollReveal>
              <ScrollReveal delayMs={80}>
                <p className="text-xl text-mint font-semibold font-mono">
                  We understand the Credit Policy.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              <ScrollReveal delayMs={0}>
                <SpotlightCard className="group h-full p-8 bg-secondary/50 rounded-xl border border-border hover:border-mint/30 transition-all duration-500">
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                    <ChartColumn
                      aria-hidden="true"
                      className="w-24 h-24 text-mint"
                      strokeWidth={1}
                    />
                  </div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-mint/10 mb-4">
                      <Filter
                        className="w-6 h-6 text-mint"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      Neeraj&apos;s Ad Tech
                    </h3>
                    <p className="text-sm text-mint font-mono mb-4">
                      PRECISION TARGETING
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      We use advanced exclusion lists to filter out low-intent
                      audiences on Google &amp; Meta
                      <span className="text-foreground font-medium">
                        {" "}
                        before they even click
                      </span>
                      .
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>

              <ScrollReveal delayMs={100}>
                <SpotlightCard className="h-full p-8 bg-secondary/50 rounded-xl border border-border hover:border-mint/30 transition-all duration-500">
                  <div
                    aria-hidden="true"
                    className="absolute top-4 right-4 opacity-20 pointer-events-none"
                  >
                    <div className="grid grid-cols-4 gap-1">
                      {matrixPattern.map((bright, idx) => (
                        <div
                          key={idx}
                          className={`w-3 h-3 rounded-sm ${
                            bright ? "bg-mint" : "bg-mint/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-mint/10 mb-4">
                      <Bot className="w-6 h-6 text-mint" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      Ambesh&apos;s AI Ops
                    </h3>
                    <p className="text-sm text-mint font-mono mb-4">
                      PRE-QUALIFICATION
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      We set up pre-qualification bots that ask the hard
                      questions
                      <span className="text-foreground font-medium">
                        {" "}
                        (Salary, Employment Type){" "}
                      </span>
                      before the lead hits your CRM.
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            </div>

            <ScrollReveal className="mb-16">
              <div className="text-center p-6 rounded-xl border border-mint/20 bg-mint/5">
                <p className="text-xl md:text-2xl font-semibold text-foreground">
                  The Result: Your team talks to{" "}
                  <span className="text-mint font-mono">fewer people</span>, but
                  closes <span className="text-mint font-mono">more loans</span>.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-4">
              <ScrollReveal delayMs={0}>
                <SpotlightCard className="text-center p-8 rounded-xl bg-secondary/30 border border-border hover:border-mint/20 transition-all duration-500">
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-mint/10 mb-4">
                      <TrendingUp
                        className="w-6 h-6 text-mint"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="text-4xl md:text-5xl font-mono font-bold text-foreground mb-2">
                      <CountUp target={50} prefix="₹" suffix="Cr+" />
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-1">
                      Disbursal Volume
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Last quarter
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>

              <ScrollReveal delayMs={100}>
                <SpotlightCard className="text-center p-8 rounded-xl bg-secondary/30 border border-border hover:border-mint/20 transition-all duration-500">
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-mint/10 mb-4">
                      <Percent
                        className="w-6 h-6 text-mint"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="text-4xl md:text-5xl font-mono font-bold text-foreground mb-2">
                      <CountUp target={40} suffix="%" />
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-1">
                      Approval Rate Lift
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Lead-to-login ratio
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>

              <ScrollReveal delayMs={200}>
                <SpotlightCard className="text-center p-8 rounded-xl bg-secondary/30 border border-border hover:border-mint/20 transition-all duration-500">
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-mint/10 mb-4">
                      <Zap className="w-6 h-6 text-mint" aria-hidden="true" />
                    </div>
                    <div className="text-4xl md:text-5xl font-mono font-bold text-foreground mb-2">
                      <CountUp target={3} suffix="x" />
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-1">
                      Scale Efficiency
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Stable CPL at scale
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Section 6 — How We Engineer Your Growth */}
        <section className="py-24 px-6 bg-background relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-mint/5 rounded-full blur-3xl"
          />
          <div className="relative max-w-6xl mx-auto">
            <div className="max-w-2xl mb-16">
              <ScrollReveal delayMs={0}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
                  How We Engineer
                  <br />
                  <span className="text-gradient">Your Growth</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delayMs={80}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We don&apos;t just run ads. We build a Customer Acquisition
                  Infrastructure inside your business.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <ScrollReveal delayMs={0}>
                <div className="group relative overflow-hidden h-full p-8 bg-card rounded-xl border border-border hover:border-mint/30 transition-all duration-500">
                  <div className="absolute top-4 right-4">
                    <span
                      aria-hidden="true"
                      className="text-4xl font-mono font-bold text-mint/20 group-hover:text-mint/40 transition-colors duration-500 select-none"
                    >
                      01
                    </span>
                  </div>
                  <div className="mb-6 p-3 w-fit rounded-lg bg-mint/10 text-mint group-hover:bg-mint group-hover:text-primary-foreground transition-colors duration-500">
                    <Target className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    Precision Targeting
                  </h3>
                  <p className="text-sm font-mono text-mint mb-4">
                    The Neeraj Edge
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    We stop targeting &ldquo;everyone.&rdquo; Using 8+ years of
                    data, we identify high-intent audiences on Google &amp; Meta
                    who are searching for credit right now.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delayMs={100}>
                <div className="group relative overflow-hidden h-full p-8 bg-card rounded-xl border border-border hover:border-mint/30 transition-all duration-500">
                  <div className="absolute top-4 right-4">
                    <span
                      aria-hidden="true"
                      className="text-4xl font-mono font-bold text-mint/20 group-hover:text-mint/40 transition-colors duration-500 select-none"
                    >
                      02
                    </span>
                  </div>
                  <div className="mb-6 p-3 w-fit rounded-lg bg-mint/10 text-mint group-hover:bg-mint group-hover:text-primary-foreground transition-colors duration-500">
                    <Bot className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    AI Pre-Qualification
                  </h3>
                  <p className="text-sm font-mono text-mint mb-4">
                    The Ambesh Edge
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Clicks are cheap; Operations are expensive. We deploy AI
                    automation to nurture leads via WhatsApp and Email before
                    your sales team picks up.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delayMs={200}>
                <div className="group relative overflow-hidden h-full p-8 bg-card rounded-xl border border-border hover:border-mint/30 transition-all duration-500">
                  <div className="absolute top-4 right-4">
                    <span
                      aria-hidden="true"
                      className="text-4xl font-mono font-bold text-mint/20 group-hover:text-mint/40 transition-colors duration-500 select-none"
                    >
                      03
                    </span>
                  </div>
                  <div className="mb-6 p-3 w-fit rounded-lg bg-mint/10 text-mint group-hover:bg-mint group-hover:text-primary-foreground transition-colors duration-500">
                    <RefreshCw className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    The Feedback Loop
                  </h3>
                  <p className="text-sm font-mono text-mint mb-4">
                    Continuous Optimization
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    We integrate with your CRM. We optimize our ads based on who
                    actually took the loan, not just who applied.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delayMs={300}>
              <div className="mt-16 p-8 rounded-xl glass-strong">
                <div className="flex items-center justify-between flex-wrap gap-8">
                  <div className="flex items-center gap-4">
                    <div>
                      <Database
                        className="w-8 h-8 text-mint/60"
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="w-16 h-px bg-gradient-to-r from-mint/60 to-mint/20"
                    />
                    <div>
                      <Workflow
                        className="w-8 h-8 text-mint/80"
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="w-16 h-px bg-gradient-to-r from-mint/60 to-mint/20"
                    />
                    <div>
                      <ChartLine
                        className="w-8 h-8 text-mint"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm font-mono">
                    Data → Processing → Insights →{" "}
                    <span className="text-mint font-semibold">Disbursals</span>
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Section 7 — How We Scale You. */}
        <section className="py-24 px-6 bg-card">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                How We Scale You<span className="text-mint">.</span>
              </h2>
            </ScrollReveal>

            <div className="relative">
              <div
                aria-hidden="true"
                className="hidden md:block absolute top-20 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-mint/20 via-mint to-mint/20 origin-left"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ScrollReveal
                  delayMs={0}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="relative z-10 w-16 h-16 rounded-full bg-secondary border border-mint/30 flex items-center justify-center mb-6 group-hover:border-mint group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] transition-all duration-500">
                    <span className="text-xl font-mono font-bold text-mint">
                      01
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                    <Search
                      className="w-6 h-6 text-mint"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    The Audit
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xs text-sm">
                    We tear down your current funnel to find the leaks.
                  </p>
                </ScrollReveal>

                <ScrollReveal
                  delayMs={150}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="relative z-10 w-16 h-16 rounded-full bg-secondary border border-mint/30 flex items-center justify-center mb-6 group-hover:border-mint group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] transition-all duration-500">
                    <span className="text-xl font-mono font-bold text-mint">
                      02
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                    <Wrench
                      className="w-6 h-6 text-mint"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    The Fix
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xs text-sm">
                    We implement AI tracking and creative strategy.
                  </p>
                </ScrollReveal>

                <ScrollReveal
                  delayMs={300}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="relative z-10 w-16 h-16 rounded-full bg-secondary border border-mint/30 flex items-center justify-center mb-6 group-hover:border-mint group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] transition-all duration-500">
                    <span className="text-xl font-mono font-bold text-mint">
                      03
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                    <Rocket
                      className="w-6 h-6 text-mint"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    The Scale
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xs text-sm">
                    We launch campaigns and optimize for ROAS, not clicks.
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8 — Built By Experts. */}
        <section className="py-24 px-6 bg-background">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Built By Experts<span className="text-mint">.</span>
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollReveal delayMs={0}>
                <SpotlightCard className="h-full p-8 bg-card rounded-xl border border-border hover:border-mint/30 transition-all duration-500">
                  <div
                    aria-hidden="true"
                    className="absolute top-6 right-8 text-6xl font-serif text-mint/10 select-none leading-none"
                  >
                    &rdquo;
                  </div>
                  <div className="relative z-10 flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-secondary border border-border flex items-center justify-center">
                      <span className="text-lg font-mono font-bold text-mint">
                        NK
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground">
                        Neeraj Kumar
                      </h3>
                      <p className="text-sm font-mono text-mint">
                        Performance Lead
                      </p>
                    </div>
                  </div>
                  <blockquote className="relative z-10 mt-6 text-muted-foreground leading-relaxed text-sm">
                    &ldquo;I&apos;ve spent the last decade staring at ad
                    managers. I know exactly which creative works for a Tier-1
                    investor versus a Tier-3 borrower.&rdquo;
                  </blockquote>
                </SpotlightCard>
              </ScrollReveal>

              <ScrollReveal delayMs={150}>
                <SpotlightCard className="h-full p-8 bg-card rounded-xl border border-border hover:border-mint/30 transition-all duration-500">
                  <div
                    aria-hidden="true"
                    className="absolute top-6 right-8 text-6xl font-serif text-mint/10 select-none leading-none"
                  >
                    &rdquo;
                  </div>
                  <div className="relative z-10 flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-secondary border border-border flex items-center justify-center">
                      <span className="text-lg font-mono font-bold text-mint">
                        AT
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground">
                        Ambesh Tiwari
                      </h3>
                      <p className="text-sm font-mono text-mint">
                        AI &amp; Strategy Lead
                      </p>
                    </div>
                  </div>
                  <blockquote className="relative z-10 mt-6 text-muted-foreground leading-relaxed text-sm">
                    &ldquo;Marketing brings them to the door. Systems invite them
                    in. I build the AI infrastructure that turns a
                    &lsquo;click&rsquo; into a &lsquo;loyal
                    customer&rsquo;.&rdquo;
                  </blockquote>
                </SpotlightCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Section 9 — Final CTA */}
        <section className="py-24 px-6 bg-card relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-mint/5 rounded-full blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 bg-mint/5 rounded-full blur-3xl"
          />
          <div className="relative max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="glass-strong rounded-2xl p-6 sm:p-12 text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-mint/30 bg-mint/5 mb-8">
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 rounded-full bg-mint animate-dot-pulse shrink-0"
                  />
                  <span className="text-xs sm:text-sm font-mono text-mint whitespace-nowrap">
                    Limited Availability
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-8">
                  We Are Not For Everyone<span className="text-mint">.</span>
                </h2>

                <div className="max-w-xl mx-auto text-left mb-10">
                  <p className="text-muted-foreground mb-6 text-center">
                    We run a boutique operation. This is{" "}
                    <span className="text-foreground font-semibold">
                      not a self-serve platform
                    </span>
                    . We partner with select clients who meet the following
                    criteria:
                  </p>

                  <ul className="space-y-3">
                    <ScrollReveal delayMs={80}>
                      <li className="flex items-start gap-3">
                        <CircleCheckBig
                          className="w-5 h-5 text-mint flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground text-sm">
                          You&apos;re a registered NBFC or Fintech lender.
                        </span>
                      </li>
                    </ScrollReveal>
                    <ScrollReveal delayMs={160}>
                      <li className="flex items-start gap-3">
                        <CircleCheckBig
                          className="w-5 h-5 text-mint flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground text-sm">
                          Your minimum loan ticket size is ₹50,000.
                        </span>
                      </li>
                    </ScrollReveal>
                    <ScrollReveal delayMs={240}>
                      <li className="flex items-start gap-3">
                        <CircleCheckBig
                          className="w-5 h-5 text-mint flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground text-sm">
                          You have a stable operations team ready to handle
                          volume.
                        </span>
                      </li>
                    </ScrollReveal>
                    <ScrollReveal delayMs={320}>
                      <li className="flex items-start gap-3">
                        <CircleCheckBig
                          className="w-5 h-5 text-mint flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground text-sm">
                          You are ready to invest in scale, not just
                          &ldquo;testing.&rdquo;
                        </span>
                      </li>
                    </ScrollReveal>
                  </ul>
                </div>

                <p className="text-lg text-muted-foreground mb-8">
                  If this is you, let&apos;s talk about scaling your{" "}
                  <span className="text-mint font-semibold font-mono">
                    Loan Book
                  </span>
                  .
                </p>

                <Link
                  href="/contact"
                  className="cta-glow group inline-flex items-center justify-center gap-2 whitespace-nowrap bg-mint text-primary-foreground hover:bg-mint/90 font-bold h-14 rounded-xl px-6 sm:px-10 max-w-full text-sm sm:text-base transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
                >
                  Book A Strategy Call
                  <ArrowRight
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

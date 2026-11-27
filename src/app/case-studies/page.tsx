import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CircleCheckBig,
  Lock,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Vault — Case Studies | Clients.co.in",
  description:
    "Inside The Vault: How we scaled loan disbursals for Indian NBFCs and digital lenders while cutting CPA.",
};

function BlurredAdMockup({
  platform,
  gradientId,
  metrics,
}: {
  platform: string;
  gradientId: string;
  metrics: { label: string; value: string; invertTrend?: boolean }[];
}) {
  return (
    <div className="relative">
      <div className="relative rounded-xl overflow-hidden border border-border bg-secondary">
        <div className="px-4 py-3 bg-card border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-mint/60" />
          </div>
          <div className="text-xs text-muted-foreground font-mono blur-[2px] select-none">
            {platform}
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 mb-6" aria-hidden="true">
            <div className="h-4 w-32 bg-muted/50 rounded blur-[4px]" />
            <div className="h-4 w-24 bg-muted/30 rounded blur-[4px]" />
          </div>

          <div className="space-y-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border"
              >
                <span className="text-xs text-muted-foreground font-mono">
                  {m.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-mono font-bold text-mint">
                    {m.value}
                  </span>
                  <TrendingUp
                    className={`w-4 h-4 text-mint ${
                      m.invertTrend ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 h-32 bg-gradient-to-t from-mint/5 to-transparent rounded-lg relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-24 blur-[3px]">
              <svg
                className="w-full h-full"
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id={gradientId}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="hsl(var(--mint))" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,80 Q50,60 100,70 T200,40 T300,50 T400,20"
                  fill="none"
                  stroke="hsl(var(--mint))"
                  strokeWidth="2"
                  opacity="0.6"
                />
                <path
                  d="M0,80 Q50,60 100,70 T200,40 T300,50 T400,20 V100 H0 Z"
                  fill={`url(#${gradientId})`}
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] pointer-events-none select-none"
        >
          <span className="text-4xl font-bold text-foreground/5 tracking-widest font-mono">
            CONFIDENTIAL
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        {/* Section 1 — The Vault Hero */}
        <section className="relative pt-32 pb-24 px-6 bg-card overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--mint)/0.05),transparent_50%)]"
          />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-mint/10 border border-mint/20 mb-8">
              <Lock className="w-8 h-8 text-mint" aria-hidden="true" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              The <span className="text-gradient">Vault.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We work with India&apos;s most competitive Fintechs. To protect
              their strategies and respect our NDAs, we do not disclose client
              names publicly.{" "}
              <span className="text-foreground font-medium">
                The results, however, speak for themselves.
              </span>
            </p>
          </div>
        </section>

        {/* Section 2 — Case Study 1: Personal Loan */}
        <section className="py-20 px-6 bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-mint/10 text-mint text-sm font-mono rounded-full border border-mint/20">
                <span className="w-2 h-2 bg-mint rounded-full" />
                PERSONAL LOAN
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The &ldquo;Tier-2&rdquo; Expansion Project
            </h2>

            <div className="inline-flex items-center gap-3 text-muted-foreground mb-12 font-mono text-sm">
              <span className="font-medium text-foreground">
                Mumbai-based Registered NBFC
              </span>
              <span className="text-border">|</span>
              <span>Ticket Size: ₹50k - ₹2L</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-6 bg-destructive/5 border border-destructive/20 rounded-xl">
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-destructive rounded-full" />
                    THE SITUATION
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    The client was burning{" "}
                    <span className="text-foreground font-mono font-semibold">
                      ₹15 Lakhs/month
                    </span>{" "}
                    on Facebook Ads with a CPA of{" "}
                    <span className="text-foreground font-mono font-semibold">
                      ₹3,200
                    </span>
                    . Rejection rates were{" "}
                    <span className="text-foreground font-mono font-semibold">
                      85%
                    </span>{" "}
                    because ads were targeting low-income users.
                  </p>
                </div>

                <div className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="text-lg font-bold text-foreground mb-6">
                    THE EXECUTION
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-mint/10 flex items-center justify-center">
                        <Bot
                          className="w-5 h-5 text-mint"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          Ambesh&apos;s System
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Implemented a WhatsApp API bot to collect 3 months of
                          bank statements before the lead was sent to the CRM.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-mint/10 flex items-center justify-center">
                        <Target
                          className="w-5 h-5 text-mint"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          Neeraj&apos;s Ads
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Switched optimization events from &ldquo;Lead&rdquo; to
                          &ldquo;Qualified Lead&rdquo; (Income &gt; ₹25k).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-mint/5 border border-mint/20 rounded-xl">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    THE OUTCOME (Month 3)
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CircleCheckBig
                        className="w-5 h-5 text-mint flex-shrink-0"
                        aria-hidden="true"
                      />
                      <p className="text-foreground text-sm">
                        <span className="font-semibold">CPA Dropped:</span>{" "}
                        <span className="font-mono">₹3,200</span> →{" "}
                        <span className="text-mint font-mono font-bold">
                          ₹1,150
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CircleCheckBig
                        className="w-5 h-5 text-mint flex-shrink-0"
                        aria-hidden="true"
                      />
                      <p className="text-foreground text-sm">
                        <span className="font-semibold">Disbursal Rate:</span>{" "}
                        Increased by{" "}
                        <span className="text-mint font-mono font-bold">
                          3x
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CircleCheckBig
                        className="w-5 h-5 text-mint flex-shrink-0"
                        aria-hidden="true"
                      />
                      <p className="text-foreground text-sm">
                        <span className="font-semibold">Scale:</span> Monthly ad
                        spend scaled to{" "}
                        <span className="text-mint font-mono font-bold">
                          ₹45 Lakhs
                        </span>{" "}
                        profitably
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <BlurredAdMockup
                platform="Meta Ads Manager"
                gradientId="meta-gradient"
                metrics={[
                  { label: "Cost per Result", value: "₹1,150", invertTrend: true },
                  { label: "Results", value: "3,912" },
                  { label: "Amount Spent", value: "₹45,00,000" },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Section 3 — Case Study 2: Business Loan */}
        <section className="py-20 px-6 bg-card">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-mint/10 text-mint text-sm font-mono rounded-full border border-mint/20">
                <span className="w-2 h-2 bg-mint rounded-full" />
                BUSINESS LOAN
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The &ldquo;High-Ticket&rdquo; SME Engine
            </h2>

            <div className="inline-flex items-center gap-3 text-muted-foreground mb-12 font-mono text-sm">
              <span className="font-medium text-foreground">
                Delhi-based Digital Lender
              </span>
              <span className="text-border">|</span>
              <span>Ticket Size: ₹5L - ₹15L</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-6 bg-destructive/5 border border-destructive/20 rounded-xl">
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-destructive rounded-full" />
                    THE SITUATION
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Client was relying on Affiliate Networks. They were getting{" "}
                    <span className="text-foreground font-mono font-semibold">
                      500 leads a day
                    </span>
                    , but only{" "}
                    <span className="text-foreground font-mono font-semibold">
                      2 were converting
                    </span>
                    . The sales team was demoralized calling &ldquo;dead&rdquo;
                    numbers.
                  </p>
                </div>

                <div className="p-6 bg-secondary/50 border border-border rounded-xl">
                  <h3 className="text-lg font-bold text-foreground mb-6">
                    THE EXECUTION
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                        <Zap
                          className="w-5 h-5 text-destructive"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          The Clean Up
                        </p>
                        <p className="text-muted-foreground text-xs">
                          We fired the affiliates.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-mint/10 flex items-center justify-center">
                        <Target
                          className="w-5 h-5 text-mint"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          The Strategy
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Launched LinkedIn &amp; Google Search campaigns
                          targeting &ldquo;GST-registered business owners&rdquo;
                          strictly.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-mint/10 flex items-center justify-center">
                        <Bot
                          className="w-5 h-5 text-mint"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          The Tech
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Connected the ad account directly to the Loan
                          Management System (LMS) to feed back &ldquo;Disbursal
                          Value&rdquo; to the ad algorithm.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-mint/5 border border-mint/20 rounded-xl">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    THE OUTCOME
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CircleCheckBig
                        className="w-5 h-5 text-mint flex-shrink-0"
                        aria-hidden="true"
                      />
                      <p className="text-foreground text-sm">
                        <span className="font-semibold">Lead Volume:</span>{" "}
                        Dropped by{" "}
                        <span className="text-mint font-mono font-bold">
                          90%
                        </span>{" "}
                        (Intentionally)
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CircleCheckBig
                        className="w-5 h-5 text-mint flex-shrink-0"
                        aria-hidden="true"
                      />
                      <p className="text-foreground text-sm">
                        <span className="font-semibold">Lead Quality:</span>{" "}
                        Login rate went from{" "}
                        <span className="font-mono">0.4%</span> to{" "}
                        <span className="text-mint font-mono font-bold">
                          18%
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CircleCheckBig
                        className="w-5 h-5 text-mint flex-shrink-0"
                        aria-hidden="true"
                      />
                      <p className="text-foreground text-sm">
                        <span className="font-semibold">Revenue:</span>{" "}
                        Disbursed{" "}
                        <span className="text-mint font-mono font-bold">
                          ₹4 Cr
                        </span>{" "}
                        in Month 1
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <BlurredAdMockup
                platform="Google Ads"
                gradientId="google-gradient"
                metrics={[
                  { label: "Conv. Value", value: "₹4,00,00,000" },
                  { label: "Conversions", value: "267" },
                  { label: "Login Rate", value: "18%" },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Section 4 — Why Blurred Screenshots? */}
        <section className="py-16 px-6 bg-background border-y border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Why Blurred Screenshots?
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              A blurred screenshot says,{" "}
              <span className="text-foreground font-medium">
                &ldquo;This is real data, but I&apos;m keeping it secret.&rdquo;
              </span>{" "}
              It feels like insider information. It is psychologically more
              convincing than any generic logo or testimonial.
            </p>
          </div>
        </section>

        {/* Section 5 — CTA */}
        <section className="py-20 px-6 bg-card relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-mint/5 rounded-full blur-3xl"
          />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="glass-strong rounded-2xl p-6 sm:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Join <span className="text-mint">The Vault</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your results could be the next case study we can&apos;t publicly
                share.
              </p>
              <Link
                href="/contact"
                className="cta-glow group inline-flex items-center justify-center gap-2 whitespace-nowrap bg-mint text-primary-foreground hover:bg-mint/90 font-bold h-14 rounded-xl px-10 text-base transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
              >
                Partner With Us
                <ArrowRight
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <p className="text-sm text-muted-foreground mt-6 font-mono">
                Accepting{" "}
                <span className="text-mint font-semibold">2 new Partners</span>{" "}
                this quarter.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

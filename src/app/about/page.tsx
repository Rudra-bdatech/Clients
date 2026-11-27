import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cog, Handshake, Target } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | Clients.co.in",
  description:
    "Turn Your Marketing Spend Into a Disbursal Machine. Meet the Growth Architects behind Clients.co.in.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        {/* Section 1 — Mission Hero */}
        <section className="pt-32 pb-20 px-6 bg-card relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--mint)/0.05),transparent_50%)]"
          />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <p className="text-mint text-sm font-mono tracking-wider uppercase mb-4 animate-fade-up">
              Our Mission
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 animate-fade-up-delay-1">
              Turn Your Marketing Spend Into a{" "}
              <span className="text-gradient">Disbursal Machine.</span>
            </h1>
            <div className="space-y-6 text-lg text-muted-foreground animate-fade-up-delay-2">
              <p>
                Most agencies treat &ldquo;Lending&rdquo; like
                &ldquo;E-commerce.&rdquo; They think selling a loan is the same
                as selling a t-shirt. They focus on clicks, traffic, and vanity
                metrics.
              </p>
              <div className="p-6 rounded-xl glass text-left">
                <p className="text-xl font-semibold text-foreground">
                  At Clients.co.in, we believe that if it doesn&apos;t lead to
                  a disbursal, it doesn&apos;t count.
                </p>
              </div>
              <p>
                We are a strategic partnership exclusively for Lending Brands
                &amp; NBFCs. We exist to solve one specific problem:{" "}
                <span className="text-mint font-semibold">
                  High CAC and Low Lead Quality
                </span>
                . By combining Ambesh Tiwari&apos;s AI Systems with Neeraj
                Kumar&apos;s Ad Mastery, we don&apos;t just run ads—we fix your
                funnel, filter your audience, and lower your Cost of
                Acquisition.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 — Growth Architects */}
        <section className="py-20 px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 animate-fade-up">
                We Are Not Lead Vendors. We Are{" "}
                <span className="text-gradient">Growth Architects.</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-up-delay-1">
                The industry is full of &ldquo;Lead Vendors&rdquo;—affiliates
                who sell the same low-quality lead to you and five of your
                competitors. That model is broken. It creates chaos in your call
                center and burns your budget.
              </p>
              <p className="text-xl font-semibold text-mint font-mono mt-6 animate-fade-up-delay-2">
                We represent the new way.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 animate-fade-up-delay-3">
              <div className="p-8 rounded-xl bg-card border border-border hover:border-mint/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-mint/10 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-mint" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-4">
                  We Build Predictable Lending Engines
                </h3>
                <p className="text-muted-foreground text-sm">
                  We don&apos;t rely on luck. We rely on data. Our systems are
                  designed to deliver consistent, scalable results month after
                  month.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-card border border-border hover:border-mint/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-mint/10 flex items-center justify-center mb-6">
                  <Cog className="w-6 h-6 text-mint" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-4">
                  We Don&apos;t Sell Leads
                </h3>
                <p className="text-muted-foreground text-sm">
                  We engineer end-to-end acquisition systems—from Ad Creative to
                  Disbursal—that you own and control.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-card border border-border hover:border-mint/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-mint/10 flex items-center justify-center mb-6">
                  <Handshake
                    className="w-6 h-6 text-mint"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-4">
                  We Are Partners
                </h3>
                <p className="text-muted-foreground text-sm">
                  We work inside your ad accounts, building infrastructure that
                  becomes a permanent asset for your company.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Founders / Tech & Traffic */}
        <section className="py-20 px-6 bg-card">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 animate-fade-up">
                The Perfect Balance of{" "}
                <span className="text-gradient">Tech &amp; Traffic.</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-up-delay-1">
                We realized that to scale a Fintech in India, you need two
                things: High-Intent Traffic and Automated Operations. Most
                agencies only have one. We have both.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 animate-fade-up-delay-2">
              <div className="p-8 rounded-xl bg-secondary/50 border border-border hover:border-mint/30 transition-all duration-300">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 rounded-lg bg-secondary border border-border flex items-center justify-center text-xl font-mono font-bold text-mint shrink-0">
                    NK
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      Neeraj Kumar
                    </h3>
                    <p className="text-mint font-mono text-sm">Performance</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-foreground mb-4">
                  The engine behind the traffic.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Neeraj brings 8 years of specialized experience in navigating
                  the strict ad policies of Google and Meta for financial
                  products. He knows how to find the &ldquo;whale&rdquo;
                  borrowers—the ones with good credit who are ready to take
                  action.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-secondary/50 border border-border hover:border-mint/30 transition-all duration-300">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 rounded-lg bg-secondary border border-border flex items-center justify-center text-xl font-mono font-bold text-mint shrink-0">
                    AT
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      Ambesh Tiwari
                    </h3>
                    <p className="text-mint font-mono text-sm">Systems</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-foreground mb-4">
                  The architect behind the automation.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Ambesh ensures that every click is captured, nurtured, and
                  qualified. His AI systems bridge the gap between
                  &ldquo;Marketing&rdquo; and &ldquo;Sales,&rdquo; ensuring your
                  team only talks to users who are ready to sign.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 — CTA ("Clients. No BS.") */}
        <section className="py-20 px-6 bg-background relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-mint/5 rounded-full blur-3xl"
          />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="glass-strong rounded-2xl p-6 sm:p-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 animate-fade-up">
                &ldquo;Clients. <span className="text-mint">No BS.</span>
                &rdquo;
              </h2>
              <p className="text-lg text-muted-foreground mb-10 animate-fade-up-delay-1">
                Our name is our promise. We don&apos;t hide behind jargon. We
                don&apos;t offer generic services. We get you what matters most
                to your business:{" "}
                <span className="font-semibold text-foreground">Clients</span>.
              </p>
              <div className="animate-fade-up-delay-2">
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
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

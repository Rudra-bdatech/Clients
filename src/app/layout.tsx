import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clients.co.in | Scale Your Loan Disbursals with AI-Powered Growth",
  description:
    "India's first Growth Partner dedicated to Lending & NBFCs. Performance Marketing + AI Automation = High-intent borrowers.",
  openGraph: {
    title: "Clients.co.in | Scale Your Loan Disbursals with AI-Powered Growth",
    description:
      "India's first Growth Partner dedicated to Lending & NBFCs. We combine Performance Marketing + AI Automation to deliver high-intent borrowers.",
    type: "website",
    locale: "en_IN",
    siteName: "Clients.co.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-mint/30 selection:text-foreground">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

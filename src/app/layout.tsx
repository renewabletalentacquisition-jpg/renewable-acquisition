import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Renewable Acquisition — High-Performance Solar Sales",
  description:
    "A commission-driven solar sales opportunity for competitive, coachable people. Top reps earn $10k–$20k+ per month. Apply now.",
  openGraph: {
    title: "Renewable Acquisition",
    description: "Join a high-performance solar sales team. Real upside. Real standards.",
    url: "https://renewableacquisition.com",
    siteName: "Renewable Acquisition",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

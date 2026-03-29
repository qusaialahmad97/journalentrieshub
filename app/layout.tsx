import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./Header"; 
import Footer from "./components/Footer"; 
import { Analytics } from "@vercel/analytics/next"; 
import { SpeedInsights } from "@vercel/speed-insights/next"; // 1. Added Speed Insights
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.journalentrieshub.com"),
  title: {
    default: "Journal Entries Hub | Real-World Accounting Examples & IFRS Guides",
    template: "%s | Journal Entries Hub",
  },
  description: "The definitive library of professional journal entries, IFRS guides, and accounting reconciliations. Built by experts for modern accountants.",
  keywords: ["Journal Entries", "IFRS 16", "Jordanian VAT", "Accounting Hub", "AP Supervisor", "Amman Accounting"],
  authors: [{ name: "Qusai Ahmad" }],
  
  // 2. Add your Google Search Console code here later
  verification: {
    google: "YOUR_GOOGLE_CODE_HERE", 
  },

  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.journalentrieshub.com",
    siteName: "Journal Entries Hub",
    images: ["/journalentrieshublogo.png"],
  },
  // Added for Twitter/X sharing cards
  twitter: {
    card: "summary_large_image",
    title: "Journal Entries Hub",
    description: "Professional accounting guides and real-world IFRS entries.",
    images: ["/journalentrieshublogo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} flex flex-col min-h-screen bg-white text-black antialiased`}>
        <Header />
        
        {/* Main content wrapper with standard max-width to keep text readable */}
        <main className="grow">
          {children}
        </main>

        <Footer />

        {/* 3. Monitoring & Growth Tools */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
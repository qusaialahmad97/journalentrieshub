import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "./Header"; 
import Footer from "./components/Footer"; 
import { Analytics } from "@vercel/analytics/next"; 
import { SpeedInsights } from "@vercel/speed-insights/next"; 
import ProductLightbox from "./components/ProductLightbox"; 
import ExitIntentLightbox from "./components/ExitIntentLightbox"; 
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
        
        <main className="grow relative">
          {children}
          <ProductLightbox />
          <ExitIntentLightbox />
        </main>
        
        <Footer />

        {/* Analytics & Optimizations */}
        <Analytics />
        <SpeedInsights />

        {/* Google AdSense */}
        <Script
          id="adsense-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5114773178417860"
          crossOrigin="anonymous"
        />

        {/* 🌟 Adsterra - Popunder */}
        <Script
          id="adsterra-popunder"
          strategy="afterInteractive"
          src="https://abscloud.org/1/e6ed3d759f5a75d288984557cc9913b7"
          data-cfasync="false"
        />

        {/* 🌟 Adsterra - Social Bar */}
        <Script
          id="adsterra-socialbar"
          strategy="afterInteractive"
          src="https://bauval.org/14/b710542ca44185bc298a86d4c7ff070b"
          data-cfasync="false"
        />
      </body>
    </html>
  );
}
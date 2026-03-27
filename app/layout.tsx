import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./Header"; // Adjusted to match your component folder
import Footer from "./components/Footer"; 
import { Analytics } from "@vercel/analytics/next"; // 1. Import Analytics
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.journalentrieshub.com"),
  title: {
    default: "Journal Entries Hub | Real-World Accounting Examples & IFRS Guides",
    template: "%s | Journal Entries Hub",
  },
  description: "The definitive library of professional journal entries, IFRS guides, and accounting reconciliations. Built by experts for modern accountants.",
  keywords: ["Journal Entries", "IFRS 16", "Jordanian VAT", "Accounting Hub", "AP Supervisor"],
  authors: [{ name: "Qusai Ahmad" }],
  
  // 2. Add Google Search Console Verification Tag
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth"> {/* Added smooth scroll for the #subscribe link */}
      <body className={`${inter.className} flex flex-col min-h-screen bg-white text-black antialiased`}>
        <Header />
        
        <main className="flex-grow">
          {children}
        </main>

        <Footer />

        {/* 3. Vercel Analytics Component */}
        <Analytics />
      </body>
    </html>
  );
}
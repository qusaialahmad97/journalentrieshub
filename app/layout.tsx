import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./Header"; 
import Footer from "./components/Footer"; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// This fixed the warning and Point #1 & #6 on your list
export const metadata: Metadata = {
  metadataBase: new URL("https://www.journalentrieshub.com"), // Crucial for OG images
  title: {
    default: "Journal Entries Hub | Real-World Accounting Examples & IFRS Guides",
    template: "%s | Journal Entries Hub",
  },
  description: "The definitive library of professional journal entries, IFRS guides, and restaurant accounting reconciliations. Built by experts for modern accountants.",
  keywords: ["Journal Entries", "IFRS 16", "Talabat", "Jordanian VAT", "Accounting Hub"],
  authors: [{ name: "Qusai Ahmad" }],
  alternates: {
    canonical: "/", // Point #6: Canonical Tags
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
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-white text-black`}>
        <Header />
        
        {/* Main content wrapper */}
        <div className="flex-grow">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
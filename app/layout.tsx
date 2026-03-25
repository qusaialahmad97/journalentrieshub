import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./Header"; 
import Footer from "./components/Footer"; // Import the new Footer
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Journal Entries Hub | Automated Accounting for Modern Accountants",
  description: "Explore our library of automated journal entries, Excel templates, and Python SAP scripting. Master accounting automation.",
  openGraph: {
    title: "Journal Entries Hub",
    description: "The definitive resource for modern accountants and automation experts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 1. Added flex and min-h-screen to the body */}
      <body className={`${inter.className} flex flex-col min-h-screen bg-white`}>
        
        <Header />
        
        {/* 2. Wrapped children in a flex-grow div to push the footer down */}
        <div className="flex-grow">
          {children}
        </div>

        <Footer />
        
      </body>
    </html>
  );
}
import { notFound } from "next/navigation";
import Link from "next/link";
import entries from "../../../data/entries.json";
import { Metadata } from "next";

interface JournalEntry {
  slug: string;
  title: string;
  category: string;
  description: string;
}

// 1. Point #6: Category-Specific Meta Tags
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ name: string }> 
}): Promise<Metadata> {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);
  
  return {
    title: `${categoryName} Journal Entries & Guides | Journal Entries Hub`,
    description: `Master ${categoryName} accounting with our comprehensive library of real-world journal entries, IFRS analysis, and professional templates.`,
    alternates: {
      canonical: `https://www.journalentrieshub.com/categories/${name}`,
    },
    openGraph: {
      title: `${categoryName} Accounting Resources`,
      description: `Expert-verified journal entries for ${categoryName}.`,
      type: "website",
    }
  };
}

// 2. Pre-generate the category pages for speed (SSG)
export async function generateStaticParams() {
  const categories = Array.from(new Set(entries.map((e) => e.category)));
  return categories.map((cat) => ({
    name: encodeURIComponent(cat),
  }));
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ name: string }> 
}) {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);
  
  const filteredEntries = (entries as JournalEntry[]).filter(
    (e) => e.category.toLowerCase() === categoryName.toLowerCase()
  );

  if (filteredEntries.length === 0) return notFound();

  // --- POINT #16: ITEMLIST & COLLECTION SCHEMA ---
  // This tells Google exactly how many expert resources are in this category.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${categoryName} Accounting Resources`,
    "description": `Professional resources and journal entries for ${categoryName}.`,
    "url": `https://www.journalentrieshub.com/categories/${name}`,
    "numberOfItems": filteredEntries.length,
    "itemListElement": filteredEntries.map((e, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "TechArticle",
        "headline": e.title,
        "url": `https://www.journalentrieshub.com/entries/${e.slug}`,
        "author": {
          "@type": "Person",
          "name": "Qusai Ahmad"
        }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-slate-50 py-16 px-4 font-sans text-black">
        <div className="max-w-6xl mx-auto">
          
          {/* Pillar Header */}
          <header className="mb-12 border-b border-slate-200 pb-10">
            <Link href="/" className="text-emerald-600 font-bold text-sm mb-4 block hover:translate-x-1 transition-transform">
              ← Back to All Categories
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 capitalize tracking-tight">
              {categoryName} <span className="text-emerald-500 text-3xl md:text-4xl block md:inline">Knowledge Center</span>
            </h1>
            <p className="text-slate-600 text-lg max-w-3xl leading-relaxed font-medium">
              Explore our verified library of {categoryName} transactions. Every entry is reviewed for 
              IFRS compliance and real-world accuracy by our technical accounting team.
            </p>
          </header>

          {/* Entries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEntries.map((entry) => (
              <Link 
                key={entry.slug} 
                href={`/entries/${entry.slug}`}
                className="group bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-emerald-500 transition-all flex flex-col"
              >
                <div className="flex-grow">
                  <div className="inline-block px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4">
                    {entry.category}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-4 leading-tight">
                    {entry.title}
                  </h2>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {entry.description}
                  </p>
                </div>
                <div className="flex items-center text-emerald-600 font-black text-xs uppercase tracking-widest pt-4 border-t border-slate-50">
                  Read Analysis 
                  <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-20 p-12 bg-slate-900 rounded-[40px] text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Need a specific {categoryName} entry?</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">Our team is constantly updating the hub. If you can&apos;t find what you need, suggest a new entry below.</p>
            <Link href="/about" className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-500 transition-colors">
              Contact Expert
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
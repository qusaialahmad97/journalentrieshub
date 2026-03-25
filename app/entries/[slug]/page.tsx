import { notFound } from "next/navigation";
import Link from "next/link";
import entries from "../../../data/entries.json";
import Comments from "../../components/Comments";
import { Metadata } from "next";

// 1. Dynamic SEO Meta Tags
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const entry = entries.find((e) => e.slug === resolvedParams.slug);

  if (!entry) return { title: "Entry Not Found" };

  return {
    title: `${entry.title} | Journal Entries Hub`,
    description: entry.description,
    openGraph: {
      title: entry.title,
      description: entry.description,
      type: "article",
    },
  };
}

// Pre-generate pages for SEO
export async function generateStaticParams() {
  return entries.map((entry) => ({
    slug: entry.slug,
  }));
}

export default async function EntryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const entry = entries.find((e) => e.slug === slug);

  if (!entry) return notFound();

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-black">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-emerald-600 mb-6 font-bold transition-colors">
          ← Back to Journal Entry Hub
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          
          {/* Header Section */}
          <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-slate-800">
            <div className="inline-block px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-4 border border-emerald-500/30">
              {entry.category}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{entry.title}</h1>
            <p className="text-slate-300 text-lg leading-relaxed">{entry.description}</p>
          </div>

          {/* The Journal Entry Table */}
          <div className="p-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 uppercase text-xs font-bold tracking-wider">
                    <th className="px-6 py-4">Account Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4 text-right">Debit ($)</th>
                    <th className="px-6 py-4 text-right">Credit ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {entry.entries.map((line, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-800">{line.account}</td>
                      <td className="px-6 py-4 text-slate-500 italic text-sm">{line.type}</td>
                      <td className="px-6 py-4 text-right text-emerald-600 font-bold">
                        {line.dr > 0 ? line.dr.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "-"}
                      </td>
                      <td className="px-6 py-4 text-right text-rose-600 font-bold">
                        {line.cr > 0 ? line.cr.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Explanation Box */}
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="text-blue-900 font-bold flex items-center gap-2 mb-2">
                💡 Accountant's Note
              </h3>
              <p className="text-blue-800 leading-relaxed italic">{entry.explanation}</p>
            </div>

            {/* Disabled Monetization Section */}
            <div className="mt-12 text-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <h2 className="text-2xl font-bold mb-4 text-slate-400">Excel Templates Coming Soon</h2>
              <p className="text-slate-400 mb-8 tracking-tight">We are currently preparing the automated Excel versions for our full library.</p>
              <button 
                disabled 
                className="bg-slate-300 text-slate-500 cursor-not-allowed px-12 py-4 rounded-full font-bold shadow-none"
              >
                Download Template (Coming Soon)
              </button>
            </div>

            {/* Separate Comment Section per Entry */}
            <Comments />
          </div>
        </div>
      </div>
    </main>
  );
}
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-6 text-slate-800 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-10 italic font-bold">Last Updated: March 2026</p>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-3">1. Educational Purpose Only</h2>
            <p className="leading-relaxed text-slate-600">
              The journal entries, tax guides, and IFRS interpretations provided on <strong>Journal Entries Hub</strong> are for educational and informational purposes only. While authored by accounting professionals, this content does not constitute formal financial, tax, or legal advice.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6">
            <h2 className="text-xl font-bold mb-3 text-amber-900">2. Professional Disclaimer</h2>
            <p className="leading-relaxed text-amber-800">
              Accounting standards (IFRS/IAS) and local regulations (such as Jordanian VAT laws) are subject to change. Always verify entries with your specific ERP system (SAP, Oracle, etc.) and your company&apos;s internal audit guidelines before posting live transactions. <strong>Journal Entries Hub is not liable for any financial discrepancies resulting from the use of these examples.</strong>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">3. External Links & Tools</h2>
            <p className="leading-relaxed text-slate-600">
              Our calculators and external links (to IFRS.org or official government portals) are provided as a convenience. We do not guarantee the real-time accuracy of third-party tools.
            </p>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-slate-100">
          <Link href="/" className="text-emerald-600 font-bold hover:underline">
            ← Return to Hub
          </Link>
        </div>
      </div>
    </main>
  );
}
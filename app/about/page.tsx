import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Qusai Ahmad | Journal Entries Hub",
  description: "Learn about Qusai Ahmad, a General Accountant and AP Supervisor at alfanar. Discover the mission behind the Journal Entries Hub.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-black">
      {/* Hero Header */}
      <section className="py-20 bg-slate-900 text-white px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Behind the <span className="text-emerald-500">Hub</span>
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
          Providing high-quality financial resources for the global accounting community.
        </p>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">I'm Qusai Ahmad</h2>
            <p className="text-slate-600 leading-relaxed">
              I am a General Accountant and Accounts Payable Supervisor based in Amman, Jordan. 
              Currently working at alfanar, I manage complex financial workflows and ensure 
              the accuracy of large-scale accounting operations.
            </p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8">The Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              Most accounting resources are either too academic or too basic. I built Journal Entries Hub 
              to provide real-world, industry-specific entries for the modern professional. 
              My goal is to provide a clear, standardized reference for practitioners across different sectors.
            </p>
          </div>

          {/* Facts Box - Cleaned Up */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-sm text-center">Professional Profile</h3>
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <div className="h-10 w-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold italic">Q</div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Based In</p>
                  <p className="font-bold text-slate-800">Amman, Jordan 🇯🇴</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center text-white text-lg">📊</div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Role</p>
                  <p className="font-bold text-slate-800">Accounts Payable Supervisor</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center text-white text-lg">📝</div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Focus</p>
                  <p className="font-bold text-slate-800">IFRS & Financial Reporting</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-200 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Trust This Hub?</h2>
          <p className="text-slate-600">
            Every entry here is verified against IFRS standards and battle-tested in 
            corporate environments. This platform is built to support the integrity and efficiency 
            of financial reporting.
          </p>
        </div>
      </section>
    </main>
  );
}
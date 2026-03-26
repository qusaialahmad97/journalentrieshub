export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-6 text-slate-800 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Privacy Policy</h1>
        
        <section className="space-y-8 text-slate-600">
          <p>
            At <strong>Journal Entries Hub</strong>, we respect your privacy. This policy explains how we handle data on our platform.
          </p>

          <div>
            <h2 className="text-xl font-bold mb-3 text-slate-900">1. Data Collection (Analytics)</h2>
            <p>
              We use <strong>Vercel Analytics</strong> to monitor site traffic. This tool collects anonymous data such as region (e.g., Amman, Jordan), browser type, and pages visited. We do not collect Personal Identifiable Information (PII) through analytics.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 text-slate-900">2. Comments & Community</h2>
            <p>
              Our comment section is powered by <strong>Giscus</strong>, which uses the GitHub API. When you comment, your GitHub profile information is displayed publicly as part of the discussion. Please refer to GitHub&apos;s privacy policy for data handled by their platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 text-slate-900">3. Cookies</h2>
            <p>
              We do not use tracking cookies for advertising. Small technical cookies may be used by our hosting provider (Vercel) to ensure site stability and performance.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
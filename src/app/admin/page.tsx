export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0d] px-6 py-16 text-stone-100 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">Internal</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Applicant Dashboard</h1>
          </div>
          <a
            href="/"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-white transition hover:bg-white/10"
          >
            View Site
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Total Applicants", value: "—" },
            { label: "Qualified", value: "—" },
            { label: "Under Review", value: "—" },
            { label: "Disqualified", value: "—" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl font-semibold text-white">{stat.value}</div>
              <div className="mt-2 text-sm text-stone-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm text-stone-400">
            Applicant tracking is scaffolded and ready. Once Supabase is wired, applicant data will populate here with full search, filters, status management, and interview tracking.
          </p>
        </div>
      </div>
    </main>
  );
}

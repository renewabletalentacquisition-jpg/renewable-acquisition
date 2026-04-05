const metrics = [
  { value: "$10k–$20k+", label: "Monthly upside for top reps" },
  { value: "$50k+", label: "Possible 4-month run for top setters" },
  { value: "Limited", label: "Serious spots available" },
];

const fitPoints = [
  "Competitive people who want real upside",
  "Athletes, gym-driven applicants, and college grinders",
  "People open to travel, relocation, and team housing",
  "Coachability, resilience, and hunger over polished resumes",
];

const processSteps = [
  "Apply through the qualification flow",
  "Get filtered fast based on real fit",
  "Qualified candidates move straight toward interview booking",
  "Top applicants get reviewed quickly while spots remain open",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(196,167,106,0.18),_transparent_28%),linear-gradient(180deg,_#0b0b0d_0%,_#111214_38%,_#0a0a0b_100%)] text-stone-100">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">
              Renewable Acquisition
            </p>
            <p className="mt-1 text-sm text-stone-400">
              Premium recruiting infrastructure for high-performance solar sales.
            </p>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <a href="#process" className="text-sm text-stone-300 transition hover:text-white">
              Process
            </a>
            <a href="#fit" className="text-sm text-stone-300 transition hover:text-white">
              Who It’s For
            </a>
            <a
              href="/apply"
              className="rounded-full border border-amber-200/30 bg-amber-200/10 px-5 py-2 text-sm font-medium text-amber-100 transition hover:border-amber-100/60 hover:bg-amber-200/20"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-28">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-amber-200/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-amber-100/80">
            Limited spots • Interviewing immediately
          </p>
          <h1 className="max-w-4xl text-5xl leading-[1.02] font-semibold tracking-[-0.04em] text-white md:text-6xl lg:text-7xl">
            Build a bigger life through a high-performance solar sales team.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300 md:text-xl">
            This is an in-person, commission-driven opportunity for serious people who want
            more than an average job. Real upside. Real standards. Real pressure. Real growth.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-amber-200 px-7 py-4 text-sm font-semibold text-stone-950 transition hover:bg-amber-100"
            >
              Start Application
            </a>
            <a
              href="#fit"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              See If You Fit
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {metrics.map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="text-2xl font-semibold tracking-tight text-white">{item.value}</div>
                <div className="mt-2 text-sm leading-6 text-stone-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-7 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="rounded-[1.5rem] border border-amber-200/20 bg-black/30 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">Before you apply</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
              This is not remote. It is not hourly. It is not for tourists.
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-stone-300">
              <li>• You must be open to commission-only performance pay.</li>
              <li>• You must be willing to travel or relocate if selected.</li>
              <li>• Team housing and movement with the team may be part of the role.</li>
              <li>• Top reps can earn strong money. Weak performers can make little early on.</li>
              <li>• If you want comfort first, this is probably the wrong fit.</li>
            </ul>
            <a
              href="/apply"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-amber-200/25 bg-amber-200/10 px-6 py-4 text-sm font-semibold text-amber-50 transition hover:bg-amber-200/20"
            >
              Continue to Qualification
            </a>
          </div>
        </div>
      </section>

      <section id="fit" className="mx-auto max-w-7xl px-6 py-6 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-200/65">Who this is for</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Built for people who want upside, pressure, and a real shot at growth.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {fitPoints.map((point) => (
              <div key={point} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm leading-7 text-stone-300">
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-amber-200/65">Process</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Fast funnel. Hard filters. Serious candidates move quickly.
              </h2>
            </div>
            <a
              href="/apply"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Begin Qualification
            </a>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <div className="text-sm font-semibold text-amber-200">0{index + 1}</div>
                <p className="mt-4 text-sm leading-7 text-stone-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { sendOutcomeEmail } from "@/lib/email";

type Answers = Record<string, string | string[]>;

const CALENDLY_URL = "https://calendly.com/chasepinedawow/interview";

type Field =
  | { name: string; label: string; type: "text" | "email" | "tel"; required: boolean }
  | { name: string; label: string; type: "radio" | "checkbox"; required: boolean; options: string[] };

type Step = { id: string; title: string; fields: Field[] };

const steps: Step[] = [
  {
    id: "basics",
    title: "Let's start with the basics.",
    fields: [
      { name: "firstName", label: "First Name", type: "text", required: true },
      { name: "lastName", label: "Last Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "city", label: "City & State", type: "text", required: true },
    ],
  },
  {
    id: "commitment",
    title: "This opportunity requires full commitment.",
    fields: [
      {
        name: "startTiming",
        label: "How soon can you start?",
        type: "radio",
        required: true,
        options: ["Immediately", "Within 7 days", "Within 2 weeks", "More than 2 weeks"],
      },
      {
        name: "commissionOnly",
        label: "Are you open to a commission-only pay structure?",
        type: "radio",
        required: true,
        options: ["Yes", "Maybe", "No"],
      },
      {
        name: "doorToDoor",
        label: "Are you willing to work in an in-person, door-to-door sales role?",
        type: "radio",
        required: true,
        options: ["Yes", "Maybe", "No"],
      },
    ],
  },
  {
    id: "relocation",
    title: "This role requires movement.",
    fields: [
      {
        name: "relocate",
        label: "Are you willing to relocate and live away from home for work?",
        type: "radio",
        required: true,
        options: ["Yes", "Maybe", "No"],
      },
      {
        name: "teamHousing",
        label: "Are you comfortable with team housing and moving with the team as needed?",
        type: "radio",
        required: true,
        options: ["Yes", "Maybe", "No"],
      },
    ],
  },
  {
    id: "background",
    title: "Tell us about yourself.",
    fields: [
      {
        name: "background",
        label: "Which of the following apply to you?",
        type: "checkbox",
        required: false,
        options: [
          "Sales experience",
          "Door-to-door experience",
          "Commission-based work",
          "Competitive sports background",
          "Gym / fitness lifestyle",
          "Customer-facing experience",
          "College student / recent graduate",
          "None of the above",
        ],
      },
      {
        name: "coachable",
        label: "Are you willing to be coached directly and held accountable?",
        type: "radio",
        required: true,
        options: ["Yes", "Maybe", "No"],
      },
      {
        name: "financialStability",
        label: "Do you have enough financial stability to get through an initial ramp-up period?",
        type: "radio",
        required: true,
        options: ["Yes", "Probably", "Not sure", "No"],
      },
    ],
  },
];

function isDQ(answers: Answers): boolean {
  return (
    answers.commissionOnly === "No" ||
    answers.doorToDoor === "No" ||
    answers.relocate === "No" ||
    answers.teamHousing === "No" ||
    answers.coachable === "No"
  );
}

function calcScore(answers: Answers): number {
  let score = 0;
  if (answers.startTiming === "Immediately") score += 4;
  else if (answers.startTiming === "Within 7 days") score += 3;
  else if (answers.startTiming === "Within 2 weeks") score += 1;
  if (answers.commissionOnly === "Yes") score += 5;
  if (answers.doorToDoor === "Yes") score += 5;
  if (answers.relocate === "Yes") score += 4;
  if (answers.teamHousing === "Yes") score += 4;
  if (answers.coachable === "Yes") score += 4;
  if (answers.financialStability === "Yes") score += 3;
  else if (answers.financialStability === "Probably") score += 2;
  const bg = answers.background as string[] | undefined;
  if (bg) {
    if (bg.includes("Door-to-door experience")) score += 3;
    if (bg.includes("Sales experience")) score += 2;
    if (bg.includes("Commission-based work")) score += 2;
    if (bg.includes("Competitive sports background")) score += 2;
    if (bg.includes("Gym / fitness lifestyle")) score += 1;
  }
  return score;
}

function getOutcome(answers: Answers): "qualified" | "review" | "disqualified" {
  if (isDQ(answers)) return "disqualified";
  const score = calcScore(answers);
  if (score >= 20) return "qualified";
  if (score >= 12) return "review";
  return "disqualified";
}

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const current = steps[step];
  const isLast = step === steps.length - 1;

  function handleChange(name: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckbox(name: string, option: string, checked: boolean) {
    const cur = (answers[name] as string[]) || [];
    const updated = checked ? [...cur, option] : cur.filter((o) => o !== option);
    handleChange(name, updated);
  }

  function canAdvance() {
    return current.fields.every((f) => {
      if (!f.required) return true;
      const val = answers[f.name];
      if (!val) return false;
      if (Array.isArray(val)) return val.length > 0;
      return val.trim() !== "";
    });
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    try {
      const outcome = getOutcome(answers);
      const score = calcScore(answers);

      const { error: dbError } = await supabase.from("applicants").insert({
        first_name: answers.firstName,
        last_name: answers.lastName,
        email: answers.email,
        phone: answers.phone,
        city: answers.city,
        start_timing: answers.startTiming,
        commission_only: answers.commissionOnly,
        door_to_door: answers.doorToDoor,
        relocate: answers.relocate,
        team_housing: answers.teamHousing,
        background: answers.background || [],
        coachable: answers.coachable,
        financial_stability: answers.financialStability,
        score,
        outcome,
      });

      if (dbError) throw new Error(dbError.message);

      // Send email via Resend
      await sendOutcomeEmail({
        firstName: answers.firstName as string,
        email: answers.email as string,
        outcome,
      });

      router.push(`/result?outcome=${outcome}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0b0d] px-6 py-12 text-stone-100 lg:px-10">
      <div className="mx-auto max-w-2xl">
        <a href="/" className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-stone-400 transition hover:text-white">
          ← Back
        </a>

        <div className="mb-8 flex gap-2">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? "bg-amber-200" : "bg-white/10"}`}
            />
          ))}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">
            Step {step + 1} of {steps.length}
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {current.title}
          </h1>

          <div className="mt-8 space-y-6">
            {current.fields.map((field) => (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-medium text-stone-200">
                  {field.label}
                </label>

                {(field.type === "text" || field.type === "email" || field.type === "tel") ? (
                  <input
                    type={field.type}
                    value={(answers[field.name] as string) || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder-stone-500 outline-none transition focus:border-amber-200/40 focus:bg-white/10"
                    placeholder={field.label}
                  />
                ) : field.type === "radio" ? (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {field.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleChange(field.name, opt)}
                        className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                          answers[field.name] === opt
                            ? "border-amber-200/60 bg-amber-200/10 text-amber-100"
                            : "border-white/10 bg-white/5 text-stone-300 hover:border-white/25 hover:bg-white/10"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {("options" in field ? field.options : []).map((opt) => {
                      const checked = ((answers[field.name] as string[]) || []).includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleCheckbox(field.name, opt, !checked)}
                          className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                            checked
                              ? "border-amber-200/60 bg-amber-200/10 text-amber-100"
                              : "border-white/10 bg-white/5 text-stone-300 hover:border-white/25 hover:bg-white/10"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          <div className="mt-10 flex gap-4">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Back
              </button>
            )}
            {isLast ? (
              <button
                onClick={handleSubmit}
                disabled={!canAdvance() || submitting}
                className="flex-1 rounded-full bg-amber-200 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-100 disabled:opacity-40"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            ) : (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance()}
                className="flex-1 rounded-full bg-amber-200 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-100 disabled:opacity-40"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export { CALENDLY_URL };

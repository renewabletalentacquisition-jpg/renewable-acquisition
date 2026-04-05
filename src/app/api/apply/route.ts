import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

type Answers = Record<string, string | string[]>;

function isDQ(answers: Answers): boolean {
  if (answers.commissionOnly === "No") return true;
  if (answers.doorToDoor === "No") return true;
  if (answers.relocate === "No") return true;
  if (answers.teamHousing === "No") return true;
  if (answers.coachable === "No") return true;
  return false;
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

export async function POST(req: NextRequest) {
  try {
    const answers: Answers = await req.json();
    const outcome = getOutcome(answers);
    const score = calcScore(answers);

    const { error } = await supabaseAdmin.from("applicants").insert({
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

    if (error) {
      console.error("[apply] supabase error:", error);
      return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
    }

    return NextResponse.json({ outcome, score });
  } catch (e) {
    console.error("[apply] error:", e);
    return NextResponse.json({ error: "Failed to process application" }, { status: 500 });
  }
}

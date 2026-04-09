export type ApplicantOpsValues = {
  source: string;
  sourceDetail: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  bookingStatus: string;
  applicantStatus: string;
  priorityBucket: string;
  nextAction: string;
};

export function inferSourceFromParams(params: URLSearchParams) {
  const explicit =
    params.get("source") ||
    params.get("src") ||
    params.get("channel") ||
    params.get("ref");

  const utmSource = params.get("utm_source") || "";
  const utmMedium = params.get("utm_medium") || "";
  const utmCampaign = params.get("utm_campaign") || "";
  const utmContent = params.get("utm_content") || "";
  const utmTerm = params.get("utm_term") || "";

  const raw = (explicit || utmSource || "direct").trim().toLowerCase();
  const medium = utmMedium.trim().toLowerCase();

  const source = raw.includes("craigslist")
    ? "craigslist"
    : raw.includes("instagram") || raw === "ig"
      ? "instagram"
      : raw.includes("referral")
        ? "referral"
        : raw.includes("indeed")
          ? "indeed"
          : raw.includes("facebook")
            ? "facebook"
            : raw.includes("tiktok")
              ? "tiktok"
              : medium.includes("social")
                ? "social"
                : raw || "direct";

  const sourceDetail = explicit || utmCampaign || utmContent || utmTerm || "";

  return {
    source,
    sourceDetail,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
  };
}

export function buildApplicantOps(outcome: "qualified" | "review" | "disqualified", params: URLSearchParams): ApplicantOpsValues {
  const sourceMeta = inferSourceFromParams(params);

  if (outcome === "qualified") {
    return {
      ...sourceMeta,
      bookingStatus: "not_booked",
      applicantStatus: "new",
      priorityBucket: "speed-to-lead",
      nextAction: "Call, text, and email within 15 minutes. Push straight to Calendly.",
    };
  }

  if (outcome === "review") {
    return {
      ...sourceMeta,
      bookingStatus: "n/a",
      applicantStatus: "needs_review",
      priorityBucket: "review-fast",
      nextAction: "Review same day. Advance strong maybes or close the loop fast.",
    };
  }

  return {
    ...sourceMeta,
    bookingStatus: "n/a",
    applicantStatus: "closed",
    priorityBucket: "archive",
    nextAction: "No action needed.",
  };
}

export function getPriorityLabel(priorityBucket?: string) {
  if (priorityBucket === "speed-to-lead") return "Speed to Lead";
  if (priorityBucket === "review-fast") return "Review Fast";
  if (priorityBucket === "archive") return "Archive";
  return "Standard";
}

export function getPriorityColor(priorityBucket?: string) {
  if (priorityBucket === "speed-to-lead") return { bg: "rgba(201,169,110,0.15)", color: "#c9a96e" };
  if (priorityBucket === "review-fast") return { bg: "rgba(96,165,250,0.12)", color: "#60a5fa" };
  if (priorityBucket === "archive") return { bg: "rgba(120,113,108,0.15)", color: "#a8a29e" };
  return { bg: "rgba(255,255,255,0.08)", color: "#d6d3d1" };
}

export function getHoursSince(createdAt: string) {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  return diffMs / (1000 * 60 * 60);
}

export function rankApplicant(createdAt: string, outcome: string, priorityBucket?: string) {
  const hours = getHoursSince(createdAt);
  const urgencyBoost = hours <= 1 ? 35 : hours <= 4 ? 20 : hours <= 24 ? 10 : 0;
  const outcomeBase = outcome === "qualified" ? 100 : outcome === "review" ? 55 : 10;
  const priorityBase = priorityBucket === "speed-to-lead" ? 25 : priorityBucket === "review-fast" ? 10 : 0;
  return outcomeBase + priorityBase + urgencyBoost - Math.min(hours, 72) / 6;
}

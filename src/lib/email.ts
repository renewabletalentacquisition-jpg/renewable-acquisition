const RESEND_API_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY!;
const CALENDLY_URL = "https://calendly.com/chasepinedawow/interview";
const BRAND_COLOR = "#c9a96e";
const FROM = "Renewable Acquisition <noreply@renewableacquisition.com>";

function baseTemplate(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#08080a;font-family:Arial,sans-serif;color:#f4f3f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#08080a;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr>
          <td style="padding:0 0 28px;">
            <span style="font-size:19px;font-weight:700;color:#f4f3f0;">
              Renewable <span style="color:${BRAND_COLOR};">Acquisition</span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);border-radius:18px;padding:38px 36px 32px;">
            ${content}
          </td>
        </tr>
        <tr>
          <td style="padding:24px 0 0;">
            <p style="margin:0;font-size:12px;color:#5c5751;line-height:1.6;">
              Renewable Acquisition &middot; Commission-based &middot; In-person &middot; High-performance<br>
              <a href="https://renewableacquisition.com" style="color:${BRAND_COLOR};text-decoration:none;">renewableacquisition.com</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function qualifiedHtml(firstName: string) {
  return baseTemplate(`
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND_COLOR};font-weight:700;">Strong Fit</p>
    <h1 style="margin:0 0 20px;font-size:30px;font-weight:700;color:#f4f3f0;letter-spacing:-0.02em;line-height:1.1;">
      You&rsquo;re in, ${firstName}.<br>Book your interview now.
    </h1>
    <p style="margin:0 0 28px;font-size:15px;color:#9e9893;line-height:1.72;">
      Based on your application, you look like a strong fit for what we&rsquo;re building.<br><br>
      The next step is simple &mdash; <strong style="color:#f4f3f0;">book your interview.</strong><br><br>
      We move fast with serious candidates. Same-day slots may be available. Show up on time and be ready.
    </p>
    <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="background:${BRAND_COLOR};border-radius:9999px;">
          <a href="${CALENDLY_URL}" style="display:inline-block;padding:14px 34px;font-size:14px;font-weight:700;color:#0d0b08;text-decoration:none;">
            Book Interview Now &rarr;
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-size:12.5px;color:#5c5751;line-height:1.6;">
      Only book if you are serious and can commit. We respect your time and expect the same.
    </p>
  `);
}

function reviewHtml(firstName: string) {
  return baseTemplate(`
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#9e9893;font-weight:700;">Application Received</p>
    <h1 style="margin:0 0 20px;font-size:30px;font-weight:700;color:#f4f3f0;letter-spacing:-0.02em;line-height:1.1;">
      Thanks for applying, ${firstName}.
    </h1>
    <p style="margin:0 0 24px;font-size:15px;color:#9e9893;line-height:1.72;">
      We&rsquo;ve received your application and we&rsquo;re reviewing it now.<br><br>
      If we decide to move forward, we&rsquo;ll be in touch shortly. We move quickly with candidates who are the right fit.
    </p>
    <p style="margin:0;font-size:12.5px;color:#5c5751;line-height:1.6;">
      Reply to this email if you have any questions.
    </p>
  `);
}

function dqHtml(firstName: string) {
  return baseTemplate(`
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#9e9893;font-weight:700;">Application Update</p>
    <h1 style="margin:0 0 20px;font-size:30px;font-weight:700;color:#f4f3f0;letter-spacing:-0.02em;line-height:1.1;">
      Thanks for applying, ${firstName}.
    </h1>
    <p style="margin:0 0 24px;font-size:15px;color:#9e9893;line-height:1.72;">
      We appreciate you taking the time to apply.<br><br>
      At this time, we&rsquo;re moving forward with candidates who are a closer fit for the current opportunity.
    </p>
    <p style="margin:0;font-size:12.5px;color:#5c5751;line-height:1.6;">
      We wish you the best &mdash; if circumstances change in the future, don&rsquo;t hesitate to apply again.
    </p>
  `);
}

export async function sendOutcomeEmail({
  firstName,
  email,
  outcome,
}: {
  firstName: string;
  email: string;
  outcome: string;
}) {
  let subject: string;
  let html: string;

  if (outcome === "qualified") {
    subject = "You're cleared — book your interview now";
    html = qualifiedHtml(firstName);
  } else if (outcome === "review") {
    subject = "Application received — we'll be in touch";
    html = reviewHtml(firstName);
  } else {
    subject = "Your application — Renewable Acquisition";
    html = dqHtml(firstName);
  }

  if (!RESEND_API_KEY) {
    console.warn("[email] NEXT_PUBLIC_RESEND_API_KEY not set — skipping email");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to: [email], subject, html }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("[email] resend error:", err);
    // Don't throw — email failure shouldn't block the applicant from seeing their result
  }
}

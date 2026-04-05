import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const CALENDLY_URL = "https://calendly.com/chasepinedawow/interview";
const FROM = "Renewable Acquisition <noreply@renewableacquisition.com>";
const BRAND_COLOR = "#c9a96e";

interface Applicant {
  first_name: string;
  last_name: string;
  email: string;
  score: number;
  outcome: string;
  start_timing: string;
  commission_only: string;
  relocate: string;
}

function baseTemplate(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Renewable Acquisition</title>
</head>
<body style="margin:0;padding:0;background:#08080a;font-family:'DM Sans',Arial,sans-serif;color:#f4f3f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#08080a;padding:40px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">
        <!-- Logo -->
        <tr>
          <td style="padding:0 0 32px 0;">
            <span style="font-size:20px;font-weight:600;color:#f4f3f0;letter-spacing:-0.01em;">
              Renewable <span style="color:${BRAND_COLOR};">Acquisition</span>
            </span>
          </td>
        </tr>
        <!-- Content -->
        <tr>
          <td style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);border-radius:20px;padding:40px 40px 36px;">
            ${content}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:28px 0 0;text-align:left;">
            <p style="margin:0;font-size:12px;color:#5c5751;line-height:1.6;">
              Renewable Acquisition · Commission-based · In-person · High-performance<br>
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

function qualifiedEmail(applicant: Applicant) {
  const subject = "You're cleared — book your interview now";
  const html = baseTemplate(`
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND_COLOR};font-weight:600;">Strong fit</p>
    <h1 style="margin:0 0 20px;font-size:32px;font-weight:700;color:#f4f3f0;letter-spacing:-0.03em;line-height:1.1;">
      You&rsquo;re in,<br>${applicant.first_name}.
    </h1>
    <p style="margin:0 0 28px;font-size:15.5px;color:#9e9893;line-height:1.72;">
      Based on your application, you look like a strong fit for what we&rsquo;re building.<br><br>
      The next step is simple: <strong style="color:#f4f3f0;">book your interview now.</strong><br><br>
      We move fast with serious candidates. Same-day slots may be available. Show up on time and be ready.
    </p>
    <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="background:${BRAND_COLOR};border-radius:9999px;">
          <a href="${CALENDLY_URL}" style="display:inline-block;padding:15px 36px;font-size:14px;font-weight:700;color:#0d0b08;text-decoration:none;letter-spacing:0.01em;">
            Book Interview Now &rarr;
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-size:13px;color:#5c5751;line-height:1.6;">
      Only book if you are serious and can commit. We respect your time and expect the same.<br><br>
      If you have questions, reply to this email.
    </p>
  `);
  return { subject, html };
}

function reviewEmail(applicant: Applicant) {
  const subject = "Application received — we'll be in touch";
  const html = baseTemplate(`
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#9e9893;font-weight:600;">Application received</p>
    <h1 style="margin:0 0 20px;font-size:32px;font-weight:700;color:#f4f3f0;letter-spacing:-0.03em;line-height:1.1;">
      Thanks for applying,<br>${applicant.first_name}.
    </h1>
    <p style="margin:0 0 28px;font-size:15.5px;color:#9e9893;line-height:1.72;">
      We&rsquo;ve received your application and we&rsquo;re reviewing it now.<br><br>
      If we decide to move forward, we&rsquo;ll be in touch shortly. We move quickly with candidates who are the right fit.
    </p>
    <p style="margin:0;font-size:13px;color:#5c5751;line-height:1.6;">
      In the meantime, feel free to reply to this email if you have any questions.
    </p>
  `);
  return { subject, html };
}

function dqEmail(applicant: Applicant) {
  const subject = "Your application — Renewable Acquisition";
  const html = baseTemplate(`
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#9e9893;font-weight:600;">Application update</p>
    <h1 style="margin:0 0 20px;font-size:32px;font-weight:700;color:#f4f3f0;letter-spacing:-0.03em;line-height:1.1;">
      Thanks for applying,<br>${applicant.first_name}.
    </h1>
    <p style="margin:0 0 28px;font-size:15.5px;color:#9e9893;line-height:1.72;">
      We appreciate you taking the time to apply.<br><br>
      At this time, we&rsquo;re moving forward with candidates who are a closer fit for the current opportunity.
    </p>
    <p style="margin:0;font-size:13px;color:#5c5751;line-height:1.6;">
      We wish you the best — and if circumstances change in the future, don&rsquo;t hesitate to apply again.
    </p>
  `);
  return { subject, html };
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      subject,
      html,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Resend error: ${JSON.stringify(data)}`);
  return data;
}

serve(async (req) => {
  try {
    const payload = await req.json();
    const applicant: Applicant = payload.record;

    if (!applicant?.email || !applicant?.outcome) {
      return new Response(JSON.stringify({ error: "Missing applicant data" }), { status: 400 });
    }

    let emailContent;
    if (applicant.outcome === "qualified") {
      emailContent = qualifiedEmail(applicant);
    } else if (applicant.outcome === "review") {
      emailContent = reviewEmail(applicant);
    } else {
      emailContent = dqEmail(applicant);
    }

    const result = await sendEmail(applicant.email, emailContent.subject, emailContent.html);
    console.log(`[email] sent to ${applicant.email} — outcome: ${applicant.outcome} — id: ${result.id}`);

    return new Response(JSON.stringify({ ok: true, id: result.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[email] error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});

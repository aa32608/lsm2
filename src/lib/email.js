import { Resend } from 'resend';

// Initialize Resend lazily
let resend;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn("WARNING: RESEND_API_KEY is not set. Email functionality will be disabled.");
}

export async function sendEmail(to, subject, text) {
  if (!to || !subject || !text) {
    console.error("sendEmail: Missing required fields");
    return { error: "Missing required fields" };
  }

  try {
    if (!resend) {
      console.warn("sendEmail: Resend is not configured.");
      return { error: "Resend not configured" };
    }

    const verifiedDomain = process.env.RESEND_DOMAIN;
    const isTestingMode = !verifiedDomain;
    
    let finalTo = to;
    let finalFrom = isTestingMode 
      ? "BizCall MK <onboarding@resend.dev>" 
      : `BizCall MK <notifications@${verifiedDomain}>`;

    if (isTestingMode) {
      finalTo = "artinalimi69@gmail.com"; 
      console.log(`[TEST MODE] Redirecting email for ${to} to ${finalTo}`);
      text = `[INTENDED FOR: ${to}]\n\n${text}`;
    }

    const { data, error } = await resend.emails.send({
      from: finalFrom, 
      to: [finalTo],
      subject: subject,
      text: text,
    });

    if (error) {
      console.error("Resend error:", error);
      return { error };
    }

    return { ok: true, id: data.id };
  } catch (err) {
    console.error("Email send error:", err);
    return { error: err };
  }
}

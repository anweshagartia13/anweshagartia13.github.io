import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const notificationEmail = process.env.NOTIFICATION_EMAIL || "admin@leaddesk.com";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendLeadNotificationEmail(lead: {
  name: string;
  email: string;
  budget: string;
  message: string;
  createdAt?: Date;
}) {
  const submissionTime = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const emailHtml = `
    <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #090d16; color: #f3f4f6; border-radius: 12px; overflow: hidden; border: 1px solid #1f293d; padding: 24px;">
      <div style="border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #6366f1; margin: 0 0 6px 0; font-size: 22px;">⚡ New Lead Captured!</h2>
        <p style="color: #9ca3af; margin: 0; font-size: 14px;">LeadDesk Mini Lead Alert System</p>
      </div>

      <div style="background: #111827; border-radius: 8px; padding: 18px; margin-bottom: 20px; border: 1px solid #1f2937;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; width: 140px;">Full Name:</td>
            <td style="padding: 8px 0; color: #ffffff; font-weight: 600; font-size: 15px;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Email Address:</td>
            <td style="padding: 8px 0; color: #6366f1; font-weight: 600; font-size: 15px;"><a href="mailto:${lead.email}" style="color: #818cf8; text-decoration: none;">${lead.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Budget Range:</td>
            <td style="padding: 8px 0; color: #10b981; font-weight: 600; font-size: 15px;">${lead.budget}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Submitted At:</td>
            <td style="padding: 8px 0; color: #d1d5db; font-size: 14px;">${submissionTime}</td>
          </tr>
        </table>
      </div>

      <div style="background: #111827; border-radius: 8px; padding: 18px; margin-bottom: 20px; border: 1px solid #1f2937;">
        <p style="color: #9ca3af; margin: 0 0 8px 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message / Project Brief</p>
        <p style="color: #e5e7eb; margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${lead.message}</p>
      </div>

      <div style="text-align: center; padding-top: 10px;">
        <a href="https://leaddesk-mini.vercel.app/admin" style="display: inline-block; background: #4f46e5; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">Open Admin Dashboard &rarr;</a>
      </div>
    </div>
  `;

  if (!resend) {
    console.log("[Resend Email Sim] API key missing. Email summary:", {
      to: notificationEmail,
      subject: `New Lead: ${lead.name} (${lead.budget})`,
      lead,
    });
    return { success: true, simulated: true };
  }

  try {
    const data = await resend.emails.send({
      from: "LeadDesk Mini <onboarding@resend.dev>",
      to: [notificationEmail],
      subject: `⚡ New Lead: ${lead.name} (${lead.budget})`,
      html: emailHtml,
    });
    return { success: true, data };
  } catch (error) {
    console.error("[Resend Email Error]:", error);
    return { success: false, error };
  }
}

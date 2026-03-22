import { NextResponse } from "next/server";
import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResend() {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, guests, date, contact, message } = body;

    const emailTo = process.env.EMAIL_TO || "kamal@sparkana.fr";

    const resend = getResend();

    await resend.emails.send({
      from: "Maison Saveur <onboarding@resend.dev>",
      to: emailTo,
      subject: `Nouvelle demande de reservation - ${type}`,
      html: `
        <h2>Nouvelle demande de reservation</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr>
            <td style="padding:8px;border-bottom:1px solid #dcc1b5;font-weight:bold;color:#99420d;">Type</td>
            <td style="padding:8px;border-bottom:1px solid #dcc1b5;">${type}</td>
          </tr>
          <tr>
            <td style="padding:8px;border-bottom:1px solid #dcc1b5;font-weight:bold;color:#99420d;">Invites</td>
            <td style="padding:8px;border-bottom:1px solid #dcc1b5;">${guests}</td>
          </tr>
          <tr>
            <td style="padding:8px;border-bottom:1px solid #dcc1b5;font-weight:bold;color:#99420d;">Date</td>
            <td style="padding:8px;border-bottom:1px solid #dcc1b5;">${date}</td>
          </tr>
          <tr>
            <td style="padding:8px;border-bottom:1px solid #dcc1b5;font-weight:bold;color:#99420d;">Contact</td>
            <td style="padding:8px;border-bottom:1px solid #dcc1b5;">${contact}</td>
          </tr>
          <tr>
            <td style="padding:8px;font-weight:bold;color:#99420d;">Message</td>
            <td style="padding:8px;">${message || "Aucun message"}</td>
          </tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 1. Send the internal alert to YOURSELF
    await resend.emails.send({
      from: 'Journal Entries Hub <qusai.ahmad@journalentrieshub.com>',
      to: 'qusaialahmad97@gmail.com', 
      subject: '🚀 New Hub Subscriber',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #334155;">
          <h2>New Professional Signup!</h2>
          <p>Email: <strong>${email}</strong></p>
          <p>This user just joined via the homepage subscription form.</p>
        </div>
      `,
    });

    // 2. Send the "Welcome" email to the SUBSCRIBER
    const data = await resend.emails.send({
      from: 'Qusai Ahmad <qusai.ahmad@journalentrieshub.com>',
      to: email,
      subject: 'Welcome to the Journal Entries Hub 📚',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #334155; line-height: 1.6;">
          <h1 style="color: #059669;">Welcome to the Hub!</h1>
          <p>Hi there,</p>
          <p>Thank you for joining <strong>Journal Entries Hub</strong>. You now have access to a professional-grade library of accounting logic and IFRS guides.</p>
          <p><strong>What to expect:</strong></p>
          <ul style="padding-left: 20px;">
            <li>Weekly deep-dives into IFRS 15, 16, and 9.</li>
            <li>Regional Tax updates (Jordanian VAT & Income Tax).</li>
            <li>Excel automation templates and SAP Python scripts.</li>
          </ul>
          <p>I’m glad to have you with us. Feel free to explore the library or reply to this email if you have specific accounting questions.</p>
          <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            <p style="font-size: 14px; margin-bottom: 0;"><strong>Qusai Ahmad</strong></p>
            <p style="font-size: 12px; color: #64748b; margin-top: 4px;">Founder, Journal Entries Hub</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Subscription Error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
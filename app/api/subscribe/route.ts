import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 1. ADD CONTACT TO YOUR SPECIFIC SEGMENT/AUDIENCE
    await resend.contacts.create({
      email: email,
      unsubscribed: false,
      // Using your new ID here
      audienceId: process.env.RESEND_AUDIENCE_ID as string,
    });

    // 2. INTERNAL NOTIFICATION (To admin@journalentrieshub.com)
    await resend.emails.send({
      from: 'JEH System <admin@journalentrieshub.com>',
      to: 'admin@journalentrieshub.com',
      subject: '🚀 New Hub Subscriber',
      html: `<p>New subscriber: <strong>${email}</strong> has been added to Segment ID: ${process.env.RESEND_AUDIENCE_ID}</p>`,
    });

    // 3. WELCOME EMAIL (To the User)
    await resend.emails.send({
      from: 'Qusai | Journal Entries Hub <support@journalentrieshub.com>',
      to: email,
      subject: 'Welcome to the Hub 📚',
      html: `
        <div style="font-family: sans-serif; color: #334155;">
          <h2 style="color: #059669;">You're in!</h2>
          <p>Thanks for joining the Hub. You'll now receive my technical updates.</p>
          <p>Explore the <a href="https://www.journalentrieshub.com/suite">ERP Suite</a> while you're here.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscription Error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { entryTitle, slug, feedback, type } = body;

    // We will set this environment variable in Step 3
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("Missing DISCORD_WEBHOOK_URL");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Format a nice-looking message for Discord
    const message = {
      embeds: [
        {
          title: type === 'positive' ? "👍 Positive Feedback" : "👎 Needs Improvement",
          color: type === 'positive' ? 3066993 : 15158332, // Emerald Green or Rose Red
          fields: [
            { name: "Entry", value: entryTitle, inline: true },
            { name: "Slug", value: `/${slug}`, inline: true },
            ...(feedback ? [{ name: "User Feedback", value: feedback }] : [])
          ],
          timestamp: new Date().toISOString(),
        }
      ]
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    if (!response.ok) throw new Error('Discord API error');

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Feedback submission failed:', error);
    return NextResponse.json({ error: "Failed to send feedback" }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

// Initialize Upstash Redis using the Vercel KV environment variables
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// GET: Fetch comments for a specific page
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });

    // Fetch the list of comments from Upstash Redis
    const comments = await redis.lrange(`comments:${slug}`, 0, -1);
    
    return NextResponse.json(comments || []);
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return NextResponse.json({ error: 'Failed to load comments' }, { status: 500 });
  }
}

// POST: Save new comment and ping Discord
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, comment, slug } = body;

    // 1. Save the comment to Upstash Redis
    const newComment = {
      name: name || "Anonymous Accountant",
      text: comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now()
    };
    
    // lpush adds the newest comment to the top of the list
    await redis.lpush(`comments:${slug}`, newComment);

    // 2. Ping your new specific Comments channel on Discord
    const webhookUrl = process.env.DISCORD_COMMENTS_WEBHOOK_URL;

    if (webhookUrl) {
      const message = {
        embeds: [
          {
            title: "💬 New Website Comment",
            color: 3447003,
            fields: [
              { name: "Author", value: newComment.name, inline: true },
              { name: "Entry Page", value: `/${slug}`, inline: true },
              { name: "Message", value: comment }
            ],
            timestamp: new Date().toISOString(),
          }
        ]
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });
    }

    return NextResponse.json({ success: true, comment: newComment });
    
  } catch (error) {
    console.error('Comment submission failed:', error);
    return NextResponse.json({ error: "Failed to process comment" }, { status: 500 });
  }
}
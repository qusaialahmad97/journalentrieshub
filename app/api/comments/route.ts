import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });

    const comments = await redis.lrange(`comments:${slug}`, 0, -1);
    
    return NextResponse.json(comments || []);
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return NextResponse.json({ error: 'Failed to load comments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, comment, slug, parentId } = body;

    const newComment = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9), // Generates a simple unique ID
      parentId: parentId || null,
      name: name || "Anonymous Accountant",
      text: comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now()
    };
    
    await redis.lpush(`comments:${slug}`, newComment);

    const webhookUrl = process.env.DISCORD_COMMENTS_WEBHOOK_URL;

    if (webhookUrl) {
      const message = {
        embeds: [
          {
            title: parentId ? "↩️ New Reply to Comment" : "💬 New Website Comment",
            color: parentId ? 16753920 : 3447003, // Yellow for replies, Blue for main comments
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
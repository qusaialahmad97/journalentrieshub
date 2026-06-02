'use client';

import { useState } from 'react';

interface CommentProps {
  slug: string;
}

interface LocalComment {
  name: string;
  text: string;
  date: string;
}

export default function Comments({ slug }: CommentProps) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // This state holds comments temporarily for the current session
  const [localComments, setLocalComments] = useState<LocalComment[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    setStatus('idle');

    const authorName = name.trim() || 'Anonymous Accountant';

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: authorName, comment, slug }),
      });

      if (!res.ok) throw new Error('Network response was not ok');

      // Add to local display immediately for optimistic UI
      setLocalComments([
        ...localComments,
        {
          name: authorName,
          text: comment,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }
      ]);

      setName('');
      setComment('');
      setStatus('success');
      
      // Clear success message after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Failed to post comment:", error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-8">
      <h3 className="text-xl font-bold text-slate-900 mb-6 font-sans">
        Discussion & Community Questions
      </h3>

      {/* Render local comments */}
      {localComments.length > 0 && (
        <div className="mb-8 space-y-4">
          {localComments.map((c, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-800 text-sm">{c.name}</span>
                <span className="text-xs text-slate-400">{c.date}</span>
              </div>
              <p className="text-slate-600 text-sm whitespace-pre-wrap">{c.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Comment Form */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <h4 className="text-sm font-bold text-slate-800 mb-4">Leave a comment (No sign-up required)</h4>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name (Optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className="w-full md:w-1/2 p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
            />
          </div>
          <div>
            <textarea
              required
              rows={4}
              placeholder="Share your thoughts, ask a question, or clarify a standard..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isSubmitting}
              className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>

            {status === 'success' && (
              <span className="text-sm font-medium text-emerald-600">Comment posted!</span>
            )}
            {status === 'error' && (
              <span className="text-sm font-medium text-rose-600">Something went wrong.</span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
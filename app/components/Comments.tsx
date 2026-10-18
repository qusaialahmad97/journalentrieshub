'use client';

import { useState, useEffect, useRef } from 'react';

interface CommentProps {
  slug: string;
}

interface LocalComment {
  id: string;
  parentId?: string | null;
  name: string;
  text: string;
  date: string;
}

export default function Comments({ slug }: CommentProps) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [localComments, setLocalComments] = useState<LocalComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // New state to track if we are replying to someone
  const [replyingTo, setReplyingTo] = useState<LocalComment | null>(null);
  
  // Reference to scroll to the form when hitting "Reply"
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?slug=${slug}&t=${Date.now()}`, {
          cache: 'no-store'
        });
        
        if (res.ok) {
          const data = await res.json();
          setLocalComments(data);
        }
      } catch (error) {
        console.error("Failed to load comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [slug]);

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
        // Send the parentId if we are replying to someone
        body: JSON.stringify({ 
          name: authorName, 
          comment, 
          slug, 
          parentId: replyingTo?.id || null 
        }),
      });

      if (!res.ok) throw new Error('Network response was not ok');
      
      const data = await res.json();

      setLocalComments([data.comment, ...localComments]);

      setName('');
      setComment('');
      setReplyingTo(null); // Reset reply state after posting
      setStatus('success');
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Failed to post comment:", error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplyClick = (parentComment: LocalComment) => {
    setReplyingTo(parentComment);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper functions to separate main comments from replies
  const topLevelComments = localComments.filter((c) => !c.parentId);
  const getReplies = (parentId: string) => 
    localComments.filter((c) => c.parentId === parentId).reverse(); // Reverse so oldest replies show first

  return (
    <section className="mt-8">
      <h3 className="text-xl font-bold text-slate-900 mb-6 font-sans">
        Discussion & Community Questions
      </h3>

      {isLoading ? (
        <p className="text-sm text-slate-500 mb-8 animate-pulse">Loading comments...</p>
      ) : topLevelComments.length > 0 ? (
        <div className="mb-8 space-y-6">
          {topLevelComments.map((mainComment) => (
            <div key={mainComment.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              {/* Main Comment */}
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-800 text-sm">{mainComment.name}</span>
                  <span className="text-xs text-slate-400">{mainComment.date}</span>
                </div>
                <p className="text-slate-600 text-sm whitespace-pre-wrap mb-3">{mainComment.text}</p>
                <button 
                  onClick={() => handleReplyClick(mainComment)}
                  className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-wider"
                >
                  Reply
                </button>
              </div>

              {/* Replies Section */}
              {getReplies(mainComment.id).length > 0 && (
                <div className="bg-slate-50 border-t border-slate-100 p-5 space-y-4">
                  {getReplies(mainComment.id).map((reply) => (
                    <div key={reply.id} className="pl-4 border-l-2 border-slate-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-700 text-sm">{reply.name}</span>
                        <span className="text-xs text-slate-400">{reply.date}</span>
                      </div>
                      <p className="text-slate-600 text-sm whitespace-pre-wrap">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500 mb-8 italic">No comments yet. Be the first to start the discussion!</p>
      )}

      {/* Comment Form */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        
        {/* Reply Indicator Badge */}
        {replyingTo ? (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-3 rounded-lg mb-4">
            <span className="text-sm text-emerald-800">
              Replying to <span className="font-bold">{replyingTo.name}</span>
            </span>
            <button 
              onClick={() => setReplyingTo(null)}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-800 px-2 py-1"
            >
              Cancel Reply ✕
            </button>
          </div>
        ) : (
          <h4 className="text-sm font-bold text-slate-800 mb-4">Leave a comment (No sign-up required)</h4>
        )}
        
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
              placeholder={replyingTo ? `Write your reply to ${replyingTo.name}...` : "Share your thoughts, ask a question, or clarify a standard..."}
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
              {isSubmitting ? 'Posting...' : replyingTo ? 'Post Reply' : 'Post Comment'}
            </button>

            {status === 'success' && (
              <span className="text-sm font-medium text-emerald-600">Successfully posted!</span>
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
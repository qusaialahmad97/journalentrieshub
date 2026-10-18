'use client';

import { useState } from 'react';

interface UtilityPromptProps {
  entryTitle: string;
  slug: string;
}

export default function UtilityPrompt({ entryTitle, slug }: UtilityPromptProps) {
  const [step, setStep] = useState<'initial' | 'feedback' | 'submitted' | 'error'>('initial');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Send data to our secure Next.js API route
  const sendFeedback = async (type: 'positive' | 'negative', userText?: string) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entryTitle,
          slug,
          type,
          feedback: userText || '',
        }),
      });

      if (!res.ok) throw new Error('Network response was not ok');
      setStep('submitted');
    } catch (error) {
      console.error("Failed to send feedback:", error);
      setStep('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleYes = () => {
    sendFeedback('positive');
  };

  const handleNo = () => {
    setStep('feedback');
  };

  const submitTextFeedback = () => {
    if (!feedback.trim()) return; // Don't send empty feedback
    sendFeedback('negative', feedback);
  };

  // State: Error
  if (step === 'error') {
    return (
      <div className="p-4 mt-8 bg-rose-50 border border-rose-100 rounded-xl text-sm text-rose-700 text-center">
        Something went wrong sending your feedback, but we appreciate the effort!
      </div>
    );
  }

  // State: Thank You
  if (step === 'submitted') {
    return (
      <div className="p-4 mt-8 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-800 text-center font-medium">
        Thank you! Your feedback has been sent directly to our editorial team.
      </div>
    );
  }

  // State: Text Input Form
  if (step === 'feedback') {
    return (
      <div className="p-6 mt-8 bg-white border border-slate-200 rounded-xl shadow-sm">
        <p className="text-sm font-bold text-slate-800 mb-3">
          What was missing or unclear? Tell us what you were looking for.
        </p>
        <textarea
          className="w-full p-3 border border-slate-200 rounded-lg text-sm mb-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors bg-slate-50"
          rows={3}
          placeholder="e.g., I need more detail on the specific IFRS standard..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={isSubmitting}
        />
        <div className="flex gap-3">
          <button 
            onClick={submitTextFeedback}
            disabled={isSubmitting || !feedback.trim()}
            className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Feedback'}
          </button>
          <button 
            onClick={() => setStep('initial')}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // State: Initial Prompt
  return (
    <div className="p-6 mt-8 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <span className="text-sm font-bold text-slate-800">
        Did you find the exact entry you were looking for?
      </span>
      <div className="flex gap-3 w-full sm:w-auto">
        <button 
          onClick={handleYes}
          disabled={isSubmitting}
          className="flex-1 sm:flex-none px-5 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all text-slate-600"
        >
          👍 Yes
        </button>
        <button 
          onClick={handleNo}
          disabled={isSubmitting}
          className="flex-1 sm:flex-none px-5 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-all text-slate-600"
        >
          👎 No, I need more
        </button>
      </div>
    </div>
  );
}
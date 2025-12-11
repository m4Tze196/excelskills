'use client';

import { useState, useRef, useEffect } from 'react';
import { estimatePriceFromMessage } from '@/lib/pricing';
import { CostBadge } from './CostBadge';
import { hasSufficientBalance } from '@/lib/credits';

export interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function ChatInput({ onSend, disabled = false, isLoading = false }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Update cost estimate when message changes
  useEffect(() => {
    if (message.trim().length > 0) {
      const estimate = estimatePriceFromMessage(message.length);
      setEstimatedCost(estimate.average);
    } else {
      setEstimatedCost(0);
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled || isLoading) return;

    // Check if user has sufficient balance
    if (!hasSufficientBalance(estimatedCost)) {
      alert('Guthaben aufgebraucht! Bitte lade dein Guthaben auf.');
      return;
    }

    onSend(trimmedMessage);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isDisabled = disabled || isLoading;
  const showCostEstimate = message.trim().length > 0 && estimatedCost > 0;

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Stelle deine Excel-Frage..."
          disabled={isDisabled}
          rows={1}
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 pr-24 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ maxHeight: '200px' }}
        />

        <div className="absolute right-2 bottom-2 flex items-center gap-2">
          {isLoading && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isDisabled || !message.trim()}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      {showCostEstimate && (
        <div className="mt-2 flex items-center justify-between">
          <CostBadge cost={estimatedCost} label="Geschätzte Kosten" />
          <div className="text-xs text-muted-foreground">
            Enter zum Senden • Shift+Enter für neue Zeile
          </div>
        </div>
      )}
    </form>
  );
}

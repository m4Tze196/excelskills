'use client';

import { useEffect, useState } from 'react';
import { getCredits, formatBalance, estimateQueriesRemaining, type CreditsInfo } from '@/lib/credits';

export function CreditsDisplay() {
  const [credits, setCredits] = useState<CreditsInfo | null>(null);

  useEffect(() => {
    // Initialize and get credits
    const updateCredits = () => {
      const current = getCredits();
      setCredits(current);
    };

    updateCredits();

    // Listen for storage changes (from other tabs or after transactions)
    const handleStorageChange = () => {
      updateCredits();
    };

    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom event from same tab
    window.addEventListener('creditsUpdated', updateCredits);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('creditsUpdated', updateCredits);
    };
  }, []);

  if (!credits) {
    return (
      <div className="bg-muted border border-border rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-background/50 rounded w-24 mb-2"></div>
        <div className="h-6 bg-background/50 rounded w-16"></div>
      </div>
    );
  }

  const queriesRemaining = estimateQueriesRemaining();

  return (
    <div
      className={`border rounded-lg p-4 transition-colors ${
        credits.isLowBalance
          ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900'
          : 'bg-muted border-border'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-muted-foreground">Guthaben</div>
        {credits.isLowBalance && (
          <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Niedrig</span>
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <div className="text-2xl font-bold">{formatBalance(credits.balance)}</div>
        <div className="text-xs text-muted-foreground">
          ~{queriesRemaining} {queriesRemaining === 1 ? 'Anfrage' : 'Anfragen'}
        </div>
      </div>

      {credits.isLowBalance && (
        <div className="text-xs text-muted-foreground mb-3">
          Dein Guthaben ist niedrig. Bald wirst du Credits aufladen müssen.
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => {
            // TODO: Implement top-up functionality
            alert('Guthaben aufladen - wird in der nächsten Version implementiert');
          }}
          className="flex-1 text-xs bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded transition-colors"
        >
          Aufladen
        </button>
        <button
          onClick={() => {
            // TODO: Implement transaction history view
            alert('Transaktionshistorie - wird in der nächsten Version implementiert');
          }}
          className="flex-1 text-xs bg-background hover:bg-muted border border-border px-3 py-1.5 rounded transition-colors"
        >
          Historie
        </button>
      </div>
    </div>
  );
}

// Helper function to dispatch custom event when credits are updated
export function notifyCreditsUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('creditsUpdated'));
  }
}

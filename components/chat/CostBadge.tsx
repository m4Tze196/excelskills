'use client';

import { formatPrice } from '@/lib/pricing';

export interface CostBadgeProps {
  cost: number;
  label?: string;
  variant?: 'estimate' | 'actual';
}

export function CostBadge({ cost, label, variant = 'estimate' }: CostBadgeProps) {
  const isEstimate = variant === 'estimate';

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        isEstimate
          ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900'
          : 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-900'
      }`}
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>
        {label && `${label}: `}
        {isEstimate && '~'}
        {formatPrice(cost)}
      </span>
    </div>
  );
}

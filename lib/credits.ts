/**
 * Client-side credits management using localStorage
 * This is a simplified MVP implementation
 * For production, use server-side user authentication and database storage
 */

const CREDITS_STORAGE_KEY = 'excelskills_credits';
const INITIAL_CREDITS = 5.00; // €5.00 starting balance
const LOW_BALANCE_THRESHOLD = 1.00; // €1.00 warning threshold

export interface CreditsInfo {
  balance: number;
  isLowBalance: boolean;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: number;
}

/**
 * Initialize credits if not already set
 */
export function initializeCredits(): void {
  if (typeof window === 'undefined') return;

  const existing = localStorage.getItem(CREDITS_STORAGE_KEY);
  if (!existing) {
    const initialData: CreditsInfo = {
      balance: INITIAL_CREDITS,
      isLowBalance: false,
      transactions: [
        {
          id: generateId(),
          type: 'credit',
          amount: INITIAL_CREDITS,
          description: 'Initiales Testguthaben',
          timestamp: Date.now(),
        },
      ],
    };
    localStorage.setItem(CREDITS_STORAGE_KEY, JSON.stringify(initialData));
  }
}

/**
 * Get current credits information
 */
export function getCredits(): CreditsInfo {
  if (typeof window === 'undefined') {
    return {
      balance: 0,
      isLowBalance: true,
      transactions: [],
    };
  }

  initializeCredits();
  const data = localStorage.getItem(CREDITS_STORAGE_KEY);

  if (!data) {
    return {
      balance: INITIAL_CREDITS,
      isLowBalance: false,
      transactions: [],
    };
  }

  try {
    const parsed = JSON.parse(data) as CreditsInfo;
    return {
      ...parsed,
      isLowBalance: parsed.balance < LOW_BALANCE_THRESHOLD,
    };
  } catch {
    return {
      balance: INITIAL_CREDITS,
      isLowBalance: false,
      transactions: [],
    };
  }
}

/**
 * Check if user has sufficient balance
 */
export function hasSufficientBalance(requiredAmount: number): boolean {
  const credits = getCredits();
  return credits.balance >= requiredAmount;
}

/**
 * Deduct credits from balance
 */
export function deductCredits(amount: number, description: string): CreditsInfo {
  if (typeof window === 'undefined') {
    throw new Error('Credits can only be managed in the browser');
  }

  const credits = getCredits();

  if (credits.balance < amount) {
    throw new Error('Insufficient balance');
  }

  const newBalance = parseFloat((credits.balance - amount).toFixed(2));

  const transaction: Transaction = {
    id: generateId(),
    type: 'debit',
    amount,
    description,
    timestamp: Date.now(),
  };

  const updatedCredits: CreditsInfo = {
    balance: newBalance,
    isLowBalance: newBalance < LOW_BALANCE_THRESHOLD,
    transactions: [...credits.transactions, transaction],
  };

  localStorage.setItem(CREDITS_STORAGE_KEY, JSON.stringify(updatedCredits));

  return updatedCredits;
}

/**
 * Add credits to balance
 */
export function addCredits(amount: number, description: string): CreditsInfo {
  if (typeof window === 'undefined') {
    throw new Error('Credits can only be managed in the browser');
  }

  const credits = getCredits();
  const newBalance = parseFloat((credits.balance + amount).toFixed(2));

  const transaction: Transaction = {
    id: generateId(),
    type: 'credit',
    amount,
    description,
    timestamp: Date.now(),
  };

  const updatedCredits: CreditsInfo = {
    balance: newBalance,
    isLowBalance: newBalance < LOW_BALANCE_THRESHOLD,
    transactions: [...credits.transactions, transaction],
  };

  localStorage.setItem(CREDITS_STORAGE_KEY, JSON.stringify(updatedCredits));

  return updatedCredits;
}

/**
 * Reset credits to initial amount (for testing)
 */
export function resetCredits(): CreditsInfo {
  if (typeof window === 'undefined') {
    throw new Error('Credits can only be managed in the browser');
  }

  localStorage.removeItem(CREDITS_STORAGE_KEY);
  initializeCredits();
  return getCredits();
}

/**
 * Get transaction history
 */
export function getTransactionHistory(): Transaction[] {
  const credits = getCredits();
  return credits.transactions.sort((a, b) => b.timestamp - a.timestamp);
}

/**
 * Format balance for display
 */
export function formatBalance(balance: number): string {
  return `€${balance.toFixed(2)}`;
}

/**
 * Generate a unique transaction ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get low balance threshold
 */
export function getLowBalanceThreshold(): number {
  return LOW_BALANCE_THRESHOLD;
}

/**
 * Calculate estimated queries remaining
 */
export function estimateQueriesRemaining(averageQueryCost: number = 0.12): number {
  const credits = getCredits();
  return Math.floor(credits.balance / averageQueryCost);
}

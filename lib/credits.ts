// Credit management for localStorage (Phase 1 MVP)

const CREDITS_KEY = "excelskills_credits";
const TRANSACTIONS_KEY = "excelskills_transactions";

export type CreditTransaction = {
  id: string;
  type: "purchase" | "usage" | "bonus";
  amount: number;
  cost?: number;
  timestamp: number;
  description: string;
};

export type CreditBalance = {
  total: number;
  used: number;
  remaining: number;
};

// Initial free credits for new users
const INITIAL_CREDITS = 10.0;

export function getCredits(): CreditBalance {
  if (typeof window === "undefined") {
    return { total: 0, used: 0, remaining: 0 };
  }

  const stored = localStorage.getItem(CREDITS_KEY);

  if (!stored) {
    // First time user - give initial credits
    const initial: CreditBalance = {
      total: INITIAL_CREDITS,
      used: 0,
      remaining: INITIAL_CREDITS,
    };
    localStorage.setItem(CREDITS_KEY, JSON.stringify(initial));

    // Add welcome transaction
    addTransaction({
      id: `welcome-${Date.now()}`,
      type: "bonus",
      amount: INITIAL_CREDITS,
      timestamp: Date.now(),
      description: "Welcome bonus",
    });

    return initial;
  }

  return JSON.parse(stored);
}

export function deductCredits(amount: number, description: string): boolean {
  const credits = getCredits();

  if (credits.remaining < amount) {
    return false; // Insufficient credits
  }

  const updated: CreditBalance = {
    total: credits.total,
    used: credits.used + amount,
    remaining: credits.remaining - amount,
  };

  localStorage.setItem(CREDITS_KEY, JSON.stringify(updated));

  // Add transaction
  addTransaction({
    id: `usage-${Date.now()}`,
    type: "usage",
    amount: -amount,
    cost: amount,
    timestamp: Date.now(),
    description,
  });

  return true;
}

export function addCredits(amount: number, description: string): void {
  const credits = getCredits();

  const updated: CreditBalance = {
    total: credits.total + amount,
    used: credits.used,
    remaining: credits.remaining + amount,
  };

  localStorage.setItem(CREDITS_KEY, JSON.stringify(updated));

  // Add transaction
  addTransaction({
    id: `purchase-${Date.now()}`,
    type: "purchase",
    amount,
    timestamp: Date.now(),
    description,
  });
}

export function getTransactions(): CreditTransaction[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(TRANSACTIONS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function addTransaction(transaction: CreditTransaction): void {
  const transactions = getTransactions();
  transactions.unshift(transaction); // Add to beginning

  // Keep last 100 transactions
  const limited = transactions.slice(0, 100);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(limited));
}

export function resetCredits(): void {
  localStorage.removeItem(CREDITS_KEY);
  localStorage.removeItem(TRANSACTIONS_KEY);
}

// Credit packages for purchase
export const CREDIT_PACKAGES = [
  {
    id: "starter",
    name: "Starter Pack",
    credits: 50,
    price: 4.99,
    popular: false,
  },
  {
    id: "pro",
    name: "Pro Pack",
    credits: 150,
    price: 12.99,
    popular: true,
    savings: "13%",
  },
  {
    id: "expert",
    name: "Expert Pack",
    credits: 500,
    price: 39.99,
    popular: false,
    savings: "20%",
  },
];

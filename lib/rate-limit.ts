/**
 * Simple in-memory rate limiter
 * For production, use a distributed cache like Redis
 */

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // Time window in milliseconds
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number; // Unix timestamp when the limit resets
}

// Default: 10 requests per hour
export const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10'),
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || String(60 * 60 * 1000)), // 1 hour
};

interface RequestLog {
  count: number;
  resetTime: number;
}

// In-memory storage (use Redis in production)
const requestLog = new Map<string, RequestLog>();

/**
 * Clean up expired entries to prevent memory leaks
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, log] of requestLog.entries()) {
    if (log.resetTime < now) {
      requestLog.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
}

/**
 * Check if a request is allowed based on rate limiting
 *
 * @param identifier - Unique identifier (e.g., IP address or user ID)
 * @param config - Rate limit configuration
 * @returns Rate limit result indicating if the request is allowed
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = DEFAULT_RATE_LIMIT
): RateLimitResult {
  const now = Date.now();
  const log = requestLog.get(identifier);

  // No previous requests or window has expired
  if (!log || log.resetTime < now) {
    const resetTime = now + config.windowMs;
    requestLog.set(identifier, {
      count: 1,
      resetTime,
    });

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      resetTime,
    };
  }

  // Check if limit is exceeded
  if (log.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      resetTime: log.resetTime,
    };
  }

  // Increment counter
  log.count += 1;
  requestLog.set(identifier, log);

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - log.count,
    resetTime: log.resetTime,
  };
}

/**
 * Get the client IP address from a Request object
 *
 * @param request - Next.js Request object
 * @returns IP address or 'unknown'
 */
export function getClientIp(request: Request): string {
  // Try various headers that might contain the client IP
  const headers = new Headers(request.headers);

  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  return 'unknown';
}

/**
 * Format time until reset for user display
 *
 * @param resetTime - Unix timestamp when the limit resets
 * @returns Human-readable time string
 */
export function formatTimeUntilReset(resetTime: number): string {
  const now = Date.now();
  const diff = Math.max(0, resetTime - now);

  const minutes = Math.floor(diff / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);

  if (minutes > 0) {
    return `${minutes} Minute${minutes > 1 ? 'n' : ''} und ${seconds} Sekunde${seconds !== 1 ? 'n' : ''}`;
  }

  return `${seconds} Sekunde${seconds !== 1 ? 'n' : ''}`;
}

/**
 * Reset rate limit for a specific identifier
 * Useful for testing or administrative purposes
 *
 * @param identifier - Unique identifier to reset
 */
export function resetRateLimit(identifier: string): void {
  requestLog.delete(identifier);
}

/**
 * Get current rate limit status without incrementing
 *
 * @param identifier - Unique identifier
 * @param config - Rate limit configuration
 * @returns Current rate limit status
 */
export function getRateLimitStatus(
  identifier: string,
  config: RateLimitConfig = DEFAULT_RATE_LIMIT
): RateLimitResult {
  const now = Date.now();
  const log = requestLog.get(identifier);

  if (!log || log.resetTime < now) {
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests,
      resetTime: now + config.windowMs,
    };
  }

  return {
    success: log.count < config.maxRequests,
    limit: config.maxRequests,
    remaining: Math.max(0, config.maxRequests - log.count),
    resetTime: log.resetTime,
  };
}

/**
 * Pricing calculation for AI chat queries
 *
 * Price range: €0.05 - €0.50 per query
 * Based on: input/output tokens + complexity factor
 */

export interface PricingConfig {
  basePrice: number;
  maxPrice: number;
  pricePerInputToken: number;
  pricePerOutputToken: number;
  complexityMultiplier: {
    simple: number;    // Short answers (< 100 tokens)
    medium: number;    // Regular answers (100-500 tokens)
    complex: number;   // Long tutorials (> 500 tokens)
  };
}

export const DEFAULT_PRICING: PricingConfig = {
  basePrice: parseFloat(process.env.NEXT_PUBLIC_BASE_PRICE || '0.05'),
  maxPrice: parseFloat(process.env.NEXT_PUBLIC_MAX_PRICE || '0.50'),
  // Anthropic Claude Sonnet 4 pricing (approximate)
  pricePerInputToken: 0.000003,  // $3 per million input tokens
  pricePerOutputToken: 0.000015, // $15 per million output tokens
  complexityMultiplier: {
    simple: 1.0,
    medium: 1.2,
    complex: 1.5,
  },
};

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
}

export interface PriceEstimate {
  estimatedCost: number;
  breakdown: {
    baseCost: number;
    tokenCost: number;
    complexityFactor: number;
    totalBeforeCap: number;
  };
}

/**
 * Calculate the complexity tier based on output tokens
 */
function getComplexityTier(outputTokens: number): keyof PricingConfig['complexityMultiplier'] {
  if (outputTokens < 100) return 'simple';
  if (outputTokens < 500) return 'medium';
  return 'complex';
}

/**
 * Calculate the price for a chat query
 *
 * @param usage - Token usage (input and output tokens)
 * @param config - Pricing configuration (optional, uses defaults if not provided)
 * @returns Price estimate with breakdown
 */
export function calculatePrice(
  usage: TokenUsage,
  config: PricingConfig = DEFAULT_PRICING
): PriceEstimate {
  const { inputTokens, outputTokens } = usage;

  // Base cost calculation
  const baseCost = config.basePrice;

  // Token cost calculation
  const tokenCost =
    (inputTokens * config.pricePerInputToken) +
    (outputTokens * config.pricePerOutputToken);

  // Complexity factor
  const complexityTier = getComplexityTier(outputTokens);
  const complexityMultiplier = config.complexityMultiplier[complexityTier];

  // Total calculation
  const totalBeforeCap = (baseCost + tokenCost) * complexityMultiplier;

  // Apply max price cap
  const estimatedCost = Math.min(totalBeforeCap, config.maxPrice);

  return {
    estimatedCost: parseFloat(estimatedCost.toFixed(2)),
    breakdown: {
      baseCost: parseFloat(baseCost.toFixed(4)),
      tokenCost: parseFloat(tokenCost.toFixed(4)),
      complexityFactor: complexityMultiplier,
      totalBeforeCap: parseFloat(totalBeforeCap.toFixed(4)),
    },
  };
}

/**
 * Estimate price based on input message length
 * Used for showing cost preview before sending the query
 *
 * @param messageLength - Length of the input message in characters
 * @returns Estimated price range
 */
export function estimatePriceFromMessage(messageLength: number): {
  min: number;
  max: number;
  average: number;
} {
  // Rough estimate: ~4 characters per token
  const estimatedInputTokens = Math.ceil(messageLength / 4);

  // Estimate output tokens based on typical response patterns
  // Short question -> medium answer
  const minOutputTokens = Math.max(50, estimatedInputTokens * 0.5);
  const maxOutputTokens = estimatedInputTokens * 3;
  const avgOutputTokens = estimatedInputTokens * 1.5;

  const minPrice = calculatePrice({
    inputTokens: estimatedInputTokens,
    outputTokens: minOutputTokens,
  }).estimatedCost;

  const maxPrice = calculatePrice({
    inputTokens: estimatedInputTokens,
    outputTokens: maxOutputTokens,
  }).estimatedCost;

  const avgPrice = calculatePrice({
    inputTokens: estimatedInputTokens,
    outputTokens: avgOutputTokens,
  }).estimatedCost;

  return {
    min: minPrice,
    max: maxPrice,
    average: parseFloat(avgPrice.toFixed(2)),
  };
}

/**
 * Format price for display
 *
 * @param price - Price in euros
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  return `€${price.toFixed(2)}`;
}

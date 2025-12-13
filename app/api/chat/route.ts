import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";

// Rate limiting storage (in-memory for MVP)
// TODO: Move to Supabase rate_limits table
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Pricing per 1K tokens
const PRICING = {
  input: 0.003, // $0.003 per 1K input tokens
  output: 0.015, // $0.015 per 1K output tokens
};

// Rate limit: 10 messages per minute per IP
const RATE_LIMIT = {
  maxRequests: 10,
  windowMs: 60000, // 1 minute
};

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return { allowed: true };
  }

  if (userLimit.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, resetTime: userLimit.resetTime };
  }

  userLimit.count++;
  return { allowed: true };
}

function calculateCost(inputTokens: number, outputTokens: number): number {
  const inputCost = (inputTokens / 1000) * PRICING.input;
  const outputCost = (outputTokens / 1000) * PRICING.output;
  return Number((inputCost + outputCost).toFixed(4));
}

export async function POST(request: NextRequest) {
  try {
    // Step 1: Authenticate user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please log in to use the chat" },
        { status: 401 }
      );
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      const waitTime = rateLimit.resetTime
        ? Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        : 60;
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: `Too many requests. Please wait ${waitTime} seconds.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { message, conversationHistory = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Step 2: Check user's credit balance
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("credits_remaining")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    // Minimum credits required (estimated)
    const MIN_CREDITS_REQUIRED = 0.05; // ~$0.05 minimum
    if (profile.credits_remaining < MIN_CREDITS_REQUIRED) {
      return NextResponse.json(
        {
          error: "Insufficient credits",
          message: `You need at least ${MIN_CREDITS_REQUIRED} credits. Your balance: ${profile.credits_remaining.toFixed(2)}`,
          credits_remaining: profile.credits_remaining,
        },
        { status: 402 } // Payment Required
      );
    }

    // Check API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    // Build messages array
    const messages: Anthropic.MessageParam[] = [
      ...conversationHistory.map((msg: any) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user" as const, content: message },
    ];

    // Call Claude API
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: `You are an Excel expert assistant. Help users with Excel formulas, functions, data analysis, pivot tables, VBA, and best practices.

      Guidelines:
      - Provide clear, concise answers
      - Include Excel formulas when relevant
      - Explain step-by-step for complex tasks
      - Use examples when helpful
      - Be friendly and encouraging
      - If you're not sure, admit it and suggest resources`,
      messages,
    });

    // Calculate cost
    const inputTokens = response.usage.input_tokens;
    const outputTokens = response.usage.output_tokens;
    const cost = calculateCost(inputTokens, outputTokens);

    // Step 3: Deduct credits from user's balance
    // Use admin client to bypass RLS for credit deduction
    const adminSupabase = createAdminClient();

    // Create transaction record first
    const { data: transaction, error: transactionError } = await adminSupabase
      .from("transactions")
      .insert({
        user_id: user.id,
        type: "usage",
        credits_amount: -cost, // Negative for deduction
        status: "completed",
        payment_provider: "anthropic",
        metadata: {
          input_tokens: inputTokens,
          output_tokens: outputTokens,
          model: "claude-3-5-sonnet-20241022",
          message_preview: message.substring(0, 100),
        },
      })
      .select()
      .single();

    if (transactionError) {
      console.error("Failed to create transaction:", transactionError);
      // Don't fail the request, just log the error
    }

    // Deduct credits using the database function
    if (transaction) {
      const { error: deductError } = await adminSupabase.rpc("deduct_credits", {
        p_user_id: user.id,
        p_credits_amount: cost,
        p_transaction_id: transaction.id,
      });

      if (deductError) {
        console.error("Failed to deduct credits:", deductError);
        // Mark transaction as failed
        await adminSupabase
          .from("transactions")
          .update({ status: "failed" })
          .eq("id", transaction.id);
      }
    }

    // Get updated balance
    const { data: updatedProfile } = await supabase
      .from("user_profiles")
      .select("credits_remaining")
      .eq("id", user.id)
      .single();

    // Extract response text
    const responseText =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({
      response: responseText,
      usage: {
        inputTokens,
        outputTokens,
        totalTokens: inputTokens + outputTokens,
      },
      cost,
      credits_remaining: updatedProfile?.credits_remaining || profile.credits_remaining,
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);

    if (error?.status === 401) {
      return NextResponse.json(
        { error: "Invalid API key" },
        { status: 401 }
      );
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: "Claude API rate limit exceeded" },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process request", message: error.message },
      { status: 500 }
    );
  }
}

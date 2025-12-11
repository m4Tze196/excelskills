import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { calculatePrice, type TokenUsage } from '@/lib/pricing';
import { checkRateLimit, getClientIp, formatTimeUntilReset } from '@/lib/rate-limit';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const EXCEL_EXPERT_SYSTEM_PROMPT = `Du bist ein Excel-Experte mit jahrelanger Erfahrung.

Deine Aufgabe ist es, Fragen zu Microsoft Excel präzise, praxisnah und verständlich zu beantworten.

Richtlinien:
- Gib konkrete Formeln und Beispiele
- Erkläre Schritt-für-Schritt, wenn nötig
- Verwende Markdown-Formatierung für Code-Blöcke
- Sei präzise aber freundlich
- Wenn du Formeln zeigst, formatiere sie als Code: \`=FORMEL()\`
- Bei komplexeren Themen, gib praktische Beispiele

Beispiele für gute Antworten:
- Für SVERWEIS: Zeige die Syntax, erkläre die Parameter, gib ein konkretes Beispiel
- Für Pivot-Tabellen: Beschreibe die Schritte mit klaren Anweisungen
- Für Diagramme: Erkläre welcher Diagrammtyp für welche Daten geeignet ist

Antworte immer auf Deutsch.`;

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
}

export interface ChatResponse {
  answer: string;
  tokens: TokenUsage;
  estimatedCost: number;
  model: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
  resetTime?: number;
}

export async function POST(request: NextRequest) {
  try {
    // Check API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API-Konfigurationsfehler', details: 'Anthropic API-Schlüssel fehlt' },
        { status: 500 }
      );
    }

    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimitResult = checkRateLimit(clientIp);

    if (!rateLimitResult.success) {
      const timeUntilReset = formatTimeUntilReset(rateLimitResult.resetTime);
      return NextResponse.json(
        {
          error: 'Rate Limit erreicht',
          details: `Du hast das Limit von ${rateLimitResult.limit} Anfragen pro Stunde erreicht. Bitte versuche es in ${timeUntilReset} erneut.`,
          resetTime: rateLimitResult.resetTime,
        } as ErrorResponse,
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json() as ChatRequest;
    const { message, conversationHistory = [] } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Ungültige Anfrage', details: 'Nachricht darf nicht leer sein' },
        { status: 400 }
      );
    }

    // Build messages array for Claude
    const messages: Anthropic.MessageParam[] = [
      ...conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: message,
      },
    ];

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: EXCEL_EXPERT_SYSTEM_PROMPT,
      messages,
    });

    // Extract response text
    const answerContent = response.content[0];
    const answer = answerContent.type === 'text' ? answerContent.text : '';

    // Calculate tokens and cost
    const tokens: TokenUsage = {
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    };

    const priceEstimate = calculatePrice(tokens);

    // Build response
    const chatResponse: ChatResponse = {
      answer,
      tokens,
      estimatedCost: priceEstimate.estimatedCost,
      model: response.model,
    };

    return NextResponse.json(chatResponse, {
      headers: {
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);

    // Handle Anthropic API errors
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        {
          error: 'KI-Service-Fehler',
          details: error.message,
        } as ErrorResponse,
        { status: error.status || 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        error: 'Serverfehler',
        details: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.',
      } as ErrorResponse,
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Methode nicht erlaubt', details: 'Verwende POST für Chat-Anfragen' },
    { status: 405 }
  );
}

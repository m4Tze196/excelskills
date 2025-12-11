'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { CreditsDisplay } from '@/components/chat/CreditsDisplay';
import { ExamplePrompts } from '@/components/chat/ExamplePrompts';
import { CostBadge } from '@/components/chat/CostBadge';
import { deductCredits } from '@/lib/credits';
import { notifyCreditsUpdated } from '@/components/chat/CreditsDisplay';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  cost?: number;
}

interface ErrorResponse {
  error: string;
  details?: string;
  resetTime?: number;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    setError(null);
    setIsLoading(true);

    // Add user message to chat
    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      // Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ErrorResponse;

        // Handle rate limit error
        if (response.status === 429 && errorData.resetTime) {
          const resetDate = new Date(errorData.resetTime);
          setError(
            `${errorData.error}: ${errorData.details || 'Bitte versuche es später erneut.'}`
          );
        } else {
          setError(errorData.details || errorData.error || 'Ein Fehler ist aufgetreten');
        }

        setIsLoading(false);
        return;
      }

      // Deduct credits
      try {
        deductCredits(data.estimatedCost, `Chat-Anfrage (${data.tokens.outputTokens} Tokens)`);
        notifyCreditsUpdated();
      } catch (creditsError) {
        if (creditsError instanceof Error) {
          setError(creditsError.message);
          setIsLoading(false);
          return;
        }
      }

      // Add assistant response
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer,
        timestamp: Date.now(),
        cost: data.estimatedCost,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setError('Netzwerkfehler. Bitte überprüfe deine Verbindung und versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleClearChat = () => {
    if (confirm('Möchtest du den gesamten Chat-Verlauf löschen?')) {
      setMessages([]);
      setError(null);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Excel-Experte Chat</h1>
              <p className="text-sm text-muted-foreground">
                Erhalte präzise Antworten auf deine Excel-Fragen
              </p>
            </div>

            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Chat löschen
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-6 max-w-4xl">
              {messages.length === 0 ? (
                <ExamplePrompts onSelectPrompt={handleSelectPrompt} />
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index}>
                      <ChatMessage
                        role={message.role}
                        content={message.content}
                        timestamp={message.timestamp}
                      />
                      {message.cost && (
                        <div className="flex justify-end mb-2">
                          <CostBadge cost={message.cost} variant="actual" />
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="border-t border-border bg-red-50 dark:bg-red-950/20">
              <div className="container mx-auto px-4 py-3 max-w-4xl">
                <div className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-medium">Fehler</div>
                    <div>{error}</div>
                  </div>
                  <button
                    onClick={() => setError(null)}
                    className="ml-auto text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
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
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-border bg-background">
            <div className="container mx-auto px-4 py-4 max-w-4xl">
              <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {/* Sidebar - Credits Display */}
        <div className="hidden lg:block w-80 border-l border-border bg-muted/30 overflow-y-auto">
          <div className="p-6 space-y-6">
            <CreditsDisplay />

            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Tipps</span>
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Sei präzise in deinen Fragen für bessere Antworten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Du kannst Formeln direkt kopieren</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Jede Anfrage kostet €0,05 - €0,50</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Max. 10 Anfragen pro Stunde</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

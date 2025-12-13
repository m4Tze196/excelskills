"use client";

/**
 * Chat Page - AI Excel Assistant
 *
 * Integrated with Supabase for:
 * - User authentication
 * - Credit balance management
 * - Transaction logging
 */

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  cost?: number;
};

export default function ChatPage() {
  const t = useTranslations("chat");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [creditsRemaining, setCreditsRemaining] = useState(0);
  const [showBuyCreditsModal, setShowBuyCreditsModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check authentication on mount
  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // Redirect to login
        router.push("/auth/login");
        return;
      }

      setUser(user);

      // Fetch initial credit balance
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("credits_remaining")
        .eq("id", user.id)
        .single();

      if (profile) {
        setCreditsRemaining(profile.credits_remaining);
      }

      // Show welcome message
      setMessages([
        {
          id: "1",
          role: "assistant",
          content: t("greeting"),
          timestamp: new Date(),
        },
      ]);

      setLoading(false);
    }

    checkAuth();
  }, [router, t]);

  const handleSend = async () => {
    if (!input.trim() || isTyping || !user) return;

    // Check if user has enough credits
    const MIN_CREDITS_REQUIRED = 0.05;
    if (creditsRemaining < MIN_CREDITS_REQUIRED) {
      setShowBuyCreditsModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // User not authenticated
          router.push("/auth/login");
          return;
        }
        if (response.status === 402) {
          // Insufficient credits
          setShowBuyCreditsModal(true);
          setIsTyping(false);
          return;
        }
        throw new Error(data.message || data.error || "Failed to get response");
      }

      // Update credit balance from response
      if (data.credits_remaining !== undefined) {
        setCreditsRemaining(data.credits_remaining);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        cost: data.cost,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setError(err.message || "Failed to send message. Please try again.");

      // Remove the user message if request failed
      setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with credits */}
      <div className="sticky top-16 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-semibold">{t("title")}</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Credits</div>
              <div className="text-sm font-semibold">
                {creditsRemaining.toFixed(2)}€
              </div>
            </div>
            <button
              onClick={() => setShowBuyCreditsModal(true)}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Buy Credits
            </button>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="container mx-auto flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="whitespace-pre-wrap break-words">
                  {message.content}
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs opacity-70">
                  <span>{message.timestamp.toLocaleTimeString()}</span>
                  {message.cost && (
                    <span>• Cost: ${message.cost.toFixed(4)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg bg-muted p-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-foreground/50"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-foreground/50 [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-foreground/50 [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-lg border border-red-500 bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t("placeholder")}
                className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                rows={1}
                style={{
                  resize: "none",
                  minHeight: "52px",
                  maxHeight: "200px",
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isTyping ? "..." : t("send")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Credits Modal */}
      {showBuyCreditsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-2xl rounded-xl border border-border bg-card p-6 shadow-2xl">
            <h2 className="mb-4 text-2xl font-bold">Insufficient Credits</h2>
            <p className="mb-6 text-muted-foreground">
              You need more credits to continue chatting. Purchase credits to
              keep using the AI assistant.
            </p>

            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              {/* Credit packages - placeholder for now */}
              <div className="rounded-lg border border-border p-4">
                <div className="text-2xl font-bold">5€</div>
                <div className="text-sm text-muted-foreground">
                  ~100 messages
                </div>
              </div>
              <div className="rounded-lg border-2 border-primary p-4">
                <div className="mb-1 text-xs font-semibold uppercase text-primary">
                  Popular
                </div>
                <div className="text-2xl font-bold">10€</div>
                <div className="text-sm text-muted-foreground">
                  ~200 messages
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="text-2xl font-bold">25€</div>
                <div className="text-sm text-muted-foreground">
                  ~500 messages
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.push("/payment")}
                className="flex-1 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Buy Credits
              </button>
              <button
                onClick={() => setShowBuyCreditsModal(false)}
                className="rounded-lg border border-border px-4 py-3 font-semibold hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

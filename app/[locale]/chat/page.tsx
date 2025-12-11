"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getCredits, deductCredits, addCredits, CREDIT_PACKAGES } from "@/lib/credits";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  cost?: number;
};

export default function ChatPage() {
  const t = useTranslations("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: t("greeting"),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [credits, setCredits] = useState({ total: 0, used: 0, remaining: 0 });
  const [showCreditsModal, setShowCreditsModal] = useState(false);

  useEffect(() => {
    setCredits(getCredits());
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    if (credits.remaining < 0.01) {
      setShowCreditsModal(true);
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
        throw new Error(data.error || "Failed to get response");
      }

      const cost = data.cost || 0.01;
      const success = deductCredits(cost, `Chat: ${input.slice(0, 50)}`);

      if (!success) {
        setShowCreditsModal(true);
        setIsTyping(false);
        return;
      }

      setCredits(getCredits());

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        cost,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Error: ${error.message}. Please try again.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
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

  const handlePurchase = (packageId: string) => {
    const pkg = CREDIT_PACKAGES.find((p) => p.id === packageId);
    if (pkg) {
      addCredits(pkg.credits, `Purchased ${pkg.name}`);
      setCredits(getCredits());
      setShowCreditsModal(false);
      alert(`Added ${pkg.credits} credits! (Demo - no payment required)`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("title")}</h1>
            <p className="text-muted-foreground">{t("description")}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Credits</div>
            <div className="text-2xl font-bold text-primary">
              ${credits.remaining.toFixed(2)}
            </div>
            <button
              onClick={() => setShowCreditsModal(true)}
              className="text-xs text-primary hover:underline mt-1"
            >
              Buy more
            </button>
          </div>
        </div>

        <div className="flex-1 bg-card border border-border rounded-lg flex flex-col overflow-hidden shadow-lg">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={`text-xs ${
                        message.role === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {message.cost && (
                      <span className="text-xs text-muted-foreground ml-2">
                        -${message.cost.toFixed(4)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-4 bg-muted">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border p-4 bg-background">
            <div className="flex space-x-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t("placeholder")}
                className="flex-1 resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={1}
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
              >
                {t("send")}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{t("keyboardHint")}</p>
          </div>
        </div>
      </div>

      {showCreditsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Buy Credits</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {CREDIT_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`border rounded-lg p-4 ${
                    pkg.popular ? "border-primary border-2" : "border-border"
                  }`}
                >
                  {pkg.popular && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold mt-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold my-2">${pkg.price}</div>
                  <div className="text-sm text-muted-foreground mb-4">
                    {pkg.credits} credits
                    {pkg.savings && (
                      <span className="text-primary ml-2">Save {pkg.savings}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handlePurchase(pkg.id)}
                    className="w-full bg-primary text-primary-foreground rounded-lg py-2 hover:bg-primary/90"
                  >
                    Buy Now (Demo)
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowCreditsModal(false)}
              className="w-full border border-border rounded-lg py-2 hover:bg-muted"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

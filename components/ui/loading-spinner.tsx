"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

export function LoadingSpinner({ size = "md", message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 border-2 border-primary/30 rounded-full"></div>
        <div className="absolute inset-0 border-2 border-transparent border-t-primary rounded-full animate-spin"></div>
      </div>
      {message && <span className="text-sm text-muted-foreground">{message}</span>}
    </div>
  );
}

export function ChatLoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] md:max-w-[70%] rounded-lg p-4 bg-muted text-foreground">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-accent"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex items-center space-x-2">
            <LoadingSpinner size="sm" />
            <span className="text-sm text-muted-foreground">Thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";

interface SkillPreviewCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  level: string;
  color?: string;
}

export function SkillPreviewCard({
  icon,
  title,
  description,
  category,
  level,
  color = "primary",
}: SkillPreviewCardProps) {
  const colorClasses = {
    primary: "from-blue-500 to-blue-600",
    secondary: "from-purple-500 to-purple-600",
    success: "from-green-500 to-green-600",
    warning: "from-yellow-500 to-yellow-600",
    danger: "from-red-500 to-red-600",
    info: "from-cyan-500 to-cyan-600",
  }[color] || "from-blue-500 to-blue-600";

  return (
    <div className="group relative bg-card rounded-xl border border-border hover:border-primary/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Icon/Preview Area */}
      <div className={`relative h-48 bg-gradient-to-br ${colorClasses} p-6 flex items-center justify-center overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border border-white/20" />
            ))}
          </div>
        </div>

        {/* Icon */}
        <div className="relative z-10 text-white transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        {/* Level Badge */}
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
          {level}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            {category}
          </p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-colors pointer-events-none" />
    </div>
  );
}

// Specific preview icons for each skill type

export function VLookupIcon() {
  return (
    <svg
      className="w-20 h-20"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="15" width="25" height="50" rx="2" fill="white" opacity="0.9" />
      <rect x="45" y="15" width="25" height="50" rx="2" fill="white" opacity="0.9" />
      <path
        d="M35 25 L45 40 L35 40 Z"
        fill="white"
        opacity="0.9"
      />
      <circle cx="57" cy="40" r="8" fill="white" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export function PivotTableIcon() {
  return (
    <svg
      className="w-20 h-20"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="15" width="50" height="50" rx="3" fill="white" opacity="0.2" />
      <rect x="15" y="15" width="50" height="12" rx="3" fill="white" opacity="0.9" />
      <rect x="15" y="15" width="12" height="50" rx="3" fill="white" opacity="0.9" />
      <rect x="30" y="30" width="15" height="15" rx="2" fill="white" opacity="0.6" />
      <rect x="48" y="30" width="15" height="15" rx="2" fill="white" opacity="0.6" />
      <rect x="30" y="48" width="15" height="15" rx="2" fill="white" opacity="0.6" />
      <rect x="48" y="48" width="15" height="15" rx="2" fill="white" opacity="0.6" />
    </svg>
  );
}

export function ConditionalFormattingIcon() {
  return (
    <svg
      className="w-20 h-20"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="20" width="18" height="18" rx="2" fill="white" opacity="0.4" />
      <rect x="15" y="42" width="18" height="18" rx="2" fill="#4ade80" opacity="0.9" />
      <rect x="37" y="20" width="18" height="18" rx="2" fill="white" opacity="0.4" />
      <rect x="37" y="42" width="18" height="18" rx="2" fill="#4ade80" opacity="0.9" />
      <rect x="59" y="20" width="18" height="18" rx="2" fill="white" opacity="0.4" />
      <rect x="59" y="42" width="18" height="18" rx="2" fill="white" opacity="0.4" />
      <path d="M67 48 L71 52 L77 44" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IndexMatchIcon() {
  return (
    <svg
      className="w-20 h-20"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="10" width="60" height="60" rx="3" fill="white" opacity="0.2" />
      <rect x="10" y="10" width="60" height="15" rx="3" fill="white" opacity="0.4" />
      <rect x="10" y="10" width="15" height="60" rx="3" fill="white" opacity="0.4" />
      <rect x="28" y="40" width="20" height="15" rx="2" fill="white" opacity="0.9" />
      <circle cx="38" cy="47.5" r="3" fill="currentColor" />
      <path d="M28 30 L48 30" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M55 28 L55 58" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChartsIcon() {
  return (
    <svg
      className="w-20 h-20"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="45" width="10" height="20" rx="2" fill="white" opacity="0.9" />
      <rect x="30" y="35" width="10" height="30" rx="2" fill="white" opacity="0.9" />
      <rect x="45" y="25" width="10" height="40" rx="2" fill="white" opacity="0.9" />
      <rect x="60" y="40" width="10" height="25" rx="2" fill="white" opacity="0.9" />
      <path d="M15 15 Q30 20 45 10 T70 15" stroke="white" strokeWidth="3" fill="none" opacity="0.6" />
    </svg>
  );
}

export function SumIfIcon() {
  return (
    <svg
      className="w-20 h-20"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="15" width="50" height="50" rx="3" fill="white" opacity="0.2" />
      <text x="40" y="50" fontSize="36" fill="white" fontWeight="bold" textAnchor="middle">Σ</text>
      <path d="M25 25 L35 25 L30 30 L35 35 L25 35" stroke="white" strokeWidth="2.5" fill="none" opacity="0.8" />
      <circle cx="55" cy="55" r="8" fill="white" opacity="0.8" />
      <path d="M52 55 L54 57 L58 53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DataValidationIcon() {
  return (
    <svg
      className="w-20 h-20"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="20" y="25" width="40" height="30" rx="3" fill="white" opacity="0.9" />
      <path d="M30 35 L35 40 L48 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M55 35 L60 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M55 40 L60 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M55 45 L60 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MacrosIcon() {
  return (
    <svg
      className="w-20 h-20"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="15" width="50" height="50" rx="3" fill="white" opacity="0.2" />
      <path d="M25 30 L30 25 L35 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <path d="M30 25 L30 45" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      <circle cx="30" cy="50" r="5" fill="white" opacity="0.9" />
      <rect x="42" y="30" width="18" height="3" rx="1.5" fill="white" opacity="0.7" />
      <rect x="42" y="38" width="13" height="3" rx="1.5" fill="white" opacity="0.7" />
      <rect x="42" y="46" width="15" height="3" rx="1.5" fill="white" opacity="0.7" />
    </svg>
  );
}

export function PowerQueryIcon() {
  return (
    <svg
      className="w-20 h-20"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="25" cy="40" r="8" fill="white" opacity="0.6" />
      <circle cx="55" cy="30" r="8" fill="white" opacity="0.6" />
      <circle cx="55" cy="50" r="8" fill="white" opacity="0.9" />
      <path d="M33 40 L47 30" stroke="white" strokeWidth="3" opacity="0.8" />
      <path d="M33 40 L47 50" stroke="white" strokeWidth="3" opacity="0.8" />
      <path d="M40 25 L40 15 L50 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M45 10 L50 15 L45 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

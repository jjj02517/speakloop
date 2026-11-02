"use client";

import { Check, type LucideIcon } from "lucide-react";

type ScenarioCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
};

export default function ScenarioCard({
  icon: Icon,
  title,
  description,
  isSelected,
  onClick,
}: ScenarioCardProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onClick}
      className={`min-h-44 rounded-2xl border p-5 text-left transition-colors ${
        isSelected
          ? "border-primary-hover bg-primary/20"
          : "border-border bg-surface hover:border-primary-hover"
      }`}
    >
      <div className="mb-5 flex items-center justify-between">
        <Icon
          size={28}
          strokeWidth={1.8}
          className="text-accent"
          aria-hidden="true"
        />

        {isSelected && (
          <Check
            size={18}
            strokeWidth={2.5}
            className="text-foreground"
            aria-hidden="true"
          />
        )}
      </div>

      <h3 className="mb-2 font-bold">{title}</h3>

      <p className="text-sm text-muted">{description}</p>

      {isSelected && (
        <span className="mt-4 inline-block text-xs font-semibold">선택됨</span>
      )}
    </button>
  );
}

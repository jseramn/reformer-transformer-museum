"use client";

import { captureSuggestedPromptClicked } from "@/lib/analytics/posthog-client";
import { PillButton } from "@/components/ui/pill-button";
import { SUGGESTED_PROMPTS, type SuggestedPromptId } from "@/lib/constants";
import { useTranslations } from "@/lib/i18n/use-translations";

type PromptChipsProps = {
  selectedId: SuggestedPromptId | null;
  onSelect: (id: SuggestedPromptId, text: string) => void;
  disabled?: boolean;
};

export function PromptChips({
  selectedId,
  onSelect,
  disabled = false,
}: PromptChipsProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-wrap gap-sm" role="group" aria-label={t.experiment.suggestedLabel}>
      {SUGGESTED_PROMPTS.map((prompt) => {
        const isSelected = selectedId === prompt.id;
        const label =
          t.experiment.suggestedPrompts[
            String(prompt.id) as keyof typeof t.experiment.suggestedPrompts
          ];

        return (
          <PillButton
            key={prompt.id}
            type="button"
            variant={isSelected ? "primary" : "outline"}
            disabled={disabled}
            aria-pressed={isSelected}
            onClick={() => {
              captureSuggestedPromptClicked({
                prompt_index: prompt.id,
                prompt_length: prompt.text.length,
              });
              onSelect(prompt.id, prompt.text);
            }}
            className="text-left"
          >
            {label}
          </PillButton>
        );
      })}
    </div>
  );
}
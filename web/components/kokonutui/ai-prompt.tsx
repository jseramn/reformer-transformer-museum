"use client";

/**
 * Restored closer to original Kokonut ai-prompt per user request.
 * 
 * - Nice rounded card-like container (adapted to our dark tokens).
 * - Header area with text (adapted for the museum).
 * - Model picker dropdown (restored for UX/decoration — only "Reformer 2020" for now).
 * - Keeps the excellent auto-resize hook, enter-to-submit, send, controlled props.
 * 
 * The fancy "stunning" look the user liked is back in the prompt composer.
 * Themed to canvas / ink / hairline while preserving the original structure and motion.
 */

import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { cn } from "@/lib/utils";

interface AIPromptProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onSubmit?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
}

export default function AI_Prompt({
  value: controlledValue,
  onChange,
  placeholder = "Escribe el inicio de un pasaje…",
  onSubmit,
  disabled = false,
  className,
  maxLength = 300,
}: AIPromptProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState("");
  const value = isControlled ? controlledValue : internalValue;

  const setValue = (v: string) => {
    if (isControlled) {
      onChange?.(v);
    } else {
      setInternalValue(v);
    }
  };

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 72,
    maxHeight: 240,
  });

  // Model picker restored (decorative / UX — only one real model for the museum)
  const [selectedModel] = useState("Reformer 2020");
  const models = ["Reformer 2020"];

  const canSubmit = value.trim().length > 0 && !disabled;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit?.(value.trim());
    if (!isControlled) {
      setInternalValue("");
    }
    adjustHeight(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value.slice(0, maxLength);
    setValue(next);
    adjustHeight();
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Outer container resembling original Kokonut ai-prompt card */}
      <div className="rounded-2xl border border-hairline bg-canvas-soft p-1.5 pt-4">
        {/* Header row (adapted from original "is free this weekend!" style) */}
        <div className="mx-2 mb-2.5 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2">
            {/* Simple icon placeholder for the model */}
            <div className="h-3.5 w-3.5 rounded-full bg-ink/70" />
            <span className="text-xs tracking-tighter text-body">
              Reformer 2020 — museo interactivo
            </span>
          </div>
          <span className="text-xs tracking-tighter text-body-mid">
            Prueba el modelo
          </span>
        </div>

        <div className="relative">
          <div className="relative flex flex-col">
            <div className="overflow-y-auto" style={{ maxHeight: "320px" }}>
              <textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={maxLength}
                className={cn(
                  "w-full resize-none rounded-xl rounded-b-none border-none bg-canvas-card/60 px-4 py-3 text-body-md font-normal text-ink placeholder:text-body-mid focus-visible:ring-0 focus-visible:ring-offset-0",
                  "min-h-[72px]"
                )}
                aria-label="Prompt para el modelo Reformer"
              />
            </div>

            {/* Bottom bar with model picker (restored) + send */}
            <div className="flex h-14 items-center rounded-b-xl bg-canvas-card/60">
              <div className="absolute right-3 bottom-3 left-3 flex w-[calc(100%-24px)] items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Model picker — decorative, only one option for now */}
                  <div className="flex h-8 items-center gap-1 rounded-md border border-hairline bg-transparent px-2 text-xs text-ink">
                    <span>{selectedModel}</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Enviar al modelo"
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                  className={cn(
                    "rounded-lg border border-hairline p-2 text-ink transition-colors",
                    "hover:bg-[var(--color-border-translucent)]/10 disabled:opacity-40"
                  )}
                >
                  <ArrowRight className={cn("h-4 w-4", canSubmit ? "opacity-100" : "opacity-30")} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-1 text-right text-caption-mono-sm text-body-mid">
        {value.length}/{maxLength}
      </div>
    </div>
  );
}

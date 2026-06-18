"use client";

import { useState } from "react";
import AI_Prompt from "@/components/kokonutui/ai-prompt";
import AITextLoading from "@/components/kokonutui/ai-text-loading";
import { CreativitySlider } from "@/components/experiment/creativity-slider";
import { PromptChips } from "@/components/experiment/prompt-chips";
import type { GenerateResponse, PlaygroundStatus } from "@/components/experiment/types";
import type { ApiErrorResponse, GenerationErrorCode } from "@/types";
import { EyebrowMono } from "@/components/ui/eyebrow-mono";
import { PillButton } from "@/components/ui/pill-button";
import { cn } from "@/lib/utils";
import { captureExperimentSubmitted } from "@/lib/analytics/posthog-client";
import {
  API_LIMITS,
  LENGTH_PRESETS,
  type LengthPresetKey,
  type SuggestedPromptId,
} from "@/lib/constants";
import { useTranslations } from "@/lib/i18n/use-translations";

const LENGTH_PRESET_KEYS: LengthPresetKey[] = ["short", "medium", "long"];

export function Playground() {
  const t = useTranslations();

  const [prompt, setPrompt] = useState("");
  const [selectedPromptId, setSelectedPromptId] = useState<SuggestedPromptId | null>(
    null,
  );
  const [temperature, setTemperature] = useState<number>(
    API_LIMITS.temperatureDefault,
  );
  const [lengthPreset, setLengthPreset] = useState<LengthPresetKey>("medium");
  const [status, setStatus] = useState<PlaygroundStatus>("idle");
  const [resultText, setResultText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Simple chat history for the playground "ventana de chat" experience
  type ChatMessage = { role: "user" | "model"; text: string };
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const isLoading = status === "loading";
  const canGenerate = prompt.trim().length >= API_LIMITS.promptMinLength && !isLoading;

  function getErrorMessage(code: GenerationErrorCode): string {
    const errorMessages: Record<GenerationErrorCode, string> = {
      VALIDATION_ERROR: t.errors.invalidInput,
      RATE_LIMITED: t.errors.rateLimit,
      MODAL_NOT_CONFIGURED: t.errors.server,
      MODAL_TIMEOUT: t.errors.timeout,
      MODAL_ERROR: t.errors.server,
      INTERNAL_ERROR: t.errors.unknown,
    };
    return errorMessages[code] ?? t.errors.unknown;
  }

  const lengthLabels: Record<LengthPresetKey, string> = {
    short: t.experiment.lengthShort,
    medium: t.experiment.lengthMedium,
    long: t.experiment.lengthLong,
  };

  async function handleGenerate(overridePrompt?: string) {
    const source = overridePrompt ?? prompt;
    const trimmedPrompt = source.trim();
    if (trimmedPrompt.length < API_LIMITS.promptMinLength) return;

    setStatus("loading");
    setErrorMessage("");
    setResultText("");

    // Push user message to chat history immediately for the playground window feel
    setMessages((prev) => [...prev, { role: "user", text: trimmedPrompt }]);

    const maxLength = LENGTH_PRESETS[lengthPreset];
    captureExperimentSubmitted({
      prompt_length: trimmedPrompt.length,
      temperature,
      max_length: maxLength,
    });

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: trimmedPrompt,
          temperature,
          max_length: LENGTH_PRESETS[lengthPreset],
        }),
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => ({}))) as ApiErrorResponse;
        throw new Error(
          errorBody.error
            ? getErrorMessage(errorBody.error)
            : t.errors.unknown,
        );
      }

      const data = (await response.json()) as GenerateResponse;
      setResultText(data.text);
      setStatus("success");

      // Append model response to the chat history (playground window)
      setMessages((prev) => [...prev, { role: "model", text: data.text }]);
    } catch (error) {
      setStatus("error");
      const errMsg = error instanceof TypeError ? t.errors.network : (error instanceof Error ? error.message : t.errors.unknown);
      setErrorMessage(errMsg);

      // Show the error as a model message in the chat for the playground UX
      setMessages((prev) => [...prev, { role: "model", text: errMsg }]);
    }
  }

  function handlePromptSelect(id: SuggestedPromptId, text: string) {
    setSelectedPromptId(id);
    setPrompt(text);
    setStatus("idle");
    setResultText("");
    setErrorMessage("");
  }

  return (
    <div className="flex flex-col gap-2xl">
      {/* The whole interaction is now a "playground chat window" per user request.
          Resembles a dedicated AI chat interface / ventana with the model. */}
      <div className="overflow-hidden rounded-2xl border border-hairline bg-canvas-card">
        {/* Window header bar */}
        <div className="flex items-center justify-between border-b border-hairline bg-canvas-soft/60 px-4 py-2 text-sm">
          <div className="font-medium text-ink">{t.experiment.playgroundWindowTitle}</div>
          <div className="text-caption-mono-sm text-body-mid">{t.experiment.playgroundWindowSubtitle}</div>
        </div>

        {/* Scrollable chat history */}
        <div className="max-h-[420px] overflow-y-auto p-4 space-y-4 bg-canvas/60" aria-live="polite">
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-body-mid text-sm py-8">
              {t.experiment.playgroundEmpty}
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "max-w-[85%] rounded-xl px-4 py-3 text-body-md whitespace-pre-wrap",
                msg.role === "user"
                  ? "ml-auto bg-[var(--color-border-translucent)]/30 text-ink"
                  : "mr-auto bg-canvas-soft text-body border border-hairline"
              )}
            >
              {msg.role === "model" && (
                <div className="text-caption-mono-sm uppercase tracking-wider text-body-mid mb-1">Reformer</div>
              )}
              {msg.text}
            </div>
          ))}

          {/* Inline loading / process inside the chat (uses the ai-text-loading) */}
          {isLoading && (
            <div className="mr-auto max-w-[85%] rounded-xl border border-hairline bg-canvas-soft px-4 py-3">
              <div className="text-caption-mono-sm uppercase tracking-wider text-body-mid mb-1">Reformer</div>
              <AITextLoading
                texts={((t.experiment as any).loadingPhases as string[]) ?? ["Pensando...", "Procesando...", "Generando..."]}
                interval={1200}
                className="text-body"
              />
            </div>
          )}
        </div>

        {/* Controls toolbar inside the window */}
        <div className="border-t border-hairline bg-canvas-soft/40 px-4 py-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <div className="flex-1">
              <CreativitySlider
                value={temperature}
                onChange={setTemperature}
                disabled={isLoading}
              />
            </div>

            <fieldset className="flex flex-col gap-sm">
              <legend className="text-body-sm font-normal text-body">
                {t.experiment.lengthLabel}
              </legend>
              <div className="flex flex-wrap gap-sm">
                {LENGTH_PRESET_KEYS.map((preset) => (
                  <PillButton
                    key={preset}
                    type="button"
                    variant={lengthPreset === preset ? "primary" : "outline"}
                    disabled={isLoading}
                    aria-pressed={lengthPreset === preset}
                    onClick={() => setLengthPreset(preset)}
                  >
                    {lengthLabels[preset]}
                  </PillButton>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        {/* Fancy prompt composer at the bottom (now looks like the original Kokonut one) */}
        <div className="border-t border-hairline p-3 bg-canvas">
          <AI_Prompt
            value={prompt}
            onChange={(next) => {
              setPrompt(next);
              setSelectedPromptId(null);
              if (status !== "loading") {
                setStatus("idle");
              }
            }}
            placeholder={t.experiment.promptPlaceholder}
            disabled={isLoading}
            maxLength={API_LIMITS.promptMaxLength}
            onSubmit={(submitted) => {
              setPrompt(submitted);
              setSelectedPromptId(null);
              handleGenerate(submitted);
            }}
          />
        </div>
      </div>

      {/* Suggested openings (quick starters for the chat) */}
      <div className="flex flex-col gap-sm">
        <EyebrowMono size="sm">{t.experiment.suggestedLabel}</EyebrowMono>
        <PromptChips
          selectedId={selectedPromptId}
          onSelect={handlePromptSelect}
          disabled={isLoading}
        />
      </div>

      {/* Warnings stay visible but outside the main window */}
      <div className="flex flex-col gap-sm text-body-sm text-body-mid">
        <p>{t.experiment.expectationWarning}</p>
        <p>{t.experiment.englishNote}</p>
      </div>
    </div>
  );
}
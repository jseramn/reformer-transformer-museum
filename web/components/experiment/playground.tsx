"use client";

import { useState } from "react";
import { CreativitySlider } from "@/components/experiment/creativity-slider";
import { PromptChips } from "@/components/experiment/prompt-chips";
import { ResultCard } from "@/components/experiment/result-card";
import type { GenerateResponse, PlaygroundStatus } from "@/components/experiment/types";
import type { ApiErrorResponse, GenerationErrorCode } from "@/types";
import { EyebrowMono } from "@/components/ui/eyebrow-mono";
import { PillButton } from "@/components/ui/pill-button";
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

  async function handleGenerate() {
    const trimmedPrompt = prompt.trim();
    if (trimmedPrompt.length < API_LIMITS.promptMinLength) return;

    setStatus("loading");
    setErrorMessage("");
    setResultText("");

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
    } catch (error) {
      setStatus("error");
      if (error instanceof TypeError) {
        setErrorMessage(t.errors.network);
        return;
      }
      setErrorMessage(
        error instanceof Error ? error.message : t.errors.unknown,
      );
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
      <div className="flex flex-col gap-md">
        <label htmlFor="experiment-prompt" className="text-body-sm text-body">
          {t.experiment.promptLabel}
        </label>
        <textarea
          id="experiment-prompt"
          value={prompt}
          maxLength={API_LIMITS.promptMaxLength}
          placeholder={t.experiment.promptPlaceholder}
          disabled={isLoading}
          onChange={(event) => {
            setPrompt(event.target.value);
            setSelectedPromptId(null);
            if (status !== "loading") {
              setStatus("idle");
            }
          }}
          rows={3}
          className="w-full resize-y rounded-sm border border-hairline bg-canvas-soft px-lg py-md text-body-md font-normal text-ink placeholder:text-body-mid focus:outline-none focus:ring-1 focus:ring-[var(--color-border-translucent)] disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-sm">
        <EyebrowMono size="sm">{t.experiment.suggestedLabel}</EyebrowMono>
        <PromptChips
          selectedId={selectedPromptId}
          onSelect={handlePromptSelect}
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-2xl md:grid-cols-2">
        <CreativitySlider
          value={temperature}
          onChange={setTemperature}
          disabled={isLoading}
        />

        <fieldset className="flex flex-col gap-sm border-0 p-0">
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

      <div className="flex flex-col gap-sm text-body-sm text-body-mid">
        <p>{t.experiment.expectationWarning}</p>
        <p>{t.experiment.englishNote}</p>
      </div>

      <div>
        <PillButton
          type="button"
          variant="primary"
          disabled={!canGenerate}
          onClick={handleGenerate}
          aria-disabled={!canGenerate}
        >
          {t.experiment.generate}
        </PillButton>
      </div>

      <ResultCard
        status={status}
        resultText={resultText}
        errorMessage={errorMessage}
      />
    </div>
  );
}
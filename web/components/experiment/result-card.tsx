"use client";

import AITextLoading from "@/components/kokonutui/ai-text-loading";
import { CardContent } from "@/components/ui/card-content";
import type { PlaygroundStatus } from "@/components/experiment/types";
import { useTranslations } from "@/lib/i18n/use-translations";

type ResultCardProps = {
  status: PlaygroundStatus;
  resultText: string;
  errorMessage: string;
};

export function ResultCard({ status, resultText, errorMessage }: ResultCardProps) {
  const t = useTranslations();

  const phases = (t.experiment as any).loadingPhases as string[] | undefined;

  const liveMessage =
    status === "loading"
      ? (phases?.[0] ?? t.experiment.loading)
      : status === "success"
        ? resultText
        : status === "error"
          ? errorMessage
          : "";

  return (
    <CardContent
      className="min-h-[12rem]"
      aria-live="polite"
      aria-busy={status === "loading"}
      aria-relevant="additions text"
    >
      {status === "idle" && (
        <p className="text-body-md text-body-mid">{t.experiment.resultIdle}</p>
      )}

      {status === "loading" && (
        <AITextLoading
          texts={phases ?? ["Thinking...", "Processing...", "Generating...", "Almost..."]}
          interval={1350}
          className="text-base"
        />
      )}

      {status === "success" && (
        <p className="whitespace-pre-wrap text-body-md leading-relaxed text-body">
          {resultText}
        </p>
      )}

      {status === "error" && (
        <p className="text-body-md text-accent-sunset-soft" role="alert">
          {errorMessage}
        </p>
      )}

      <span className="sr-only">{liveMessage}</span>
    </CardContent>
  );
}
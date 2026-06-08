"use client";

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

  const liveMessage =
    status === "loading"
      ? t.experiment.loading
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
        <p className="text-body-md text-body">{t.experiment.loading}</p>
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
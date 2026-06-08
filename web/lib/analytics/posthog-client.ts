"use client";

import posthog from "posthog-js";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import type { Locale } from "@/lib/i18n/provider";

function isPostHogLoaded(): boolean {
  return (
    typeof window !== "undefined" &&
    Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) &&
    posthog.__loaded === true
  );
}

export function captureSectionView(sectionId: string): void {
  if (!isPostHogLoaded()) return;

  posthog.capture(ANALYTICS_EVENTS.SECTION_VIEW, {
    section_id: sectionId,
  });
}

export function captureLanguageChange(
  fromLocale: Locale,
  toLocale: Locale,
): void {
  if (!isPostHogLoaded()) return;

  posthog.capture(ANALYTICS_EVENTS.LANGUAGE_CHANGE, {
    from_locale: fromLocale,
    to_locale: toLocale,
  });
}

export function captureExperimentSubmitted(props: {
  prompt_length: number;
  temperature: number;
  max_length: number;
}): void {
  if (!isPostHogLoaded()) return;

  posthog.capture(ANALYTICS_EVENTS.EXPERIMENT_SUBMITTED, {
    prompt_length: props.prompt_length,
    temperature: props.temperature,
    max_length: props.max_length,
  });
}

export function captureSuggestedPromptClicked(props: {
  prompt_index: number;
  prompt_length: number;
}): void {
  if (!isPostHogLoaded()) return;

  posthog.capture(ANALYTICS_EVENTS.SUGGESTED_PROMPT_CLICKED, {
    prompt_index: props.prompt_index,
    prompt_length: props.prompt_length,
  });
}
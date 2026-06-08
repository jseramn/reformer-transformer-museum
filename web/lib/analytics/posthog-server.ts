import { PostHog } from "posthog-node";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import type { LengthPresetName } from "@/lib/constants";
import type { GenerationErrorCode } from "@/types";

let posthogClient: PostHog | null = null;

function getPostHog(): PostHog | null {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!apiKey) return null;

  if (!posthogClient) {
    posthogClient = new PostHog(apiKey, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      flushAt: 1,
      flushInterval: 0,
    });
  }

  return posthogClient;
}

type GenerationEventBase = {
  distinctId: string;
  prompt_length: number;
  temperature: number;
  length_preset: LengthPresetName | "custom";
};

export async function captureGenerationCompleted(
  props: GenerationEventBase & { latency_ms: number },
): Promise<void> {
  const client = getPostHog();
  if (!client) return;

  client.capture({
    distinctId: props.distinctId,
    event: ANALYTICS_EVENTS.GENERATION_COMPLETED,
    properties: {
      prompt_length: props.prompt_length,
      temperature: props.temperature,
      length_preset: props.length_preset,
      latency_ms: props.latency_ms,
      $process_person_profile: false,
    },
  });

  await client.shutdown();
  posthogClient = null;
}

export async function captureGenerationFailed(
  props: GenerationEventBase & {
    latency_ms: number;
    error_code: GenerationErrorCode;
  },
): Promise<void> {
  const client = getPostHog();
  if (!client) return;

  client.capture({
    distinctId: props.distinctId,
    event: ANALYTICS_EVENTS.GENERATION_FAILED,
    properties: {
      prompt_length: props.prompt_length,
      temperature: props.temperature,
      length_preset: props.length_preset,
      latency_ms: props.latency_ms,
      error_code: props.error_code,
      $process_person_profile: false,
    },
  });

  await client.shutdown();
  posthogClient = null;
}
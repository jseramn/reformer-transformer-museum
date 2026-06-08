import { NextResponse } from "next/server";

import { GenerateRequestSchema } from "@/lib/api/generate-schema";
import { checkRateLimit, getClientIp } from "@/lib/api/rate-limit";
import {
  captureGenerationCompleted,
  captureGenerationFailed,
} from "@/lib/analytics/posthog-server";
import { getLengthPreset } from "@/lib/constants";
import {
  callModalGenerate,
  ModalConfigError,
  ModalTimeoutError,
  ModalUpstreamError,
} from "@/lib/modal-client";
import type { ApiErrorResponse, GenerationErrorCode } from "@/types";

export const runtime = "nodejs";

function errorResponse(
  error: GenerationErrorCode,
  status: number,
  headers?: HeadersInit,
): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ error }, { status, headers });
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const distinctId = getClientIp(request);

  let promptLength = 0;
  let temperature = 0;
  let lengthPreset: ReturnType<typeof getLengthPreset> = "custom";

  try {
    const rateLimit = checkRateLimit(distinctId);
    if (!rateLimit.allowed) {
      const retryAfterSec = Math.ceil((rateLimit.retryAfterMs ?? 60_000) / 1000);
      await captureGenerationFailed({
        distinctId,
        prompt_length: 0,
        temperature: 0,
        length_preset: "custom",
        latency_ms: Date.now() - startedAt,
        error_code: "RATE_LIMITED",
      });
      return errorResponse("RATE_LIMITED", 429, {
        "Retry-After": String(retryAfterSec),
      });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      await captureGenerationFailed({
        distinctId,
        prompt_length: 0,
        temperature: 0,
        length_preset: "custom",
        latency_ms: Date.now() - startedAt,
        error_code: "VALIDATION_ERROR",
      });
      return errorResponse("VALIDATION_ERROR", 400);
    }

    const parsed = GenerateRequestSchema.safeParse(body);
    if (!parsed.success) {
      await captureGenerationFailed({
        distinctId,
        prompt_length:
          typeof body === "object" &&
          body !== null &&
          "prompt" in body &&
          typeof (body as { prompt: unknown }).prompt === "string"
            ? (body as { prompt: string }).prompt.length
            : 0,
        temperature: 0,
        length_preset: "custom",
        latency_ms: Date.now() - startedAt,
        error_code: "VALIDATION_ERROR",
      });
      return errorResponse("VALIDATION_ERROR", 400);
    }

    const { prompt, temperature: temp, max_length } = parsed.data;
    promptLength = prompt.length;
    temperature = temp;
    lengthPreset = getLengthPreset(max_length);

    const result = await callModalGenerate(parsed.data);
    const latencyMs = Date.now() - startedAt;

    await captureGenerationCompleted({
      distinctId,
      prompt_length: promptLength,
      temperature,
      length_preset: lengthPreset,
      latency_ms: latencyMs,
    });

    return NextResponse.json(result);
  } catch (error) {
    const latencyMs = Date.now() - startedAt;
    let errorCode: GenerationErrorCode = "INTERNAL_ERROR";
    let status = 500;

    if (error instanceof ModalConfigError) {
      errorCode = "MODAL_NOT_CONFIGURED";
      status = 503;
    } else if (error instanceof ModalTimeoutError) {
      errorCode = "MODAL_TIMEOUT";
      status = 504;
    } else if (error instanceof ModalUpstreamError) {
      errorCode = "MODAL_ERROR";
      status = error.status >= 500 ? 502 : 400;
    }

    await captureGenerationFailed({
      distinctId,
      prompt_length: promptLength,
      temperature,
      length_preset: lengthPreset,
      latency_ms: latencyMs,
      error_code: errorCode,
    });

    return errorResponse(errorCode, status);
  }
}

export function GET() {
  return errorResponse("VALIDATION_ERROR", 405);
}
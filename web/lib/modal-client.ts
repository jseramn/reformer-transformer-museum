import { MODAL_TIMEOUT_MS } from "@/lib/constants";

import type { GenerateRequest, GenerateResponse } from "@/lib/api/generate-schema";
import { GenerateResponseSchema } from "@/lib/api/generate-schema";

export class ModalConfigError extends Error {
  readonly code = "MODAL_NOT_CONFIGURED" as const;

  constructor() {
    super("MODAL_ENDPOINT_URL is not configured");
    this.name = "ModalConfigError";
  }
}

export class ModalTimeoutError extends Error {
  readonly code = "MODAL_TIMEOUT" as const;

  constructor() {
    super("Modal request timed out");
    this.name = "ModalTimeoutError";
  }
}

export class ModalUpstreamError extends Error {
  readonly code = "MODAL_ERROR" as const;
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ModalUpstreamError";
    this.status = status;
  }
}

function getModalGenerateUrl(): string {
  const base = process.env.MODAL_ENDPOINT_URL?.replace(/\/$/, "");
  if (!base) {
    throw new ModalConfigError();
  }
  return `${base}/generate`;
}

export async function callModalGenerate(
  payload: GenerateRequest,
): Promise<GenerateResponse> {
  const url = getModalGenerateUrl();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), MODAL_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      let message = `Modal returned ${response.status}`;
      try {
        const body = (await response.json()) as { detail?: string };
        if (body.detail) message = body.detail;
      } catch {
        // ignore non-JSON error bodies
      }
      throw new ModalUpstreamError(response.status, message);
    }

    const data: unknown = await response.json();
    return GenerateResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof ModalConfigError || error instanceof ModalUpstreamError) {
      throw error;
    }
    if (error instanceof Error && error.name === "AbortError") {
      throw new ModalTimeoutError();
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export function isModalConfigured(): boolean {
  return Boolean(process.env.MODAL_ENDPOINT_URL?.trim());
}
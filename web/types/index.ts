import type { LengthPresetName } from "@/lib/constants";

export type LengthPreset = LengthPresetName | "custom";

export type GenerationErrorCode =
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "MODAL_NOT_CONFIGURED"
  | "MODAL_TIMEOUT"
  | "MODAL_ERROR"
  | "INTERNAL_ERROR";

export type ApiErrorResponse = {
  error: GenerationErrorCode;
  message?: string;
};
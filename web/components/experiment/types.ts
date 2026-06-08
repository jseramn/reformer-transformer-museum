import type { LengthPresetKey } from "@/lib/constants";

export type PlaygroundStatus = "idle" | "loading" | "success" | "error";

export type GenerateRequest = {
  prompt: string;
  temperature: number;
  max_length: number;
};

export type GenerateResponse = {
  text: string;
  prompt: string;
};

export type GenerateErrorResponse = {
  error?: string;
};

export type PlaygroundState = {
  prompt: string;
  temperature: number;
  lengthPreset: LengthPresetKey;
  status: PlaygroundStatus;
  resultText: string;
  errorMessage: string;
};
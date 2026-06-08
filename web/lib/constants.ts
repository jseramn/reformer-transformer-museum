export const SUGGESTED_PROMPTS = [
  { id: 0, text: "Raskolnikov walked down the street" },
  { id: 1, text: "A few months later" },
  { id: 2, text: "He suddenly stopped and thought:" },
] as const;

export type SuggestedPromptId = (typeof SUGGESTED_PROMPTS)[number]["id"];

export const LENGTH_PRESETS = {
  short: 80,
  medium: 120,
  long: 150,
} as const;

export type LengthPresetKey = keyof typeof LENGTH_PRESETS;
export type LengthPresetName = LengthPresetKey;

export const API_LIMITS = {
  promptMinLength: 1,
  promptMaxLength: 300,
  temperatureMin: 0.1,
  temperatureMax: 1.5,
  temperatureDefault: 0.8,
  maxLengthMin: 50,
  maxLengthMax: 200,
  maxLengthDefault: LENGTH_PRESETS.long,
} as const;

export const MODEL = {
  PROMPT_MIN: API_LIMITS.promptMinLength,
  PROMPT_MAX: API_LIMITS.promptMaxLength,
  TEMPERATURE_MIN: API_LIMITS.temperatureMin,
  TEMPERATURE_MAX: API_LIMITS.temperatureMax,
  TEMPERATURE_DEFAULT: API_LIMITS.temperatureDefault,
  MAX_LENGTH_MIN: API_LIMITS.maxLengthMin,
  MAX_LENGTH_MAX: API_LIMITS.maxLengthMax,
  MAX_LENGTH_DEFAULT: API_LIMITS.maxLengthDefault,
} as const;

export const RATE_LIMIT = {
  MAX_REQUESTS: 10,
  WINDOW_MS: 60_000,
} as const;

export const MODAL_TIMEOUT_MS = 60_000;

export function getLengthPreset(maxLength: number): LengthPresetName | "custom" {
  for (const [name, value] of Object.entries(LENGTH_PRESETS)) {
    if (value === maxLength) {
      return name as LengthPresetName;
    }
  }
  return "custom";
}
import { z } from "zod";

import { MODEL } from "@/lib/constants";

export const GenerateRequestSchema = z.object({
  prompt: z
    .string()
    .min(MODEL.PROMPT_MIN, "Prompt must not be empty")
    .max(MODEL.PROMPT_MAX, `Prompt must be at most ${MODEL.PROMPT_MAX} characters`),
  temperature: z
    .number()
    .min(MODEL.TEMPERATURE_MIN)
    .max(MODEL.TEMPERATURE_MAX)
    .default(MODEL.TEMPERATURE_DEFAULT),
  max_length: z
    .number()
    .int()
    .min(MODEL.MAX_LENGTH_MIN)
    .max(MODEL.MAX_LENGTH_MAX)
    .default(MODEL.MAX_LENGTH_DEFAULT),
});

export const GenerateResponseSchema = z.object({
  text: z.string(),
  prompt: z.string(),
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;
export type GenerateResponse = z.infer<typeof GenerateResponseSchema>;
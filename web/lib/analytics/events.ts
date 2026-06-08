export const ANALYTICS_EVENTS = {
  SECTION_VIEW: "section_view",
  LANGUAGE_CHANGE: "language_change",
  EXPERIMENT_SUBMITTED: "experiment_submitted",
  SUGGESTED_PROMPT_CLICKED: "suggested_prompt_clicked",
  GENERATION_COMPLETED: "generation_completed",
  GENERATION_FAILED: "generation_failed",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
import { colors } from "@/lib/design-tokens";

export const timelineEntryIds = [
  "1866",
  "2020-paper",
  "2020-trained",
  "today",
] as const;

export type TimelineEntryId = (typeof timelineEntryIds)[number];

export type TimelineEntry = {
  id: TimelineEntryId;
  accentColor: string;
};

export const timelineEntries: TimelineEntry[] = [
  { id: "1866", accentColor: colors.accentSunset },
  { id: "2020-paper", accentColor: colors.accentDusk },
  { id: "2020-trained", accentColor: colors.accentTwilight },
  { id: "today", accentColor: colors.accentBreeze },
];
"use client";

import { CardContent } from "@/components/ui/card-content";
import { EyebrowMono } from "@/components/ui/eyebrow-mono";
import { SectionBand } from "@/components/ui/section-band";
import { useTranslations } from "@/lib/i18n/use-translations";
import { timelineEntries, type TimelineEntryId } from "./timeline-data";

export function TimelineSection() {
  const t = useTranslations();

  return (
    <SectionBand variant="content">
      <div className="flex flex-col gap-2xl" data-section="timeline">
        <div className="flex flex-col gap-lg">
          <EyebrowMono>{t.timeline.eyebrow}</EyebrowMono>
          <h2 className="text-display-md font-normal tracking-[-1.2px] text-ink">
            {t.timeline.title}
          </h2>
        </div>

        <ol className="grid gap-lg md:grid-cols-2">
          {timelineEntries.map((entry) => {
            const copy = t.timeline.entries[entry.id as TimelineEntryId];

            return (
              <li key={entry.id}>
                <CardContent className="flex h-full flex-col gap-md">
                  <div className="flex items-center gap-md">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: entry.accentColor }}
                      aria-hidden
                    />
                    <span className="font-mono text-caption-mono-sm uppercase text-body-mid">
                      {copy.year}
                    </span>
                  </div>
                  <h3 className="text-display-xs font-normal text-ink">
                    {copy.title}
                  </h3>
                  <p className="text-body-md font-normal text-body">
                    {copy.description}
                  </p>
                </CardContent>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionBand>
  );
}
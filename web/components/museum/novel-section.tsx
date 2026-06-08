"use client";

import { CardContent } from "@/components/ui/card-content";
import { EyebrowMono } from "@/components/ui/eyebrow-mono";
import { SectionBand } from "@/components/ui/section-band";
import { useTranslations } from "@/lib/i18n/use-translations";

export function NovelSection() {
  const t = useTranslations();

  return (
    <SectionBand variant="content">
      <div className="flex flex-col gap-2xl" data-section="novel">
        <div className="flex flex-col gap-lg">
          <EyebrowMono>{t.novel.eyebrow}</EyebrowMono>
          <h2 className="text-display-md font-normal tracking-[-1.2px] text-ink">
            {t.novel.title}
          </h2>
          <p className="max-w-[65ch] text-body-lg font-normal text-body">
            {t.novel.lead}
          </p>
        </div>

        <CardContent className="max-w-[65ch]">
          <h3 className="text-display-xs font-normal text-ink">
            {t.novel.cardTitle}
          </h3>
          <p className="mt-md text-body-md font-normal text-body">
            {t.novel.cardBody}
          </p>
        </CardContent>
      </div>
    </SectionBand>
  );
}
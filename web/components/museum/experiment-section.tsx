"use client";

import { Playground } from "@/components/experiment/playground";
import { EyebrowMono } from "@/components/ui/eyebrow-mono";
import { SectionBand } from "@/components/ui/section-band";
import { useTranslations } from "@/lib/i18n/use-translations";

export function ExperimentSection() {
  const t = useTranslations();

  return (
    <SectionBand id="experimenta" variant="content">
      <div className="flex flex-col gap-2xl">
        <div className="flex max-w-2xl flex-col gap-md">
          <EyebrowMono>{t.nav.experiment}</EyebrowMono>
          <h2 className="text-display-sm font-normal tracking-[-0.6px] text-ink">
            {t.experiment.title}
          </h2>
          <p className="text-body-lg text-body">{t.experiment.description}</p>
        </div>

        <Playground />
      </div>
    </SectionBand>
  );
}
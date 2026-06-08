"use client";

import { EyebrowMono } from "@/components/ui/eyebrow-mono";
import { PillButton } from "@/components/ui/pill-button";
import { SectionBand } from "@/components/ui/section-band";
import { useTranslations } from "@/lib/i18n/use-translations";

export function HeroSection() {
  const t = useTranslations();

  return (
    <SectionBand id="inicio" variant="hero">
      <div className="flex flex-col gap-xl" data-section="inicio">
        <EyebrowMono>{t.hero.eyebrow}</EyebrowMono>
        <h1 className="max-w-[18ch] text-display-md font-normal tracking-[-1.2px] text-ink md:text-display-xl md:tracking-[-2.4px]">
          {t.hero.title}
        </h1>
        <p className="max-w-[60ch] text-body-lg font-normal text-body">
          {t.hero.lead}
        </p>
        <div>
          <PillButton href="#experimenta" variant="outline">
            {t.hero.cta}
          </PillButton>
        </div>
      </div>
    </SectionBand>
  );
}
"use client";

import FlowField from "@/components/kokonutui/flow-field";
import { EyebrowMono } from "@/components/ui/eyebrow-mono";
import { PillButton } from "@/components/ui/pill-button";
import { SectionBand } from "@/components/ui/section-band";
import { useTranslations } from "@/lib/i18n/use-translations";

export function HeroSection() {
  const t = useTranslations();

  return (
    <SectionBand id="inicio" variant="hero" className="p-0 overflow-hidden">
      {/* Hero is now full-bleed / expansive per user request — not encapsulated in a small "cuadro".
         The FlowField + particles take significant initial screen real estate (min-h-screen).
         Content is overlaid without heavy boxing that makes the hero feel "pequeño". */}
      <FlowField
        theme="ocean"
        density="sparse"
        className="min-h-screen"
      >
        {/* Hero content overlaid on the full expansive particle field.
            Using pt- for top breathing room instead of symmetric heavy py-4xl so the visual feels large. */}
        <div
          className="relative z-10 mx-auto flex w-full max-w-container flex-col items-start gap-xl px-xl pt-20 pb-12 md:pt-28 md:pb-16"
          data-section="inicio"
        >
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
      </FlowField>
    </SectionBand>
  );
}
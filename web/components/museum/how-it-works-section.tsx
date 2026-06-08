"use client";

import { CardContent } from "@/components/ui/card-content";
import { EyebrowMono } from "@/components/ui/eyebrow-mono";
import { SectionBand } from "@/components/ui/section-band";
import { useTranslations } from "@/lib/i18n/use-translations";

const stepKeys = ["read", "patterns", "continue"] as const;

export function HowItWorksSection() {
  const t = useTranslations();

  return (
    <SectionBand id="como-funciona" variant="content">
      <div className="flex flex-col gap-2xl" data-section="como-funciona">
        <div className="flex flex-col gap-lg">
          <EyebrowMono>{t.howItWorks.eyebrow}</EyebrowMono>
          <h2 className="text-display-md font-normal tracking-[-1.2px] text-ink">
            {t.howItWorks.title}
          </h2>
        </div>

        <ol className="grid gap-lg md:grid-cols-3">
          {stepKeys.map((key, index) => {
            const step = t.howItWorks.steps[key];

            return (
              <li key={key}>
                <CardContent className="flex h-full flex-col gap-md">
                  <span className="font-mono text-caption-mono-sm uppercase text-body-mid">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-display-xs font-normal text-ink">
                    {step.title}
                  </h3>
                  <p className="text-body-md font-normal text-body">
                    {step.description}
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
"use client";

import { MorphicNavbar } from "@/components/kokonutui/morphic-navbar";
import { PillButton } from "@/components/ui/pill-button";
import { useI18n } from "@/lib/i18n/provider";
import { useTranslations } from "@/lib/i18n/use-translations";

export function SiteNav() {
  const t = useTranslations();
  const { locale, setLocale } = useI18n();

  // Build items for the Kokonut morphic navbar using current translations.
  // hrefs match the section ids used throughout the museum.
  const morphicItems = [
    { name: t.nav.home, href: "#inicio" },
    { name: t.nav.history, href: "#historia" },
    { name: t.nav.howItWorks, href: "#como-funciona" },
    { name: t.nav.experiment, href: "#experimenta" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-canvas">
      {/* Border-b removed per user request (no separating line under navbar) */}
      <nav
        className="mx-auto flex max-w-container flex-wrap items-center justify-between gap-lg px-xl py-md"
        aria-label="Main navigation"
      >
        <a href="#inicio" className="text-body-sm font-normal text-ink">
          {t.nav.brand}
        </a>

        <div className="flex flex-wrap items-center gap-sm">
          <MorphicNavbar items={morphicItems} />

          <div
            className="flex items-center gap-xs"
            role="group"
            aria-label="Language"
          >
            <PillButton
              variant={locale === "es" ? "primary" : "outline"}
              onClick={() => setLocale("es")}
              aria-pressed={locale === "es"}
            >
              {t.nav.languageEs}
            </PillButton>
            <PillButton
              variant={locale === "en" ? "primary" : "outline"}
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
            >
              {t.nav.languageEn}
            </PillButton>
          </div>
        </div>
      </nav>
    </header>
  );
}
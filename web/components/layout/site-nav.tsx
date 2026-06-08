"use client";

import { PillButton } from "@/components/ui/pill-button";
import { useI18n } from "@/lib/i18n/provider";
import { useTranslations } from "@/lib/i18n/use-translations";

const navItems = [
  { href: "#inicio", key: "home" as const },
  { href: "#historia", key: "history" as const },
  { href: "#como-funciona", key: "howItWorks" as const },
  { href: "#experimenta", key: "experiment" as const },
] as const;

export function SiteNav() {
  const t = useTranslations();
  const { locale, setLocale } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas">
      <nav
        className="mx-auto flex max-w-container flex-wrap items-center justify-between gap-lg px-xl py-md"
        aria-label="Main navigation"
      >
        <a href="#inicio" className="text-body-sm font-normal text-ink">
          {t.nav.brand}
        </a>

        <div className="flex flex-wrap items-center gap-sm">
          <ul className="flex flex-wrap items-center gap-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <PillButton href={item.href} variant="outline">
                  {t.nav[item.key]}
                </PillButton>
              </li>
            ))}
          </ul>

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
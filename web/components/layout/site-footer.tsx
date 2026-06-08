"use client";

import { PillButton } from "@/components/ui/pill-button";
import { useTranslations } from "@/lib/i18n/use-translations";

const SOURCE_LINKS = {
  reformer:
    "https://research.google/blog/reformer-the-efficient-transformer/",
  model: "https://huggingface.co/google/reformer-crime-and-punishment",
  novel: "https://www.gutenberg.org/ebooks/2554",
} as const;

const INFRA_LINKS = {
  vercel: "https://vercel.com",
  modal: "https://modal.com",
  posthog: "https://posthog.com",
} as const;

const LICENSE_URL = "https://www.gnu.org/licenses/gpl-3.0.html";
const AUTHOR_URL = "https://github.com/jseramn";

export function SiteFooter() {
  const t = useTranslations();
  const repoUrl = process.env.NEXT_PUBLIC_GITHUB_REPO_URL?.trim();
  const licenseHref = repoUrl ? `${repoUrl}/blob/main/LICENSE` : LICENSE_URL;

  return (
    <footer className="border-t border-hairline bg-canvas px-xl py-3xl">
      <div className="mx-auto flex max-w-container flex-col gap-2xl text-body-sm font-normal text-body-mid">
        <div className="flex flex-col gap-sm">
          <p className="text-body-sm text-body">
            {t.footer.builtBy}{" "}
            <a
              href={AUTHOR_URL}
              className="text-ink underline-offset-4 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              {t.footer.author}
            </a>
          </p>
          <p className="max-w-[70ch]">{t.footer.tagline}</p>
        </div>

        <div className="grid gap-xl md:grid-cols-3">
          <div className="flex flex-col gap-md">
            <p className="font-mono text-caption-mono-sm uppercase text-body-mid">
              {t.footer.sources}
            </p>
            <ul className="flex flex-col gap-sm">
              <li>
                <a
                  href={SOURCE_LINKS.reformer}
                  className="text-body hover:text-ink"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t.footer.sourceReformer}
                </a>
              </li>
              <li>
                <a
                  href={SOURCE_LINKS.model}
                  className="text-body hover:text-ink"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t.footer.sourceModel}
                </a>
              </li>
              <li>
                <a
                  href={SOURCE_LINKS.novel}
                  className="text-body hover:text-ink"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t.footer.sourceNovel}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-md">
            <p className="font-mono text-caption-mono-sm uppercase text-body-mid">
              {t.footer.infra}
            </p>
            <ul className="flex flex-col gap-sm">
              <li>
                <a
                  href={INFRA_LINKS.vercel}
                  className="text-body hover:text-ink"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t.footer.infraVercel}
                </a>
              </li>
              <li>
                <a
                  href={INFRA_LINKS.modal}
                  className="text-body hover:text-ink"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t.footer.infraModal}
                </a>
              </li>
              <li>
                <a
                  href={INFRA_LINKS.posthog}
                  className="text-body hover:text-ink"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t.footer.infraPosthog}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-md">
            <p className="font-mono text-caption-mono-sm uppercase text-body-mid">
              {t.footer.openSource}
            </p>
            <PillButton
              href={licenseHref}
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.footer.license}
            </PillButton>
            {repoUrl ? (
              <a
                href={repoUrl}
                className="text-body hover:text-ink"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            ) : null}
          </div>
        </div>

        <p className="max-w-[70ch] text-caption-mono-sm normal-case tracking-normal text-body-mid">
          {t.footer.privacyNote}
        </p>
      </div>
    </footer>
  );
}
import type { ReactNode } from "react";

type SectionBandVariant = "hero" | "content";

type SectionBandProps = {
  children: ReactNode;
  id?: string;
  variant?: SectionBandVariant;
  className?: string;
};

const variantStyles: Record<SectionBandVariant, string> = {
  hero: "py-4xl px-xl",
  content: "py-4xl px-xl",
};

export function SectionBand({
  children,
  id,
  variant = "content",
  className = "",
}: SectionBandProps) {
  return (
    <section
      id={id}
      className={`bg-canvas text-ink ${variantStyles[variant]} ${className}`.trim()}
    >
      <div className="mx-auto w-full max-w-container">{children}</div>
    </section>
  );
}
import type { ReactNode } from "react";

type EyebrowMonoProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "sm";
};

export function EyebrowMono({
  children,
  className = "",
  size = "default",
}: EyebrowMonoProps) {
  const sizeClass =
    size === "sm" ? "text-caption-mono-sm" : "text-caption-mono";

  return (
    <p
      className={`font-mono uppercase text-ink ${sizeClass} ${className}`.trim()}
    >
      {children}
    </p>
  );
}
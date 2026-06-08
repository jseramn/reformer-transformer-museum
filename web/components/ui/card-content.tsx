import type { ReactNode } from "react";

type CardContentProps = {
  children: ReactNode;
  className?: string;
};

export function CardContent({ children, className = "" }: CardContentProps) {
  return (
    <div
      className={`rounded-sm border border-hairline bg-canvas-card p-xl text-ink ${className}`.trim()}
    >
      {children}
    </div>
  );
}
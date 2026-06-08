import type { ComponentPropsWithoutRef } from "react";

type TextInputProps = ComponentPropsWithoutRef<"input">;

export function TextInput({ className = "", ...props }: TextInputProps) {
  return (
    <input
      className={`w-full rounded-sm border border-hairline bg-canvas-soft px-lg py-md text-body-md font-normal text-ink placeholder:text-body-mid focus:outline-none focus:ring-1 focus:ring-[var(--color-border-translucent)] ${className}`.trim()}
      {...props}
    />
  );
}
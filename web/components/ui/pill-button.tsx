import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PillButtonVariant = "outline" | "primary";

type PillButtonBaseProps = {
  children: ReactNode;
  variant?: PillButtonVariant;
  className?: string;
};

type PillButtonAsButton = PillButtonBaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type PillButtonAsLink = PillButtonBaseProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };

type PillButtonProps = PillButtonAsButton | PillButtonAsLink;

const baseStyles =
  "inline-flex items-center justify-center rounded-pill px-md py-xs text-button-md font-normal transition-colors min-h-[44px] md:min-h-0";

const variantStyles: Record<PillButtonVariant, string> = {
  outline:
    "border border-[var(--color-border-translucent)] bg-transparent text-ink",
  primary:
    "border border-primary bg-primary text-on-primary",
};

export function PillButton({
  children,
  variant = "outline",
  className = "",
  ...props
}: PillButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ComponentPropsWithoutRef<"button">;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
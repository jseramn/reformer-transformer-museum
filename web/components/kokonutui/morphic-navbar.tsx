"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavItem {
  name: string;
  href: string;
}

interface MorphicNavbarProps {
  items?: NavItem[];
  defaultHref?: string;
  className?: string;
  onItemClick?: (href: string) => void;
}

/**
 * Enhanced morphic navbar per user request for "más morfologicos".
 * 
 * Restored more of the original Kokonut morphic-navbar visual character:
 * - A rounded container bar (adapted "glass"/segmented look using our dark tokens).
 * - Items with conditional rounding so the bar feels connected (rounded-l/r on ends).
 * - Active item "morphs" with mx offset + stronger styling + font-medium (for visual pop).
 * - Smooth transitions.
 * 
 * Still uses our canvas/ink/hairline tokens. The individual items are close to pills but
 * the overall bar has the morphological/segmented animated active feel the user wants.
 * 
 * Header no longer has border-b (handled in SiteNav).
 */
export function MorphicNavbar({
  items = [
    { name: "Inicio", href: "#inicio" },
    { name: "Historia", href: "#historia" },
    { name: "Cómo funciona", href: "#como-funciona" },
    { name: "Experimenta", href: "#experimenta" },
  ],
  defaultHref = "#inicio",
  className,
  onItemClick,
}: MorphicNavbarProps) {
  const [activeHref, setActiveHref] = useState(defaultHref);

  useEffect(() => {
    const updateFromHash = () => {
      const hash = window.location.hash || defaultHref;
      setActiveHref(hash);
    };
    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);
    return () => window.removeEventListener("hashchange", updateFromHash);
  }, [defaultHref]);

  const handleClick = (href: string) => {
    setActiveHref(href);
    onItemClick?.(href);
  };

  return (
    <nav className={cn("flex items-center", className)} aria-label="Main navigation">
      {/* Morphic container bar - adapted from original Kokonut for more morphological feel */}
      <div className="flex items-center overflow-hidden rounded-xl border border-hairline bg-canvas-soft/70">
        {items.map((item, index, array) => {
          const isActive = activeHref === item.href || (item.href === "#inicio" && !activeHref);
          const isFirst = index === 0;
          const isLast = index === array.length - 1;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleClick(item.href)}
              className={cn(
                "flex items-center justify-center px-4 py-1.5 text-button-md font-normal text-ink transition-all duration-200",
                "hover:bg-[var(--color-border-translucent)]/10",
                isActive
                  ? "mx-1 rounded-lg bg-[var(--color-border-translucent)]/40 font-medium text-ink"
                  : cn(
                      isFirst && "rounded-l-xl",
                      isLast && "rounded-r-xl"
                    )
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MorphicNavbar;

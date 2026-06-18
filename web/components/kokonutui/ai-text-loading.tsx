"use client";

/**
 * DESIGN.md-compliant version of cycling "process" text.
 * 
 * Original Kokonut "stunning" implementation (font-bold, text-3xl, heavy gradient shimmer,
 * bg-clip-text, neutral colors) was replaced to obey the supreme design system:
 * - Weight 400 only (body typography)
 * - Use project tokens (text-body / text-ink, caption-mono for label)
 * - No gradients, no clip-text, no large display sizes for status
 * - Simple, austere cross-fade using motion only for the functional cycling
 * - Lives inside CardContent in ResultCard (hairline + canvas-card surface)
 *
 * The functional idea (cycling phases to show "the process" from submit to response)
 * is preserved per reform-frontend.md.
 */

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AITextLoadingProps {
  texts?: string[];
  className?: string;
  interval?: number;
}

export default function AITextLoading({
  texts = [
    "Thinking...",
    "Processing...",
    "Analyzing...",
    "Computing...",
    "Almost...",
  ],
  className,
  interval = 1500,
}: AITextLoadingProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, texts.length]);

  const currentText = texts[currentTextIndex];

  return (
    <div className={cn("flex flex-col items-center justify-center gap-sm py-6", className)}>
      {/* Small mono label for process context (compliant with eyebrow style) */}
      <div className="font-mono text-caption-mono-sm uppercase tracking-[1.4px] text-body-mid">
        Processing
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentTextIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-body-md font-normal text-body text-center"
        >
          {currentText}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useEffect, useRef, type RefObject } from "react";

import { captureSectionView } from "@/lib/analytics/posthog-client";

type UseSectionViewOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useSectionView<T extends HTMLElement>(
  sectionId: string,
  options: UseSectionViewOptions = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const hasCaptured = useRef(false);
  const { threshold = 0.25, rootMargin = "0px" } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element || hasCaptured.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some(
          (entry) => entry.isIntersecting && entry.intersectionRatio >= threshold,
        );

        if (isVisible && !hasCaptured.current) {
          hasCaptured.current = true;
          captureSectionView(sectionId);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionId, threshold, rootMargin]);

  return ref;
}
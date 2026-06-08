"use client";

import { useEffect } from "react";

import { captureSectionView } from "@/lib/analytics/posthog-client";

export function SectionViewTracker() {
  useEffect(() => {
    const seen = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.25) continue;

          const sectionId = entry.target.getAttribute("data-section");
          if (!sectionId || seen.has(sectionId)) continue;

          seen.add(sectionId);
          captureSectionView(sectionId);
        }
      },
      { threshold: 0.25 },
    );

    const elements = document.querySelectorAll("[data-section]");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
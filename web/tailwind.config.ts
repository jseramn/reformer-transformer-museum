import type { Config } from "tailwindcss";
import { colors, spacing, rounded, container } from "./lib/design-tokens";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        "on-primary": colors.onPrimary,
        "accent-sunset": colors.accentSunset,
        "accent-sunset-soft": colors.accentSunsetSoft,
        "accent-dusk": colors.accentDusk,
        "accent-twilight": colors.accentTwilight,
        "accent-breeze": colors.accentBreeze,
        "accent-midnight": colors.accentMidnight,
        canvas: colors.canvas,
        "canvas-soft": colors.canvasSoft,
        "canvas-card": colors.canvasCard,
        "canvas-mid": colors.canvasMid,
        hairline: colors.hairline,
        ink: colors.ink,
        "ink-hover": colors.inkHover,
        body: colors.body,
        "body-mid": colors.bodyMid,
      },
      spacing: {
        xxs: spacing.xxs,
        xs: spacing.xs,
        sm: spacing.sm,
        md: spacing.md,
        lg: spacing.lg,
        xl: spacing.xl,
        "2xl": spacing["2xl"],
        "3xl": spacing["3xl"],
        "4xl": spacing["4xl"],
      },
      borderRadius: {
        sm: rounded.sm,
        pill: rounded.pill,
        full: rounded.full,
      },
      maxWidth: {
        container: container.maxWidth,
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Geist Mono", "monospace"],
      },
      fontSize: {
        "display-xl": [
          "96px",
          { lineHeight: "96px", letterSpacing: "-2.4px", fontWeight: "400" },
        ],
        "display-lg": [
          "72px",
          { lineHeight: "72px", letterSpacing: "-1.8px", fontWeight: "400" },
        ],
        "display-md": [
          "48px",
          { lineHeight: "48px", letterSpacing: "-1.2px", fontWeight: "400" },
        ],
        "display-sm": [
          "32px",
          { lineHeight: "36px", letterSpacing: "-0.6px", fontWeight: "400" },
        ],
        "display-xs": [
          "20px",
          { lineHeight: "28px", letterSpacing: "0", fontWeight: "400" },
        ],
        "body-lg": [
          "18px",
          { lineHeight: "28px", letterSpacing: "0", fontWeight: "400" },
        ],
        "body-md": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0", fontWeight: "400" },
        ],
        "body-sm": [
          "14px",
          { lineHeight: "20px", letterSpacing: "0", fontWeight: "400" },
        ],
        "caption-mono": [
          "14px",
          { lineHeight: "20px", letterSpacing: "1.4px", fontWeight: "400" },
        ],
        "caption-mono-sm": [
          "12px",
          { lineHeight: "16px", letterSpacing: "1.2px", fontWeight: "400" },
        ],
        "button-md": [
          "14px",
          { lineHeight: "20px", letterSpacing: "0", fontWeight: "400" },
        ],
      },
    },
  },
};

export default config;
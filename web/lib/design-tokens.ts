/**
 * Design tokens for Museo Reformer — sourced from DESIGN.md.
 * Inter substitutes Universal Sans; Geist Mono for labels.
 */

export const colors = {
  primary: "#ffffff",
  onPrimary: "#0a0a0a",

  accentSunset: "#ff7a17",
  accentSunsetSoft: "#ffc285",
  accentDusk: "#7c3aed",
  accentTwilight: "#c4b5fd",
  accentBreeze: "#a0c3ec",
  accentMidnight: "#0d1726",

  canvas: "#0a0a0a",
  canvasSoft: "#1a1c20",
  canvasCard: "#191919",
  canvasMid: "#363a3f",
  hairline: "#212327",
  borderTranslucent: "rgba(255, 255, 255, 0.25)",

  ink: "#ffffff",
  inkHover: "#fafaf7",
  body: "#dadbdf",
  bodyMid: "#7d8187",
} as const;

export const spacing = {
  xxs: "2px",
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "32px",
  "3xl": "48px",
  "4xl": "64px",
} as const;

export const rounded = {
  none: "0px",
  sm: "8px",
  pill: "9999px",
  full: "9999px",
} as const;

export const breakpoints = {
  mobile: "767px",
  desktop: "768px",
} as const;

export const container = {
  maxWidth: "1200px",
} as const;

export type TypographyToken = {
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing: string;
};

export const typography = {
  displayXl: {
    fontSize: "96px",
    fontWeight: 400,
    lineHeight: "96px",
    letterSpacing: "-2.4px",
  },
  displayLg: {
    fontSize: "72px",
    fontWeight: 400,
    lineHeight: "72px",
    letterSpacing: "-1.8px",
  },
  displayMd: {
    fontSize: "48px",
    fontWeight: 400,
    lineHeight: "48px",
    letterSpacing: "-1.2px",
  },
  displaySm: {
    fontSize: "32px",
    fontWeight: 400,
    lineHeight: "36px",
    letterSpacing: "-0.6px",
  },
  displayXs: {
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: "28px",
    letterSpacing: "0",
  },
  bodyLg: {
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "28px",
    letterSpacing: "0",
  },
  bodyMd: {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0",
  },
  bodySm: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0",
  },
  captionMono: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "1.4px",
  },
  captionMonoSm: {
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "1.2px",
  },
  buttonMd: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0",
  },
} as const satisfies Record<string, TypographyToken>;

export const fonts = {
  sans: "var(--font-inter)",
  mono: "var(--font-geist-mono)",
} as const;

/** CSS custom property map — mirrored in globals.css */
export const cssVariables = {
  "--color-primary": colors.primary,
  "--color-on-primary": colors.onPrimary,
  "--color-accent-sunset": colors.accentSunset,
  "--color-accent-sunset-soft": colors.accentSunsetSoft,
  "--color-accent-dusk": colors.accentDusk,
  "--color-accent-twilight": colors.accentTwilight,
  "--color-accent-breeze": colors.accentBreeze,
  "--color-accent-midnight": colors.accentMidnight,
  "--color-canvas": colors.canvas,
  "--color-canvas-soft": colors.canvasSoft,
  "--color-canvas-card": colors.canvasCard,
  "--color-canvas-mid": colors.canvasMid,
  "--color-hairline": colors.hairline,
  "--color-border-translucent": colors.borderTranslucent,
  "--color-ink": colors.ink,
  "--color-ink-hover": colors.inkHover,
  "--color-body": colors.body,
  "--color-body-mid": colors.bodyMid,
  "--spacing-xxs": spacing.xxs,
  "--spacing-xs": spacing.xs,
  "--spacing-sm": spacing.sm,
  "--spacing-md": spacing.md,
  "--spacing-lg": spacing.lg,
  "--spacing-xl": spacing.xl,
  "--spacing-2xl": spacing["2xl"],
  "--spacing-3xl": spacing["3xl"],
  "--spacing-4xl": spacing["4xl"],
  "--rounded-none": rounded.none,
  "--rounded-sm": rounded.sm,
  "--rounded-pill": rounded.pill,
  "--rounded-full": rounded.full,
  "--container-max": container.maxWidth,
} as const;
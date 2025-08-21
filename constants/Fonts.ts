/**
 * Font family constants for the OutFits mobile app
 * Using Mona Sans as the primary font family with different weights
 */

export const Fonts = {
  // Mona Sans font family
  MonaSans: {
    Regular: "Mona-Sans-Regular",
    Medium: "Mona-Sans-Medium",
    SemiBold: "Mona-Sans-SemiBold",
    Bold: "Mona-Sans-Bold",
  },
  Hellix: {
    Bold: "Hellix-Bold",
  },
  // Legacy font (can be removed later if not needed)
  SpaceMono: "SpaceMono",
} as const;

// Type definitions for better TypeScript support
export type FontFamily =
  | (typeof Fonts.MonaSans)[keyof typeof Fonts.MonaSans]
  | typeof Fonts.SpaceMono;

// Helper function to get font family
export const getFont = (
  weight: keyof typeof Fonts.MonaSans = "Regular"
): string => {
  return Fonts.MonaSans[weight];
};

// Common font styles for easy reuse
export const FontStyles = {
  heading1: {
    fontFamily: Fonts.MonaSans.Bold,
    fontSize: 32,
    lineHeight: 40,
  },
  heading2: {
    fontFamily: Fonts.MonaSans.Bold,
    fontSize: 28,
    lineHeight: 36,
  },
  heading3: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 24,
    lineHeight: 32,
  },
  heading4: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 20,
    lineHeight: 28,
  },
  heading5: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 18,
    lineHeight: 24,
  },
  heading6: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 16,
    lineHeight: 22,
  },
  body: {
    fontFamily: Fonts.MonaSans.Regular,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: Fonts.MonaSans.Regular,
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontFamily: Fonts.MonaSans.Regular,
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 16,
    lineHeight: 24,
  },
  buttonSmall: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 14,
    lineHeight: 20,
  },
} as const;

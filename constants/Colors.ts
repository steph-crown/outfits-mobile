/**
 * OutFits Brand Colors
 * Official color palette for the OutFits mobile application
 */

// Brand color constants
export const BrandColors = {
  primary: "#DB0F4B",
  primaryBlack: "#050413",
  white: "#FFFFFF",
  primaryWhite: "#F7FAFC",
  primaryLighter: "#FDE2EA",
  black5: "#f2f2f2",
  black4: "#D9D8DB",
  black3: "#A0AEC0",
  black2: "#828282",
  blackLighter: "#ECEFF3",
} as const;

// Theme-based color configurations (COMMENTED OUT - No light/dark mode)
// export const Colors = {
//   light: {
//     text: BrandColors.primaryBlack,
//     background: BrandColors.white,
//     surface: BrandColors.primaryWhite,
//     primary: BrandColors.primary,
//     secondary: BrandColors.primaryLighter,
//     tint: BrandColors.primary,
//     icon: BrandColors.black3,
//     tabIconDefault: BrandColors.black3,
//     tabIconSelected: BrandColors.primary,
//     border: BrandColors.black4,
//     muted: BrandColors.black3,
//     card: BrandColors.white,
//   },
//   dark: {
//     text: BrandColors.primaryWhite,
//     background: BrandColors.primaryBlack,
//     surface: "#1A1A2E",
//     primary: BrandColors.primary,
//     secondary: BrandColors.primaryLighter,
//     tint: BrandColors.primary,
//     icon: BrandColors.black3,
//     tabIconDefault: BrandColors.black3,
//     tabIconSelected: BrandColors.primary,
//     border: "#2D2D3A",
//     muted: BrandColors.black3,
//     card: "#16162A",
//   },
// };

// Single theme colors (Light mode only)
export const Colors = {
  text: BrandColors.primaryBlack,
  background: BrandColors.white,
  surface: BrandColors.primaryWhite,
  primary: BrandColors.primary,
  secondary: BrandColors.primaryLighter,
  tint: BrandColors.primary,
  icon: BrandColors.black3,
  tabIconDefault: BrandColors.black3,
  tabIconSelected: BrandColors.primary,
  border: BrandColors.black4,
  muted: BrandColors.black3,
  card: BrandColors.white,
};

// Semantic color helpers
export const SemanticColors = {
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
} as const;

// Color utility functions
export const getColor = (colorName: keyof typeof BrandColors): string => {
  return BrandColors[colorName];
};

// Simplified color getter (no theme support)
export const getThemedColor = (colorName: keyof typeof Colors): string => {
  return Colors[colorName];
};

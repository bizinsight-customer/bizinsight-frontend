export const COLORS = {
  // Primary colors
  PRIMARY: {
    MAIN: "#684AFF",
    LIGHT: "#8E78FF",
    DARK: "#4832B3",
    CONTRAST: "#FFFFFF",
  },

  // Secondary colors
  SECONDARY: {
    MAIN: "#FF9E69",
    LIGHT: "#FFB88F",
    DARK: "#B36E49",
    CONTRAST: "#000000",
  },

  // Background colors
  BACKGROUND: {
    DEFAULT: "#FFFFFF",
    PAPER: "#F5F5F5",
  },

  // Common colors
  COMMON: {
    WHITE: "#FFFFFF",
    BLACK: "#000000",
    GREY: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },

  // Status colors
  STATUS: {
    SUCCESS: "#4CAF50",
    ERROR: "#F44336",
    WARNING: "#FF9800",
    INFO: "#2196F3",
  },
} as const;

// Type for the colors object
export type Colors = typeof COLORS;

// Helper type to get nested color values
export type ColorValue = string;

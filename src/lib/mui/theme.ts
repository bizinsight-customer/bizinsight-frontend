import { COLORS } from "@/constants/colors";
import { PaletteOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";

// Define custom palette colors
const palette: PaletteOptions = {
  primary: {
    main: COLORS.PRIMARY.MAIN,
    light: COLORS.PRIMARY.LIGHT,
    dark: COLORS.PRIMARY.DARK,
    contrastText: COLORS.PRIMARY.CONTRAST,
  },
  secondary: {
    main: COLORS.SECONDARY.MAIN,
    light: COLORS.SECONDARY.LIGHT,
    dark: COLORS.SECONDARY.DARK,
    contrastText: COLORS.SECONDARY.CONTRAST,
  },
  background: {
    default: COLORS.BACKGROUND.DEFAULT,
    paper: COLORS.BACKGROUND.PAPER,
  },
  error: {
    main: COLORS.STATUS.ERROR,
  },
  warning: {
    main: COLORS.STATUS.WARNING,
  },
  info: {
    main: COLORS.STATUS.INFO,
  },
  success: {
    main: COLORS.STATUS.SUCCESS,
  },
  grey: COLORS.COMMON.GREY,
};

// Create and export the theme
export const theme = createTheme({
  palette,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    // Add white background to all input fields
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.COMMON.WHITE,
          borderRadius: 8,
          "&:hover": {
            backgroundColor: COLORS.COMMON.WHITE,
          },
          "&.Mui-focused": {
            backgroundColor: COLORS.COMMON.WHITE,
          },
        },
      },
    },
    // Style for filled variant
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.COMMON.WHITE,
          "&:hover": {
            backgroundColor: COLORS.COMMON.WHITE,
          },
          "&.Mui-focused": {
            backgroundColor: COLORS.COMMON.WHITE,
          },
        },
      },
    },
    // Style for standard variant
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.COMMON.WHITE,
          "&:hover": {
            backgroundColor: COLORS.COMMON.WHITE,
          },
          "&.Mui-focused": {
            backgroundColor: COLORS.COMMON.WHITE,
          },
        },
      },
    },
    // Style for TextField component
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            backgroundColor: COLORS.COMMON.WHITE,
          },
        },
      },
    },
  },
});

// Type declaration for custom theme
declare module "@mui/material/styles" {
  interface Theme {
    // Add any custom theme properties here if needed
  }
  interface ThemeOptions {
    // Add any custom theme options here if needed
  }
}

/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { createTheme, Theme as MuiTheme } from "@mui/material/styles";

// Define simplified base components
// Note: In a real implementation, you should import these from your base files
// This is just to avoid errors without needing to create all those files
const colors = {
  background: {
    default: "#f0f2f5",
  },
  text: {
    main: "#7b809a",
    focus: "#7b809a",
  },
  transparent: {
    main: "transparent",
  },
  white: {
    main: "#ffffff",
    focus: "#ffffff",
  },
  black: {
    main: "#000000",
    focus: "#000000",
  },
  primary: {
    main: "#1976d2",
    focus: "#1565c0",
  },
  secondary: {
    main: "#9c27b0",
    focus: "#7b1fa2",
  },
  info: {
    main: "#2196f3",
    focus: "#1e88e5",
  },
  success: {
    main: "#4caf50",
    focus: "#43a047",
  },
  warning: {
    main: "#ff9800",
    focus: "#fb8c00",
  },
  error: {
    main: "#f44336",
    focus: "#e53935",
  },
  light: {
    main: "#f0f2f5",
    focus: "#e3e6f0",
  },
  dark: {
    main: "#344767",
    focus: "#2c3e50",
  },
  grey: {
    100: "#f8f9fa",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#6c757d",
    700: "#495057",
    800: "#343a40",
    900: "#212529",
  },
  gradients: {
    primary: {
      main: "#1976d2",
      state: "#1565c0",
    },
    secondary: {
      main: "#9c27b0",
      state: "#7b1fa2",
    },
    info: {
      main: "#2196f3",
      state: "#1e88e5",
    },
    success: {
      main: "#4caf50",
      state: "#43a047",
    },
    warning: {
      main: "#ff9800",
      state: "#fb8c00",
    },
    error: {
      main: "#f44336",
      state: "#e53935",
    },
    light: {
      main: "#f0f2f5",
      state: "#e3e6f0",
    },
    dark: {
      main: "#344767",
      state: "#2c3e50",
    },
  },
};

const breakpoints = {
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
};

const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
};

const boxShadows = {
  xs: "0 0 2px 0 rgba(0,0,0,0.1)",
  sm: "0 2px 4px -1px rgba(0,0,0,0.1)",
  md: "0 4px 6px -1px rgba(0,0,0,0.1)",
  lg: "0 10px 15px -3px rgba(0,0,0,0.1)",
  xl: "0 20px 25px -5px rgba(0,0,0,0.1)",
};

const borders = {
  borderRadius: {
    xs: "2px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    xxl: "24px",
  },
};

// Custom function types
interface CustomFunctions {
  boxShadow: (offset: number[], radius: number[], color: string, opacity: number, inset?: string) => string;
  hexToRgb: (color: string) => string;
  linearGradient: (color: string, colorState: string) => string;
  pxToRem: (px: number) => string;
  rgba: (color: string, opacity: number) => string;
}

// Helper functions (simplified implementations)
const boxShadow = (offset: number[], radius: number[], color: string, opacity: number, inset = "") => {
  return `${inset} ${offset[0]}px ${offset[1]}px ${radius[0]}px ${radius[1]}px rgba(${color}, ${opacity})`;
};

const hexToRgb = (color: string): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
};

const linearGradient = (color: string, colorState: string): string => {
  return `linear-gradient(195deg, ${color}, ${colorState})`;
};

const pxToRem = (px: number): string => {
  return `${px / 16}rem`;
};

const rgba = (color: string, opacity: number): string => {
  return `rgba(${hexToRgb(color)}, ${opacity})`;
};

// Extend the default theme to include custom properties
interface ExtendedTheme extends MuiTheme {
  palette: MuiTheme['palette'] & { [key: string]: any };
  functions: CustomFunctions;
  borders: typeof borders;
  boxShadows: typeof boxShadows;
}

// Create and export the theme
const theme = createTheme({
  palette: {
    mode: 'light' as const,
    primary: { 
      main: colors.primary.main,
      light: colors.primary.focus,
      dark: colors.primary.main,
      contrastText: '#fff',
    },
    secondary: { 
      main: colors.secondary.main,
      light: colors.secondary.focus,
      dark: colors.secondary.main,
      contrastText: '#fff',
    },
    info: { 
      main: colors.info.main,
      light: colors.info.focus,
      dark: colors.info.main,
      contrastText: '#fff',
    },
    success: { 
      main: colors.success.main,
      light: colors.success.focus,
      dark: colors.success.main,
      contrastText: '#fff',
    },
    warning: { 
      main: colors.warning.main,
      light: colors.warning.focus,
      dark: colors.warning.main,
      contrastText: '#fff',
    },
    error: { 
      main: colors.error.main,
      light: colors.error.focus,
      dark: colors.error.main,
      contrastText: '#fff',
    },
    background: { 
      default: colors.background.default,
      paper: colors.white.main 
    },
    text: { 
      primary: colors.text.main, 
      secondary: colors.text.focus,
      disabled: colors.grey?.[500] || '#9e9e9e'
    },
  },
  // Generate shadows array required by MUI
  shadows: [
    'none',
    '0px 1px 2px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.14)',
    '0px 3px 6px rgba(0,0,0,0.16)',
    '0px 4px 8px rgba(0,0,0,0.18)',
    '0px 5px 10px rgba(0,0,0,0.20)',
    '0px 6px 12px rgba(0,0,0,0.22)',
    '0px 7px 14px rgba(0,0,0,0.24)',
    '0px 8px 16px rgba(0,0,0,0.26)',
    '0px 9px 18px rgba(0,0,0,0.28)',
    '0px 10px 20px rgba(0,0,0,0.30)',
    '0px 11px 22px rgba(0,0,0,0.32)',
    '0px 12px 24px rgba(0,0,0,0.34)',
    '0px 13px 26px rgba(0,0,0,0.36)',
    '0px 14px 28px rgba(0,0,0,0.38)',
    '0px 15px 30px rgba(0,0,0,0.40)',
    '0px 16px 32px rgba(0,0,0,0.42)',
    '0px 17px 34px rgba(0,0,0,0.44)',
    '0px 18px 36px rgba(0,0,0,0.46)',
    '0px 19px 38px rgba(0,0,0,0.48)',
    '0px 20px 40px rgba(0,0,0,0.50)',
    '0px 21px 42px rgba(0,0,0,0.52)',
    '0px 22px 44px rgba(0,0,0,0.54)',
    '0px 23px 46px rgba(0,0,0,0.56)',
    '0px 24px 48px rgba(0,0,0,0.58)',
  ],
  typography: { ...typography },
  breakpoints: { ...breakpoints },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },
        "*, *::before, *::after": {
          margin: 0,
          padding: 0,
        },
        "a, a:link, a:visited": {
          textDecoration: "none !important",
        },
        "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
          color: `${colors.dark.main} !important`,
          transition: "color 150ms ease-in !important",
        },
        "a.link:hover, .link:hover, a.link:focus, .link:focus": {
          color: `${colors.info.main} !important`,
        },
      },
    },
  },
}) as ExtendedTheme;  // Add custom properties to the theme
(theme as any).functions = {
  boxShadow,
  hexToRgb,
  linearGradient,
  pxToRem,
  rgba,
};

(theme as any).borders = borders;
(theme as any).boxShadows = boxShadows;

// Make boxShadow available globally - only in browser environment
if (typeof window !== 'undefined') {
  (window as any).boxShadow = boxShadow;
}

export default theme;

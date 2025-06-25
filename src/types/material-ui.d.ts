// This file adds explicit support for Material UI in the Vercel build process
// Helps resolve imports like @mui/material/Button and @mui/material/styles

declare module '@mui/material/Button' {
  import * as React from 'react';
  
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    disabled?: boolean;
    disableElevation?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    fullWidth?: boolean;
    href?: string;
    size?: 'small' | 'medium' | 'large';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    sx?: object;
    variant?: 'contained' | 'outlined' | 'text';
  }
  
  const Button: React.ComponentType<ButtonProps>;
  export default Button;
  export { ButtonProps };
}

declare module '@mui/material/Box' {
  import * as React from 'react';
  
  interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    sx?: object;
    component?: React.ElementType;
    // Additional props needed for MDBox component
    p?: number | string;
    py?: number | string;
    px?: number | string;
    pt?: number | string;
    pb?: number | string;
    pl?: number | string;
    pr?: number | string;
    m?: number | string;
    my?: number | string;
    mx?: number | string;
    mt?: number | string;
    mb?: number | string;
    ml?: number | string;
    mr?: number | string;
    bgcolor?: string;
    color?: string;
    display?: string;
    alignItems?: string;
    justifyContent?: string;
    borderRadius?: string | number;
    width?: string | number;
    height?: string | number;
    maxWidth?: string | number;
    maxHeight?: string | number;
    minWidth?: string | number;
    minHeight?: string | number;
    textAlign?: string;
  }
  
  const Box: React.ComponentType<BoxProps>;
  export default Box;
  export { BoxProps };
}

declare module '@mui/material/Typography' {
  import * as React from 'react';
  
  interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
    children?: React.ReactNode;
    color?: string;
    component?: React.ElementType;
    gutterBottom?: boolean;
    noWrap?: boolean;
    paragraph?: boolean;
    variant?: 'body1' | 'body2' | 'button' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit' | 'overline' | 'subtitle1' | 'subtitle2';
    variantMapping?: object;
    sx?: object;
    // Additional spacing props
    mb?: number | string;
    mt?: number | string;
    ml?: number | string;
    mr?: number | string;
    mx?: number | string;
    my?: number | string;
    p?: number | string;
    px?: number | string;
    py?: number | string;
    fontWeight?: number | string;
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    fontSize?: number | string;
  }
  
  const Typography: React.ComponentType<TypographyProps>;
  export default Typography;
  export { TypographyProps };
}

declare module '@mui/material/Grid' {
  import * as React from 'react';
  
  interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    container?: boolean;
    item?: boolean;
    xs?: number | boolean | 'auto';
    sm?: number | boolean | 'auto';
    md?: number | boolean | 'auto';
    lg?: number | boolean | 'auto';
    xl?: number | boolean | 'auto';
    spacing?: number | string;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    sx?: object;
  }
  
  const Grid: React.ComponentType<GridProps>;
  export default Grid;
  export { GridProps };
}

declare module '@mui/material/CssBaseline' {
  import * as React from 'react';
  
  interface CssBaselineProps {
    children?: React.ReactNode;
  }
  
  const CssBaseline: React.ComponentType<CssBaselineProps>;
  export default CssBaseline;
  export { CssBaselineProps };
}

declare module '@mui/material/styles' {
  import * as React from 'react';
  
  // Theme interface
  export interface Theme {
    palette: {
      mode: 'light' | 'dark';
      primary: {
        main: string;
        [key: string]: any;
      };
      secondary: {
        main: string;
        [key: string]: any;
      };
      error: {
        main: string;
        [key: string]: any;
      };
      warning: {
        main: string;
        [key: string]: any;
      };
      info: {
        main: string;
        [key: string]: any;
      };
      success: {
        main: string;
        [key: string]: any;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        [key: string]: any;
      };
      background: {
        default: string;
        paper: string;
        [key: string]: any;
      };
      [key: string]: any;
    };
    typography: {
      fontFamily: string;
      [key: string]: any;
    };
    spacing: (factor: number) => number | string;
    shape: {
      borderRadius: number;
      [key: string]: any;
    };
    [key: string]: any;
  }

  // Styled function
  export function styled(Component: any): any;
  
  // Theme creation function
  export function createTheme(options?: Partial<Theme>): Theme;
  
  // Hook to access the theme
  export function useTheme(): Theme;
  
  // Alpha function for color manipulation
  export function alpha(color: string, value: number): string;
  
  // ThemeProvider component
  export interface ThemeProviderProps {
    theme: Theme;
    children: React.ReactNode;
  }
  export const ThemeProvider: React.ComponentType<ThemeProviderProps>;
}

import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

declare module '@mui/material/Grid' {
  export interface GridProps {
    children?: React.ReactNode;
    className?: string;
    component?: React.ElementType;
    container?: boolean;
    item?: boolean;
    spacing?: number | string;
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    zeroMinWidth?: boolean;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    alignContent?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
    xs?: boolean | 'auto' | number;
    sm?: boolean | 'auto' | number;
    md?: boolean | 'auto' | number;
    lg?: boolean | 'auto' | number;
    xl?: boolean | 'auto' | number;
    sx?: SxProps<Theme>;
    style?: React.CSSProperties;
    [key: string]: any;  // Allow any other props
  }
  
  const Grid: React.ComponentType<GridProps>;
  export default Grid;
}

declare module '@mui/material' {
  export { default as Grid } from '@mui/material/Grid';
}

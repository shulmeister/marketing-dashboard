import Box, { BoxProps } from '@mui/material/Box';
import React from 'react';

// Define extended props for MDBox
export interface MDBoxProps extends BoxProps {
  variant?: 'contained' | 'gradient';
  bgColor?: string;
  color?: string;
  opacity?: number;
  borderRadius?: string | number;
  shadow?: string;
  coloredShadow?: string;
  // Spacing props
  p?: number | string;
  py?: number | string;
  px?: number | string;
  pt?: number | string;
  pb?: number | string;
  pl?: number | string;
  pr?: number | string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  my?: number | string;
  mx?: number | string;
  // Layout props
  width?: number | string;
  height?: number | string;
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
  gap?: number | string;
  // Flex properties
  flex?: string | number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  flexBasis?: string | number;
  // Position properties
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  zIndex?: number;
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  // Overflow properties
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
  // Component prop
  component?: React.ElementType;
}

const MDBox: React.FC<MDBoxProps> = ({ 
  variant = 'contained', 
  bgColor, 
  color, 
  opacity, 
  borderRadius, 
  shadow,
  coloredShadow,
  p,
  py,
  px,
  pt,
  pb,
  pl,
  pr,
  mt,
  mb,
  ml,
  mr,
  my,
  mx,
  width,
  height,
  display,
  justifyContent,
  alignItems,
  textAlign,
  gap,
  children,
  ...rest 
}) => {
  const additionalStyles: React.CSSProperties = {};
  
  // Apply custom styles based on props
  if (bgColor) additionalStyles.backgroundColor = bgColor;
  if (color) additionalStyles.color = color;
  if (opacity !== undefined) additionalStyles.opacity = opacity;
  if (borderRadius) additionalStyles.borderRadius = borderRadius;
  
  // Add spacing styles
  if (p !== undefined) additionalStyles.padding = p;
  if (py !== undefined) {
    additionalStyles.paddingTop = py;
    additionalStyles.paddingBottom = py;
  }
  if (px !== undefined) {
    additionalStyles.paddingLeft = px;
    additionalStyles.paddingRight = px;
  }
  if (pt !== undefined) additionalStyles.paddingTop = pt;
  if (pb !== undefined) additionalStyles.paddingBottom = pb;
  if (pl !== undefined) additionalStyles.paddingLeft = pl;
  if (pr !== undefined) additionalStyles.paddingRight = pr;
  
  // Add margin styles
  if (mt !== undefined) additionalStyles.marginTop = mt;
  if (mb !== undefined) additionalStyles.marginBottom = mb;
  if (ml !== undefined) additionalStyles.marginLeft = ml;
  if (mr !== undefined) additionalStyles.marginRight = mr;
  if (my !== undefined) {
    additionalStyles.marginTop = my;
    additionalStyles.marginBottom = my;
  }
  if (mx !== undefined) {
    additionalStyles.marginLeft = mx;
    additionalStyles.marginRight = mx;
  }
  
  // Add layout styles
  if (width !== undefined) additionalStyles.width = width;
  if (height !== undefined) additionalStyles.height = height;
  if (display) additionalStyles.display = display;
  if (justifyContent) additionalStyles.justifyContent = justifyContent;
  if (alignItems) additionalStyles.alignItems = alignItems;
  if (textAlign) additionalStyles.textAlign = textAlign as 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
  if (gap !== undefined) additionalStyles.gap = gap;
  
  return <Box sx={additionalStyles} {...rest}>{children}</Box>;
};

export default MDBox;

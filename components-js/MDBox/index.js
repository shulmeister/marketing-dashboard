import React from 'react';
import Box from '@mui/material/Box';

/**
 * Simple MDBox component that avoids styled API
 */
const MDBox = (props) => {
  const { 
    variant = 'contained',
    bgColor,
    color,
    opacity,
    borderRadius,
    shadow,
    children,
    ...rest 
  } = props;

  let bgValue = bgColor;
  if (bgColor === 'transparent') {
    bgValue = 'transparent';
  }

  return (
    <Box
      sx={{
        opacity,
        backgroundColor: bgValue,
        color: color,
        borderRadius: borderRadius || 'none',
        boxShadow: shadow ? 1 : 'none',
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default MDBox;

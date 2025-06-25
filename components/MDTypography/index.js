import React from 'react';
import Typography from '@mui/material/Typography';

/**
 * Simple MDTypography component that avoids styled API
 */
const MDTypography = (props) => {
  const { 
    color = 'inherit',
    fontWeight = 'regular',
    textTransform,
    verticalAlign,
    textGradient,
    opacity,
    children,
    ...rest 
  } = props;

  const fontWeightValue = 
    fontWeight === 'light' ? 300 :
    fontWeight === 'regular' ? 400 :
    fontWeight === 'medium' ? 500 :
    fontWeight === 'bold' ? 700 : 400;

  return (
    <Typography
      sx={{
        color,
        opacity,
        fontWeight: fontWeightValue,
        textTransform,
        verticalAlign,
        textDecoration: 'none',
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default MDTypography;

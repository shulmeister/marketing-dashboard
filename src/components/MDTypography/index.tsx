import Typography, { TypographyProps } from '@mui/material/Typography';
import React from 'react';

const MDTypography: React.FC<TypographyProps> = ({ children, ...rest }) => {
  return <Typography {...rest}>{children}</Typography>;
};

export default MDTypography;

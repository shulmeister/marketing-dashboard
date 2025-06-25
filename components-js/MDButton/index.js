import React from 'react';
import Button from '@mui/material/Button';

/**
 * Simple MDButton component that avoids styled API
 */
const MDButton = (props) => {
  const { 
    color = 'primary',
    variant = 'contained',
    size = 'medium',
    children,
    ...rest 
  } = props;

  return (
    <Button
      color={color}
      variant={variant}
      size={size}
      sx={{
        borderRadius: '0.375rem',
        fontWeight: 600,
        boxShadow: variant === 'contained' ? 1 : 'none',
        transition: 'all 150ms ease-in',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: variant === 'contained' ? 2 : 'none',
        }
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default MDButton;

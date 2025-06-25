import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React from 'react';

// Create a styled button for Material Dashboard
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '0.375rem',
  transition: 'all 150ms ease-in',
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 7px -1px rgba(0,0,0,0.11), 0 2px 4px -1px rgba(0,0,0,0.07)',
  },
}));

// Export the MDButton component with proper TypeScript typing
const MDButton: React.FC<React.ComponentProps<typeof Button>> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default MDButton;

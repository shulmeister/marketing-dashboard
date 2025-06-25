import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

/**
 * Material Dashboard ButtonRoot component - JavaScript version
 * Simplified for better Vercel compatibility
 */
const MDButtonRoot = styled(Button)(({ theme }) => {
  return {
    borderRadius: '0.375rem',
    transition: 'all 150ms ease-in',
    fontWeight: 600,
    boxShadow: 'none',
    padding: '0.625rem 1.25rem',
  };
});

export default MDButtonRoot;

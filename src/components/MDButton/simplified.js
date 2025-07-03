import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Create a simplified styled button for Material Dashboard
const MDButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
}));

export default MDButton;

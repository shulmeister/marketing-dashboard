import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface MaterialUIContextType {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
}

const MaterialUIContext = createContext<MaterialUIContextType | undefined>(undefined);

export const useMaterialUI = (): MaterialUIContextType => {
  const context = useContext(MaterialUIContext);
  if (!context) {
    throw new Error('useMaterialUI must be used within a MaterialUIProvider');
  }
  return context;
};

interface MaterialUIProviderProps {
  children: React.ReactNode;
}

export const MaterialUIProvider: React.FC<MaterialUIProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#1976d2' },
          secondary: { main: '#9c27b0' },
          background: {
            default: mode === 'light' ? '#f4f6f8' : '#121212',
            paper: mode === 'light' ? '#fff' : '#1e1e1e',
          },
        },
        shape: { borderRadius: 12 },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
          },
          h2: {
            fontWeight: 700,
            fontSize: '2rem',
          },
          h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
          },
          h4: {
            fontWeight: 600,
            fontSize: '1.25rem',
          },
          h5: {
            fontWeight: 500,
            fontSize: '1.1rem',
          },
          h6: {
            fontWeight: 500,
            fontSize: '1rem',
          },
          button: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      }),
    [mode]
  );

  const toggleColorMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <MaterialUIContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </MaterialUIContext.Provider>
  );
};

export default MaterialUIProvider;

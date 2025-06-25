"use client";

import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const MaterialUIContext = createContext();

export const useMaterialUI = () => useContext(MaterialUIContext);

export const MaterialUIProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#1976d2' },
          secondary: { main: '#9c27b0' },
        },
        shape: { borderRadius: 12 },
      }),
    [mode]
  );

  const toggleColorMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <MaterialUIContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MaterialUIContext.Provider>
  );
};

// Material Dashboard 2 React context provider (JS version)
export const MaterialUIControllerProvider = ({ children }) => {
  const [state, setState] = React.useState({
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: "info",
    transparentNavbar: false,
    fixedNavbar: false,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
  });
  const dispatch = (action) => {
    switch (action.type) {
      case "MINI_SIDENAV":
        setState((s) => ({ ...s, miniSidenav: action.value }));
        break;
      case "TRANSPARENT_SIDENAV":
        setState((s) => ({ ...s, transparentSidenav: action.value }));
        break;
      case "WHITE_SIDENAV":
        setState((s) => ({ ...s, whiteSidenav: action.value }));
        break;
      case "SIDENAV_COLOR":
        setState((s) => ({ ...s, sidenavColor: action.value }));
        break;
      case "TRANSPARENT_NAVBAR":
        setState((s) => ({ ...s, transparentNavbar: action.value }));
        break;
      case "FIXED_NAVBAR":
        setState((s) => ({ ...s, fixedNavbar: action.value }));
        break;
      case "OPEN_CONFIGURATOR":
        setState((s) => ({ ...s, openConfigurator: action.value }));
        break;
      case "DIRECTION":
        setState((s) => ({ ...s, direction: action.value }));
        break;
      case "LAYOUT":
        setState((s) => ({ ...s, layout: action.value }));
        break;
      case "DARKMODE":
        setState((s) => ({ ...s, darkMode: action.value }));
        break;
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };
  return (
    <MaterialUIContext.Provider value={{ state, dispatch }}>
      {children}
    </MaterialUIContext.Provider>
  );
};

export const useMaterialUIController = () => {
  const context = React.useContext(MaterialUIContext);
  if (!context) {
    throw new Error("useMaterialUIController should be used inside the MaterialUIControllerProvider.");
  }
  return context;
};

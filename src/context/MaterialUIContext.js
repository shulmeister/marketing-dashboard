"use client";

import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
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
};

function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV":
      return { ...state, miniSidenav: action.value };
    case "TRANSPARENT_SIDENAV":
      return { ...state, transparentSidenav: action.value };
    case "WHITE_SIDENAV":
      return { ...state, whiteSidenav: action.value };
    case "SIDENAV_COLOR":
      return { ...state, sidenavColor: action.value };
    case "TRANSPARENT_NAVBAR":
      return { ...state, transparentNavbar: action.value };
    case "FIXED_NAVBAR":
      return { ...state, fixedNavbar: action.value };
    case "OPEN_CONFIGURATOR":
      return { ...state, openConfigurator: action.value };
    case "DIRECTION":
      return { ...state, direction: action.value };
    case "LAYOUT":
      return { ...state, layout: action.value };
    case "DARKMODE":
      return { ...state, darkMode: action.value };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const MaterialUI = createContext(null);

function MaterialUIControllerProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

function useMaterialUIController() {
  const context = useContext(MaterialUI);
  if (!context) {
    throw new Error("useMaterialUIController should be used inside the MaterialUIControllerProvider.");
  }
  return context;
}

export default MaterialUIControllerProvider;
export { MaterialUIControllerProvider, useMaterialUIController };

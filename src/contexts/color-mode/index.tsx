"use client";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Cookies from "js-cookie";
import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

type ColorModeContextType = {
  mode: string;
  setMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType,
);

type ColorModeContextProviderProps = {
  defaultMode: string;
};

export const ColorModeContextProvider: React.FC<
  PropsWithChildren<ColorModeContextProviderProps>
> = function ColorModeContextProvider({ children, defaultMode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState(defaultMode || "light");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const systemTheme = useMediaQuery(`(prefers-color-scheme: dark)`);

  useEffect(() => {
    if (isMounted) {
      const theme = Cookies.get("theme") || (systemTheme ? "dark" : "light");
      setMode(theme);
    }
  }, [isMounted, systemTheme]);

  const toggleTheme = () => {
    const nextTheme = mode === "light" ? "dark" : "light";

    setMode(nextTheme);
    Cookies.set("theme", nextTheme);
  };

  const contextValue = useMemo(
    () => ({
      setMode: toggleTheme,
      mode,
    }),
    [toggleTheme, mode],
  );
  const theme = createTheme({
    typography: {
      fontFamily:
        '"Montserrat", "Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    palette: {
      mode: mode === "light" ? "light" : "dark",
      primary: {
        light: mode === "light" ? "#65D3D3" : "#1EB2B2",
        main: "#03B0B0",
        dark: mode === "light" ? "#007B7B" : "#005B5B",
        contrastText: "#FFFFFF",
      },
      secondary: {
        light: mode === "light" ? "#FFABAB" : "#FF7E7E",
        main: "#FF4F4F",
        dark: mode === "light" ? "#BF0000" : "#9A0000",
        contrastText: "#FFFFFF",
      },
      background: {
        paper: mode === "light" ? "#FFFFFF" : "#201f1f",
        default: mode === "light" ? "#F4F4F4" : "#1D1D1D",
      },
      text: {
        primary: mode === "light" ? "#000000" : "#FFFFFF",
        secondary: mode === "light" ? "#333333" : "#B0B0B0",
      },
    },
  });

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

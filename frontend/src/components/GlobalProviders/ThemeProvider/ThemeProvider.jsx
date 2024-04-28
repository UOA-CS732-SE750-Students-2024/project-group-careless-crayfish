import { useState, createContext, useContext } from "react";

import { localStorageKeys, useLocalStorage } from "../LocalStorageProvider";
import { DarkTheme, LightTheme } from "@frontend-ui/themes";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

export const MuiTheme = {
  Dark: "dark",
  Light: "light",
};

const ThemeContext = createContext({
  theme: MuiTheme.Light,

  setMuiTheme: (theme) => {
    console.warn(`Failed to set theme = ${theme}, no theme provider`);
  },
  toggleLightDarkTheme: () => {
    console.warn(`Failed to toggle theme, no theme provider`);
  },
});
export const useMuiTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const { getItem, setItem } = useLocalStorage();

  const [theme, setTheme] = useState(
    getItem(localStorageKeys.THEME) == JSON.stringify(MuiTheme.Dark)
      ? MuiTheme.Dark
      : MuiTheme.Light,
  );

  const setMuiTheme = (theme) => {
    setItem(localStorageKeys.THEME, theme);
    setTheme(theme);
  };

  const muiTheme = theme === MuiTheme.Dark ? DarkTheme : LightTheme;

  const toggleLightDarkTheme = () => {
    const toggledTheme =
      theme == MuiTheme.Dark ? MuiTheme.Light : MuiTheme.Dark;
    setItem(localStorageKeys.THEME, toggledTheme);
    setTheme(toggledTheme);
  };
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeContext.Provider
        value={{ theme, setMuiTheme, toggleLightDarkTheme }}
      >
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

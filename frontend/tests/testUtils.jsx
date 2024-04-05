import { useEffect, useState } from "react";
import {
  useLocalStorage,
  useMuiTheme,
} from "@frontend-ui/components/GlobalProviders";

export const ThemeProviderDebug = ({ themeMode }) => {
  const { theme, setMuiTheme } = useMuiTheme();
  useEffect(() => {
    if (themeMode) setMuiTheme(themeMode);
  }, []);
  return <>{theme}</>;
};

export const LocalStorageProviderDebug = ({ functionToDebug }) => {
  const { keys, setItem, removeItem, getItem } = useLocalStorage();
  const [isLocalStorageEventSuccessful, setIsLocalStorageEventSuccessful] =
    useState(false);
  useEffect(() => {
    switch (functionToDebug) {
      case "setItem":
      case "keys":
        setIsLocalStorageEventSuccessful(setItem("a", "1"));
        break;
      case "removeItem":
        setIsLocalStorageEventSuccessful(removeItem("a"));
        break;
      default:
        break;
    }
  }, []);
  switch (functionToDebug) {
    case "setItem":
      return <>{getItem("a") || "null"}</>;
    case "keys":
      return <>{keys() || "[]"}</>;

    case "removeItem":
      return (
        <>
          <span>
            is localstorage event successful:
            {isLocalStorageEventSuccessful.toString()}
          </span>
          <span>{keys() || "[]"}</span>
          {getItem("b") || "null"}
        </>
      );
    default:
      return <>{getItem("a") || "null"}</>;
  }
};

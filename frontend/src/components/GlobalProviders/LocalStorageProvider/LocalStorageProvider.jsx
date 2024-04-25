import { createContext, useContext } from "react";

const LocalStorageContext = createContext({
  keys: () => {
    console.log("Failed to get keys, no local storage provider");
    return [];
  },
  getItem: (key) => {
    console.log(
      `Failed to find item with key = ${key}, no local storage provider`,
    );
    return null;
  },
  setItem: (key, value) => {
    console.log(
      `Failed to set item with key = ${key} and value = ${value}, no local storage provider or an error is thrown`,
    );
    return false;
  },
  removeItem: (key) => {
    console.log(
      `Failed to remove item with key = ${key}, no local storage provider or an error is thrown`,
    );
    return false;
  },
});

export const useLocalStorage = () => useContext(LocalStorageContext);

const localStorage = window.localStorage;

const LocalStorageProvider = ({ children }) => {
  const keys = () => {
    const result = [];
    for (let i = 0; i < localStorage.length; i++) {
      result.push(localStorage.key(i));
      console.log(localStorage.key(i));
    }
    return result;
  };

  const getItem = (key) => localStorage.getItem(key);

  const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  };

  const removeItem = (key) => {
    localStorage.removeItem(key);
    return true;
  };

  return (
    <LocalStorageContext.Provider
      value={{ keys, getItem, setItem, removeItem }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
export default LocalStorageProvider;

import { createContext, useContext, useState,useEffect } from "react";
import { useAPI } from "../APIProvider";
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { get, post } = useAPI();

  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(storedAuthState);
  }, []);
  const login = async() => {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", String(true));

  };
  const logout = async() => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", String(false));
   
  };

  const getUserById = async (userId) => {
    return await get("http://localhost:3000/api/users/" + userId);
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, getUserById }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

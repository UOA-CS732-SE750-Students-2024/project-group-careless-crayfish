import { createContext, useContext, useState } from "react";
import { useAPI } from "../APIProvider";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { get, post } = useAPI();

  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
  };

  const createUser = async () => {
    await post(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/users/`, {
      userId: "xqc",
      email: "xqc@gmail.com",
    });
  };

  const getUserById = async (userId) => {
    // TODO properly handle param on urls.
    await get(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/users/` + userId);
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, createUser, getUserById }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

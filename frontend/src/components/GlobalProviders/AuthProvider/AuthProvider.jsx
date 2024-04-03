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
    await post("http://localhost:3000/api/users", {
      userId: "xqc",
      email: "xqc@gmail.com",
    });
  };

  const getUserById = async (userId) => {
    // TODO properly handle param on urls.
    await get("http://localhost:3000/api/users/" + userId);
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

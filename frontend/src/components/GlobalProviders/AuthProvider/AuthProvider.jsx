import { createContext, useContext, useState, useEffect } from "react";
import { useAPI } from "../APIProvider";
import { useLocalStorage } from "../LocalStorageProvider";
import { useGoogleLogin } from "@react-oauth/google";
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setItem, getItem } = useLocalStorage();
  const { get, post, setError } = useAPI();

  const [user, setUser] = useState(null);

  const [accessToken, setAccessToken] = useState(null);

  const [isLoadingExistingUser, setIsLoadingExistingUser] = useState(false);

  const login = async () => {
    setIsAuthenticated(true);
    setItem("isAuthenticated", true);
  };
  const logout = async () => {
    setIsAuthenticated(false);
    setAccessToken(null);
    setItem("accessToken", "");
    setItem("isAuthenticated", false);
  };

  const getUserById = async (userId) => {
    return await get(
      `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/users/${userId}`,
    );
  };

  const createUser = async ({ email, userName, imageUrl, userId }) => {
    return await post(
      `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/users`,
      { email, userName, imageUrl, userId },
    );
  };

  const refreshUserSession = async () => {
    const accessToken = getItem("accessToken");
    if (accessToken) {
      const googleUserResp = await get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        },
      );
      const googleUser = googleUserResp.data;
      const personInfo = {
        email: googleUser.email,
        name: googleUser.name,
        imageUrl: googleUser.picture,
        accessToken: accessToken,
        userId: googleUser.id,
      };

      await processLogin(personInfo);
    }
  };
  useEffect(() => {
    const isAuthenticated = getItem("isAuthenticated") == "true";
    if (!user && !accessToken && isAuthenticated) {
      refreshUserSession();
    } else {
      setItem("isAuthenticated", false);
    }
  }, [getItem]);

  const processLogin = async (personInfo) => {
    let userResp = null;
    try {
      userResp = await getUserById(personInfo.userId);

      if (userResp && userResp.data == null) {
        userResp = await createUser({
          userName: personInfo.name,
          email: personInfo.email,
          imageUrl: personInfo.imageUrl,
          userId: personInfo.userId,
        });
      }
      login();
    } finally {
      userResp && userResp.data && setUser(userResp.data);
    }
  };
  const handleLogin = async (response) => {
    setItem("accessToken", response.access_token);
    setAccessToken(response.access_token);
    const googleUserResp = await get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
          Accept: "application/json",
        },
      },
    );
    const googleUser = googleUserResp.data;
    console.log(googleUser);
    const personInfo = {
      email: googleUser.email,
      name: googleUser.name,
      imageUrl: googleUser.picture,
      accessToken: response.access_token,
      userId: googleUser.id,
    };

    processLogin(personInfo);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleLogin,
    onError: (err) => setError(err),
  });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        getUserById,
        createUser,
        user,
        setUser,
        handleLogin,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

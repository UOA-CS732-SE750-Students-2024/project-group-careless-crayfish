import { createContext, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { AuthenticatedProvider } from "@frontend-ui/components/Authenticated";
import AuthPageProvider from "@frontend-ui/components/AuthPage/AuthPageProvider";
import { RestaurantRecommendations } from "@frontend-ui/components/Recommendation";
import { RecommendationProvider } from "../RecommenationProvider";

const RouteContext = createContext({});

export const useRoute = () => useContext(RouteContext);

const RouteProvider = () => {
  const { isAuthenticated } = useAuth();

  return (
    <RouteContext.Provider value={{}}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/authenticated" />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route
            path="/auth"
            element={
              isAuthenticated ? (
                <Navigate to="/authenticated" />
              ) : (
                <AuthPageProvider />
              )
            }
          />

          <Route
            path="/authenticated"
            element={
              isAuthenticated ? (
                <AuthenticatedProvider />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />

          <Route
            path="/recommend/restaurants/:location"
            element={
              isAuthenticated ? (
                // 这里用RecommendationProvider把RestaurantRecommendations包起来 
                // 你就可以在RestaurantRecommendations里面用useRecommendation()这个hook来拿state和function
                <RecommendationProvider><RestaurantRecommendations/></RecommendationProvider>
              ) : (
                <AuthPageProvider />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </RouteContext.Provider>
  );
};
export default RouteProvider;

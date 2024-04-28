import { createContext, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { AuthenticatedProvider } from "@frontend-ui/components/Authenticated";
import AuthPageProvider from "@frontend-ui/components/AuthPage/AuthPageProvider";
import { Voting } from "@frontend-ui/components/Voting";
import {
  RestaurantRecommendations,
  Landing,
  RestaurantOptions,
} from "@frontend-ui/components/Recommendation";

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
                <>
                  <AuthenticatedProvider />
                  <Landing />
                </>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />

          <Route
            path="/landing"
            element={
              isAuthenticated ? (
                <>
                  <AuthenticatedProvider />
                  <Landing />
                </>
              ) : (
                <AuthPageProvider />
              )
            }
          />

          <Route
            path="/recommend/restaurant-options"
            element={
              isAuthenticated ? (
                <>
                  <AuthenticatedProvider />
                  <RestaurantOptions />
                </>
              ) : (
                <AuthPageProvider />
              )
            }
          />

          <Route
            path="/recommend/restaurants/:location"
            element={
              isAuthenticated ? (
                <>
                  <AuthenticatedProvider />
                  <RestaurantRecommendations />
                </>
              ) : (
                <AuthPageProvider />
              )
            }
          />
          <Route
            path="/voting"
            element={isAuthenticated ? <Voting /> : <AuthPageProvider />}
          />
        </Routes>
      </BrowserRouter>
    </RouteContext.Provider>
  );
};
export default RouteProvider;

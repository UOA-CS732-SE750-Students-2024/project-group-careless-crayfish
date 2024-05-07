import { createContext, useContext, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { AuthenticatedProvider } from "@frontend-ui/components/Authenticated";
import AuthPageProvider from "@frontend-ui/components/AuthPage/AuthPageProvider";
import {
  RestaurantRecommendations,
  Landing,
  RestaurantOptions,
} from "@frontend-ui/components/Recommendation";
import { Voting } from "@frontend-ui/components/Voting";
import { CommentDialogPaginated } from "@frontend-ui/components/Comment/";
import { Button, Container, Grid, Stack } from "@mui/material";
import { Profile } from "@frontend-ui/components/Profile/Profile";
import { Box } from "@mui/system";
const RouteContext = createContext({});

export const useRoute = () => useContext(RouteContext);

const RouteProvider = () => {
  const { isAuthenticated } = useAuth();
  const [pageTitle, setPageTitle] = useState("");
  const GoBackButton = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1);
    };
    return (
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go Back
      </Button>
    );
  };

  const GoForwardButton = () => {
    const navigate = useNavigate();
    const handleGoForward = () => {
      navigate(1);
    };
    return (
      <Button variant="contained" color="primary" onClick={handleGoForward}>
        Go Forward
      </Button>
    );
  };
  return (
    <RouteContext.Provider value={{ pageTitle, setPageTitle }}>
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
            path="/authenticated/recommend/restaurant-options"
            element={
              isAuthenticated ? (
                <>
                  <AuthenticatedProvider />
                  <RestaurantOptions />
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="10vh"
                  >
                    <Stack direction="row" spacing={2}>
                      <GoBackButton />
                      <GoForwardButton />
                    </Stack>
                  </Box>
                </>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />

          <Route
            path="/authenticated/recommend/restaurants/:location"
            element={
              isAuthenticated ? (
                <>
                  <AuthenticatedProvider />
                  <RestaurantRecommendations />
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="10vh"
                  >
                    <Stack direction="row" spacing={2}>
                      <GoBackButton />
                      <GoForwardButton />
                    </Stack>
                  </Box>
                </>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />

          <Route
            path="/authenticated/profile"
            element={
              isAuthenticated ? (
                <>
                  <AuthenticatedProvider />
                  <Profile />
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="10vh"
                  >
                    <Stack direction="row" spacing={2}>
                      <GoBackButton />
                      <GoForwardButton />
                    </Stack>
                  </Box>
                </>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route
            path="/authenticated/voting"
            element={
              isAuthenticated ? (
                <>
                  <AuthenticatedProvider />
                  <Voting />
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="10vh"
                  >
                    <Stack direction="row" spacing={2}>
                      <GoBackButton />
                      <GoForwardButton />
                    </Stack>
                  </Box>
                </>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </RouteContext.Provider>
  );
};
export default RouteProvider;

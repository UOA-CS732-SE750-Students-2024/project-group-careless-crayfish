import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Navigate } from "react-router-dom";
import { useAPI, useAuth, useLocalStorage } from "../GlobalProviders";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { createContext, useContext, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";

const AuthPageContext = createContext({});

export const useAuthPage = () => useContext(AuthPageContext);

const AuthPageProvider = () => {
  const { googleLogin } = useAuth();

  return (
    <AuthPageContext.Provider value={{}}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={0}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%", // Ensure the Box takes up the full height of its parent
            }}
          >
            <Button
              component="label"
              fontSize="large"
              size="large"
              variant="contained"
              onClick={googleLogin}
              startIcon={<GitHubIcon fontSize="large" />}
            >
              Google SSO Sign In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </AuthPageContext.Provider>
  );
};

export default AuthPageProvider;

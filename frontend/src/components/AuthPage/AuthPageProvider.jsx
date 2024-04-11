import * as React from "react";
import { useEffect } from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { GoogleLoginButton } from 'react-social-login-buttons'
import FlexBox from '../FlexBox'
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Navigate } from "react-router-dom";
import { useAPI, useAuth,useRoute,useLocalStorage } from "../GlobalProviders";
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
{/*const auth = () => {
  if (localStorage.getItem("token11")) {
    return true;
  } else {
    return false;
  }
}; */}
GoogleAuth.initialize({
  clientId: '1072715892589-79a0l62lbjqr0cl6bvsij2t53n3hb1oj',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true,
});
const AuthPageContext = React.createContext({});

export const useAuthPage = () => React.useContext(AuthPageContext);

const AuthPageProvider = () => {
  const { isAuthenticated,setIsAuthenticated } = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const { login, createUser, getUserById } = useAuth();
  const { data } = useAPI();
  const{push}=useRoute();
  const{setItem}=useLocalStorage();
  const handleSubmit = async (event) => {
    event.preventDefault();

    // TODO implement SSO login
  };
  
  const handleGoogleLogin=async()=>{
    const response = await GoogleAuth.signIn()
    if (!response) {
      return
    }
    await handleLogin('google', response)
  };
  const handleUserEmail = (email) => {
    return email.includes('privaterelay.appleid.com') ? '' : email
  };
    const handleLogin = async (
      loginType,response,update
    ) => {
      console.log(response);
      const personInfo = {
        email: response.email,
        givenName: response.givenName,
        familyName: response.familyName,
        name: response.name,
        imageUrl: response.imageUrl,
        token: response.authentication.accessToken
      };
  
      setItem('lt', loginType);
      setItem('ue', handleUserEmail(personInfo.email));
      setItem('gn', personInfo.givenName);
      setItem('token',personInfo.token);
      {/*
     dispatch({
        type: 'UPDATE_USER_EMAIL',
        payload: handleUserEmail(personInfo.email),
      });
  
      dispatch({
        type: 'UPDATE_USER_GIVEN_NAME',
        payload: personInfo.givenName,
      });
  
     */} 
      if (update) {
        {/*
         await updateUserPersonInfo(
          personInfo.email,
          JSON.stringify(personInfo),
          personInfo.user // Ensure `user` is properly defined or fetched from `response`
        );
       */}
       console.log( personInfo.email)
       console.log( personInfo)
       console.log(  personInfo.user)
       
      }
      //???
      login();
      //setIsAuthenticated(true);
      await push('/authenticated');
      //mobile
      //await push(isTablet ? '/main' : '/');
  
      {/*await push('/authenticated');
      dispatch({
        type: 'SHOW_NOTICE',
        payload: {
          message: ('Login Success!'),
          show: true,
        },
      }); */}
    };

  return (
    <AuthPageContext.Provider value={{}}>
      {isAuthenticated ? (
        <Navigate to="/authenticated" />
      ) : (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={8}
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
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                login();
              }}
            >
              Skip Sign In
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={async (e) => {
                e.preventDefault();
                await createUser();
              }}
            >
              create test user(xqc)
            </Button>
            <FlexBox justifyContent="center">
            <GoogleLoginButton
              style={{
                width: '19rem',
                fontSize: '1rem',
                boxShadow: 'none',
                border: '1px solid rgb(193, 199, 209)',
              }}
              text="Continue with Google"
              onClick={()=>handleGoogleLogin()}
          
            />
          </FlexBox>
            <Button
              onClick={async (e) => {
                e.preventDefault();
                await getUserById("xqc");
              }}
            >
              get test user
            </Button>
            <Typography>test user: {JSON.stringify(data)}</Typography>
          </Grid>
        </Grid>
      )}
    </AuthPageContext.Provider>
  );
};

export default AuthPageProvider;

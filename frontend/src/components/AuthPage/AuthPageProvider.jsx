
import { useAuth, } from "../GlobalProviders";
import { createContext, useContext, useEffect, useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import React from 'react';
import { TextField, Button, Container, Box, Typography, Grid, CssBaseline } from '@mui/material';

const AuthPageContext = createContext({});

export const useAuthPage = () => useContext(AuthPageContext);

const AuthPageProvider = () => {
  const { googleLogin } = useAuth();

  return (
    <AuthPageContext.Provider value={{}}>

      <Grid
        container
        component="main"
        sx={{
          height: '100vh',
          backgroundImage: 'url("/background/background_image.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <CssBaseline />
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Add a slight white overlay for better readability
              padding: 3,
              borderRadius: 2,
              boxShadow: 3
            }}
          >
            <Typography component="h1" variant="h5">
              VOTE
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email"
                name="username"
                autoComplete="username"
                autoFocus
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                SIGN IN
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={googleLogin}
                startIcon={< GoogleIcon />}
                sx={{ mt: 1, fontSize: '1rem' }}
              >
                Google SSO Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </AuthPageContext.Provider>
  );
};

export default AuthPageProvider;

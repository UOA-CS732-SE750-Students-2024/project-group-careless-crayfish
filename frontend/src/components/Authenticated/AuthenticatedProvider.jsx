import { createContext, useContext } from "react";
import { HeaderProvider } from "../Header";
import { Grid, Paper } from "@mui/material";

const AuthenticatedContext = createContext({});

export const useAuthenticated = () => useContext(AuthenticatedContext);
const AuthenticatedProvider = () => {
  return (
    <AuthenticatedContext.Provider value={{}}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        sx={{ height: "100%", width: "100%" }}
      >
        <Grid item>
          <HeaderProvider />
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
          <Paper sx={{ height: "100%", width: "100%" }}></Paper>
        </Grid>
      </Grid>
    </AuthenticatedContext.Provider>
  );
};

export default AuthenticatedProvider;

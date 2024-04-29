import { CssBaseline } from "@mui/material";
import {
  LocalStorageProvider,
  RouteProvider,
  ThemeProvider,
  AuthProvider,
  APIProvider,
} from "./components/GlobalProviders";
import { SnackbarProvider } from "./components/Snackbar";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => (
  <LocalStorageProvider>
    <ThemeProvider>
      <CssBaseline />
      <APIProvider>
        <GoogleOAuthProvider clientId="1083292527788-2ehr1pss5tjac6156qk7likrbu4eps58.apps.googleusercontent.com">
          <AuthProvider>
            <RouteProvider />
            <SnackbarProvider />
          </AuthProvider>
        </GoogleOAuthProvider>
      </APIProvider>
    </ThemeProvider>
  </LocalStorageProvider>
);
export default App;

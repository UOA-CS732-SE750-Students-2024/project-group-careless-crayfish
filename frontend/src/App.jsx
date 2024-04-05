import {
  LocalStorageProvider,
  RouteProvider,
  ThemeProvider,
  AuthProvider,
  APIProvider,
} from "./components/GlobalProviders";
import { SnackbarProvider } from "./components/Snackbar";

const App = () => (
  <LocalStorageProvider>
    <ThemeProvider>
      <APIProvider>
        <AuthProvider>
          <RouteProvider />
          <SnackbarProvider />
        </AuthProvider>
      </APIProvider>
    </ThemeProvider>
  </LocalStorageProvider>
);
export default App;

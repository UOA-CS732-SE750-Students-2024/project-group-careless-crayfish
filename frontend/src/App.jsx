import { CssBaseline } from '@mui/material';
import {
  LocalStorageProvider,
  RouteProvider,
  ThemeProvider,
  AuthProvider,
  APIProvider,
} from './components/GlobalProviders';
import { SnackbarProvider } from './components/Snackbar';

const App = () => (
  <LocalStorageProvider>
    <ThemeProvider>
      <CssBaseline />
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

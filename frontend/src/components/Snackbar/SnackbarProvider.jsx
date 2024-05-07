import { createContext, useContext } from "react";
import { default as MuiSnackbar } from "@mui/material/Snackbar";
import {
  Box,
  Collapse,
  IconButton,
  Typography,
  AlertTitle,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { useAPI } from "../GlobalProviders";

const SnackbarContext = createContext({});
export const useSnackbar = () => useContext(SnackbarContext);

const SnackbarProvider = () => {
  const { error, setError } = useAPI();
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleSnackbarClose = (event, reason) => {
    setError(null);
  };

  const errorMsgRenderer = () => {
    // Handle 500 class errors by displaying hardcoded text.
    if (error.code?.toString().startsWith("5")) {
      return <Typography>Server error, please contact developer</Typography>;
    }
    // Handle 400 class errors by displaying error message returned from server.
    // So for 400 class errors you need to get your backend api to return meaningful error messages.
    if (error.code?.toString().startsWith("4")) {
      if (error.code?.toString() == "401") {
        return <Typography>Please login.</Typography>;
      }
      if (error.code?.toString() == "403") {
        return <Typography>You are authorized.</Typography>;
      }
      return <Typography>{error.message}</Typography>;
    }
    // Handle all other types of error.
    return <Typography>Unkown error, please contact developer</Typography>;
  };
  const renderErrorAlert = () => (
    <Alert
      severity={"error"}
      onClose={handleSnackbarClose}
      action={
        <Box display="flex" flexDirection="row" width="100%">
          <IconButton
            aria-label="Snackbar close icon"
            color="inherit"
            size="small"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      }
    >
      <AlertTitle>Error</AlertTitle>
      {error && errorMsgRenderer()}
    </Alert>
  );

  return (
    <SnackbarContext.Provider value={{}}>
      <MuiSnackbar
        aria-label={"Snackbar"}
        open={!!error}
        onClose={handleSnackbarClose}
        TransitionComponent={Collapse}
        ClickAwayListenerProps={{ mouseEvent: false }}
        key={"Snackbar"}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {error && renderErrorAlert()}
      </MuiSnackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;

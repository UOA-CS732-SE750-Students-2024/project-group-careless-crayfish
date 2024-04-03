import { createContext, useContext } from "react";
import { default as MuiSnackbar } from "@mui/material/Snackbar";
import { Box, Collapse, IconButton } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AlertTitle } from "@mui/material";
import { useAPI } from "../GlobalProviders";

const SnackbarContext = createContext({});
export const useSnackbar = () => useContext(SnackbarContext);

const SnackbarProvider = () => {
  const { error, setError } = useAPI();
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleSnackbarClose = (event, reason) => {
    console.log(event);
    if (reason === "clickaway") {
      return;
    }

    setError(null);
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
      <Typography>{error.message}</Typography>
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

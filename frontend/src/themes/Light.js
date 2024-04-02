import { createTheme } from "@mui/material/styles";

const LightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#E0E0E0", // set the blank background color of all components to be light grey
    },
  },
});

export default LightTheme;

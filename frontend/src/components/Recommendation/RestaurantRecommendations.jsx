import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useAPI, useRoute } from "../GlobalProviders";
import { useLocation } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import RestaurantElement from "./RestaurantElement";
import { IconButton, Snackbar } from "@mui/material";

export const RestaurantRecommendations = () => {
  const { location } = useParams(); // Extract the location parameter from the current route
  const navigate = useNavigate();

  // cuisine and ageGroup are query parameters
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const cuisine = queryParams.get("cuisine") || "Random";
  const ageGroup = queryParams.get("ageGroup") || "Random";

  // recommendations is an array of objects, each object represents a restaurant
  const [recommendations, setRecommendations] = useState([]);

  // selectedIndex is the index of the selected restaurant to display details
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // is the component loading
  const [isLoading, setIsLoading] = useState(true);

  // set page title
  const { pageTitle, setPageTitle } = useRoute();

  // use theme
  const theme = useTheme();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  const showMessage = (message, severity = "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };
  const handleClose = () => {
    setSnackbarMessage(null);
    setOpenSnackbar(false);
  };
  /**
   * Handles the click event of a restaurant.
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event - The click event.
   *
   * @param {number} index - The index of the selected restaurant.
   *
   * @returns {void}
   */
  const handleListItemClick = (
    event, // React.MouseEvent<HTMLDivElement, MouseEvent>
    index, // number
  ) => {
    setSelectedIndex(index);
  };

  // checked is the index of the selected restaurant for further usage
  const [checked, setChecked] = React.useState([]);

  const { get } = useAPI();
  /**
   * Handles the selection of a restaurant.
   *
   * @param {number} value - The index of the selected restaurant.
   */
  const handleToggleRestaurant = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  //link to voting page
  const handleStartVote = () => {
    const selectedRestaurants = checked.map((index) => recommendations[index]);
    if (!selectedRestaurants || selectedRestaurants.length < 2) {
      showMessage("Please select more than 1 restaurants!");
      console.log(1111);
      return;
    }
    navigate("/voting", { state: JSON.stringify(selectedRestaurants) }); // 使用 navigate 进行跳转并传递状态
  };
  /**
   * Capitalizes the first letter of each word in a string.
   *
   * @param {string} str - The string to capitalize.
   *
   * @returns {string} The capitalized string.
   *
   * @example
   * capitalizeEveryWord('hello world');
   * // Returns 'Hello World'
   *
   */
  function capitalizeEveryWord(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  useEffect(() => {
    setPageTitle("Our Recommendations");
    setIsLoading(true);
    // Fetch recommendations from the API
    const fetchRecommendations = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/recommendations/restaurant/${location}?cuisine=${cuisine}&ageGroup=${ageGroup}`;
        console.log("Fetching recommendations from: ", url);
        const response = await get(url);
        console.log("recommendation response: ", response);
        setRecommendations(response.data); // Assuming the API returns an array of recommendations
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (isLoading) {
    return (
      <Box
        pt={10}
        pb={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.99)), url('/landing/restaurant.png')"
              : theme.palette.background.default,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h1" gutterBottom>
            Restaurant Recommendations for {capitalizeEveryWord(location)}
          </Typography>
          <br />
          <br />
          <h4>{`Loading ${cuisine} restaurants for ${ageGroup}`}</h4>
          <LinearProgress />
        </Container>
      </Box>
    );
  }

  return (
    <Box
      pt={10}
      pb={10}
      sx={{
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.99)), url('/landing/restaurant.png')"
            : theme.palette.background.default,
      }}
    >
      <Snackbar
        ClickAwayListenerProps={{ mouseEvent: false }}
        open={openSnackbar}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={
          <Box display="flex" flexDirection="row" width="100%">
            <IconButton
              aria-label="Snackbar close icon"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
        }
      >
        <div>
          <Alert onClose={handleClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </div>
      </Snackbar>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Restaurant Recommendations for {capitalizeEveryWord(location)}
        </Typography>
        <List>
          {recommendations.map(
            (restaurant, index) => (
              (restaurant.index = index),
              (restaurant.handleListItemClick = handleListItemClick),
              (restaurant.selected = selectedIndex),
              (restaurant.checked = checked),
              (restaurant.handleToggleRestaurant = handleToggleRestaurant),
              (restaurant.lableId = `checkbox-list-label-${restaurant.index}`),
              (
                <RestaurantElement
                  key={restaurant.name}
                  restaurant={restaurant}
                />
              )
            ),
          )}
          <Divider variant="inset" component="li" />
        </List>
        <Button
          variant="contained"
          disableElevation
          onClick={handleStartVote}
          id="start-a-vote-button"
        >
          Start a vote
        </Button>
      </Container>
    </Box>
  );
};

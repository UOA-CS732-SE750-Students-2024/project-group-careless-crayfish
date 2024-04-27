import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import RestaurantElement from './RestaurantElement';
import { useAPI } from '../GlobalProviders';
import { useNavigate } from "react-router-dom";

export const RestaurantRecommendations = () => {
  const { location } = useParams(); // Extract the location parameter from the current route
  const navigate = useNavigate();

  // recommendations is an array of objects, each object represents a restaurant
  const [recommendations, setRecommendations] = useState([]);

  // selectedIndex is the index of the selected restaurant to display details
  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
    index // number
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
    navigate("/voting", { state: JSON.stringify(selectedRestaurants) }); // 使用 navigate 进行跳转并传递状态
  };
  //-------------------
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
    // Fetch recommendations from the API
    const fetchRecommendations = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/recommendations/restaurant/${location}`;
        console.log("Fetching recommendations from: ", url);
        const response = await get(url);
        console.log("recommendation response: ", response);
        setRecommendations(response.data); // Assuming the API returns an array of recommendations
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <Box mt={10}>
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
            )
          )}
          <Divider variant="inset" component="li" />
        </List>
        <Button
          variant="contained"
          disableElevation
          // onClick={() => {
          //   checked.sort().map((index) => {
          //     console.log(index, recommendations[index].name);
          //   }); //handleStartVote
          // }}
          onClick={handleStartVote}
        >
          Start a vote (currently just log to console)
        </Button>
      </Container>
    </Box>
  );
};

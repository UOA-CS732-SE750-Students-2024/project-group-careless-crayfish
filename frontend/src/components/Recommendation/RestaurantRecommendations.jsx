import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import RestaurantElement from './RestaurantElement';

export const RestaurantRecommendations = () => {
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
    index, // number
  ) => {
    setSelectedIndex(index);
  };

  // checked is the index of the selected restaurant for further usage
  const [checked, setChecked] = React.useState([]);

  /**
   * Handles the selection of a restaurant.
   *
   * @param {number} value - The index of the selected restaurant.
   */
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    // Fetch recommendations from the API
    const fetchRecommendations = async () => {
      try {
        console.log("Fetching recommendations");
        const response = await axios.get('http://localhost:3000/api/recommendation/restaurant/auckland');
        console.log("recommendation response: ", response);
        setRecommendations(response.data); // Assuming the API returns an array of recommendations
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Restaurant Recommendations for Auckland
      </Typography>
      <List>
        {recommendations.map((restaurant, index) => (
          restaurant.index = index,

          restaurant.handleListItemClick = handleListItemClick,
          restaurant.selected = selectedIndex,
          
          restaurant.checked = checked,
          restaurant.handleToggle = handleToggle,
          restaurant.lableId = `checkbox-list-label-${restaurant.index}`,
          <RestaurantElement key={restaurant.name} restaurant={restaurant} />
        ))}
        <Divider variant="inset" component="li" />
      </List>
    </Container>
  );
};
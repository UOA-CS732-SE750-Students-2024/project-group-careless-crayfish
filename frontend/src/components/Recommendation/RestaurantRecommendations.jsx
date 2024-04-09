import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import RestaurantElement from './RestaurantElement';

export const RestaurantRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event, // React.MouseEvent<HTMLDivElement, MouseEvent>
    index, // number
  ) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
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
          restaurant.onClick = handleListItemClick,
          restaurant.selected = selectedIndex,
          restaurant.index = index,
          <RestaurantElement key={restaurant.name} restaurant={restaurant} />
        ))}
        <Divider variant="inset" component="li" />
      </List>
    </Container>
  );
};
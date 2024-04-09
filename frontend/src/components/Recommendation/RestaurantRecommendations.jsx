import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import RestaurantDetails from './RestaurantDetails';

export const RestaurantRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        console.log("Fetching recommendations");
        const response = await axios.get('http://localhost:3000/api/recommendation/restaurant/auckland');
        console.log(response);
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
        {recommendations.map((restaurant) => (
          <RestaurantDetails key={restaurant.name} restaurant={restaurant} />
        ))}
      </List>
    </Container>
  );
};
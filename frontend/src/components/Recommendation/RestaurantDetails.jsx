import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const RestaurantDetails = ({ restaurant }) => {
  return (
    <ListItem key={restaurant.name}>
      <ListItemText
        primary={`${restaurant.name} (${restaurant.priceRange})`}
        secondary={`Description: ${restaurant.description} Location: ${restaurant.location}`}
      />
    </ListItem>
  );
};

export default RestaurantDetails;
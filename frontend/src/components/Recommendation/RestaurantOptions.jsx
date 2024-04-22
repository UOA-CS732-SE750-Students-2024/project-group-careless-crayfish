import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Container, Box } from '@mui/material';

export const RestaurantOptions = () => {
  const [ageGroup, setAgeGroup] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [location, setLocation] = useState('Auckland City');
  const navigateTo = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log(`ageGroup: ${ageGroup}, crusine: ${cuisine}, Location: ${location}`);

    // Redirect to the recommendation page
    navigateTo(`/recommend/restaurants/${location}?ageGroup=${ageGroup}&cuisine=${cuisine}`);
  };

  return (
    <Box mt={10}><Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="age-group-label">Age Group</InputLabel>
          <Select 
            labelId="age-group-label" 
            id="age-group" 
            name="age-group" 
            value={ageGroup} 
            onChange={(event) => setAgeGroup(event.target.value)}
          >
            <MenuItem value="child">Child</MenuItem>
            <MenuItem value="teen">Teen</MenuItem>
            <MenuItem value="adult">Adult</MenuItem>
            <MenuItem value="elderly">Elderly</MenuItem>
            <MenuItem value="random">Random</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="cuisine-label">Cuisine</InputLabel>
          <Select 
            labelId="cuisine-label" 
            id="cuisine" 
            name="cuisine"
            value={cuisine}
            onChange={(event) => setCuisine(event.target.value)}
          >
            <MenuItem value="asian">Asian</MenuItem>
            <MenuItem value="european">European</MenuItem>
            <MenuItem value="american">American</MenuItem>
            <MenuItem value="african">African</MenuItem>
            <MenuItem value="random">Random</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Where do you want to eat?"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Get Recommended Restaurant
        </Button>
      </form>
    </Container></Box>
  );
};
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { useRoute } from "../GlobalProviders";
import { useTheme } from "@mui/material/styles";

export const RestaurantOptions = () => {
  const [ageGroup, setAgeGroup] = useState("adult");
  const [cuisine, setCuisine] = useState("asian");
  const [location, setLocation] = useState("Auckland City");
  const navigateTo = useNavigate();
  const { pageTitle, setPageTitle } = useRoute();
  const theme = useTheme();

  useEffect(() => {
    setPageTitle("Select Dining Preferences");
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log(
      `ageGroup: ${ageGroup}, crusine: ${cuisine}, Location: ${location}`,
    );

    // Redirect to the recommendation page
    navigateTo(
      `/authenticated/recommend/restaurants/${location}?ageGroup=${ageGroup}&cuisine=${cuisine}`,
    );
  };

  return (
    <Box
      sx={{
        p: 3,
        pt: 10,
        pb: 10,
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md" sx={{ opacity: "1" }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Choose Your Dining Options
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="age-group-label">Age Group</InputLabel>
            <Select
              label="Age Group"
              labelId="age-group-label"
              id="age-group"
              name="age-group"
              value={ageGroup}
              onChange={(event) => setAgeGroup(event.target.value)}
            >
              {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
              <MenuItem value="child">Child</MenuItem>
              <MenuItem value="teen">Teen</MenuItem>
              <MenuItem value="adult">Adult</MenuItem>
              <MenuItem value="elderly">Elderly</MenuItem>
              <MenuItem value="random">Random</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="cuisine-label">Cuisine</InputLabel>
            <Select
              label="Cuisine"
              labelId="cuisine-label"
              id="cuisine"
              name="cuisine"
              value={cuisine}
              onChange={(event) => setCuisine(event.target.value)}
            >
              {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
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
            sx={{ marginTop: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ display: "block", width: "auto", marginTop: 2 }}
          >
            Get Recommended Restaurant
          </Button>
        </form>
      </Container>
    </Box>
  );
};

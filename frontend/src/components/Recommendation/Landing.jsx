import React, { useEffect } from "react";

import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Box, Button } from "@mui/material";
import { useRoute } from "../GlobalProviders";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  const handleRestaurantClick = () => {
    navigate("/authenticated/recommend/restaurant-options");
  };

  const { pageTitle, setPageTitle } = useRoute();
  useEffect(() => {
    setPageTitle("Recommendation");
  });
  return (
    <Box mt={10}>
      <Container maxWidth="md">
        <p>
          Welcome to the Recommendation page. Please select a location to get
          started.
        </p>
        <Button
          id="landing-restaurant"
          color="secondary"
          onClick={handleRestaurantClick}
        >
          Restaurant
        </Button>
      </Container>
    </Box>
  );
};

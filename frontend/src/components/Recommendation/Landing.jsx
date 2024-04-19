import React from 'react';

import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

export const Landing = () => {
  return (
    <div>
      <Container maxWidth="md">
        <h1>Recommendation</h1>
        <p>
          Welcome to the Recommendation page. Please select a location to get started.
        </p>
        <Link href="/recommend/restaurant-options" color="secondary">
          Restaurant
        </Link>
      </Container>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Container, Box, Typography } from '@mui/material';
import { useRoute } from '../GlobalProviders';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const RestaurantOptions = () => {
  const [ageGroup, setAgeGroup] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [location, setLocation] = useState("Auckland City");
  const navigateTo = useNavigate();
  const { pageTitle, setPageTitle } = useRoute();
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

// Create a custom theme to change the colors and styles
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
    },
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#1976d2',
            '&.Mui-focused': {
              color: '#1976d2',
              //transform: 'translate(0, -1.5rem) scale(0.75)', // Adjusts the label's position when focused
              zIndex: 1, // Ensures label is above the border
              backgroundColor: '#f0f0f0', // Same as the box background color
              padding: '0 4px', // Prevents background clipping text
            },
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& fieldset': {
              borderColor: '#1976d2',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#115293',
            }
          }
        }
      }
    }
  });

  return (
      <ThemeProvider theme={theme}>
        <Box
            sx={{
              mt: 10,
              p: 3,
              backgroundColor: '#f0f0f0', // Light grey background
              color: '#1976d2',  // Blue text color
              display: 'flex',
              gap: '20px',
              alignItems: 'center'
            }}
        >
          <Container maxWidth="md">
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Choose Your Dining Options</Typography>
            <form onSubmit={handleSubmit}>
              <FormControl variant="outlined" fullWidth margin="normal" sx={{ width: '60%' }}>
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
                  <MenuItem value="">None</MenuItem>  // Added None option
                  <MenuItem value="child">Child</MenuItem>
                  <MenuItem value="teen">Teen</MenuItem>
                  <MenuItem value="adult">Adult</MenuItem>
                  <MenuItem value="elderly">Elderly</MenuItem>
                  <MenuItem value="random">Random</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal" sx={{ width: '60%' }}>
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
                  <MenuItem value="">None</MenuItem>  // Added None option
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
                  sx={{ width: '60%', marginTop: 2 }}
              />

              <Button type="submit" variant="contained" color="primary" sx={{ display: 'block', width: 'auto', marginTop: 2 }}>
                Get Recommended Restaurant
              </Button>
            </form>
          </Container>
        </Box>
      </ThemeProvider>
  );
};
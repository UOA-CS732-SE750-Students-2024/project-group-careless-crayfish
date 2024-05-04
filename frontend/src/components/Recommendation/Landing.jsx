import React, { useEffect } from "react";

import { useRoute } from "../GlobalProviders";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography, CardActionArea } from "@mui/material";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


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
      <Container maxWidth="md" display="flex" >
        <Typography variant="h3" align="center">
          Find me ... 
        </Typography>
        <br/><br/>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Card mt={4} sx={{ maxWidth: 500, margin: '4px' }} onClick = {handleRestaurantClick}>
          <CardActionArea>
            <CardMedia
              sx={{ height: 180 }}
              image="/public/landing/restaurant.png"
              title="Restaurant to go"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Restaurant
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Looking for a chill spot to grab a bite with the gang?
              </Typography>
            </CardContent>
          </CardActionArea>
          </Card>

          <Card mt={4} sx={{ maxWidth: 500, margin: '4px' }}>
          <CardActionArea>
            <CardMedia
              sx={{ height: 180 }}
              image="/public/landing/club.png"
              title="Club to go"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Club
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Looking for a cool spot to chill and have a blast with my buddies!
              </Typography>
            </CardContent>
          </CardActionArea>
          </Card>

          <Card mt={4} sx={{ maxWidth: 500, margin: '4px' }} >
          <CardActionArea>
            <CardMedia
              sx={{ height: 180 }}
              image="/public/landing/museum.png"
              title="art"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Art And History
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Discover the Wonders of Art and History! Visit Local Top Museums This Weekend!
              </Typography>
            </CardContent>
          </CardActionArea>
          </Card>

          <Card mt={4} sx={{ maxWidth: 500, margin: '4px' }} >
          <CardActionArea>
            <CardMedia
              sx={{ height: 180 }}
              image="/public/landing/outdoor.png"
              title="outdoor"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Outdoor
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Searching for an outdoor spot to work out?
              </Typography>
            </CardContent>
          </CardActionArea>
          </Card>

          <Card mt={4} sx={{ maxWidth: 500, margin: '4px' }} >
          <CardActionArea>
            <CardMedia
              sx={{ height: 180 }}
              image="/public/landing/theater.png"
              title="theater"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Movie
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Recommend me a awesome movie to watch!
              </Typography>
            </CardContent>
          </CardActionArea>
          </Card>
          
          <Card mt={4} sx={{ maxWidth: 500, margin: '4px' }} >
          <CardActionArea>
            <CardMedia
              sx={{ height: 180 }}
              image="/public/landing/sports.png"
              title="art"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Sports Club
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Netball? Basketball? Soccer? Recommend a popular sports club to me!
              </Typography>
            </CardContent>
          </CardActionArea>
          </Card>

        </Box>
      </Container>
    </Box>
  );
};

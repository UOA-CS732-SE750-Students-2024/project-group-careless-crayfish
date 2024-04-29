import React, { useMemo } from "react";

import { Checkbox, ListItem, Card, CardMedia, CardContent, Typography, CardHeader, CardActions, IconButton, Collapse } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const RestaurantElement = ({ restaurant }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const randomImageNumber = useMemo(() => Math.floor(Math.random() * 20) + 1, [restaurant.name]);
  restaurant.imageUrl = `/public/restaurants/${randomImageNumber}.jpeg`;
  restaurant.mapUrl = `https://www.google.com/maps/search/?api=1&query=${restaurant.location}`;

  return (
    <>
      {/* 1. Restaurant element */}
      <ListItem
        key={restaurant.index}
        className="restaurant-element"
        // onClick={restaurant.handleToggleRestaurant(restaurant.index)}
        secondaryAction={
          <Checkbox
            edge="end"
            checked={restaurant.checked.indexOf(restaurant.index) !== -1}
            onChange={restaurant.handleToggleRestaurant(restaurant.index)}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": restaurant.labelId }}
          />
        }
      >
        <Card
          className="restaurant-element-button"
          selected={restaurant.selected === restaurant.index}
          onClick={(event) => {
            restaurant.handleToggleRestaurant(restaurant.index);
            restaurant.handleListItemClick(event, restaurant.index);
          }}
        >
          <CardHeader
            title={restaurant.name}
            subheader={restaurant.location}
          />
          <CardMedia
            component="img"
            height="140"
            image={restaurant.imageUrl}
            alt={restaurant.name}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {restaurant.detailIntroduction}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton 
              aria-label="open map"
              onClick = {() => window.open(restaurant.mapUrl)}
            >
              <MapIcon />
            </IconButton>
            <IconButton 
              aria-label="open website"
              onClick = {() => window.open(restaurant.websiteUrl)}
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Open Hours</Typography>
              <Typography paragraph>
                {
                  Object.keys(restaurant.openHours).map((key) => (
                    <div key={key}>
                      {key} : {restaurant.openHours[key]}
                    </div>
                  ))
                
                }
              </Typography>
            </CardContent>
          </Collapse>
        </Card>

      </ListItem>
    </>
  );
};

export default RestaurantElement;

import React, { useMemo } from "react";
import Container from "@mui/material/Container";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Card, CardMedia, CardContent, Typography, CardHeader, CardActions, IconButton } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import PlaceIcon from '@mui/icons-material/Place';

const RestaurantElement = ({ restaurant }) => {
  // State for the expanded details
  const [open, setOpen] = React.useState(false);

// Function to handle the expand button
  const handleFoldUnFoldDetails = () => {
    setOpen(!open);
  };

  const randomImageNumber = useMemo(() => Math.floor(Math.random() * 20) + 1, [restaurant.name]);
  restaurant.imageUrl = `/public/restaurants/${randomImageNumber}.jpeg`;

  return (
    <>
      {/* 1. Restaurant element */}
      <ListItem
        key={restaurant.index}
        className="restaurant-element"
        onClick={restaurant.handleToggleRestaurant(restaurant.index)}
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
            restaurant.handleListItemClick(event, restaurant.index);
            handleFoldUnFoldDetails(event);
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
              {restaurant.briefIntroduction}
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
          </CardActions>
        </Card>

      </ListItem>
    </>
  );
};

export default RestaurantElement;

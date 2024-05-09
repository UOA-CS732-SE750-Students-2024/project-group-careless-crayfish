import React, { useMemo } from "react";

import {
  Checkbox,
  ListItem,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardHeader,
  CardActions,
  IconButton,
  Collapse,
  Stack,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PollIcon from "@mui/icons-material/Poll";

const RestaurantElement = ({ restaurant }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const randomImageNumber = useMemo(
    () => Math.floor(Math.random() * 30) + 1,
    [restaurant.name],
  );
  restaurant.imageUrl = `/restaurants/${randomImageNumber}.jpg`;
  restaurant.mapUrl = `https://www.google.com/maps/search/?api=1&query=${restaurant.location}`;

  return (
    <>
      {/* 1. Restaurant element */}
      <ListItem
        sx={{ paddingLeft: 0, paddingRight: 0 }}
        key={restaurant.index}
        className="restaurant-element"
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
            action={
              <Stack direction="row" alignItems="center">
                <PollIcon />
                <Checkbox
                  sx={{ paddingLeft: 0 }}
                  edge="end"
                  checked={restaurant.checked.indexOf(restaurant.index) !== -1}
                  onChange={restaurant.handleToggleRestaurant(restaurant.index)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": restaurant.labelId }}
                  id={`${restaurant.name.replaceAll(" ", "-")}`}
                />
              </Stack>
            }
          />
          <CardMedia
            component="img"
            height="300"
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
              onClick={() => window.open(restaurant.mapUrl)}
            >
              <MapIcon />
            </IconButton>
            <IconButton
              aria-label="open website"
              onClick={() => window.open(restaurant.websiteUrl)}
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
              {typeof restaurant.openHours === "string" ? (
                <div>{restaurant.openHours}</div>
              ) : (
                Object.keys(restaurant.openHours).map((key) => (
                  <div key={key}>
                    {key} : {restaurant.openHours[key]}
                  </div>
                ))
              )}
            </CardContent>
          </Collapse>
        </Card>
      </ListItem>
    </>
  );
};

export default RestaurantElement;

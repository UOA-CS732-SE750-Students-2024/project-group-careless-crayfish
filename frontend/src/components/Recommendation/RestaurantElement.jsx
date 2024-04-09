import React from 'react';
import Container from '@mui/material/Container';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

const RestaurantElement = ({ restaurant }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setOpen(!open);
  };

  return (<>
      <ListItemButton key={restaurant.name}
        selected = {restaurant.selected === restaurant.index}
        onClick={(event) => {
          restaurant.onClick(event, restaurant.index);
          handleClick(event);
        }}
      >
        <ListItemText
          primary={`${restaurant.name} (${restaurant.priceRange})`}
          secondary={`Description: ${restaurant.description} Location: ${restaurant.location}`}
        />
        {/* Add a container for the image, map, and other details */}
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {`${restaurant.name} details`}
        <br/>
        {`place holder for image, map, and other details`}
      </Collapse>
    </>
  );
};

export default RestaurantElement;
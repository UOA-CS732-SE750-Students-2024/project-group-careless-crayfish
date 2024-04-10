import React from 'react';
import Container from '@mui/material/Container';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const RestaurantElement = ({ restaurant }) => {

  // State for the expanded details
  const [open, setOpen] = React.useState(false);

  // Function to handle the expand button
  const handleFoldUnFoldDetails = () => {
    setOpen(!open);
  };

  return (<>
      {/* 1. Restaurant element */}
      <ListItem key={restaurant.index}
        secondaryAction={
          <Checkbox
              edge="end"
              checked={restaurant.checked.indexOf(restaurant.index) !== -1}
              onChange={restaurant.handleToggleRestaurant(restaurant.index)}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': restaurant.labelId }}
            />
        }
      >
        {/* 1.1 Clickable */}
        <ListItemButton 
          selected = {restaurant.selected === restaurant.index}
          onClick={(event) => {
            restaurant.handleListItemClick(event, restaurant.index);
            handleFoldUnFoldDetails(event);
          }}
        >  
          <ListItemIcon>
            <RestaurantIcon />
          </ListItemIcon>

          {/* Restaurant details */}
          <ListItemText
            primary={`${restaurant.name} (${restaurant.priceRange})`}
            secondary={`Description: ${restaurant.description} Location: ${restaurant.location}`}
          />

          {/* Expand button */}
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>

      {/* Collapsed details */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Container maxWidth="lg">
          {`${restaurant.name} details`}
          <br/>
          {`place holder for image, map, and other details`}
        </Container>
      </Collapse>
    </>
  );
};

export default RestaurantElement;
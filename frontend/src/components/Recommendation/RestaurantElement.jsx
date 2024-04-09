import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';

const RestaurantElement = ({ restaurant }) => {

  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setOpen(!open);
  };

  console.log(restaurant);

  return (<>
      {/* Restaurant element */}
      <ListItemButton key={restaurant.index}
        selected = {restaurant.selected === restaurant.index}
        onClick={(event) => {
          restaurant.handleListItemClick(event, restaurant.index);
          handleClick(event);
        }}
      >
        {/* Checkbox to select the restaurant */}
        <ListItemIcon onClick={restaurant.handleToggle(restaurant.index)}>
          <Checkbox
            edge="start"
            checked={restaurant.checked.indexOf(restaurant.index) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': restaurant.labelId }}
          />
        </ListItemIcon>

        {/* Restaurant details */}
        <ListItemText
          primary={`${restaurant.name} (${restaurant.priceRange})`}
          secondary={`Description: ${restaurant.description} Location: ${restaurant.location}`}
        />

        {/* Expand button */}
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* Collapsed details */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        {`${restaurant.name} details`}
        <br/>
        {`place holder for image, map, and other details`}
      </Collapse>

    </>
  );
};

export default RestaurantElement;
import { createContext, useContext, useEffect, useState } from "react";
import {
  MuiTheme,
  useAuth,
  useLocalStorage,
  useMuiTheme,
  useRoute,
} from "../GlobalProviders";
import {
  AppBar,
  Avatar,
  Grid,
  ListItemButton,
  Menu,
  MenuItem,
  MenuList,
  Slide,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Person2Icon from "@mui/icons-material/Person2";
import { Navigate, useNavigate } from "react-router-dom";
const HeaderContext = createContext({});

export const useHeader = () => useContext(HeaderContext);

const HeaderProvider = () => {
  const { toggleLightDarkTheme, theme } = useMuiTheme();

  const { getItem } = useLocalStorage();
  const { pageTitle, setPageTitle } = useRoute();

  const handleThemeSwitchClick = () => {
    toggleLightDarkTheme();
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const { logout, user } = useAuth();

  const isMenuOpen = Boolean(anchorEl);
  const handleLogoutLinkCLick = (event) => {
    handleMenuClose(event);
    logout();
    navigate("/");
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuToggle = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    handleMenuClose();
    navigate("/authenticated/profile");
  };
  return (
    <HeaderContext.Provider value={{}}>
      <AppBar>
        <Toolbar>
          <Box flexWrap="nowrap" flexGrow="1">
            {/* For decorative icons, set aira-hidden to true */}

            <Slide direction="right" in={true} timeout={500}>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography>{pageTitle}</Typography>
              </Box>
            </Slide>
          </Box>

          <Box>
            <Tooltip
              title={`Toggle light/dark mode - Currently ${theme} mode.`}
            >
              <Switch
                checked={theme === MuiTheme.Dark}
                onChange={handleThemeSwitchClick}
                inputProps={{
                  "aria-label": `Toggle light/dark mode - Currently ${theme} mode.`,
                }}
              />
            </Tooltip>
          </Box>
          <Box flexGrow={0}>
            <Typography variant="h6" noWrap>
              {user && user.userName} {/* Displaying the user's name */}
            </Typography>
          </Box>
          <Grid>
            <Box display="flex">
              <Tooltip>
                <ListItemButton
                  id="demo-positioned-button"
                  aria-controls={
                    isMenuOpen ? "demo-positioned-menu" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={isMenuOpen ? "true" : undefined}
                  onClick={handleMenuToggle}
                >
                  {user ? (
                    <Avatar alt={user.userName} src={user.imageUrl} />
                  ) : (
                    <Person2Icon fontSize="large" />
                  )}
                </ListItemButton>
              </Tooltip>

              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuList autoFocusItem={isMenuOpen}>
                  <MenuItem
                    aria-label={"menu profile link"}
                    onClick={handleProfileClick}
                    id="profile-button"
                  >
                    <Typography noWrap>profile</Typography>
                  </MenuItem>
                  <MenuItem
                    aria-label={"menu logout link"}
                    onClick={handleLogoutLinkCLick}
                    id="logout-button"
                  >
                    <Typography noWrap>logout</Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </HeaderContext.Provider>
  );
};
export default HeaderProvider;

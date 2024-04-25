import { createContext, useContext, useState } from "react";
import { MuiTheme, useAuth, useMuiTheme } from "../GlobalProviders";
import {
  AppBar,
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
const HeaderContext = createContext({});

export const useHeader = () => useContext(HeaderContext);

const HeaderProvider = () => {
  const { toggleLightDarkTheme, theme } = useMuiTheme();
  const handleThemeSwitchClick = () => {
    toggleLightDarkTheme();
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const { logout } = useAuth();
  const isMenuOpen = Boolean(anchorEl);
  const handleLogoutLinkCLick = (event) => {
    handleMenuClose(event);
    logout();
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuToggle = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <HeaderContext.Provider value={{}}>
      <AppBar>
        <Toolbar>
          <Box flexWrap="nowrap" flexGrow="1">
            {/* For decorative icons, set aira-hidden to true */}

            <Slide direction="right" in={true} timeout={500}>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography>
                  Put acommodations and voting logic below
                </Typography>
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

          <Grid>
            <Box display="flex">
              <Tooltip title={`account`}>
                <ListItemButton
                  id="demo-positioned-button"
                  aria-controls={
                    isMenuOpen ? "demo-positioned-menu" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={isMenuOpen ? "true" : undefined}
                  onClick={handleMenuToggle}
                >
                  <Person2Icon fontSize="large" />
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
                    onClick={handleMenuClose}
                  >
                    <Typography noWrap>profile</Typography>
                  </MenuItem>
                  <MenuItem
                    aria-label={"menu logout link"}
                    onClick={handleLogoutLinkCLick}
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

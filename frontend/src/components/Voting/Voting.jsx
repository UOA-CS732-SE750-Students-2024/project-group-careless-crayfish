import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Typography,
  Snackbar,
  Container,
  List,
  CardMedia,
} from "@mui/material";
import {
  Checkbox,
  ListItem,
  Card,
  CardContent,
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
import { useTheme } from "@mui/material/styles";
import { useAPI, useAuth, useRoute } from "../GlobalProviders";
import { v4 } from "uuid";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import CountDownWapper from "./timer";
export const Voting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [voted, setVoted] = useState(false);
  const [votedIndex, setVotedIndex] = useState("");
  const [title, setTitle] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [voteId, setVoteId] = useState("");
  const [status, setStatus] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [expanded, setExpanded] = useState([]);
  const [link, setLink] = useState(
    `${window.location.origin}/voting?voteId=${voteId}`,
  );
  // get current time，format datetime-local
  const now = new Date();
  const formattedNow = formatDateTimeLocal(now);

  // calculate the time after 24h
  const maxTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const formattedMaxTime = formatDateTimeLocal(maxTime);

  function formatDateTimeLocal(date) {
    return date.toISOString().slice(0, 16);
  }
  const { user } = useAuth();
  const handleExpandClick = (index) => {
    setExpanded((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  // use theme
  const theme = useTheme();
  // use page title
  const { pageTitle, setPageTitle } = useRoute();
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const showMessage = (message, severity = "info") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  useEffect(() => {
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);
    const voteId = params.get("voteId");
    setPageTitle("Voting your favorite restaurant");

    if (location.state) {
      setSelectedRestaurants(JSON.parse(location.state));
    }

    if (voteId) {
      setLink(`${window.location.origin}/voting?voteId=${voteId}`);
      fetch(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/votes/${voteId}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
        .then((res) => res.json())
        .then((res) => {
          setSelectedRestaurants([...res.recommend]);
          console.log(res);
          setTitle(res.title);
          setStatus(res.status);
          setExpiryTime(res.endDate);
          if (
            new Date(res.endDate).getTime() < new Date().getTime() ||
            res.status
          ) {
            setVoted(true);
            showMessage("Session Expired", "error");
          }
        });
    }
    setVoteId(voteId);
  }, [location.state]);

  const incrementVote = (index) => {
    if (index === votedIndex || voted) {
      return;
    }
    setVotedIndex(index);
    //selectedRestaurants[index].count++;
  };

  const handleVote = async () => {
    if (voted) {
      showMessage("You already voted", "error");
      return;
    }
    if (!votedIndex && votedIndex !== 0) {
      showMessage("Please select votes", "error");
    }
    selectedRestaurants[votedIndex].count++;
    const sendData = {
      voteId,
      recommend: selectedRestaurants,
    };
    fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/votes/update`, {
      method: "put",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 20000) {
          setVoted(true);
          showMessage("Vote successful!", "success");
        } else {
          showMessage(res.data, "error");
        }
      })
      .catch(() => {
        showMessage("Failed to vote", "error");
      });
  };
  const endVote = async () => {
    const sendData = {
      voteId,
      status: true,
    };
    fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/votes/update`, {
      method: "put",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 20000) {
          setStatus(true);
          showMessage("session End", "success");
        } else {
          showMessage(res.data, "error");
        }
      })
      .catch(() => {
        showMessage("Failed to end session", "error");
      });
  };
  const createVote = async () => {
    const sendData = {
      status,
      endDate: new Date(expiryTime),
      recommend: selectedRestaurants,
      title,
      startDate: new Date(),
    };

    fetch(
      `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/votes/${user.userId}`,
      {
        method: "post",
        body: JSON.stringify(sendData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 20000) {
          navigate(`/voting?voteId=${res.data._id}`);
          showMessage("Vote created successfully!", "success");
        } else {
          showMessage(res.data, "error");
        }
      })
      .catch(() => {
        showMessage("Failed to create vote", "error");
      });
  };

  const handleClose = () => {
    setSnackbarMessage(null);
    setOpenSnackbar(false);
  };

  return (
    <Box
      pt={10}
      pb={10}
      sx={{
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.99)), url('/landing/restaurant.png')"
            : theme.palette.background.default,
      }}
    >
      <Container maxWidth="md">
        <Snackbar
          ClickAwayListenerProps={{ mouseEvent: false }}
          open={openSnackbar}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          action={
            <Box display="flex" flexDirection="row" width="100%">
              <IconButton
                aria-label="Snackbar close icon"
                color="inherit"
                size="small"
                onClick={handleClose}
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </Box>
          }
        >
          <div>
            <Alert onClose={handleClose} severity={snackbarSeverity}>
              {snackbarMessage}
            </Alert>
          </div>
        </Snackbar>

        {voteId ? (
          status ? (
            <Typography variant="h4" gutterBottom>
              Voting session Ended
            </Typography>
          ) : (
            <Box>
              <Typography variant="h4" gutterBottom>
                Vote title: {title}
              </Typography>
            </Box>
          )
        ) : (
          <Box>
            <TextField
              label="Vote Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              sx={{
                background:
                  theme.palette.mode === "light"
                    ? "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.99))"
                    : "rgba(90, 90, 90, 0.9)",
              }}
            />

            <TextField
              label="Expiry Time"
              type="datetime-local"
              fullWidth
              value={expiryTime}
              onChange={(e) => setExpiryTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: formattedNow,
                max: formattedMaxTime,
              }}
              margin="normal"
              sx={{
                background:
                  theme.palette.mode === "light"
                    ? "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.99))"
                    : "rgba(90, 90, 90, 0.9)",
              }}
            />
            <Button variant="contained" color="primary" onClick={createVote}>
              Create Vote With the above Options!
            </Button>
          </Box>
        )}

        <Box pt={2}>
          <Typography variant="h4" component="h1" gutterBottom>
            Selected Recommendations
          </Typography>
        </Box>
        <List>
          {selectedRestaurants.map((restaurant, index) => (
            <ListItem
              sx={{ paddingLeft: 0, paddingRight: 0 }}
              key={restaurant.name + v4()}
            >
              <Card
                sx={{
                  mb: 2,
                  p: 2,
                  background:
                    index === votedIndex && voted
                      ? `linear-gradient(${
                          theme.palette.mode === "light"
                            ? "rgba(230, 255, 230, 0.9), rgba(255, 255, 255, 0.99)"
                            : "rgba(60, 60, 60, 0.9), rgba(30, 30, 30, 0.99)"
                        })`
                      : `linear-gradient(${
                          theme.palette.mode === "light"
                            ? "rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.99)"
                            : "rgba(90, 90, 90, 0.9), rgba(60, 60, 60, 0.99)"
                        })`,
                }}
              >
                <CardHeader
                  title={restaurant.name}
                  subheader={restaurant.location}
                />
                <CardMedia
                  component="img"
                  height="200"
                  image={restaurant.imageUrl}
                  alt={restaurant.name}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.detailIntroduction}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  {/* votedId indicate vote already created */}
                  {/* status == true => session end */}
                  {voteId && (
                    <Button
                      variant="contained"
                      onClick={() => incrementVote(index)}
                      disabled={!voteId || status || voted}
                    >
                      {!status &&
                        (voted
                          ? `Voted: ${restaurant.count}`
                          : index === votedIndex
                            ? "Voted"
                            : "Vote")}
                      {status && `Voted: ${restaurant.count}`}
                    </Button>
                  )}
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
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={expanded[index]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
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
          ))}
        </List>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Stack direction="row" spacing={1}>
            {voteId && !status && (
              <Button onClick={handleVote} variant="contained" color="success">
                {voted ? "Voted" : "Confirm Vote"}
              </Button>
            )}
            {voteId && !status && (
              <>
                <Button variant="contained" color="error" onClick={endVote}>
                  End now
                </Button>
                <Button className="countdown">
                  Session end:
                  <span
                    className="lastTime"
                    style={{ margin: "10px", fontSize: "16px", color: "blue" }}
                  >
                    <CountDownWapper
                      expire={expiryTime}
                      showDomStruct={true}
                      onExpire={endVote}
                    />
                  </span>
                </Button>
              </>
            )}
          </Stack>
        </Box>

        {voteId && link && (
          <Box display="flex" alignItems="center">
            <TextField
              label="Share this link with friends"
              variant="outlined"
              fullWidth
              value={`${window.location.origin}/voting?voteId=${voteId}`}
              margin="normal"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Voting;

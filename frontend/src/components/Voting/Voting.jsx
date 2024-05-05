import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Typography,
  Snackbar,
  Alert,
  Container,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { useTheme } from '@mui/material/styles';
import { useRoute } from '../GlobalProviders';

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
  // use theme
  const theme = useTheme();
  // use page title
  const { pageTitle, setPageTitle } = useRoute();

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
      fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/votes/getDetail?voteId=${voteId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setSelectedRestaurants([...res.recommend]);
          setStatus(res.status);
          if (
            new Date(res.expires).getTime() < new Date().getTime() ||
            res.status
          ) {
            setVoted(true);
            showMessage("Session Expired", "error");
          }
        })
        .catch(() => {
          showMessage("Failed to fetch data", "error");
        });
    }
    setVoteId(voteId);
  }, [location.state]);

  const incrementVote = (index) => {
    if (index === votedIndex || voted) {
      return;
    }
    setVotedIndex(index);
    selectedRestaurants[index].count++;
  };

  const handleVote = async () => {
    if (voted) {
      showMessage("You already voted", "error");
      return;
    }
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
      expires: expiryTime,
      recommend: selectedRestaurants,
      title,
    };
    fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/votes/create`, {
      method: "post",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
      },
    })
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

  return (
    <Box 
      pt={10}
      pb={10}
      sx = {{
        background: theme.palette.mode === 'light' ? "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.99)), url('/landing/restaurant.png')" : theme.palette.background.default,
    }}>
      <Container maxWidth="md">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {voteId ? (
        status ? (
          <Typography variant="h4" gutterBottom>
            Voting session Ended
          </Typography>
        ) : (
          <Box>
            <Typography variant="h4" gutterBottom>
              {title}: Please vote!
            </Typography>
            <Button
              variant="contained"
              color="error"
              //onClick={() => setStatus(true)}
              onClick={endVote}
            >
              End now
            </Button>
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
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={createVote}>
            Create Vote With the following Options!
          </Button>
        </Box>
      )}

      <br/>
      {selectedRestaurants.map((restaurant, index) => (
        <Stack
          key={restaurant.name}
          direction="row"
          spacing={2}
          sx={{
            mb: 2,
            p: 2,
            bgcolor: index === votedIndex && voted ? "#e6ffe6" : "#f0f0f0",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{restaurant.name}</Typography>
            <Typography>{restaurant.detailIntroduction}</Typography>
            <Typography>{`${restaurant.location} - ${restaurant.priceRange}`}</Typography>
            {voted && <Typography>Votes: {restaurant.count}</Typography>}
          </Box>
          {voteId && !status && (
            <Button
              variant="contained"
              onClick={() => incrementVote(index)}
              disabled={voted}
            >
              {index === votedIndex ? "Voted" : "Vote"}
            </Button>
          )}
        </Stack>
      ))}

      {voteId && !status && (
        <Button onClick={handleVote} variant="contained" color="success">
          {voted ? "Voted" : "Confirm Vote"}
        </Button>
      )}

      {voteId && (
        <p>
          Share this link:{" "}
          <a
            href={`${window.location.origin}/voting?voteId=${voteId}`}
          >{`${window.location.origin}/voting?voteId=${voteId}`}</a>
        </p>
      )}
    </Container>
    </Box>
  );
};

export default Voting;

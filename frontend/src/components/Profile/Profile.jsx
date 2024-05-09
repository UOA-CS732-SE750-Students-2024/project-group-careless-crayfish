import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  CircularProgress,
  Collapse,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";
import React, { useEffect, useState } from "react";
import { useAPI, useAuth, useRoute } from "../GlobalProviders";
import { v4 } from "uuid";
import _ from "lodash";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { CommentDialogPaginated } from "../Comment";
import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";

export const Profile = () => {
  const { pageTitle, setPageTitle } = useRoute();
  const { get } = useAPI();
  const { user } = useAuth();

  useEffect(() => {
    setPageTitle("Profile");
  });
  const [votes, setVotes] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };
  const [isLoadingVotes, setIsLoadingVotes] = useState(false);
  const limit = 5;

  const fetchAllVotes = async () => {
    try {
      setIsLoadingVotes(true);

      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/users/${user.userId}/votes`,
      );
      setVotes(response.data);
      setExpanded(new Array(response.data.length).fill(false));
    } finally {
      setIsLoadingVotes(false);
    }
  };

  useEffect(() => {
    fetchAllVotes();
  }, []);
  const [openComments, setOpenComments] = useState(false);
  const [currVoteId, setCurrVoteId] = useState("");

  const handleToggleCommentsDialog = (voteId) => {
    setOpenComments(!openComments);
    setCurrVoteId(voteId);
  };

  if (!user) {
    return (
      <Typography variant="h4" component="h1" gutterBottom>
        You need to login to see this page.
      </Typography>
    );
  }
  return (
    <Box mt={10} textAlign="center">
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Voting history for {user.userName}
        </Typography>
        {!votes ||
          (votes.length == 0 && <Typography>No voting history</Typography>)}
        {votes.map((vote, index) => {
          // Sort the recommend array in descending order based on the count property
          const sortedRecommend = vote.recommend.sort(
            (a, b) => b.count - a.count,
          );
          const highestCount =
            sortedRecommend.length > 0 ? sortedRecommend[0].count : 0;
          return (
            <List key={vote._id + v4()}>
              <Typography variant="h4" component="h1" gutterBottom>
                Vote title: {vote.title}
              </Typography>
              {sortedRecommend.map((restaurant, idx) => (
                <ListItem
                  sx={{ paddingLeft: 0, paddingRight: 0, width: "100%" }}
                  key={restaurant.name + v4()}
                >
                  <Card>
                    <CardHeader
                      title={restaurant.name}
                      subheader={restaurant.location}
                      action={
                        // Added action prop for avatar
                        <Avatar
                          sx={{
                            bgcolor:
                              restaurant.count === highestCount
                                ? "green"
                                : "primary.main",
                            color: "white",
                          }}
                        >
                          {restaurant.count}
                        </Avatar>
                      }
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
                      {restaurant.count == highestCount && idx == 0 && (
                        <Tooltip title={"Open votes dialog"}>
                          <IconButton
                            variant="contained"
                            color="primary"
                            onClick={() => handleToggleCommentsDialog(vote._id)}
                          >
                            <CommentIcon />
                          </IconButton>
                        </Tooltip>
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
          );
        })}
        <CommentDialogPaginated
          openComments={openComments}
          setOpenComments={setOpenComments}
          userId={user.userId}
          voteId={currVoteId}
          voteTitle={
            currVoteId &&
            votes &&
            votes.find((vote) => vote._id === currVoteId).title
          }
        />
      </Container>
    </Box>
  );
};

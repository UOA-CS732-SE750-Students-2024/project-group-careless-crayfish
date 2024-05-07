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
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [isLoadingVotes, setIsLoadingVotes] = useState(false);
  const limit = 5;

  const fetchAllVotes = async () => {
    try {
      setIsLoadingVotes(true);

      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/votes/${user.userId}`,
      );
      setVotes(response.data);
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

  return (
    <Box mt={10} textAlign="center">
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Voting history for {user.userName}
        </Typography>
        {votes.map((vote) => {
          const recommend = vote.recommend;

          return (
            <List key={vote._id + v4()}>
              <Typography variant="h4" component="h1" gutterBottom>
                Vote title: {vote.title}
              </Typography>
              {recommend.map((restaurant, index) => (
                <ListItem
                  sx={{ paddingLeft: 0, paddingRight: 0 }}
                  key={restaurant.name + v4()}
                >
                  <Card>
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
                      <Tooltip title={"Open votes dialog"}>
                        <IconButton
                          variant="contained"
                          color="primary"
                          onClick={() => handleToggleCommentsDialog(vote._id)}
                        >
                          <CommentIcon />
                        </IconButton>
                      </Tooltip>
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
                        {Object.keys(restaurant.openHours).map((key) => (
                          <div key={key}>
                            {key} : {restaurant.openHours[key]}
                          </div>
                        ))}
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
        />
      </Container>
    </Box>
  );
};

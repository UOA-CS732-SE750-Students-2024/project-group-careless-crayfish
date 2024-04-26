import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAPI } from "../GlobalProviders";
import { v4 } from "uuid";
import _ from "lodash";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { CommentDialogPaginated } from "../Comment";
import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
export const Profile = () => {
  const [openComments, setOpenComments] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [currVoteId, setCurrVoteId] = useState("");
  const handleExpandClick = (voteId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [voteId]: !prevExpanded[voteId],
    }));
  };

  const votingResults = {
    userId: "string",
    votes: [
      {
        voteId: "string",
        winner: {
          votingItemId: "uid",
          occurence: 2,
          name: "winning restaurant",
          description: "bla",
          pictureUrl: "",
        },
        candidates: [
          {
            votingItemId: "uid",
            occurence: 2,
            name: "restaurant 1",
            description: "bla",
            pictureUrl: "",
          },
          {
            votingItemId: "uid",
            occurence: 5,
            name: "restaurant 2",
            description: "bla",
            pictureUrl: "",
          },
          {
            votingItemId: "uid",
            occurence: 10,
            name: "restaurant 3",
            description: "bla",
            pictureUrl: "",
          },
        ],
        complete_date: "ISO 8601", // 2024-04-23T07:55:26Z
      },
      {
        voteId: "string1",
        winner: {
          votingItemId: "uid",
          occurence: 2,
          name: "winning restaurant",
          description: "bla",
          pictureUrl: "",
        },
        candidates: [
          {
            votingItemId: "uid",
            occurence: 2,
            name: "restaurant 1",
            description: "bla",
            pictureUrl: "",
          },
          {
            votingItemId: "uid",
            occurence: 5,
            name: "restaurant 2",
            description: "bla",
            pictureUrl: "",
          },
        ],
        complete_date: "ISO 8601", // 2024-04-23T07:55:26Z
      },
    ],
  };

  const handleToggleCommentsDialog = (voteId) => {
    console.log(false);
    setOpenComments(!openComments);
    setCurrVoteId(voteId);
  };

  return (
    <Box mt={10} textAlign="center">
      <Container maxWidth="md">
        {votingResults.votes.map((vote) => (
          <Card key={vote.voteId + v4()} sx={{ marginBottom: 2 }}>
            <CardHeader
              title={vote.winner.name}
              subheader={`${vote.candidates.length} candidates`}
            />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {vote.winner.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Tooltip title={"Open comments dialog"}>
                <IconButton
                  variant="contained"
                  color="primary"
                  onClick={() => handleToggleCommentsDialog(vote.voteId)}
                >
                  <CommentIcon />
                </IconButton>
              </Tooltip>
              <IconButton
                onClick={() => handleExpandClick(vote.voteId)}
                aria-expanded={expanded[vote.voteId] || false}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded[vote.voteId]} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                {vote.candidates.map((candidate) => (
                  <Typography key={candidate.votingItem1Id + v4()} paragraph>
                    {candidate.name}
                  </Typography>
                ))}
              </CardContent>
            </Collapse>
          </Card>
        ))}

        <CommentDialogPaginated
          openComments={openComments}
          setOpenComments={setOpenComments}
          userId={votingResults.userId}
          voteId={currVoteId}
        />
      </Container>
    </Box>
  );
};

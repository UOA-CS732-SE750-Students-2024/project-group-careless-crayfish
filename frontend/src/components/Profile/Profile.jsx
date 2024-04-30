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
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAPI, useRoute } from "../GlobalProviders";
import { v4 } from "uuid";
import _ from "lodash";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { CommentDialogPaginated } from "../Comment";
import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";

const vr = {
  userId: "106433914132318818488",
  votes: [
    {
      voteId: "bla",
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
      voteId: "blabla",
      winner: {
        votingItemId: "uid",
        occurence: 2,
        name: "winning restaurant 2",
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

export const Profile = () => {
  const { pageTitle, setPageTitle } = useRoute();
  const { get } = useAPI();
  useEffect(() => {
    setPageTitle("Profile");
  });
  const [votes, setVotes] = useState([]);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingVotes, setIsLoadingComments] = useState(false);
  const limit = 5;
  const handleHasMoreButtonClick = () => {
    fetchNextVotes(page);
  };

  const userId = vr.userId;
  const fetchLatestVotes = async () => {
    try {
      setIsLoadingComments(true);
      const totalNumRecordsResp = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/votes/totalNumRecords/${userId}`,
      );

      const lastPageIndex = Number.isInteger(totalNumRecordsResp.data / limit)
        ? totalNumRecordsResp.data / limit - 1
        : Math.floor(totalNumRecordsResp.data / limit);
      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/votes/${userId}?page=${lastPageIndex}&limit=${limit}`,
      );
      setPage(lastPageIndex);
      setHasMore(true);
      setVotes(response.data);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const fetchNextVotes = async (page) => {
    try {
      const nextPage = page + 1;
      setPage(nextPage);

      if (nextPage <= 0) {
        setHasMore(false);
        return;
      }

      setIsLoadingComments(true);

      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/votes/${userId}?page=${nextPage}&limit=${limit}`,
      );

      if (response && response.data.length > 0) {
        const map = new Map(
          [...response.data, ...votes].map((obj) => [obj._id, obj]),
        );
        const deduplicatedComments = Array.from(map.values());
        setVotes(deduplicatedComments);
        setHasMore(true);
      }
    } finally {
      setIsLoadingComments(false);
    }
  };
  useEffect(() => {
    fetchLatestVotes();
  }, []);
  const [openComments, setOpenComments] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [currVoteId, setCurrVoteId] = useState("");
  const handleExpandClick = (voteId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [voteId]: !prevExpanded[voteId],
    }));
  };

  const handleToggleCommentsDialog = (voteId) => {
    setOpenComments(!openComments);
    setCurrVoteId(voteId);
  };

  return (
    <Box mt={10} textAlign="center">
      <Container maxWidth="md">
        {vr.votes.map((vote) => (
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
              <Tooltip title={"Open votes dialog"}>
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
                {vote.candidates.map((candidate) => (
                  <Typography key={candidate.votingItem1Id + v4()} paragraph>
                    {candidate.name}
                  </Typography>
                ))}
              </CardContent>
            </Collapse>
          </Card>
        ))}
        <Box textAlign="center">
          {hasMore ? (
            <Button onClick={handleHasMoreButtonClick}>
              {isLoadingVotes ? <CircularProgress /> : "Previous Page"}
            </Button>
          ) : (
            <Typography>No more votes</Typography>
          )}
        </Box>
        <CommentDialogPaginated
          openComments={openComments}
          setOpenComments={setOpenComments}
          userId={userId}
          voteId={currVoteId}
        />
      </Container>
    </Box>
  );
};

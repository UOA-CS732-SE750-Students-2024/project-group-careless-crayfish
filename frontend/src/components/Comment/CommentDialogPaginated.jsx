import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAPI } from "../GlobalProviders";
import { v4 } from "uuid";
import _ from "lodash";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Box } from "@mui/system";
export const CommentDialogPaginated = ({
  openComments,
  setOpenComments,
  userId,
  voteId,
}) => {
  const [page, setPage] = useState(0);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [input, setInput] = useState("");
  const [isAICheckbox, setIsAICheckbox] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isGeneratingAIResponse, setIsGeneratingAIResponse] = useState(false);
  const limit = 5;
  const { get, post } = useAPI();

  const fetchLatestComments = async () => {
    try {
      if (!voteId || !openComments || !userId) {
        return;
      }
      setIsLoadingComments(true);
      const totalNumRecordsResp = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/comments/totalNumRecords/${voteId}`,
      );

      const lastPageIndex = Number.isInteger(totalNumRecordsResp.data / limit)
        ? totalNumRecordsResp.data / limit - 1
        : Math.floor(totalNumRecordsResp.data / limit);
      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/comments/${userId}/${voteId}?page=${lastPageIndex}&limit=${limit}`,
      );
      setPage(lastPageIndex);
      setHasMore(true);
      setComments(response.data);
    } finally {
      setIsLoadingComments(false);
      setInput("");
    }
  };

  const fetchPreviousPageComments = async (page) => {
    try {
      if (!voteId || !openComments || !userId) {
        return;
      }
      setPage(page - 1);
      const prevPage = page - 1;
      if (prevPage <= 0) {
        setHasMore(false);
        return;
      }

      setIsLoadingComments(true);

      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/comments/${userId}/${voteId}?page=${prevPage}&limit=${limit}`,
      );

      if (response && response.data.length > 0) {
        const map = new Map(
          [...response.data, ...comments].map((obj) => [obj._id, obj]),
        );
        const deduplicatedComments = Array.from(map.values());
        setComments(deduplicatedComments);
        setHasMore(true);
      }
    } finally {
      setIsLoadingComments(false);
      setInput("");
    }
  };
  useEffect(() => {
    fetchLatestComments();
  }, [voteId, userId, openComments]);

  const handleHasMoreButtonClick = () => {
    fetchPreviousPageComments(page);
  };
  const handleClose = () => {
    setOpenComments(false);
    setComments([]);
    setIsAICheckbox(false);
    setIsSubmittingComment(false);
    setIsGeneratingAIResponse(false);
  };
  const handleCheckboxChange = (event) => {
    setIsAICheckbox(event.target.checked);
  };
  const handleCommentTextFieldChange = (event) => {
    setInput(event.target.value);
  };

  const handleCommentSubmission = async () => {
    let createdComment = null;

    try {
      setIsSubmittingComment(true);
      const response = await post(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/comments`,
        { userId, voteId, isAI: false, comment: input },
      );

      if (response && response.data) {
        createdComment = response.data;

        await fetchLatestComments();
      }

      setIsSubmittingComment(false);
    } catch (err) {
      setIsSubmittingComment(false);
    }
    if (isAICheckbox) {
      processAIResponse(createdComment);
    }
  };

  const processAIResponse = async (createdComment) => {
    try {
      setIsGeneratingAIResponse(true);
      setIsSubmittingComment(true);
      const response = await post(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/comments/ai`,
        { userId, voteId, commentId: createdComment.commentId },
      );

      if (response && response.data) {
        await fetchLatestComments();
      }

      setIsSubmittingComment(false);
    } catch (err) {
      setIsGeneratingAIResponse(false);
      setIsSubmittingComment(false);
    }
  };
  return (
    <Dialog open={openComments} onClose={handleClose} fullScreen>
      <DialogTitle>Comments for Voting Result {voteId}</DialogTitle>
      <DialogContent dividers>
        <Box textAlign="center">
          {hasMore ? (
            <Button onClick={handleHasMoreButtonClick}>
              {isLoadingComments ? <CircularProgress /> : "Previous Page"}
            </Button>
          ) : (
            <Typography>No more comments</Typography>
          )}
        </Box>
        {comments.map((comment) => (
          <Card key={comment.commentId + v4()} sx={{ marginBottom: 2 }}>
            <CardHeader
              avatar={
                comment.isAI ? (
                  <SmartToyIcon />
                ) : (
                  <Avatar src={comment.avatarUrl} />
                )
              }
              title={comment.userId}
              subheader={comment.lastModifiedDate}
            />
            <CardContent>
              <p>{comment.comment}</p>
            </CardContent>
          </Card>
        ))}

        <Box textAlign="center">
          <Grid container direction="column" alignItems={"center"} spacing={2}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                onChange={handleCommentTextFieldChange}
                autoFocus
                placeholder="Put in your comment or ask AI questions"
                margin="dense"
                type="text"
                fullWidth
                value={input}
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAICheckbox}
                  onChange={handleCheckboxChange}
                  name="askAI"
                  color="primary"
                />
              }
              label="Ask AI"
            />
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        {isSubmittingComment &&
          isAICheckbox &&
          "Generating AI answer to your question..."}
        {isSubmittingComment && !isAICheckbox && "Submitting your comment"}
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmission}
          disabled={isSubmittingComment || !input}
        >
          {isSubmittingComment ? (
            <CircularProgress size={24} />
          ) : (
            "Submit Comment"
          )}
        </Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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

  const fetchComments = async () => {
    try {
      if (!voteId || !openComments || !userId) {
        return;
      }
      setIsLoadingComments(true);
      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/comments/${userId}/${voteId}?page=${page}&limit=${limit}`,
      );

      if (response && response.data.length > 0) {
        setHasMore(true);
        const map = new Map(
          [...response.data, ...comments].map((obj) => [obj._id, obj]),
        );
        const deduplicatedComments = Array.from(map.values());
        setComments(deduplicatedComments);
      } else {
        setHasMore(false);
      }
    } finally {
      setIsLoadingComments(false);
      setInput("");
    }
  };
  useEffect(() => {
    fetchComments();
  }, [page, voteId, userId, openComments]);

  const handleHasMoreButtonClick = () => {
    setPage(page + 1);
  };
  const handleClose = () => {
    setOpenComments(false);
    setComments([]);
    setIsAICheckbox(false);
    setIsSubmittingComment(false);
    setIsGeneratingAIResponse(false);
    setPage(0);
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

        await fetchComments();
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
        await fetchComments();
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
          {hasMore ? (
            <Button onClick={handleHasMoreButtonClick}>
              {isLoadingComments ? <CircularProgress /> : "Previous Page"}
            </Button>
          ) : (
            <Typography>No more comments</Typography>
          )}
        </Box>
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

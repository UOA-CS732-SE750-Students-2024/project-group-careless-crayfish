const express = require("express");
const router = express.Router();
const logger = require("../utils/logger.js");
const commentService = require("../services/commentService.js");

/**
 * @swagger
 * /api/comments/{voteId}:
 *   get:
 *     tags:
 *       - Comment Controller
 *     summary: Get total num records
 *     parameters:
 *       - in: path
 *         name: voteId
 *         schema:
 *           type: string
 *       - in: query
 *         name: isTotalCount
 *         schema:
 *           type: boolean
 *         description: are we getting the count of comments for the voteId.
 *     responses:
 *       '200':
 *         description: Comments retrieved successfully
 *       '401':
 *         description: Unauthorized - Authentication required
 *       '403':
 *         description: Forbidden - Comment does not have permission to access this resource
 *       '500':
 *         description: Internal server error - Something went wrong on the server side
 */
router.get("/:voteId", async function getCommentsBy(req, res) {
  try {
    const { voteId } = req.params;
    const { isTotalCount } = req.query;
    if (isTotalCount) {
      res.status(200).json(await commentService.getTotalNumRecords({ voteId }));
      return;
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    if (error.response?.status) {
      res.status(error.response.status).json({ error: error.message });
      return;
    }
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/comments/{userId}/{voteId}:
 *   get:
 *     tags:
 *       - Comment Controller
 *     summary: Get paginated comments for userId and voteId
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *       - in: path
 *         name: voteId
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page.
 *     responses:
 *       '200':
 *         description: Comments retrieved successfully
 *       '401':
 *         description: Unauthorized - Authentication required
 *       '403':
 *         description: Forbidden - Comment does not have permission to access this resource
 *       '500':
 *         description: Internal server error - Something went wrong on the server side
 */
router.get("/:userId/:voteId", async function getCommentsBy(req, res) {
  try {
    const { userId, voteId } = req.params;
    const { page, limit } = req.query;

    const comments = await commentService.getCommentsBy(
      { userId, voteId, commentId: null },
      page,
      limit
    );

    res.json(comments);
  } catch (error) {
    logger.error(JSON.stringify(error));
    if (error.response?.status) {
      res.status(error.response.status).json({ error: error.message });
      return;
    }
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/comments/{userId}/{voteId}:
 *   post:
 *     tags:
 *     - Comment Controller
 *     consumes: application/json
 *     summary: Create a new comment
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: voteId
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *                 type: string
 *             isAI:
 *                 type: boolean
 *             voteId:
 *                 type: string
 *             comment:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *       '401':
 *         description: Unauthenticated
 *       '403':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post("/:userId/:voteId", async function createComment(req, res) {
  const { comment, isAI } = req.body;
  const { userId, voteId } = req.params;
  try {
    const createdComment = await commentService.createComment({
      userId,
      voteId,
      comment,
      isAI,
    });
    res.status(201).json(createdComment);
  } catch (error) {
    logger.error(error);
    res.status(500).json(error);
  }
});

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     tags:
 *     - Comment Controller
 *     summary: Delete a comment by ID
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Comment deleted successfully
 *       '401':
 *         description: Unauthenticated
 *       '403':
 *         description: Unauthorized
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/:commentId", async function deleteComment(req, res) {
  const { commentId } = req.params;
  try {
    const deletedComment = await commentService.deleteComment(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    logger.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

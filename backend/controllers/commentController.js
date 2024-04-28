const express = require("express");
const router = express.Router();
const logger = require("../utils/logger.js");
const commentService = require("../services/commentService.js");
const geminiQueryService = require("../services/geminiQueryService");

/**
 * @swagger
 * /api/comments/totalNumRecords:
 *   get:
 *     tags:
 *       - Comment Controller
 *     summary: Get total num records
 *     parameters:
 *         name: voteId
 *         schema:
 *           type: string
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
router.get("/totalNumRecords/:voteId", async function getCommentsBy(req, res) {
  try {
    const { voteId } = req.params;
    res.status(200).json(await commentService.getTotalNumRecords({ voteId }));
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
    const { page = 0, limit = 10 } = req.query;

    const comments = await commentService.getCommentsBy({
      userId,
      voteId,
      page,
      limit,
    });

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
 * /api/comments:
 *   post:
 *     tags:
 *     - Comment Controller
 *     consumes: application/json
 *     summary: Create a new comment
 *     parameters:
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
router.post("/", async function createComment(req, res) {
  try {
    const comment = await commentService.createComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    logger.error(JSON.stringify(error));
    res.status(500).json(error);
  }
});

/**
 * @swagger
 * /api/comments/ai:
 *   post:
 *     tags:
 *     - Comment Controller
 *     summary: Save an AI comment to a user comment on one of the voting results.
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *                 type: string
 *             voteId:
 *                 type: boolean
 *             commentId:
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
router.post("/ai", async (req, res) => {
  try {
    const { userId, voteId, commentId } = req.body;

    const createdAIComment = await geminiQueryService.getAIComment({
      userId,
      voteId,
      commentId,
    });
    res.json(createdAIComment);
  } catch (error) {
    logger.info(error);
    console.log(error);
    logger.error(JSON.stringify(error));
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;

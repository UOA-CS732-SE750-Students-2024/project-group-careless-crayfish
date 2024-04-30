/**
 * Express router for handling vote-related routes.
 * @module voteController
 */

const express = require("express");
const router = express.Router();
const logger = require("../utils/logger.js");
const voteService = require("../services/voteService");

/**
 * @swagger
 * /api/votes/{userId}:
 *   get:
 *     tags:
 *       - Vote Controller
 *     summary: Get vote results.
 *     parameters:
 *       - in: path
 *         name: userId
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
 *         description: Votes retrieved successfully
 *       '401':
 *         description: Unauthorized - Authentication required
 *       '403':
 *         description: Forbidden - User does not have permission to access this resource
 *       '500':
 *         description: Internal server error - Something went wrong on the server side
 */
router.get("/votes/:userId", async function getVotesByUserId(req, res) {
  try {
    const { userId } = req.params;
    const { page = 0, limit = 10 } = req.query;
    logger.info(
      "getting vote results for userId=" +
        userId +
        " page=" +
        page +
        " limit=" +
        limit
    );

    const votes = await voteService.getVotesBy(userId, page, limit);
    logger.info(
      "got vote results for userId=" +
        userId +
        " page=" +
        page +
        " limit=" +
        limit
    );
    res.json(JSON.parse(votes));
  } catch (error) {
    logger.error(error);
    res.status(error.response.status).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/votes/{userId}:
 *   get:
 *     tags:
 *       - Vote Controller
 *     summary: Get paginated votes for userId and userId
 *     parameters:
 *       - in: path
 *         name: userId
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
 *         description: Votes retrieved successfully
 *       '401':
 *         description: Unauthorized - Authentication required
 *       '403':
 *         description: Forbidden - Vote does not have permission to access this resource
 *       '500':
 *         description: Internal server error - Something went wrong on the server side
 */
router.get("/:userId", async function getVotesBy(req, res) {
  try {
    const { userId } = req.params;
    const { page, limit } = req.query;

    const votes = await voteService.getVotesBy(
      {
        userId,
      },
      page,
      limit
    );

    res.json(votes);
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
 * /api/votes/totalNumRecords:
 *   get:
 *     tags:
 *       - Vote Controller
 *     summary: Get total num records
 *     parameters:
 *         name: userId
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Votes retrieved successfully
 *       '401':
 *         description: Unauthorized - Authentication required
 *       '403':
 *         description: Forbidden - Vote does not have permission to access this resource
 *       '500':
 *         description: Internal server error - Something went wrong on the server side
 */
router.get("/totalNumRecords/:userId", async function getVotesBy(req, res) {
  try {
    const { userId } = req.params;
    res.status(200).json(await voteService.getTotalNumRecords({ userId }));
  } catch (error) {
    logger.error(JSON.stringify(error));
    if (error.response?.status) {
      res.status(error.response.status).json({ error: error.message });
      return;
    }
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;

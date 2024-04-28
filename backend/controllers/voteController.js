/**
 * Express router for handling vote-related routes.
 * @module voteController
 */

const express = require("express");
const router = express.Router();
const logger = require("../utils/logger.js");
// a temporal file and shall be removed when the actual endpoint is ready
const voteResult = require("../resources/auckland_restaurants.json");
const voteService = require("../services/voteService");
/**
 * Route for creating a new vote.
 * @name POST /restaurant
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @swagger
 * /restaurant:
 *   post:
 *     tags:
 *     - Vote Controller
 *     summary: Create a new vote.
 *     consumes: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             restaurantId:
 *               type: string
 *      responses:
 *       '200':
 *         description: Vote created successfully
 *       '500':
 *         description: Internal server error
 */
router.post("/restaurant/", async function createVote(req, res) {
  try {
    // dummy code
    const voteEntity = {
      url: "http://localhost:3000/api/vote/1",
    };
    res.status(201).json(voteEntity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Route for fetching a vote by ID.
 * @name GET /restaurant/:voteId
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @swagger
 * /restaurant/{voteId}:
 *   get:
 *     tags:
 *     - Vote Controller
 *     summary: Get vote by voteId
 *     parameters:
 *       - in: path
 *       name: voteId
 *       schema:
 *         type: string
 *         required: true
 *         description: Vote ID
 *     responses:
 *       '200':
 *         description: Vote found
 *       '404':
 *         description: Vote not found
 *       '500':
 *         description: Internal server error
 */
router.get("/restaurant/:voteId", async (req, res) => {
  try {
    // dummy code
    const voteId = req.params.voteId;
    logger.info(`fetch vote "${voteId}"`);
    const voteEntity = voteResult;
    if (!voteEntity) {
      res.status(404).json({ error: "no vote found" });
      return;
    }
    logger.info(
      `vote for the following restaurants ${JSON.stringify(voteEntity)}:`
    );
    res.json(voteEntity);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/votingResults/{userId}:
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
 *         description: Comments retrieved successfully
 *       '401':
 *         description: Unauthorized - Authentication required
 *       '403':
 *         description: Forbidden - User does not have permission to access this resource
 *       '500':
 *         description: Internal server error - Something went wrong on the server side
 */
router.get(
  "/votingResults/:userId",
  async function getVotingResultsByUserId(req, res) {
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

      const votingResults = await voteService.getVotingResultsBy(
        userId,
        page,
        limit
      );
      logger.info(
        "got vote results for userId=" +
          userId +
          " page=" +
          page +
          " limit=" +
          limit
      );
      res.json(JSON.parse(votingResults));
    } catch (error) {
      logger.error(error);
      res.status(error.response.status).json({ error: error.message });
    }
  }
);
module.exports = router;

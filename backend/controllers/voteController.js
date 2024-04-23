/**
 * Express router for handling vote-related routes.
 * @module voteController
 */

const express = require("express");
const router = express.Router();
const logger = require('../utils/logger.js');
const voteResult = require("../../wiremock/__files/auckland_restaurants.json")

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
router.post("/restaurant", async function createVote(req, res) {
  try {
    // dummy code
    const voteEntity = {
      url: "http://localhost:3000/api/vote/1",
    }
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
    logger.info(`vote for the following restaurants ${JSON.stringify(voteEntity)}:`);
    res.json(voteEntity);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Add other routes as needed

module.exports = router;
const express = require("express");
const router = express.Router();
const voteService = require("../services/voteService.js");
const Response = require("../utils/response.js");
const logger = require("../utils/logger.js");

/**
 * @swagger
 * /api/votes/{userId}:
 *   post:
 *     tags:
 *       - Vote Controller
 *     consumes:
 *       - application/json
 *     summary: Create a new vote
 *     description: Allows users to create a new voting session with a title and multiple options.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: The title and options for the new vote.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: Title of the vote.
 *             recommend:
 *               type: array
 *               description: Different options that can be voted on.
 *               items:
 *                 type: object
 *                 properties:
 *                   option:
 *                     type: string
 *                     description: Description of the option.
 *                   count:
 *                     type: integer
 *                     default: 0
 *                     description: Initial vote count for the option.
 *     responses:
 *       201:
 *         description: Vote created successfully.
 *       500:
 *         description: Internal server error, unable to create vote.
 */
router.post("/:userId", async (req, res) => {
  try {
    const { title, recommend, startDate, endDate, status } = req.body;
    const { userId } = req.params;

    const vote = await voteService.createVote({
      title,
      recommend,
      userId,
      startDate,
      endDate,
      status,
    });
    res.status(200).json(Response.success(vote));
  } catch (error) {
    res.status(200).json(Response.internalServerError(error.message));
  }
});

/**
 * @swagger
 * /api/votes/{voteId}:
 *   get:
 *     tags:
 *       - Vote Controller
 *     summary: Get vote by voteId
 *     description: Retrieve detailed information of a vote by its ID.
 *     parameters:
 *       - in: path
 *         name: voteId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vote found successfully.
 *       404:
 *         description: Vote not found.
 *       500:
 *         description: Internal server error, unable to retrieve vote.
 */
router.get("/:voteId", async (req, res) => {
  try {
    const { voteId } = req.params;
    const vote = await voteService.getVote(voteId);
    if (!vote) {
      return res
        .status(200)
        .json({ code: 40400, data: null, message: "not found" });
    }
    return res.json(vote);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ code: 5000, data: null, msg: error.message });
  }
});
/**
 * @swagger
 * /api/votes/update/{voteId}:
 *   put:
 *     tags:
 *       - Vote Controller
 *     summary: Update a vote
 *     description: Update vote details including options or end the vote.
 *     parameters:
 *       - in: path
 *         name: voteId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the vote to be updated.
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             votes:
 *               type: array
 *               description: Array of vote changes.
 *               items:
 *                 type: object
 *                 properties:
 *                   option:
 *                     type: string
 *                     description: The voting option.
 *                   count:
 *                     type: integer
 *                     description: Updated count of votes.
 *     responses:
 *       200:
 *         description: Vote updated successfully.
 *       404:
 *         description: Vote not found.
 *       500:
 *         description: Internal server error, unable to update vote.
 */
router.put("/update", async (req, res) => {
  try {
    const voteId = req.body.voteId;
    const recommend = req.body.recommend;
    const endVote = req.body.status;
    var updatedVote;
    if (recommend != undefined) {
      updatedVote = await voteService.updateVote(voteId, recommend);
    } else {
      updatedVote = await voteService.endVote(voteId, endVote);
    }
    if (!updatedVote) {
      return res
        .status(200)
        .json({ code: 40400, data: null, message: "not found" });
    }
    return res
      .status(200)
      .json({ code: 20000, data: null, message: "update successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 50000, data: null, error: error.message });
  }
});

// Add other routes as needed

module.exports = router;

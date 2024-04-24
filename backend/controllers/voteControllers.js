const express = require("express");
const router = express.Router();
const voteService = require("../services/voteService.js");

/**
 * @swagger
 * /api/votes:
 *   post:
 *     tags:
 *     - Vote Controller
 *     consumes: application/json
 *     summary: Create a new vote
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             options:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   option:
 *                     type: string
 *                   count:
 *                     type: integer
 *                     default: 0
 *     responses:
 *       '201':
 *         description: Vote created successfully
 *       '500':
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
  try {
    const vote = await voteService.createVote(req.body);
    res.status(201).json(vote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/votes/{voteId}:
 *   get:
 *     tags:
 *     - Vote Controller
 *     summary: Get vote by voteId
 *     parameters:
 *       - in: path
 *         name: voteId
 *         schema:
 *           type: string
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
router.get("/:voteId", async (req, res) => {
  try {
    const voteId = req.params.voteId;
    const vote = await voteService.getVote(voteId);
    if (!vote) {
      return res.status(404).json({ error: "Vote not found" });
    }
    return res.json(vote);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/votes/{voteId}:
 *   put:
 *     tags:
 *     - Vote Controller
 *     summary: Update a vote
 *     parameters:
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
 *             votes:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   option:
 *                     type: string
 *                   count:
 *                     type: integer
 *     responses:
 *       '200':
 *         description: Vote updated successfully
 *       '404':
 *         description: Vote not found
 *       '500':
 *         description: Internal server error
 */
router.put("/:voteId", async (req, res) => {
  try {
    const voteId = req.params.voteId;
    const updatedVote = await voteService.updateVote(voteId, req.body);
    if (!updatedVote) {
      return res.status(404).json({ error: "Vote not found" });
    }
    return res.json(updatedVote);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Add other routes as needed

module.exports = router;

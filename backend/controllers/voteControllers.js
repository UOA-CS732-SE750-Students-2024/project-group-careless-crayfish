const express = require("express");
const router = express.Router();
const voteService = require("../services/voteService.js");
const Response = require("../utils/response.js");
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
router.post("/create", async (req, res) => {
  try {
    const vote = await voteService.createVote(req.body);
    res.status(200).json(Response.success(vote));
  } catch (error) {
    res.status(200).json(Response.internalServerError(error.message));
  }
});

/**
 * @swagger
 * /api/votes/getDetail:
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
router.get("/getDetail", async (req, res) => {
  try {
    const voteId = req.query.voteId;
    console.log(req.query, "voteId");
    const vote = await voteService.getVote(voteId);
    if (!vote) {
      return res
        .status(200)
        .json({ code: 40400, data: null, message: "not found" });
    }
    return res.json(vote);
  } catch (error) {
    return res.status(500).json({ code: 5000, data: null, msg: error.message });
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
router.post("/update", async (req, res) => {
  try {
    const voteId = req.body.voteId;
    const recommend = req.body.recommend;
    const updatedVote = await voteService.updateVote(voteId, recommend);
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

router.post("/endVote", async (req, res) => {
  try {
    const voteId = req.body.voteId;
    const status = req.body.status;
    const endVote = await voteService.endVote(voteId, status);
    if (!endVote) {
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

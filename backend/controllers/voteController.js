const express = require("express");
const router = express.Router();
const logger = require('../utils/logger.js');
const voteResult = require("../../wiremock/__files/auckland_restaurants.json")

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
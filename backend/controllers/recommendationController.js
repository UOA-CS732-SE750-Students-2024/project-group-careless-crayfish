const express = require("express");
const router = express.Router();
const geminiQueryService = require("../services/geminiQueryService.js");
const logger = require('../utils/logger.js');

/**
 * @swagger
 * /api/recommendation/restaurant/{location}:
 *   get:
 *     tags:
 *     - Recommendation Controller
 *     summary: Get restaurant recommendations by location
 *     parameters:
 *       - in: path
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *         description: like a city or a zip code
 *     responses:
 *       '200':
 *         description: item found
 *       '404':
 *         description: not found
 *       '500':
 *         description: Internal server error
 */
router.get("/restaurant/:location", async (req, res) => {
  try {
    const location = req.params.location;
    const recommentations = await geminiQueryService.fetchRestaurantRecommendations(location);
    if (!recommentations) {
      logger.error(error);
      res.status(404).json({ error: "no recommendation" });
      return;
    }
    logger.info(`recommend the following restaurants for ${location}: ${recommentations}`);
    res.json(JSON.parse(recommentations));
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Add other routes as needed

module.exports = router;

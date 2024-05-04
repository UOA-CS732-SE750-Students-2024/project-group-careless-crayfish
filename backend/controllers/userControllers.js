const express = require("express");
const router = express.Router();
const userService = require("../services/userService.js");

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *     - User Controller
 *     consumes: application/json
 *     summary: Create a new user
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *                 type: string
 *             userName:
 *                 type: string
 *             email:
 *                 type: string
 *             imageUrl:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '500':
 *         description: Internal server error
 */
router.post("/", async function createUser(req, res) {
  try {
    const { userName, email, userId, imageUrl } = req.body;

    const user = await userService.createUser({ userName, email, userId, imageUrl });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     tags:
 *     - User Controller
 *     summary: Get user by userId
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       '200':
 *         description: User found
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.get("/:userId", async function getUserById(req, res) {
  try {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Add other routes as needed

module.exports = router;

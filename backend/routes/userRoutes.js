const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

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
 *             email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '500':
 *         description: Internal server error
 */
router.post("/", userController.createUser);

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
router.get("/:userId", userController.getUserById);

// Add other routes as needed

module.exports = router;

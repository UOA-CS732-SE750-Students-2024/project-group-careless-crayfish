const express = require("express");
const router = express.Router();
const userService = require("../services/userService.js");
const { client_id, redirect_uri, client_secret } = require("./config");

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
 *             userName:
 *                 type: string
 *             email:
 *                 type: string
 *             password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '500':
 *         description: Internal server error
 */
router.post("/", async function createUser(req, res) {
  try {
    const { userName, email, password } = req.body;
  console.log('Received userName:', userName);
  console.log('Received email:', email);
  console.log('Received password:', password);
  const user= await userService.createUser(req.body);
   // const user = await userService.createUser(req.body);
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
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});


router.post("/authenticate", (req, res) => {
  const { code } = req.body;

  const data = new FormData();
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  data.append("code", code);
  data.append("redirect_uri", redirect_uri);

  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      let params = new URLSearchParams(paramsString);
      const access_token = params.get("access_token");

      // Request to return data of a user that has been authenticated
      return fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
    })
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});


module.exports = router;

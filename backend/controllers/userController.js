const userService = require("../services/userService");

async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Add other controller functions as needed

module.exports = {
  createUser,
  getUserById,
  // Export other functions
};

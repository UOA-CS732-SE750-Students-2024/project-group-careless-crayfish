const User = require("../models/user.js");

async function createUser({ userName, email, userId, imageUrl }) {
  return await User.create({ userName, email, userId, imageUrl });
}

async function getUserById(userId) {
  return await User.findOne({ userId });
}

// Add other CRUD operations as needed

module.exports = {
  createUser,
  getUserById,
  // Export other functions
};

const User = require("../models/user.js");

async function createUser(userData) {
  return await User.create(userData);
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

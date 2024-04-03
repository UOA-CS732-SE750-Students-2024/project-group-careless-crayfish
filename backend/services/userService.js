const userDao = require("../daos/userDao");

async function createUser(userData) {
  return await userDao.createUser(userData);
}

async function getUserById(userId) {
  return await userDao.getUserById(userId);
}

// Add other service functions as needed

module.exports = {
  createUser,
  getUserById,
  // Export other functions
};

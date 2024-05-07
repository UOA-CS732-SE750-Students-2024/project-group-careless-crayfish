const userDao = require("../daos/userDao.js");
const voteService = require("../services/voteService.js");
const logger = require("../utils/logger.js");

async function createUser({ userName, email, userId, imageUrl }) {
  logger.info(
    `Creating user with userName=${userName} email=${email} userId=${userId} imageUrl=${imageUrl}`
  );
  const user = await userDao.createUser({ userName, email, userId, imageUrl });

  logger.info(`Created user: ${JSON.stringify(user)}`);
  return user;
}

async function getAllVotes(userId) {
  logger.info(`Getting all votes for userId=${userId}`);
  return voteService.getAllVotes(userId);
}
async function getUserById(userId) {
  logger.info(`Getting user by userId=${userId}`);
  const user = await userDao.getUserById(userId);

  if (user == null) {
    return null;
  }

  return user;
}

// Add other service functions as needed

module.exports = {
  createUser,
  getUserById,
  getAllVotes,
  // Export other functions
};

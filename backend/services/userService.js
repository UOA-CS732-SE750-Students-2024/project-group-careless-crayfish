const userDao = require("../daos/userDao.js");
const logger = require("../utils/logger.js");

async function createUser({ userName, email, userId, imageUrl }) {
  logger.info(
    `Creating user with userName=${userName} email=${email} userId=${userId} imageUrl=${imageUrl}`
  );
  const user = await userDao.createUser({ userName, email, userId, imageUrl });

  logger.info(`Created user: ${JSON.stringify(user)}`);
  return user;
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
  // Export other functions
};

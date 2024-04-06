const userDao = require("../daos/userDao.js");
const { UserDto } = require("../dtos/userDto.js");

async function createUser(userData) {
  const user = await userDao.createUser(userData);

  if (user == null) {
    return null;
  }

  return new UserDto(user.userId, user.email);
}

async function getUserById(userId) {
  const user = await userDao.getUserById(userId);
  
  if (user == null) {
    return null;
  }
  
  return new UserDto(user.userId, user.email);
}

// Add other service functions as needed

module.exports = {
  createUser,
  getUserById,
  // Export other functions
};

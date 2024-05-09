describe("userService unit test", () => {
  test("test create user", async () => {
    // Given
    const userDao = require("../../daos/userDao.js");
    const userService = require("../../services/userService.js");
    const logger = require("../../utils/logger.js");
    jest.spyOn(logger, "info").mockImplementation(() => {});
    jest.spyOn(userDao, "createUser").mockImplementation(() => {
      return {
        userName: "userName",
        email: "email",
        userId: "userId",
        imageUrl: "imageUrl",
      };
    });
    // When
    const result = await userService.createUser({
      userName: "userName",
      email: "email",
      userId: "userId",
      imageUrl: "imageUrl",
    });
    // Then
    expect(result).toEqual({
      userName: "userName",
      email: "email",
      userId: "userId",
      imageUrl: "imageUrl",
    });
  });

  test("test get user by id", async () => {
    // Given
    const userDao = require("../../daos/userDao.js");
    const userService = require("../../services/userService.js");
    jest.spyOn(userDao, "getUserById").mockImplementation(() => {
      return {
        userName: "userName",
        email: "email",
        userId: "userId",
        imageUrl: "imageUrl",
      };
    });
    // When
    const result = await userService.getUserById("userId");
    // Then
    expect(result).toEqual({
      userName: "userName",
      email: "email",
      userId: "userId",
      imageUrl: "imageUrl",
    });
  });
});
describe("voteService unit test", () => {
  test("test get all votes", async () => {
    // Given
    const voteDao = require("../../daos/voteDao.js");
    const voteService = require("../../services/voteService.js");
    const logger = require("../../utils/logger.js");
    jest.spyOn(logger, "info").mockImplementation(() => {});
    jest.spyOn(voteDao, "getAllVotes").mockImplementation(() => {
      return [
        {
          title: "title1",
          recommend: "recommend1",
          userId: "userId1",
          startDate: "startDate1",
          endDate: "endDate1",
          status: "status1",
        },
        {
          title: "title2",
          recommend: "recommend2",
          userId: "userId2",
          startDate: "startDate2",
          endDate: "endDate2",
          status: "status2",
        },
      ];
    });
    // When
    const result = await voteService.getAllVotes("userId");
    // Then
    expect(result).toEqual([
      {
        title: "title1",
        recommend: "recommend1",
        userId: "userId1",
        startDate: "startDate1",
        endDate: "endDate1",
        status: "status1",
      },
      {
        title: "title2",
        recommend: "recommend2",
        userId: "userId2",
        startDate: "startDate2",
        endDate: "endDate2",
        status: "status2",
      },
    ]);
  });

  test("test get vote", async () => {
    // Given
    const voteDao = require("../../daos/voteDao.js");
    const voteService = require("../../services/voteService.js");
    jest.spyOn(voteDao, "getVoteById").mockImplementation(() => {
      return {
        title: "title",
        recommend: "recommend",
        userId: "userId",
        startDate: "startDate",
        endDate: "endDate",
        status: "status",
      };
    });
    // When
    const result = await voteService.getVote("id");
    // Then
    expect(result).toEqual({
      title: "title",
      recommend: "recommend",
      userId: "userId",
      startDate: "startDate",
      endDate: "endDate",
      status: "status",
    });
  });

  test("test update vote", async () => {
    // Given
    const voteDao = require("../../daos/voteDao.js");
    const voteService = require("../../services/voteService.js");
    jest.spyOn(voteDao, "updateVote").mockImplementation(() => {
      return {
        title: "title",
        recommend: "recommend",
        userId: "userId",
        startDate: "startDate",
        endDate: "endDate",
        status: "status",
      };
    });
    // When
    const result = await voteService.updateVote("id", "recommend");
    // Then
    expect(result).toEqual({
      title: "title",
      recommend: "recommend",
      userId: "userId",
      startDate: "startDate",
      endDate: "endDate",
      status: "status",
    });
  });

  test("test end vote", async () => {
    // Given
    const voteDao = require("../../daos/voteDao.js");
    const voteService = require("../../services/voteService.js");
    jest.spyOn(voteDao, "endVote").mockImplementation(() => {
      return {
        title: "title",
        recommend: "recommend",
        userId: "userId",
        startDate: "startDate",
        endDate: "endDate",
        status: "status",
      };
    });
    // When
    const result = await voteService.endVote("id", "status");
    // Then
    expect(result).toEqual({
      title: "title",
      recommend: "recommend",
      userId: "userId",
      startDate: "startDate",
      endDate: "endDate",
      status: "status",
    });
  });
});
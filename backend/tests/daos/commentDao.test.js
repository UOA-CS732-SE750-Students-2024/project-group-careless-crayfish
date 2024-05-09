describe("commentDao unit test", () => {
  test("test create comment", async () => {
    // Given
    const Comment = require("../../models/comment.js");
    const commentDao = require("../../daos/commentDao.js");
    jest.spyOn(Comment, "create").mockImplementation(() => {
      return {
        commentId: "commentId",
        userId: "userId",
        voteId: "voteId",
        content: "content",
      };
    });
    // When
    const result = await commentDao.createComment({
      commentId: "commentId",
      userId: "userId",
      voteId: "voteId",
      content: "content",
    });
    // Then
    expect(result).toEqual({
      commentId: "commentId",
      userId: "userId",
      voteId: "voteId",
      content: "content",
    });
  });

  test("test get comment by id", async () => {
    // Given
    const Comment = require("../../models/comment.js");
    const commentDao = require("../../daos/commentDao.js");
    jest.spyOn(Comment, "findOne").mockImplementation(() => {
      return {
        commentId: "commentId",
        userId: "userId",
        voteId: "voteId",
        content: "content",
      };
    });
    // When
    const result = await commentDao.getCommentsById("commentId");
    // Then
    expect(result).toEqual({
      commentId: "commentId",
      userId: "userId",
      voteId: "voteId",
      content: "content",
    });
  });

  test("test get comments by Id", async () => {
    // Given
    const Comment = require("../../models/comment.js");
    const commentDao = require("../../daos/commentDao.js");
    jest.spyOn(Comment, "findOne").mockImplementation(() => {
      return [
        {
          commentId: "commentId",
          userId: "userId",
          voteId: "voteId",
          content: "content",
        },
      ];
    });
    // When
    const result = await commentDao.getCommentsById(
      "userId"
    );
    // Then
    expect(result).toEqual([
      {
        commentId: "commentId",
        userId: "userId",
        voteId: "voteId",
        content: "content",
      },
    ]);
  });

  test("test delete comment", async () => {
    // Given
    const Comment = require("../../models/comment.js");
    const commentDao = require("../../daos/commentDao.js");
    jest.spyOn(Comment, "findOneAndDelete").mockImplementation(() => {
      return {
        commentId: "commentId",
        userId: "userId",
        voteId: "voteId",
        content: "content",
      };
    });
    // When
    const result = await commentDao.deleteComment("commentId");
    // Then
    expect(result).toEqual({
      commentId: "commentId",
      userId: "userId",
      voteId: "voteId",
      content: "content",
    });
  });

  test("test get total num records", async () => {
    // Given
    const Comment = require("../../models/comment.js");
    const commentDao = require("../../daos/commentDao.js");
    jest.spyOn(Comment, "countDocuments").mockImplementation(() => 10);
    // When
    const result = await commentDao.getTotalNumRecords({ voteId: "voteId" });
    // Then
    expect(result).toEqual(10);
  });
});
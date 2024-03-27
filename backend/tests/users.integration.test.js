const request = require("supertest");
const app = require("../app");

describe("User API integration tests", () => {
  test("should get all users", async () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.data).toBe("TODO implement this");
      });
  });
});

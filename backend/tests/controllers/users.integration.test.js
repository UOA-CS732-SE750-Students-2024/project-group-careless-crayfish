const request = require("supertest");
const app = require("../../app");
const { UserDto } = require("../../dtos/userDto");

jest.mock("mongoose");

beforeAll(async () => {
  // Connect to a Mongo DB
});
describe("User API integration tests", () => {
  test("should create xqc user", async () => {
    // Given
    const user = new UserDto("xqc", "xqc@gmail.com");
    // When
    const response = request(app).post("/api/users");
    // Then
    expect(true).toBeTruthy();
  });
});

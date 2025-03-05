import request from "supertest";

describe("GET /meetups", () => {
  it("should return todos", async () => {
    const response = await request("http://localhost:5001").get("/v1/meetups");
    expect(response.body.meetups.length >= 1).toBe(true);
  });
});

import request from "supertest";

import app from "@src/server";

describe("GET /meetups", () => {
  it("should return todos", async () => {
    const response = await request(app).get("/v1/meetups");
    expect(response.body.meetups.length >= 1).toBe(true);
  });
});

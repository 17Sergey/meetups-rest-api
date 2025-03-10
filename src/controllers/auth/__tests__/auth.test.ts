import request from "supertest";
import { hash } from "bcrypt";

import prismaClient from "@db/prismaClient";

import { ACCESS_TOKEN_SECRET } from "@utils/jwt";

import app from "@src/server";

describe("Auth Routes", () => {
  let userId = 0;
  let accessToken = "";

  beforeAll(async () => {
    const hashedPassword = await hash("testPassword", 10);
    const user = await prismaClient.user.create({
      data: {
        fullName: "Test User",
        email: "test@example.com",
        password: hashedPassword,
        roleId: 1,
      },
    });
    userId = user.id;

    accessToken = ACCESS_TOKEN_SECRET;
  });

  afterAll(async () => {
    await prismaClient.user.deleteMany({
      where: { id: userId },
    });
  });

  it("should signup a new user", async () => {
    const response = await request(app).post("/signup").send({
      fullName: "New User",
      email: "new@example.com",
      password: "newPassword",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("fullName", "New User");
  });

  it("should login user and return access token", async () => {
    const response = await request(app).post("/login").send({
      email: "test@example.com",
      password: "testPassword",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
  });

  it("should get user info", async () => {
    const response = await request(app)
      .get("/me")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("fullName", "Test User");
    expect(response.body).toHaveProperty("email", "test@example.com");
  });

  it("should return 401 if no token provided", async () => {
    const response = await request(app).get("/me");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "No token provided" });
  });

  it("should return 403 if token is invalid", async () => {
    const response = await request(app)
      .get("/me")
      .set("Authorization", "Bearer invalid_token");

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty(
      "error",
      "Unauthorized: invalid token.",
    );
  });
});

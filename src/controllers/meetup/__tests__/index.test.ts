import request from "supertest";

import prismaClient from "@db/prismaClient";

import app from "@src/server";

describe("Meetup Routes", () => {
  beforeAll(async () => {
    const signupResponse = await request(app).post("/signup").send({
      fullName: "Test user",
      email: "testuser@gmail.com",
      password: "123456aA!",
      role: "organizer",
    });

    expect(signupResponse.status).toBe(201);

    userId = signupResponse.body.id;
    accessToken = signupResponse.body.accessToken;
    refreshToken = signupResponse.body.refreshToken;
  });
  let userId = 0;
  let accessToken = "";
  let refreshToken = "";
  let meetupId = 0;

  beforeAll(async () => {
    const signupResponse = await request(app).post("/signup").send({
      fullName: "Test User",
      email: "test@example.com",
      password: "testPassword",
    });

    expect(signupResponse.status).toBe(201);
    userId = signupResponse.body.id;

    accessToken = signupResponse.body.accessToken;
    refreshToken = signupResponse.body.refreshToken;
  });

  afterAll(async () => {
    await prismaClient.meetup.deleteMany({
      where: { id: meetupId },
    });
    await prismaClient.user.deleteMany({
      where: { id: userId },
    });
  });

  it("should create a new meetup", async () => {
    const response = await request(app)
      .post("/meetups")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "New Meetup",
        description: "Description of the new meetup",
        dateTime: new Date().toISOString(),
        location: "Test Location",
        tags: ["Tag1", "Tag2"],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title", "New Meetup");

    meetupId = response.body.id;
  });

  it("should update an existing meetup", async () => {
    const response = await request(app)
      .put(`/meetups/${meetupId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "Updated Meetup",
        description: "Updated description",
        dateTime: new Date().toISOString(),
        location: "Updated Location",
        tags: ["Tag3"],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Updated Meetup");
  });

  it("should delete an existing meetup", async () => {
    const response = await request(app)
      .delete(`/meetups/${meetupId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Meetup deleted successfully" });
  });

  it("should return 403 if user is not an organizer", async () => {
    const nonOrganizerResponse = await request(app).post("/signup").send({
      fullName: "Non Organizer",
      email: "nonorganizer@example.com",
      password: "testPassword",
    });

    const nonOrganizerToken = nonOrganizerResponse.body.accessToken;

    const response = await request(app)
      .post("/meetups")
      .set("Authorization", `Bearer ${nonOrganizerToken}`)
      .send({
        title: "Forbidden Meetup",
        description: "This should not be allowed",
        dateTime: new Date().toISOString(),
        location: "Test Location",
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty(
      "error",
      "Access denied. You do not have permission to perform this operation",
    );

    await prismaClient.user.deleteMany({
      where: { id: nonOrganizerResponse.body.id },
    });
  });
});

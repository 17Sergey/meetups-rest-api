import request from "supertest";

import prismaClient from "@db/prismaClient";

import { testHelpers } from "@utils/testHelpers";

import app from "@src/server";

describe("GET v1/meetups/:id", () => {
  let meetupId = 0;

  beforeAll(async () => {
    const meetup = await prismaClient.meetup.create({
      data: {
        title: "Test Meetup",
        description: "Description of the test meetup",
        dateTime: new Date(),
        location: "Test Location",
        tags: {
          create: {
            tag: {
              create: { name: "Test Tag" },
            },
          },
        },
      },
    });
    meetupId = meetup.id;
  });

  afterAll(async () => {
    await testHelpers.clearDbData();
  });

  it("should return a meetup by ID", async () => {
    const response = await request(app).get(`/v1/meetups/${meetupId}`);

    expect(response.status).toBe(200);
  });

  it("should return 404 if meetup not found", async () => {
    const response = await request(app).get(`/v1/meetups/${999}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Meetup not found" });
  });
});

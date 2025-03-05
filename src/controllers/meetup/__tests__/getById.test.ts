import request from "supertest";
import prismaClient from "@db/prismaClient";
import app from "@src/server";

describe("GET /meetups/:id", () => {
  let meetupId = 0;

  beforeAll(async () => {
    // Создаем тестовую запись
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
    // Удаляем тестовые данные
    await prismaClient.meetup.deleteMany({
      where: { id: meetupId },
    });
  });

  it("should return a meetup by ID", async () => {
    const response = await request(app).get(`v1/meetups/${meetupId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: meetupId,
      title: "Test Meetup",
      description: "Description of the test meetup",
      dateTime: expect.any(String),
      location: "Test Location",
      tags: ["Test Tag"],
    });
  });

  it("should return 404 if meetup not found", async () => {
    const response = await request(app).get("/meetups/999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Meetup not found" });
  });
});

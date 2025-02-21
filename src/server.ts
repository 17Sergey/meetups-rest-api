import express from "express";
import dotenv from "dotenv";
import { sayHello } from "@controllers/authController";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();

const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "Express + TypeScript Server",
  });
});

app.get("/meetups", async (req, res) => {
  try {
    const meetups = await prisma.meetup.findMany();
    res.json(meetups);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения митапов" });
  }
});

app.get("/meetups/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const meetup = await prisma.meetup.findUnique({
      where: { id: Number(id) },
    });
    if (meetup) {
      res.json(meetup);
    } else {
      res.status(404).json({ error: "Митап не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения митапа" });
  }
});

app.post("/meetups", async (req, res) => {
  const { title, description, dateTime, location } = req.body;
  try {
    const newMeetup = await prisma.meetup.create({
      data: {
        title,
        description,
        dateTime: new Date(dateTime), // Убедитесь, что формат правильный
        location,
      },
    });
    res.status(201).json(newMeetup);
  } catch (error) {
    res.status(500).json({ error: "Ошибка создания митапа" });
  }
});

app.put("/meetups/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, dateTime, location } = req.body;
  try {
    const updatedMeetup = await prisma.meetup.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        dateTime: new Date(dateTime),
        location,
      },
    });
    res.json(updatedMeetup);
  } catch (error) {
    res.status(500).json({ error: "Ошибка обновления митапа" });
  }
});

app.delete("/meetups/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.meetup.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Ошибка удаления митапа" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
  sayHello();
});

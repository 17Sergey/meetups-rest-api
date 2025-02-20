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

app.get("/posts", async (_, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка получения постов: " + JSON.stringify(error) });
  }
});

app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при создании поста" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
  sayHello();
});

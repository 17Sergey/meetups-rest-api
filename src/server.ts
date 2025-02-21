import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import authRoutes from "@routes/authRoutes";
import meetupRoutes from "@routes/meetupRoutes";
import userRoutes from "@routes/userRoutes";

dotenv.config();

const app = express();

export const prisma = new PrismaClient();

/* Middleware */
app.use(express.json({ limit: "5mb" })); // limit is for uplodaing images on the client
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(cookieParser());
app.use(cors());

/* Routes */
app.use("/v1/auth", authRoutes);
app.use("/v1/meetups", meetupRoutes);
app.use("/v1/users", userRoutes);

app.get("/", (_, res) => {
  res.json({
    message: "Express + TypeScript Server",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

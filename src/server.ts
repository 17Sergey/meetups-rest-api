import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import authRoutes from "@routes/authRoutes";
import meetupRoutes from "@routes/meetupRoutes";
import userRoutes from "@routes/userRoutes";
import { authRoute, meetupsRoute, usersRoute } from "@routes/constants";

dotenv.config();

const app = express();

/* Middleware */
app.use(express.json({ limit: "5mb" })); // limit is for uplodaing images on the client
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(cookieParser());
app.use(cors());

/* Routes */
app.use(authRoute, authRoutes);
app.use(meetupsRoute, meetupRoutes);
app.use(usersRoute, userRoutes);

app.get("/", (_, res) => {
  res.json({
    message: "Express + TypeScript Server",
  });
});

app.get("*", (_, res) => {
  res.json({
    message: "Unkonwn url",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

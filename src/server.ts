import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { swaggerUiConfig } from "@configs/swagger";

import { connectToDb } from "@db/connectToDb";

import authRouter from "@routes/authRouter";
import meetupRouter from "@routes/meetupRouter";
import { authRoute, docsRoute, meetupsRoute } from "@routes/constants";

/* Env */
dotenv.config();

/* App */
const app = express();

/* Middleware */
app.use(express.json({ limit: "5mb" })); // limit is for uplodaing images on the client
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(cookieParser());
app.use(cors());

/* Routes */
app.use(authRoute, authRouter);
app.use(meetupsRoute, meetupRouter);

/* Swagger route */
app.use(docsRoute, swaggerUiConfig.serve, swaggerUiConfig.setup);

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

export const PORT = process.env.PORT || 5000;
export const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
  connectToDb();
});

export default app;

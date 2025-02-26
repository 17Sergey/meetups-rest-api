import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "@routes/authRoutes";
import meetupRoutes from "@routes/meetupRoutes";
import userRoutes from "@routes/userRoutes";
import {
  authRoute,
  docsRoute,
  meetupsRoute,
  usersRoute,
} from "@routes/constants";
import { swaggerUiConfig } from "@utils/swagger";
import { connectToDb } from "@db/connectToDb";

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
app.use(authRoute, authRoutes);
app.use(meetupsRoute, meetupRoutes);
app.use(usersRoute, userRoutes);

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

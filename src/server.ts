import express from "express";
import dotenv from "dotenv";
import { sayHello } from "@controllers/authController";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
  sayHello();
});

import { initialize } from "passport";
import prismaClient from "./prismaClient";
import { initializeDb } from "./initializeDb";

export const connectToDb = async () => {
  try {
    await prismaClient.$connect();
    console.log(`[db]: Database connected`);

    await initializeDb();
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.log(`[db]: Database connection error: ${errorMsg}`);
  }
};

import prismaClient from "./prismaClient";
import { initializeDb } from "./init/initializeDb";

export const connectToDb = async () => {
  try {
    await prismaClient.$connect();
    console.log(`[db]: Database connected`);
    console.log(`[db]: Database url: ${process.env.DATABASE_URL}`);

    await initializeDb();
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.log(`[db]: Database connection error: ${errorMsg}`);
  }
};

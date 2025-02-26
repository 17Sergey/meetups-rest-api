import prismaClient from "./prismaClient";

export const connectToDb = async () => {
  try {
    await prismaClient.$connect();
    console.log(`[db]: Database connected`);
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.log(`[db]: Database connection error: ${errorMsg}`);
  }
};

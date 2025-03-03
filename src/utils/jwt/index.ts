import jwt from "jsonwebtoken";

export const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "access_secret_key";
export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret_key";

export const generateAccessToken = (userId: number) => {
  const accessToken = jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });

  const createdAt = new Date();
  const expiresAt = new Date();

  const ONE_MINUTE = 1;
  expiresAt.setMinutes(expiresAt.getMinutes() + ONE_MINUTE);

  return { accessToken, createdAt, expiresAt };
};

export const generateRefreshToken = (userId: number) => {
  const refreshToken = jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  const createdAt = new Date();
  const expiresAt = new Date();

  const ONE_DAY = 1;
  expiresAt.setDate(expiresAt.getDate() + ONE_DAY);

  return { refreshToken, createdAt, expiresAt };
};

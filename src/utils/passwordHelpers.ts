import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const passwordHelpers = {
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  },

  async comparePassword(password: string, userPassword: string) {
    return await bcrypt.compare(password, userPassword);
  },
};

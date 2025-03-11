import prismaClient from "@db/prismaClient";

export const testHelpers = {
  async clearDbData() {
    await prismaClient.meetupTag.deleteMany();
    await prismaClient.meetup.deleteMany();
    await prismaClient.tag.deleteMany();
    await prismaClient.accessToken.deleteMany();
    await prismaClient.refreshToken.deleteMany();
    await prismaClient.user.deleteMany();
  },
  async loginAsAdmin() {},
};

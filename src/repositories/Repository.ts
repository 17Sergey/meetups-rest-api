import { PrismaClient } from "@prisma/client/extension";

class Repository {
  protected prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
}

export default Repository;

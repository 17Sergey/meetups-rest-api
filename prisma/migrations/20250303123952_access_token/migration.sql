/*
  Warnings:

  - You are about to drop the `MeetupOrganizer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MeetupParticipant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "MeetupOrganizer" DROP CONSTRAINT "MeetupOrganizer_meetupId_fkey";

-- DropForeignKey
ALTER TABLE "MeetupOrganizer" DROP CONSTRAINT "MeetupOrganizer_userId_fkey";

-- DropForeignKey
ALTER TABLE "MeetupParticipant" DROP CONSTRAINT "MeetupParticipant_meetupId_fkey";

-- DropForeignKey
ALTER TABLE "MeetupParticipant" DROP CONSTRAINT "MeetupParticipant_userId_fkey";

-- DropTable
DROP TABLE "MeetupOrganizer";

-- DropTable
DROP TABLE "MeetupParticipant";

-- CreateTable
CREATE TABLE "AccessToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken_userId_key" ON "AccessToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userId_key" ON "RefreshToken"("userId");

-- AddForeignKey
ALTER TABLE "AccessToken" ADD CONSTRAINT "AccessToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

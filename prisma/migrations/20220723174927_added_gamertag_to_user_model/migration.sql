/*
  Warnings:

  - A unique constraint covering the columns `[gamertag]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gamertag" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_gamertag_key" ON "User"("gamertag");

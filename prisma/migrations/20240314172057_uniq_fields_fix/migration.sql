/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Album_artistId_key";

-- DropIndex
DROP INDEX "Track_albumId_key";

-- DropIndex
DROP INDEX "Track_artistId_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

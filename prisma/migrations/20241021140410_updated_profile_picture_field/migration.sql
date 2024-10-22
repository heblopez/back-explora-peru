/*
  Warnings:

  - You are about to drop the column `profile_picture` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tourists" ADD COLUMN     "profile_picture" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "profile_picture";

/*
  Warnings:

  - You are about to drop the column `number_of_attendes` on the `bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "number_of_attendes",
ADD COLUMN     "number_of_attendees" INTEGER NOT NULL DEFAULT 1;

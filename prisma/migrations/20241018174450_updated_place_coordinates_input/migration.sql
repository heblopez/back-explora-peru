/*
  Warnings:

  - The `coordinates` column on the `places` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "places" DROP COLUMN "coordinates",
ADD COLUMN     "coordinates" TEXT[];

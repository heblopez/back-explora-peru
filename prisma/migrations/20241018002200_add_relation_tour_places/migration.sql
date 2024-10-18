/*
  Warnings:

  - Added the required column `tour_id` to the `places` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "places" ADD COLUMN     "tour_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tours"("tour_id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `session_date` on the `sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tour_id,start_date]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `end_date` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sessions_tour_id_session_date_key";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "session_date",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_tour_id_start_date_key" ON "sessions"("tour_id", "start_date");

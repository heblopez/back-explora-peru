/*
  Warnings:

  - A unique constraint covering the columns `[tour_id,session_date]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sessions_tour_id_session_date_key" ON "sessions"("tour_id", "session_date");

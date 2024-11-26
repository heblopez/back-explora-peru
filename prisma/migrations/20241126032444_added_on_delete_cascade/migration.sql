-- DropForeignKey
ALTER TABLE "places" DROP CONSTRAINT "places_tour_id_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_tour_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_tour_id_fkey";

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tours"("tour_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tours"("tour_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tours"("tour_id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - The `days` column on the `tours` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "day_of_week" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- AlterTable
ALTER TABLE "places" ADD COLUMN     "region" TEXT;

-- AlterTable
ALTER TABLE "tours" DROP COLUMN "days",
ADD COLUMN     "days" "day_of_week"[];

-- CreateTable
CREATE TABLE "schedules" (
    "schedule_id" SERIAL NOT NULL,
    "tour_id" INTEGER NOT NULL,
    "start_day" "day_of_week" NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_day" "day_of_week",
    "end_time" TEXT,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("schedule_id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "session_id" SERIAL NOT NULL,
    "tour_id" INTEGER NOT NULL,
    "session_date" TIMESTAMP(3) NOT NULL,
    "reserved_attendees" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "booking_id" SERIAL NOT NULL,
    "session_id" INTEGER NOT NULL,
    "tourist_id" INTEGER NOT NULL,
    "number_of_attendes" INTEGER NOT NULL DEFAULT 1,
    "total_price" DECIMAL(7,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "attendees" (
    "attendee_id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "document_type" "document_type" NOT NULL,
    "document_number" TEXT NOT NULL,

    CONSTRAINT "attendees_pkey" PRIMARY KEY ("attendee_id")
);

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tours"("tour_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tours"("tour_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_tourist_id_fkey" FOREIGN KEY ("tourist_id") REFERENCES "tourists"("tourist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendees" ADD CONSTRAINT "attendees_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

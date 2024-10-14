/*
  Warnings:

  - You are about to drop the column `birth_date` on the `tourists` table. All the data in the column will be lost.
  - Added the required column `birthdate` to the `tourists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tourists" DROP COLUMN "birth_date",
ADD COLUMN     "birthdate" DATE NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL;

-- AlterTable
ALTER TABLE "travel_agencies" ALTER COLUMN "agency_description" DROP NOT NULL,
ALTER COLUMN "logo_url" DROP NOT NULL,
ALTER COLUMN "website" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "profile_picture" DROP NOT NULL,
ALTER COLUMN "last_login" DROP NOT NULL;

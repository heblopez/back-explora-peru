/*
  Warnings:

  - Made the column `region` on table `places` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "places" ALTER COLUMN "region" SET NOT NULL;

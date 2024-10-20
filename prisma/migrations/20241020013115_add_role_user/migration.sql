/*
  Warnings:

  - The values [ADMIN,CUSTOMER] on the enum `user_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('tourist', 'agency');

-- AlterEnum
BEGIN;
CREATE TYPE "user_type_new" AS ENUM ('admin', 'customer');
ALTER TABLE "users" ALTER COLUMN "user_type" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "user_type" TYPE "user_type_new" USING ("user_type"::text::"user_type_new");
ALTER TYPE "user_type" RENAME TO "user_type_old";
ALTER TYPE "user_type_new" RENAME TO "user_type";
DROP TYPE "user_type_old";
ALTER TABLE "users" ALTER COLUMN "user_type" SET DEFAULT 'customer';
COMMIT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "role" NOT NULL DEFAULT 'tourist',
ALTER COLUMN "user_type" SET DEFAULT 'customer';

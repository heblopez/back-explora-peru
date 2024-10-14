/*
  Warnings:

  - The `user_type` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `document_type` on the `tourists` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "document_type" AS ENUM ('DNI', 'PASSPORT', 'CE');

-- AlterTable
ALTER TABLE "tourists" DROP COLUMN "document_type",
ADD COLUMN     "document_type" "document_type" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_type",
ADD COLUMN     "user_type" "user_type" NOT NULL DEFAULT 'CUSTOMER';

-- DropEnum
DROP TYPE "DocumentType";

-- DropEnum
DROP TYPE "UserType";

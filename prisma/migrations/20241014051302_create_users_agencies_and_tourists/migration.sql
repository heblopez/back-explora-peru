-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('DNI', 'PASSPORT', 'CE');

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "profile_picture" TEXT NOT NULL,
    "user_type" "UserType" NOT NULL DEFAULT 'CUSTOMER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "travel_agencies" (
    "travel_agency_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "agency_name" VARCHAR(150) NOT NULL,
    "agency_description" TEXT NOT NULL,
    "ruc" VARCHAR(20) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "logo_url" TEXT NOT NULL,
    "website" VARCHAR(255) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "travel_agencies_pkey" PRIMARY KEY ("travel_agency_id")
);

-- CreateTable
CREATE TABLE "tourists" (
    "tourist_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "document_type" "DocumentType" NOT NULL,
    "document_number" VARCHAR(50) NOT NULL,
    "birth_date" DATE NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "gender" VARCHAR(10) NOT NULL,

    CONSTRAINT "tourists_pkey" PRIMARY KEY ("tourist_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "travel_agencies_user_id_key" ON "travel_agencies"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tourists_user_id_key" ON "tourists"("user_id");

-- AddForeignKey
ALTER TABLE "travel_agencies" ADD CONSTRAINT "travel_agencies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tourists" ADD CONSTRAINT "tourists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

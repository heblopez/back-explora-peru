/*
  Warnings:

  - A unique constraint covering the columns `[document_number]` on the table `tourists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ruc]` on the table `travel_agencies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tourists_document_number_key" ON "tourists"("document_number");

-- CreateIndex
CREATE UNIQUE INDEX "travel_agencies_ruc_key" ON "travel_agencies"("ruc");

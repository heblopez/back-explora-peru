-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "travel_agencies"("travel_agency_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "tours" (
    "tour_id" SERIAL NOT NULL,
    "agency_id" INTEGER NOT NULL,
    "tour_name" VARCHAR(150) NOT NULL,
    "tour_description" TEXT NOT NULL,
    "regions" TEXT[],
    "price" DECIMAL(5,2) NOT NULL,
    "duration" VARCHAR(12) NOT NULL,
    "days" TEXT[],
    "max_group_size" SMALLINT,
    "photos_url" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("tour_id")
);

-- CreateTable
CREATE TABLE "places" (
    "place_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "photo_url" TEXT,
    "coordinates" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "places_pkey" PRIMARY KEY ("place_id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "make" TEXT,
    "model" TEXT,
    "year" INTEGER,
    "price" INTEGER,
    "photo" TEXT,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

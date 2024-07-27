-- CreateTable
CREATE TABLE "status_types" (
    "id" SERIAL NOT NULL,
    "type_name" TEXT NOT NULL,

    CONSTRAINT "status_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_types" (
    "id" SERIAL NOT NULL,
    "type_name" TEXT NOT NULL,

    CONSTRAINT "category_types_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - You are about to drop the column `categoryId` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `episodes` table. All the data in the column will be lost.
  - Added the required column `subcategoryId` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategoryId` to the `episodes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "episodes" DROP CONSTRAINT "episodes_categoryId_fkey";

-- AlterTable
ALTER TABLE "characters" DROP COLUMN "categoryId",
ADD COLUMN     "subcategoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "episodes" DROP COLUMN "categoryId",
ADD COLUMN     "subcategoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

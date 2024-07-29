/*
  Warnings:

  - You are about to drop the column `finish` on the `episodes` table. All the data in the column will be lost.
  - You are about to drop the column `init` on the `episodes` table. All the data in the column will be lost.
  - Added the required column `duration` to the `episodes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "episodes" DROP COLUMN "finish",
DROP COLUMN "init",
ADD COLUMN     "duration" TEXT NOT NULL;

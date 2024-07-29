/*
  Warnings:

  - The `init` column on the `characters_episodes_union` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `finish` column on the `characters_episodes_union` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `init` on the `episodes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `finish` on the `episodes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "characters_episodes_union" DROP COLUMN "init",
ADD COLUMN     "init" TIMESTAMP(3),
DROP COLUMN "finish",
ADD COLUMN     "finish" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "episodes" DROP COLUMN "init",
ADD COLUMN     "init" TIMESTAMP(3) NOT NULL,
DROP COLUMN "finish",
ADD COLUMN     "finish" TIMESTAMP(3) NOT NULL;

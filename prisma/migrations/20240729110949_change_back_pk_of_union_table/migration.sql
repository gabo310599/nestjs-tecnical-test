/*
  Warnings:

  - The primary key for the `characters_episodes_union` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "characters_episodes_union" DROP CONSTRAINT "characters_episodes_union_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "characters_episodes_union_pkey" PRIMARY KEY ("id");

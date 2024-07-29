/*
  Warnings:

  - The primary key for the `characters_episodes_union` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `characters_episodes_union` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "characters_episodes_union" DROP CONSTRAINT "characters_episodes_union_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "characters_episodes_union_pkey" PRIMARY KEY ("characterId", "episodeId");

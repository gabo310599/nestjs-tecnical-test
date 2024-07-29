-- AlterTable
ALTER TABLE "characters_episodes_union" ALTER COLUMN "init" SET DATA TYPE TEXT,
ALTER COLUMN "finish" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "episodes" ALTER COLUMN "init" SET DATA TYPE TEXT,
ALTER COLUMN "finish" SET DATA TYPE TEXT;

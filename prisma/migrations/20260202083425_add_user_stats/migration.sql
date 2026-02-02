/*
  Warnings:

  - You are about to drop the column `Language` on the `Snippet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "Language",
ADD COLUMN     "language" "CodeLanguage" NOT NULL DEFAULT 'JAVASCRIPT';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastActiveAt" TIMESTAMP(3),
ADD COLUMN     "totalSnippets" INTEGER NOT NULL DEFAULT 0;

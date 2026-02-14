/*
  Warnings:

  - A unique constraint covering the columns `[userId,questionId]` on the table `BookMark` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,articleId]` on the table `BookMark` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BookMark_userId_questionId_key" ON "BookMark"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "BookMark_userId_articleId_key" ON "BookMark"("userId", "articleId");

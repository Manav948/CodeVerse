/*
  Warnings:

  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `githubId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `interest` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `links` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `reputation_points` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
DROP COLUMN "created_at",
DROP COLUMN "emailVerified",
DROP COLUMN "githubId",
DROP COLUMN "googleId",
DROP COLUMN "interest",
DROP COLUMN "links",
DROP COLUMN "password_hash",
DROP COLUMN "reputation_points",
DROP COLUMN "updated_at",
ADD COLUMN     "completeOnboarding" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "email_verified" TIMESTAMP(3),
ADD COLUMN     "hashedPassword" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "surname" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

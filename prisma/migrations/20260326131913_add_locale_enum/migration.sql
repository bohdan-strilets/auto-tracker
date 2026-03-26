/*
  Warnings:

  - The `locale` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('UK_UA', 'EN_US', 'PL_PL');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "locale",
ADD COLUMN     "locale" "Locale" NOT NULL DEFAULT 'PL_PL';

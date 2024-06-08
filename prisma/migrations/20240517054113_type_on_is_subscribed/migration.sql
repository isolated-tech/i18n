/*
  Warnings:

  - You are about to drop the column `is_subcribed` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "is_subcribed",
ADD COLUMN     "is_subscribed" BOOLEAN NOT NULL DEFAULT false;

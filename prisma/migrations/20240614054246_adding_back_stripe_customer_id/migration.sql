/*
  Warnings:

  - A unique constraint covering the columns `[stripe_customer_id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "stripe_customer_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Account_stripe_customer_id_key" ON "Account"("stripe_customer_id");

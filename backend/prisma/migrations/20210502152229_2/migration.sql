/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
ADD COLUMN     "isNewUser" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "account_ballance" SET DEFAULT 0,
ALTER COLUMN "account_ballance" SET DATA TYPE DOUBLE PRECISION;

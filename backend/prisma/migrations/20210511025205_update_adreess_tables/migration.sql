/*
  Warnings:

  - Added the required column `province` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "province" VARCHAR(50) NOT NULL;

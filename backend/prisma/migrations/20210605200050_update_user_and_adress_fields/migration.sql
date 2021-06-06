/*
  Warnings:

  - You are about to drop the column `userId` on the `Address` table. All the data in the column will be lost.
  - You are about to alter the column `street` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `neighborhood` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `google_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropIndex
DROP INDEX "User.google_id_unique";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "userId",
ADD COLUMN     "uid" TEXT NOT NULL,
ALTER COLUMN "street" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "neighborhood" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "google_id",
ADD COLUMN     "uid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User.uid_unique" ON "User"("uid");

-- AddForeignKey
ALTER TABLE "Address" ADD FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

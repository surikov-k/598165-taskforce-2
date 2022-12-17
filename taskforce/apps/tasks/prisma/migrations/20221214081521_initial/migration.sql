/*
  Warnings:

  - Changed the type of `taskId` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "taskId",
ADD COLUMN     "taskId" INTEGER NOT NULL;

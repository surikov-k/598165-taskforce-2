/*
  Warnings:

  - Added the required column `city` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "City" AS ENUM ('Москва', 'Санкт-Петербург', 'Владивосток');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "city" "City" NOT NULL;

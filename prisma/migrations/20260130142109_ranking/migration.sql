/*
  Warnings:

  - You are about to drop the column `quizId` on the `Score` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_quizId_fkey";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "quizId";

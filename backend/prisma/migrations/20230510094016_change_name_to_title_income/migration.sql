/*
  Warnings:

  - You are about to drop the column `name` on the `income` table. All the data in the column will be lost.
  - Added the required column `title` to the `income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "income" DROP COLUMN "name",
ADD COLUMN     "title" VARCHAR(50) NOT NULL;

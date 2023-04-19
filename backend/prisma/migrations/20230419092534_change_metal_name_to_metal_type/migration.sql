/*
  Warnings:

  - You are about to drop the column `metal_name` on the `metal` table. All the data in the column will be lost.
  - Added the required column `metal_type` to the `metal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "metal" DROP COLUMN "metal_name",
ADD COLUMN     "metal_type" VARCHAR(50) NOT NULL;

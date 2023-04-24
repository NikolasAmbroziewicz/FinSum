/*
  Warnings:

  - You are about to drop the column `amount` on the `account` table. All the data in the column will be lost.
  - Added the required column `name` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" DROP COLUMN "amount",
ADD COLUMN     "name" VARCHAR(50) NOT NULL;

-- CreateTable
CREATE TABLE "cash" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL NOT NULL,
    "currency" VARCHAR NOT NULL,
    "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cash_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cash" ADD CONSTRAINT "cash_id_fkey" FOREIGN KEY ("id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

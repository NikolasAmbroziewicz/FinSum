/*
  Warnings:

  - You are about to drop the column `broker_id` on the `stock` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `stock` table. All the data in the column will be lost.
  - You are about to drop the `broker` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `cryptocurrency` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bond" DROP CONSTRAINT "bond_id_fkey";

-- DropForeignKey
ALTER TABLE "cryptocurrency" DROP CONSTRAINT "cryptocurrency_id_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_broker_id_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_user_id_fkey";

-- AlterTable
ALTER TABLE "cryptocurrency" ADD COLUMN     "amount" DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE "stock" DROP COLUMN "broker_id",
DROP COLUMN "user_id";

-- DropTable
DROP TABLE "broker";

-- CreateTable
CREATE TABLE "stock_wallet" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "stock_wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cryptocurrency_wallet" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "cryptocurrency_wallet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stock_wallet" ADD CONSTRAINT "stock_wallet_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bond" ADD CONSTRAINT "bond_id_fkey" FOREIGN KEY ("id") REFERENCES "stock_wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_id_fkey" FOREIGN KEY ("id") REFERENCES "stock_wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cryptocurrency_wallet" ADD CONSTRAINT "cryptocurrency_wallet_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cryptocurrency" ADD CONSTRAINT "cryptocurrency_id_fkey" FOREIGN KEY ("id") REFERENCES "cryptocurrency_wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

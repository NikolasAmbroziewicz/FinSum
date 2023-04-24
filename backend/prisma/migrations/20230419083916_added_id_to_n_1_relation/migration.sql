/*
  Warnings:

  - Added the required column `user_id` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_wallet_id` to the `bond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `cash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cryptocurrency_wallet_id` to the `cryptocurrency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `cryptocurrency_wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `cryptocurrency_wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `metal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_wallet_id` to the `stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `stock_wallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_id_fkey";

-- DropForeignKey
ALTER TABLE "bond" DROP CONSTRAINT "bond_id_fkey";

-- DropForeignKey
ALTER TABLE "cash" DROP CONSTRAINT "cash_id_fkey";

-- DropForeignKey
ALTER TABLE "cryptocurrency" DROP CONSTRAINT "cryptocurrency_id_fkey";

-- DropForeignKey
ALTER TABLE "cryptocurrency_wallet" DROP CONSTRAINT "cryptocurrency_wallet_id_fkey";

-- DropForeignKey
ALTER TABLE "expense" DROP CONSTRAINT "expense_id_fkey";

-- DropForeignKey
ALTER TABLE "income" DROP CONSTRAINT "income_id_fkey";

-- DropForeignKey
ALTER TABLE "metal" DROP CONSTRAINT "metal_id_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_id_fkey";

-- DropForeignKey
ALTER TABLE "stock_wallet" DROP CONSTRAINT "stock_wallet_id_fkey";

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "bond" ADD COLUMN     "stock_wallet_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "cash" ADD COLUMN     "account_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "cryptocurrency" ADD COLUMN     "cryptocurrency_wallet_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "cryptocurrency_wallet" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "expense" ADD COLUMN     "account_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "income" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "metal" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "stock" ADD COLUMN     "stock_wallet_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "stock_wallet" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash" ADD CONSTRAINT "cash_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metal" ADD CONSTRAINT "metal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_wallet" ADD CONSTRAINT "stock_wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bond" ADD CONSTRAINT "bond_stock_wallet_id_fkey" FOREIGN KEY ("stock_wallet_id") REFERENCES "stock_wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_stock_wallet_id_fkey" FOREIGN KEY ("stock_wallet_id") REFERENCES "stock_wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cryptocurrency_wallet" ADD CONSTRAINT "cryptocurrency_wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cryptocurrency" ADD CONSTRAINT "cryptocurrency_cryptocurrency_wallet_id_fkey" FOREIGN KEY ("cryptocurrency_wallet_id") REFERENCES "cryptocurrency_wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

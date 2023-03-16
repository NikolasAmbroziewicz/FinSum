-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "surname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "income" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "amount" DECIMAL NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "currency" VARCHAR(20) NOT NULL,
    "amount" DECIMAL NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR NOT NULL,
    "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metal" (
    "id" SERIAL NOT NULL,
    "metal_name" VARCHAR(50) NOT NULL,
    "coin_name" VARCHAR(50) NOT NULL,
    "unit" VARCHAR(10) NOT NULL,
    "amount" INTEGER NOT NULL,
    "price_buy" DECIMAL NOT NULL,
    "price_sold" DECIMAL NOT NULL,
    "date_bought" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_sold" TIMESTAMP NOT NULL,

    CONSTRAINT "metal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bond" (
    "id" SERIAL NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "percent" DECIMAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "price_each" DECIMAL NOT NULL,
    "date_bought" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_sold" TIMESTAMP NOT NULL,
    "redemption_penalty" INTEGER NOT NULL,
    "time_interest" INTEGER NOT NULL,

    CONSTRAINT "bond_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "amount" INTEGER NOT NULL,
    "ticker" VARCHAR(10) NOT NULL,
    "price_buy" INTEGER NOT NULL,
    "price_sold" INTEGER NOT NULL,
    "date_bought" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_sold" TIMESTAMP NOT NULL,
    "user_id" INTEGER NOT NULL,
    "broker_id" INTEGER NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "broker" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "broker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cryptocurrency" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "ticker" VARCHAR(20) NOT NULL,
    "price_bought" DECIMAL NOT NULL,
    "price_sold" DECIMAL NOT NULL,
    "date_bought" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_sold" TIMESTAMP NOT NULL,
    "stock_name" VARCHAR(40) NOT NULL,

    CONSTRAINT "cryptocurrency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_id_fkey" FOREIGN KEY ("id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metal" ADD CONSTRAINT "metal_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bond" ADD CONSTRAINT "bond_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_broker_id_fkey" FOREIGN KEY ("broker_id") REFERENCES "broker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cryptocurrency" ADD CONSTRAINT "cryptocurrency_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

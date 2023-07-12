-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'PENDING');

-- CreateEnum
CREATE TYPE "PR_Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "INV_Status" AS ENUM ('AVAILABLE', 'CHECKED_OUT');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('PATIENT_SIMULATORS', 'TASK_TRAINERS', 'SIMULATION_EQUIPMENT', 'MEDICAL_FURNITURE', 'CONSMABLE_SUPPLIES', 'NONCONSUMABLE_SUPPLIES', 'COMPUTERS', 'OFFICE_SUPPLIES', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "name" STRING NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" STRING NOT NULL,
    "amount" INT4 NOT NULL,
    "location" STRING NOT NULL,
    "type" "Type" NOT NULL,
    "status" "INV_Status" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseRequest" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "name" STRING NOT NULL,
    "title" STRING NOT NULL,
    "category" "Type" NOT NULL,
    "price" INT4 NOT NULL,
    "status" "PR_Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "PurchaseRequest_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Suppliers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" STRING NOT NULL,
    "address" STRING NOT NULL,
    "phone" STRING NOT NULL,
    "email" STRING NOT NULL,
    "website" STRING NOT NULL,
    "notes" STRING

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PurchaseRequest" ADD CONSTRAINT "PurchaseRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

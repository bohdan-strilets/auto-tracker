/*
  Warnings:

  - The values [FUEL,SERVICE,DOCUMENT,TIRES] on the enum `ExpenseCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACCESSORIES,CARE] on the enum `ServiceCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExpenseCategory_new" AS ENUM ('ACCESSORIES', 'CARE', 'PARKING', 'FINE', 'REGISTRATION', 'RENTAL', 'OTHER');
ALTER TABLE "Expense" ALTER COLUMN "category" TYPE "ExpenseCategory_new" USING ("category"::text::"ExpenseCategory_new");
ALTER TYPE "ExpenseCategory" RENAME TO "ExpenseCategory_old";
ALTER TYPE "ExpenseCategory_new" RENAME TO "ExpenseCategory";
DROP TYPE "public"."ExpenseCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ServiceCategory_new" AS ENUM ('MAINTENANCE', 'REPAIR', 'OTHER');
ALTER TABLE "ServiceLog" ALTER COLUMN "category" TYPE "ServiceCategory_new" USING ("category"::text::"ServiceCategory_new");
ALTER TYPE "ServiceCategory" RENAME TO "ServiceCategory_old";
ALTER TYPE "ServiceCategory_new" RENAME TO "ServiceCategory";
DROP TYPE "public"."ServiceCategory_old";
COMMIT;

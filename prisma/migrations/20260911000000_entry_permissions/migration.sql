-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "allowEdit" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allowDelete" BOOLEAN NOT NULL DEFAULT true;

/*
  Warnings:

  - The `appliedDate` column on the `TrackedJob` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TrackedJob" DROP COLUMN "appliedDate",
ADD COLUMN     "appliedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

/*
  Warnings:

  - You are about to drop the column `applicationUrl` on the `TrackedJob` table. All the data in the column will be lost.
  - Added the required column `type` to the `TrackedJob` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `TrackedJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrackedJob" DROP COLUMN "applicationUrl",
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

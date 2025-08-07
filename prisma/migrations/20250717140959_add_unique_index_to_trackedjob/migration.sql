/*
  Warnings:

  - A unique constraint covering the columns `[title,company,location,url]` on the table `TrackedJob` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TrackedJob_title_company_location_url_key" ON "TrackedJob"("title", "company", "location", "url");

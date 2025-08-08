-- CreateTable
CREATE TABLE "TrackedJob" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "appliedDate" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "applicationUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrackedJob_pkey" PRIMARY KEY ("id")
);

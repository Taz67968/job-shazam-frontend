"use client";

import React from "react";
import FindJobsPage from "@/components/Jobspage";

export default function Page({searchParams}: {searchParams?: Record<string, string>}) {
  return <FindJobsPage searchParams={searchParams} />;
}

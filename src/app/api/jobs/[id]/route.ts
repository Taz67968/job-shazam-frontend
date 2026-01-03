import { NextResponse } from "next/server";
import mockJobs from "../../../../data/mockJobs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const job = mockJobs.find((job) => job.id === id);

  if (job) {
    return NextResponse.json(job);
  } else {
    // Fallback try converting number/string if weak comparison needed, but string is standard
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
}

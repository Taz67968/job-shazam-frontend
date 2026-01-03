"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "../../jobs.css";
import "../../globals.css";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  applyUrl: string;
  description?: string;
}

const JobDetailPage: React.FC = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const jobId = Array.isArray(id) ? id[0] : id; // Handle potential array
        console.log(`Fetching job /api/jobs/${jobId}`);
        // Use relative path or correct API URL
        const res = await fetch(`/api/jobs/${jobId}`);
        if (!res.ok) {
          // Fallback to localhost if relative fails (e.g. strict CORS or something, but usually relative is best)
          // Actually, let's keep it robust.
          throw new Error(`Failed to fetch job`);
        }
        const data = await res.json();
        setJob(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Fetch error:", err.message);
          setError(err.message);
        } else {
          console.error("Unknown error:", err);
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error || !job) return <div>{error || "Job not found"}</div>;

  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <p className="job-company">{job.company}</p>
      <p className="job-location">{job.location}</p>
      <p className="job-type">{job.type}</p>
      <p className="job-type">{job.description}</p>
      <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="apply-button">
        Apply Now
      </a>
    </div>
  );
};

export default JobDetailPage;

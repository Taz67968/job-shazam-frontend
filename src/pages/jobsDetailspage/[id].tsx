'use client';

import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Save, ChevronsLeft} from "lucide-react";
import "../../app/jobs.css";
import "../../app/globals.css";
import toast, { Toaster } from "react-hot-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  applyUrl: string;
  description?: string;
}

const JobDetailPage: React.FC = () => {
  const router = useRouter();
  const {id} = router.query;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function cleanText(input?: string): string {
    if (!input) return "";
    const textWithoutTags = input
      .replace(/<[^>]*>/g, " ")
      .replace(/&[^;\s]+;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return textWithoutTags;
  }

  const handleSaved = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error("User not authenticated");
      console.error("User not authenticated");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/saved-jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({jobId: job?.id, status: "saved"}),
      });

      const data = await res.json();
      if (!res.ok) {
      toast.error( data.message || "Job has not been saved");
      } else {
        toast.success(data.message || "Job has been saved");
      }
    } catch (error) {
      console.error("Error saving Job:", error);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:8080/jobs/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch job`);
        }
        const data = await res.json();
        setJob(data);
      } catch (err: any) {
        console.error("Fetch error:", err.message);
        setError(err.message);
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
      <div className="flex justify-between mb-5">
        <button onClick={() => router.back()}>
          <ChevronsLeft />
        </button>{" "}
        <button className="flex gap-1 bg-primary rounded p-2" onClick={handleSaved}>
          <Save className="w-6 h-6" />
          Save Job
        </button>
      </div>
      <h3 className="job-title">{job.title}</h3>
      <p className="job-company">{job.company}</p>
      <p className="job-location">{job.location}</p>
      <p className="job-type">{job.type}</p>
      <p className="job-type mb-10">{cleanText(job.description)}</p>
      <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="apply-button">
        Apply Now
      </a>
      <Toaster/>
    </div>
  );
};

export default JobDetailPage;

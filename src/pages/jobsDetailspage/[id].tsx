"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Save, ChevronsLeft} from "lucide-react";
import toast from "react-hot-toast";
import {ResumeUploadModal} from "@/components/ResumeUploadModal";
import "../../app/jobs.css";
import "../../app/globals.css";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compareResult, setCompareResult] = useState<any>(null);

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
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
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
        toast.error(data.message || "Job has not been saved");
      } else {
        toast.success(data.message || "Job has been saved");
      }
    } catch (error) {
      toast.error("Something went wrong");
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

      {/* New Compare Button */}
      <button
        onClick={() => {
          const token = localStorage.getItem("token");
          if (!token) {
            router.push("/loginPage");
          } else {
            setIsModalOpen(true);
          }
        }}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Compare & Apply
      </button>

      {/* Modal */}
      {isModalOpen && job && (
        <ResumeUploadModal
          jobDescription={cleanText(job.description)}
          onClose={() => setIsModalOpen(false)}
          onCompareComplete={(result) => setCompareResult(result)}
        />
      )}

      {/* Show match results if any */}
      {compareResult && (
        <div className="mt-6 p-4 border rounded bg-green-50">
          <p className="font-bold">Match Score: {compareResult.match}%</p>
          <div>
            <p className="font-semibold">Strengths...:</p>
            <ul className="list-disc ml-6">
              {compareResult.strengths.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <p className="font-semibold mt-2">Improvements...:</p>
            <ul className="list-disc ml-6">
              {compareResult.improvements.map((i: string, idx: number) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;

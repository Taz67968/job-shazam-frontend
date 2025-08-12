"use client";

import React, {useState, useEffect} from "react";
import {JobCard} from "./JobCard";
import {JobDetailModal} from "@/components/JobDetailModal";
import {Skeleton} from "@/components/ui/skeleton";
import {Loader2} from "lucide-react";
import {Job, JobsResponse} from "@/types/job";
import mockJobs from "@/data/mockJobs";

interface JobListingsProps {
  searchQuery: string;
  locationFilter: string;
  jobTypeFilter: string;
  levelFilter: string;
}

export const JobListings = ({
  searchQuery,
  locationFilter,
  jobTypeFilter,
  levelFilter,
}: JobListingsProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build query params
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);
        if (locationFilter) params.append("location", locationFilter);
        if (jobTypeFilter && jobTypeFilter !== "all") params.append("type", jobTypeFilter);
        if (levelFilter && levelFilter !== "all") params.append("level", levelFilter);

        // Use local backend by default
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/jobs";

        const res = await fetch(`${backendUrl}?${params.toString()}`);

        if (!res.ok) throw new Error("Backend not available");

        const data: JobsResponse = await res.json();
        setJobs(data.jobs || []);
        setTotalJobs(data.total || 0);
      } catch (err) {
        console.warn("Backend not available, using mock data");
        setError("Backend not available");

        // Filter mock jobs as a fallback
        const filteredMockJobs = mockJobs.filter((job) => {
          const matchesSearch =
            !searchQuery ||
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesLocation =
            !locationFilter ||
            job.location.toLowerCase().includes(locationFilter.toLowerCase()) ||
            (locationFilter.toLowerCase().includes("remote") &&
              job.location.toLowerCase().includes("remote"));

          const matchesType =
            !jobTypeFilter ||
            jobTypeFilter === "all" ||
            job.type.toLowerCase().includes(jobTypeFilter.toLowerCase()) ||
            (jobTypeFilter === "remote" && job.location.toLowerCase().includes("remote"));

          const matchesLevel =
            !levelFilter ||
            levelFilter === "all" ||
            job.title.toLowerCase().includes(levelFilter.toLowerCase()) ||
            job.description.toLowerCase().includes(levelFilter.toLowerCase());

          return matchesSearch && matchesLocation && matchesType && matchesLevel;
        });

        setJobs(filteredMockJobs);
        setTotalJobs(filteredMockJobs.length);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchQuery, locationFilter, jobTypeFilter, levelFilter]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
          <span className="text-lg text-muted-foreground">Loading jobs...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-primary">{totalJobs} Jobs Found</h2>
        <p className="text-muted-foreground">
          {searchQuery && `Searching for "${searchQuery}"`}{" "}
          {locationFilter && `in ${locationFilter}`}
          {jobTypeFilter && jobTypeFilter !== "all" && ` • ${jobTypeFilter}`}
          {levelFilter && levelFilter !== "all" && ` • ${levelFilter}`}
        </p>
        {error && (
          <p className="text-yellow-500 text-sm mt-2">Backend unavailable — showing sample data</p>
        )}
      </div>

      <div className="grid gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg mb-2">No jobs found</div>
          <p className="text-muted-foreground/70">Try adjusting your search criteria or filters</p>
        </div>
      )}

      <JobDetailModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </>
  );
};

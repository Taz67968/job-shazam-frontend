"use client";

import {useState, useEffect} from "react";
import JobCard from "./JobCard";
import {JobDetailModal} from "./JobDetailModal";
import {Skeleton} from "@/components/ui/skeleton";
import {Loader2} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  applyUrl: string;
  source: string;
}

interface JobListingsProps {
  searchParams?: {
    query?: string;
    location?: string;
    type?: string;
    level?: string;
  };
}

export default function JobListings({searchParams = {}}: JobListingsProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {query, location, type, level} = searchParams;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/jobs");

        if (!res.ok) throw new Error("Failed to fetch jobs");

        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError("Backend unavailable - showing sample data");
        const mockJobs: Job[] = [
          {
            id: "1",
            title: "Senior Frontend Developer",
            company: "TechCorp Inc.",
            location: "San Francisco, CA",
            type: "Full-time",
            salary: "$120k - $160k",
            description: "We are looking for an experienced Frontend Developer to join our team.",
            requirements: ["React.js", "TypeScript", "CSS/SCSS", "5+ years experience"],
            benefits: ["Health Insurance", "Flexible Hours", "Remote Work", "401k"],
            postedDate: "2 days ago",
            applyUrl: "https://techcorp.com/jobs/frontend-dev",
            source: "TechCorp Careers",
          },
          {
            id: "2",
            title: "Product Manager",
            company: "StartupXYZ",
            location: "Remote",
            type: "Full-time",
            salary: "$100k - $140k",
            description: "Join our product team to drive strategic initiatives.",
            requirements: ["Product Management", "Agile/Scrum", "Data Analysis"],
            benefits: ["Stock Options", "Unlimited PTO", "Health Insurance"],
            postedDate: "1 day ago",
            applyUrl: "https://startupxyz.com/careers/pm",
            source: "StartupXYZ Jobs",
          },
        ];
        setJobs(mockJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      !query ||
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase());

    const matchesLocation =
      !location ||
      job.location.toLowerCase().includes(location.toLowerCase()) ||
      (location.toLowerCase().includes("remote") && job.location.toLowerCase().includes("remote"));

    const matchesType =
      !type ||
      type === "all" ||
      job.type.toLowerCase().includes(type.toLowerCase()) ||
      (type === "remote" && job.location.toLowerCase().includes("remote"));

    const matchesLevel =
      !level ||
      level === "all" ||
      job.title.toLowerCase().includes(level.toLowerCase()) ||
      job.description.toLowerCase().includes(level.toLowerCase());

    return matchesSearch && matchesLocation && matchesType && matchesLevel;
  });

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
        <div className="grid gap-6">
          {Array.from({length: 6}).map((_, i) => (
            <div key={i} className="bg-card rounded-lg p-6 border border-border">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-10 w-24" />
              </div>
              <Skeleton className="h-16 w-full mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-18" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-green-600">{filteredJobs.length} Jobs Found</h2>
        <p className="text-slate-200">
          Showing results for {query && `"${query}"`} {location && `in ${location}`}
        </p>
        {error && <p className="text-yellow-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No jobs found</div>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}

      <JobDetailModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
}

import React from "react";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  url: string;
}

interface JobCardProps {
  job: Job;
   onTrack?: (id: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onTrack }) => {
  return (
    <div className="job-card">
      <div className="flex justify-between items-center">
      <h3 className="job-title">{job.title}</h3>

      <a href={job.url} target="_blank" rel="noopener noreferrer" className="apply-button">
        Apply Now
      </a>
      </div>
      <p className="job-company">{job.company}</p>
      <p className="job-location">{job.location}</p>
      <p className="job-type">{job.type}</p>
      <Link href={`/jobsDetailspage/${job.id}`} className="view-job-link">
        View Details
      </Link>
        {onTrack && (
          <button
            onClick={() => onTrack(job)}
            className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Track Job
          </button>
        )}
      
    </div>
  );
};

export default JobCard;

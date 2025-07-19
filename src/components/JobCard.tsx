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
}

const JobCard: React.FC<JobCardProps> = ({job}) => {
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
    </div>
  );
};

export default JobCard;


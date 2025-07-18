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
      <h3 className="job-title">{job.title}</h3>
      <p className="job-company">{job.company}</p>
      <p className="job-location">{job.location}</p>
      <p className="job-type">{job.type}</p>
      <a href={job.url} target="_blank" rel="noopener noreferrer" className="apply-button">
        Apply Now
      </a>
      <Link href={`/jobsDetailspage/${job.id}`} className="view-job-link">
        View Job
      </Link>
    </div>
  );
};

export default JobCard;


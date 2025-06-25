import React from 'react';

interface Job {
  title: string;
  company: string;
  location: string;
  type: string;
  url: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.type}</p>
      <a href={job.url} target="_blank" rel="noopener noreferrer">Apply Now</a>
    </div>
  );
};

export default JobCard;
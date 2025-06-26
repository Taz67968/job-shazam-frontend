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
      <h3 className="job-title">{job.title}</h3>
      <p className="job-company">{job.company}</p>
      <p className="job-location">{job.location}</p>
      <p className="job-type">{job.type}</p>
      <a href={job.url} target="_blank" rel="noopener noreferrer" className="apply-button">Apply Now</a>
    </div>
  );
};

export default JobCard;
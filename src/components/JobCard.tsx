import React from "react";
import Link from "next/link";
import {MapPin, Building2, Landmark, Layers} from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  url: string;
  tags: string[];
}

interface JobCardProps {
  job: Job;
  onTrack?: (id: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({job}) => {
  const spacetags = job.tags.join(" ");
  return (
    <div className="job-card">
      <div className="flex justify-between items-center">
        <h3 className="job-title">{job.title}</h3>

        <a href={job.url} target="_blank" rel="noopener noreferrer" className="apply-button">
          Apply Now
        </a>
      </div>
      <div className="job-company  flex gap-1">
        <Building2 className="h-7  mr-2 w-7 text-primary" />
        {job.company}
      </div>
      <div className="job-location flex gap-1">
        <MapPin className="h-7 w-7 mr-2  text-primary" />
        {job.location}
      </div>
      <div className="job-type  flex gap-1">
        <Landmark className="h-7 w-7  mr-2 text-primary" />
        {job.salary}
      </div>
      <div className="flex gap-1">
        <Layers className="h-7 w-7 text-primary mr-2" />
        {spacetags}
      </div>
      <Link href={`/jobsDetailspage/${job.id}`} className="view-job-link">
        View Details
      </Link>
    </div>
  );
};

export default JobCard;

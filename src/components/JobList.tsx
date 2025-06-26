import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  url: string;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          const errorDetail = await response.text();
          setError(`Error: ${errorDetail}`);
          return;
        }
        const data = await response.json();
        console.log(data); 
        if (Array.isArray(data)) {
          setJobs(data);
        } else if (data && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else {
          setError('Fetched data does not contain job listings');
        }
      } catch (err) {
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="job-list">
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <div>No jobs available</div>
      )}
    </div>
  );
};

export default JobList;
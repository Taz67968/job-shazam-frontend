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
  const [search, setSearch] = useState('');

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

  const filteredJobs = jobs.filter((job) => {
    const searchLower = search.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchLower) ||
      job.type.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower)
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="job-list-container max-w-5xl mx-auto p-4">

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title, type (e.g. remote/full-time), or location..."
        className="w-[96%] p-2 border border-gray-300 rounded mb-6 m-[8px]"
      />

      <div className="job-list grid gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div>No jobs match your search.</div>
        )}
      </div>
    </div>
  );
};

export default JobList;

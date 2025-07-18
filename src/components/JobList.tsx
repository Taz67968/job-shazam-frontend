'use client';

import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import '../app/globals.css';
import { Waveform } from '@uiball/loaders';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  url: string;
}

const JobPage: React.FC = () => {
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

  const handleTrack = async (job: Job) => {
    try {
      const response = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...job,
          appliedDate: new Date().toISOString(),
          status: 'applied',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to track job');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const searchLower = search.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchLower) ||
      job.type.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="job-list-container">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title, type (e.g. remote/full-time), or location..."
        className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading ? (
        <div className='flex justify-center text-center mt-4 mb-4'>
          <Waveform color='#22C55E' />
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : filteredJobs.length === 0 ? (
        <div>No jobs match your search.</div>
      ) : (
        <div className="job-grid">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onTrack={handleTrack} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPage;
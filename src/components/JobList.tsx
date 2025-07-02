'use client';

import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import '../app/globals.css'
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
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

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

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

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
        <div className='flex justify-center text-center mt-4 mb-4'> <Waveform color='#22C55E'/> </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : filteredJobs.length === 0 ? (
        <div>No jobs match your search.</div>
      ) : (
        <>
          <div className="job-grid">
            {currentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="flex justify-center items-center space-x-2 mt-8 mb-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded border ${
                  currentPage === pageNum ? 'bg-green-400 text-black' : ''
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default JobPage;

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../../app/jobs.css';
import Link from 'next/link';
import '../../app/globals.css';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  url: string;
  description?: string;
}

const JobDetailPage: React.FC = () => {
 const router = useRouter();
const { id } = router.query;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  if (!id) return;

  const fetchJob = async () => {
    try {
      console.log(`Fetching job /api/jobs/${id}`);
      const res = await fetch(`/api/jobs/${id}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch job`);
      }
      const data = await res.json();
      setJob(data);
    } catch (err: any) {
      console.error('Fetch error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchJob();
}, [id]);

  if (loading) return <div>Loading...</div>;
  if (error || !job) return <div>{error || 'Job not found'}</div>;

  return (
    <div className="job-card">
      <Link href="/Jobspage" className="font-bold text-primary text-[#16A249] font-poppins mb-6" prefetch={false}>
            return
          </Link>
      <h3 className="job-title">{job.title}</h3>
      <p className="job-company">{job.company}</p>
      <p className="job-location">{job.location}</p>
      <p className="job-type">{job.type}</p>
      <p className="job-type">{job.description}</p>
      <a href={job.url} target="_blank" rel="noopener noreferrer" className="apply-button">
        Apply Now
      </a>
    </div>
  );
};

export default JobDetailPage;

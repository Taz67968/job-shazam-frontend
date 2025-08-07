import React, { useState } from 'react'
import JobDetailsModal from './jobDetails'

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
   onTrack?: (id: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onTrack }) => {
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (jobId: number) => {
    setSelectedJobId(jobId)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedJobId(null)
  }
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
      
      
      
     <div className="flex justify-between">
        {onTrack && (
          <button
          onClick={() => onTrack(job)}
          className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            Track Job
          </button>
          
        )}
        <button onClick={() => openModal(1)} className='text-green-500' >View Details</button>
     </div>
       <JobDetailsModal jobId={selectedJobId} isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
};

export default JobCard;

'use client';

import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd';
import { MapPin, Building2, Trash2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

// --- Types ---
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
}

interface TrackedJob {
  job: Job;
  status: 'applied' | 'interview' | 'rejected' | 'accepted' | 'saved';
}

// --- Columns Config ---
const columns = [
  { id: 'saved', title: 'Saved', color: 'border-gray-300 bg-gray-50' },
  { id: 'applied', title: 'Applied', color: 'border-blue-300 bg-blue-50' },
  { id: 'interview', title: 'Interview', color: 'border-yellow-300 bg-yellow-50' },
  { id: 'rejected', title: 'Rejected', color: 'border-red-300 bg-red-50' },
  { id: 'accepted', title: 'Accepted', color: 'border-green-300 bg-green-50' }
];

// --- Component ---
export const ApplicationBoard = () => {
  const [jobs, setJobs] = useState<TrackedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Get token on mount
  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setToken(storedToken);
  }, []);

  // Fetch jobs
  useEffect(() => {
    if (!token) return;

    const fetchTrackedJobs = async () => {
      try {
        const res = await fetch('http://localhost:8080/saved-jobs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        const result = await res.json();

        const newResult: TrackedJob[] = result.data.map((item: TrackedJob) => ({
          job: {
            id: item.job.id,
            title: item.job.title,
            company: item.job.company,
            location: item.job.location
          },
          status: item.status
        }));

        setJobs(newResult);
      } catch (err) {
        console.error('Error fetching tracked jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackedJobs();
  }, [token]);

  // --- Drag & Drop Handler ---
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const jobId = result.draggableId;
    const newStatus = result.destination.droppableId as TrackedJob['status'];

    // Optimistic UI update
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.job.id === jobId ? { ...job, status: newStatus } : job
      )
    );

    try {
      const res = await fetch(`http://localhost:8080/saved-jobs/${jobId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) {
        toast.error('Failed to update job status');
      } else {
        toast.success(`job status updated to: ${newStatus}`)
      }
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  // --- Delete Job ---
  const removeJob = async (id: string) => {
    try {
      const res = await fetch(`/api/tracked?id=${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete job');

      setJobs((prev) => prev.filter((job) => job.job.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete job. Please try again.');
    }
  };

  // --- Helpers ---
  const getJobsByStatus = (status: TrackedJob['status']) =>
    jobs.filter((job) => job.status === status);

  const getStatusBadgeColor = (status: TrackedJob['status']) => {
    switch (status) {
      case 'saved':
        return 'bg-gray-100 text-gray-800';
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  // --- Render ---
  return (
    <div className="space-y-6 px-4">
      {/* Status Counters */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`rounded-lg p-4 text-center ${column.color} border`}
          >
            <div className="text-2xl font-bold text-black">
              {getJobsByStatus(column.id as TrackedJob['status']).length}
            </div>
            <div className="text-sm text-gray-600">{column.title}</div>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="space-y-4">
              <div className={`p-4 rounded-lg border-2 border-dashed ${column.color}`}>
                <h3 className="font-semibold text-center text-black">
                  {column.title} ({getJobsByStatus(column.id as TrackedJob['status']).length})
                </h3>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`space-y-3 min-h-[200px] p-2 rounded-lg transition ${
                      snapshot.isDraggingOver ? 'bg-gray-100' : ''
                    }`}
                  >
                    {getJobsByStatus(column.id as TrackedJob['status']).map(
                      (job, index) => (
                        <Draggable
                          key={job.job.id}
                          draggableId={job.job.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded-lg p-4 shadow-sm border transition ${
                                snapshot.isDragging
                                  ? 'shadow-lg'
                                  : 'hover:shadow-md'
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-sm truncate text-black">
                                  {job.job.title}
                                </h4>
                                <button
                                  onClick={() => removeJob(job.job.id)}
                                  className="text-gray-400 hover:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="space-y-1 text-xs text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Building2 className="w-3 h-3" />
                                  <span>{job.job.company}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{job.job.location}</span>
                                </div>
                                <div
                                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(
                                    job.status
                                  )}`}
                                >
                                  {job.status}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
      <Toaster toastOptions={{duration:4000}}/>
    </div>
  );
};

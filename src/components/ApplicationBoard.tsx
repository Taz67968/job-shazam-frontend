'use client';

import React, {useEffect, useState} from "react";
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import {MapPin,Building2,Trash2} from "lucide-react";

interface TrackedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  status: "applied" | "interview" | "rejected" | "accepted" | "saved";
}

const columns = [
  {id: "saved", title: "Saved", color: "border-gray-300 bg-gray-50"},
  {id: "applied", title: "Applied", color: "border-blue-300 bg-blue-50"},
  {id: "interview", title: "Interview", color: "border-yellow-300 bg-yellow-50"},
  {id: "rejected", title: "Rejected", color: "border-red-300 bg-red-50"},
  {id: "accepted", title: "Accepted", color: "border-green-300 bg-green-50"},
];

export const ApplicationBoard = () => {
  const [jobs, setJobs] = useState<TrackedJob[]>([]);
  const [loading, setLoading] = useState(true)
  const [token,setToken]=useState<string | null>(null)

  useEffect(()=>{
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token'): null;
    setToken(storedToken);
  },[])

  useEffect(() => {
    const fetchTrackedJobs = async () => {
      try {
        const res = await fetch("http://localhost:8080/saved-jobs",{
          method: "Get",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        const data = await res.json();
        console.log('saved jobs',data)
        const withStatus = data.map((job: TrackedJob) => ({
          ...job,
          id: job.id,
          status: job.status || "saved",
        }));

        console.log("jobs:",jobs)

        setJobs(withStatus);
        console.log('this is setJobs:',setJobs)
      } catch (err) {
        console.error("Error fetching tracked jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackedJobs();
  }, [jobs, token]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const jobId = result.draggableId;
    const newStatus = result.destination.droppableId as TrackedJob["status"];

    setJobs((prev) => prev.map((job) => (job.id === jobId ? {...job, status: newStatus} : job)));

    try {
      const res = await fetch(`http://localhost:8080/saved-jobs/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({status: newStatus}),
      });

      if (!res.ok) {
        throw new Error("Failed to update job status");
      }
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Failed to update job status on server.");
    }
  };

  const removeJob = async (id: string) => {
    try {
      const res = await fetch(`/api/tracked?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete job");

      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete job. Please try again.");
    }
  };

  // Helpers
  const getJobsByStatus = (status: TrackedJob["status"]) =>
    jobs.filter((job) => job.status === status);

  const getStatusBadgeColor = (status: TrackedJob["status"]) => {
    switch (status) {
      case "saved":
        return "bg-gray-100 text-gray-800";
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "interview":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-6 px-4">
      {/* Status Counters */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {columns.map((column) => (
          <div key={column.id} className={`rounded-lg p-4 text-center ${column.color} border`}>
            <div className="text-2xl font-bold text-black">
              {getJobsByStatus(column.id as TrackedJob["status"]).length}
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
                  {column.title} ({getJobsByStatus(column.id as TrackedJob["status"]).length})
                </h3>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`space-y-3 min-h-[200px] p-2 rounded-lg transition ${
                      snapshot.isDraggingOver ? "bg-gray-100" : ""
                    }`}
                  >
                    {getJobsByStatus(column.id as TrackedJob["status"]).map((job, index) => (
                      <Draggable key={job.id} draggableId={job.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white rounded-lg p-4 shadow-sm border transition ${
                              snapshot.isDragging ? "shadow-lg" : "hover:shadow-md"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-sm truncate text-black">
                                {job.title}
                              </h4>
                              <button
                                onClick={() => removeJob(job.id)}
                                className="text-gray-400 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="space-y-1 text-xs text-gray-600">
                              <div className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                <span>{job.company}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{job.location}</span>
                              </div>
                              {/* <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>Applied {job.appliedDate}</span>
                              </div> */}
                              <div
                                className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(
                                  job.status,
                                )}`}
                              >
                                {job.status}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

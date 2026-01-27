"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Building2, ExternalLink, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface TrackedJob {
  id: string; // This will hold the savedJob ID, not the job ID directly unless needed
  jobId: string;
  title: string;
  company: string;
  location: string;
  appliedDate: string;
  salary?: string;
  status: "applied" | "interview" | "rejected" | "accepted";
  notes?: string;
  applicationUrl?: string;
  scrapedAt?: string;
}

const columns = [
  { id: "applied", title: "Applied", color: "bg-blue-50 border-blue-200" },
  { id: "interview", title: "Interview", color: "bg-yellow-50 border-yellow-200" },
  { id: "rejected", title: "Rejected", color: "bg-red-50 border-red-200" },
  { id: "accepted", title: "Accepted", color: "bg-green-50 border-green-200" },
];

export const ApplicationBoard = () => {
  const [jobs, setJobs] = useState<TrackedJob[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  useEffect(() => {
    if (user) {
      fetchJobs();
    }
  }, [user]);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/saved-jobs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch jobs");

      const data = await res.json();
      // Transform SavedJob from backend to TrackedJob
      // Backend returns: { data: [{ id, job: {...}, status, savedAt, ... }] }
      // Map 'tracked' status to 'applied' for initial board placement
      const mappedJobs: TrackedJob[] = data.data.map((item: any) => ({
        id: item.id, // SavedJob ID
        jobId: item.job.id,
        title: item.job.title,
        company: item.job.company,
        location: item.job.location,
        appliedDate: new Date(item.savedAt).toLocaleDateString(),
        salary: item.job.salary,
        status: item.status === 'tracked' || item.status === 'saved' ? 'applied' : item.status,
        applicationUrl: item.job.applyUrl,
      })).filter((job: TrackedJob) => columns.some(col => col.id === job.status)); // Filter out any unknown statuses if strict

      setJobs(mappedJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Error",
        description: "Could not load your applications.",
        variant: "destructive",
      });
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const newStatus = result.destination.droppableId as TrackedJob["status"];
    const savedJobId = result.draggableId;

    // Optimistic Update
    const originalJobs = [...jobs];
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === savedJobId ? { ...job, status: newStatus } : job))
    );

    try {
      // Update Backend
      // NOTE: We need a patch endpoint on saved-jobs to update status.
      // Assuming PATCH /saved-jobs/:jobId expects { status: newStatus }
      // BUT WAIT: The :jobId param in controller usually expects the JOB ID, not the SavedJob ID based on previous view logic?
      // Let's check controller. The PATCH uses jobID param: @Patch(":jobId") ... UpdateStatus(userId, jobId, body.status)
      // So we need the JOB ID, not the SavedJob ID.
      // Let's find the job to get its jobId.
      const jobToUpdate = jobs.find(j => j.id === savedJobId);
      if (!jobToUpdate) return;

      const res = await fetch(`${API_URL}/saved-jobs/${jobToUpdate.jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

    } catch (error) {
      console.error("Failed to update status:", error);
      setJobs(originalJobs); // Revert
      toast({
        title: "Update Failed",
        description: "Could not update job status.",
        variant: "destructive"
      });
    }
  };

  const removeJob = async (savedJobId: string) => {
    // We need JOB ID to remove based on backend implementation (removeSavedJob(userId, jobId))
    const jobToRemove = jobs.find(j => j.id === savedJobId);
    if (!jobToRemove) return;

    // Optimistic remove
    const originalJobs = [...jobs];
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== savedJobId));

    try {
      const res = await fetch(`${API_URL}/saved-jobs/${jobToRemove.jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to remove job");
      toast({
        title: "Job Removed",
        description: "Application removed from board.",
      });

    } catch (error) {
      console.error("Remove failed:", error);
      setJobs(originalJobs);
      toast({
        title: "Error",
        description: "Could not remove job.",
        variant: "destructive",
      });
    }
  };

  const getJobsByStatus = (status: TrackedJob["status"]) => {
    return jobs.filter((job) => job.status === status);
  };

  const getStatusBadgeColor = (status: TrackedJob["status"]) => {
    switch (status) {
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

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {columns.map((column) => (
          <Card key={column.id} className={column.color}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">
                {getJobsByStatus(column.id as TrackedJob["status"]).length}
              </div>
              <div className="text-sm text-muted-foreground">{column.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Drag and Drop Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="space-y-4">
              <div className={`p-4 rounded-lg border-2 border-dashed ${column.color}`}>
                <h3 className="font-semibold text-center text-foreground">
                  {column.title} ({getJobsByStatus(column.id as TrackedJob["status"]).length})
                </h3>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-3 min-h-[200px] p-2 rounded-lg transition-colors ${snapshot.isDraggingOver ? "bg-muted/50" : ""
                      }`}
                  >
                    {getJobsByStatus(column.id as TrackedJob["status"]).map((job, index) => (
                      <Draggable key={job.id} draggableId={job.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`cursor-move transition-shadow ${snapshot.isDragging ? "shadow-lg" : "hover:shadow-md"
                              }`}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-sm text-foreground line-clamp-1">
                                  {job.title}
                                </h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeJob(job.id)}
                                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Building2 className="h-3 w-3" />
                                  <span className="truncate">{job.company}</span>
                                </div>

                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">{job.location}</span>
                                </div>

                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>Added {job.appliedDate}</span>
                                </div>

                                {job.salary && (
                                  <Badge variant="outline" className="text-xs">
                                    {job.salary}
                                  </Badge>
                                )}

                                <Badge className={`text-xs ${getStatusBadgeColor(job.status)}`}>
                                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                </Badge>

                                {job.notes && (
                                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                                    {job.notes}
                                  </p>
                                )}

                                {job.applicationUrl && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full mt-2 h-7 text-xs"
                                    onClick={() => window.open(job.applicationUrl, "_blank")}
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    External Apply
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
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

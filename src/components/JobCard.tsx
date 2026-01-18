"use client";

import React, {useState} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
  MapPin,
  Clock,
  DollarSign,
  Building2,
  ExternalLink,
  Bookmark,
  BarChart3,
} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {useAuth} from "@/contexts/AuthContext";
import {useRouter} from "next/navigation";
import {ResumeModal} from "./ResumeModal";
import {ComparisonResultModal} from "./ComparisonResultModal";
import {Job} from "@/types/job";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export const JobCard = ({job, onClick}: JobCardProps) => {
  const {toast} = useToast();
  const {user} = useAuth();
  const router = useRouter();
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  const API_URL = envUrl && envUrl.trim() !== "" ? envUrl : "http://localhost:8080";

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(job.applyUrl, "_blank");
  };

  const [isTracked, setIsTracked] = useState(false);

  const handleTrackClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const token = localStorage.getItem("authToken");
    console.log("active token",token);
    console.log("job id",job.id)

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/saved-jobs`, {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
        body: JSON.stringify({
          jobId: `${job.id}`,
          status: "saved",
        }),
      });

      if (!res.ok) throw new Error("Failed to track job");

      setIsTracked(true);
      toast({
        title: "Job Tracked!",
        description: `${job.title} at ${job.company} has been added to your tracked applications.`,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      router.push("/login");
      return;
    }
    setShowResumeModal(true);
  };

  const handleResumeSelect = async (resumeContent: string) => {
    setLoading(true);
    try {
      // BACKEND EXPECTS 'cv' and 'description' at /match
      const res = await fetch(`${API_URL}/match`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          description: job.description,
          cv: resumeContent, // Mapping resumeContent to cv
        }),
      });

      const data = await res.json();

      // If the backend returns the object directly (no wrapping 'success' property typically in NestJS unless intercepted)
      // Check if keys exist
      if (!res.ok) {
        throw new Error("Failed to compare resume");
      }

      // The backend returns: { matchPercentage, strengths, missingSkills, suggestions }
      // The ComparisonResultModal expects 'result' which matches this structure directly.
      setComparisonResult(data);
      setShowComparisonModal(true);

      // Save the comparison result
      await fetch(`${API_URL}/api/job_applications`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          user_id: user?.id,
          job_id: job.id,
          job_title: job.title,
          company: job.company,
          location: job.location,
          description: job.description,
          apply_url: job.applyUrl,
          status: "tracked",
          match_percentage: data.matchPercentage,
          improvement_suggestions: data.suggestions,
        }),
      });
      setIsTracked(true);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Comparison Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="glass-card hover:-translate-y-1 group relative overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-primary/80 group-hover:bg-primary transition-all" />
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors font-poppins">
              {job.title}
            </h3>
            <div className="flex items-center gap-4 text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{job.postedDate || job.scrapedAt || "Recently posted"}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCompareClick}
              disabled={loading}
              className="text-muted-foreground hover:text-primary"
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              {loading ? "Comparing..." : "Compare"}
            </Button>
            <Button
              variant={isTracked ? "default" : "outline"}
              size="sm"
              onClick={handleTrackClick}
              disabled={isTracked}
              className={`${isTracked ? "bg-green-500/20 text-green-500 border-green-500 hover:bg-green-500/30 glow-green" : "text-muted-foreground hover:text-primary"}`}
            >
              <Bookmark className={`h-4 w-4 mr-1 ${isTracked ? "fill-current" : ""}`} />
              {isTracked ? "Tracked" : "Track"}
            </Button>
            <Button
              onClick={handleApplyClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Apply Now
            </Button>
          </div>
        </div>

        <p className="mb-4 line-clamp-3 text-muted-foreground">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            {job.type}
          </Badge>
          {job.location.toLowerCase().includes("remote") && (
            <Badge className="bg-primary/20 text-primary border-primary/30">Remote</Badge>
          )}
          {job.salary && (
            <Badge variant="outline" className="flex items-center gap-1 border-border">
              <DollarSign className="h-3 w-3" />
              {job.salary}
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Source: {job.source || "Job Portal"}</span>
          <span className="text-primary hover:underline">View Details →</span>
        </div>
      </CardContent>

      <ResumeModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        onResumeSelect={handleResumeSelect}
      />

      <ComparisonResultModal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        result={comparisonResult}
        jobTitle={job.title}
        company={job.company}
      />
    </Card>
  );
};

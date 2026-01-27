"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  DollarSign,
  Building2,
  ExternalLink,
  Bookmark,
  BarChart3,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ResumeModal } from "./ResumeModal";
import { ComparisonResultModal } from "./ComparisonResultModal";
import { RateLimitAlert } from "./RateLimitAlert";
import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  onClick: () => void;
  initialIsTracked?: boolean;
}

export const JobCard = ({ job, onClick, initialIsTracked = false }: JobCardProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [resumeId, setResumeId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [rateLimitRemaining, setRateLimitRemaining] = useState(0);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(job.applyUrl, "_blank");
  };

  const [isTracked, setIsTracked] = useState(initialIsTracked);

  const handleTrackClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      if (isTracked) {
        // UNTRACK Logic
        const res = await fetch(`${API_URL}/saved-jobs/${job.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to untrack job");

        setIsTracked(false);
        toast({
          title: "Job Removed",
          description: "Job removed from your tracked applications.",
        });
      } else {
        // TRACK Logic
        const res = await fetch(`${API_URL}/saved-jobs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            jobId: job.id,
            status: "tracked",
          }),
        });

        if (!res.ok) throw new Error("Failed to track job");

        setIsTracked(true);
        toast({
          title: "Job Tracked!",
          description: `${job.title} at ${job.company} has been added to your tracked applications.`,
        });
      }
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

  const handleResumeSelect = async (resumeContent: string, id?: string) => {
    setResumeId(id); // Store resume ID for later comparison save
    setLoading(true);
    try {
      // Validate CV content
      if (!resumeContent || resumeContent.trim().length < 50) {
        toast({
          title: "Invalid Resume",
          description: "Resume content is too short. Please provide more details.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // BACKEND EXPECTS 'cv' and 'description' at /match
      const res = await fetch(`${API_URL}/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: job.description,
          cv: resumeContent, // Mapping resumeContent to cv
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Check for rate limiting
        if (res.status === 429) {
          const retryAfter = res.headers.get("Retry-After");
          const waitSeconds = retryAfter ? parseInt(retryAfter) : 60;
          setRateLimited(true);
          setRateLimitRemaining(waitSeconds);
          throw new Error("You're comparing too frequently. Please wait before trying again.");
        }
        throw new Error(data.message || "Failed to compare resume");
      }

      // Store comparison result
      setComparisonResult(data);
      setShowComparisonModal(true);

      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed. Check the results below.",
      });
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
    <>
      <RateLimitAlert
        show={rateLimited}
        remainingSeconds={rateLimitRemaining}
        onRetryReady={() => setRateLimited(false)}
      />

      <Card
        className="glass-card hover:-translate-y-1 group relative overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-primary/80 group-hover:bg-primary transition-all" />
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
            <div className="flex-1 w-full">
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-poppins line-clamp-2">
                {job.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground mb-3 text-sm">
                <div className="flex items-center gap-1.5 min-w-fit">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground/80">{job.company}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-fit">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-fit">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">{job.postedDate || job.scrapedAt || "Recently posted"}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap gap-2 w-full lg:w-auto" onClick={(e) => e.stopPropagation()}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCompareClick}
                disabled={loading}
                className="flex-1 lg:flex-none text-muted-foreground hover:text-primary border-white/10 glass"
              >
                <BarChart3 className="h-4 w-4 mr-1.5" />
                <span className="text-xs md:text-sm">{loading ? "..." : "Compare"}</span>
              </Button>
              <Button
                variant={isTracked ? "default" : "outline"}
                size="sm"
                onClick={handleTrackClick}
                className={`flex-1 lg:flex-none border-white/10 glass ${isTracked ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30" : "text-muted-foreground hover:text-primary"}`}
              >
                <Bookmark className={`h-4 w-4 mr-1.5 ${isTracked ? "fill-current" : ""}`} />
                <span className="text-xs md:text-sm">{isTracked ? "Tracked" : "Track"}</span>
              </Button>
              <Button
                onClick={handleApplyClick}
                className="flex-1 lg:flex-none bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                size="sm"
              >
                <ExternalLink className="h-4 w-4 mr-1.5" />
                <span className="text-xs md:text-sm">Apply</span>
              </Button>
            </div>
          </div>

          <p className="mb-4 line-clamp-2 md:line-clamp-3 text-sm md:text-base text-muted-foreground/90 leading-relaxed">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.type && (
              <Badge variant="secondary" className="glass bg-white/5 text-foreground/80 border-white/10 text-[10px] md:text-xs">
                {job.type}
              </Badge>
            )}
            {job.location.toLowerCase().includes("remote") && (
              <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] md:text-xs">Remote</Badge>
            )}
            {job.salary && job.salary !== "Not specified" && (
              <Badge variant="outline" className="flex items-center gap-1 border-white/10 text-foreground/70 text-[10px] md:text-xs">
                <DollarSign className="h-3 w-3" />
                {job.salary}
              </Badge>
            )}
          </div>

          <div className="flex justify-between items-center text-[10px] md:text-xs font-medium text-muted-foreground pt-2 border-t border-white/5">
            <span className="opacity-70">via {job.source || "Job Portal"}</span>
            <span className="text-primary hover:underline flex items-center gap-1 group/link">
              View Details
              <span className="group-hover/link:translate-x-1 transition-transform">→</span>
            </span>
          </div>
        </CardContent>

        <div onClick={(e) => e.stopPropagation()}>
          <ResumeModal
            isOpen={showResumeModal}
            onClose={() => setShowResumeModal(false)}
            onResumeSelect={handleResumeSelect}
          />
        </div>

        <ComparisonResultModal
          isOpen={showComparisonModal}
          onClose={() => setShowComparisonModal(false)}
          result={comparisonResult}
          jobTitle={job.title}
          company={job.company}
          jobId={job.id}
          resumeId={resumeId}
        />
      </Card>
    </>
  );
};

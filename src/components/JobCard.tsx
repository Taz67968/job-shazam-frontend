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
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(job.applyUrl, "_blank");
  };

  const handleTrackClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      router.push("/auth");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/job_applications`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          user_id: user.id,
          job_id: job.id,
          job_title: job.title,
          company: job.company,
          location: job.location,
          description: job.description,
          apply_url: job.applyUrl,
          status: "tracked",
        }),
      });

      if (!res.ok) throw new Error("Failed to track job");

      toast({
        title: "Job Tracked!",
        description: `${job.title} at ${job.company} has been added to your tracked applications.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      router.push("/auth");
      return;
    }
    setShowResumeModal(true);
  };

  const handleResumeSelect = async (resumeContent: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/compare-resume`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          jobDescription: job.description,
          jobTitle: job.title,
          company: job.company,
          resumeContent,
          userId: user?.id,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to compare resume");
      }

      setComparisonResult(data.analysis);
      setShowComparisonModal(true);

      // Save the comparison result
      await fetch(`${API_URL}/api/job_applications`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          user_id: user.id,
          job_id: job.id,
          job_title: job.title,
          company: job.company,
          location: job.location,
          description: job.description,
          apply_url: job.applyUrl,
          status: "tracked",
          match_percentage: data.analysis.matchPercentage,
          improvement_suggestions: data.analysis.suggestions,
        }),
      });
    } catch (error: any) {
      toast({
        title: "Comparison Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-primary bg-card"
      onClick={onClick}
    >
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
              variant="outline"
              size="sm"
              onClick={handleTrackClick}
              className="text-muted-foreground hover:text-primary"
            >
              <Bookmark className="h-4 w-4 mr-1" />
              Track
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

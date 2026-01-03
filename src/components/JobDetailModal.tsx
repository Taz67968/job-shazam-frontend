"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, DollarSign, Building2, ExternalLink, CheckCircle } from "lucide-react";
import { Job } from "@/types/job";

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, isOpen, onClose }) => {
  if (!job) return null;

  const handleApplyClick = () => {
    if (job.applyUrl) {
      window.open(job.applyUrl, "_blank", "noopener,noreferrer");
    }
  };

  const normalizeArray = (value?: string[] | string) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  };

  const requirements = normalizeArray(job.requirements);
  const benefits = normalizeArray(job.benefits);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{job.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Company Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">{job.company}</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                {job.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Posted {job.postedDate || "Recently"}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleApplyClick}
              className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-white shadow-lg shadow-primary/20"
              size="lg"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Apply Now
            </Button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {job.type && (
              <Badge variant="secondary" className="glass bg-white/10 text-white border-white/20">
                {job.type}
              </Badge>
            )}
            {job.location?.toLowerCase().includes("remote") && (
              <Badge className="bg-green-500/20 text-green-300 border border-green-500/30">Remote</Badge>
            )}
            {job.salary && (
              <Badge variant="outline" className="flex items-center gap-1 text-white border-white/20">
                <DollarSign className="h-3 w-3" />
                {job.salary}
              </Badge>
            )}
          </div>

          <Separator className="bg-white/10" />

          {/* Job Description */}
          {job.description && (
            <div>
              <h3 className="text-xl font-bold mb-3 text-white">Job Description</h3>
              <div
                className="text-gray-300 leading-relaxed space-y-4 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, '<br/>') }}
              />
            </div>
          )}

          <Separator className="bg-white/10" />

          {/* Requirements */}
          {requirements.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Requirements</h3>
              <ul className="space-y-3">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator className="bg-white/10" />

          {/* Benefits */}
          {benefits.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-gray-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator className="bg-white/10" />

          {/* Apply Footer */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Ready to start your journey?</h4>
                <p className="text-sm text-gray-400">Source: <span className="text-primary">{job.source || "Job Portal"}</span></p>
              </div>
              <Button onClick={handleApplyClick} className="bg-primary hover:bg-primary/90 text-white w-full md:w-auto">
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply on Company Site
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

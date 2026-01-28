"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job: initialJob, isOpen, onClose }) => {
  const [job, setJob] = React.useState<Job | null>(initialJob);
  const [isShazaming, setIsShazaming] = React.useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  React.useEffect(() => {
    setJob(initialJob);
  }, [initialJob]);

  React.useEffect(() => {
    const triggerShazam = async () => {
      if (isOpen && job && (!job.detailed || Object.keys(job.detailed).length < 3)) {
        setIsShazaming(true);
        try {
          const res = await fetch(`${API_URL}/jobs/${job.id}/structure`, {
            method: "POST",
          });
          if (res.ok) {
            const data = await res.json();
            setJob(data);
          }
        } finally {
          setIsShazaming(false);
        }
      }
    };

    triggerShazam();
  }, [isOpen, initialJob, API_URL]);

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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-white/10 glass">
        <DialogHeader>
          <div className="flex justify-between items-center mb-2">
            <Badge variant="outline" className="text-primary border-primary/30">Enhanced</Badge>
            {isShazaming && (
              <div className="flex items-center gap-2 text-primary animate-pulse">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                <span className="text-xs font-bold tracking-widest uppercase">Shazaming...</span>
              </div>
            )}
          </div>
          <DialogTitle className="text-2xl md:text-3xl font-bold gradient-text">{job.title}</DialogTitle>
          <div className="sr-only">
            <DialogDescription>
              Detailed information about the job listing at {job.company}.
            </DialogDescription>
          </div>
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
              <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">Remote</Badge>
            )}
            {job.salary && (
              <Badge variant="outline" className="flex items-center gap-1 text-white border-white/20">
                <DollarSign className="h-3 w-3" />
                {job.salary}
              </Badge>
            )}
          </div>

          <Separator className="bg-white/5" />

          {/* About Us (if structured) */}
          {job.detailed?.aboutUs && (
            <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-primary">About the Company</h3>
              <p className="text-foreground/90 leading-relaxed italic text-sm md:text-base">{job.detailed.aboutUs}</p>
            </div>
          )}

          {/* Job Description / Overview */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Role Overview
            </h3>
            <div
              className={`text-foreground/85 leading-relaxed space-y-4 prose prose-invert max-w-none transition-opacity duration-500 text-sm md:text-base ${isShazaming ? 'opacity-30' : 'opacity-100'}`}
              dangerouslySetInnerHTML={{ __html: (job.detailed?.roleOverview || job.description || "").replace(/\n/g, '<br/>') }}
            />
          </div>

          {!isShazaming && (
            <>
              {/* Responsibilities (Structured) */}
              {job.detailed?.responsibilities && job.detailed.responsibilities.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Responsibilities
                  </h3>
                  <ul className="grid grid-cols-1 gap-3">
                    {job.detailed.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-card/40 p-4 rounded-xl border border-white/5 hover:border-primary/20 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                        <span className="text-foreground/90 text-sm md:text-base">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements (Structured) */}
              {(requirements.length > 0 || job.detailed?.requirements?.mustHave?.length) && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Key Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(job.detailed?.requirements?.mustHave || requirements).map((req, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-card/40 p-4 rounded-xl border border-white/5 hover:border-primary/20 transition-colors">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-foreground/85 text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits (Structured) */}
              {(benefits.length > 0 || (job.detailed?.benefits && Object.values(job.detailed.benefits).some(arr => arr?.length))) && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-secondary" />
                    Perks & Benefits
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(() => {
                      const allBenefits = job.detailed?.benefits
                        ? Object.values(job.detailed.benefits).flat().filter(Boolean) as string[]
                        : benefits;

                      return allBenefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 bg-secondary/5 p-3 rounded-lg border border-secondary/10">
                          <Badge variant="outline" className="h-2 w-2 rounded-full bg-secondary p-0 border-none" title="Benefit" />
                          <span className="text-foreground/85 text-xs font-medium">{benefit}</span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              )}
            </>
          )}

          <Separator className="bg-white/10 opacity-50" />

          {/* Apply Footer */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-2xl border border-white/10 glass">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-lg font-extrabold text-foreground mb-1">Passionate about this role?</h4>
                <p className="text-sm text-muted-foreground">Original listing found on <span className="text-primary font-bold">{job.source || "Job Portal"}</span></p>
              </div>
              <Button onClick={handleApplyClick} className="bg-primary hover:bg-primary/90 text-white w-full md:w-auto px-10 h-12 rounded-xl text-base font-bold shadow-xl shadow-primary/30">
                <ExternalLink className="h-5 w-5 mr-2" />
                Apply Directly
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

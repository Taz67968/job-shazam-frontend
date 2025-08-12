"use client";

import React from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {MapPin, Clock, DollarSign, Building2, ExternalLink, CheckCircle} from "lucide-react";
import {Job} from "@/types/job";

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({job, isOpen, onClose}) => {
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
                <Building2 className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">{job.company}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
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
              className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
              size="lg"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Apply Now
            </Button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {job.type && (
              <Badge variant="secondary" className="text-sm">
                {job.type}
              </Badge>
            )}
            {job.location?.toLowerCase().includes("remote") && (
              <Badge className="bg-green-100 text-green-800">Remote</Badge>
            )}
            {job.salary && (
              <Badge variant="outline" className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {job.salary}
              </Badge>
            )}
          </div>

          <Separator />

          {/* Job Description */}
          {job.description && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Job Description</h3>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>
          )}

          <Separator />

          {/* Requirements */}
          {requirements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <ul className="space-y-2">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          {/* Benefits */}
          {benefits.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Apply Footer */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Ready to Apply?</h4>
                <p className="text-sm text-gray-600">Source: {job.source || "Job Portal"}</p>
              </div>
              <Button onClick={handleApplyClick} className="bg-green-600 hover:bg-green-700">
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

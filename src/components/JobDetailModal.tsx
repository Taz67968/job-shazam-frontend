"use client";

import React from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "./ui/dialog";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Separator} from "./ui/separator";
import {MapPin, Clock, DollarSign, Building2, ExternalLink, CheckCircle} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  applyUrl: string;
  source: string;
}

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JobDetailModal = ({job, isOpen, onClose}: JobDetailModalProps) => {
  if (!job) return null;

  const handleApplyClick = () => {
    window.open(job.applyUrl, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{job.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Company and Job Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">{job.company}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Posted {job.postedDate}</span>
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

          {/* Job Type and Salary */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-sm">
              {job.type}
            </Badge>
            {job.location.toLowerCase().includes("remote") && (
              <Badge className="bg-green-100 text-green-800">Remote</Badge>
            )}
            <Badge variant="outline" className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {job.salary}
            </Badge>
          </div>

          <Separator />

          {/* Job Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Job Description</h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          <Separator />

          {/* Requirements */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Requirements</h3>
            <ul className="space-y-2">
              {job.requirements.map((requirement, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Benefits */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {job.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Apply Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Ready to Apply?</h4>
                <p className="text-sm text-gray-600">Source: {job.source}</p>
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

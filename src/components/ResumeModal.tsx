"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResumeSelect: (resumeContent: string) => void;
}

export const ResumeModal = ({isOpen, onClose, onResumeSelect}: ResumeModalProps) => {
  const handleSelect = () => {
    // For demo, just send some dummy resume content back
    onResumeSelect("This is a sample resume content.");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Select Your Resume</DialogTitle>
        </DialogHeader>
        <div>
          <p className="mb-4">You can add your resume selection/upload UI here.</p>
          <Button onClick={handleSelect}>Select Dummy Resume</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

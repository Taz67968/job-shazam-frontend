"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileUp, Copy } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResumeSelect: (resumeContent: string, resumeId?: string) => void;
}

export const ResumeModal = ({ isOpen, onClose, onResumeSelect }: ResumeModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file first",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please log in to upload a resume",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const token = localStorage.getItem("authToken");

      const res = await fetch(`${API_URL}/api/resumes/upload`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Upload failed" }));
        throw new Error(error.message || "Failed to upload resume");
      }

      const data = await res.json();
      onResumeSelect(data.content, data.id); // Pass both content and resume ID
      setSelectedFile(null);
      onClose();

      toast({
        title: "Resume uploaded",
        description: "Your resume has been processed successfully",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to upload resume";
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) {
      toast({
        title: "Empty content",
        description: "Please paste your resume text",
        variant: "destructive",
      });
      return;
    }

    if (textInput.length < 50) {
      toast({
        title: "Resume too short",
        description: "Please provide more detailed resume content",
        variant: "destructive",
      });
      return;
    }

    onResumeSelect(textInput);
    setTextInput("");
    onClose();

    toast({
      title: "Resume selected",
      description: "Your resume text has been submitted",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Your Resume</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="text">Paste Text</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4 py-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition">
              <FileUp className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <label htmlFor="file-input" className="cursor-pointer">
                <p className="text-sm font-medium mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF or DOCX (Max 10MB)</p>
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>

            {selectedFile && (
              <div className="bg-secondary/50 p-3 rounded-lg">
                <p className="text-sm font-medium text-foreground">
                  ✓ Selected: {selectedFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleFileUpload}
                disabled={!selectedFile || loading}
                className="bg-primary hover:bg-primary/90"
              >
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {loading ? "Processing..." : "Upload Resume"}
              </Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="text" className="space-y-4 py-4">
            <textarea
              placeholder="Paste your resume text here. Include work experience, skills, education, and certifications..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full h-64 p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="text-xs text-muted-foreground">
              <p>{textInput.length} characters</p>
              {textInput.length < 50 && (
                <p className="text-orange-500">Minimum 50 characters required</p>
              )}
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleTextSubmit}
                disabled={textInput.length < 50}
                className="bg-primary hover:bg-primary/90"
              >
                <Copy className="h-4 w-4 mr-2" />
                Use This Resume
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

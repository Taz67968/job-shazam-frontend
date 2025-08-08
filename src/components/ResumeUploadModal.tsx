"use client";

import React, {useState, useEffect} from "react";
import {Button} from "./ui/button";
import {Loader2, Upload} from "lucide-react";

interface ResumeUploadModalProps {
  onClose: () => void;
  jobDescription: string;
  onCompareComplete: (result: any) => void;
}

export const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({
  onClose,
  jobDescription,
  onCompareComplete,
}) => {
  const [existingResume, setExistingResume] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if resume exists for user on mount
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setExistingResume(null);
          return;
        }
        const res = await fetch("http://localhost:8080/users/me/resume", {
          headers: {Authorization: `Bearer ${token}`},
        });
        if (res.ok) {
          const data = await res.json();
          setExistingResume(data.resumeUrl || null);
        } else {
          setExistingResume(null);
        }
      } catch {
        setExistingResume(null);
      }
    };
    fetchResume();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadAndCompare = async () => {
    if (!file) {
      setError("Please upload a resume file.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      // Delete old resume if exists
      if (existingResume) {
        await fetch("http://localhost:8080/users/me/resume", {
          method: "DELETE",
          headers: {Authorization: `Bearer ${token}`},
        });
      }

      // Upload new resume
      const formData = new FormData();
      formData.append("resume", file);

      const uploadRes = await fetch("http://localhost:8080/users/me/resume", {
        method: "POST",
        headers: {Authorization: `Bearer ${token}`},
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload resume");
      }

      // Get uploaded resume text (assume backend extracts text and returns it)
      const uploadData = await uploadRes.json();
      const resumeText = uploadData.text;

      // Send to compare endpoint
      const compareRes = await fetch("/api/compare", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({resume: resumeText, jobDescription}),
      });

      if (!compareRes.ok) {
        throw new Error("Comparison failed");
      }

      const compareData = await compareRes.json();

      onCompareComplete(compareData);
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUseExistingResume = async () => {
    if (!existingResume) {
      setError("No existing resume found");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      // Fetch resume text from backend
      const res = await fetch("http://localhost:8080/users/me/resume/text", {
        headers: {Authorization: `Bearer ${token}`},
      });
      if (!res.ok) {
        throw new Error("Failed to fetch resume text");
      }
      const data = await res.json();
      const resumeText = data.text;

      // Send to compare endpoint
      const compareRes = await fetch("/api/compare", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({resume: resumeText, jobDescription}),
      });

      if (!compareRes.ok) {
        throw new Error("Comparison failed");
      }

      const compareData = await compareRes.json();

      onCompareComplete(compareData);
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Upload your resume</h2>

        {error && <div className="mb-3 text-red-600 font-semibold">{error}</div>}

        {existingResume ? (
          <>
            <p className="mb-2">You already have a resume uploaded.</p>
            <div className="flex gap-3 mb-4">
              <Button
                onClick={handleUseExistingResume}
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading && <Loader2 className="animate-spin" />}
                Use Existing Resume
              </Button>
              <label className="cursor-pointer bg-secondary px-3 py-2 rounded-md flex items-center gap-2">
                <Upload size={16} />
                Upload New Resume
                <input
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </label>
              {file && <span className="self-center">{file.name}</span>}
            </div>
            <Button onClick={handleUploadAndCompare} disabled={!file || loading} className="w-full">
              {loading ? "Uploading & Comparing..." : "Upload & Compare"}
            </Button>
          </>
        ) : (
          <>
            <label className="cursor-pointer bg-secondary px-3 py-2 rounded-md flex items-center gap-2 mb-4">
              <Upload size={16} />
              Upload Resume
              <input
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                onChange={handleFileChange}
                disabled={loading}
              />
            </label>
            {file && <p className="mb-4">{file.name}</p>}
            <Button onClick={handleUploadAndCompare} disabled={!file || loading} className="w-full">
              {loading ? "Uploading & Comparing..." : "Upload & Compare"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

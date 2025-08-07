// components/ResumeMatcher.tsx
"use client";

import React, {useState} from "react";
import {Loader2} from "lucide-react";
import {Textarea} from "./ui/textarea";
import {Button} from "./ui/button";

interface ResumeMatcherProps {
  jobDescription: string;
}

export const ResumeMatcher: React.FC<ResumeMatcherProps> = ({jobDescription}) => {
  const [resumeText, setResumeText] = useState("");
  const [matchResult, setMatchResult] = useState<null | {
    match: number;
    strengths: string[];
    improvements: string[];
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({resume: resumeText, jobDescription}),
      });
      const data = await res.json();
      setMatchResult(data);
    } catch (err) {
      console.error("Error comparing resume:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-4 border rounded-md shadow-sm bg-white">
      <h3 className="text-xl font-semibold mb-2">🎯 Resume Match Analyzer</h3>
      <p className="text-sm text-gray-500 mb-4">
        Paste your resume below to check how well it matches this job.
      </p>

      <Textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        rows={8}
        placeholder="Paste your resume here..."
        className="w-full mb-4"
      />

      <Button onClick={handleCompare} disabled={loading || !resumeText}>
        {loading ? <Loader2 className="animate-spin mr-2" /> : "Compare"}
        {loading ? "Comparing..." : "Compare Resume"}
      </Button>

      {matchResult && (
        <div className="mt-6">
          <p className="text-lg font-bold">Match Score: {matchResult.match}%</p>
          <div className="mt-2">
            <p className="font-semibold">Strengths.....:</p>
            <ul className="list-disc ml-6 text-sm text-green-700">
              {matchResult.strengths.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-2">
            <p className="font-semibold">Improvements.....:</p>
            <ul className="list-disc ml-6 text-sm text-red-700">
              {matchResult.improvements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

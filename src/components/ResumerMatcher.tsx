"use client";

import React, {useState} from "react";
import {Loader2, Upload} from "lucide-react";
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type;

    try {
      if (fileType === "application/pdf") {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
        const reader = new FileReader();
        reader.onload = async () => {
          const typedArray = new Uint8Array(reader.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item: any) => item.str).join(" ") + "\n";
          }
          setResumeText(text.trim());
        };
        reader.readAsArrayBuffer(file);
      } else if (
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const mammoth = await import("mammoth");
          const result = await mammoth.extractRawText({
            arrayBuffer: event.target?.result as ArrayBuffer,
          });
          setResumeText(result.value.trim());
        };
        reader.readAsArrayBuffer(file);
      } else {
        alert("Please upload a PDF or DOCX file.");
      }
    } catch (error) {
      console.error("Error reading file:", error);
      alert("Could not read the uploaded file.");
    }
  };

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
      <h3 className="text-xl font-semibold mb-2"> Resume Match Analyzer</h3>
      <p className="text-sm text-gray-500 mb-4">
        Upload your resume or paste it below to check how well it matches this job.
      </p>

      {/* File Upload */}
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer bg-secondary px-3 py-2 rounded-md w-fit">
          <Upload size={18} /> Upload Resume
          <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Text Input */}
      <Textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        rows={8}
        placeholder="Paste your resume here or upload a file above..."
        className="w-full mb-4"
      />

      {/* Compare Button */}
      <Button onClick={handleCompare} disabled={loading || !resumeText}>
        {loading ? <Loader2 className="animate-spin mr-2" /> : null}
        {loading ? "Comparing..." : "Compare Resume"}
      </Button>

      {/* Match Result */}
      {matchResult && (
        <div className="mt-6">
          <p className="text-lg font-bold">Match Score: {matchResult.match}%</p>
          <div className="mt-2">
            <p className="font-semibold"> Strengths:</p>
            <ul className="list-disc ml-6 text-sm text-green-700">
              {matchResult.strengths.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-2">
            <p className="font-semibold"> Improvements:</p>
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

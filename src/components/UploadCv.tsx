"use client";
import { useState } from "react";

export default function UploadCV() {
  const [file, setFile] = useState<File | null>(null);
  const [recommendations, setRecommendations] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("cv", file);

    const res = await fetch("/api/upload-cv", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setRecommendations(data.recommendations);
  };
  return (
    <div className="p-6 border rounded shadow-md bg-white max-w-xl mx-auto mt-8">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4 text-green-400 cursor-pointer"
      />
      <button onClick={handleUpload} className="bg-green-400 text-white px-4 py-2 rounded cursor-pointer">
        Upload CV & Get Recommendations
      </button>

      {recommendations && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-2">AI Job Recommendations:</h2>
          <pre className="whitespace-pre-wrap">{recommendations}</pre>
        </div>
      )}
    </div>
  );
}

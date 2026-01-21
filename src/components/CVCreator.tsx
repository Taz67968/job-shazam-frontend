"use client";

import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {FileText, Download, Sparkles, RefreshCw} from "lucide-react";
import {useToast} from "@/hooks/use-toast";

interface CVExperience {
  role: string;
  company: string;
  duration: string;
  points: string[];
}

interface CVData {
  summary: string;
  skills: string[];
  experience: CVExperience[];
}

export default function CVCreator() {
  const [loading, setLoading] = useState(false);
  const [generatedCV, setGeneratedCV] = useState<CVData | null>(null);
  const {toast} = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    // Mock generation for UI demo
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setGeneratedCV({
        summary:
          "Experienced Full Stack Developer with a passion for building scalable web applications...",
        skills: ["React", "Node.js", "TypeScript", "TailwindCSS"],
        experience: [
          {
            role: "Senior Developer",
            company: "Tech Corp",
            duration: "2020-Present",
            points: ["Led team of 5", "Refactored legacy code"],
          },
        ],
      });
      toast({title: "CV Generated", description: "Your tailored CV is ready!"});
    } catch {
      toast({title: "Generation Failed", description: "Please try again.", variant: "destructive"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 px-4 pb-12">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
            AI CV Creator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate a perfectly tailored CV for your dream job in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="glass-card rounded-2xl p-8 animate-fade-in-left">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="text-primary" /> Job Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Job Description</label>
                <textarea
                  className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-primary focus:border-primary transition-all text-sm"
                  placeholder="Paste the job description here..."
                />
              </div>
              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <RefreshCw className="animate-spin mr-2" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" /> Generate Tailored CV
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="glass-card rounded-2xl p-8 animate-fade-in-right relative min-h-[500px]">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="text-secondary" /> Preview
            </h2>

            {generatedCV ? (
              <div className="space-y-6 animate-fade-in">
                <div className="p-6 bg-white text-black rounded-lg shadow-lg">
                  <div className="border-b pb-4 mb-4">
                    <h3 className="text-2xl font-bold">John Doe</h3>
                    <p className="text-gray-600">Full Stack Developer</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold uppercase text-sm text-gray-500 mb-2">
                      Professional Summary
                    </h4>
                    <p className="text-sm">{generatedCV.summary}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold uppercase text-sm text-gray-500 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {generatedCV.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-gray-200 rounded text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold uppercase text-sm text-gray-500 mb-2">Experience</h4>
                    {generatedCV.experience.map((exp, i) => (
                      <div key={i} className="mb-3">
                        <div className="flex justify-between">
                          <span className="font-bold text-sm">{exp.role}</span>
                          <span className="text-xs text-gray-500">{exp.duration}</span>
                        </div>
                        <p className="text-xs text-gray-600 italic">{exp.company}</p>
                        <ul className="list-disc list-inside mt-1">
                          {exp.points.map((p, j) => (
                            <li key={j} className="text-xs">
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-secondary text-secondary hover:bg-secondary/10"
                >
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-10 w-10 opacity-50" />
                </div>
                <p>Your tailored CV will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Progress} from "./ui/progress";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {CheckCircle, AlertCircle, TrendingUp, Target} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {useAuth} from "@/contexts/AuthContext";

interface ComparisonResult {
  matchPercentage: number;
  breakdown?: {
    technical: number;
    experience: number;
    education: number;
    softSkills: number;
    jobSpecific?: number;
  };
  suggestions: string[];
  missingSkills: string[];
  strengths: string[];
  keywords?: {
    matched: string[];
    missing: string[];
  };
  experienceLevelMatch?: string;
  salaryCompatibility?: string;
  criticalGaps?: string[];
  overallFitAssessment?: string;
}

interface ComparisonResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ComparisonResult | null;
  jobTitle: string;
  company: string;
  jobId?: string;
  resumeId?: string;
}

export const ComparisonResultModal = ({
  isOpen,
  onClose,
  result,
  jobTitle,
  company,
  jobId,
  resumeId,
}: ComparisonResultModalProps) => {
  const [saving, setSaving] = useState(false);
  const {toast} = useToast();
  const {user} = useAuth();

  if (!result) return null;

  const handleTrackJob = async () => {
    if (!jobId || !resumeId || !user) {
      toast({
        title: "Error",
        description: "Missing required information to track job",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const token = localStorage.getItem("token");

      // Save comparison to database
      const res = await fetch(`${API_URL}/api/comparisons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && {Authorization: `Bearer ${token}`}),
        },
        body: JSON.stringify({
          jobId,
          resumeId,
          result,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save comparison");
      }

      toast({
        title: "Job Tracked",
        description: `${jobTitle} at ${company} has been tracked with comparison results`,
      });

      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to track job";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getMatchBgColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 border-green-200";
    if (percentage >= 60) return "bg-yellow-100 border-yellow-200";
    return "bg-red-100 border-red-200";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Resume Analysis: {jobTitle} at {company}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Fit Assessment */}
          {result.overallFitAssessment && (
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-foreground">{result.overallFitAssessment}</p>
              </CardContent>
            </Card>
          )}

          {/* Match Percentage */}
          <Card className={`${getMatchBgColor(result.matchPercentage)}`}>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getMatchColor(result.matchPercentage)} mb-2`}>
                  {result.matchPercentage}%
                </div>
                <p className="text-muted-foreground mb-4">Match Score</p>
                <Progress value={result.matchPercentage} className="w-full h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Breakdown Scores */}
          {result.breakdown && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detailed Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Technical Skills</span>
                      <span className="text-sm text-muted-foreground">
                        {result.breakdown.technical}%
                      </span>
                    </div>
                    <Progress value={result.breakdown.technical} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Experience</span>
                      <span className="text-sm text-muted-foreground">
                        {result.breakdown.experience}%
                      </span>
                    </div>
                    <Progress value={result.breakdown.experience} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Education</span>
                      <span className="text-sm text-muted-foreground">
                        {result.breakdown.education}%
                      </span>
                    </div>
                    <Progress value={result.breakdown.education} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Soft Skills</span>
                      <span className="text-sm text-muted-foreground">
                        {result.breakdown.softSkills}%
                      </span>
                    </div>
                    <Progress value={result.breakdown.softSkills} className="h-2" />
                  </div>
                  {result.breakdown.jobSpecific !== undefined && (
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Job-Specific Requirements</span>
                        <span className="text-sm text-muted-foreground">
                          {result.breakdown.jobSpecific}%
                        </span>
                      </div>
                      <Progress value={result.breakdown.jobSpecific} className="h-2" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Critical Gaps */}
          {result.criticalGaps && result.criticalGaps.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="h-5 w-5" />
                  Critical Gaps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.criticalGaps.map((gap, index) => (
                    <div key={index} className="text-sm text-red-700 flex items-start gap-2">
                      <span className="mt-1">⚠️</span>
                      <span>{gap}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Experience Level & Salary Info */}
          <div className="grid md:grid-cols-2 gap-4">
            {result.experienceLevelMatch && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Experience Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">{result.experienceLevelMatch}</p>
                </CardContent>
              </Card>
            )}
            {result.salaryCompatibility && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Salary Compatibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">{result.salaryCompatibility}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* ATS Keywords */}
          {result.keywords &&
            (result.keywords.matched.length > 0 || result.keywords.missing.length > 0) && (
              <div className="grid md:grid-cols-2 gap-6">
                {result.keywords.matched.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        Matched Keywords
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {result.keywords.matched.map((keyword, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-green-100 text-green-800 border-green-200 text-xs"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                {result.keywords.missing.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        Missing Keywords
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {result.keywords.missing.map((keyword, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-red-200 text-red-700 text-xs"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Strengths */}
            {result.strengths.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Strengths Found
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.strengths.map((strength, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-green-100 text-green-800 border-green-200"
                      >
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Missing Skills */}
            {result.missingSkills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <Target className="h-5 w-5" />
                    Skills to Add
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.missingSkills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-orange-200 text-orange-700"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Improvement Suggestions */}
          {result.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <TrendingUp className="h-5 w-5" />
                  Improvement Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between gap-3 pt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  // Download as JSON
                  const element = document.createElement("a");
                  const file = new Blob([JSON.stringify(result, null, 2)], {
                    type: "application/json",
                  });
                  element.href = URL.createObjectURL(file);
                  element.download = `analysis_${jobTitle.replace(/\s+/g, "_")}_${company.replace(/\s+/g, "_")}.json`;
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
              >
                Download JSON
              </Button>
              <Button
                onClick={() => {
                  // Download as Markdown
                  const markdown = `# Resume Analysis: ${jobTitle} at ${company}

## Match Score: ${result.matchPercentage}%

${
  result.breakdown
    ? `### Detailed Breakdown
- **Technical Skills**: ${result.breakdown.technical}%
- **Experience**: ${result.breakdown.experience}%
- **Education**: ${result.breakdown.education}%
- **Soft Skills**: ${result.breakdown.softSkills}%

`
    : ""
}### ✅ Strengths
${result.strengths.map((s) => `- ${s}`).join("\n")}

### 🎯 Skills to Add
${result.missingSkills.map((s) => `- ${s}`).join("\n")}

### 💡 Improvement Suggestions
${result.suggestions.map((s, i) => `${i + 1}. ${s}`).join("\n")}

${
  result.keywords
    ? `### 🔑 ATS Keywords

**Matched Keywords:**
${result.keywords.matched.map((k) => `- ${k}`).join("\n")}

**Missing Keywords:**
${result.keywords.missing.map((k) => `- ${k}`).join("\n")}
`
    : ""
}
---
*Generated by Job Shazam AI Compare*
                `.trim();

                  const element = document.createElement("a");
                  const file = new Blob([markdown], {type: "text/markdown"});
                  element.href = URL.createObjectURL(file);
                  element.download = `analysis_${jobTitle.replace(/\s+/g, "_")}_${company.replace(/\s+/g, "_")}.md`;
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Download Report (Markdown)
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button
                onClick={handleTrackJob}
                disabled={saving || !jobId}
                className="bg-green-600 hover:bg-green-700"
              >
                {saving ? "Saving..." : "Track This Job"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

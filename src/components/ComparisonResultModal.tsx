"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, TrendingUp, Target } from "lucide-react";

interface ComparisonResult {
  matchPercentage: number;
  suggestions: string[];
  missingSkills: string[];
  strengths: string[];
}

interface ComparisonResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ComparisonResult | null;
  jobTitle: string;
  company: string;
}

export const ComparisonResultModal = ({
  isOpen,
  onClose,
  result,
  jobTitle,
  company,
}: ComparisonResultModalProps) => {
  if (!result) return null;

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

          <div className="flex justify-end pt-4">
            <Button
              onClick={() => {
                const element = document.createElement("a");
                const file = new Blob([JSON.stringify(result, null, 2)], { type: 'text/plain' });
                element.href = URL.createObjectURL(file);
                element.download = "tailored_cv_analysis.json";
                document.body.appendChild(element); // Required for this to work in FireFox
                element.click();
              }}
              className="bg-primary hover:bg-primary/90"
            >
              Download Analysis
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

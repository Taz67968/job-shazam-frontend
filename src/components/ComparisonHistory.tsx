"use client";

import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useToast} from "@/hooks/use-toast";
import {useAuth} from "@/contexts/AuthContext";
import {TrendingUp, CheckCircle, AlertCircle, Trash2} from "lucide-react";

interface Comparison {
  id: string;
  job: {
    id: string;
    title: string;
    company: string;
  };
  resume: {
    id: string;
    filename: string;
  };
  result: {
    matchPercentage: number;
  };
  createdAt: string;
  appliedDate?: string;
}

export const ComparisonHistory = () => {
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({totalComparisons: 0, applied: 0, appliedRate: 0});
  const [selectedComparison, setSelectedComparison] = useState<Comparison | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const {toast} = useToast();
  const {user} = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (!user) return;
    fetchComparisons();
    fetchStats();
  }, [user]);

  const fetchComparisons = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/comparisons`, {
        headers: {
          ...(token && {Authorization: `Bearer ${token}`}),
        },
      });

      if (!res.ok) throw new Error("Failed to fetch comparisons");

      const data = await res.json();
      setComparisons(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load history";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/comparisons/stats/conversion`, {
        headers: {
          ...(token && {Authorization: `Bearer ${token}`}),
        },
      });

      if (!res.ok) throw new Error("Failed to fetch stats");

      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleDelete = async (comparisonId: string) => {
    if (!confirm("Are you sure you want to delete this comparison?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/comparisons/${comparisonId}/delete`, {
        method: "POST",
        headers: {
          ...(token && {Authorization: `Bearer ${token}`}),
        },
      });

      if (!res.ok) throw new Error("Failed to delete comparison");

      setComparisons(comparisons.filter((c) => c.id !== comparisonId));
      toast({
        title: "Deleted",
        description: "Comparison has been removed",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleMarkApplied = async (comparisonId: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/comparisons/${comparisonId}/mark-applied`, {
        method: "POST",
        headers: {
          ...(token && {Authorization: `Bearer ${token}`}),
        },
      });

      if (!res.ok) throw new Error("Failed to update");

      setComparisons(
        comparisons.map((c) =>
          c.id === comparisonId ? {...c, appliedDate: new Date().toISOString()} : c,
        ),
      );

      // Refresh stats
      fetchStats();

      toast({
        title: "Updated",
        description: "Marked as applied",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 text-green-800";
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  if (loading) {
    return <div className="text-center py-8">Loading comparisons...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Comparisons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalComparisons}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Applied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.applied}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Application Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.appliedRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Comparisons List */}
      {comparisons.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No comparisons yet. Start by comparing your resume with a job!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {comparisons.map((comparison) => (
            <Card key={comparison.id} className="hover:shadow-md transition">
              <CardContent className="p-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{comparison.job.title}</h4>
                    <p className="text-sm text-muted-foreground">{comparison.job.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Resume: {comparison.resume.filename}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(comparison.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge
                      className={`text-lg px-3 py-1 ${getMatchColor(comparison.result.matchPercentage)}`}
                    >
                      {comparison.result.matchPercentage}%
                    </Badge>

                    <div className="flex gap-2">
                      {comparison.appliedDate ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Applied
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkApplied(comparison.id)}
                        >
                          Mark Applied
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedComparison(comparison);
                          setShowDetails(true);
                        }}
                      >
                        View
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(comparison.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedComparison?.job.title} at {selectedComparison?.job.company}
            </DialogTitle>
          </DialogHeader>

          {selectedComparison && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Match Score</p>
                <p
                  className={`text-3xl font-bold ${selectedComparison.result.matchPercentage >= 80 ? "text-green-600" : selectedComparison.result.matchPercentage >= 60 ? "text-yellow-600" : "text-red-600"}`}
                >
                  {selectedComparison.result.matchPercentage}%
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Resume Used</p>
                <p className="font-medium">{selectedComparison.resume.filename}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Analysis Date</p>
                <p className="font-medium">
                  {new Date(selectedComparison.createdAt).toLocaleDateString()}
                </p>
              </div>

              {selectedComparison.appliedDate && (
                <div className="bg-green-50 border border-green-200 p-3 rounded">
                  <p className="text-sm text-green-800">
                    ✓ Applied on {new Date(selectedComparison.appliedDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              <Button onClick={() => setShowDetails(false)} className="w-full">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

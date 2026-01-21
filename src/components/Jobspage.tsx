"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { JobListings } from "./JobListings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Filter } from "lucide-react";

export default function FindJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [trackedJobIds, setTrackedJobIds] = useState<Set<string>>(new Set());

  // Fetch tracked jobs on mount
  React.useEffect(() => {
    const fetchTrackedJobs = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        const res = await fetch(`${API_URL}/saved-jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          // Assuming data.data is array of SavedJob { job: { id: ... }, status: ... }
          // Filter only those with 'tracked' status if needed, or all saved jobs?
          // The Card logic considers anything valid in SavedJobs as "Tracked" if we map it so.
          // But wait, the card toggle deletes it on untrack. So existence = tracked.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const ids = new Set(data.data.map((item: any) => item.job.id));
          setTrackedJobIds(ids as Set<string>);
        }
      } catch (error) {
        console.error("Failed to fetch tracked jobs", error);
      }
    };

    fetchTrackedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Search Header */}
      <div
        className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1472&q=80")',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover thousands of job opportunities from top companies worldwide
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-background border-border"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-10 h-12 bg-background border-border"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                  <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                    <SelectTrigger className="pl-10 h-12 bg-background border-border">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="pl-10 h-12 bg-background border-border">
                      <SelectValue placeholder="Experience Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  size="lg"
                  className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <JobListings
          searchQuery={searchQuery}
          locationFilter={locationFilter}
          jobTypeFilter={jobTypeFilter}
          levelFilter={levelFilter}
          trackedJobIds={trackedJobIds}
        />
      </div>

      <Footer />
    </div>
  );
}

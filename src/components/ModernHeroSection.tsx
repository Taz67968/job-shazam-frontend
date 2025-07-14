"use client";
import React from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Search, MapPin, Play, TrendingUp, ArrowRight} from "lucide-react";
import Image from "next/image";

interface ModernHeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  onGetStarted: () => void;
}

export const ModernHeroSection = ({
  searchQuery,
  setSearchQuery,
  locationFilter,
  setLocationFilter,
  onGetStarted,
}: ModernHeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-background via-card to-background text-foreground py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">Your Career Journey Starts Here</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins leading-tight">
                Unlock Your
                <span className="text-primary block">Dream Career</span>
                Today!
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Connect with top employers, discover opportunities that match your skills, and take
                the next step in your professional journey. Your perfect job is waiting.
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border backdrop-blur-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 bg-background border-border text-foreground text-lg"
                  />
                </div>

                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="City, state, or remote"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-12 h-14 bg-background border-border text-foreground text-lg"
                  />
                </div>

                <Button
                  onClick={onGetStarted}
                  className="bg-primary hover:bg-primary/90 h-14 px-10 text-primary-foreground font-semibold text-lg transition-all duration-300 hover:scale-105 group"
                >
                  Find Jobs
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:scale-105"
              >
                Get Started Now
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-fade-in hidden md:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
                alt="Professional team collaborating in modern office"
                width={800}
                height={500}
                className="w-full h-[500px] object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm animate-fade-in">
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Active Jobs</div>
            </div>

            <div className="absolute -top-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm animate-fade-in">
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mt-16 text-center animate-fade-in">
          <p className="text-muted-foreground mb-6">Trending job categories:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Remote Work",
              "Software Engineering",
              "Data Science",
              "UI/UX Design",
              "Project Management",
              "Marketing",
            ].map((tag) => (
              <span
                key={tag}
                className="bg-primary/20 text-primary px-6 py-3 rounded-full text-sm hover:bg-primary/30 cursor-pointer transition-all duration-300 border border-primary/30 hover:scale-105"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

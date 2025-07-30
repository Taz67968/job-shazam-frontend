"use client";

import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Search, Users, TrendingUp, Shield, Clock, Award} from "lucide-react";

interface Feature {
  icon: React.ComponentType<{className?: string}>;
  title: string;
  description: string;
  color: string;
}

export const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      icon: Search,
      title: "Tailored Job Recommendations Just for You",
      description:
        "Receive customized job suggestions based on your skills, experience, and career goals.",
      color: "text-primary",
    },
    {
      icon: Users,
      title: "Intuitive and User-Friendly Interface",
      description:
        "Navigate job listings with ease. Our platform is designed with simplicity in mind.",
      color: "text-blue-400",
    },
    {
      icon: TrendingUp,
      title: "Stay Informed with Real-Time Job Tracking and Notifications",
      description:
        "Never miss out on new job opportunities. Get instant alerts for jobs that match your criteria.",
      color: "text-green-400",
    },
    {
      icon: Shield,
      title: "Secure & Trusted Platform",
      description: "Your privacy and data security are our top priorities. Apply with confidence.",
      color: "text-purple-400",
    },
    {
      icon: Clock,
      title: "Save Time with Smart Filtering",
      description: "Advanced filters help you find exactly what you're looking for in seconds.",
      color: "text-orange-400",
    },
    {
      icon: Award,
      title: "Quality Opportunities",
      description: "We partner with top companies to bring you the best career opportunities.",
      color: "text-red-400",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Empowering Your Job
            <span className="text-primary block">Search Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover a smarter way to find your next opportunity. Our platform is designed to
            streamline the job search process by intelligently matching you with positions that
            align with your career aspirations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card border-border backdrop-blur-sm animate-fade-in"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import Navbar from "@/components/navbar";
import {Footer} from "@/components/Footer";
import {ApplicationBoard} from "@/components/ApplicationBoard";
import {useAuth} from "@/contexts/AuthContext";

const TrackApplications: React.FC = () => {
  const {user, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // changed from "/auth" to "/login"
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-poppins">
              Track Your Applications
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Organize and manage your job applications with our intuitive drag-and-drop board
            </p>
          </div>
        </div>
      </div>

      {/* Application Board */}
      <div className="container mx-auto px-4 py-8">
        <ApplicationBoard />
      </div>

      <Footer />
    </div>
  );
};

export default TrackApplications;

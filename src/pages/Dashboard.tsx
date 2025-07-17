import React, { useState } from 'react';
import '../app/globals.css';
// import { Header } from '@/components/Header';
// import { Footer } from '@/components/Footer';
import { ApplicationBoard } from '@/components/ApplicationBoard';
const TrackApplications = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      
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
      {/* <Footer /> */}
    </div>
  );
};
export default TrackApplications;
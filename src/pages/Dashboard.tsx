import React, { useState } from 'react';
import '../app/globals.css';
import Navbar  from '../components/navbar';
import Footer from '../components/Footer';
import { ApplicationBoard } from '../components/ApplicationBoard';
const TrackApplications = () => {
  return (
    <main className="min-h-screen bg-[#1f2936]">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-[#1f2936] via-background to-[#1f2936]/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-poppins text-white">
              Track Your Applications
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-white">
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
    </main>
  );
};
export default TrackApplications;
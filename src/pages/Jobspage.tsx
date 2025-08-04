import React from "react";
import JobList from "../components/JobList";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import '../app/jobs.css'

const Jobs: React.FC = () => {
  return (
    <main className="jobs-container">
      <Navbar />
      <div className="container mx-auto px-4 py-4">
        <h1 className="job-listing-title">Job Listings</h1>
        <JobList />
        <Footer />
      </div>
    </main>
  );
};

export default Jobs;
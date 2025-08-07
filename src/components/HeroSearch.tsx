'use client';

import React from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

interface HeroSearchProps {
  titleSearch: string;
  locationSearch: string;
  setTitleSearch: (value: string) => void;
  setLocationSearch: (value: string) => void;
  setCurrentPage: (page: number) => void;
}

const HeroSearch: React.FC<HeroSearchProps> = ({
  titleSearch,
  locationSearch,
  setTitleSearch,
  setLocationSearch,
  setCurrentPage,
}) => {
  return (
    <div
      className="bg-cover bg-center py-20 px-4 text-center mb-10 "
      style={{ backgroundImage: "url('/hero-bg.jpg')" }} // make sure this path is correct
    >
      {/* Foreground content directly over image */}
      <div className="z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Find Your Dream Job</h1>
        <p className="text-white text-lg mb-8">Discover thousands of job opportunities from top companies worldwide</p>

        <div className="bg-[#252836] text-white rounded-xl shadow-md p-4 flex flex-col md:flex-row justify-between items-center gap-4 max-w-4xl mx-auto">
          
          
          <div className="relative w-full md:w-1/3 bg-white">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={titleSearch}
              onChange={(e) => setTitleSearch(e.target.value)}
              placeholder="Job title, keywords, or company"
              className="w-full p-3 pl-10  rounded text-black focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          
          <div className="relative w-full md:w-1/3 bg-white">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              placeholder="Location"
              className="w-full p-3 pl-10  rounded text-black focus:outline-none focus:ring-2 focus:ring-green-400 "
            />
          </div>

          
          <button
            onClick={() => setCurrentPage(1)}
            className="w-full md:w-auto px-6 py-3 bg-green-500 text-black rounded hover:bg-green-600 transition"
          >
            🔍 Search Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;

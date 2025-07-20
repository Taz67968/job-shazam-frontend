"use client";

import React from "react";
import {FaSlidersH} from "react-icons/fa";

interface FilterBarProps {
  salaryFilter: string;
  timePostedFilter: string;
  setSalaryFilter: (value: string) => void;
  setTimePostedFilter: (value: string) => void;
  clearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  salaryFilter,
  timePostedFilter,
  setSalaryFilter,
  setTimePostedFilter,
  clearFilters,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md px-6 py-4 mb-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
          <FaSlidersH className="text-gray-600" />
          Filters
        </div>
        <button
          onClick={clearFilters}
          className="bg-[#252836] text-white px-4 py-2 rounded hover:opacity-90 text-sm"
        >
          Clear All
        </button>
      </div>

      {/* Filter Options */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Salary Filter */}
        <div>
          <label className="block mb-1 text-sm text-gray-600">Salary Range</label>
          <select
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(e.target.value)}
            className="w-full p-2 rounded bg-[#252836] text-white focus:outline-none"
          >
            <option value="">Any Salary</option>
            <option value="0-50000">Below $50,000</option>
            <option value="50000-100000">$50,000 - $100,000</option>
            <option value="100000-200000">$100,000 - $200,000</option>
            <option value="200000+">Above $200,000</option>
          </select>
        </div>

        {/* Time Posted Filter */}
        <div>
          <label className="block mb-1 text-sm text-gray-600">Date Posted</label>
          <select
            value={timePostedFilter}
            onChange={(e) => setTimePostedFilter(e.target.value)}
            className="w-full p-2 pr-10 rounded bg-[#252836] text-white focus:outline-none"
          >
            <option value="">Anytime</option>
            <option value="1">Last 24 hours</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

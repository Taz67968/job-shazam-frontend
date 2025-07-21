'use client';

import React from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#0f1d2e] text-white px-2">
      <div className="bg-[#14263e] rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-5xl h-[90vh] overflow-hidden">
        
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-green-500 mb-4">Create Your Account</h2>
          <p className="text-gray-300 mb-6 text-sm">Register to start finding your dream job.</p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full p-3 rounded-md bg-[#1f334d] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-md bg-[#1f334d] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-md font-semibold text-white transition text-sm"
            >
              Register
            </button>
          </form>

          {/* Back to Login Link */}
          <p className="mt-4 text-gray-400 text-sm flex justify-center">
            Already have an account:{'  '}
            <Link href="/loginPage" className="text-green-400 hover:underline">
              {" "}Login here
            </Link>
          </p>
        </div>

        {/* Right Section - Image with overlay and slogan */}
        <div className="relative hidden md:block md:w-1/2">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-10 rounded-tr-2xl rounded-br-2xl" />
          <img
            src="/loginImg.jpg"
            alt="Register Visual"
            className="w-full h-full object-cover rounded-tr-2xl rounded-br-2xl"
          />
          <div className="absolute z-20 bottom-6 left-6 right-6 text-white text-sm">
            <h3 className="text-lg font-semibold leading-tight">Build your future with us.</h3>
            <p className="mt-1 text-gray-300">Start applying and get noticed today.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

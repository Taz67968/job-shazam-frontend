"use client";

import React from "react";
import "../app/globals.css";
import Link from "next/link";
import "../app/globals.css";
import {ChevronsLeft} from "lucide-react";
import {useRouter} from "next/router";

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="h-screen flex items-center justify-center bg-[#0f1d2e] text-white px-2">
      <div className="bg-[#14263e] rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-5xl h-[90vh] overflow-hidden">
        {/* Left Section - Form */}
        <p className="flex" onClick={() => router.back()}>
          <ChevronsLeft className="mt-5 ml-5" />
          <span className="mt-5">Back</span>
        </p>
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-green-500 mb-4">Welcome Back!</h2>
          <p className="text-gray-300 mb-6 text-sm">Login to continue your job search journey.</p>

          <form className="space-y-4">
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
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-4 text-gray-400 text-sm flex justify-center">
            Don’t have an account:{" "}
            <Link href="/registerPage" className="text-green-400 hover:underline">
              Register here
            </Link>
          </p>
        </div>

        {/* Right Section - Image with overlay and slogan */}
        <div className="relative hidden md:block md:w-1/2">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-10 rounded-tr-2xl rounded-br-2xl" />
          <img
            src="/loginImg.jpg"
            alt="Login Visual"
            className="w-full h-full object-cover rounded-tr-2xl rounded-br-2xl"
          />
          <div className="absolute z-20 bottom-6 left-6 right-6 text-white text-sm">
            <h3 className="text-lg font-semibold leading-tight">
              Find the career that matches your passion.
            </h3>
            <p className="mt-1 text-gray-300">Join thousands of professionals growing with us.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

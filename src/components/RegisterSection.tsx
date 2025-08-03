"use client";
import {useRouter} from "next/router";
import React,{useState} from "react";
import Link from "next/link";
import "../app/globals.css";
import {ChevronsLeft} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
export default function RegisterPage() {
  const route = useRouter();
   const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8080/auth/login-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.success) {
      toast.success(`Welcome on board ${username}`)
      route.back();
    }
    setEmail('')
    setUsername('')
  };
  return (
    <div className="h-screen flex items-center justify-center bg-[#0f1d2e] text-white px-2">
      <div className="bg-[#14263e] rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-5xl h-[90vh] overflow-hidden">
        {/* Left Section - Form */}
        <p onClick={() => route.back()} className="flex w-max h-max rounded mt-5 ml-5">
          {" "}
          <ChevronsLeft className="w-6 h-6 " />
          <span>Back</span>
        </p>
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-green-500 mb-4">
            Create Your Account
          </h2>
          <p className="text-gray-300 mb-6 text-sm">Register to start finding your dream job.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full p-3 rounded-md bg-[#1f334d] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-md bg-[#1f334d] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-md font-semibold text-white transition text-sm"
            >
              Register
            </button>
          </form>
          {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
          {/* Back to Login Link */}
          <p className="mt-4 text-gray-400 text-sm flex justify-center">
            Already have an account:{"  "}
            <Link href="/loginPage" className="text-green-400 hover:underline">
              {" "}
              Login here
            </Link>
          </p>
        </div>

        {/* Right Section - Image with overlay and slogan */}
        <div className="relative hidden md:block md:w-1/2">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-10 rounded-tr-2xl rounded-br-2xl" />
          <Image
            src="/loginImg.jpg"
            alt="Register Visual"
            width={1000}
            height={100}
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

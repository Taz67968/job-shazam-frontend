'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Upload, CheckCircle, User, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RegisterSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  // const { register } = useAuth(); // If auth context has register

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate registration
    try {
      // Replace with actual API call
      // await register(formData);
      console.log('Registering', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      setStep(2); // Move to CV upload
    } catch {
      toast({ title: "Registration Failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleCVUpload = async () => {
    setLoading(true);
    try {
      if (!cvFile) {
        router.push('/login'); // Skip
        return;
      }
      // Upload CV logic here
      console.log('Uploading CV', cvFile);
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({ title: "Profile Completed", description: "Your CV has been uploaded." });
      router.push('/login');
    } catch {
      toast({ title: "Upload Failed", description: "Could not upload CV.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="glass-card w-full max-w-5xl h-[85vh] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl animate-fade-in">

        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className={`h-2 w-8 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`h-2 w-8 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {step === 1 ? 'Create Account' : 'Setup Profile'}
            </h2>
            <p className="text-muted-foreground mt-2">
              {step === 1 ? 'Join the future of job hunting.' : 'Upload your CV to personalize your feed.'}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="johndoe"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="••••••••"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/20 transition-all rounded-xl"
              >
                {loading ? 'Creating...' : 'Continue'} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          ) : (
            <div className="space-y-6 animate-fade-in-right">
              <div className="border-2 border-dashed border-white/20 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors bg-white/5 cursor-pointer relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
                  {cvFile ? <CheckCircle className="h-8 w-8" /> : <Upload className="h-8 w-8" />}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {cvFile ? cvFile.name : 'Click to Upload Resume'}
                </h3>
                <p className="text-sm text-gray-400 mt-2">PDF, DOCX up to 5MB</p>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => router.push('/jobs')}
                  variant="ghost"
                  className="flex-1 py-6 text-gray-400 hover:text-white"
                >
                  Skip for now
                </Button>
                <Button
                  onClick={handleCVUpload}
                  disabled={!cvFile || loading}
                  className="flex-1 py-6 text-lg font-semibold bg-primary hover:bg-primary/90"
                >
                  {loading ? 'Uploading...' : 'Complete Setup'}
                </Button>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section - Visual */}
        <div className="hidden md:block w-1/2 relative bg-primary/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-3xl" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Unlock Your Potential</h2>
              <p className="text-gray-200">AI-powered job matching and tailored CV generation to help you land your dream job.</p>

              {/* Floating cards animation mock */}
              <div className="mt-10 relative h-64 w-full">
                <div className="absolute top-0 left-1/4 w-48 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 animate-float" style={{ animationDelay: '0s' }}>
                  <div className="h-2 w-12 bg-white/20 rounded mb-2" />
                  <div className="h-2 w-24 bg-white/10 rounded" />
                </div>
                <div className="absolute top-12 right-1/4 w-48 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 animate-float" style={{ animationDelay: '1.5s', top: '30%' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-6 w-6 rounded-full bg-green-400/20" />
                    <div className="h-2 w-16 bg-white/20 rounded" />
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

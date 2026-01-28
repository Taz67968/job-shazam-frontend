import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function LoginSection() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState(1); // 1 = Email, 2 = OTP
  const { login, verifyOtp, loading } = useAuth();
  const { toast } = useToast();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === 2) {
      inputRefs.current[0]?.focus();
    }
  }, [step]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      console.log("[Login] Sending OTP for:", email);
      await login(email);
      console.log("[Login] Success! Transitioning to step 2");
      setStep(2);
      toast({
        title: "OTP Sent",
        description: "Check your email for the verification code.",
      });
    } catch (err) {
      console.error("[Login] Failed to send OTP:", err);
      toast({
        title: "Login Failed",
        description: "Could not send OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value)) && value !== '') return; // Allow empty string or numbers
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last character if multiple are typed
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.every(char => !isNaN(Number(char)))) {
      const newOtp = [...otp];
      pastedData.forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) return;

    try {
      await verifyOtp(email, otpString);
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    } catch {
      toast({
        title: "Verification Failed",
        description: "Invalid code. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] animate-pulse-glow delay-1000" />

      <div className="glass-card rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden animate-scale-in relative z-10">

        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-card/40 backdrop-blur-sm">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-secondary mb-2">
              {step === 1 ? "Welcome Back!" : "Verify OTP"}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              {step === 1 ? "Login to continue your job search journey." : `Enter the code sent to ${email}`}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/90 border-white/10 text-black placeholder:text-gray-500 focus:border-primary/50"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send Identification Code"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6 animate-fade-in-right">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Verification Code</label>
                <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      ref={(el: any) => (inputRefs.current[index] = el)}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      maxLength={1}
                      className="w-12 h-14 bg-white/90 border-white/10 text-black placeholder:text-gray-500 focus:border-primary/50 text-center text-2xl font-mono"
                      required
                    />
                  ))}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Login"
                )}
              </Button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-sm text-muted-foreground hover:text-white mt-2"
              >
                Change Email
              </button>
            </form>
          )}

          {/* Register Link */}
          <p className="mt-8 text-muted-foreground text-sm text-center">
            Don’t have an account?{' '}
            <Link href="/register" className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors">
              Register here
            </Link>
          </p>
        </div>

        {/* Right Section - Image with overlay and slogan */}
        <div className="relative hidden md:block md:w-1/2 bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
          <img
            src="/loginImg.jpg"
            alt="Login Visual"
            className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute z-20 bottom-12 left-8 right-8 text-white">
            <h3 className="text-2xl font-bold leading-tight mb-2 drop-shadow-lg">
              Find the career that matches your passion.
            </h3>
            <p className="text-gray-200 drop-shadow-md">
              Join thousands of professionals growing with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

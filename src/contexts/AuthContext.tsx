"use client";
import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem("authToken");
    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (token: string) => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    try {
      const response = await fetch(`${backendUrl}/auth/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        throw new Error("Invalid token");
      }
    } catch {
      localStorage.removeItem("authToken");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await fetch(`${backendUrl}/auth/login-otp`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email}),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    try {
      const response = await fetch(`${backendUrl}/auth/verify-otp`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, token: otp}),
      });

      if (response.ok) {
        const {accessToken, user} = await response.json();
        localStorage.setItem("authToken", accessToken);
        setUser(user);
        router.push("/jobs");
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{user, loading, login, verifyOtp, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

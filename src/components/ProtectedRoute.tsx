"use client";

import React, {useEffect} from "react";
import {useAuth} from "@/contexts/AuthContext";
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const {user, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <div>Loader2</div>;
  }

  return <>{children}</>;
};

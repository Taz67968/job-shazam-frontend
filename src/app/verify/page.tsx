"use client";

import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

function VerifyContent() {
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        // Small delay to ensure toast is seen or just immediate redirect
        const timer = setTimeout(() => {
            router.push("/login");
        }, 2000);

        toast({
            title: "Update Required",
            description: "We've switched to 6-digit codes. Please login again.",
        });

        return () => clearTimeout(timer);
    }, [router, toast]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1d2e] text-white">
            <Loader2 className="h-12 w-12 animate-spin text-green-500 mb-4" />
            <h2 className="text-2xl font-bold">Redirecting to Login...</h2>
            <p className="text-gray-400 mt-2">We've updated our security.</p>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0f1d2e]" />}>
            <VerifyContent />
        </Suspense>
    );
}

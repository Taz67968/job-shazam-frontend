"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RateLimitAlertProps {
  show: boolean;
  remainingSeconds: number;
  onRetryReady?: () => void;
}

export const RateLimitAlert = ({ show, remainingSeconds, onRetryReady }: RateLimitAlertProps) => {
  const [timeLeft, setTimeLeft] = useState(remainingSeconds);

  useEffect(() => {
    if (!show) return;

    setTimeLeft(remainingSeconds);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onRetryReady?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [show, remainingSeconds, onRetryReady]);

  if (!show) return null;

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-orange-900">Rate Limit Exceeded</p>
            <p className="text-sm text-orange-800 mt-1">
              You&apos;ve reached the maximum number of comparisons per minute. Please wait before trying
              again.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-900">
                Try again in {timeLeft} second{timeLeft !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

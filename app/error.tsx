"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    console.error("Application error caught:", error);
  }, [error]);

  const handleRetry = () => {
    setIsRetrying(true);
    reset();
    setTimeout(() => setIsRetrying(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-[#D4AF37]/30">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/30 shadow-2xl text-center space-y-6 animate-slide-up">
        {/* Animated Badge Icon */}
        <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-[#8C4A52] mx-auto shadow-sm">
          <AlertTriangle className="w-10 h-10 text-[#8C4A52] animate-bounce" />
        </div>

        <div>
          <span className="text-[11px] font-bold text-[#8C4A52] uppercase tracking-widest px-3 py-1 bg-[#F9F0EC] rounded-full border border-[#D4AF37]/30">
            500 • Server &amp; System Notice
          </span>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#2C2623] mt-3"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Something Went Wrong
          </h1>
          <p className="text-sm text-[#7C7267] font-serif italic mt-2 leading-relaxed">
            We encountered a temporary server or connection issue. Your data is safe. Please try refreshing or return to the main hall.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="flex-1 py-3.5 px-5 rounded-full bg-[#8C4A52] text-white font-bold text-xs sm:text-sm shadow-md hover:bg-[#7a3e45] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`} />
            <span>{isRetrying ? "Retrying..." : "Try Again"}</span>
          </button>

          <Link
            href="/"
            className="flex-1 py-3.5 px-5 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#2C2623] font-bold text-xs sm:text-sm hover:bg-[#F9F0EC] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-[#8C4A52]" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

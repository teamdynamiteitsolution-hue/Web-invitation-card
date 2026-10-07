"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalRootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    console.error("Global Root Error:", error);
  }, [error]);

  const handleRetry = () => {
    setIsRetrying(true);
    reset();
    setTimeout(() => setIsRetrying(false), 2000);
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF8F5] text-[#2C2623] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#D4AF37]/30 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-[#8C4A52] mx-auto shadow-sm">
            <AlertTriangle className="w-10 h-10 text-[#8C4A52]" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#2C2623]" style={{ fontFamily: "Cinzel, serif" }}>
              Unexpected System Error
            </h1>
            <p className="text-sm text-[#7C7267] font-serif italic mt-2">
              A temporary error occurred while processing your request. Please click below to reload.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleRetry}
              disabled={isRetrying}
              className="flex-1 py-3.5 rounded-full bg-[#8C4A52] text-white font-bold text-sm shadow-md hover:bg-[#7a3e45] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`} />
              <span>{isRetrying ? "Retrying..." : "Reload Page"}</span>
            </button>
            <a
              href="/"
              className="flex-1 py-3.5 rounded-full bg-stone-100 text-[#2C2623] font-bold text-sm hover:bg-stone-200 transition-all flex items-center justify-center"
            >
              Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

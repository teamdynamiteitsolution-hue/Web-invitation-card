"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, KeyRound, Loader2, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        if (data.tempPassword) {
          setTempPassword(data.tempPassword);
        }
      } else {
        setError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      <main className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#D4AF37]/30 shadow-soft-surface p-8 relative overflow-hidden">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#F9F0EC] text-[#8C4A52] flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-[#2C2623] mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Reset Password</h1>
            <p className="text-[#7C7267] font-serif italic text-sm">Enter your email to receive a temporary password.</p>
          </div>

          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold text-center border border-red-100">{error}</div>}

          {success ? (
            <div className="text-center space-y-6">
              <div className="p-6 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-left space-y-2">
                <p className="font-bold text-base flex items-center gap-2">
                  <span>✉️</span> Check Your Email Inbox
                </p>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  If an account exists with <strong>{email}</strong>, a temporary password has been dispatched to your email address.
                </p>
                <p className="text-[11px] text-emerald-600 italic">
                  Please check your inbox (and spam/junk folder). Use the temporary password to log in and update your security settings.
                </p>
              </div>
              <Link href="/login" className="w-full py-3 rounded-xl bg-[#2C2623] text-white font-bold block shadow-elevated-card hover:bg-[#1a1614] transition-all">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1 relative">
                <label className="text-xs font-bold text-[#2C2623] uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-[#FAF8F5] rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all text-[#2C2623]"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#8C4A52] text-white font-bold flex justify-center items-center shadow-elevated-card hover:bg-[#7a3e45] transition-all disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}
              </button>
            </form>
          )}

          {!success && (
            <div className="mt-8 text-center">
              <Link href="/login" className="text-sm text-[#7C7267] hover:text-[#8C4A52] font-bold flex items-center justify-center gap-2 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

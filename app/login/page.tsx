"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.user.role === "ADMIN") {
          router.push("/admin");
        } else {
          const redirect = searchParams.get("redirect");
          if (redirect) {
            router.push(redirect);
          } else {
            router.push("/");
          }
          router.refresh();
        }
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 shadow-floating-ceremony border border-[#D4AF37]/20">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-[#8C4A52] inline-block mb-2" style={{ fontFamily: 'Noto Serif Bengali, serif' }}>
            উৎসব
          </Link>
          <h1 className="text-2xl font-bold text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>Welcome Back</h1>
          <p className="text-[#7C7267] font-serif italic text-sm mt-2">Enter your credentials to continue</p>
        </div>

        {error && <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm text-center border border-red-100">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-[#2C2623] mb-2">Username or Email</label>
            <input 
              type="text" 
              required 
              className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all bg-gray-50"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#2C2623] mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all bg-gray-50 pr-12"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <Link href="/forgot-password" className="text-xs font-bold text-[#D4AF37] hover:text-[#c09d2f] transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded-full bg-[#8C4A52] text-white font-bold shadow-elevated-card hover:bg-[#7a3e45] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-[#7C7267]">
          Don't have an account? <Link href="/register" className="font-bold text-[#D4AF37] hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]"><Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" /></div>}>
      <LoginForm />
    </Suspense>
  );
}

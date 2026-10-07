"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Plus, Edit3, Eye, Trash2, Clock, CreditCard, User, LogOut, Copy, CheckCircle2, MessageSquare, Zap, ArrowLeft, Menu, X, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/Skeleton";
import DynamicCardExperience from "@/experiences/dynamic-card";
import EnvelopeRoyal from "@/experiences/envelope-royal";
import TheatricalCurtain from "@/experiences/theatrical-curtain";
import MultiScratch from "@/experiences/multi-scratch";
import ScrollExperience from "@/experiences/scroll-experience/ScrollExperience";
import { resolveCanonicalInvitation } from "@/lib/canonical-invitation";

type Tab = "profile" | "cards" | "payments" | "messages" | "settings";

export default function UserDashboard() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [previewingCardId, setPreviewingCardId] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [navigatingId, setNavigatingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const res = await fetch("/api/user/invitations");
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const result = await res.json();
        setInvitations(result.data.invitations || []);
        setPayments(result.data.payments || []);
        setMessages(result.data.messages || []);
        setSubscription(result.data.subscription || null);
        setUser(result.data.user);
      } catch (err) {
        console.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchInvitations();
  }, [router]);

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      if (res.ok) {
        alert("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update password");
      }
    } catch (err) {
      alert("An error occurred");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setPasswordLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      if (res.ok) {
        alert("A temporary password has been sent to your email.");
      } else {
        alert("Failed to send temporary password.");
      }
    } catch (err) {
      alert("An error occurred.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleCopyUrl = (slug: string, id: string) => {
    const url = `${window.location.origin}/invite/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const totalBilled = payments.reduce((sum, p) => sum + (p.amount || 0), 0) || invitations.reduce((sum, inv) => {
    if (inv.status === 'ACTIVE') {
      return sum + (inv.template?.price || 0) + (inv.animation?.price || 0) + (inv.durationTier?.price || 0);
    }
    return sum;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] p-6 sm:p-8 md:p-16">
        <Skeleton className="h-8 w-32 rounded-full mb-8" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 border-b border-[#D4AF37]/20 pb-8">
          <div className="flex items-center gap-6">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-52 rounded-xl" />
              <Skeleton className="h-4 w-36 rounded-md" />
            </div>
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-12 w-36 rounded-full" />
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block lg:w-64 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-2xl" />
            ))}
          </div>
          <div className="flex-1 space-y-6">
            <Skeleton className="h-48 w-full rounded-3xl" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Skeleton className="h-32 rounded-2xl" />
              <Skeleton className="h-32 rounded-2xl" />
              <Skeleton className="h-32 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans p-4 sm:p-8 md:p-16"
      onTouchStart={(e) => {
        // Track touch start to detect edge swipe right to open sidebar on mobile
        if (e.touches[0].clientX < 40) {
          setTouchStartX(e.touches[0].clientX);
        } else {
          setTouchStartX(null);
        }
      }}
      onTouchEnd={(e) => {
        if (touchStartX !== null) {
          const deltaX = e.changedTouches[0].clientX - touchStartX;
          if (deltaX > 60) {
            setIsMobileSidebarOpen(true);
          }
          setTouchStartX(null);
        }
      }}
    >
      {/* Top Back Navigation Link */}
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D4AF37]/30 text-[#7C7267] font-bold text-xs hover:text-[#8C4A52] hover:border-[#8C4A52] hover:bg-[#F9F0EC] transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#8C4A52]" />
          <span>Back to Home</span>
        </Link>
      </div>

      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 sm:mb-12 gap-6 border-b border-[#D4AF37]/20 pb-8">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E8D8D0] border-2 border-[#D4AF37] flex items-center justify-center text-[#8C4A52] shadow-inner-emboss shrink-0">
            <User className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 capitalize" style={{ fontFamily: 'Cinzel, serif' }}>Welcome, {user?.username}</h1>
            <p className="text-[#7C7267] font-serif italic text-xs sm:text-sm">{user?.email}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto justify-end">
          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-2.5 sm:p-3 rounded-full bg-white text-[#7C7267] border border-[#D4AF37]/30 hover:text-[#8C4A52] hover:border-[#8C4A52] transition-colors shadow-sm"
            aria-label="Open Sidebar Menu"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <Link href="/create" className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#8C4A52] text-white font-bold text-sm shadow-elevated-card hover:bg-[#7a3e45] transition-all flex items-center gap-2">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Create New</span>
            <span className="sm:hidden">Create</span>
          </Link>
          <button onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/";
          }} className="p-2.5 sm:p-3 rounded-full bg-white text-[#7C7267] border border-gray-200 hover:text-red-500 hover:border-red-200 transition-colors" aria-label="Log Out">
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Slide-out Drawer & Backdrop */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)} 
          />

          {/* Drawer content */}
          <div 
            className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col justify-between p-5 z-10 animate-in slide-in-from-left duration-300"
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX !== null) {
                const deltaX = touchStartX - e.changedTouches[0].clientX;
                if (deltaX > 50) {
                  // Swiped left to close
                  setIsMobileSidebarOpen(false);
                }
                setTouchStartX(null);
              }
            }}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20 mb-4">
                <span className="font-bold text-[#2C2623] text-base" style={{ fontFamily: 'Cinzel, serif' }}>
                  Dashboard Menu
                </span>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-gray-600 hover:bg-stone-200 transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                <button 
                  onClick={() => { setActiveTab("profile"); setIsMobileSidebarOpen(false); }} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "profile" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}
                >
                  <User className="w-5 h-5" /> Profile
                </button>
                <button 
                  onClick={() => { setActiveTab("cards"); setIsMobileSidebarOpen(false); }} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "cards" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}
                >
                  <Edit3 className="w-5 h-5" /> Saved Cards ({invitations.length})
                </button>

                <button 
                  onClick={() => { setActiveTab("messages"); setIsMobileSidebarOpen(false); }} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "messages" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}
                >
                  <MessageSquare className="w-5 h-5" /> Messages ({messages.length})
                </button>
                <button 
                  onClick={() => { setActiveTab("payments"); setIsMobileSidebarOpen(false); }} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "payments" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}
                >
                  <CreditCard className="w-5 h-5" /> Invoices
                </button>
                <button 
                  onClick={() => { setActiveTab("settings"); setIsMobileSidebarOpen(false); }} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "settings" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}
                >
                  <Clock className="w-5 h-5" /> Settings
                </button>
              </nav>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/20">
              <button 
                onClick={async () => {
                  await fetch("/api/auth/logout", { method: "POST" });
                  window.location.href = "/";
                }} 
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        
        {/* Desktop Sidebar (Only visible on lg screens) */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <nav className="flex flex-col gap-2 bg-white p-4 rounded-[24px] border border-[#D4AF37]/20 shadow-soft-surface">
            <button onClick={() => setActiveTab("profile")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "profile" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
              <User className="w-5 h-5" /> Profile
            </button>
            <button onClick={() => setActiveTab("cards")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "cards" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
              <Edit3 className="w-5 h-5" /> Saved Cards ({invitations.length})
            </button>

            <button onClick={() => setActiveTab("messages")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "messages" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
              <MessageSquare className="w-5 h-5" /> Messages ({messages.length})
            </button>
            <button onClick={() => setActiveTab("payments")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "payments" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
              <CreditCard className="w-5 h-5" /> Invoices
            </button>
            <button onClick={() => setActiveTab("settings")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "settings" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
              <Clock className="w-5 h-5" /> Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              <div className="bg-white rounded-[24px] border border-[#D4AF37]/20 p-8 shadow-soft-surface">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>Account Profile</h2>
                  <Link 
                    href="/" 
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-[#8C4A52] hover:text-white text-[#2C2623] font-bold text-xs transition-colors border border-gray-200"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Home</span>
                  </Link>
                </div>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-bold text-[#7C7267] mb-1">Username</label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 font-bold">{user?.username}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#7C7267] mb-1">Email</label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 font-bold">{user?.email}</div>
                  </div>
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab("cards")}
                  className="bg-white p-6 rounded-2xl border border-[#D4AF37]/30 shadow-soft-surface hover:border-[#8C4A52] hover:shadow-md transition-all text-left group flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#8C4A52]/10 text-[#8C4A52] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2C2623] mb-1">My Saved Cards</h3>
                    <p className="text-xs text-[#7C7267]">View, preview, or edit your cards ({invitations.length})</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("payments")}
                  className="bg-white p-6 rounded-2xl border border-[#D4AF37]/30 shadow-soft-surface hover:border-[#8C4A52] hover:shadow-md transition-all text-left group flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2C2623] mb-1">Invoices &amp; Orders</h3>
                    <p className="text-xs text-[#7C7267]">Transaction history &amp; billing records</p>
                  </div>
                </button>

                <Link
                  href="/create"
                  className="bg-[#2C2623] text-white p-6 rounded-2xl border border-[#D4AF37]/40 shadow-soft-surface hover:bg-[#1a1614] hover:shadow-md transition-all text-left group flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#D4AF37] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Create New Card</h3>
                    <p className="text-xs text-gray-300">Design a new wedding or birthday card</p>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-[24px] border border-[#D4AF37]/20 p-8 shadow-soft-surface">
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Security Settings</h2>
              <div className="space-y-4 max-w-md">
                <h3 className="font-bold text-lg text-[#8C4A52]">Change Password</h3>
                <div>
                  <label className="block text-sm font-bold text-[#7C7267] mb-1">Current Password</label>
                  <input 
                    type="password" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#D4AF37]/40 focus:outline-none focus:ring-2 focus:ring-[#8C4A52]"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#7C7267] mb-1">New Password</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#D4AF37]/40 focus:outline-none focus:ring-2 focus:ring-[#8C4A52]"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#7C7267] mb-1">Confirm Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#D4AF37]/40 focus:outline-none focus:ring-2 focus:ring-[#8C4A52]"
                    placeholder="Confirm new password"
                  />
                </div>
                <button 
                  onClick={handlePasswordChange}
                  disabled={passwordLoading}
                  className="px-6 py-3 rounded-xl bg-[#2C2623] text-white font-bold hover:bg-[#1a1614] transition-colors disabled:opacity-50"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
                <div className="pt-4 border-t border-gray-100 mt-4">
                  <button 
                    onClick={handleForgotPassword}
                    disabled={passwordLoading}
                    className="text-sm font-bold text-[#8C4A52] hover:underline disabled:opacity-50"
                  >
                    Forgot Password? Send a temporary password to my email
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div className="bg-white rounded-[24px] border border-[#D4AF37]/20 p-8 shadow-soft-surface">
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Invoices & Transactions</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-[#7C7267] font-serif">Total Paid</span>
                  <span className="font-bold text-2xl text-[#8C4A52]" style={{ fontFamily: 'Cinzel, serif' }}>৳{totalBilled}</span>
                </div>

                {payments.length === 0 ? (
                  <div className="py-8 text-center text-[#7C7267] italic font-serif">
                    No payment invoices available yet.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {payments.map(p => {
                      let parsedTitle = p.invitation?.title;
                      try {
                        if (!parsedTitle && p.itemBreakdown) {
                          const parsed = JSON.parse(p.itemBreakdown);
                          parsedTitle = parsed.cardTitle || parsed.template?.name;
                        }
                      } catch (e) {}

                      const cardName = parsedTitle || "Custom Invitation Card";
                      const isCardExpired = p.invitation?.status === 'EXPIRED' || (p.invitation?.expiresAt && new Date(p.invitation.expiresAt) < new Date());

                      return (
                        <div key={p.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-[#2C2623] text-sm">{p.orderNumber}</span>
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                {p.status}
                              </span>
                              {isCardExpired ? (
                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                                  Card Expired
                                </span>
                              ) : (
                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                                  Card Active
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#2C2623] mt-1.5 font-serif font-bold">
                              Card: <span className="text-[#8C4A52] font-semibold">{cardName}</span>
                            </p>
                            <p className="text-[11px] text-[#7C7267] font-serif italic">
                              Gateway: <span className="uppercase font-semibold">{p.gateway}</span> • Date: {new Date(p.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right sm:text-right flex sm:flex-col items-center sm:items-end justify-between">
                            <span className="font-bold text-lg text-[#8C4A52]" style={{ fontFamily: 'Cinzel, serif' }}>
                              ৳{p.amount}
                            </span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider">{p.currency}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}



          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="bg-white rounded-[24px] border border-[#D4AF37]/20 p-8 shadow-soft-surface">
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Support Messages</h2>
              <div className="space-y-6">
                {messages.length === 0 ? (
                  <div className="py-12 text-center text-[#7C7267] italic font-serif border border-dashed border-[#D4AF37]/30 rounded-2xl bg-[#FAF8F5]">
                    You haven't contacted support yet.
                  </div>
                ) : (
                  messages.map(msg => (
                    <div key={msg.id} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-bold text-[#8C4A52] bg-white px-3 py-1 rounded-full text-xs shadow-sm border border-gray-100">
                          {msg.status}
                        </span>
                        <span className="text-xs font-bold text-gray-400">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[#2C2623] font-serif italic mb-4">"{msg.message}"</p>
                      {msg.adminReply && (
                        <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/30 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]"></div>
                          <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Admin Reply</div>
                          <p className="text-[#2C2623] font-bold">{msg.adminReply}</p>
                          {msg.repliedAt && (
                            <div className="text-xs text-gray-400 mt-2">{new Date(msg.repliedAt).toLocaleDateString()}</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Cards Tab */}
          {activeTab === "cards" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>My Invitations</h2>
              </div>

              {invitations.length === 0 ? (
                <div className="w-full bg-white rounded-3xl border border-[#D4AF37]/20 shadow-soft-surface p-16 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-[#F9F0EC] text-[#D4AF37] flex items-center justify-center mb-6 shadow-inner-emboss">
                    <Clock className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>No Invitations Yet</h3>
                  <p className="text-[#7C7267] font-serif italic max-w-md mb-8">You haven't created any digital invitations. Start by exploring our premium collections and building your first experience.</p>
                  <Link href="/templates" className="px-8 py-3 rounded-full bg-[#2C2623] text-white font-bold shadow-elevated-card hover:bg-[#1a1614] transition-all">
                    Explore Templates
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {invitations.map(inv => {
                    // Try to calculate days left from eventData date if available, or expiresAt
                    let daysLeftStr = "";
                    try {
                      if (inv.eventData) {
                        const eventData = JSON.parse(inv.eventData);
                        if (eventData.date) {
                          const eventDate = new Date(eventData.date);
                          const today = new Date();
                          const diffTime = Math.abs(eventDate.getTime() - today.getTime());
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                          if (eventDate >= today) {
                            daysLeftStr = `${diffDays} days left`;
                          } else {
                            daysLeftStr = "Event ended";
                          }
                        }
                      }
                    } catch (e) {}

                    const canonical = resolveCanonicalInvitation(inv);
                    const { template: canonicalTemplate, animation: canonicalAnimation, eventData: canonicalEventData, experienceType } = canonical;
                    
                    let PreviewComponent: any = DynamicCardExperience;
                    const isScroll = inv.animation?.id?.includes('scroll') || inv.animation?.categoryId === 'scrolling';
                    
                    if (isScroll || experienceType === 'scroll' || experienceType === 'scroll_story') PreviewComponent = ScrollExperience;
                    else if (experienceType === 'curtain') PreviewComponent = TheatricalCurtain;
                    else if (experienceType === 'envelope') PreviewComponent = EnvelopeRoyal;
                    else if (experienceType === 'scratch') PreviewComponent = MultiScratch;

                    return (
                      <div key={inv.id} className="bg-white rounded-[24px] border border-[#D4AF37]/20 overflow-hidden shadow-soft-surface flex flex-col group max-w-sm mx-auto w-full">
                        
                        {/* Timeline */}
                        {daysLeftStr && (
                          <div className="bg-[#FAF8F5] py-2 px-4 text-center border-b border-[#D4AF37]/20">
                            <span className="text-xs font-bold text-[#8C4A52] tracking-wider uppercase">{daysLeftStr}</span>
                          </div>
                        )}

                        <div className="relative w-full aspect-[4/5] bg-[#E8D8D0] overflow-hidden">
                          {previewingCardId === inv.id ? (
                            <div className="absolute inset-0 z-10 bg-[#181312]">
                              <iframe src={`/invite/${inv.slug}?preview=true`} className="w-full h-full border-0 pointer-events-auto" />
                              <button 
                                onClick={() => setPreviewingCardId(null)}
                                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/90 rounded-full text-white backdrop-blur-md transition-colors z-50 shadow-xl border border-white/10"
                                aria-label="Close Preview"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="w-full h-full pointer-events-none group-hover:scale-105 transition-transform duration-700 bg-[#FAF8F5] flex items-center justify-center">
                                <div className="w-full h-full relative pointer-events-none overflow-hidden">
                                  <PreviewComponent 
                                    template={canonicalTemplate}
                                    animation={canonicalAnimation}
                                    eventData={canonicalEventData}
                                    revealMode="auto"
                                    customImage={inv.customImage || canonicalEventData?.couplePhoto}
                                    bgBlur={inv.bgBlur}
                                    skipAnimation={true}
                                  />
                                </div>
                              </div>
                              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider text-[#8C4A52]">
                                {inv.status === 'ACTIVE' ? 'Paid / Active' : 'Saved'}
                              </div>
                            </>
                          )}
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Cinzel, serif' }}>{inv.title}</h3>
                          <p className="text-sm font-serif italic text-[#7C7267] mb-6">{inv.template.name}</p>
                          
                          <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-3">
                            {inv.status === 'ACTIVE' ? (
                              <button onClick={() => handleCopyUrl(inv.slug, inv.id)} className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D4AF37] text-[#2C2623] rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#f1e6da] transition-colors">
                                {copiedId === inv.id ? (
                                  <><CheckCircle2 className="w-4 h-4 text-green-600" /> <span className="text-green-600">Copied URL!</span></>
                                ) : (
                                  <><Copy className="w-4 h-4 text-[#D4AF37]" /> Copy URL</>
                                )}
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setNavigatingId(`pay-${inv.id}`);
                                  router.push(`/checkout/${inv.slug}`);
                                }}
                                disabled={navigatingId === `pay-${inv.id}`}
                                className="w-full px-4 py-3 bg-[#8C4A52] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#7a3e45] transition-colors shadow-elevated-card disabled:opacity-50"
                              >
                                {navigatingId === `pay-${inv.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                                <span>{navigatingId === `pay-${inv.id}` ? "Opening Checkout..." : "Pay Now"}</span>
                              </button>
                            )}
                            
                            <div className="flex items-center justify-between gap-2">
                              <button
                                onClick={() => {
                                  setNavigatingId(`edit-${inv.id}`);
                                  router.push(`/edit/${inv.id}`);
                                }}
                                disabled={navigatingId === `edit-${inv.id}`}
                                className="flex-1 px-4 py-2 bg-[#F9F0EC] text-[#8C4A52] rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#eed9d5] transition-colors disabled:opacity-50"
                              >
                                {navigatingId === `edit-${inv.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit3 className="w-4 h-4" />}
                                <span>{inv.status === 'ACTIVE' ? 'Edit (Restricted)' : 'Edit'}</span>
                              </button>
                              <button onClick={() => setPreviewingCardId(inv.id)} className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Preview inline">
                                <Eye className="w-5 h-5" />
                              </button>
                              <button 
                                disabled={deletingId === inv.id}
                                onClick={async () => {
                                  const msg = inv.status === 'ACTIVE' 
                                    ? "You have already paid for this invitation. Are you absolutely sure you want to delete it?"
                                    : "Are you sure you want to delete this invitation?";
                                  if (confirm(msg)) {
                                    setDeletingId(inv.id);
                                    try {
                                      const res = await fetch(`/api/user/invitations/${inv.id}`, { method: 'DELETE' });
                                      if (res.ok) {
                                        setInvitations(prev => prev.filter(i => i.id !== inv.id));
                                      } else {
                                        alert("Failed to delete invitation");
                                      }
                                    } catch (e) {
                                      alert("Error deleting invitation");
                                    } finally {
                                      setDeletingId(null);
                                    }
                                  }
                                }}
                                className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                                aria-label="Delete card"
                              >
                                {deletingId === inv.id ? <Loader2 className="w-5 h-5 animate-spin text-red-600" /> : <Trash2 className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

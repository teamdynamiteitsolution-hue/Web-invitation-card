"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Plus, Edit3, Eye, Trash2, Clock, CreditCard, User, LogOut, Copy, CheckCircle2, MessageSquare, Zap, ArrowLeft } from "lucide-react";

type Tab = "profile" | "cards" | "payments" | "messages" | "subscription" | "settings";

export default function UserDashboard() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
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
        console.error("Failed to load dashboard data");
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
    return <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]"><Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" /></div>;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans p-8 md:p-16">
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

      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 border-b border-[#D4AF37]/20 pb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#E8D8D0] border-2 border-[#D4AF37] flex items-center justify-center text-[#8C4A52] shadow-inner-emboss">
            <User className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1 capitalize" style={{ fontFamily: 'Cinzel, serif' }}>Welcome, {user?.username}</h1>
            <p className="text-[#7C7267] font-serif italic text-sm">{user?.email}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/create" className="px-6 py-3 rounded-full bg-[#8C4A52] text-white font-bold shadow-elevated-card hover:bg-[#7a3e45] transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Create New</span>
          </Link>
          <button onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/";
          }} className="p-3 rounded-full bg-white text-[#7C7267] border border-gray-200 hover:text-red-500 hover:border-red-200 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="flex flex-col gap-2 bg-white p-4 rounded-[24px] border border-[#D4AF37]/20 shadow-soft-surface">
            <button onClick={() => setActiveTab("profile")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "profile" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
              <User className="w-5 h-5" /> Profile
            </button>
            <button onClick={() => setActiveTab("cards")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "cards" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
              <Edit3 className="w-5 h-5" /> Saved Cards
            </button>
            <button onClick={() => setActiveTab("subscription")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "subscription" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
              <Zap className="w-5 h-5" /> Subscription
            </button>
            <button onClick={() => setActiveTab("messages")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "messages" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
              <MessageSquare className="w-5 h-5" /> Messages
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
        <main className="flex-1">
          
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

          {/* Subscription Tab */}
          {activeTab === "subscription" && (
            <div className="bg-white rounded-[24px] border border-[#D4AF37]/20 p-8 shadow-soft-surface">
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Subscription Plan</h2>
              {subscription ? (
                <div className="bg-gradient-to-br from-[#FAF8F5] to-white p-6 rounded-2xl border border-[#D4AF37]/30 shadow-sm max-w-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#8C4A52] text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                    {subscription.status}
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-[#D4AF37]/20 flex items-center justify-center text-[#8C4A52]">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{subscription.planName}</h3>
                      <div className="text-sm font-bold text-[#7C7267]">Active Plan</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#D4AF37]/20">
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase">Started</div>
                      <div className="font-bold">{new Date(subscription.startDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase">Ends</div>
                      <div className="font-bold">{new Date(subscription.endDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                  {subscription.cardLimit && (
                    <div className="mt-4">
                      <div className="text-xs font-bold text-gray-500 uppercase">Card Limit</div>
                      <div className="font-bold">{subscription.cardLimit} Cards</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center border border-dashed border-[#D4AF37]/30 rounded-2xl bg-[#FAF8F5]">
                  <div className="w-16 h-16 rounded-full bg-white mx-auto flex items-center justify-center text-[#D4AF37] mb-4 shadow-sm">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No Active Subscription</h3>
                  <p className="text-gray-500 font-serif italic mb-6">You are currently on the default pay-per-card plan.</p>
                  <Link href="/contact" className="px-6 py-3 rounded-xl bg-[#2C2623] text-white font-bold hover:bg-[#1a1614] transition-colors">
                    Contact for Enterprise Plan
                  </Link>
                </div>
              )}
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

                    return (
                      <div key={inv.id} className="bg-white rounded-[24px] border border-[#D4AF37]/20 overflow-hidden shadow-soft-surface flex flex-col group max-w-sm mx-auto w-full">
                        
                        {/* Timeline */}
                        {daysLeftStr && (
                          <div className="bg-[#FAF8F5] py-2 px-4 text-center border-b border-[#D4AF37]/20">
                            <span className="text-xs font-bold text-[#8C4A52] tracking-wider uppercase">{daysLeftStr}</span>
                          </div>
                        )}

                        <div className="relative w-full aspect-[4/5] bg-[#E8D8D0] overflow-hidden">
                          <img src={inv.template.previewImageUrl} alt={inv.title} className="w-full h-full object-contain mix-blend-multiply p-4 group-hover:scale-105 transition-transform duration-700" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InRyYW5zcGFyZW50IiAvPjwvc3ZnPg==';
                            }}
                          />
                          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider text-[#8C4A52]">
                            {inv.status === 'ACTIVE' ? 'Paid / Active' : 'Saved'}
                          </div>
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
                              <Link href={`/checkout/${inv.slug}`} className="w-full px-4 py-3 bg-[#8C4A52] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#7a3e45] transition-colors shadow-elevated-card">
                                <CreditCard className="w-4 h-4" /> Pay Now
                              </Link>
                            )}
                            
                            <div className="flex items-center justify-between gap-2">
                              <Link href={`/edit/${inv.id}`} className="flex-1 px-4 py-2 bg-[#F9F0EC] text-[#8C4A52] rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#eed9d5] transition-colors">
                                <Edit3 className="w-4 h-4" /> {inv.status === 'ACTIVE' ? 'Edit (Restricted)' : 'Edit'}
                              </Link>
                              <Link href={`/invite/${inv.slug}`} target="_blank" className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
                                <Eye className="w-5 h-5" />
                              </Link>
                              <button 
                                onClick={async () => {
                                  const msg = inv.status === 'ACTIVE' 
                                    ? "You have already paid for this invitation. Are you absolutely sure you want to delete it?"
                                    : "Are you sure you want to delete this invitation?";
                                  if (confirm(msg)) {
                                    const res = await fetch(`/api/user/invitations/${inv.id}`, { method: 'DELETE' });
                                    if (res.ok) {
                                      setInvitations(prev => prev.filter(i => i.id !== inv.id));
                                    } else {
                                      alert("Failed to delete invitation");
                                    }
                                  }
                                }}
                                className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
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

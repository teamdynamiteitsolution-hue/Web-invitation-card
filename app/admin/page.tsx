"use client";

import React, { useEffect, useState } from "react";
import { Shield, Users, Tag, Loader2, Save, LayoutTemplate, PlayCircle, Clock, Edit3, CheckCircle2, LogOut, MessageSquare, ChevronDown, ChevronUp, Plus, Trash2, X, Music, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";

type Tab = "cards" | "animations" | "durations" | "users" | "messages";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [activeTab, setActiveTab] = useState<Tab>("cards");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string; type: string } | null>(null);

  // Add / Edit Card Modal State
  const [cardModal, setCardModal] = useState<{
    isOpen: boolean;
    isEditing: boolean;
    id?: string;
    name: string;
    categoryId: string;
    price: string;
    previewImageUrl: string;
    experienceType: string;
    music?: {
      url: string;
      name?: string;
      loop?: boolean;
      volume?: number;
      enabled?: boolean;
    } | null;
  } | null>(null);

  // Add / Edit Animation Modal State
  const [animationModal, setAnimationModal] = useState<{
    isOpen: boolean;
    isEditing: boolean;
    id?: string;
    name: string;
    price: string;
    previewPosterUrl: string;
    videoUrl: string;
  } | null>(null);

  const [uploadingFile, setUploadingFile] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      if (!res.ok) {
        throw new Error("Unauthorized or failed to fetch");
      }
      const result = await res.json();
      setData(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = async () => {
    if (!deleteModal) return;
    try {
      const endpoint = deleteModal.type === 'template' ? '/api/admin/delete-template' : '/api/admin/delete-animation';
      const res = await fetch(`${endpoint}?id=${deleteModal.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setDeleteModal(null);
        fetchData();
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      alert("Error deleting");
    }
  };

  const handlePriceUpdate = async (type: string, id: string) => {
    if (!editValue) return;

    try {
      const res = await fetch("/api/admin/update-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, id, price: editValue })
      });
      if (res.ok) {
        setEditingPrice(null);
        setEditValue("");
        fetchData();
      } else {
        alert("Failed to update price");
      }
    } catch (err) {
      alert("Error updating price");
    }
  };

  const startEditing = (id: string, currentPrice: number) => {
    setEditingPrice(id);
    setEditValue(currentPrice.toString());
  };

  const uploadFile = async (file: File, folder: string = 'Cards'): Promise<string | null> => {
    setUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const json = await res.json();
      if (res.ok && json.url) {
        return json.url;
      }
      alert(json.error || 'Failed to upload file');
      return null;
    } catch (e) {
      alert('Upload error');
      return null;
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSaveCard = async () => {
    if (!cardModal) return;
    if (!cardModal.name || !cardModal.categoryId) {
      alert('Please enter card name and category');
      return;
    }

    try {
      const endpoint = cardModal.isEditing ? '/api/admin/update-template' : '/api/admin/create-template';
      const payload: any = {
        name: cardModal.name,
        categoryId: cardModal.categoryId,
        price: cardModal.price,
        previewImageUrl: cardModal.previewImageUrl || '/assets/Cards/card 1.png',
        experienceType: cardModal.experienceType || 'dynamic_card',
        music: cardModal.music ?? null,
      };
      if (cardModal.isEditing) {
        payload.id = cardModal.id;
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok) {
        setCardModal(null);
        fetchData();
      } else {
        alert(json.error || 'Failed to save card');
      }
    } catch (e) {
      alert('Error saving card');
    }
  };

  const handleSaveAnimation = async () => {
    if (!animationModal) return;
    if (!animationModal.name || !animationModal.videoUrl) {
      alert('Please enter animation name and video URL/file');
      return;
    }

    try {
      const endpoint = animationModal.isEditing ? '/api/admin/update-animation' : '/api/admin/create-animation';
      const payload: any = {
        name: animationModal.name,
        price: animationModal.price,
        videoUrl: animationModal.videoUrl,
        previewPosterUrl: animationModal.previewPosterUrl || '/assets/Opening animation/ChatGPT Image Sep 28, 2026, 10_28_18 PM.png',
      };
      if (animationModal.isEditing) {
        payload.id = animationModal.id;
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok) {
        setAnimationModal(null);
        fetchData();
      } else {
        alert(json.error || 'Failed to save animation');
      }
    } catch (e) {
      alert('Error saving animation');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]"><Loader2 className="w-8 h-8 animate-spin text-[#8C4A52]" /></div>;
  if (error) return <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-red-500 bg-[#FAF8F5]"><Shield className="w-12 h-12" /><div>{error}</div><p className="text-sm text-gray-500">Please login as admin at /login</p></div>;

  const currentCategoryCards = activeCategory === "all" 
    ? data.templates 
    : data.templates.filter((t: any) => t.category?.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col md:flex-row text-[#2C2623] font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-[#D4AF37]/20 flex flex-col flex-shrink-0 relative z-10 shadow-soft-surface">
        <div className="p-6 border-b border-[#D4AF37]/20 flex flex-col gap-2">
          <Link href="/" className="text-2xl font-bold text-[#8C4A52]" style={{ fontFamily: 'Noto Serif Bengali, serif' }}>
            উৎসব
          </Link>
          <span className="text-xs font-bold text-[#7C7267] uppercase tracking-wider">Admin Panel</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <button onClick={() => setActiveTab("cards")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "cards" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
            <LayoutTemplate className="w-5 h-5" /> Cards
          </button>
          <button onClick={() => setActiveTab("animations")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "animations" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
            <PlayCircle className="w-5 h-5" /> Animations
          </button>
          <button onClick={() => setActiveTab("durations")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "durations" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
            <Clock className="w-5 h-5" /> Durations
          </button>
          <button onClick={() => setActiveTab("users")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "users" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
            <Users className="w-5 h-5" /> Users
          </button>
          <button onClick={() => setActiveTab("messages")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "messages" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
            <MessageSquare className="w-5 h-5" /> Messages
          </button>
        </nav>
        
        <div className="p-4 border-t border-[#D4AF37]/20 mt-auto">
          <button 
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/";
            }} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-[#7C7267] hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAF8F5]">
        
        {/* Header */}
        <header className="h-20 bg-white/50 backdrop-blur-md border-b border-[#D4AF37]/20 flex items-center px-8 flex-shrink-0">
          <h2 className="text-2xl font-bold capitalize" style={{ fontFamily: 'Cinzel, serif' }}>
            {activeTab} Management
          </h2>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Cards (Templates) Tab */}
          {activeTab === "cards" && (
            <div className="space-y-8">
              {/* Category Tabs & Add Card Button */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setActiveCategory("all")}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === "all" ? 'bg-[#2C2623] text-white shadow-elevated-card' : 'bg-white border border-[#D4AF37]/30 text-[#7C7267] hover:bg-[#F9F0EC]'}`}
                  >
                    All Cards
                  </button>
                  {data.categories.map((cat: any) => (
                    <button 
                      key={cat.id} 
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat.id ? 'bg-[#2C2623] text-white shadow-elevated-card' : 'bg-white border border-[#D4AF37]/30 text-[#7C7267] hover:bg-[#F9F0EC]'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setCardModal({
                    isOpen: true,
                    isEditing: false,
                    name: "",
                    categoryId: data.categories[0]?.id || "",
                    price: "1000",
                    previewImageUrl: "",
                    experienceType: "dynamic_card"
                  })}
                  className="px-5 py-2.5 rounded-full bg-[#8C4A52] text-white font-bold text-sm shadow-soft-surface hover:bg-[#7a3e45] transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add New Card
                </button>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentCategoryCards.map((t: any) => (
                  <div key={t.id} className="bg-white rounded-2xl border border-[#D4AF37]/20 p-5 shadow-soft-surface flex flex-col group relative overflow-hidden">
                    <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-4 border border-gray-100">
                      <img src={t.previewImageUrl} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[#2C2623] font-bold px-2 py-1 rounded text-xs border border-white/50 shadow-sm">
                        ৳{t.price}
                      </div>
                    </div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg leading-tight mb-1">{t.name}</h4>
                        <span className="text-xs font-bold text-[#8C4A52] uppercase">{t.category?.name}</span>
                      </div>
                    </div>
                    
                    {editingPrice === t.id ? (
                      <div className="mt-auto flex gap-2">
                        <input 
                          type="number" 
                          value={editValue} 
                          onChange={(e) => setEditValue(e.target.value)} 
                          className="w-full px-3 py-2 border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-sm font-bold"
                          autoFocus
                        />
                        <button 
                          onClick={() => handlePriceUpdate('template', t.id)}
                          className="flex-1 px-4 py-2 rounded-xl bg-[#8C4A52] text-white font-bold hover:bg-[#7a3e45] transition-colors text-sm shadow-sm"
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => setEditingPrice(null)}
                          className="px-3 py-2 rounded-xl bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 transition-colors text-sm shadow-sm"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <div className="mt-auto flex flex-col gap-2">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              let music = null;
                              try { music = JSON.parse(t.assetManifest || "{}")?.music; } catch {}
                              setCardModal({
                                isOpen: true,
                                isEditing: true,
                                id: t.id,
                                name: t.name,
                                categoryId: t.category?.id || data.categories[0]?.id || "",
                                price: t.price.toString(),
                                previewImageUrl: t.previewImageUrl,
                                experienceType: t.experienceType || "dynamic_card",
                                music: music || null
                              });
                            }}
                            className="flex-1 py-2 rounded-xl bg-[#8C4A52] text-white font-bold flex items-center justify-center gap-1.5 hover:bg-[#7a3e45] transition-colors text-xs shadow-sm"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit Card
                          </button>
                          <button 
                            onClick={() => setDeleteModal({ isOpen: true, id: t.id, type: 'template' })}
                            className="px-3 py-2 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors shadow-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => startEditing(t.id, t.price)}
                          className="w-full py-1.5 rounded-lg border border-gray-200 text-gray-600 font-bold text-[11px] hover:bg-gray-50 transition-colors"
                        >
                          Quick Price: ৳{t.price}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {currentCategoryCards.length === 0 && (
                  <div className="col-span-full py-12 text-center text-[#7C7267] italic font-serif bg-white rounded-2xl border border-dashed border-[#D4AF37]/50">
                    No cards found in this category.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Animations Tab */}
          {activeTab === "animations" && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button 
                  onClick={() => setAnimationModal({
                    isOpen: true,
                    isEditing: false,
                    name: "",
                    price: "0",
                    previewPosterUrl: "",
                    videoUrl: ""
                  })}
                  className="px-5 py-2.5 rounded-full bg-[#8C4A52] text-white font-bold text-sm shadow-soft-surface hover:bg-[#7a3e45] transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add New Animation
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.animations.map((a: any) => (
                <div key={a.id} className="bg-white rounded-2xl border border-[#D4AF37]/20 p-5 shadow-soft-surface flex flex-col group">
                  <div className="relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4 border border-gray-100">
                    <img src={a.previewPosterUrl || 'https://placehold.co/600x400/FAF8F5/8C4A52?text=Animation'} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <PlayCircle className="w-10 h-10 text-white opacity-80" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-lg leading-tight">{a.name}</h4>
                      <div className="text-sm font-bold text-[#7C7267]">Price: ৳{a.price}</div>
                    </div>
                  </div>
                    {editingPrice === a.id ? (
                      <div className="mt-auto flex gap-2">
                        <input 
                          type="number" 
                          value={editValue} 
                          onChange={(e) => setEditValue(e.target.value)} 
                          className="w-full px-3 py-2 border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-sm font-bold"
                          autoFocus
                        />
                        <button 
                          onClick={() => handlePriceUpdate('animation', a.id)}
                          className="px-4 py-2 rounded-xl bg-[#8C4A52] text-white font-bold hover:bg-[#7a3e45] transition-colors text-sm shadow-sm"
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => setEditingPrice(null)}
                          className="px-3 py-2 rounded-xl bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 transition-colors text-sm shadow-sm"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <div className="mt-auto flex flex-col gap-2">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setAnimationModal({
                              isOpen: true,
                              isEditing: true,
                              id: a.id,
                              name: a.name,
                              price: a.price.toString(),
                              previewPosterUrl: a.previewPosterUrl || "",
                              videoUrl: a.videoUrl || ""
                            })}
                            className="flex-1 py-2 rounded-xl bg-[#8C4A52] text-white font-bold flex items-center justify-center gap-1.5 hover:bg-[#7a3e45] transition-colors text-xs shadow-sm"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit Animation
                          </button>
                          <button 
                            onClick={() => setDeleteModal({ isOpen: true, id: a.id, type: 'animation' })}
                            className="px-3 py-2 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors shadow-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => startEditing(a.id, a.price)}
                          className="w-full py-1.5 rounded-lg border border-gray-200 text-gray-600 font-bold text-[11px] hover:bg-gray-50 transition-colors"
                        >
                          Quick Price: ৳{a.price}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Durations Tab */}
          {activeTab === "durations" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.durations.map((d: any) => (
                <div key={d.id} className="bg-gradient-to-br from-white to-[#FAF8F5] rounded-[24px] border border-[#D4AF37]/30 p-6 shadow-floating-ceremony flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#D4AF37] text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                    {d.days} Days
                  </div>
                  <div className="flex items-center gap-4 mb-6 mt-2">
                    <div className="w-14 h-14 rounded-full bg-white border border-[#D4AF37]/20 flex items-center justify-center text-[#8C4A52] shadow-sm">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl leading-tight text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>{d.name}</h4>
                      <div className="text-2xl font-bold text-[#8C4A52] mt-1">৳{d.price}</div>
                    </div>
                  </div>
                  {editingPrice === d.id ? (
                    <div className="mt-auto flex gap-2">
                      <input 
                        type="number" 
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)} 
                        className="w-full px-3 py-2 border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-sm font-bold"
                        autoFocus
                      />
                      <button 
                        onClick={() => handlePriceUpdate('duration', d.id)}
                        className="px-4 py-2 rounded-xl bg-[#8C4A52] text-white font-bold hover:bg-[#7a3e45] transition-colors text-sm shadow-sm"
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => setEditingPrice(null)}
                        className="px-3 py-2 rounded-xl bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 transition-colors text-sm shadow-sm"
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => startEditing(d.id, d.price)}
                      className="mt-auto w-full py-2.5 rounded-xl bg-[#2C2623] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#1a1614] transition-colors text-sm shadow-sm"
                    >
                      <Edit3 className="w-4 h-4" /> Edit Price
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-white rounded-2xl border border-[#D4AF37]/20 overflow-hidden shadow-soft-surface">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#F9F0EC] border-b border-[#D4AF37]/20">
                    <tr>
                      <th className="px-6 py-4 font-bold text-sm text-[#8C4A52] uppercase tracking-wider">Username</th>
                      <th className="px-6 py-4 font-bold text-sm text-[#8C4A52] uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 font-bold text-sm text-[#8C4A52] uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 font-bold text-sm text-[#8C4A52] uppercase tracking-wider">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.users.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-[#7C7267] italic font-serif">No users registered yet.</td>
                      </tr>
                    ) : (
                      data.users.map((u: any) => (
                        <React.Fragment key={u.id}>
                          <tr 
                            className="hover:bg-gray-50 transition-colors cursor-pointer group"
                            onClick={() => setExpandedUserId(expandedUserId === u.id ? null : u.id)}
                          >
                            <td className="px-6 py-4 font-bold text-[#2C2623] flex items-center gap-2">
                              {expandedUserId === u.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />}
                              {u.username}
                            </td>
                            <td className="px-6 py-4 text-[#7C7267]">{u.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === 'ADMIN' ? 'bg-[#8C4A52] text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-[#7C7267]">
                              {new Date(u.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                          {expandedUserId === u.id && (
                            <tr className="bg-[#FAF8F5]">
                              <td colSpan={4} className="px-6 py-6 border-b border-[#D4AF37]/20">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Cards</div>
                                    <div className="text-2xl font-bold text-[#2C2623]">{u.invitations?.length || 0}</div>
                                  </div>
                                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Paid Cards</div>
                                    <div className="text-2xl font-bold text-green-600">{u.invitations?.filter((i: any) => i.status === 'ACTIVE').length || 0}</div>
                                  </div>
                                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Paid</div>
                                    <div className="text-2xl font-bold text-[#8C4A52]">
                                      ৳{u.payments?.filter((p: any) => p.status === 'SUCCESS').reduce((sum: number, p: any) => sum + p.amount, 0) || 0}
                                    </div>
                                  </div>
                                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Last Active</div>
                                    <div className="text-sm font-bold text-[#2C2623] mt-2">
                                      {new Date(u.createdAt).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="bg-white rounded-2xl border border-[#D4AF37]/20 overflow-hidden shadow-soft-surface p-6">
              <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Contact Submissions</h3>
              <div className="space-y-4">
                {(!data.messages || data.messages.length === 0) ? (
                  <div className="py-8 text-center text-gray-500 italic font-serif border border-dashed rounded-xl border-gray-200">No messages yet.</div>
                ) : (
                  data.messages.map((m: any) => (
                    <div key={m.id} className={`p-4 rounded-xl border ${m.status === 'UNREAD' ? 'border-[#8C4A52] bg-[#F9F0EC]/30' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-bold text-lg">{m.name}</div>
                          <div className="text-sm text-gray-500">{m.email} {m.phone && `| ${m.phone}`}</div>
                        </div>
                        <div className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleDateString()}</div>
                      </div>
                      <p className="text-gray-700 font-serif italic mb-4">{m.message}</p>
                      
                      {m.status === 'REPLIED' && m.adminReply ? (
                        <div className="bg-white p-4 rounded-lg border border-green-200 border-l-4 border-l-green-500">
                          <div className="text-xs font-bold text-green-700 mb-1">Your Reply:</div>
                          <p className="text-gray-700">{m.adminReply}</p>
                        </div>
                      ) : (
                        <form onSubmit={async (e) => {
                          e.preventDefault();
                          const reply = (e.currentTarget.elements.namedItem('reply') as HTMLInputElement).value;
                          try {
                            const res = await fetch('/api/admin/reply-contact', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ id: m.id, reply })
                            });
                            if (res.ok) {
                              alert('Reply sent successfully');
                              fetchData(); // reload data
                            } else {
                              alert('Failed to send reply');
                            }
                          } catch (err) {
                            alert('Error sending reply');
                          }
                        }} className="flex gap-2 mt-4">
                          <input required name="reply" type="text" placeholder="Type a reply..." className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C4A52]" />
                          <button type="submit" className="px-4 py-2 bg-[#2C2623] text-white rounded-lg font-bold text-sm hover:bg-[#1a1614] transition-colors">Reply</button>
                        </form>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

        {/* Card Modal (Add & Edit) */}
        {cardModal && cardModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#D4AF37]/30 my-8">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <h3 className="text-xl font-bold text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
                  {cardModal.isEditing ? 'Edit Card Template' : 'Add New Card Template'}
                </h3>
                <button onClick={() => setCardModal(null)} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">Card Name</label>
                  <input 
                    type="text" 
                    value={cardModal.name} 
                    onChange={(e) => setCardModal({ ...cardModal, name: e.target.value })} 
                    placeholder="e.g. Royal Heritage"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">Category</label>
                    <select 
                      value={cardModal.categoryId} 
                      onChange={(e) => setCardModal({ ...cardModal, categoryId: e.target.value })} 
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-sm bg-white"
                    >
                      {data.categories.map((c: any) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">Price (৳)</label>
                    <input 
                      type="number" 
                      value={cardModal.price} 
                      onChange={(e) => setCardModal({ ...cardModal, price: e.target.value })} 
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-sm"
                    />
                  </div>
                </div>

                {/* File Upload Sector for Card Image */}
                <div>
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                    Card Image / Preview Asset
                  </label>
                  <div className="flex items-center gap-4">
                    {cardModal.previewImageUrl && (
                      <div className="w-16 h-20 rounded-lg overflow-hidden border border-[#D4AF37]/50 flex-shrink-0 bg-gray-50">
                        <img src={cardModal.previewImageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <label className="flex-1 cursor-pointer">
                      <div className="w-full py-3 px-4 border-2 border-dashed border-[#D4AF37]/40 rounded-xl flex items-center justify-center text-xs font-bold text-[#7C7267] hover:bg-[#F9F0EC] transition-colors">
                        {uploadingFile ? <Loader2 className="w-4 h-4 animate-spin text-[#8C4A52]" /> : 'Select Image File to Upload'}
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadFile(file, 'Cards');
                            if (url) setCardModal(prev => prev ? { ...prev, previewImageUrl: url } : null);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Background Music Management Sector */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-[#2C2623] uppercase tracking-wide flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-[#8C4A52]" />
                      <span>Background Ceremonial Music</span>
                    </label>
                    {cardModal.music?.url && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Music Configured
                      </span>
                    )}
                  </div>

                  {cardModal.music?.url ? (
                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#D4AF37]/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Music className="w-4 h-4 text-[#8C4A52]" />
                          <span className="text-xs font-bold text-[#2C2623] truncate max-w-[200px]">
                            {cardModal.music.name || "Ceremonial Track"}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCardModal(prev => prev ? { ...prev, music: null } : null)}
                          className="text-[11px] font-bold text-red-600 hover:text-red-700 px-2 py-0.5 rounded bg-red-50 hover:bg-red-100 transition-colors"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Working HTML5 Audio Player */}
                      <audio controls src={cardModal.music.url} className="w-full h-8" />

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="block text-[10px] font-semibold text-gray-500 uppercase">Track Name</label>
                          <input
                            type="text"
                            value={cardModal.music.name || ""}
                            onChange={(e) => setCardModal(prev => prev ? {
                              ...prev,
                              music: { ...(prev.music || { url: "" }), name: e.target.value }
                            } : null)}
                            placeholder="e.g. Shehnai Melody"
                            className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs bg-white"
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-3">
                          <input
                            type="checkbox"
                            id="adminMusicEnabled"
                            checked={cardModal.music.enabled !== false}
                            onChange={(e) => setCardModal(prev => prev ? {
                              ...prev,
                              music: { ...(prev.music || { url: "" }), enabled: e.target.checked }
                            } : null)}
                            className="w-4 h-4 rounded text-[#8C4A52]"
                          />
                          <label htmlFor="adminMusicEnabled" className="text-xs font-semibold text-gray-700">
                            Enable by Default
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label className="block cursor-pointer">
                      <div className="w-full py-3 px-4 border-2 border-dashed border-[#D4AF37]/40 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-[#7C7267] hover:bg-[#F9F0EC] transition-colors">
                        {uploadingFile ? (
                          <Loader2 className="w-4 h-4 animate-spin text-[#8C4A52]" />
                        ) : (
                          <>
                            <Music className="w-4 h-4 text-[#8C4A52]" />
                            <span>Upload Audio File (.mp3, .wav, .m4a)</span>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadFile(file, 'audio');
                            if (url) {
                              setCardModal(prev => prev ? {
                                ...prev,
                                music: {
                                  url,
                                  name: file.name.replace(/\.[^/.]+$/, ""),
                                  loop: true,
                                  volume: 0.8,
                                  enabled: true
                                }
                              } : null);
                            }
                          }
                        }}
                      />
                    </label>
                  )}
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setCardModal(null)} 
                    className="px-5 py-2.5 rounded-xl text-gray-500 font-bold hover:bg-gray-100 text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveCard} 
                    disabled={uploadingFile}
                    className="px-6 py-2.5 rounded-xl bg-[#8C4A52] text-white font-bold hover:bg-[#7a3e45] text-sm shadow-sm transition-all"
                  >
                    {cardModal.isEditing ? 'Save Changes' : 'Create Card'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Animation Modal (Add & Edit) */}
        {animationModal && animationModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#D4AF37]/30 my-8">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <h3 className="text-xl font-bold text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
                  {animationModal.isEditing ? 'Edit Animation' : 'Add New Animation'}
                </h3>
                <button onClick={() => setAnimationModal(null)} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">Animation Name</label>
                  <input 
                    type="text" 
                    value={animationModal.name} 
                    onChange={(e) => setAnimationModal({ ...animationModal, name: e.target.value })} 
                    placeholder="e.g. Royal Curtain Reveal"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">Price (৳)</label>
                  <input 
                    type="number" 
                    value={animationModal.price} 
                    onChange={(e) => setAnimationModal({ ...animationModal, price: e.target.value })} 
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-sm"
                  />
                </div>

                {/* Video Upload Sector */}
                <div>
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                    Animation Video File (.mp4)
                  </label>
                  <label className="cursor-pointer block">
                    <div className="w-full py-3 px-4 border-2 border-dashed border-[#D4AF37]/40 rounded-xl flex items-center justify-between text-xs font-bold text-[#7C7267] hover:bg-[#F9F0EC] transition-colors">
                      <span className="truncate">{animationModal.videoUrl || 'Select Video File'}</span>
                      {uploadingFile ? <Loader2 className="w-4 h-4 animate-spin text-[#8C4A52]" /> : <PlayCircle className="w-4 h-4 text-[#8C4A52]" />}
                    </div>
                    <input 
                      type="file" 
                      accept="video/*" 
                      className="hidden" 
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await uploadFile(file, 'Opening animation');
                          if (url) setAnimationModal(prev => prev ? { ...prev, videoUrl: url } : null);
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Poster Image Upload Sector */}
                <div>
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                    Preview Poster Image
                  </label>
                  <label className="cursor-pointer block">
                    <div className="w-full py-3 px-4 border-2 border-dashed border-[#D4AF37]/40 rounded-xl flex items-center justify-between text-xs font-bold text-[#7C7267] hover:bg-[#F9F0EC] transition-colors">
                      <span className="truncate">{animationModal.previewPosterUrl || 'Select Poster Image'}</span>
                      {uploadingFile ? <Loader2 className="w-4 h-4 animate-spin text-[#8C4A52]" /> : <LayoutTemplate className="w-4 h-4 text-[#8C4A52]" />}
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await uploadFile(file, 'Opening animation');
                          if (url) setAnimationModal(prev => prev ? { ...prev, previewPosterUrl: url } : null);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setAnimationModal(null)} 
                    className="px-5 py-2.5 rounded-xl text-gray-500 font-bold hover:bg-gray-100 text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveAnimation} 
                    disabled={uploadingFile}
                    className="px-6 py-2.5 rounded-xl bg-[#8C4A52] text-white font-bold hover:bg-[#7a3e45] text-sm shadow-sm transition-all"
                  >
                    {animationModal.isEditing ? 'Save Changes' : 'Create Animation'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal && deleteModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full max-w-sm animate-slide-up">
              <h3 className="text-xl font-bold text-[#2C2623] mb-2 font-serif">Confirm Delete</h3>
              <p className="text-[#7C7267] mb-6 font-serif">Are you sure to delete it?</p>
              <div className="flex gap-4 justify-end">
                <button 
                  onClick={() => setDeleteModal(null)}
                  className="px-4 py-2 rounded-xl text-gray-500 font-bold hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

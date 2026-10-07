"use client";

import React, { useEffect, useState } from "react";
import { Shield, Users, Tag, Loader2, Save, LayoutTemplate, PlayCircle, Scroll, Clock, Edit3, CheckCircle2, LogOut, MessageSquare, ChevronDown, ChevronUp, Plus, Trash2, X, Music, Volume2, VolumeX, Sparkles, CreditCard, Smartphone, Check, AlertCircle, ExternalLink, RefreshCw, Copy } from "lucide-react";
import Link from "next/link";
import { TEMPLATE_DEFINITIONS } from "@/lib/template-definitions";

type Tab = "cards" | "animations" | "scroll_views" | "durations" | "users" | "messages" | "payments";

const REVEAL_MODE_LABELS: Record<string, { label: string; icon: string; desc: string }> = {
  sequential: { label: "Sequential Reveal", icon: "✨", desc: "Elements float & fade in step by step" },
  balloon_pop: { label: "Floating Balloons", icon: "🎈", desc: "Tap/pop floating balloons to reveal" },
  parabola_arc: { label: "Parabolic Gesture", icon: "💫", desc: "Drag/scroll along parabolic field" },
  ribbon_untie: { label: "Royal Ribbon", icon: "🎀", desc: "Untie golden royal bow to unveil card" },
  floral_bloom: { label: "Botanical Blossom", icon: "🌸", desc: "Blooming petal scatter on entrance" },
  scratch: { label: "Golden Stardust", icon: "🪄", desc: "Touch/scratch gold foil dust to reveal" },
  parallax_3d: { label: "3D Parallax", icon: "🔮", desc: "Tilt & hover 3D multi-layered depth" },
  fade: { label: "Smooth Fade", icon: "🌊", desc: "Gentle aesthetic opacity transition" },
};

const PHOTO_FRAME_LABELS: Record<string, { label: string; icon: string; desc: string }> = {
  arch_portrait: { label: "Tall Arch", icon: "🏛️", desc: "Domed architectural arch" },
  oval_horizontal: { label: "Oval Pill", icon: "🪞", desc: "Horizontal luxury oval pill" },
  split_couple_portraits: { label: "Dual Arches", icon: "👥", desc: "Side-by-side couple arches" },
  botanical_luxury: { label: "Botanical Crest", icon: "🌿", desc: "Greenery garland ring" },
  cinematic_scene: { label: "Cinematic 16:9", icon: "🎬", desc: "Widescreen frame" },
  classic_editorial: { label: "Regal Border", icon: "📜", desc: "Gold double border" },
};

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

  // Payments State
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [paymentTransactions, setPaymentTransactions] = useState<any[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [savingMethodId, setSavingMethodId] = useState<string | null>(null);
  const [actionTxnId, setActionTxnId] = useState<string | null>(null);
  const [copiedTrxId, setCopiedTrxId] = useState<string | null>(null);
  const [adminActiveSubTab, setAdminActiveSubTab] = useState<Record<string, "MERCHANT" | "PERSONAL" | "AGENT">>({});

  // In-app Payment Action Modal & Toast
  const [paymentActionModal, setPaymentActionModal] = useState<{
    isOpen: boolean;
    transactionId: string;
    action: "APPROVE" | "REJECT";
    orderNumber?: string;
    customerName?: string;
    amount?: number;
  } | null>(null);
  const [toastNotification, setToastNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToastNotification({ type, message });
    setTimeout(() => setToastNotification(null), 3500);
  };

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
    revealMode?: string;
    photoFrameStyle?: string;
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

  const fetchPaymentsData = async () => {
    setLoadingPayments(true);
    try {
      const [mRes, tRes] = await Promise.all([
        fetch("/api/payments/methods"),
        fetch("/api/admin/payments")
      ]);
      if (mRes.ok) {
        const mData = await mRes.json();
        if (mData.methods) setPaymentMethods(mData.methods);
      }
      if (tRes.ok) {
        const tData = await tRes.json();
        if (tData.transactions) setPaymentTransactions(tData.transactions);
      }
    } catch (err) {
      console.error("Failed to load payments data:", err);
    } finally {
      setLoadingPayments(false);
    }
  };

  useEffect(() => {
    if (activeTab === "payments") {
      fetchPaymentsData();
    }
  }, [activeTab]);

  const handleUpdatePaymentMethodField = (methodId: string, field: string, value: any) => {
    setPaymentMethods((prev) =>
      prev.map((m) => {
        if (m.methodId !== methodId) return m;
        const updated = { ...m, [field]: value };
        const activeType = updated.accountType || "MERCHANT";
        if (activeType === "MERCHANT") {
          if (field === "merchantNumber") updated.number = value;
          if (field === "merchantCounter") updated.counter = value;
          if (field === "merchantInstructions") updated.instructions = value;
        } else if (activeType === "PERSONAL") {
          if (field === "personalNumber") updated.number = value;
          if (field === "personalInstructions") updated.instructions = value;
        } else if (activeType === "AGENT") {
          if (field === "agentNumber") updated.number = value;
          if (field === "agentInstructions") updated.instructions = value;
        }
        return updated;
      })
    );
  };

  const handleSavePaymentMethod = async (method: any) => {
    setSavingMethodId(method.methodId);
    try {
      const res = await fetch("/api/payments/methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(method),
      });
      if (res.ok) {
        showToast("success", `${method.name} settings saved successfully!`);
        fetchPaymentsData();
      } else {
        const err = await res.json();
        showToast("error", err.error || "Failed to save settings.");
      }
    } catch (e) {
      showToast("error", "Server error occurred.");
    } finally {
      setSavingMethodId(null);
    }
  };

  const handleTransactionAction = (transaction: any, action: "APPROVE" | "REJECT") => {
    setPaymentActionModal({
      isOpen: true,
      transactionId: transaction.id,
      action,
      orderNumber: transaction.paymentOrder?.orderNumber,
      customerName: transaction.paymentOrder?.user?.name,
      amount: transaction.paymentOrder?.amount,
    });
  };

  const executeTransactionAction = async () => {
    if (!paymentActionModal) return;
    const { transactionId, action } = paymentActionModal;
    setActionTxnId(transactionId);
    try {
      const res = await fetch("/api/admin/payments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, action }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        showToast("success", `Transaction successfully ${action === "APPROVE" ? "approved" : "rejected"}!`);
        setPaymentActionModal(null);
        fetchPaymentsData();
        fetchData();
      } else {
        showToast("error", result.error || "Action could not be completed.");
      }
    } catch (err) {
      showToast("error", "Server error occurred.");
    } finally {
      setActionTxnId(null);
    }
  };

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
        revealMode: cardModal.revealMode || 'sequential',
        photoFrameStyle: cardModal.photoFrameStyle || 'arch_portrait',
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

  // Single card templates (exclude scroll)
  const currentCategoryCards = (activeCategory === "all"
    ? data.templates
    : data.templates.filter((t: any) => t.category?.id === activeCategory)
  ).filter((t: any) => (t.experienceType || '').toLowerCase() !== 'scroll' && (t.experienceType || '').toLowerCase() !== 'scroll_story');

  // Scroll View templates merging TEMPLATE_DEFINITIONS with database prices
  const scrollDefs = TEMPLATE_DEFINITIONS.filter(def => (def.experienceType || '').toLowerCase() === 'scroll' || (def.experienceType || '').toLowerCase() === 'scroll_story');
  const scrollTemplates = scrollDefs.map(def => {
    const match = (data.templates || []).find((t: any) => t.slug === def.slug || t.id === def.id);
    return {
      ...def,
      id: match?.id || def.slug,
      slug: def.slug,
      name: match?.name || def.name,
      price: match?.price !== undefined ? match.price : (def as any).price ?? 2000,
      category: def.category || (match?.category?.slug || 'wedding'),
      previewImageUrl: def.previewImageUrl
    };
  });

  const renderScrollAdminThumbnail = (slug: string) => {
    if (slug === 'haldi-scroll') {
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#FEF08A] via-[#FACC15] to-[#CA8A04] text-[#713F12] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden">
          <div className="text-xl">🌼</div>
          <div>
            <span className="text-[8px] uppercase tracking-widest font-bold block opacity-80">Gaye Holud</span>
            <h5 className="font-bold text-xs leading-tight text-[#713F12]">Haldi Fiesta</h5>
          </div>
          <span className="text-[8px] bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded-full font-bold uppercase self-center shadow-xs">
            Festive Yellow
          </span>
        </div>
      );
    }
    if (slug === 'birthday-scroll') {
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#180B38] via-[#2E1065] to-[#0F0728] text-white flex flex-col justify-between p-3 select-none text-center relative overflow-hidden">
          <div className="text-xl">🎂 ✨</div>
          <div>
            <span className="text-[8px] uppercase tracking-widest font-bold block text-amber-300">Birthday Glow</span>
            <h5 className="font-bold text-xs leading-tight text-white">Milestone Party</h5>
          </div>
          <span className="text-[8px] bg-purple-500/40 border border-purple-400/60 px-2 py-0.5 rounded-full font-bold uppercase self-center shadow-xs text-amber-200">
            Cosmic Starlight
          </span>
        </div>
      );
    }
    if (slug === 'corporate-scroll') {
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-white flex flex-col justify-between p-3 select-none text-center relative overflow-hidden">
          <div className="text-xl">🌐 🏢</div>
          <div>
            <span className="text-[8px] uppercase tracking-widest font-bold block text-sky-400">Corporate</span>
            <h5 className="font-bold text-xs leading-tight text-white">Prestige Summit</h5>
          </div>
          <span className="text-[8px] bg-sky-500/20 border border-sky-400/50 px-2 py-0.5 rounded-full font-bold uppercase self-center text-sky-200">
            Executive Navy
          </span>
        </div>
      );
    }
    if (slug === 'velvet-scroll') {
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#450A0A] via-[#5C0D11] to-[#2B050B] text-[#FAF6F0] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden">
          <div className="text-xl text-[#D4AF37]">👑 ❦</div>
          <div>
            <span className="text-[8px] uppercase tracking-widest font-bold block text-[#D4AF37]">Reception</span>
            <h5 className="font-bold text-xs leading-tight text-white">Ruby Velvet</h5>
          </div>
          <span className="text-[8px] bg-[#D4AF37]/20 border border-[#D4AF37]/60 px-2 py-0.5 rounded-full font-bold uppercase self-center text-[#D4AF37]">
            Crimson & Gold
          </span>
        </div>
      );
    }
    if (slug === 'botanical-scroll') {
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#EBF3EE] via-[#F4F8F5] to-white text-[#1B3022] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden">
          <div className="text-xl text-[#1F4E3B]">🌿 ❦</div>
          <div>
            <span className="text-[8px] uppercase tracking-widest font-bold block text-[#1F4E3B]">Garden Story</span>
            <h5 className="font-bold text-xs leading-tight text-[#1B3022]">Emerald Sage</h5>
          </div>
          <span className="text-[8px] bg-[#1F4E3B]/10 border border-[#1F4E3B]/40 px-2 py-0.5 rounded-full font-bold uppercase self-center text-[#1F4E3B]">
            Botanical Green
          </span>
        </div>
      );
    }
    if (slug === 'floral-romance-scroll') {
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#4A171E] via-[#6A2D31] to-[#2B080E] text-[#EDE7E1] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden border border-[#D4AF37]/30">
          <div className="text-xl text-[#E6C6C3]">🌸 ❦</div>
          <div>
            <span className="text-[8px] uppercase tracking-widest font-bold block text-[#E6C6C3]">Floral Romance</span>
            <h5 className="font-bold text-xs leading-tight text-white font-serif">Blossom Luxury</h5>
          </div>
          <span className="text-[8px] bg-[#E6C6C3]/20 border border-[#E6C6C3]/50 px-2 py-0.5 rounded-full font-bold uppercase self-center text-[#E6C6C3]">
            Burgundy & Rose Gold
          </span>
        </div>
      );
    }
    if (slug === 'editorial-botanical-scroll') {
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#F5F0E8] via-[#ECE5D8] to-[#DDD5C5] text-[#28352B] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden border border-[#9BA58F]/40">
          <div className="text-xl text-[#71806C]">🌿 ✦</div>
          <div>
            <span className="text-[8px] uppercase tracking-widest font-bold block text-[#71806C]">Minimal Arch</span>
            <h5 className="font-bold text-xs leading-tight text-[#28352B] font-serif">Editorial Botanical</h5>
          </div>
          <span className="text-[8px] bg-[#71806C]/15 border border-[#71806C]/40 px-2 py-0.5 rounded-full font-bold uppercase self-center text-[#28352B]">
            Olive & Cream
          </span>
        </div>
      );
    }
    if (slug === 'cinematic-story-scroll') {
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#11100E] via-[#1E1C18] to-[#0A0908] text-[#EEE8DC] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden border border-[#C5B69A]/30">
          <div className="text-xl text-[#C5B69A]">🎬 ✦</div>
          <div>
            <span className="text-[8px] uppercase tracking-widest font-bold block text-[#C5B69A]">Cinematic Story</span>
            <h5 className="font-bold text-xs leading-tight text-white font-serif">Chapter & Drama</h5>
          </div>
          <span className="text-[8px] bg-[#C5B69A]/20 border border-[#C5B69A]/50 px-2 py-0.5 rounded-full font-bold uppercase self-center text-[#C5B69A]">
            Midnight & Gold
          </span>
        </div>
      );
    }
    if (slug === 'botanical-magazine-scroll') {
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#F8F4EC] via-[#EAE3D2] to-[#D7CCA8] text-[#24382B] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden border border-[#B9C9A9]/50">
          <div className="text-xl text-[#A37C4A]">📰 ❦</div>
          <div>
            <span className="text-[8px] uppercase tracking-widest font-bold block text-[#73816F]">Magazine Spread</span>
            <h5 className="font-bold text-xs leading-tight text-[#24382B] font-serif">Botanical Magazine</h5>
          </div>
          <span className="text-[8px] bg-[#A37C4A]/15 border border-[#A37C4A]/40 px-2 py-0.5 rounded-full font-bold uppercase self-center text-[#73816F]">
            Earth Tone Spread
          </span>
        </div>
      );
    }
    // Default Royal Heritage
    return (
      <div className="w-full h-full bg-gradient-to-b from-[#2C241E] via-[#3D322A] to-[#1F1915] text-[#FAF6F0] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden">
        <div className="text-xl text-[#D4AF37]">❖ ⚜</div>
        <div>
          <span className="text-[8px] uppercase tracking-widest font-bold block text-[#D4AF37]">Palace Edition</span>
          <h5 className="font-bold text-xs leading-tight text-white">Royal Heritage</h5>
        </div>
        <span className="text-[8px] bg-[#D4AF37]/20 border border-[#D4AF37]/60 px-2 py-0.5 rounded-full font-bold uppercase self-center text-[#D4AF37]">
          Gold & Ivory
        </span>
      </div>
    );
  };

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
          <button onClick={() => setActiveTab("scroll_views")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "scroll_views" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
            <Scroll className="w-5 h-5" /> Scroll View
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
          <button onClick={() => setActiveTab("payments")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "payments" ? "bg-[#8C4A52] text-white shadow-elevated-card" : "text-[#7C7267] hover:bg-[#F9F0EC]"}`}>
            <CreditCard className="w-5 h-5" /> Payments
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
            {activeTab === "scroll_views"
              ? "Scroll View Pricing"
              : activeTab === "payments"
                ? "MFS Payments & Gateways"
                : `${activeTab} Management`}
          </h2>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">

          {/* Cards (Single Card Templates) Tab */}
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
                    experienceType: "dynamic_card",
                    revealMode: "sequential",
                    photoFrameStyle: "arch_portrait"
                  })}
                  className="px-5 py-2.5 rounded-full bg-[#8C4A52] text-white font-bold text-sm shadow-soft-surface hover:bg-[#7a3e45] transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add New Card
                </button>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentCategoryCards.map((t: any) => {
                  let mode = "sequential";
                  let frame = t.archetype || "arch_portrait";
                  try {
                    const parsed = JSON.parse(t.assetManifest || "{}");
                    if (parsed?.revealMode) mode = parsed.revealMode;
                    if (parsed?.photoFrameStyle) frame = parsed.photoFrameStyle;
                  } catch { }
                  const modeInfo = REVEAL_MODE_LABELS[mode] || { label: mode, icon: "✨" };
                  const frameInfo = PHOTO_FRAME_LABELS[frame] || { label: frame, icon: "🏛️" };

                  return (
                    <div key={t.id} className="bg-white rounded-2xl border border-[#D4AF37]/20 p-5 shadow-soft-surface flex flex-col group relative overflow-hidden">
                      <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-4 border border-gray-100">
                        <img src={t.previewImageUrl} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[#2C2623] font-bold px-2 py-1 rounded text-xs border border-white/50 shadow-sm">
                          ৳{t.price}
                        </div>
                      </div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-lg leading-tight mb-1">{t.name}</h4>
                          <span className="text-xs font-bold text-[#8C4A52] uppercase">{t.category?.name}</span>
                        </div>
                      </div>

                      {/* View Type & Frame Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        <span className="text-[10px] font-bold text-[#8C4A52] bg-[#F9F0EC] border border-[#D4AF37]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span>{modeInfo.icon}</span> {modeInfo.label}
                        </span>
                        <span className="text-[10px] font-bold text-[#2C2623] bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span>{frameInfo.icon}</span> {frameInfo.label}
                        </span>
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
                                let revealMode = "sequential";
                                let photoFrameStyle = t.archetype || "arch_portrait";
                                try {
                                  const parsed = JSON.parse(t.assetManifest || "{}");
                                  music = parsed?.music;
                                  if (parsed?.revealMode) revealMode = parsed.revealMode;
                                  if (parsed?.photoFrameStyle) photoFrameStyle = parsed.photoFrameStyle;
                                } catch { }
                                setCardModal({
                                  isOpen: true,
                                  isEditing: true,
                                  id: t.id,
                                  name: t.name,
                                  categoryId: t.category?.id || data.categories[0]?.id || "",
                                  price: t.price.toString(),
                                  previewImageUrl: t.previewImageUrl,
                                  experienceType: t.experienceType || "dynamic_card",
                                  revealMode,
                                  photoFrameStyle,
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
                  );
                })}
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

          {/* Scroll View Tab (Price Management) */}
          {activeTab === "scroll_views" && (
            <div className="space-y-6">
              <div className="p-4 bg-white rounded-2xl border border-[#D4AF37]/30 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#2C2623] flex items-center gap-2">
                    <Scroll className="w-5 h-5 text-[#8C4A52]" /> Scroll View Templates ({scrollTemplates.length})
                  </h3>
                  <p className="text-xs text-[#7C7267] mt-0.5">
                    Set the individual prices for each vertical scrolling invitation story.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#8C4A52] bg-[#F9F0EC] px-3 py-1.5 rounded-full border border-[#D4AF37]/30">
                  Fixed Architecture (Prices Editable)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {scrollTemplates.map((t: any) => (
                  <div key={t.id} className="bg-white rounded-2xl border border-[#D4AF37]/20 p-5 shadow-soft-surface flex flex-col group relative overflow-hidden">
                    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 border border-stone-200">
                      {renderScrollAdminThumbnail(t.slug)}
                      <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm text-[#8C4A52] font-bold px-2.5 py-1 rounded-md text-xs border border-[#D4AF37]/40 shadow-xs">
                        ৳{t.price}
                      </div>
                      <div className="absolute top-2 left-2 bg-[#8C4A52] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                        <Scroll className="w-2.5 h-2.5" /> Scroll
                      </div>
                    </div>

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-base leading-tight mb-1">{t.name}</h4>
                        <span className="text-[10px] font-bold text-[#8C4A52] uppercase bg-[#F9F0EC] px-2 py-0.5 rounded-md border border-[#D4AF37]/20 inline-block">
                          {t.category}
                        </span>
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
                          placeholder="Price in ৳"
                        />
                        <button
                          onClick={() => handlePriceUpdate('template', t.id)}
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
                        <button
                          onClick={() => startEditing(t.id, t.price)}
                          className="w-full py-2.5 rounded-xl bg-[#2C2623] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#1a1614] transition-colors text-xs shadow-sm"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#D4AF37]" /> Set Price: ৳{t.price}
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

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div className="space-y-8">
              {/* Header Info Banner */}
              <div className="p-6 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-soft-surface flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C4A52]">
                      Utshob Payment System
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-[#2C2623] mt-1" style={{ fontFamily: "Cinzel, serif" }}>
                    MFS Payment Gateways &amp; Transaction Verification
                  </h3>
                  <p className="text-xs text-[#7C7267] mt-1">
                    Configure bKash, Nagad, and Rocket numbers and instructions. Verify and approve customer payment TrxIDs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fetchPaymentsData}
                  disabled={loadingPayments}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-2 transition-all self-start md:self-auto cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingPayments ? "animate-spin" : ""}`} />
                  <span>Refresh Data</span>
                </button>
              </div>

              {/* Section 1: MFS Gateways Configuration Cards */}
              <div>
                <h4 className="text-sm font-bold text-[#2C2623] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#8C4A52]" />
                  <span>MFS Gateway Configurations (bKash, Nagad, Rocket)</span>
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {paymentMethods.map((m) => {
                    const isSaving = savingMethodId === m.methodId;
                    const brandColor =
                      m.methodId === "bkash"
                        ? "#E2136E"
                        : m.methodId === "nagad"
                          ? "#F7941D"
                          : "#8C3494";

                    const currentSubTab = adminActiveSubTab[m.methodId] || (m.accountType as any) || "MERCHANT";

                    return (
                      <div
                        key={m.methodId}
                        className="bg-white rounded-3xl border border-[#D4AF37]/30 p-6 shadow-soft-surface flex flex-col justify-between relative overflow-hidden"
                      >
                        {/* Top Color Accent */}
                        <div
                          className="absolute top-0 left-0 right-0 h-1.5"
                          style={{ backgroundColor: brandColor }}
                        />

                        <div className="space-y-4">
                          {/* Method Title & Active Toggle */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-3">
                              {/* অফিশিয়াল লোগো কন্টেইনার */}
                              <div className="w-12 h-10 rounded-xl bg-white border border-stone-200/80 shadow-xs p-1 flex items-center justify-center overflow-hidden">
                                <img
                                  src={`/assets/payment-gateway/${m.methodId}.png`}
                                  alt={m.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>

                              <div>
                                <h5 className="font-bold text-base text-[#2C2623]">{m.name}</h5>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                  {m.methodId} Gateway
                                </span>
                              </div>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer select-none">
                              <span className={`text-xs font-bold ${m.isActive ? "text-emerald-600" : "text-gray-400"}`}>
                                {m.isActive ? "Active" : "Disabled"}
                              </span>
                              <input
                                type="checkbox"
                                checked={m.isActive}
                                onChange={(e) =>
                                  handleUpdatePaymentMethodField(m.methodId, "isActive", e.target.checked)
                                }
                                className="w-4 h-4 accent-[#8C4A52] cursor-pointer"
                              />
                            </label>
                          </div>

                          {/* Default Account Type in Modal */}
                          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/70">
                            <label className="block text-[11px] font-bold text-[#7C7267] uppercase tracking-wider mb-1">
                              Default Checkout Option (Default Tab)
                            </label>
                            <select
                              value={m.accountType || "MERCHANT"}
                              onChange={(e) => {
                                const newType = e.target.value;
                                handleUpdatePaymentMethodField(m.methodId, "accountType", newType);
                                setAdminActiveSubTab((prev) => ({ ...prev, [m.methodId]: newType as any }));
                              }}
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-xs font-bold bg-white text-[#2C2623]"
                            >
                              <option value="MERCHANT">Merchant Payment (Make Payment)</option>
                              <option value="PERSONAL">Personal (Send Money)</option>
                              <option value="AGENT">Agent (Cash Out)</option>
                            </select>
                            <p className="text-[10px] text-gray-500 mt-1">
                              This option will be selected by default when customers open checkout.
                            </p>
                          </div>

                          {/* Account Type Sub-Tabs */}
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[11px] font-bold text-[#2C2623] uppercase tracking-wider">
                                Configure Account Type Settings:
                              </span>
                            </div>

                            <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200">
                              {(["MERCHANT", "PERSONAL", "AGENT"] as const).map((type) => {
                                const isSelected = currentSubTab === type;
                                const label =
                                  type === "MERCHANT" ? "🛍️ Merchant" : type === "PERSONAL" ? "👤 Personal" : "🏪 Agent";
                                return (
                                  <button
                                    key={type}
                                    type="button"
                                    onClick={() => setAdminActiveSubTab((prev) => ({ ...prev, [m.methodId]: type }))}
                                    className={`py-1.5 px-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer text-center ${isSelected
                                      ? "bg-white text-[#8C4A52] shadow-xs"
                                      : "text-stone-600 hover:text-stone-900"
                                      }`}
                                  >
                                    {label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Sub-Tab Input Form Fields */}
                          <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#D4AF37]/30 space-y-3">
                            {currentSubTab === "MERCHANT" && (
                              <>
                                <div className="flex items-center justify-between pb-1 border-b border-[#D4AF37]/20">
                                  <span className="text-xs font-bold text-[#8C4A52]">Merchant Settings (Make Payment)</span>
                                  <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-bold">
                                    Merchant
                                  </span>
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-[#2C2623] mb-1">
                                    Merchant Account Number
                                  </label>
                                  <input
                                    type="text"
                                    value={m.merchantNumber ?? m.number ?? ""}
                                    onChange={(e) =>
                                      handleUpdatePaymentMethodField(m.methodId, "merchantNumber", e.target.value)
                                    }
                                    placeholder="e.g. 01892-019281"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-xs font-mono font-bold text-[#2C2623] bg-white"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-[#2C2623] mb-1">
                                    Counter Number (Counter No)
                                  </label>
                                  <input
                                    type="text"
                                    value={m.merchantCounter ?? m.counter ?? "1"}
                                    onChange={(e) =>
                                      handleUpdatePaymentMethodField(m.methodId, "merchantCounter", e.target.value)
                                    }
                                    placeholder="1"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-xs font-mono font-bold text-[#2C2623] bg-white"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-[#2C2623] mb-1">
                                    Customer Payment Instructions
                                  </label>
                                  <textarea
                                    rows={4}
                                    value={m.merchantInstructions ?? m.instructions ?? ""}
                                    onChange={(e) =>
                                      handleUpdatePaymentMethodField(m.methodId, "merchantInstructions", e.target.value)
                                    }
                                    placeholder="Enter instructions for customers on how to make payment from their app..."
                                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-xs text-[#2C2623] leading-relaxed bg-white"
                                  />
                                </div>
                              </>
                            )}

                            {currentSubTab === "PERSONAL" && (
                              <>
                                <div className="flex items-center justify-between pb-1 border-b border-[#D4AF37]/20">
                                  <span className="text-xs font-bold text-[#8C4A52]">Personal Settings (Send Money)</span>
                                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                                    Personal
                                  </span>
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-[#2C2623] mb-1">
                                    Personal Account Number
                                  </label>
                                  <input
                                    type="text"
                                    value={m.personalNumber ?? m.number ?? ""}
                                    onChange={(e) =>
                                      handleUpdatePaymentMethodField(m.methodId, "personalNumber", e.target.value)
                                    }
                                    placeholder="e.g. 01892-019281"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-xs font-mono font-bold text-[#2C2623] bg-white"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-[#2C2623] mb-1">
                                    Customer Send Money Instructions
                                  </label>
                                  <textarea
                                    rows={4}
                                    value={m.personalInstructions ?? ""}
                                    onChange={(e) =>
                                      handleUpdatePaymentMethodField(m.methodId, "personalInstructions", e.target.value)
                                    }
                                    placeholder="Enter instructions for customers on how to send money from their app..."
                                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-xs text-[#2C2623] leading-relaxed bg-white"
                                  />
                                </div>
                              </>
                            )}

                            {currentSubTab === "AGENT" && (
                              <>
                                <div className="flex items-center justify-between pb-1 border-b border-[#D4AF37]/20">
                                  <span className="text-xs font-bold text-[#8C4A52]">Agent Settings (Cash Out)</span>
                                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                                    Agent
                                  </span>
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-[#2C2623] mb-1">
                                    Agent Account Number
                                  </label>
                                  <input
                                    type="text"
                                    value={m.agentNumber ?? m.number ?? ""}
                                    onChange={(e) =>
                                      handleUpdatePaymentMethodField(m.methodId, "agentNumber", e.target.value)
                                    }
                                    placeholder="e.g. 01892-019281"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-xs font-mono font-bold text-[#2C2623] bg-white"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-[#2C2623] mb-1">
                                    Customer Cash Out Instructions
                                  </label>
                                  <textarea
                                    rows={4}
                                    value={m.agentInstructions ?? ""}
                                    onChange={(e) =>
                                      handleUpdatePaymentMethodField(m.methodId, "agentInstructions", e.target.value)
                                    }
                                    placeholder="Enter instructions for customers on how to cash out from their app or agent point..."
                                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-xs text-[#2C2623] leading-relaxed bg-white"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Save Button */}
                        <div className="pt-4 mt-4 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={() => handleSavePaymentMethod(m)}
                            disabled={isSaving}
                            className="w-full py-2.5 rounded-xl text-white font-bold text-xs shadow-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                            style={{ backgroundColor: brandColor }}
                          >
                            {isSaving ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <Save className="w-3.5 h-3.5" />
                                <span>Save {m.name} Settings</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Submitted Customer Transactions Table */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-[#2C2623] uppercase tracking-wider flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#8C4A52]" />
                    <span>Customer Payments &amp; Transaction History ({paymentTransactions.length})</span>
                  </h4>
                </div>

                <div className="bg-white rounded-3xl border border-[#D4AF37]/30 shadow-soft-surface overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#2C2623]">
                      <thead className="bg-[#FAF8F5] border-b border-[#D4AF37]/20 uppercase text-[10px] font-bold text-[#7C7267] tracking-wider">
                        <tr>
                          <th className="px-5 py-4">Order # &amp; Date</th>
                          <th className="px-5 py-4">Customer</th>
                          <th className="px-5 py-4">Invitation Card</th>
                          <th className="px-5 py-4">Channel</th>
                          <th className="px-5 py-4">Sender Wallet No</th>
                          <th className="px-5 py-4">TrxID</th>
                          <th className="px-5 py-4">Amount</th>
                          <th className="px-5 py-4">Status</th>
                          <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {paymentTransactions.length === 0 ? (
                          <tr>
                            <td colSpan={9} className="px-5 py-12 text-center text-[#7C7267] italic font-serif">
                              No payment transactions found.
                            </td>
                          </tr>
                        ) : (
                          paymentTransactions.map((txn) => {
                            const isActioning = actionTxnId === txn.id;
                            const order = txn.paymentOrder;
                            const inv = order?.invitation;
                            const user = order?.user;

                            const statusColor =
                              txn.status === "APPROVED" || txn.status === "SUCCESS"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : txn.status === "REJECTED" || txn.status === "FAILED"
                                  ? "bg-red-50 text-red-700 border-red-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200";

                            return (
                              <tr key={txn.id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-5 py-4">
                                  <div className="font-mono font-bold text-[#2C2623]">
                                    {order?.orderNumber || "N/A"}
                                  </div>
                                  <div className="text-[10px] text-gray-400 mt-0.5">
                                    {new Date(txn.createdAt).toLocaleDateString("en-GB", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                </td>

                                <td className="px-5 py-4">
                                  <div className="font-bold text-[#2C2623]">{user?.name || "Customer"}</div>
                                  <div className="text-[11px] text-gray-500 font-mono">{user?.phone || user?.email}</div>
                                </td>

                                <td className="px-5 py-4">
                                  {inv ? (
                                    <div>
                                      <Link
                                        href={`/invite/${inv.slug}`}
                                        target="_blank"
                                        className="font-bold text-[#8C4A52] hover:underline flex items-center gap-1"
                                      >
                                        <span>{inv.title || inv.slug}</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </Link>
                                      <span className="text-[10px] text-gray-400 font-mono">{inv.slug}</span>
                                    </div>
                                  ) : (
                                    <span className="text-gray-400 italic">No card linked</span>
                                  )}
                                </td>

                                <td className="px-5 py-4">
                                  <span
                                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${order?.gateway === "bkash"
                                      ? "bg-pink-100 text-pink-700"
                                      : order?.gateway === "nagad"
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-purple-100 text-purple-700"
                                      }`}
                                  >
                                    {order?.gateway || "MFS"}
                                  </span>
                                </td>

                                <td className="px-5 py-4">
                                  <span className="font-mono font-bold text-gray-800">
                                    {txn.senderNumber || "N/A"}
                                  </span>
                                </td>

                                <td className="px-5 py-4">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono font-bold text-xs bg-gray-100 px-2 py-0.5 rounded text-[#2C2623]">
                                      {txn.trxId || "N/A"}
                                    </span>
                                    {txn.trxId && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          navigator.clipboard.writeText(txn.trxId);
                                          setCopiedTrxId(txn.trxId);
                                          setTimeout(() => setCopiedTrxId(null), 1500);
                                        }}
                                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                        title="Copy TrxID"
                                      >
                                        {copiedTrxId === txn.trxId ? (
                                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        ) : (
                                          <Copy className="w-3.5 h-3.5" />
                                        )}
                                      </button>
                                    )}
                                  </div>
                                </td>

                                <td className="px-5 py-4">
                                  <span className="font-bold text-sm text-[#8C4A52]">
                                    ৳{order?.amount ?? 0}
                                  </span>
                                </td>

                                <td className="px-5 py-4">
                                  <span
                                    className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusColor}`}
                                  >
                                    {txn.status}
                                  </span>
                                </td>

                                <td className="px-5 py-4 text-right">
                                  {txn.status === "PENDING" ? (
                                    <div className="flex items-center justify-end gap-2">
                                      <button
                                        type="button"
                                        onClick={() => handleTransactionAction(txn, "APPROVE")}
                                        disabled={isActioning}
                                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs flex items-center gap-1 transition-all disabled:opacity-50 cursor-pointer"
                                      >
                                        {isActioning ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
                                        <span>Approve</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleTransactionAction(txn, "REJECT")}
                                        disabled={isActioning}
                                        className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[11px] border border-red-200 transition-all disabled:opacity-50 cursor-pointer"
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  ) : txn.status === "APPROVED" || txn.status === "SUCCESS" ? (
                                    <span className="text-[11px] font-bold text-emerald-600 inline-flex items-center gap-1">
                                      <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                                    </span>
                                  ) : (
                                    <span className="text-[11px] font-bold text-red-500">
                                      Rejected
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
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

                {/* Animation View Type Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#8C4A52]" />
                    <span>Interactive Animation View Type</span>
                  </label>
                  <select
                    value={cardModal.revealMode || "sequential"}
                    onChange={(e) => setCardModal(prev => prev ? { ...prev, revealMode: e.target.value } : null)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-xs font-bold bg-white text-[#2C2623]"
                  >
                    <option value="sequential">✨ Sequential Floating Reveal (Elements float & fade in step by step)</option>
                    <option value="balloon_pop">🎈 Interactive Sky Balloons (Tap/pop balloons to reveal - Birthday/Festive)</option>
                    <option value="parabola_arc">💫 Parabolic Gesture Curve (Drag/scroll along parabolic curve)</option>
                    <option value="ribbon_untie">🎀 Royal Satin Ribbon (Untie golden royal bow to unveil card)</option>
                    <option value="floral_bloom">🌸 Botanical Blossom (Blooming petal scatter on entrance)</option>
                    <option value="scratch">🪄 Golden Stardust Wipe (Touch/scratch gold foil dust to reveal)</option>
                    <option value="parallax_3d">🔮 3D Gyro Parallax (Interactive tilt & motion depth)</option>
                    <option value="fade">🌊 Ambient Smooth Fade (Gentle aesthetic opacity transition)</option>
                  </select>
                  <p className="text-[11px] text-[#7C7267] mt-1">
                    Guests experience this animation when opening and revealing the card.
                  </p>
                </div>

                {/* Photo Frame Shape & Style Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <LayoutTemplate className="w-3.5 h-3.5 text-[#8C4A52]" />
                    <span>Photo Frame Shape & Layout Style</span>
                  </label>
                  <select
                    value={cardModal.photoFrameStyle || "arch_portrait"}
                    onChange={(e) => setCardModal(prev => prev ? { ...prev, photoFrameStyle: e.target.value } : null)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] text-xs font-bold bg-white text-[#2C2623]"
                  >
                    <option value="arch_portrait">🏛️ Tall Architectural Arch (Classic royal domed frame)</option>
                    <option value="oval_horizontal">🪞 Luxury Oval / Pill Capsule (Horizontal wide curved frame)</option>
                    <option value="split_couple_portraits">👥 Dual Arches (Groom & Bride side-by-side portraits)</option>
                    <option value="botanical_luxury">🌿 Botanical Crest & Laurel (Greenery garland ring)</option>
                    <option value="cinematic_scene">🎬 Cinematic Widescreen (16:9 modern dramatic frame)</option>
                    <option value="classic_editorial">📜 Classic Regal Border (Gold lined double border)</option>
                  </select>
                  <p className="text-[11px] text-[#7C7267] mt-1">
                    Shapes the couple/host image on the card (e.g. horizontal oval pill, side-by-side arches, tall dome).
                  </p>
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

        {/* Payment Transaction In-App Confirmation Modal */}
        {paymentActionModal && paymentActionModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-slide-up space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${paymentActionModal.action === "APPROVE"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {paymentActionModal.action === "APPROVE" ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <AlertCircle className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#2C2623]">
                    {paymentActionModal.action === "APPROVE"
                      ? "Approve Transaction"
                      : "Reject Transaction"}
                  </h4>
                  <span className="text-xs text-gray-500 font-mono">
                    Order: {paymentActionModal.orderNumber || "N/A"}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                {paymentActionModal.action === "APPROVE"
                  ? `Are you sure you want to approve this payment of ৳${paymentActionModal.amount ?? 0}? This will immediately activate the invitation card and set its link validity.`
                  : `Are you sure you want to reject this payment transaction? The invitation card will remain unapproved.`}
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentActionModal(null)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={executeTransactionAction}
                  disabled={actionTxnId === paymentActionModal.transactionId}
                  className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer ${paymentActionModal.action === "APPROVE"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                  {actionTxnId === paymentActionModal.transactionId ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>
                      {paymentActionModal.action === "APPROVE"
                        ? "Confirm & Approve"
                        : "Confirm & Reject"}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* In-App Toast Notification */}
        {toastNotification && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border bg-white border-stone-200 animate-slide-up">
            {toastNotification.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span className="text-xs font-bold text-[#2C2623]">
              {toastNotification.message}
            </span>
          </div>
        )}

      </main>
    </div>
  );
}

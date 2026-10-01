"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Save, CreditCard, ArrowRight, CheckCircle2, X, PlayCircle, Clock, ShieldCheck } from "lucide-react";
import DynamicCardExperience from "@/experiences/dynamic-card";
import EnvelopeRoyal from "@/experiences/envelope-royal";
import TheatricalCurtain from "@/experiences/theatrical-curtain";
import MultiScratch from "@/experiences/multi-scratch";
import ScrollExperience from "@/experiences/scroll-experience/ScrollExperience";

const DURATION_TIERS = [
  { days: 15, label: "15 Days", badge: "Standard", price: 0, desc: "Default link validity" },
  { days: 20, label: "20 Days", badge: "+5 Days", price: 100, desc: "Extended celebration" },
  { days: 30, label: "30 Days", badge: "1 Month", price: 200, desc: "Full month validity" },
  { days: 45, label: "45 Days", badge: "Popular", price: 350, desc: "Wedding season pack" },
  { days: 60, label: "60 Days", badge: "2 Months", price: 500, desc: "Maximum validity" },
];

export default function CheckoutClient({ invitation, total }: { invitation: any, total: number }) {
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState<number>(15);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"bkash" | "nagad" | "rocket" | null>(null);

  const [isPaying, setIsPaying] = useState(false);

  // Dynamic pricing calculation based on base template/animation + chosen duration
  const basePrice = (invitation.template?.price || 0) + (invitation.animation?.price || 0);
  const durationPrice = DURATION_TIERS.find(t => t.days === selectedDuration)?.price || 0;
  const currentTotal = basePrice + durationPrice;

  const handleSaveLater = () => {
    setShowSaveModal(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2500);
  };

  const handleGenerateLink = async () => {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }
    setIsPaying(true);
    try {
      const res = await fetch("/api/checkout/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: invitation.slug,
          gateway: selectedMethod,
          durationDays: selectedDuration,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          router.push(`/checkout/${invitation.slug}/success`);
          return;
        }
      }
      alert("Payment processing failed. Please try again.");
    } catch (err) {
      console.error(err);
      alert("An error occurred during payment.");
    } finally {
      setIsPaying(false);
    }
  };

  const expType = (invitation.template?.experienceType || '').toLowerCase();
  const isScroll = expType === 'scroll' || expType === 'scroll_story' || invitation.template?.slug?.includes('scroll');
  const parsedEventData = invitation.eventData ? JSON.parse(invitation.eventData) : {};

  // Resolve preview component based on template experience type
  let PreviewComponent: any = DynamicCardExperience;
  if (isScroll) PreviewComponent = ScrollExperience;
  else if (expType === 'curtain') PreviewComponent = TheatricalCurtain;
  else if (expType === 'multi_scratch') PreviewComponent = MultiScratch;
  else if (expType === 'envelope') PreviewComponent = EnvelopeRoyal;

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col lg:flex-row gap-12">
      
      {/* Left side: Preview */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="relative w-full max-w-[400px] aspect-[4/5] bg-white rounded-[32px] overflow-hidden shadow-2xl border-4 border-[#D4AF37]/20 flex flex-col items-center p-8 group">
          <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-40 mix-blend-multiply pointer-events-none" />
          <img 
            src={invitation.template.previewImageUrl} 
            alt="Preview" 
            className="w-full h-full object-contain filter drop-shadow-xl transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
             <p className="text-white font-bold text-center" style={{ fontFamily: 'Cinzel, serif' }}>{invitation.title}</p>
          </div>
        </div>
      </div>

      {/* Right side: Options */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#2C2623] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
          Almost Done!
        </h1>
        <p className="text-[#7C7267] font-serif text-base italic mb-6">
          Your interactive invitation has been securely drafted. Select your active link duration and proceed to checkout.
        </p>

        {/* 01. DURATION SELECTION SECTION */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wider mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#8C4A52]" />
            Select Card Active Duration (লিংক সক্রিয় রাখার মেয়াদ)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {DURATION_TIERS.map((tier) => {
              const isSelected = selectedDuration === tier.days;
              return (
                <button
                  key={tier.days}
                  type="button"
                  onClick={() => setSelectedDuration(tier.days)}
                  className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#8C4A52] bg-[#8C4A52]/5 ring-2 ring-[#8C4A52]/20 shadow-sm'
                      : 'border-[#D4AF37]/30 bg-white hover:border-[#8C4A52]/40 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${isSelected ? 'text-[#8C4A52]' : 'text-[#2C2623]'}`}>
                      {tier.label}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      tier.price === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {tier.price === 0 ? 'Free' : `+৳${tier.price}`}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#7C7267] leading-tight">{tier.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary Breakdown */}
        <div className="bg-white rounded-3xl p-6 shadow-soft-surface border border-[#D4AF37]/20 mb-8">
           <div className="space-y-2 text-sm text-[#7C7267] pb-4 border-b border-gray-100">
             <div className="flex justify-between items-center">
               <span>Base Design &amp; Animation</span>
               <span className="font-semibold text-[#2C2623]">৳{basePrice}</span>
             </div>
             <div className="flex justify-between items-center">
               <span>Link Validity ({selectedDuration} Days)</span>
               <span className="font-semibold text-[#2C2623]">{durationPrice === 0 ? 'Included (৳0)' : `+৳${durationPrice}`}</span>
             </div>
           </div>
           <div className="flex justify-between items-center pt-4">
              <span className="text-[#8C4A52] font-bold uppercase tracking-wider text-sm">Total Payable</span>
              <span className="font-bold text-3xl text-[#D4AF37]" style={{ fontFamily: 'Cinzel, serif' }}>৳{currentTotal}</span>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <button 
            onClick={() => setShowPayModal(true)}
            className="flex-1 py-4 px-6 rounded-full bg-[#8C4A52] text-white font-bold shadow-elevated-card hover:bg-[#7a3e45] transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Pay &amp; Generate Link
          </button>
          
          <button 
            onClick={handleSaveLater}
            className="flex-1 py-4 px-6 rounded-full bg-white text-[#2C2623] border border-[#D4AF37]/40 font-bold shadow-soft-surface hover:bg-[#F9F0EC] transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5 text-[#D4AF37]" />
            Pay Later &amp; Save
          </button>

          <button 
            onClick={() => setShowPreviewModal(true)}
            className="w-full sm:w-auto py-4 px-6 rounded-full bg-[#2C2623] text-white font-bold shadow-soft-surface hover:bg-[#1a1614] transition-all flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-5 h-5" />
            Preview
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8">
          <button 
            onClick={() => setShowPreviewModal(false)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 z-50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className={`relative w-full ${
            isScroll 
              ? 'max-w-[440px] h-[90vh] max-h-[900px] overflow-y-auto bg-[#FAF8F5] rounded-[32px] shadow-2xl border-4 border-[#D4AF37]/40 scroll-smooth'
              : 'max-w-[412px] h-[100dvh] max-h-[915px] mx-auto rounded-[32px] overflow-hidden shadow-2xl bg-black'
          }`}>
            <PreviewComponent 
              template={invitation.template}
              animation={invitation.animation}
              eventData={parsedEventData}
              revealMode={invitation.revealMode || "auto"}
              customImage={invitation.customImage}
              bgBlur={invitation.bgBlur}
              skipAnimation={false}
            />
          </div>
        </div>
      )}

      {/* Pay Later Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-[#D4AF37]/30 transform scale-100 animate-slide-up">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#2C2623] mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Saved Successfully</h3>
            <p className="text-[#7C7267] font-serif italic mb-6">
              Your card has been saved to your profile&apos;s Saved Cards option.
            </p>
            <p className="text-sm font-bold text-gray-400">Redirecting to dashboard...</p>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full relative shadow-2xl border border-[#D4AF37]/30 transform scale-100 animate-slide-up">
            <button 
              onClick={() => setShowPayModal(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-2xl font-bold text-[#2C2623] mb-1" style={{ fontFamily: 'Cinzel, serif' }}>Secure Checkout</h3>
            <p className="text-[#7C7267] font-serif text-xs italic mb-6">Selected Duration: <span className="font-bold text-[#8C4A52]">{selectedDuration} Days</span></p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { id: 'bkash', name: 'bKash', color: 'bg-pink-50 border-pink-200 text-pink-600' },
                { id: 'nagad', name: 'Nagad', color: 'bg-orange-50 border-orange-200 text-orange-600' },
                { id: 'rocket', name: 'Rocket', color: 'bg-purple-50 border-purple-200 text-purple-600' }
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id as any)}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${selectedMethod === method.id ? `border-[#8C4A52] bg-[#8C4A52]/5 shadow-md` : `border-gray-100 bg-gray-50 hover:bg-gray-100`}`}
                >
                  <div className={`w-10 h-10 rounded-full ${method.color} flex items-center justify-center font-bold text-xs`}>
                    {method.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-[#2C2623]">{method.name}</span>
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-[#7C7267] uppercase tracking-wider mb-2">Amount to Pay</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">৳</span>
                <input 
                  type="text" 
                  value={currentTotal}
                  disabled
                  className="w-full pl-10 pr-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 font-bold text-xl text-[#2C2623]"
                />
              </div>
            </div>

            <button 
              onClick={handleGenerateLink}
              disabled={isPaying}
              className="w-full py-4 rounded-full bg-[#2C2623] text-white font-bold shadow-elevated-card hover:bg-[#1a1614] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isPaying ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <span>Confirm Payment &amp; Activate Link</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

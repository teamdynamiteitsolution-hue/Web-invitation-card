"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Save, CreditCard, ArrowRight, CheckCircle2, X, Clock, ShieldCheck } from "lucide-react";
import DynamicCardExperience from "@/experiences/dynamic-card";
import EnvelopeRoyal from "@/experiences/envelope-royal";
import TheatricalCurtain from "@/experiences/theatrical-curtain";
import MultiScratch from "@/experiences/multi-scratch";
import ScrollExperience from "@/experiences/scroll-experience/ScrollExperience";

import { resolveCanonicalInvitation } from "@/lib/canonical-invitation";
import { AudioPlayer } from "@/components/AudioPlayer";
import PaymentGatewayModal from "@/components/PaymentGatewayModal";

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

  // Dynamic pricing calculation based on base template/animation + chosen duration
  const basePrice = (invitation.template?.price || 0) + (invitation.animation?.price || 0);
  const durationPrice = DURATION_TIERS.find(t => t.days === selectedDuration)?.price || 0;
  const currentTotal = basePrice + durationPrice;

  // Canonical resolution of customized invitation
  const canonical = resolveCanonicalInvitation(invitation);
  const { template: canonicalTemplate, animation: canonicalAnimation, isScroll, experienceType, eventData: canonicalEventData } = canonical;

  const handleSaveLater = () => {
    setShowSaveModal(true);
    setTimeout(() => {
      router.push("/profile");
    }, 2500);
  };

  // Resolve preview component based on template experience type
  let PreviewComponent: any = DynamicCardExperience;
  if (isScroll || experienceType === 'scroll' || experienceType === 'scroll_story') PreviewComponent = ScrollExperience;
  else if (experienceType === 'curtain') PreviewComponent = TheatricalCurtain;
  else if (experienceType === 'multi_scratch') PreviewComponent = MultiScratch;
  else if (experienceType === 'envelope') PreviewComponent = EnvelopeRoyal;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 md:py-16 flex flex-col lg:flex-row gap-8 lg:gap-12">

      {/* Left side: Customized Live Preview Card */}
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <div className="text-xs font-bold uppercase tracking-wider text-[#8C4A52] mb-3 flex items-center gap-1.5 self-start sm:self-center">
          <span>✨ Your Customized Invitation</span>
        </div>
        <div className={`relative w-full max-w-[390px] ${isScroll
            ? 'h-[500px] overflow-y-auto rounded-[32px] border-4 border-[#D4AF37]/30 shadow-2xl bg-[#FAF8F5] scroll-smooth'
            : 'aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-4 border-[#D4AF37]/30 bg-[#FAF8F5]'
          }`}>
          <PreviewComponent
            template={canonicalTemplate}
            animation={canonicalAnimation}
            eventData={canonicalEventData}
            revealMode="auto"
            customImage={invitation.customImage || canonicalEventData?.couplePhoto}
            bgBlur={invitation.bgBlur}
            skipAnimation={true}
          />
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
                  className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${isSelected
                      ? 'border-[#8C4A52] bg-[#8C4A52]/5 ring-2 ring-[#8C4A52]/20 shadow-sm'
                      : 'border-[#D4AF37]/30 bg-white hover:border-[#8C4A52]/40 hover:bg-stone-50'
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${isSelected ? 'text-[#8C4A52]' : 'text-[#2C2623]'}`}>
                      {tier.label}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${tier.price === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
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
            className="flex-1 py-4 px-6 rounded-full bg-[#8C4A52] text-white font-bold shadow-elevated-card hover:bg-[#7a3e45] transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <CreditCard className="w-5 h-5" />
            Pay &amp; Generate Link
          </button>

          <button
            onClick={handleSaveLater}
            className="flex-1 py-4 px-6 rounded-full bg-white text-[#2C2623] border border-[#D4AF37]/40 font-bold shadow-soft-surface hover:bg-[#F9F0EC] transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Save className="w-5 h-5 text-[#D4AF37]" />
            Pay Later &amp; Save
          </button>
        </div>
      </div>

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
            <p className="text-sm font-bold text-gray-400">Redirecting to profile...</p>
          </div>
        </div>
      )}

      {/* MFS Payment Gateway Modal (bKash, Nagad, Rocket) */}
      <PaymentGatewayModal
        isOpen={showPayModal}
        onClose={() => setShowPayModal(false)}
        selectedDuration={selectedDuration}
        currentTotal={currentTotal}
        invitation={invitation}
      />
    </main>
  );
}

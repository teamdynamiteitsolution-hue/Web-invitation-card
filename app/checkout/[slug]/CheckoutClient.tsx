"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Save, CreditCard, ArrowRight, CheckCircle2, X, Clock, ShieldCheck, Loader2 } from "lucide-react";
import DynamicCardExperience from "@/experiences/dynamic-card";
import EnvelopeRoyal from "@/experiences/envelope-royal";
import TheatricalCurtain from "@/experiences/theatrical-curtain";
import MultiScratch from "@/experiences/multi-scratch";
import ScrollExperience from "@/experiences/scroll-experience/ScrollExperience";

import { resolveCanonicalInvitation } from "@/lib/canonical-invitation";
import { AudioPlayer } from "@/components/AudioPlayer";
import PaymentGatewayModal from "@/components/PaymentGatewayModal";

interface DurationTierItem {
  id?: string;
  days: number;
  name: string;
  price: number;
  isDefault?: boolean;
}

export default function CheckoutClient({
  invitation,
  total,
  durationTiers = [],
  initialPaymentMethods = []
}: {
  invitation: any;
  total: number;
  durationTiers?: DurationTierItem[];
  initialPaymentMethods?: any[];
}) {
  const router = useRouter();

  // Fallback if DB duration tiers is empty
  const activeTiers = durationTiers.length > 0
    ? durationTiers
    : [
        { days: 15, name: "15 Days", price: 0, isDefault: true },
        { days: 30, name: "1 Month (30 Days)", price: 500, isDefault: false },
        { days: 45, name: "45 Days", price: 800, isDefault: false },
        { days: 60, name: "2 Months (60 Days)", price: 1100, isDefault: false },
        { days: 90, name: "3 Months (90 Days)", price: 1500, isDefault: false },
      ];

  const defaultDays = activeTiers.find((t) => t.isDefault)?.days || activeTiers[0]?.days || 15;
  const [selectedDuration, setSelectedDuration] = useState<number>(defaultDays);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSavingLater, setIsSavingLater] = useState(false);

  // Dynamic pricing calculation based on base template/animation + chosen DB duration
  const basePrice = (invitation.template?.price || 0) + (invitation.animation?.price || 0);
  const currentTier = activeTiers.find((t) => t.days === selectedDuration) || activeTiers[0];
  const durationPrice = currentTier?.price || 0;
  const currentTotal = basePrice + durationPrice;

  // Canonical resolution of customized invitation
  const canonical = resolveCanonicalInvitation(invitation);
  const { template: canonicalTemplate, animation: canonicalAnimation, isScroll, experienceType, eventData: canonicalEventData } = canonical;

  const handleSaveLater = () => {
    setIsSavingLater(true);
    setShowSaveModal(true);
    setTimeout(() => {
      router.push("/profile");
    }, 2000);
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
            {activeTiers.map((tier) => {
              const isSelected = selectedDuration === tier.days;
              return (
                <button
                  key={tier.days}
                  type="button"
                  onClick={() => setSelectedDuration(tier.days)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${isSelected
                      ? 'border-[#8C4A52] bg-[#8C4A52]/5 ring-2 ring-[#8C4A52]/20 shadow-sm'
                      : 'border-[#D4AF37]/30 bg-white hover:border-[#8C4A52]/40 hover:bg-stone-50'
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${isSelected ? 'text-[#8C4A52]' : 'text-[#2C2623]'}`}>
                      {tier.name || `${tier.days} Days`}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${tier.price === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                      {tier.price === 0 ? 'Included' : `+৳${tier.price}`}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#7C7267] leading-tight">
                    {tier.price === 0 ? 'Default validity' : `${tier.days} days active link`}
                  </p>
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
            type="button"
            onClick={() => setShowPayModal(true)}
            className="flex-1 py-4 px-6 rounded-full bg-[#8C4A52] text-white font-bold shadow-elevated-card hover:bg-[#7a3e45] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
          >
            <CreditCard className="w-5 h-5" />
            <span>Pay &amp; Generate Link</span>
          </button>

          <button
            type="button"
            onClick={handleSaveLater}
            disabled={isSavingLater}
            className="flex-1 py-4 px-6 rounded-full bg-white text-[#2C2623] border border-[#D4AF37]/40 font-bold shadow-soft-surface hover:bg-[#F9F0EC] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer disabled:opacity-60"
          >
            {isSavingLater ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#8C4A52]" />
                <span>Saving to Profile...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5 text-[#D4AF37]" />
                <span>Pay Later &amp; Save</span>
              </>
            )}
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
            <p className="text-sm font-bold text-gray-400 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#8C4A52]" />
              <span>Redirecting to profile...</span>
            </p>
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
        initialMethods={initialPaymentMethods}
      />
    </main>
  );
}

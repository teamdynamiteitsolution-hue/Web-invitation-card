"use client";

import React, { useState, useEffect } from "react";
import { Copy, CheckCircle2, Link2, Clock, CalendarDays, RefreshCw, ShieldCheck, Check } from "lucide-react";

export default function SuccessClient({
  invitation,
  daysLeft,
}: {
  invitation: any;
  daysLeft: number;
}) {
  const [copied, setCopied] = useState(false);
  const [liveUrl, setLiveUrl] = useState("");
  const isPending = invitation.status === "PENDING_PAYMENT";
  const latestOrder = invitation.payments?.[0];
  const latestTxn = latestOrder?.transactions?.[0];

  useEffect(() => {
    setLiveUrl(`${window.location.origin}/invite/${invitation.slug}`);
  }, [invitation.slug]);

  const handleCopy = () => {
    if (isPending) return;
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col lg:flex-row gap-12 items-center lg:items-start">
      {/* Left side: Preview */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="relative w-full max-w-[400px] aspect-[4/5] bg-white rounded-[32px] overflow-hidden shadow-2xl border-4 border-[#D4AF37]/20 flex flex-col items-center p-8 group animate-slide-up">
          <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-40 mix-blend-multiply pointer-events-none" />
          <img
            src={invitation.template.previewImageUrl}
            alt="Preview"
            className="w-full h-full object-contain filter drop-shadow-xl"
          />
        </div>
      </div>

      {/* Right side: Status and Details */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center animate-fade-in">
        {isPending ? (
          <>
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-6 border border-amber-200 shadow-xs">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold self-start mb-3 border border-amber-200">
              <span>⏳ Verification Pending</span>
            </div>

            <h1
              className="text-3xl md:text-4xl font-bold text-[#2C2623] mb-3"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Payment Details Submitted!
            </h1>
            <p className="text-[#7C7267] font-serif text-base italic mb-6 leading-relaxed">
              Your transaction ID (TrxID) and sender wallet number have been successfully received. An administrator will review and approve your payment shortly. Once approved, your invitation card link will become active and shareable.
            </p>

            {/* Submission Details Card */}
            <div className="bg-white rounded-3xl p-6 shadow-soft-surface border border-[#D4AF37]/30 mb-6 space-y-3">
              <h3 className="text-xs font-bold text-[#7C7267] uppercase tracking-wider pb-2 border-b border-gray-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8C4A52]" />
                Submitted Payment Details
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-400 block text-[11px]">Order Number:</span>
                  <span className="font-mono font-bold text-[#2C2623]">
                    {latestOrder?.orderNumber || "ORD-PENDING"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Payment Channel:</span>
                  <span className="font-bold text-[#8C4A52] uppercase">
                    {latestOrder?.gateway || "MFS"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Sender Wallet Number:</span>
                  <span className="font-mono font-bold text-[#2C2623]">
                    {latestTxn?.senderNumber || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Transaction ID (TrxID):</span>
                  <span className="font-mono font-bold text-[#8C4A52] bg-gray-50 px-2 py-0.5 rounded border border-gray-200 inline-block">
                    {latestTxn?.trxId || "N/A"}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                <span className="text-gray-500">Total Payable:</span>
                <span className="text-base font-bold text-[#8C4A52]">
                  ৳{invitation.calculatedPrice || latestOrder?.amount || 0}
                </span>
              </div>
            </div>

            {/* Link Box (Disabled copy during pending) */}
            <div className="bg-[#FAF8F5] rounded-3xl p-6 border-2 border-dashed border-[#D4AF37]/40 mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#7C7267] uppercase tracking-wider flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  Your Assigned Card Link
                </h3>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Active After Admin Approval
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={liveUrl}
                  disabled
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[#2C2623] font-mono text-xs opacity-60 cursor-not-allowed select-none"
                />
                <button
                  type="button"
                  disabled={true}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-400 font-bold border border-gray-200 cursor-not-allowed flex items-center gap-1.5 text-xs opacity-60 select-none"
                  title="Copy is disabled until payment is verified and approved by admin"
                >
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                  <span>Copy</span>
                </button>
              </div>
              <p className="text-[11px] text-[#7C7267] italic">
                * Note: The copy button will be enabled once your payment is approved.
              </p>
            </div>

            {/* Refresh Check Status Button */}
            <button
              type="button"
              onClick={handleRefresh}
              className="w-full py-3.5 rounded-full bg-[#8C4A52] text-white font-bold text-sm shadow-md hover:bg-[#7a3e45] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Approval Status</span>
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-[#F9F0EC] text-[#8C4A52] rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold text-[#2C2623] mb-4"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Payment Successful!
            </h1>
            <p className="text-[#7C7267] font-serif text-lg italic mb-8">
              Your invitation is approved, now live and ready to be shared with your guests.
            </p>

            {/* Link Box */}
            <div className="bg-white rounded-3xl p-8 shadow-soft-surface border border-[#D4AF37]/30 mb-8">
              <h3 className="text-xs font-bold text-[#7C7267] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Your Live Link
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={liveUrl}
                  disabled
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#2C2623] font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-6 py-3 rounded-xl bg-[#8C4A52] text-white font-bold hover:bg-[#7a3e45] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Validity Box */}
            <div className="bg-[#FAF8F5] rounded-3xl p-6 border-2 border-dashed border-[#D4AF37]/30 flex items-center gap-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#D4AF37]">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2C2623] mb-1 uppercase tracking-widest">
                  Validity Remaining
                </h4>
                <div className="flex items-end gap-2">
                  <span
                    className="text-4xl font-bold text-[#8C4A52]"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    {daysLeft}
                  </span>
                  <span className="text-[#7C7267] font-serif italic mb-1">Days Left</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

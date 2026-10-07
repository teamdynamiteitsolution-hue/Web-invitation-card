"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Copy, Check, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";
import { PaymentMethodConfigData, DEFAULT_PAYMENT_METHODS } from "@/lib/payment-methods";

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDuration: number;
  currentTotal: number;
  invitation: any;
  initialMethods?: PaymentMethodConfigData[];
}

export default function PaymentGatewayModal({
  isOpen,
  onClose,
  selectedDuration,
  currentTotal,
  invitation,
  initialMethods = [],
}: PaymentGatewayModalProps) {
  const router = useRouter();
  const [methods, setMethods] = useState<PaymentMethodConfigData[]>(() => {
    return initialMethods.length > 0 ? initialMethods : DEFAULT_PAYMENT_METHODS;
  });
  const [selectedMethodId, setSelectedMethodId] = useState<"bkash" | "nagad" | "rocket">(() => {
    const active = (initialMethods.length > 0 ? initialMethods : DEFAULT_PAYMENT_METHODS).filter(m => m.isActive !== false);
    return (active[0]?.methodId || "bkash") as "bkash" | "nagad" | "rocket";
  });
  const [senderWallet, setSenderWallet] = useState("");
  const [paymentTrxId, setPaymentTrxId] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Track logo image loading errors so fallback badges show smoothly
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isOpen) return;
    fetch("/api/payments/methods")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && Array.isArray(data.methods) && data.methods.length > 0) {
          setMethods(data.methods);
          const active = data.methods.filter((m: PaymentMethodConfigData) => m.isActive !== false);
          if (active.length > 0 && !active.some((m: PaymentMethodConfigData) => m.methodId === selectedMethodId)) {
            setSelectedMethodId(active[0].methodId);
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching payment methods:", err);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const activeMethods = methods.filter((m) => m.isActive !== false);
  const activeMethod =
    activeMethods.find((m) => m.methodId === selectedMethodId) ||
    activeMethods[0] ||
    methods[0] ||
    DEFAULT_PAYMENT_METHODS[0];

  // Resolve account details and instructions according to the admin-configured account type
  const activeAccountType = activeMethod.accountType || "MERCHANT";

  const getResolvedDetails = () => {
    if (activeAccountType === "MERCHANT") {
      return {
        typeLabel: "Merchant Payment",
        number: activeMethod.merchantNumber || activeMethod.number || "018XXXXXXXX",
        counter: activeMethod.merchantCounter || activeMethod.counter || "1",
        instructions:
          activeMethod.merchantInstructions ||
          activeMethod.instructions ||
          `Open your ${activeMethod.name} app, select 'Make Payment' to our merchant number, and enter the Transaction ID (TrxID) below.`,
      };
    } else if (activeAccountType === "PERSONAL") {
      return {
        typeLabel: "Personal (Send Money)",
        number: activeMethod.personalNumber || activeMethod.number || "018XXXXXXXX",
        counter: "",
        instructions:
          activeMethod.personalInstructions ||
          `Open your ${activeMethod.name} app, select 'Send Money' to our personal number, and enter the Transaction ID (TrxID) below.`,
      };
    } else {
      return {
        typeLabel: "Agent (Cash Out)",
        number: activeMethod.agentNumber || activeMethod.number || "018XXXXXXXX",
        counter: "",
        instructions:
          activeMethod.agentInstructions ||
          `Cash out to our agent number using your ${activeMethod.name} app or from your nearest agent point, and enter the Transaction ID (TrxID) below.`,
      };
    }
  };

  const resolved = getResolvedDetails();

  const handleCopyNumber = () => {
    if (!resolved.number) return;
    navigator.clipboard.writeText(resolved.number.replace(/\s+/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!senderWallet.trim()) {
      setErrorMessage("Please enter the sender wallet / mobile number.");
      return;
    }

    if (!paymentTrxId.trim()) {
      setErrorMessage("Please enter the Transaction ID (TrxID).");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/checkout/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: invitation.slug,
          gateway: selectedMethodId,
          senderNumber: senderWallet.trim(),
          trxId: paymentTrxId.trim(),
          durationDays: selectedDuration,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Payment submission failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      router.push(`/checkout/${invitation.slug}/success`);
    } catch (err: any) {
      console.error("Payment error:", err);
      setErrorMessage("A server error occurred. Please try again shortly.");
      setIsSubmitting(false);
    }
  };

  const getBrandMeta = (id: string) => {
    switch (id) {
      case "bkash":
        return {
          brandName: "bKash",
          color: "#E2136E",
          bgLight: "bg-pink-50/60",
          borderActive: "border-[#E2136E]",
          textColor: "text-[#E2136E]",
          badgeBg: "bg-pink-100 text-pink-700",
        };
      case "nagad":
        return {
          brandName: "Nagad",
          color: "#F7941D",
          bgLight: "bg-orange-50/60",
          borderActive: "border-[#F7941D]",
          textColor: "text-[#F7941D]",
          badgeBg: "bg-orange-100 text-orange-700",
        };
      case "rocket":
        return {
          brandName: "Rocket",
          color: "#8C3494",
          bgLight: "bg-purple-50/60",
          borderActive: "border-[#8C3494]",
          textColor: "text-[#8C3494]",
          badgeBg: "bg-purple-100 text-purple-700",
        };
      default:
        return {
          brandName: id.toUpperCase(),
          color: "#8C4A52",
          bgLight: "bg-amber-50/60",
          borderActive: "border-[#8C4A52]",
          textColor: "text-[#8C4A52]",
          badgeBg: "bg-amber-100 text-amber-800",
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-[28px] max-w-lg w-full relative shadow-2xl border border-[#D4AF37]/30 my-8 overflow-hidden animate-slide-up">
        {/* Top Header */}
        <div className="bg-[#FAF8F5] border-b border-[#D4AF37]/20 px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C4A52]">
                Utshob Secure Checkout
              </span>
            </div>
            <h3
              className="text-xl font-bold text-[#2C2623] mt-0.5"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Select Payment Method
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200/70 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmitPayment} className="p-6 space-y-5">
          {/* Method Selection Cards */}
          <div>
            <label className="block text-xs font-bold text-[#7C7267] uppercase tracking-wider mb-2.5">
              Choose Payment Gateway
            </label>
            <div className={`grid gap-3 ${activeMethods.length === 1 ? 'grid-cols-1' : activeMethods.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {activeMethods.map((method) => {
                const isSelected = selectedMethodId === method.methodId;
                const meta = getBrandMeta(method.methodId);
                const hasImgError = imgErrors[method.methodId];

                return (
                  <button
                    key={method.methodId}
                    type="button"
                    onClick={() => {
                      setSelectedMethodId(method.methodId);
                      setErrorMessage(null);
                    }}
                    className={`relative p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${isSelected
                      ? `${meta.borderActive} ${meta.bgLight} shadow-md scale-[1.02] ring-2 ring-opacity-20`
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    {/* Logo with Fallback Badge */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden bg-white shadow-xs p-1">
                      {!hasImgError ? (
                        <img
                          src={`/assets/payment-gateway/${method.methodId}.png`}
                          alt={method.name}
                          className="w-full h-full object-contain"
                          onError={() => {
                            setImgErrors((prev) => ({ ...prev, [method.methodId]: true }));
                          }}
                        />
                      ) : (
                        <div
                          className="w-full h-full rounded-lg flex items-center justify-center font-black text-sm text-white"
                          style={{ backgroundColor: meta.color }}
                        >
                          {method.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-bold text-[#2C2623]">{method.name}</span>
                    {isSelected && (
                      <div
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] shadow-xs font-bold"
                        style={{ backgroundColor: meta.color }}
                      >
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Method Details Box with Premium Extra Gold Border */}
          <div className="bg-[#FAF8F5] text-[#2C2623] rounded-2xl p-4.5 space-y-3.5 border-2 border-[#D4AF37]/50 shadow-md ring-1 ring-[#D4AF37]/25 p-3">
            {/* Account Number Card & Copy */}
            <div className="bg-white rounded-xl p-3.5 space-y-2 border border-[#D4AF37]/35 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#7C7267] uppercase tracking-wider font-bold">
                    {activeMethod.name} ({resolved.typeLabel}) Number:
                  </div>
                  <div className="text-base sm:text-lg font-mono font-bold text-[#2C2623] tracking-wider mt-0.5">
                    {resolved.number}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="px-3.5 py-1.5 rounded-lg bg-[#8C4A52] hover:bg-[#7a3e45] text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>

              {activeAccountType === "MERCHANT" && resolved.counter && (
                <div className="flex items-center gap-2 pt-2 border-t border-stone-100 text-xs text-[#2C2623]">
                  <span className="text-[#7C7267] font-medium">Counter No:</span>
                  <span className="font-bold text-[#2C2623] bg-stone-100 border border-stone-200 px-2 py-0.5 rounded font-mono">
                    {resolved.counter}
                  </span>
                </div>
              )}
            </div>

            {/* Distinct Instructions Box */}
            <div className="bg-white rounded-xl p-3 border border-stone-200 text-xs text-[#2C2623] leading-relaxed shadow-xs flex items-start gap-2.5">
              <span className="text-base leading-none">💡</span>
              <p className="font-medium text-[#2C2623] leading-relaxed whitespace-pre-line">
                {resolved.instructions}
              </p>
            </div>

            {/* Total Payable Summary */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[#7C7267] font-medium">
                Total Payable ({selectedDuration} Days Active):
              </span>
              <span className="text-lg font-bold text-[#8C4A52]">
                ৳{Number(currentTotal).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Form Fields: Sender Wallet & TrxID */}
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#2C2623] mb-1">
                Your Wallet / Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={senderWallet}
                onChange={(e) => setSenderWallet(e.target.value)}
                placeholder="Number used to send payment (e.g. 017XXXXXXXX)"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#8C4A52] font-mono text-sm text-[#2C2623] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C2623] mb-1">
                Transaction ID (TrxID) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={paymentTrxId}
                onChange={(e) => setPaymentTrxId(e.target.value.toUpperCase())}
                placeholder="e.g. BK98X7102 or 9M28K182"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#8C4A52] font-mono text-sm text-[#2C2623] uppercase outline-none transition-all"
              />
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full bg-[#8C4A52] text-white font-bold text-sm shadow-md hover:bg-[#7a3e45] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Submitting payment details...</span>
            ) : (
              <>
                <span>Submit TrxID for Verification</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

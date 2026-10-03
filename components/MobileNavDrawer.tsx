"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Sparkles, User, Home, LayoutTemplate, HelpCircle, Phone, Tag } from "lucide-react";

interface MobileNavDrawerProps {
  user?: {
    username: string | null;
    role: string | null;
  };
}

export function MobileNavDrawer({ user }: MobileNavDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const username = user?.username;
  const role = user?.role;

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { label: "Home", href: "/", icon: <Home className="w-4 h-4 text-[#8C4A52]" /> },
    { label: "Templates", href: "/templates", icon: <LayoutTemplate className="w-4 h-4 text-[#8C4A52]" /> },
    { label: "How We Work", href: "/how-it-works", icon: <HelpCircle className="w-4 h-4 text-[#8C4A52]" /> },
    { label: "Contact Us", href: "/contact", icon: <Phone className="w-4 h-4 text-[#8C4A52]" /> },
  ];

  return (
    <div className="md:hidden">
      {/* Hamburger Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-white border border-[#D4AF37]/40 flex items-center justify-center text-[#2C2623] hover:bg-[#F9F0EC] transition-all shadow-xs active:scale-95"
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <X className="w-5 h-5 text-[#8C4A52]" /> : <Menu className="w-5 h-5 text-[#8C4A52]" />}
      </button>

      {/* Slide-down Mobile Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop to close on click outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Card */}
          <div className="fixed top-[72px] left-4 right-4 sm:left-auto sm:right-6 sm:w-80 bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-[#D4AF37]/30 p-5 z-50 animate-in slide-in-from-top-4 fade-in duration-200">
            {/* Navigation Links */}
            <nav className="space-y-1.5">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl text-[#2C2623] font-bold hover:bg-[#F9F0EC] hover:text-[#8C4A52] transition-colors border border-transparent hover:border-[#D4AF37]/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#D4AF37]/30 shadow-sm flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>
              ))}
            </nav>

            {/* Featured Action: Create Invitation */}
            <div className="mt-4">
              <Link
                href="/create"
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#8C4A52] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Create Invitation</span>
              </Link>
            </div>

            {/* Footer User State */}
            <div className="mt-4 pt-4 border-t border-[#D4AF37]/20">
              {username ? (
                <Link
                  href={role === "ADMIN" ? "/admin" : "/profile"}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/20 hover:bg-[#F9F0EC] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-white border border-[#D4AF37]/40 flex items-center justify-center text-[#8C4A52] font-bold shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Logged in as</div>
                    <div className="text-sm font-bold text-[#2C2623] capitalize">{username}</div>
                  </div>
                </Link>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 text-center rounded-xl bg-[#FAF8F5] border border-[#D4AF37]/30 text-sm font-bold text-[#8C4A52] hover:bg-white transition-colors shadow-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 text-center rounded-xl bg-[#2C2623] text-white text-sm font-bold shadow-md hover:bg-black transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

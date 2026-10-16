"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Templates", href: "/templates" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="hidden md:flex items-center gap-7 lg:gap-8 font-serif text-sm tracking-wide">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative py-1 transition-colors ${
              isActive
                ? "text-[#8C4A52] font-bold"
                : "text-[#7C7267] hover:text-[#D4AF37]"
            }`}
          >
            <span>{item.label}</span>
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C4A52] rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

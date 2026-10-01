"use client";

import React, { useEffect, useState } from "react";

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    // 1. Prevent Right Click & Drag
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleDragStart = (e: DragEvent) => e.preventDefault();

    // 2. Prevent DevTools & Screenshot Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C" || e.key === "S")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "S" || e.key === "P")) ||
        (e.metaKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C" || e.key === "S" || e.key === "4" || e.key === "3")) ||
        (e.metaKey && (e.key === "U" || e.key === "S" || e.key === "P"))
      ) {
        e.preventDefault();
        setIsBlurred(true);
        try { navigator.clipboard.writeText(""); } catch {}
        setTimeout(() => setIsBlurred(false), 2000);
        return false;
      }
    };

    // 3. Instant Blur when moving to Toolbar (Awesome Screenshot & Extensions)
    const handleMouseLeave = () => setIsBlurred(true);
    const handleMouseEnter = () => setIsBlurred(false);

    // 4. Instant Blur on Focus Loss / Game Bar / Snipping Tool
    const handleBlur = () => setIsBlurred(true);
    const handleFocus = () => setIsBlurred(false);
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div className="relative min-h-screen select-none">
      {/* Main Website Content with Heavy Blur on capture */}
      <div
        className={`transition-none ${
          isBlurred
            ? "filter blur-[36px] brightness-90 saturate-150 pointer-events-none select-none"
            : "filter-none"
        }`}
      >
        {children}
      </div>

      {/* Frosted Glass Obfuscation Shield */}
      {isBlurred && (
        <div className="fixed inset-0 z-[99999999] backdrop-blur-[30px] bg-black/20 pointer-events-none" />
      )}
    </div>
  );
}

"use client";

import React from 'react';
import { useEditor } from './EditorContext';
import { PlayCircle, LayoutTemplate, AlignLeft, PaintBucket } from 'lucide-react';

import { AnimationTab } from './tabs/AnimationTab';
import { DesignTab } from './tabs/DesignTab';
import { InformationTab } from './tabs/InformationTab';
import { StyleTab } from './tabs/StyleTab';

const TABS = [
  { id: 'animation', label: 'Animation', icon: <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { id: 'design', label: 'Design', icon: <LayoutTemplate className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { id: 'information', label: 'Information', icon: <AlignLeft className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { id: 'style', label: 'Style', icon: <PaintBucket className="w-4 h-4 sm:w-5 sm:h-5" /> },
] as const;

export const Sidebar = ({ dbData }: { dbData: any }) => {
  const { activeTab, setActiveTab } = useEditor();

  return (
    <>
      {/* Primary Tab Bar (Tablet & Desktop, plus compact horizontal bar on mobile) */}
      <div className="flex w-full border-b border-[#D4AF37]/25 bg-[#FAF8F5] p-1.5 gap-1 shrink-0">
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 sm:py-3 px-1 rounded-xl flex flex-col items-center gap-1 transition-all duration-200 select-none min-h-[44px] justify-center ${
                isActive
                  ? 'bg-[#8C4A52] text-white shadow-md font-bold'
                  : 'text-[#7C7267] hover:text-[#8C4A52] hover:bg-white/80'
              }`}
            >
              <div className={`${isActive ? 'text-white' : 'text-[#7C7267]'}`}>
                {tab.icon}
              </div>
              <span className={`text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold ${isActive ? 'text-white' : 'text-[#7C7267]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white p-4 sm:p-6">
        {activeTab === 'design' && <DesignTab templates={dbData?.templates || []} />}
        {activeTab === 'animation' && <AnimationTab animations={dbData?.animations || []} />}
        {activeTab === 'information' && <InformationTab dbData={dbData} />}
        {activeTab === 'style' && <StyleTab dbData={dbData} />}
      </div>
    </>
  );
};

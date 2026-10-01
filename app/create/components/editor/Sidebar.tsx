"use client";

import React from 'react';
import { useEditor } from './EditorContext';
import { PlayCircle, LayoutTemplate, AlignLeft, PaintBucket } from 'lucide-react';

import { AnimationTab } from './tabs/AnimationTab';
import { DesignTab } from './tabs/DesignTab';
import { InformationTab } from './tabs/InformationTab';
import { StyleTab } from './tabs/StyleTab';

const TABS = [
  { id: 'animation', label: 'Animation', icon: <PlayCircle className="w-5 h-5" /> },
  { id: 'design', label: 'Design', icon: <LayoutTemplate className="w-5 h-5" /> },
  { id: 'information', label: 'Information', icon: <AlignLeft className="w-5 h-5" /> },
  { id: 'style', label: 'Style', icon: <PaintBucket className="w-5 h-5" /> },
] as const;

export const Sidebar = ({ dbData }: { dbData: any }) => {
  const { activeTab, setActiveTab } = useEditor();

  return (
    <>
      <div className="flex w-full border-b border-gray-100 bg-[#F9F0EC]/50 shrink-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-4 flex flex-col items-center gap-1 transition-all border-b-2 ${activeTab === tab.id ? 'border-[#8C4A52] text-[#8C4A52] bg-white' : 'border-transparent text-[#7C7267] hover:bg-white/50'}`}
          >
            {tab.icon}
            <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white p-6">
        {activeTab === 'design' && <DesignTab templates={dbData?.templates || []} />}
        {activeTab === 'animation' && <AnimationTab animations={dbData?.animations || []} />}
        {activeTab === 'information' && <InformationTab dbData={dbData} />}
        {activeTab === 'style' && <StyleTab />}
      </div>
    </>
  );
};

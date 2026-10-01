"use client";

import React, { useState } from 'react';
import { useEditor } from '../EditorContext';
import { LayoutTemplate, CheckCircle2, Scroll, Sparkles } from 'lucide-react';
import { getTemplateById } from '@/lib/template-definitions';

export const DesignTab = ({ templates }: { templates: any[] }) => {
  const { selectedTemplateId, setSelectedTemplateId, setLayoutPresetId } = useEditor();
  const [filter, setFilter] = useState<'all' | 'scroll' | 'card' | 'interactive'>('all');

  const handleSelect = (tmpl: any) => {
    setSelectedTemplateId(tmpl.id);
    const def = getTemplateById(tmpl.slug) || getTemplateById(tmpl.id);
    if (def?.compositionId) {
      setLayoutPresetId(def.compositionId);
    }
  };

  const isScrollType = (type: string) => {
    const t = (type || '').toLowerCase();
    return t === 'scroll' || t === 'scroll_story';
  };

  const isInteractiveType = (type: string) => {
    const t = (type || '').toLowerCase();
    return t.includes('envelope') || t.includes('scratch') || t.includes('curtain');
  };

  const filteredTemplates = templates.filter(tmpl => {
    if (filter === 'scroll') return isScrollType(tmpl.experienceType);
    if (filter === 'card') return !isScrollType(tmpl.experienceType) && !isInteractiveType(tmpl.experienceType);
    if (filter === 'interactive') return isInteractiveType(tmpl.experienceType);
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#2C2623] mb-1" style={{ fontFamily: 'Cinzel, serif' }}>Card Design</h2>
        <p className="text-sm text-[#7C7267]">Select the aesthetic & format for your invitation.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 p-1 bg-stone-100 rounded-xl overflow-x-auto select-none border border-[#D4AF37]/20">
        {[
          { id: 'all', label: 'All' },
          { id: 'scroll', label: '📜 Scroll Page' },
          { id: 'card', label: '🎴 Single Card' },
          { id: 'interactive', label: '✨ Interactive' },
        ].map(f => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id as any)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              filter === f.id
                ? 'bg-white text-[#8C4A52] shadow-xs'
                : 'text-[#7C7267] hover:text-[#2C2623]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredTemplates.map(tmpl => {
          const isScroll = isScrollType(tmpl.experienceType);
          const isSelected = selectedTemplateId === tmpl.id;

          return (
            <div 
              key={tmpl.id}
              onClick={() => handleSelect(tmpl)}
              className={`cursor-pointer group relative rounded-2xl overflow-hidden border-2 transition-all ${
                isSelected ? 'border-[#8C4A52] shadow-md ring-2 ring-[#8C4A52]/20' : 'border-stone-200 hover:border-[#D4AF37]/60'
              }`}
            >
              {/* Badge for format */}
              <div className="absolute top-2 left-2 z-20">
                {isScroll ? (
                  <span className="bg-[#8C4A52] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Scroll className="w-2.5 h-2.5" /> Scroll Story
                  </span>
                ) : (
                  <span className="bg-[#2C2623]/80 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs">
                    Card
                  </span>
                )}
              </div>

              {/* Thumbnail Container */}
              <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                {tmpl.previewImageUrl ? (
                  <div className={`w-full h-full ${isScroll ? 'relative' : ''}`}>
                    <img 
                      src={tmpl.previewImageUrl} 
                      alt={tmpl.name} 
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isScroll ? 'group-hover:-translate-y-6 duration-1000' : 'group-hover:scale-105'
                      }`} 
                    />
                    {isScroll && (
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-transparent to-transparent py-1 text-center">
                        <span className="text-[9px] text-white/90 font-mono">↕ Scrollable</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <LayoutTemplate className="w-8 h-8 text-gray-400" />
                  </div>
                )}

                {isSelected && (
                  <div className="absolute top-2 right-2 z-20 bg-[#8C4A52] text-white rounded-full p-1 shadow-sm">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className={`p-3 text-center ${isSelected ? 'bg-[#F9F0EC]' : 'bg-gray-50'}`}>
                <h4 className="font-bold text-xs text-[#2C2623] truncate">{tmpl.name}</h4>
                <span className="text-[10px] uppercase text-[#7C7267] tracking-wider block mt-0.5">
                  {tmpl.experienceType}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

"use client";

import React, { useState } from 'react';
import { useEditor } from '../EditorContext';
import { PlayCircle, CheckCircle2, Film } from 'lucide-react';

export const AnimationTab = ({ animations }: { animations: any[] }) => {
  const { selectedAnimationId, setSelectedAnimationId } = useEditor();
  const [filter, setFilter] = useState<string>('all');

  const filteredAnimations = (animations || []).filter(anim => {
    if (filter === 'all') return true;
    const name = (anim.name || '').toLowerCase();
    if (filter === 'birthday') return name.includes('birthday') || name.includes('balloon') || name.includes('party') || name.includes('fun');
    if (filter === 'wedding') return name.includes('wedding') || name.includes('royal') || name.includes('floral') || name.includes('gold');
    if (filter === 'curtain') return name.includes('curtain') || name.includes('theater') || name.includes('door');
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#2C2623] mb-1" style={{ fontFamily: 'Cinzel, serif' }}>Opening Animation</h2>
        <p className="text-sm text-[#7C7267]">Choose how your invitation is revealed to your guests.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 p-1 bg-stone-100 rounded-xl overflow-x-auto select-none border border-[#D4AF37]/20">
        {[
          { id: 'all', label: 'All Animations' },
          { id: 'wedding', label: '💍 Royal / Wedding' },
          { id: 'birthday', label: '🎈 Birthday & Party' },
          { id: 'curtain', label: '🎭 Curtains & Reveals' },
        ].map(f => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
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

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredAnimations.length === 0 && (
          <div className="col-span-2 py-12 text-center text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
            <Film className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs font-semibold text-[#7C7267]">No animations found in this category.</p>
            <p className="text-[11px] text-stone-400 mt-1">Add new animations via the Admin Panel.</p>
          </div>
        )}

        {filteredAnimations.map(anim => {
          const isSelected = selectedAnimationId === anim.id;

          return (
            <div 
              key={anim.id}
              onClick={() => setSelectedAnimationId(anim.id)}
              className={`cursor-pointer group relative rounded-2xl overflow-hidden border-2 transition-all ${
                isSelected ? 'border-[#8C4A52] shadow-md ring-2 ring-[#8C4A52]/20' : 'border-stone-200 hover:border-[#D4AF37]/50'
              }`}
            >
              <div className="aspect-[4/5] bg-gray-100 relative">
                {/* Price Badge on Top Left */}
                <div className="absolute top-2 left-2 z-20">
                  <span className="bg-white/95 backdrop-blur-xs text-[#8C4A52] font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded-md border border-[#D4AF37]/40 shadow-xs">
                    {anim.price === 0 || !anim.price ? 'Free' : `৳${anim.price}`}
                  </span>
                </div>

                {anim.previewPosterUrl ? (
                  <img src={anim.previewPosterUrl} alt={anim.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <PlayCircle className="w-8 h-8 text-gray-400" />
                  </div>
                )}

                {/* Play icon watermark */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center shadow-md">
                    <PlayCircle className="w-5 h-5 text-[#8C4A52]" />
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 bg-[#8C4A52] text-white rounded-full p-1 shadow-sm z-20">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className={`p-3 text-center ${isSelected ? 'bg-[#F9F0EC]' : 'bg-gray-50'}`}>
                <h4 className="font-bold text-xs text-[#2C2623] truncate">{anim.name}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

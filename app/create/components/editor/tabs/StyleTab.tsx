"use client";

import React, { useState } from 'react';
import { useEditor } from '../EditorContext';
import { TYPOGRAPHY_PRESETS, getPresetStyle } from '@/lib/typography-presets';
import { LAYOUT_PRESETS } from '@/lib/layout-presets';

export const StyleTab = () => {
  const { typographyStyles, updateTypographyStyle, layoutPresetId, setLayoutPresetId } = useEditor();
  const [targetNode, setTargetNode] = useState<string>('brideName');

  const applyPresetToGlobal = (presetId: string) => {
    updateTypographyStyle(targetNode, presetId);
  };

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className="text-xl font-bold text-[#2C2623] mb-1" style={{ fontFamily: 'Cinzel, serif' }}>Layout & Style</h2>
        <p className="text-sm text-[#7C7267]">Choose composition and typography.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-widest font-bold text-[#2C2623] border-b pb-1">Text Composition</h3>
        <div className="grid grid-cols-2 gap-2">
          {LAYOUT_PRESETS.map(preset => (
            <button
              key={preset.id}
              onClick={() => setLayoutPresetId(preset.id)}
              className={`p-3 rounded-xl border-2 transition-all text-xs font-bold ${layoutPresetId === preset.id ? 'border-[#8C4A52] bg-[#F9F0EC] text-[#8C4A52]' : 'border-gray-100 hover:border-[#D4AF37]/50 bg-white text-[#7C7267]'}`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-xs uppercase tracking-widest font-bold text-[#2C2623] border-b pb-1">Typography</h3>

      <div className="flex flex-wrap gap-2 mb-4">
        <button 
          onClick={() => setTargetNode('brideName')} 
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${targetNode === 'brideName' ? 'bg-[#2C2623] text-white' : 'bg-gray-100 text-[#7C7267] hover:bg-gray-200'}`}
        >
          Bride Name
        </button>
        <button 
          onClick={() => setTargetNode('groomName')} 
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${targetNode === 'groomName' ? 'bg-[#2C2623] text-white' : 'bg-gray-100 text-[#7C7267] hover:bg-gray-200'}`}
        >
          Groom Name
        </button>
        <button 
          onClick={() => setTargetNode('primaryHeading')} 
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${targetNode === 'primaryHeading' ? 'bg-[#2C2623] text-white' : 'bg-gray-100 text-[#7C7267] hover:bg-gray-200'}`}
        >
          Event Label
        </button>
      </div>

      <div className="space-y-3">
        {TYPOGRAPHY_PRESETS.map(preset => {
          const style = getPresetStyle(preset.id);
          const isSelected = typographyStyles[targetNode] === preset.id;
          
          return (
            <button
              key={preset.id}
              onClick={() => applyPresetToGlobal(preset.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex flex-col gap-2 ${isSelected ? 'border-[#8C4A52] bg-[#F9F0EC]' : 'border-gray-100 hover:border-[#D4AF37]/50 bg-white shadow-sm'}`}
            >
              <div className="text-xs uppercase tracking-widest text-[#7C7267] font-bold font-sans">
                {preset.name}
              </div>
              <div 
                className="text-2xl text-[#2C2623]" 
                style={style as any}
              >
                Elegance & Style
              </div>
            </button>
          );
        })}
      </div>
      </div>
    </div>
  );
};
